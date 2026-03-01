class CanvasEditor {
    constructor(canvasElement, options = {}) {
        this.canvas = canvasElement;
        this.ctx = canvasElement.getContext('2d');
        this.options = {
            width: options.width || 1080,
            height: options.height || 1920,
            backgroundColor: options.backgroundColor || '#ffffff',
            useGradient: options.useGradient || false,
            gradientStart: options.gradientStart || '#667eea',
            gradientEnd: options.gradientEnd || '#764ba2',
            gradientDirection: options.gradientDirection || 'to-bottom',
            backgroundImage: options.backgroundImage || null,
            ...options
        };
        
        this.elementManager = new ElementManager();
        this.layerManager = new LayerManager();
        this.panOffsetX = 0;
        this.panOffsetY = 0;
        this.zoomLevel = 1;
        
        // 辅助线相关配置
        this.guides = {
            horizontal: [this.options.height / 2], // 默认垂直中心线
            vertical: [this.options.width / 2],   // 默认水平中心线
            enabled: true
        };
        this.snapThreshold = 10; // 吸附阈值，像素
        
        this.setupCanvas();
        this.bindEvents();
    }

    setupCanvas() {
        this.canvas.width = this.options.width;
        this.canvas.height = this.options.height;
        this.updateCanvasStyle();
    }

    updateCanvasStyle() {
        this.canvas.style.width = `${this.options.width}px`;
        this.canvas.style.height = `${this.options.height}px`;
    }

    setSize(width, height) {
        this.options.width = width;
        this.options.height = height;
        this.setupCanvas();
        this.render();
    }

    setBackgroundColor(color) {
        this.options.backgroundColor = color;
        this.render();
    }

    setGradient(useGradient, startColor, endColor, direction) {
        this.options.useGradient = useGradient;
        this.options.gradientStart = startColor;
        this.options.gradientEnd = endColor;
        this.options.gradientDirection = direction;
        this.render();
    }

    setBackgroundImage(image) {
        this.options.backgroundImage = image;
        this.render();
    }

    bindEvents() {
        // Double-click is handled by the App to keep selection and UI logic centralized.
    }

    setPanOffset(panOffsetX, panOffsetY) {
        this.panOffsetX = panOffsetX;
        this.panOffsetY = panOffsetY;
    }

    setZoom(zoomLevel) {
        this.zoomLevel = zoomLevel;
    }

    handleClick(e) {
        // 使用 App 类的坐标转换方法，确保一致性
        if (window.app) {
            const { x, y } = window.app.getCanvasPoint(e);
            
            // 检测是否按住了Shift或Ctrl键
            const isMultiSelect = e.shiftKey || e.ctrlKey;

            const elements = this.elementManager.getElementsByZIndex();
            const clickedElement = [...elements].reverse().find(element => {
                return element.visible && element.containsPoint(x, y);
            });

            if (clickedElement) {
                this.selectElement(clickedElement.id, isMultiSelect);
            } else {
                // 如果不是多选模式，点击空白区域取消所有选中
                if (!isMultiSelect) {
                    this.deselectAll();
                }
            }
        }
    }

    handleDoubleClick(e) {
        e.preventDefault();
        e.stopPropagation();
        const element = this.elementManager.getSelectedElement();
        if (element && element.type === 'text') {
            const newText = prompt('编辑文字内容:', element.text);
            if (newText !== null) {
                element.setText(newText);
                this.render();
            }
        }
    }

    selectElement(elementId, isMultiSelect = false) {
        const element = this.elementManager.selectElement(elementId, isMultiSelect);
        this.render();

        // Keep App-level selection and layer manager in sync when available
        if (typeof window !== 'undefined' && window.app) {
            const selected = this.elementManager.getSelectedElement();
            window.app.selectedElement = selected || null;
            if (this.layerManager) this.layerManager.selectLayer(selected ? selected.id : null);
            if (window.app.updateLayerSelection) window.app.updateLayerSelection();
            if (window.app.updatePropertyPanel) window.app.updatePropertyPanel();
        }
        return element;
    }

    deselectAll() {
        this.elementManager.clearSelection();
        this.render();
        if (typeof window !== 'undefined' && window.app) {
            window.app.selectedElement = null;
            if (this.layerManager) this.layerManager.selectLayer(null);
            if (window.app.updateLayerSelection) window.app.updateLayerSelection();
            if (window.app.clearPropertyPanel) window.app.clearPropertyPanel();
        }
    }

    addText(text = '双击编辑文字') {
        const element = ElementFactory.createText({
            x: this.options.width / 2 - 100,
            y: this.options.height / 2 - 30,
            text: text
        });
        
        this.elementManager.addElement(element);
        this.createLayer(element);
        this.render();
        
        return element;
    }

    async addImage(src) {
        const element = ElementFactory.createImage({
            x: this.options.width / 2 - 100,
            y: this.options.height / 2 - 100
        });
        
        try {
            await element.loadImage(src);
            this.elementManager.addElement(element);
            this.createLayer(element);
            this.render();
            return element;
        } catch (error) {
            console.error('Failed to load image:', error);
            return null;
        }
    }

    addShape(shapeType = 'rectangle') {
        const element = ElementFactory.createShape({
            x: this.options.width / 2 - 75,
            y: this.options.height / 2 - 75,
            width: 150,
            height: 150,
            shapeType: shapeType
        });
        
        this.elementManager.addElement(element);
        this.createLayer(element);
        this.render();
        
        return element;
    }

    addSticker(stickerType = 'star') {
        const element = ElementFactory.createSticker({
            x: this.options.width / 2 - 25,
            y: this.options.height / 2 - 25,
            stickerType: stickerType
        });
        
        this.elementManager.addElement(element);
        this.createLayer(element);
        this.render();
        
        return element;
    }

    createLayer(element) {
        const layer = new Layer({
            id: element.id,
            name: element.name,
            type: element.type,
            data: element.toJSON()
        });
        
        this.layerManager.addLayer(layer);
    }

    removeSelectedElement() {
        const element = this.elementManager.getSelectedElement();
        if (element) {
            this.elementManager.removeElement(element.id);
            this.layerManager.removeLayer(element.id);
            this.render();
            return true;
        }
        return false;
    }

    bringSelectedToFront() {
        const element = this.elementManager.getSelectedElement();
        if (element) {
            this.elementManager.bringToFront(element.id);
            if (this.layerManager) this.layerManager.bringToFront(element.id);
            this.render();
        }
    }

    sendSelectedToBack() {
        const element = this.elementManager.getSelectedElement();
        if (element) {
            this.elementManager.sendToBack(element.id);
            if (this.layerManager) this.layerManager.sendToBack(element.id);
            this.render();
        }
    }

    updateSelectedElement(props) {
        const element = this.elementManager.getSelectedElement();
        if (element) {
            Object.assign(element, props);
            
            const layer = this.layerManager.getSelectedLayer();
            if (layer) {
                layer.data = element.toJSON();
            }
            
            this.render();
        }
    }

    render() {
        this.ctx.clearRect(0, 0, this.options.width, this.options.height);
        this.drawBackground();
        this.drawGuides();
        this.drawElements();
        this.drawSelection();
    }

    drawBackground() {
        if (this.options.backgroundImage) {
            const img = this.options.backgroundImage;
            const canvasWidth = this.options.width;
            const canvasHeight = this.options.height;
            const imgRatio = img.naturalWidth / img.naturalHeight;
            const canvasRatio = canvasWidth / canvasHeight;

            let drawWidth, drawHeight, offsetX, offsetY;

            if (imgRatio > canvasRatio) {
                drawWidth = canvasWidth;
                drawHeight = canvasWidth / imgRatio;
                offsetX = 0;
                offsetY = (canvasHeight - drawHeight) / 2;
            } else {
                drawHeight = canvasHeight;
                drawWidth = canvasHeight * imgRatio;
                offsetX = (canvasWidth - drawWidth) / 2;
                offsetY = 0;
            }

            this.ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        } else if (this.options.useGradient) {
            const gradient = this.createGradient();
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(0, 0, this.options.width, this.options.height);
        } else {
            this.ctx.fillStyle = this.options.backgroundColor;
            this.ctx.fillRect(0, 0, this.options.width, this.options.height);
        }
    }

    createGradient() {
        let startX, startY, endX, endY;
        
        switch (this.options.gradientDirection) {
            case 'to-right':
                startX = 0; startY = 0;
                endX = this.options.width; endY = 0;
                break;
            case 'to-br':
                startX = 0; startY = 0;
                endX = this.options.width; endY = this.options.height;
                break;
            case 'to-bl':
                startX = this.options.width; startY = 0;
                endX = 0; endY = this.options.height;
                break;
            default:
                startX = 0; startY = 0;
                endX = 0; endY = this.options.height;
        }
        
        const gradient = this.ctx.createLinearGradient(startX, startY, endX, endY);
        gradient.addColorStop(0, this.options.gradientStart);
        gradient.addColorStop(1, this.options.gradientEnd);
        
        return gradient;
    }

    drawGuides() {
        if (!this.guides.enabled) return;

        this.ctx.save();
        this.ctx.strokeStyle = '#667eea';
        this.ctx.lineWidth = 1;
        this.ctx.setLineDash([5, 5]);
        this.ctx.globalAlpha = 0.7;

        // 绘制水平辅助线
        this.guides.horizontal.forEach(y => {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.options.width, y);
            this.ctx.stroke();
        });

        // 绘制垂直辅助线
        this.guides.vertical.forEach(x => {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.options.height);
            this.ctx.stroke();
        });

        this.ctx.restore();
    }

    drawElements() {
        const elements = this.elementManager.getElementsByZIndex();
        elements.forEach(element => {
            if (element.render) {
                element.render(this.ctx);
            }
        });
    }

    drawSelection() {
        const selectedElements = this.elementManager.getSelectedElements();
        if (selectedElements.length === 0) {
            return;
        }

        // 如果只有一个选中元素，绘制完整的选择框和控制点
        if (selectedElements.length === 1) {
            const element = selectedElements[0];
            this.ctx.save();
            this.ctx.strokeStyle = '#667eea';
            this.ctx.lineWidth = 3;
            this.ctx.setLineDash([5, 5]);
            this.ctx.strokeRect(
                element.x - 2,
                element.y - 2,
                element.width + 4,
                element.height + 4
            );
            this.ctx.restore();

            this.drawResizeHandles(element);
            this.drawRotationHandle(element);
        } else {
            // 如果有多个选中元素，为每个元素绘制简单的选择框
            selectedElements.forEach(element => {
                this.ctx.save();
                this.ctx.strokeStyle = '#667eea';
                this.ctx.lineWidth = 3;
                this.ctx.setLineDash([5, 5]);
                this.ctx.strokeRect(
                    element.x - 2,
                    element.y - 2,
                    element.width + 4,
                    element.height + 4
                );
                this.ctx.restore();
            });
        }
    }

    drawResizeHandles(element) {
        const zoomLevel = this.zoomLevel || 1;
        // 手柄大小随画布缩放，保持相对比例
        const handleSize = 30 * zoomLevel;
        const lineWidth = 3 * zoomLevel;
        
        this.ctx.save();
        this.ctx.fillStyle = '#ffffff';
        this.ctx.strokeStyle = '#667eea';
        this.ctx.lineWidth = lineWidth;

        const handles = [
            { x: element.x - handleSize / 2, y: element.y - handleSize / 2 },
            { x: element.x + element.width / 2 - handleSize / 2, y: element.y - handleSize / 2 },
            { x: element.x + element.width - handleSize / 2, y: element.y - handleSize / 2 },
            { x: element.x + element.width - handleSize / 2, y: element.y + element.height / 2 - handleSize / 2 },
            { x: element.x + element.width - handleSize / 2, y: element.y + element.height - handleSize / 2 },
            { x: element.x + element.width / 2 - handleSize / 2, y: element.y + element.height - handleSize / 2 },
            { x: element.x - handleSize / 2, y: element.y + element.height - handleSize / 2 },
            { x: element.x - handleSize / 2, y: element.y + element.height / 2 - handleSize / 2 }
        ];

        handles.forEach(handle => {
            this.ctx.fillRect(handle.x, handle.y, handleSize, handleSize);
            this.ctx.strokeRect(handle.x, handle.y, handleSize, handleSize);
        });

        this.ctx.restore();
    }

    drawRotationHandle(element) {
        const zoomLevel = this.zoomLevel || 1;
        // 旋转手柄大小随画布缩放
        const handleRadius = 12 * zoomLevel;
        const handleY = element.y - 35 * zoomLevel;

        this.ctx.save();
        this.ctx.fillStyle = '#667eea';
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 2;

        this.ctx.beginPath();
        this.ctx.arc(element.x + element.width / 2, handleY, handleRadius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();

        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = 'bold 14px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText('↻', element.x + element.width / 2, handleY);

        this.ctx.beginPath();
        this.ctx.setLineDash([3, 3]);
        this.ctx.strokeStyle = '#667eea';
        this.ctx.moveTo(element.x + element.width / 2, element.y);
        this.ctx.lineTo(element.x + element.width / 2, handleY);
        this.ctx.stroke();

        this.ctx.restore();
    }

    getHandleAtPosition(x, y, zoomLevel = 1) {
        let element = this.elementManager.getSelectedElement();
        if (!element && typeof window !== 'undefined' && window.app && window.app.selectedElement) {
            element = window.app.selectedElement;
        }
        if (!element) return null;

        // 手柄大小随画布缩放，保持相对比例
        const handleSize = 30 * zoomLevel;
        const handleY = element.y - 35 * zoomLevel;
        const rotationHandleRadius = 12 * zoomLevel;

        // Check rotation handle first
        if (Math.sqrt(Math.pow(x - (element.x + element.width / 2), 2) + Math.pow(y - handleY, 2)) <= rotationHandleRadius) {
            return 'rotate';
        }

        // Calculate handle positions exactly like in drawResizeHandles
        const handles = [
            { name: 'nw', x: element.x - handleSize / 2, y: element.y - handleSize / 2 },
            { name: 'n', x: element.x + element.width / 2 - handleSize / 2, y: element.y - handleSize / 2 },
            { name: 'ne', x: element.x + element.width - handleSize / 2, y: element.y - handleSize / 2 },
            { name: 'e', x: element.x + element.width - handleSize / 2, y: element.y + element.height / 2 - handleSize / 2 },
            { name: 'se', x: element.x + element.width - handleSize / 2, y: element.y + element.height - handleSize / 2 },
            { name: 's', x: element.x + element.width / 2 - handleSize / 2, y: element.y + element.height - handleSize / 2 },
            { name: 'sw', x: element.x - handleSize / 2, y: element.y + element.height - handleSize / 2 },
            { name: 'w', x: element.x - handleSize / 2, y: element.y + element.height / 2 - handleSize / 2 }
        ];

        // Check if mouse position is inside any handle
        for (const handle of handles) {
            if (x >= handle.x && x <= handle.x + handleSize &&
                y >= handle.y && y <= handle.y + handleSize) {
                return handle.name;
            }
        }

        return null;
    }

    toDataURL(format = 'image/png', quality = 1) {
        return this.canvas.toDataURL(format, quality);
    }

    toBlob(format = 'image/png', quality = 1) {
        return new Promise((resolve) => {
            if (this.canvas.toBlob) {
                this.canvas.toBlob((blob) => {
                    resolve(blob);
                }, format, quality);
            } else {
                // Fallback for environments without toBlob
                try {
                    const dataURL = this.canvas.toDataURL(format, quality);
                    // convert base64 to blob
                    const parts = dataURL.split(',');
                    const byteString = atob(parts[1]);
                    const mime = parts[0].match(/:(.*?);/)[1];
                    const ab = new ArrayBuffer(byteString.length);
                    const ia = new Uint8Array(ab);
                    for (let i = 0; i < byteString.length; i++) {
                        ia[i] = byteString.charCodeAt(i);
                    }
                    const blob = new Blob([ab], { type: mime });
                    resolve(blob);
                } catch (err) {
                    resolve(null);
                }
            }
        });
    }

    async exportAsImage(filename = 'cover.png', format = 'image/png') {
        const blob = await this.toBlob(format);
        Utils.downloadBlob(blob, filename);
    }

    exportProject() {
        let backgroundImageData = null;
        if (this.options.backgroundImage && this.options.backgroundImage.src) {
            backgroundImageData = this.options.backgroundImage.src;
        }

        return {
            canvas: {
                width: this.options.width,
                height: this.options.height,
                backgroundColor: this.options.backgroundColor,
                useGradient: this.options.useGradient,
                gradientStart: this.options.gradientStart,
                gradientEnd: this.options.gradientEnd,
                gradientDirection: this.options.gradientDirection,
                backgroundImage: backgroundImageData
            },
            elements: this.elementManager.toJSON(),
            layers: this.layerManager.toJSON()
        };
    }

    async importProject(data) {
        if (data.canvas) {
            this.setSize(data.canvas.width, data.canvas.height);
            this.setBackgroundColor(data.canvas.backgroundColor);
            if (data.canvas.useGradient) {
                this.setGradient(
                    true,
                    data.canvas.gradientStart,
                    data.canvas.gradientEnd,
                    data.canvas.gradientDirection
                );
            }
            if (data.canvas.backgroundImage) {
                const img = new Image();
                img.onload = () => {
                    this.setBackgroundImage(img);
                };
                img.src = data.canvas.backgroundImage;
            }
        }
        
        if (data.elements) {
            this.elementManager.fromJSON(data.elements);
            const imageElements = this.elementManager.elements.filter(e => e.type === 'image' && e.src);
            await Promise.all(imageElements.map(el => el.loadImage(el.src).catch(err => console.error('Failed to load image:', err))));
        }
        
        if (data.layers) {
            this.layerManager.fromJSON(data.layers);
        }
        
        this.render();
    }

    // 辅助线管理方法
    addGuide(axis, position) {
        if (axis === 'horizontal') {
            if (!this.guides.horizontal.includes(position)) {
                this.guides.horizontal.push(position);
                this.guides.horizontal.sort((a, b) => a - b);
            }
        } else if (axis === 'vertical') {
            if (!this.guides.vertical.includes(position)) {
                this.guides.vertical.push(position);
                this.guides.vertical.sort((a, b) => a - b);
            }
        }
    }

    removeGuide(axis, position) {
        if (axis === 'horizontal') {
            const index = this.guides.horizontal.indexOf(position);
            if (index !== -1) {
                this.guides.horizontal.splice(index, 1);
            }
        } else if (axis === 'vertical') {
            const index = this.guides.vertical.indexOf(position);
            if (index !== -1) {
                this.guides.vertical.splice(index, 1);
            }
        }
    }

    clearGuides() {
        this.guides.horizontal = [];
        this.guides.vertical = [];
    }

    toggleGuides() {
        this.guides.enabled = !this.guides.enabled;
        this.render();
    }

    // 对齐到画布的方法
    alignToCanvas(element, alignment) {
        if (!element) return;

        const canvasWidth = this.options.width;
        const canvasHeight = this.options.height;

        switch (alignment) {
            case 'left':
                element.x = 0;
                break;
            case 'center':
                element.x = (canvasWidth - element.width) / 2;
                break;
            case 'right':
                element.x = canvasWidth - element.width;
                break;
            case 'top':
                element.y = 0;
                break;
            case 'middle':
                element.y = (canvasHeight - element.height) / 2;
                break;
            case 'bottom':
                element.y = canvasHeight - element.height;
                break;
        }
    }

    // 对齐多个元素到画布
    alignElementsToCanvas(alignment) {
        const selectedElement = this.elementManager.getSelectedElement();
        if (selectedElement) {
            this.alignToCanvas(selectedElement, alignment);
            this.render();
        }
    }

    // 基于选中元素的对齐
    alignElements(alignment) {
        const selectedElements = this.elementManager.getSelectedElements();
        if (selectedElements.length < 2) {
            // 如果选中元素少于2个，执行对齐到画布操作
            this.alignElementsToCanvas(alignment);
            return;
        }

        // 根据对齐类型执行不同的对齐操作
        switch (alignment) {
            case 'left':
                this.alignElementsLeft(selectedElements);
                break;
            case 'center':
                this.alignElementsCenter(selectedElements);
                break;
            case 'right':
                this.alignElementsRight(selectedElements);
                break;
            case 'top':
                this.alignElementsTop(selectedElements);
                break;
            case 'middle':
                this.alignElementsMiddle(selectedElements);
                break;
            case 'bottom':
                this.alignElementsBottom(selectedElements);
                break;
        }

        this.render();
    }

    // 左对齐
    alignElementsLeft(selectedElements) {
        // 找到最左侧元素的x坐标
        const minX = Math.min(...selectedElements.map(element => element.x));
        
        // 将所有元素的左边缘对齐到minX
        selectedElements.forEach(element => {
            element.x = minX;
        });
    }

    // 水平居中对齐
    alignElementsCenter(selectedElements) {
        // 计算所有元素的水平中心平均值
        let totalCenterX = 0;
        selectedElements.forEach(element => {
            totalCenterX += element.x + element.width / 2;
        });
        const avgCenterX = totalCenterX / selectedElements.length;
        
        // 将所有元素的水平中心对齐到avgCenterX
        selectedElements.forEach(element => {
            element.x = avgCenterX - element.width / 2;
        });
    }

    // 右对齐
    alignElementsRight(selectedElements) {
        // 找到最右侧元素的右边缘x坐标
        const maxRightX = Math.max(...selectedElements.map(element => element.x + element.width));
        
        // 将所有元素的右边缘对齐到maxRightX
        selectedElements.forEach(element => {
            element.x = maxRightX - element.width;
        });
    }

    // 顶部对齐
    alignElementsTop(selectedElements) {
        // 找到最顶部元素的y坐标
        const minY = Math.min(...selectedElements.map(element => element.y));
        
        // 将所有元素的上边缘对齐到minY
        selectedElements.forEach(element => {
            element.y = minY;
        });
    }

    // 垂直居中对齐
    alignElementsMiddle(selectedElements) {
        // 计算所有元素的垂直中心平均值
        let totalCenterY = 0;
        selectedElements.forEach(element => {
            totalCenterY += element.y + element.height / 2;
        });
        const avgCenterY = totalCenterY / selectedElements.length;
        
        // 将所有元素的垂直中心对齐到avgCenterY
        selectedElements.forEach(element => {
            element.y = avgCenterY - element.height / 2;
        });
    }

    // 底部对齐
    alignElementsBottom(selectedElements) {
        // 找到最底部元素的下边缘y坐标
        const maxBottomY = Math.max(...selectedElements.map(element => element.y + element.height));
        
        // 将所有元素的下边缘对齐到maxBottomY
        selectedElements.forEach(element => {
            element.y = maxBottomY - element.height;
        });
    }

    // 吸附相关方法
    getSnapPosition(point, axis, zoomLevel = 1) {
        const threshold = this.snapThreshold / zoomLevel;
        if (axis === 'x') {
            const closest = this.guides.vertical.find(x => 
                Math.abs(x - point) <= threshold
            );
            return closest !== undefined ? closest : point;
        } else if (axis === 'y') {
            const closest = this.guides.horizontal.find(y => 
                Math.abs(y - point) <= threshold
            );
            return closest !== undefined ? closest : point;
        }
        return point;
    }

    getSnapPositionForElement(x, y, width, height, zoomLevel = 1) {
        const centerX = x + width / 2;
        const centerY = y + height / 2;
        const right = x + width;
        const bottom = y + height;

        // 检查所有关键点
        const snapPoints = {
            x: [x, centerX, right],
            y: [y, centerY, bottom]
        };

        // 找到所有可能的吸附位置
        const possibleSnaps = {
            x: snapPoints.x.map(point => this.getSnapPosition(point, 'x', zoomLevel)),
            y: snapPoints.y.map(point => this.getSnapPosition(point, 'y', zoomLevel)),

        };

        // 返回吸附后的位置，优先使用边缘点的吸附
        const xSnap = possibleSnaps.x.find(snap => snap !== x);
        const ySnap = possibleSnaps.y.find(snap => snap !== y);
        
        return {
            x: xSnap || x,
            y: ySnap || y
        };
    }

    getElementByPoint(x, y) {
        const elements = this.elementManager.getElementsByZIndex();
        return [...elements].reverse().find(element => {
            return element.visible &&
                   x >= element.x && x <= element.x + element.width &&
                   y >= element.y && y <= element.y + element.height;
        });
    }
}
