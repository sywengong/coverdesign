class App {
    constructor() {
        this.canvasEditor = null;
        this.selectedElement = null;
        this.selectedElements = [];
        this.isDragging = false;
        this.isPanning = false;
        this.panStartX = 0;
        this.panStartY = 0;
        this.panOffsetX = 0;
        this.panOffsetY = 0;
        this.zoomLevel = 1;
        this.minZoom = 0.1;
        this.maxZoom = 3;
        this.dragStartX = 0;
        this.dragStartY = 0;
        this.elementStartX = 0;
        this.elementStartY = 0;
        this.elementStartWidth = 0;
        this.elementStartHeight = 0;
        this.resizeMode = false;
        this.resizeHandle = null;
        this.rotationMode = false;
        this.isUpdatingPropertyPanel = false;
        this.isPinching = false;
        this.pinchStartDistance = 0;
        this.pinchStartZoom = 1;
        this.pinchCenter = { x: 0, y: 0 };
        this.pinchCenterClient = { x: 0, y: 0 };
        
        // 剪贴板
        this.clipboardElement = null;
        
        // 撤销/重做历史
        this.history = [];
        this.historyIndex = -1;
        this.maxHistorySize = 50;
        this.isUndoRedo = false;

        // 设置全局引用，让其他类可以访问App实例
        window.app = this;
        this.init();
    }

    async init() {
        this.initCanvasEditor();
        this.bindEvents();
        this.bindToolbarEvents();
        this.bindLayerEvents();
        this.bindAlignEvents();
        this.bindPropertyEvents();
        this.bindBackgroundEvents();
        this.bindContextMenuEvents();
        FontDetector.populateFontSelect('fontFamily');
        await this.loadSavedProject();
        this.initHistory();
    }

    initCanvasEditor() {
        const canvas = document.getElementById('canvas');
        this.canvasEditor = new CanvasEditor(canvas, {
            width: 1080,
            height: 1920,
            backgroundColor: '#ffffff'
        });

        // 自动订阅图层管理器变化以刷新 UI
        this.canvasEditor.layerManager.onChange((action, layer) => {
            this.updateLayerList();
            this.canvasEditor.render();
        });

        this.canvasEditor.render();
    }

    bindEvents() {
        const canvas = this.canvasEditor.canvas;
        const canvasWrapper = document.getElementById('canvasWrapper');

        canvas.addEventListener('mousedown', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.handleCanvasMouseDown(e);
        });

        // Simple click/tap should be handled by CanvasEditor when not dragging/panning
        canvas.addEventListener('click', (e) => {
            if (!this.isDragging && !this.isPanning) {
                this.canvasEditor.handleClick(e);
            }
        });

        // 检测是否支持 Pointer Events
        const supportsPointerEvents = window.PointerEvent;
        
        if (!supportsPointerEvents) {
            // 只在不支持 Pointer Events 的浏览器上使用 touch 事件
            canvas.addEventListener('touchstart', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (e.touches.length === 1) {
                    const touch = e.touches[0];
                    const mouseEvent = new MouseEvent('mousedown', {
                        clientX: touch.clientX,
                        clientY: touch.clientY,
                        button: 0
                    });
                    this.handleCanvasMouseDown(mouseEvent);
                } else if (e.touches.length === 2) {
                    // 开始捏合缩放
                    this.isPinching = true;
                    this.isPanning = false;
                    this.isDragging = false;
                    const t0 = e.touches[0];
                    const t1 = e.touches[1];
                    const cx = (t0.clientX + t1.clientX) / 2;
                    const cy = (t0.clientY + t1.clientY) / 2;
                    this.pinchStartDistance = Math.hypot(t0.clientX - t1.clientX, t0.clientY - t1.clientY);
                    this.pinchStartZoom = this.zoomLevel;
                    this.pinchCenterClient = { x: cx, y: cy };
                    this.pinchCenter = this.getCanvasPoint({ clientX: cx, clientY: cy });
                }
            }, { passive: false });
        }

        // 拖拽上传图片支持
        this.setupDragAndDrop(canvas);

        // Pointer events support (pen/stylus and unified pointer model)
        // 只在支持 Pointer Events 的浏览器上使用
        if (supportsPointerEvents) {
            canvas.addEventListener('pointerdown', (e) => {
                // 忽略触摸类型的 pointer 事件（由 touch 事件处理）
                if (e.pointerType === 'touch') return;
                try { e.preventDefault(); } catch (err) {}
                this.handleCanvasMouseDown(e);
                if (e.pointerId && canvas.setPointerCapture) {
                    try { canvas.setPointerCapture(e.pointerId); } catch (err) {}
                }
            });

            canvas.addEventListener('pointermove', (e) => {
                if (e.pointerType === 'touch') return;
                try { e.preventDefault(); } catch (err) {}
                this.handleCanvasMouseMove(e);
            });

            canvas.addEventListener('pointerup', (e) => {
                if (e.pointerType === 'touch') return;
                try { e.preventDefault(); } catch (err) {}
                this.handleCanvasMouseUp(e);
                if (e.pointerId && canvas.releasePointerCapture) {
                    try { canvas.releasePointerCapture(e.pointerId); } catch (err) {}
                }
            });
        }

        canvasWrapper.addEventListener('mousedown', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.handleCanvasMouseDown(e);
        });

        // canvasWrapper 上的触摸事件只在不支持 Pointer Events 时使用
        if (!supportsPointerEvents) {
            canvasWrapper.addEventListener('touchstart', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (e.touches.length === 1) {
                    const touch = e.touches[0];
                    const mouseEvent = new MouseEvent('mousedown', {
                        clientX: touch.clientX,
                        clientY: touch.clientY,
                        button: 0
                    });
                    this.handleCanvasMouseDown(mouseEvent);
                } else if (e.touches.length === 2) {
                    this.isPinching = true;
                    this.isPanning = false;
                    this.isDragging = false;
                    const t0 = e.touches[0];
                    const t1 = e.touches[1];
                    const cx = (t0.clientX + t1.clientX) / 2;
                    const cy = (t0.clientY + t1.clientY) / 2;
                    this.pinchStartDistance = Math.hypot(t0.clientX - t1.clientX, t0.clientY - t1.clientY);
                    this.pinchStartZoom = this.zoomLevel;
                    this.pinchCenterClient = { x: cx, y: cy };
                    this.pinchCenter = this.getCanvasPoint({ clientX: cx, clientY: cy });
                }
            }, { passive: false });
        }
        
        // 添加触摸移动和结束事件，支持单点拖拽与两指捏合缩放
        document.addEventListener('touchmove', (e) => {
            if (e.touches.length === 1 && !this.isPinching) {
                const touch = e.touches[0];
                const mouseEvent = new MouseEvent('mousemove', {
                    clientX: touch.clientX,
                    clientY: touch.clientY
                });
                this.handleCanvasMouseMove(mouseEvent);
            } else if (e.touches.length === 2) {
                // pinch zoom
                e.preventDefault();
                const t0 = e.touches[0];
                const t1 = e.touches[1];
                const cx = (t0.clientX + t1.clientX) / 2;
                const cy = (t0.clientY + t1.clientY) / 2;
                const distance = Math.hypot(t0.clientX - t1.clientX, t0.clientY - t1.clientY);
                if (!this.isPinching) {
                    this.isPinching = true;
                    this.pinchStartDistance = distance;
                    this.pinchStartZoom = this.zoomLevel;
                    this.pinchCenterClient = { x: cx, y: cy };
                    this.pinchCenter = this.getCanvasPoint({ clientX: cx, clientY: cy });
                } else {
                    const scale = distance / (this.pinchStartDistance || distance);
                    let newZoom = this.pinchStartZoom * scale;
                    newZoom = Math.max(this.minZoom, Math.min(this.maxZoom, newZoom));

                    // 计算新的 pan 以保持捏合中心不动
                    const rect = this.canvasEditor.canvas.getBoundingClientRect();
                    const canvasPoint = this.pinchCenter; // in canvas coordinates
                    const clientX = this.pinchCenterClient.x;
                    const clientY = this.pinchCenterClient.y;

                    const newPanX = clientX - rect.left - canvasPoint.x * newZoom;
                    const newPanY = clientY - rect.top - canvasPoint.y * newZoom;

                    this.zoomLevel = newZoom;
                    this.panOffsetX = newPanX;
                    this.panOffsetY = newPanY;
                    this.applyPanTransform();
                    this.updateZoomDisplay();
                }
            }
        }, { passive: false });

        document.addEventListener('touchend', (e) => {
            if (e.touches.length < 2) {
                this.isPinching = false;
            }
            // 触点结束时，如果没有剩余触点，触发 mouseup
            if (e.touches.length === 0) {
                this.handleCanvasMouseUp(new MouseEvent('mouseup'));
            }
        });

        const handleWheelZoom = (e) => {
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                e.stopPropagation();
                const rect = this.canvasEditor.canvas.getBoundingClientRect();
                const before = this.getCanvasPoint(e);
                const delta = e.deltaY > 0 ? -0.1 : 0.1;
                let newZoom = this.zoomLevel + delta;
                newZoom = Math.max(this.minZoom, Math.min(this.maxZoom, newZoom));

                // compute new pan so that the point under the cursor remains stationary
                const clientX = e.clientX;
                const clientY = e.clientY;
                const newPanX = clientX - rect.left - before.x * newZoom;
                const newPanY = clientY - rect.top - before.y * newZoom;

                this.zoomLevel = newZoom;
                this.panOffsetX = newPanX;
                this.panOffsetY = newPanY;
                this.applyPanTransform();
                this.updateZoomDisplay();
                return false;
            }
        };
        canvas.addEventListener('wheel', handleWheelZoom, { passive: false });
        const canvasArea = document.querySelector('.canvas-area');
        if (canvasArea) canvasArea.addEventListener('wheel', handleWheelZoom, { passive: false });
        
        // 确保画布容器有正确的样式以支持缩放和平移
        // const canvasWrapper = document.getElementById('canvasWrapper');
        if (canvasWrapper) {
            canvasWrapper.style.overflow = 'hidden';
            canvasWrapper.style.position = 'relative';
        }

        document.addEventListener('mousemove', (e) => this.handleCanvasMouseMove(e));
        document.addEventListener('mouseup', (e) => this.handleCanvasMouseUp(e));
        
        // 添加鼠标悬停检测
        canvas.addEventListener('mousemove', (e) => {
            if (!this.isDragging && !this.isPanning) {
                const { x, y } = this.getCanvasPoint(e);
                const elements = this.canvasEditor.elementManager.getElementsByZIndex();
                const hoveredElement = [...elements].reverse().find(element => {
                    return element.visible && element.containsPoint(x, y);
                });
                
                if (hoveredElement) {
                    if (this.selectedElement && hoveredElement.id === this.selectedElement.id) {
                        // 检查是否悬停在手柄上
                        const handle = this.canvasEditor.getHandleAtPosition(x, y, this.zoomLevel);
                        if (handle === 'rotate') {
                            canvas.style.cursor = 'grab';
                        } else if (handle) {
                            canvas.style.cursor = this.getResizeCursor(handle);
                        } else {
                            canvas.style.cursor = 'move';
                        }
                    } else {
                        canvas.style.cursor = 'pointer';
                    }
                } else {
                    canvas.style.cursor = 'default';
                }
            }
        });
        
        canvas.addEventListener('mouseleave', () => {
            if (!this.isDragging && !this.isPanning) {
                canvas.style.cursor = 'default';
            }
        });

        canvas.addEventListener('dblclick', (e) => {
            e.preventDefault();
            this.handleCanvasDoubleClick(e);
        });

        document.addEventListener('keydown', (e) => this.handleKeyDown(e));

        // 辅助线事件监听
        const showGuidesCheckbox = document.getElementById('showGuides');
        if (showGuidesCheckbox) {
            showGuidesCheckbox.addEventListener('change', (e) => {
                this.canvasEditor.guides.enabled = e.target.checked;
                this.canvasEditor.render();
            });
        }

        // document.addEventListener('mousedown', (e) => {
        //     if (this.selectedElement) {
        //         const canvas = this.canvasEditor.canvas;
        //         const wrapper = document.getElementById('canvasWrapper');
        //         if (!wrapper.contains(e.target)) {
        //             this.deselectElement();
        //         }
        //     }
        // });
    }

    applyPanTransform() {
        // 设置transform-origin为画布中心，确保缩放时从中心点进行
        const canvasWidth = this.canvasEditor.options.width;
        const canvasHeight = this.canvasEditor.options.height;
        this.canvasEditor.canvas.style.transformOrigin = 'center center';
        
        const transform = `translate(${this.panOffsetX}px, ${this.panOffsetY}px) scale(${this.zoomLevel})`;
        this.canvasEditor.canvas.style.transform = transform;
        this.canvasEditor.setPanOffset(this.panOffsetX, this.panOffsetY);
        this.canvasEditor.setZoom(this.zoomLevel);
    }

    setZoom(level) {
        this.zoomLevel = Math.max(this.minZoom, Math.min(this.maxZoom, level));
        this.applyPanTransform();
        this.updateZoomDisplay();
    }

    fitToScreen() {
        const canvasWrapper = document.getElementById('canvasWrapper');
        const wrapperRect = canvasWrapper.getBoundingClientRect();
        const canvasWidth = this.canvasEditor.options.width;
        const canvasHeight = this.canvasEditor.options.height;

        const scaleX = (wrapperRect.width - 40) / canvasWidth;
        const scaleY = (wrapperRect.height - 40) / canvasHeight;
        const scale = Math.min(scaleX, scaleY, 1);

        this.zoomLevel = scale;
        // transform-origin: 0 0 时，画布从左上角缩放，需 pan 偏移使画布居中
        this.panOffsetX = canvasWidth / 2 * (scale - 1);
        this.panOffsetY = canvasHeight / 2 * (scale - 1);
        this.applyPanTransform();
        this.updateZoomDisplay();
    }

    updateZoomDisplay() {
        const zoomLevelEl = document.getElementById('zoomLevel');
        if (zoomLevelEl) {
            zoomLevelEl.textContent = Math.round(this.zoomLevel * 100) + '%';
        }
    }

    getCanvasPoint(e) {
        const rect = this.canvasEditor.canvas.getBoundingClientRect();
        // Compute canvas-space coordinates from client coordinates and current zoom.
        // The canvas is transformed via CSS; rect already reflects translation+scale.
        const x = (e.clientX - rect.left) / this.zoomLevel;
        const y = (e.clientY - rect.top) / this.zoomLevel;
        return { x, y };
    }

    handleCanvasMouseDown(e) {
        const { x, y } = this.getCanvasPoint(e);

        if (this.selectedElement) {
            // 传入缩放级别以正确计算手柄位置
            const handle = this.canvasEditor.getHandleAtPosition(x, y, this.zoomLevel);
            if (handle) {
                if (handle === 'rotate') {
                    this.startRotation(e);
                    return;
                } else {
                    this.startResize(e, this.selectedElement, handle);
                    return;
                }
            }
        }

        const elements = this.canvasEditor.elementManager.getElementsByZIndex();
        const clickedElement = [...elements].reverse().find(element => {
            return element.visible &&
                   !element.locked &&
                   element.containsPoint(x, y);
        });

        // 检测是否按住了Shift或Ctrl键
        const isMultiSelect = e.shiftKey || e.ctrlKey;
        
        if (clickedElement) {
            // 多选模式
            if (isMultiSelect) {
                this.canvasEditor.selectElement(clickedElement.id, true);
                // 更新选中元素引用以支持多选
                this.selectedElements = this.canvasEditor.elementManager.getSelectedElements();
                if (this.selectedElements.length > 0) {
                    // 如果有选中元素，使用最后一个作为主要操作元素
                    this.selectedElement = this.selectedElements[this.selectedElements.length - 1];
                } else {
                    this.selectedElement = clickedElement;
                }
                this.canvasEditor.layerManager.selectLayer(clickedElement.id);
                this.updateLayerSelection();
                this.updatePropertyPanel();
            } else {
                // 单选模式
                this.selectElement(clickedElement);
            }

            this.startDrag(e, clickedElement);
        } else {
            if (!isMultiSelect) {
                this.deselectElement();
            }
            // 只有在点击空白区域且没有按住修饰键时才开始平移
            if (e.button === 0 && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
                this.isPanning = true;
                this.panStartX = e.clientX;
                this.panStartY = e.clientY;
                this.canvasEditor.canvas.style.cursor = 'grabbing';
            }
        }
    }

    startRotation(e) {
        if (!this.selectedElement) return;
        
        this.isDragging = true;
        this.rotationMode = true;
        this.rotationStartAngle = 0;
        this.rotationElementCenter = {
            x: this.selectedElement.x + this.selectedElement.width / 2,
            y: this.selectedElement.y + this.selectedElement.height / 2
        };

        const { x: canvasX, y: canvasY } = this.getCanvasPoint(e);
        this.rotationStartAngle = Math.atan2(canvasY - this.rotationElementCenter.y, canvasX - this.rotationElementCenter.x);
        this.rotationStart = this.selectedElement.rotation || 0;
    }

    handleRotationMove(e) {
        if (!this.selectedElement) return;
        
        const { x: canvasX, y: canvasY } = this.getCanvasPoint(e);

        const currentAngle = Math.atan2(canvasY - this.rotationElementCenter.y, canvasX - this.rotationElementCenter.x);
        const deltaAngle = (currentAngle - this.rotationStartAngle) * 180 / Math.PI;
        this.selectedElement.setRotation(this.rotationStart + deltaAngle);

        this.canvasEditor.render();
        this.updatePropertyPanel();
    }

    setupDragAndDrop(canvas) {
        // 阻止默认拖拽行为
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            canvas.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
            }, false);
            document.body.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
            }, false);
        });

        // 拖拽进入画布 - 显示视觉反馈
        canvas.addEventListener('dragenter', (e) => {
            canvas.style.boxShadow = '0 0 0 4px #667eea inset';
            canvas.style.cursor = 'copy';
        });

        // 拖拽离开画布 - 移除视觉反馈
        canvas.addEventListener('dragleave', (e) => {
            // 检查是否真的离开了画布（而不是进入了子元素）
            if (!canvas.contains(e.relatedTarget)) {
                canvas.style.boxShadow = '';
                canvas.style.cursor = '';
            }
        });

        // 拖拽在画布上方 - 允许放置
        canvas.addEventListener('dragover', (e) => {
            e.dataTransfer.dropEffect = 'copy';
        });

        // 放置文件 - 处理图片
        canvas.addEventListener('drop', async (e) => {
            canvas.style.boxShadow = '';
            canvas.style.cursor = '';

            const files = Array.from(e.dataTransfer.files);
            if (files.length === 0) return;

            // 过滤出图片文件
            const imageFiles = files.filter(file => file.type.startsWith('image/'));
            if (imageFiles.length === 0) {
                Utils.showToast('请拖入图片文件', 'error');
                return;
            }

            // 获取放置位置（相对于画布）
            const { x: dropX, y: dropY } = this.getCanvasPoint(e);

            // 依次处理每张图片
            let successCount = 0;
            const spacing = 20; // 图片间距

            for (let i = 0; i < imageFiles.length; i++) {
                const file = imageFiles[i];
                try {
                    const reader = new FileReader();
                    const imageData = await new Promise((resolve, reject) => {
                        reader.onload = (event) => resolve(event.target.result);
                        reader.onerror = reject;
                        reader.readAsDataURL(file);
                    });

                    // 创建图片元素，错位排列
                    const element = await this.canvasEditor.addImage(imageData);
                    if (element) {
                        // 设置位置（基于放置点，错位排列）
                        element.x = dropX + (i * spacing);
                        element.y = dropY + (i * spacing);
                        // 确保图片在画布内
                        element.x = Math.max(0, Math.min(element.x, this.canvasEditor.options.width - element.width));
                        element.y = Math.max(0, Math.min(element.y, this.canvasEditor.options.height - element.height));

                        this.canvasEditor.render();
                        successCount++;
                    }
                } catch (error) {
                    console.error('加载图片失败:', error);
                }
            }

            if (successCount > 0) {
                this.updateLayerList();
                this.saveProject();
                Utils.showToast(`成功导入 ${successCount} 张图片`, 'success');
            } else {
                Utils.showToast('图片导入失败', 'error');
            }
        });
    }

    getCanvasTransform() {
        const computedStyle = window.getComputedStyle(this.canvasEditor.canvas);
        const transform = computedStyle.transform;
        let offsetX = 0;
        let offsetY = 0;

        if (transform && transform !== 'none') {
            const matrix = new DOMMatrix(transform);
            offsetX = matrix.e;
            offsetY = matrix.f;
        }

        return { offsetX, offsetY };
    }

    startDrag(e, element) {
        this.isDragging = true;
        this.selectedElement = element;
        this.selectedElements = this.canvasEditor.elementManager.getSelectedElements();
        // 确保 elementManager / layerManager 与 App.selectedElement 同步
        if (this.canvasEditor) {
            this.canvasEditor.selectElement(element.id);
            if (this.canvasEditor.layerManager) this.canvasEditor.layerManager.selectLayer(element.id);
            this.updateLayerSelection();
        }
        const { x, y } = this.getCanvasPoint(e);
        // 记录拖拽开始时所有选中元素的位置
        this.dragElementsStart = this.selectedElements.map(el => ({
            element: el,
            startX: el.x,
            startY: el.y
        }));
        this.dragStartCanvasX = x;
        this.dragStartCanvasY = y;
        this.resizeMode = false;
        this.resizeHandle = null;
        this.rotationMode = false;
    }

    handleCanvasMouseMove(e) {
        if (this.isPanning) {
            const dx = e.clientX - this.panStartX;
            const dy = e.clientY - this.panStartY;
            this.panOffsetX += dx;
            this.panOffsetY += dy;
            this.panStartX = e.clientX;
            this.panStartY = e.clientY;
            this.applyPanTransform();
            return;
        }

        if (!this.isDragging) return;

        const { x: currentX, y: currentY } = this.getCanvasPoint(e);

        if (this.rotationMode && this.selectedElement) {
            this.handleRotationMove(e);
            return;
        }

        if (this.resizeMode && this.selectedElement) {
            this.handleResizeMove(e, currentX, currentY);
            this.canvasEditor.render();
            this.updatePropertyPanel();
            return;
        }

        if (this.selectedElements && this.selectedElements.length > 0 && !this.resizeMode) {
            // 根据拖拽增量计算新位置，保持鼠标与元素的相对位置
            const deltaX = currentX - this.dragStartCanvasX;
            const deltaY = currentY - this.dragStartCanvasY;

            // 移动所有选中的元素
            this.selectedElements.forEach((el, index) => {
                const startData = this.dragElementsStart[index];
                if (startData && startData.element === el) {
                    let newX = startData.startX + deltaX;
                    let newY = startData.startY + deltaY;

                    // 边界限制，确保元素不会移出画布
                    // 对于旋转的元素，使用旋转后的边界
                    if (el.rotation !== 0) {
                        const bounds = el.getRotatedBounds();
                        const dx = newX - startData.startX;
                        const dy = newY - startData.startY;
                        
                        // 计算边界偏移
                        if (bounds.left + dx < 0) {
                            newX = startData.startX - bounds.left;
                        }
                        if (bounds.top + dy < 0) {
                            newY = startData.startY - bounds.top;
                        }
                        if (bounds.right + dx > this.canvasEditor.options.width) {
                            newX = startData.startX + (this.canvasEditor.options.width - bounds.right);
                        }
                        if (bounds.bottom + dy > this.canvasEditor.options.height) {
                            newY = startData.startY + (this.canvasEditor.options.height - bounds.bottom);
                        }
                    } else {
                        newX = Math.max(0, Math.min(newX, this.canvasEditor.options.width - el.width));
                        newY = Math.max(0, Math.min(newY, this.canvasEditor.options.height - el.height));
                    }

                    // 应用吸附逻辑（仅对主要元素）
                    if (el === this.selectedElement) {
                        const snapPos = this.canvasEditor.getSnapPositionForElement(
                            newX, newY, 
                            el.width, 
                            el.height,
                            this.zoomLevel
                        );

                        if (Math.abs(snapPos.x - newX) <= this.canvasEditor.snapThreshold / this.zoomLevel) {
                            newX = snapPos.x;
                        }
                        if (Math.abs(snapPos.y - newY) <= this.canvasEditor.snapThreshold / this.zoomLevel) {
                            newY = snapPos.y;
                        }
                    }

                    el.setPosition(newX, newY);
                }
            });

            this.canvasEditor.render();
            this.updatePropertyPanel();
        }
    }

    handleCanvasMouseUp(e) {
        if (this.isPanning) {
            this.isPanning = false;
            this.canvasEditor.canvas.style.cursor = '';
            return;
        }

        if (this.isDragging) {
            this.isDragging = false;
            this.resizeMode = false;
            this.resizeHandle = null;
            this.rotationMode = false;
            this.dragElementStartX = null;
            this.dragElementStartY = null;
            this.dragStartCanvasX = null;
            this.dragStartCanvasY = null;
            this.updateLayerData();
            this.saveProject();
        }
    }

    handleCanvasDoubleClick(e) {
        const { x, y } = this.getCanvasPoint(e);

        const elements = this.canvasEditor.elementManager.getElementsByZIndex();
        const clickedElement = [...elements].reverse().find(element => {
            return element.visible &&
                   !element.locked &&
                   element.containsPoint(x, y);
        });

        if (clickedElement && clickedElement.type === 'text') {
            // 确保选中该元素再编辑
            this.selectElement(clickedElement);
            const newText = prompt('编辑文字内容:', clickedElement.text);
            if (newText !== null) {
                const sel = this.selectedElement;
                if (sel && sel.type === 'text') {
                    sel.setText(newText);
                    sel.autoSize();
                    this.canvasEditor.render();
                    this.updateLayerData();
                    this.updatePropertyPanel();
                    this.saveProject();
                }
            }
        }
    }

    startResize(e, element, handle) {
        this.isDragging = true;
        this.resizeMode = true;
        this.resizeHandle = handle;
        const { x, y } = this.getCanvasPoint(e);
        this.dragStartX = x;
        this.dragStartY = y;
        this.elementStartX = element.x;
        this.elementStartY = element.y;
        this.elementStartWidth = element.width;
        this.elementStartHeight = element.height;
        this.rotationMode = false;
    }

    handleResizeMove(e, currentX, currentY) {
        if (!this.selectedElement) return;

        const dx = currentX - this.dragStartX;
        const dy = currentY - this.dragStartY;

        const element = this.selectedElement;
        let newX = this.elementStartX;
        let newY = this.elementStartY;
        let newWidth = this.elementStartWidth;
        let newHeight = this.elementStartHeight;

        const handle = this.resizeHandle;
        const isCorner = (handle.includes('e') && handle.includes('n')) ||
                         (handle.includes('e') && handle.includes('s')) ||
                         (handle.includes('w') && handle.includes('n')) ||
                         (handle.includes('w') && handle.includes('s'));

        if (isCorner) {
            const aspectRatio = this.elementStartWidth / this.elementStartHeight;

            if (handle === 'se') {
                newWidth = Math.max(20, this.elementStartWidth + dx);
                newHeight = newWidth / aspectRatio;
            } else if (handle === 'sw') {
                const widthChange = Math.max(20, this.elementStartWidth - dx);
                newWidth = widthChange;
                newHeight = newWidth / aspectRatio;
                newX = this.elementStartX + this.elementStartWidth - newWidth;
            } else if (handle === 'ne') {
                newWidth = Math.max(20, this.elementStartWidth + dx);
                newHeight = newWidth / aspectRatio;
                newY = this.elementStartY + this.elementStartHeight - newHeight;
            } else if (handle === 'nw') {
                const widthChange = Math.max(20, this.elementStartWidth - dx);
                newWidth = widthChange;
                newHeight = newWidth / aspectRatio;
                newX = this.elementStartX + this.elementStartWidth - newWidth;
                newY = this.elementStartY + this.elementStartHeight - newHeight;
            }
        } else {
            if (handle.includes('e')) {
                newWidth = Math.max(20, this.elementStartWidth + dx);
            }
            if (handle.includes('w')) {
                const widthChange = Math.max(20, this.elementStartWidth - dx);
                newWidth = widthChange;
                newX = this.elementStartX + this.elementStartWidth - newWidth;
            }
            if (handle.includes('s')) {
                newHeight = Math.max(20, this.elementStartHeight + dy);
            }
            if (handle.includes('n')) {
                const heightChange = Math.max(20, this.elementStartHeight - dy);
                newHeight = heightChange;
                newY = this.elementStartY + this.elementStartHeight - newHeight;
            }
        }

        // 边界限制
        newWidth = Math.max(20, Math.min(newWidth, this.canvasEditor.options.width - newX));
        newHeight = Math.max(20, Math.min(newHeight, this.canvasEditor.options.height - newY));
        
        // 应用吸附逻辑到调整大小
        let snappedX = newX;
        let snappedY = newY;
        let snappedWidth = newWidth;
        let snappedHeight = newHeight;

        // 检查元素边缘的吸附
        const snapResult = this.canvasEditor.getSnapPositionForElement(newX, newY, newWidth, newHeight, this.zoomLevel);
        
        if (this.resizeHandle.includes('w')) {
            const targetSnapX = snapResult.x;
            if (Math.abs(targetSnapX - newX) <= this.canvasEditor.snapThreshold / this.zoomLevel) {
                snappedWidth = newX + newWidth - targetSnapX;
                snappedX = targetSnapX;
            }
        } else if (this.resizeHandle.includes('e')) {
            const targetRightX = snapResult.x + snappedWidth;
            const currentRightX = newX + newWidth;
            if (Math.abs(targetRightX - currentRightX) <= this.canvasEditor.snapThreshold / this.zoomLevel) {
                snappedWidth = targetRightX - newX;
            }
        }

        if (this.resizeHandle.includes('n')) {
            const targetSnapY = snapResult.y;
            if (Math.abs(targetSnapY - newY) <= this.canvasEditor.snapThreshold / this.zoomLevel) {
                snappedHeight = newY + newHeight - targetSnapY;
                snappedY = targetSnapY;
            }
        } else if (this.resizeHandle.includes('s')) {
            const targetBottomY = snapResult.y + snappedHeight;
            const currentBottomY = newY + newHeight;
            if (Math.abs(targetBottomY - currentBottomY) <= this.canvasEditor.snapThreshold / this.zoomLevel) {
                snappedHeight = targetBottomY - newY;
            }
        }

        element.setPosition(snappedX, snappedY);
        element.setSize(snappedWidth, snappedHeight);

        this.updateLayerData();
    }

    handleKeyDown(e) {
        // 处理全局快捷键（不需要选中元素）
        if (e.ctrlKey || e.metaKey) {
            switch (e.key.toLowerCase()) {
                case 's':
                    e.preventDefault();
                    this.saveProject();
                    Utils.showToast('项目已保存', 'success');
                    return;
                case 'z':
                    e.preventDefault();
                    if (e.shiftKey) {
                        this.redo();
                    } else {
                        this.undo();
                    }
                    return;
                case 'y':
                    e.preventDefault();
                    this.redo();
                    return;
            }
        }

        // 处理需要选中元素的快捷键
        if (!this.selectedElement || e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }

        const step = e.shiftKey ? 10 : 1;

        switch (e.key) {
            case 'Delete':
            case 'Backspace':
                this.deleteSelectedElement();
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.selectedElement.y = Math.max(0, this.selectedElement.y - step);
                this.canvasEditor.render();
                this.updateLayerData();
                this.saveProject();
                break;
            case 'ArrowDown':
                e.preventDefault();
                this.selectedElement.y = Math.min(this.canvasEditor.options.height - this.selectedElement.height, this.selectedElement.y + step);
                this.canvasEditor.render();
                this.updateLayerData();
                this.saveProject();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                this.selectedElement.x = Math.max(0, this.selectedElement.x - step);
                this.canvasEditor.render();
                this.updateLayerData();
                this.saveProject();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.selectedElement.x = Math.min(this.canvasEditor.options.width - this.selectedElement.width, this.selectedElement.x + step);
                this.canvasEditor.render();
                this.updateLayerData();
                this.saveProject();
                break;
            case 'Escape':
                this.deselectElement();
                break;
            case 'c':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    this.copyElement();
                }
                break;
            case 'v':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    this.pasteElement();
                }
                break;
        }
    }

    selectElement(element) {
        this.selectedElement = element;
        this.canvasEditor.selectElement(element.id);
        this.canvasEditor.layerManager.selectLayer(element.id);
        this.updateLayerSelection();
        this.updatePropertyPanel();
    }

    deselectElement() {
        this.selectedElement = null;
        this.selectedElements = [];
        this.canvasEditor.deselectAll();
        this.canvasEditor.layerManager.selectLayer(null);
        this.canvasEditor.render();
        this.updateLayerSelection();
        this.clearPropertyPanel();
    }

    deleteSelectedElement() {
        if (this.selectedElement) {
            this.canvasEditor.elementManager.removeElement(this.selectedElement.id);
            this.canvasEditor.layerManager.removeLayer(this.selectedElement.id);
            this.canvasEditor.render();
            this.updateLayerList();
            this.deselectElement();
            this.saveProject();
            Utils.showToast('元素已删除', 'success');
        }
    }

    updateLayerData() {
        if (!this.selectedElement) return;

        const layer = this.canvasEditor.layerManager.getSelectedLayer();
        if (layer) {
            layer.data = this.selectedElement.toJSON();
        }
    }

    removeLayer(elementId) {
        this.canvasEditor.layerManager.removeLayer(elementId);
        this.updateLayerList();
    }

    bindToolbarEvents() {
        const exportBtn = document.getElementById('exportBtn');
        const saveBtn = document.getElementById('saveBtn');
        const exportProjectBtn = document.getElementById('exportProjectBtn');
        const loadBtn = document.getElementById('loadBtn');
        const clearBtn = document.getElementById('clearBtn');
        const zoomInBtn = document.getElementById('zoomInBtn');
        const zoomOutBtn = document.getElementById('zoomOutBtn');
        const zoomFitBtn = document.getElementById('zoomFitBtn');
        const templateBtn = document.getElementById('templateBtn');

        if (templateBtn) {
            templateBtn.addEventListener('click', () => {
                this.openTemplateSelector();
            });
        }

        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportImage());
        }

        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                this.saveProject();
                Utils.showToast('项目已保存', 'success');
            });
        }

        if (exportProjectBtn) {
            exportProjectBtn.addEventListener('click', () => this.exportProjectDialog());
        }

        if (loadBtn) {
            loadBtn.addEventListener('click', () => this.loadProjectDialog());
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                if (confirm('确定要清空所有元素吗？')) {
                    this.clearCanvas();
                }
            });
        }

        if (zoomInBtn) {
            zoomInBtn.addEventListener('click', () => this.setZoom(this.zoomLevel + 0.1));
        }

        if (zoomOutBtn) {
            zoomOutBtn.addEventListener('click', () => this.setZoom(this.zoomLevel - 0.1));
        }

        if (zoomFitBtn) {
            zoomFitBtn.addEventListener('click', () => {
                this.fitToScreen();
                // After fitting, measure layout on next frame and adjust pan so canvas center
                // aligns with the wrapper center. Use the measured bounding rect width/height
                // to avoid mixing computed sizes with DOM measurements which caused drift.
                const wrapper = document.getElementById('canvasWrapper');
                const canvas = this.canvasEditor.canvas;
                if (wrapper && canvas) {
                    requestAnimationFrame(() => {
                        const wrapperRect = wrapper.getBoundingClientRect();
                        const canvasRect = canvas.getBoundingClientRect();

                        const wrapperCenterX = wrapperRect.left + wrapperRect.width / 2;
                        const wrapperCenterY = wrapperRect.top + wrapperRect.height / 2;
                        const canvasCenterX = canvasRect.left + canvasRect.width / 2;
                        const canvasCenterY = canvasRect.top + canvasRect.height / 2;

                        const deltaX = wrapperCenterX - canvasCenterX;
                        const deltaY = wrapperCenterY - canvasCenterY;

                        this.panOffsetX += deltaX;
                        this.panOffsetY += deltaY;
                        this.applyPanTransform();
                    });
                }
            });
        }
    }

    bindLayerEvents() {
        const layerUp = document.getElementById('layerUp');
        const layerDown = document.getElementById('layerDown');
        const layerTop = document.getElementById('layerTop');
        const layerBottom = document.getElementById('layerBottom');

        if (layerUp) {
            layerUp.addEventListener('click', () => {
                if (this.selectedElement) {
                    this.canvasEditor.elementManager.moveUp(this.selectedElement.id);
                    this.canvasEditor.layerManager.moveLayer(this.selectedElement.id, 'up');
                    this.canvasEditor.render();
                    this.updateLayerList();
                    this.updateLayerData();
                    this.saveProject();
                }
            });
        }

        if (layerDown) {
            layerDown.addEventListener('click', () => {
                if (this.selectedElement) {
                    this.canvasEditor.elementManager.moveDown(this.selectedElement.id);
                    this.canvasEditor.layerManager.moveLayer(this.selectedElement.id, 'down');
                    this.canvasEditor.render();
                    this.updateLayerList();
                    this.updateLayerData();
                    this.saveProject();
                }
            });
        }

        if (layerTop) {
            layerTop.addEventListener('click', () => {
                if (this.selectedElement) {
                    this.canvasEditor.elementManager.bringToFront(this.selectedElement.id);
                    this.canvasEditor.layerManager.bringToFront(this.selectedElement.id);
                    this.canvasEditor.render();
                    this.updateLayerList();
                    this.updateLayerData();
                    this.saveProject();
                }
            });
        }

        if (layerBottom) {
            layerBottom.addEventListener('click', () => {
                if (this.selectedElement) {
                    this.canvasEditor.elementManager.sendToBack(this.selectedElement.id);
                    this.canvasEditor.layerManager.sendToBack(this.selectedElement.id);
                    this.canvasEditor.render();
                    this.updateLayerList();
                    this.updateLayerData();
                    this.saveProject();
                }
            });
        }
    }

    bindAlignEvents() {
        const alignLeft = document.getElementById('alignLeft');
        const alignCenter = document.getElementById('alignCenter');
        const alignRight = document.getElementById('alignRight');
        const alignTop = document.getElementById('alignTop');
        const alignMiddle = document.getElementById('alignMiddle');
        const alignBottom = document.getElementById('alignBottom');

        if (alignLeft) {
            alignLeft.addEventListener('click', () => {
                this.canvasEditor.alignElements('left');
                this.updatePropertyPanel();
                this.saveProject();
            });
        }

        if (alignCenter) {
            alignCenter.addEventListener('click', () => {
                this.canvasEditor.alignElements('center');
                this.updatePropertyPanel();
                this.saveProject();
            });
        }

        if (alignRight) {
            alignRight.addEventListener('click', () => {
                this.canvasEditor.alignElements('right');
                this.updatePropertyPanel();
                this.saveProject();
            });
        }

        if (alignTop) {
            alignTop.addEventListener('click', () => {
                this.canvasEditor.alignElements('top');
                this.updatePropertyPanel();
                this.saveProject();
            });
        }

        if (alignMiddle) {
            alignMiddle.addEventListener('click', () => {
                this.canvasEditor.alignElements('middle');
                this.updatePropertyPanel();
                this.saveProject();
            });
        }

        if (alignBottom) {
            alignBottom.addEventListener('click', () => {
                this.canvasEditor.alignElements('bottom');
                this.updatePropertyPanel();
                this.saveProject();
            });
        }
    }

    bindPropertyEvents() {
        const opacitySlider = document.getElementById('elementOpacity');
        const opacityValue = document.getElementById('opacityValue');

        if (opacitySlider && opacityValue) {
            opacitySlider.addEventListener('input', (e) => {
                if (this.selectedElement) {
                    const opacity = parseInt(e.target.value);
                    this.selectedElement.setOpacity(opacity);
                    opacityValue.textContent = `${opacity}%`;
                    this.canvasEditor.render();
                    this.updateLayerData();
                }
            });
        }

        const xInput = document.getElementById('elementX');
        const yInput = document.getElementById('elementY');
        const widthInput = document.getElementById('elementWidth');
        const heightInput = document.getElementById('elementHeight');

        const updatePosition = () => {
            if (this.selectedElement && !this.isUpdatingPropertyPanel) {
                const x = parseFloat(xInput.value) || 0;
                const y = parseFloat(yInput.value) || 0;
                this.selectedElement.setPosition(x, y);
                this.canvasEditor.render();
                this.updateLayerData();
            }
        };

        const updateSize = () => {
            if (this.selectedElement && !this.isUpdatingPropertyPanel) {
                const width = parseFloat(widthInput.value) || 10;
                const height = parseFloat(heightInput.value) || 10;
                this.selectedElement.setSize(width, height);
                this.canvasEditor.render();
                this.updateLayerData();
            }
        };

        if (xInput) xInput.addEventListener('change', updatePosition);
        if (yInput) yInput.addEventListener('change', updatePosition);
        if (widthInput) widthInput.addEventListener('change', updateSize);
        if (heightInput) heightInput.addEventListener('change', updateSize);

        const fontSizeInput = document.getElementById('fontSize');
        const fontWeightSelect = document.getElementById('fontWeight');
        const textAlignSelect = document.getElementById('textAlign');
        const colorInput = document.getElementById('textColor');

        if (fontSizeInput) {
            fontSizeInput.addEventListener('change', () => {
                if (this.selectedElement && this.selectedElement.type === 'text') {
                    this.selectedElement.fontSize = parseInt(fontSizeInput.value) || 24;
                    this.selectedElement.autoSize();
                    this.canvasEditor.render();
                    this.updatePropertyPanel();
                    this.updateLayerData();
                }
            });
        }

        const fontFamilySelect = document.getElementById('fontFamily');
        if (fontFamilySelect) {
            fontFamilySelect.addEventListener('change', () => {
                if (this.selectedElement && this.selectedElement.type === 'text') {
                    this.selectedElement.fontFamily = fontFamilySelect.value;
                    this.selectedElement.autoSize();
                    this.canvasEditor.render();
                    this.updatePropertyPanel();
                    this.updateLayerData();
                }
            });
        }

        const detectFontsBtn = document.getElementById('detectFontsBtn');
        if (detectFontsBtn) {
            detectFontsBtn.addEventListener('click', () => {
                FontDetector.populateFontSelect('fontFamily', this.selectedElement?.fontFamily || 'Microsoft YaHei');
                Utils.showToast('字体列表已更新', 'success');
            });
        }

        if (fontWeightSelect) {
            fontWeightSelect.addEventListener('change', () => {
                if (this.selectedElement && this.selectedElement.type === 'text') {
                    this.selectedElement.fontWeight = fontWeightSelect.value;
                    this.canvasEditor.render();
                    this.updateLayerData();
                }
            });
        }

        if (textAlignSelect) {
            textAlignSelect.addEventListener('change', () => {
                if (this.selectedElement && this.selectedElement.type === 'text') {
                    this.selectedElement.textAlign = textAlignSelect.value;
                    this.canvasEditor.render();
                    this.updateLayerData();
                }
            });
        }

        if (colorInput) {
            colorInput.addEventListener('input', () => {
                if (this.selectedElement) {
                    if (this.selectedElement.type === 'text') {
                        this.selectedElement.color = colorInput.value;
                    } else if (this.selectedElement.type === 'shape' || this.selectedElement.type === 'sticker') {
                        this.selectedElement.fill = colorInput.value;
                    }
                    this.canvasEditor.render();
                    this.updateLayerData();
                }
            });
        }

        const shapeFill = document.getElementById('shapeFill');
        const shapeStroke = document.getElementById('shapeStroke');
        const shapeStrokeWidth = document.getElementById('shapeStrokeWidth');
        const shapeBorderRadius = document.getElementById('shapeBorderRadius');

        if (shapeFill) {
            shapeFill.addEventListener('input', () => {
                if (this.selectedElement && this.selectedElement.type === 'shape') {
                    this.selectedElement.fill = shapeFill.value;
                    this.canvasEditor.render();
                    this.updateLayerData();
                }
            });
        }

        if (shapeStroke) {
            shapeStroke.addEventListener('input', () => {
                if (this.selectedElement && this.selectedElement.type === 'shape') {
                    this.selectedElement.stroke = shapeStroke.value;
                    this.canvasEditor.render();
                    this.updateLayerData();
                }
            });
        }

        if (shapeStrokeWidth) {
            shapeStrokeWidth.addEventListener('input', () => {
                if (this.selectedElement && this.selectedElement.type === 'shape') {
                    this.selectedElement.strokeWidth = parseInt(shapeStrokeWidth.value) || 0;
                    this.canvasEditor.render();
                    this.updateLayerData();
                }
            });
        }

        if (shapeBorderRadius) {
            shapeBorderRadius.addEventListener('input', () => {
                if (this.selectedElement && this.selectedElement.type === 'shape') {
                    this.selectedElement.borderRadius = parseInt(shapeBorderRadius.value) || 0;
                    this.canvasEditor.render();
                    this.updateLayerData();
                }
            });
        }

        // 滤镜事件绑定
        this.bindFilterEvents();
    }

    bindFilterEvents() {
        // 预设选择
        const presetSelect = document.getElementById('filterPreset');
        if (presetSelect) {
            presetSelect.addEventListener('change', () => {
                if (this.selectedElement && this.selectedElement.type === 'image') {
                    this.selectedElement.applyPreset(presetSelect.value);
                    this.updateFilterSettings(this.selectedElement);
                    this.canvasEditor.render();
                    this.saveProject();
                }
            });
        }

        // 重置按钮
        const resetBtn = document.getElementById('resetFilters');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                if (this.selectedElement && this.selectedElement.type === 'image') {
                    this.selectedElement.resetFilters();
                    this.updateFilterSettings(this.selectedElement);
                    this.canvasEditor.render();
                    this.saveProject();
                    Utils.showToast('滤镜已重置', 'success');
                }
            });
        }

        // 各个滤镜滑块
        const filterMap = [
            { id: 'filterBrightness', name: 'brightness', displayId: 'brightnessValue' },
            { id: 'filterContrast', name: 'contrast', displayId: 'contrastValue' },
            { id: 'filterSaturate', name: 'saturate', displayId: 'saturateValue' },
            { id: 'filterGrayscale', name: 'grayscale', displayId: 'grayscaleValue' },
            { id: 'filterSepia', name: 'sepia', displayId: 'sepiaValue' },
            { id: 'filterHueRotate', name: 'hueRotate', displayId: 'hueRotateValue' },
            { id: 'filterInvert', name: 'invert', displayId: 'invertValue' },
            { id: 'filterBlur', name: 'blur', displayId: 'blurValue' },
            { id: 'filterOpacity', name: 'opacity', displayId: 'filterOpacityValue' }
        ];

        filterMap.forEach(({ id, name, displayId }) => {
            const slider = document.getElementById(id);
            const display = document.getElementById(displayId);

            if (slider) {
                slider.addEventListener('input', () => {
                    if (this.selectedElement && this.selectedElement.type === 'image') {
                        const value = parseInt(slider.value);
                        this.selectedElement.setFilter(name, value);

                        if (display) {
                            const unit = FilterManager.FILTERS[name]?.unit || '';
                            display.textContent = `${value}${unit}`;
                        }

                        this.canvasEditor.render();
                    }
                });

                slider.addEventListener('change', () => {
                    this.saveProject();
                });
            }
        });
    }

    bindBackgroundEvents() {
        const bgColorInput = document.getElementById('bgColor');
        const useGradientCheckbox = document.getElementById('useGradient');
        const gradientStartInput = document.getElementById('gradientStart');
        const gradientEndInput = document.getElementById('gradientEnd');
        const gradientDirectionSelect = document.getElementById('gradientDirection');
        const bgImageInput = document.getElementById('bgImageInput');

        if (bgColorInput) {
            bgColorInput.addEventListener('input', () => {
                this.canvasEditor.setBackgroundColor(bgColorInput.value);
                this.saveProject();
            });
        }

        if (useGradientCheckbox) {
            useGradientCheckbox.addEventListener('change', () => {
                this.canvasEditor.setGradient(
                    useGradientCheckbox.checked,
                    gradientStartInput.value,
                    gradientEndInput.value,
                    gradientDirectionSelect.value
                );
                this.saveProject();
            });
        }

        if (gradientStartInput) {
            gradientStartInput.addEventListener('input', () => {
                this.canvasEditor.setGradient(
                    useGradientCheckbox.checked,
                    gradientStartInput.value,
                    gradientEndInput.value,
                    gradientDirectionSelect.value
                );
                this.saveProject();
            });
        }

        if (gradientEndInput) {
            gradientEndInput.addEventListener('input', () => {
                this.canvasEditor.setGradient(
                    useGradientCheckbox.checked,
                    gradientStartInput.value,
                    gradientEndInput.value,
                    gradientDirectionSelect.value
                );
                this.saveProject();
            });
        }

        if (gradientDirectionSelect) {
            gradientDirectionSelect.addEventListener('change', () => {
                this.canvasEditor.setGradient(
                    useGradientCheckbox.checked,
                    gradientStartInput.value,
                    gradientEndInput.value,
                    gradientDirectionSelect.value
                );
                this.saveProject();
            });
        }

        if (bgImageInput) {
            bgImageInput.addEventListener('change', async (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        const img = new Image();
                        img.onload = () => {
                            this.canvasEditor.setBackgroundImage(img);
                            this.saveProject();
                            Utils.showToast('背景图片已设置', 'success');
                        };
                        img.src = event.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    }

    bindContextMenuEvents() {
        const contextMenu = document.getElementById('contextMenu');

        document.addEventListener('contextmenu', (e) => {
            if (this.selectedElement) {
                e.preventDefault();
                contextMenu.style.left = `${e.clientX}px`;
                contextMenu.style.top = `${e.clientY}px`;
                contextMenu.classList.add('show');
            }
        });

        document.addEventListener('click', () => {
            contextMenu.classList.remove('show');
        });

        contextMenu.querySelectorAll('.context-menu-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const action = item.dataset.action;
                this.handleContextMenuAction(action);
                contextMenu.classList.remove('show');
            });
        });
    }

    handleContextMenuAction(action) {
        if (!this.selectedElement) return;

        switch (action) {
            case 'layerUp':
                this.canvasEditor.elementManager.moveUp(this.selectedElement.id);
                this.canvasEditor.layerManager.moveLayer(this.selectedElement.id, 'up');
                break;
            case 'layerDown':
                this.canvasEditor.elementManager.moveDown(this.selectedElement.id);
                this.canvasEditor.layerManager.moveLayer(this.selectedElement.id, 'down');
                break;
            case 'layerTop':
                this.canvasEditor.elementManager.bringToFront(this.selectedElement.id);
                this.canvasEditor.layerManager.bringToFront(this.selectedElement.id);
                break;
            case 'layerBottom':
                this.canvasEditor.elementManager.sendToBack(this.selectedElement.id);
                this.canvasEditor.layerManager.sendToBack(this.selectedElement.id);
                break;
            case 'copy':
                this.copyElement();
                return;
            case 'delete':
                this.deleteElement();
                return;
        }

        this.canvasEditor.render();
        this.updateLayerData();
        this.saveProject();
    }

    copyElement() {
        if (!this.selectedElement) return;

        // 保存到剪贴板
        this.clipboardElement = this.selectedElement.clone();
        this.clipboardElement.id = Utils.generateId();
        
        Utils.showToast('元素已复制到剪贴板', 'success');
    }

    pasteElement() {
        if (!this.clipboardElement) {
            Utils.showToast('剪贴板为空', 'info');
            return;
        }

        const newElement = this.clipboardElement.clone();
        newElement.id = Utils.generateId();
        // 粘贴时偏移位置，避免完全重叠
        newElement.x = this.clipboardElement.x + 20;
        newElement.y = this.clipboardElement.y + 20;
        // 更新剪贴板位置，以便下次粘贴继续偏移
        this.clipboardElement.x = newElement.x;
        this.clipboardElement.y = newElement.y;

        this.canvasEditor.elementManager.addElement(newElement);
        this.canvasEditor.createLayer(newElement);
        this.selectedElement = newElement;
        this.canvasEditor.selectElement(newElement.id);
        this.canvasEditor.layerManager.selectLayer(newElement.id);
        this.canvasEditor.render();
        this.updateLayerList();
        this.updatePropertyPanel();
        this.updateLayerData();
        this.saveProject();
        Utils.showToast('元素已粘贴', 'success');
    }

    deleteElement() {
        if (!this.selectedElement) return;

        const elementId = this.selectedElement.id;
        this.canvasEditor.elementManager.removeElement(elementId);
        this.canvasEditor.layerManager.removeLayer(elementId);
        this.deselectElement();
        this.canvasEditor.render();
        this.updateLayerList();
        this.saveProject();
        Utils.showToast('元素已删除', 'success');
    }

    updateLayerList() {
        const layerList = document.getElementById('layerList');
        if (!layerList) return;

        layerList.innerHTML = '';

        const layers = this.canvasEditor.layerManager.layers;
        const elements = this.canvasEditor.elementManager.elements;

        layers.slice().reverse().forEach(layer => {
            const li = document.createElement('div');
            li.className = 'layer-item';
            li.dataset.layerId = layer.id;

            if (this.selectedElement && this.selectedElement.id === layer.id) {
                li.classList.add('selected');
            }

            const icon = this.getLayerIcon(layer.type);
            li.innerHTML = `
                <span class="layer-icon">${icon}</span>
                <span class="layer-name">${layer.name}</span>
                <div class="layer-actions">
                    <button class="layer-btn layer-toggle" title="${layer.visible ? '隐藏' : '显示'}">
                        ${layer.visible ? '👁️' : '👁️‍🗨️'}
                    </button>
                    <button class="layer-btn layer-delete" title="删除">🗑️</button>
                </div>
            `;

            li.addEventListener('click', (e) => {
                if (!e.target.classList.contains('layer-btn')) {
                    const element = elements.find(el => el.id === layer.id);
                    if (element) {
                        this.selectElement(element);
                    }
                }
            });

            const toggleBtn = li.querySelector('.layer-toggle');
            toggleBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.canvasEditor.layerManager.toggleVisibility(layer.id);
                const element = elements.find(el => el.id === layer.id);
                if (element) {
                    element.visible = layer.visible;
                }
                this.canvasEditor.render();
                this.updateLayerList();
                this.saveProject();
            });

            const deleteBtn = li.querySelector('.layer-delete');
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (confirm('确定要删除此图层吗？')) {
                    this.canvasEditor.elementManager.removeElement(layer.id);
                    this.canvasEditor.layerManager.removeLayer(layer.id);
                    if (this.selectedElement && this.selectedElement.id === layer.id) {
                        this.deselectElement();
                    }
                    this.canvasEditor.render();
                    this.updateLayerList();
                    this.saveProject();
                    Utils.showToast('图层已删除', 'success');
                }
            });

            layerList.appendChild(li);
        });
    }

    updateLayerSelection() {
        const layerItems = document.querySelectorAll('.layer-item');
        layerItems.forEach(item => {
            if (this.selectedElement && item.dataset.layerId === this.selectedElement.id) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });
    }

    getLayerIcon(type) {
        const icons = {
            'text': '📝',
            'image': '🖼️',
            'shape': '⬛',
            'sticker': '⭐'
        };
        return icons[type] || '📄';
    }

    updatePropertyPanel() {
        this.isUpdatingPropertyPanel = true;
        
        // 获取所有选中的元素
        const selectedElements = this.canvasEditor.elementManager.getSelectedElements();
        
        if (selectedElements.length === 0) {
            this.clearPropertyPanel();
            this.isUpdatingPropertyPanel = false;
            return;
        }
        
        // 多选时显示提示信息
        const isMultiSelect = selectedElements.length > 1;
        const element = this.selectedElement; // 主要操作元素（最后选中的）

        const opacitySlider = document.getElementById('elementOpacity');
        const opacityValue = document.getElementById('opacityValue');
        const xInput = document.getElementById('elementX');
        const yInput = document.getElementById('elementY');
        const widthInput = document.getElementById('elementWidth');
        const heightInput = document.getElementById('elementHeight');

        if (isMultiSelect) {
            // 多选时显示提示，禁用部分输入框
            if (opacitySlider) {
                opacitySlider.value = element.opacity;
                opacitySlider.title = `多选: ${selectedElements.length} 个元素`;
            }
            if (opacityValue) opacityValue.textContent = `${element.opacity}% (${selectedElements.length}个元素)`;
            if (xInput) {
                xInput.value = Math.round(element.x);
                xInput.disabled = true;
                xInput.title = '多选时不能同时修改位置';
            }
            if (yInput) {
                yInput.value = Math.round(element.y);
                yInput.disabled = true;
                yInput.title = '多选时不能同时修改位置';
            }
            if (widthInput) {
                widthInput.value = Math.round(element.width);
                widthInput.disabled = true;
                widthInput.title = '多选时不能同时修改大小';
            }
            if (heightInput) {
                heightInput.value = Math.round(element.height);
                heightInput.disabled = true;
                heightInput.title = '多选时不能同时修改大小';
            }
        } else {
            // 单选时正常显示
            if (opacitySlider) {
                opacitySlider.value = element.opacity;
                opacitySlider.title = '';
            }
            if (opacityValue) opacityValue.textContent = `${element.opacity}%`;
            if (xInput) {
                xInput.value = Math.round(element.x);
                xInput.disabled = false;
                xInput.title = '';
            }
            if (yInput) {
                yInput.value = Math.round(element.y);
                yInput.disabled = false;
                yInput.title = '';
            }
            if (widthInput) {
                widthInput.value = Math.round(element.width);
                widthInput.disabled = false;
                widthInput.title = '';
            }
            if (heightInput) {
                heightInput.value = Math.round(element.height);
                heightInput.disabled = false;
                heightInput.title = '';
            }
        }

        const textSettings = document.getElementById('textSettings');
        const shapeSettings = document.getElementById('shapeSettings');
        const filterSettings = document.getElementById('filterSettings');
        const elementSettings = document.getElementById('elementSettings');

        // 多选时隐藏特定类型设置
        if (isMultiSelect) {
            if (textSettings) textSettings.style.display = 'none';
            if (shapeSettings) shapeSettings.style.display = 'none';
            if (filterSettings) filterSettings.style.display = 'none';
        } else {
            if (textSettings) textSettings.style.display = element.type === 'text' ? 'block' : 'none';
            if (shapeSettings) shapeSettings.style.display = element.type === 'shape' ? 'block' : 'none';
            if (filterSettings) {
                const isImage = element.type === 'image';
                filterSettings.style.display = isImage ? 'block' : 'none';
                if (isImage) {
                    this.updateFilterSettings(element);
                }
            }

            if (element.type === 'text') {
                const fontSizeInput = document.getElementById('fontSize');
                const fontFamilySelect = document.getElementById('fontFamily');
                const fontWeightSelect = document.getElementById('fontWeight');
                const textAlignSelect = document.getElementById('textAlign');
                const colorInput = document.getElementById('textColor');

                if (fontSizeInput) fontSizeInput.value = element.fontSize;
                if (fontFamilySelect) fontFamilySelect.value = element.fontFamily;
                if (fontWeightSelect) fontWeightSelect.value = element.fontWeight;
                if (textAlignSelect) textAlignSelect.value = element.textAlign;
                if (colorInput) colorInput.value = element.color;
            }

            if (element.type === 'shape') {
                const shapeFill = document.getElementById('shapeFill');
                const shapeStroke = document.getElementById('shapeStroke');
                const shapeStrokeWidth = document.getElementById('shapeStrokeWidth');
                const shapeBorderRadius = document.getElementById('shapeBorderRadius');

                if (shapeFill) shapeFill.value = element.fill;
                if (shapeStroke) shapeStroke.value = element.stroke;
                if (shapeStrokeWidth) shapeStrokeWidth.value = element.strokeWidth;
                if (shapeBorderRadius) shapeBorderRadius.value = element.borderRadius;
            }
        }
        
        this.isUpdatingPropertyPanel = false;
    }

    updateFilterSettings(element) {
        if (!element || element.type !== 'image') return;

        const filters = element.getFilter ? element.getFilter() : {};

        // 更新预设下拉框
        const presetSelect = document.getElementById('filterPreset');
        if (presetSelect) {
            // 检测当前滤镜值匹配哪个预设
            let matchedPreset = 'normal';
            for (const [key, preset] of Object.entries(FilterManager.PRESETS)) {
                if (key === 'normal') continue;
                const presetFilters = preset.filters;
                let matches = true;
                for (const [fKey, fValue] of Object.entries(presetFilters)) {
                    if ((filters[fKey] || FilterManager.FILTERS[fKey]?.default) !== fValue) {
                        matches = false;
                        break;
                    }
                }
                if (matches) {
                    matchedPreset = key;
                    break;
                }
            }
            presetSelect.value = matchedPreset;
        }

        // 更新各个滤镜滑块
        const filterMapping = {
            'filterBrightness': 'brightness',
            'filterContrast': 'contrast',
            'filterSaturate': 'saturate',
            'filterGrayscale': 'grayscale',
            'filterSepia': 'sepia',
            'filterHueRotate': 'hueRotate',
            'filterInvert': 'invert',
            'filterBlur': 'blur',
            'filterOpacity': 'opacity'
        };

        for (const [elementId, filterKey] of Object.entries(filterMapping)) {
            const input = document.getElementById(elementId);
            const valueSpan = document.getElementById(filterKey + 'Value');
            if (input) {
                const defaultValue = FilterManager.FILTERS[filterKey]?.default ?? 0;
                input.value = filters[filterKey] ?? defaultValue;
            }
            if (valueSpan) {
                const unit = FilterManager.FILTERS[filterKey]?.unit ?? '';
                const defaultValue = FilterManager.FILTERS[filterKey]?.default ?? 0;
                valueSpan.textContent = (filters[filterKey] ?? defaultValue) + unit;
            }
        }
    }

    clearPropertyPanel() {
        const opacitySlider = document.getElementById('elementOpacity');
        const opacityValue = document.getElementById('opacityValue');
        const xInput = document.getElementById('elementX');
        const yInput = document.getElementById('elementY');
        const widthInput = document.getElementById('elementWidth');
        const heightInput = document.getElementById('elementHeight');

        if (opacitySlider) opacitySlider.value = 100;
        if (opacityValue) opacityValue.textContent = '100%';
        if (xInput) xInput.value = 0;
        if (yInput) yInput.value = 0;
        if (widthInput) widthInput.value = 100;
        if (heightInput) heightInput.value = 100;

        const textSettings = document.getElementById('textSettings');
        const shapeSettings = document.getElementById('shapeSettings');
        const filterSettings = document.getElementById('filterSettings');

        if (textSettings) textSettings.style.display = 'none';
        if (shapeSettings) shapeSettings.style.display = 'none';
        if (filterSettings) filterSettings.style.display = 'none';
    }

    async exportImage() {
        this.deselectElement();
        const platform = this.getSelectedPlatform();
        const filename = `cover_${platform}_${Date.now()}.png`;

        try {
            await this.canvasEditor.exportAsImage(filename, 'image/png');
            Utils.showToast('图片导出成功', 'success');
        } catch (error) {
            console.error('Export failed:', error);
            Utils.showToast('导出失败: ' + error.message, 'error');
        }
    }

    getSelectedPlatform() {
        const activeBtn = document.querySelector('.size-btn.active');
        return activeBtn ? activeBtn.dataset.platform : 'douyin';
    }

    saveProject() {
        try {
            const project = this.canvasEditor.exportProject();
            const result = LocalStorageManager.save('thumb_creator_project', project);
            
            if (result.compressed) {
                Utils.showToast(`项目已保存（已压缩: ${Math.round(result.originalSize / 1024)}KB → ${Math.round(result.compressedSize / 1024)}KB）`, 'success');
            }
            
            this.saveHistory();
            return true;
        } catch (error) {
            Utils.showToast('保存失败: ' + error.message, 'error');
            console.error('Save project failed:', error);
            return false;
        }
    }

    async loadSavedProject() {
        const saved = LocalStorageManager.load('thumb_creator_project');
        if (saved) {
            await this.canvasEditor.importProject(saved);
            this.updateLayerList();
            Utils.showToast('已加载保存的项目', 'info');
        }
    }

    loadProjectDialog() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.style.display = 'none';

        const handleChange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = async (event) => {
                    try {
                        const project = JSON.parse(event.target.result);
                        await this.canvasEditor.importProject(project);
                        this.updateLayerList();
                        this.saveProject();
                        Utils.showToast('项目已加载', 'success');
                    } catch (error) {
                        Utils.showToast('加载失败: ' + error.message, 'error');
                    }
                };
                reader.readAsText(file);
            }
            // 清理事件监听器和元素
            input.removeEventListener('change', handleChange);
            document.body.removeChild(input);
        };

        input.addEventListener('change', handleChange);
        document.body.appendChild(input);
        input.click();
    }

    exportProjectDialog() {
        const project = this.canvasEditor.exportProject();
        const json = JSON.stringify(project, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `cover_project_${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        Utils.showToast('项目已导出', 'success');
    }

    getResizeCursor(handle) {
        const cursors = {
            'nw': 'nw-resize',
            'n': 'n-resize',
            'ne': 'ne-resize',
            'e': 'e-resize',
            'se': 'se-resize',
            's': 's-resize',
            'sw': 'sw-resize',
            'w': 'w-resize'
        };
        return cursors[handle] || 'default';
    }

    clearCanvas() {
        this.canvasEditor.elementManager.clear();
        this.canvasEditor.layerManager.clear();
        this.deselectElement();
        this.canvasEditor.render();
        this.updateLayerList();
        this.saveProject();
        Utils.showToast('画布已清空', 'success');
    }

    // 打开模板选择器
    openTemplateSelector() {
        // 查找模板区域
        const templateSection = document.querySelector('.template-section');
        if (templateSection) {
            // 滚动到模板区域
            templateSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // 添加高亮动画
            templateSection.style.animation = 'templatePulse 1s ease';
            setTimeout(() => {
                templateSection.style.animation = '';
            }, 1000);

            Utils.showToast('请选择下方模板', 'info');
        } else {
            Utils.showToast('模板加载中，请稍候...', 'info');
        }
    }

    // 保存历史记录
    saveHistory() {
        if (this.isUndoRedo) return;
        
        const state = this.canvasEditor.exportProject();
        
        // 删除当前索引之后的历史记录
        this.history = this.history.slice(0, this.historyIndex + 1);
        
        // 添加新状态
        this.history.push(JSON.stringify(state));
        
        // 限制历史记录大小
        if (this.history.length > this.maxHistorySize) {
            this.history.shift();
        } else {
            this.historyIndex++;
        }
    }

    // 撤销
    undo() {
        if (this.historyIndex <= 0) {
            Utils.showToast('没有可撤销的操作', 'info');
            return;
        }
        
        this.isUndoRedo = true;
        this.historyIndex--;
        const state = JSON.parse(this.history[this.historyIndex]);
        this.canvasEditor.importProject(state);
        this.updateLayerList();
        this.deselectElement();
        this.canvasEditor.render();
        Utils.showToast('已撤销', 'success');
        this.isUndoRedo = false;
    }

    // 重做
    redo() {
        if (this.historyIndex >= this.history.length - 1) {
            Utils.showToast('没有可重做的操作', 'info');
            return;
        }
        
        this.isUndoRedo = true;
        this.historyIndex++;
        const state = JSON.parse(this.history[this.historyIndex]);
        this.canvasEditor.importProject(state);
        this.updateLayerList();
        this.deselectElement();
        this.canvasEditor.render();
        Utils.showToast('已重做', 'success');
        this.isUndoRedo = false;
    }

    // 初始化历史记录
    initHistory() {
        this.saveHistory();
    }
}

class PlatformSelector {
    constructor() {
        this.bindEvents();
    }

    bindEvents() {
        const buttons = document.querySelectorAll('.size-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const width = parseInt(btn.dataset.width);
                const height = parseInt(btn.dataset.height);

                if (window.app && window.app.canvasEditor) {
                    window.app.canvasEditor.setSize(width, height);
                    window.app.saveProject();
                }
            });
        });
    }
}

class ElementTools {
    constructor() {
        this.bindEvents();
    }

    bindEvents() {
        const addTextBtn = document.getElementById('addTextBtn');
        const addImageBtn = document.getElementById('addImageBtn');
        const addRectBtn = document.getElementById('addRectBtn');
        const addCircleBtn = document.getElementById('addCircleBtn');
        const addTriangleBtn = document.getElementById('addTriangleBtn');
        const addStarBtn = document.getElementById('addStarBtn');

        if (addTextBtn) {
            addTextBtn.addEventListener('click', () => {
                if (window.app && window.app.canvasEditor) {
                    const text = prompt('请输入文字内容:', '双击编辑文字');
                    if (text !== null) {
                        const element = window.app.canvasEditor.addText(text);
                        window.app.selectElement(element);
                        window.app.updateLayerList();
                        window.app.saveProject();
                    }
                }
            });
        }

        if (addImageBtn) {
            const imageInput = document.createElement('input');
            imageInput.type = 'file';
            imageInput.accept = 'image/*';
            imageInput.style.display = 'none';

            const handleImageChange = async (e) => {
                if (e.target.files && e.target.files[0]) {
                    const reader = new FileReader();
                    reader.onload = async (event) => {
                        if (window.app && window.app.canvasEditor) {
                            const element = await window.app.canvasEditor.addImage(event.target.result);
                            if (element) {
                                window.app.selectElement(element);
                                window.app.updateLayerList();
                                window.app.saveProject();
                            }
                        }
                    };
                    reader.readAsDataURL(e.target.files[0]);
                }
                // 清理事件监听器和元素
                imageInput.removeEventListener('change', handleImageChange);
                document.body.removeChild(imageInput);
            };

            addImageBtn.addEventListener('click', () => {
                document.body.appendChild(imageInput);
                imageInput.click();
            });

            imageInput.addEventListener('change', handleImageChange);
        }

        if (addRectBtn) {
            addRectBtn.addEventListener('click', () => {
                if (window.app && window.app.canvasEditor) {
                    const element = window.app.canvasEditor.addShape('rectangle');
                    window.app.selectElement(element);
                    window.app.updateLayerList();
                    window.app.saveProject();
                }
            });
        }

        if (addCircleBtn) {
            addCircleBtn.addEventListener('click', () => {
                if (window.app && window.app.canvasEditor) {
                    const element = window.app.canvasEditor.addShape('circle');
                    window.app.selectElement(element);
                    window.app.updateLayerList();
                    window.app.saveProject();
                }
            });
        }

        if (addTriangleBtn) {
            addTriangleBtn.addEventListener('click', () => {
                if (window.app && window.app.canvasEditor) {
                    const element = window.app.canvasEditor.addShape('triangle');
                    window.app.selectElement(element);
                    window.app.updateLayerList();
                    window.app.saveProject();
                }
            });
        }

        if (addStarBtn) {
            addStarBtn.addEventListener('click', () => {
                if (window.app && window.app.canvasEditor) {
                    const element = window.app.canvasEditor.addShape('star');
                    window.app.selectElement(element);
                    window.app.updateLayerList();
                    window.app.saveProject();
                }
            });
        }
    }
}

class StickerTools {
    constructor() {
        this.stickers = [
            { type: 'heart', icon: '❤️' },
            { type: 'star', icon: '⭐' },
            { type: 'fire', icon: '🔥' },
            { type: 'sparkle', icon: '✨' },
            { type: 'flower', icon: '🌸' }
        ];
        this.bindEvents();
    }

    bindEvents() {
        const container = document.getElementById('stickerList');
        if (!container) return;

        this.stickers.forEach(sticker => {
            const btn = document.createElement('button');
            btn.className = 'sticker-btn';
            btn.innerHTML = sticker.icon;
            btn.title = sticker.type;
            btn.addEventListener('click', () => {
                if (window.app && window.app.canvasEditor) {
                    const element = window.app.canvasEditor.addSticker(sticker.type);
                    window.app.selectElement(element);
                    window.app.updateLayerList();
                    window.app.saveProject();
                }
            });
            container.appendChild(btn);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
    window.platformSelector = new PlatformSelector();
    window.elementTools = new ElementTools();
    window.stickerTools = new StickerTools();
});
