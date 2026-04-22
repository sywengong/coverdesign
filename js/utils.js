class Utils {
    static generateId() {
        return 'elem_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    static showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast ${type} show`;
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    static throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    static clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    static distance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    static angle(x1, y1, x2, y2) {
        return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    }

    static rgbToHex(r, g, b) {
        return '#' + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('');
    }

    static hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    static downloadBlob(blob, filename) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    static formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}

class DragHandler {
    constructor(element, options = {}) {
        this.element = element;
        this.options = options;
        this.isDragging = false;
        this.startX = 0;
        this.startY = 0;
        this.initialX = 0;
        this.initialY = 0;
        
        this.bindEvents();
    }

    bindEvents() {
        this.element.addEventListener('mousedown', this.handleMouseDown.bind(this));
        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
        document.addEventListener('mouseup', this.handleMouseUp.bind(this));
        
        this.element.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
        document.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
        document.addEventListener('touchend', this.handleTouchEnd.bind(this));
    }

    handleMouseDown(e) {
        if (this.options.handle && !e.target.closest(this.options.handle)) return;
        if (this.options.filter && !this.options.filter(e)) return;
        
        e.preventDefault();
        this.isDragging = true;
        this.startX = e.clientX;
        this.startY = e.clientY;
        this.initialX = this.element.offsetLeft;
        this.initialY = this.element.offsetTop;
        
        this.element.style.zIndex = this.options.zIndex || 100;
        
        if (this.options.onStart) {
            this.options.onStart(e);
        }
    }

    handleMouseMove(e) {
        if (!this.isDragging) return;
        e.preventDefault();
        const dx = e.clientX - this.startX;
        const dy = e.clientY - this.startY;
        
        let newX = this.initialX + dx;
        let newY = this.initialY + dy;
        
        if (this.options.bounds) {
            const bounds = this.options.bounds();
            newX = Utils.clamp(newX, bounds.left, bounds.right);
            newY = Utils.clamp(newY, bounds.top, bounds.bottom);
        }
        
        if (this.options.onMove) {
            this.options.onMove(newX, newY, dx, dy);
        }
    }

    handleMouseUp(e) {
        if (!this.isDragging) return;
        this.isDragging = false;
        this.element.style.zIndex = '';
        
        if (this.options.onEnd) {
            this.options.onEnd(e);
        }
    }

    handleTouchStart(e) {
        if (e.touches.length !== 1) return;
        const touch = e.touches[0];
        const syntheticEvent = {
            clientX: touch.clientX,
            clientY: touch.clientY,
            target: touch.target || this.element,
            button: 0,
            shiftKey: !!e.shiftKey,
            ctrlKey: !!e.ctrlKey,
            metaKey: !!e.metaKey,
            preventDefault: () => e.preventDefault()
        };
        this.handleMouseDown(syntheticEvent);
    }

    handleTouchMove(e) {
        if (!this.isDragging || e.touches.length !== 1) return;
        e.preventDefault();
        const touch = e.touches[0];
        const syntheticEvent = {
            clientX: touch.clientX,
            clientY: touch.clientY,
            target: touch.target || this.element,
            button: 0,
            shiftKey: !!e.shiftKey,
            ctrlKey: !!e.ctrlKey,
            metaKey: !!e.metaKey,
            preventDefault: () => {}
        };
        this.handleMouseMove(syntheticEvent);
    }

    handleTouchEnd(e) {
        const syntheticEvent = {
            button: 0,
            target: e.target || this.element,
            preventDefault: () => {}
        };
        this.handleMouseUp(syntheticEvent);
    }
}

class ResizeHandler {
    constructor(element, options = {}) {
        this.element = element;
        this.options = options;
        this.isResizing = false;
        this.handle = null;
        this.startX = 0;
        this.startY = 0;
        this.startWidth = 0;
        this.startHeight = 0;
        this.startLeft = 0;
        this.startTop = 0;
        
        this.createHandles();
        this.bindEvents();
    }

    createHandles() {
        const positions = ['nw', 'ne', 'sw', 'se', 'n', 's', 'w', 'e'];
        positions.forEach(pos => {
            const handle = document.createElement('div');
            handle.className = `resize-handle ${pos}`;
            handle.dataset.position = pos;
            this.element.appendChild(handle);
        });
    }

    bindEvents() {
        this.element.querySelectorAll('.resize-handle').forEach(handle => {
            handle.addEventListener('mousedown', this.handleResizeStart.bind(this));
        });
        
        document.addEventListener('mousemove', this.handleResize.bind(this));
        document.addEventListener('mouseup', this.handleResizeEnd.bind(this));
    }

    handleResizeStart(e) {
        e.preventDefault();
        e.stopPropagation();
        
        this.isResizing = true;
        this.handle = e.target.dataset.position;
        this.startX = e.clientX;
        this.startY = e.clientY;
        this.startWidth = this.element.offsetWidth;
        this.startHeight = this.element.offsetHeight;
        this.startLeft = this.element.offsetLeft;
        this.startTop = this.element.offsetTop;
        
        if (this.options.onResizeStart) {
            this.options.onResizeStart(e);
        }
    }

    handleResize(e) {
        if (!this.isResizing) return;
        e.preventDefault();
        
        const dx = e.clientX - this.startX;
        const dy = e.clientY - this.startY;
        
        let newWidth = this.startWidth;
        let newHeight = this.startHeight;
        let newLeft = this.startLeft;
        let newTop = this.startTop;
        
        const aspectRatio = this.startWidth / this.startHeight;
        const maintainAspect = this.options.maintainAspect || false;
        
        switch (this.handle) {
            case 'se':
                newWidth = this.startWidth + dx;
                newHeight = maintainAspect ? newWidth / aspectRatio : this.startHeight + dy;
                break;
            case 'sw':
                newWidth = this.startWidth - dx;
                newHeight = maintainAspect ? newWidth / aspectRatio : this.startHeight + dy;
                newLeft = this.startLeft + dx;
                break;
            case 'ne':
                newWidth = this.startWidth + dx;
                newHeight = maintainAspect ? newWidth / aspectRatio : this.startHeight - dy;
                newTop = this.startTop + dy;
                break;
            case 'nw':
                newWidth = this.startWidth - dx;
                newHeight = maintainAspect ? newWidth / aspectRatio : this.startHeight - dy;
                newLeft = this.startLeft + dx;
                newTop = this.startTop + dy;
                break;
            case 'e':
                newWidth = this.startWidth + dx;
                if (maintainAspect) {
                    newHeight = newWidth / aspectRatio;
                }
                break;
            case 'w':
                newWidth = this.startWidth - dx;
                newLeft = this.startLeft + dx;
                if (maintainAspect) {
                    newHeight = newWidth / aspectRatio;
                }
                break;
            case 'n':
                newHeight = this.startHeight - dy;
                newTop = this.startTop + dy;
                if (maintainAspect) {
                    newWidth = newHeight * aspectRatio;
                }
                break;
            case 's':
                newHeight = this.startHeight + dy;
                if (maintainAspect) {
                    newWidth = newHeight * aspectRatio;
                }
                break;
        }
        
        newWidth = Math.max(this.options.minWidth || 10, newWidth);
        newHeight = Math.max(this.options.minHeight || 10, newHeight);
        
        if (this.options.onResize) {
            this.options.onResize(newWidth, newHeight, newLeft, newTop);
        }
    }

    handleResizeEnd(e) {
        if (!this.isResizing) return;
        this.isResizing = false;
        this.handle = null;
        
        if (this.options.onResizeEnd) {
            this.options.onResizeEnd(e);
        }
    }
}

class RotateHandler {
    constructor(element, options = {}) {
        this.element = element;
        this.options = options;
        this.isRotating = false;
        this.startAngle = 0;
        this.currentRotation = 0;
        
        this.createRotateHandle();
        this.bindEvents();
    }

    createRotateHandle() {
        this.rotateHandle = document.createElement('div');
        this.rotateHandle.className = 'rotate-handle';
        this.rotateHandle.innerHTML = '↻';
        this.rotateHandle.style.cssText = `
            position: absolute;
            width: 24px;
            height: 24px;
            background: #667eea;
            border: 2px solid white;
            border-radius: 50%;
            cursor: grab;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            color: white;
            top: -40px;
            left: 50%;
            transform: translateX(-50%);
        `;
        this.element.appendChild(this.rotateHandle);
    }

    bindEvents() {
        this.rotateHandle.addEventListener('mousedown', this.handleRotateStart.bind(this));
        document.addEventListener('mousemove', this.handleRotate.bind(this));
        document.addEventListener('mouseup', this.handleRotateEnd.bind(this));
    }

    handleRotateStart(e) {
        e.preventDefault();
        e.stopPropagation();
        
        this.isRotating = true;
        const rect = this.element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        this.startAngle = Utils.angle(centerX, centerY, e.clientX, e.clientY);
        this.currentRotation = this.element.rotation || 0;
        
        if (this.options.onRotateStart) {
            this.options.onRotateStart(e);
        }
    }

    handleRotate(e) {
        if (!this.isRotating) return;
        e.preventDefault();
        
        const rect = this.element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const angle = Utils.angle(centerX, centerY, e.clientX, e.clientY);
        const deltaAngle = angle - this.startAngle;
        const newRotation = this.currentRotation + deltaAngle;
        
        if (this.options.onRotate) {
            this.options.onRotate(newRotation);
        }
    }

    handleRotateEnd(e) {
        if (!this.isRotating) return;
        this.isRotating = false;
        
        if (this.options.onRotateEnd) {
            this.options.onRotateEnd(e);
        }
    }
}

class StyleParser {
    static parseBorderRadius(borderRadius) {
        if (typeof borderRadius === 'number') {
            return `${borderRadius}px`;
        }
        if (typeof borderRadius === 'string') {
            return borderRadius;
        }
        return '0px';
    }

    static parseShadow(shadow) {
        if (!shadow) return 'none';
        if (typeof shadow === 'string') return shadow;
        return `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}`;
    }

    static getContrastColor(hexColor) {
        const rgb = Utils.hexToRgb(hexColor);
        if (!rgb) return '#000000';
        const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
        return luminance > 0.5 ? '#000000' : '#ffffff';
    }
}

class LocalStorageManager {
    static MAX_SIZE = 50 * 1024 * 1024; // 50MB 限制

    static save(key, data) {
        try {
            const serialized = JSON.stringify(data);
            const size = new Blob([serialized]).size;
            
            // 检查数据大小
            if (size > this.MAX_SIZE) {
                console.warn('Data too large for localStorage:', size, 'bytes');
                // 尝试压缩数据（移除图片数据）
                const compressedData = this.compressData(data);
                const compressedSerialized = JSON.stringify(compressedData);
                const compressedSize = new Blob([compressedSerialized]).size;
                
                if (compressedSize > this.MAX_SIZE) {
                    throw new Error(`项目数据过大 (${Math.round(size / 1024)}KB)，无法保存到本地存储`);
                }
                
                localStorage.setItem(key, compressedSerialized);
                return { success: true, compressed: true, originalSize: size, compressedSize: compressedSize };
            }
            
            localStorage.setItem(key, serialized);
            return { success: true, compressed: false, size: size };
        } catch (e) {
            console.error('Failed to save to localStorage:', e);
            throw e;
        }
    }

    // 压缩数据：移除或缩小大图片
    static compressData(data) {
        if (!data) return data;
        
        const compressed = JSON.parse(JSON.stringify(data));
        
        // 压缩画布背景图片
        if (compressed.canvas && compressed.canvas.backgroundImage) {
            const imgSize = compressed.canvas.backgroundImage.length;
            if (imgSize > 100000) { // 如果图片大于100KB
                console.warn('Background image too large, removing from save');
                compressed.canvas.backgroundImage = null;
                compressed.canvas.backgroundImageRemoved = true;
            }
        }
        
        // 压缩元素中的图片
        if (compressed.elements && compressed.elements.elements) {
            compressed.elements.elements = compressed.elements.elements.map(el => {
                if (el.type === 'image' && el.src && el.src.length > 100000) {
                    return {
                        ...el,
                        src: null,
                        srcRemoved: true,
                        note: '图片数据过大，已从保存中移除'
                    };
                }
                return el;
            });
        }
        
        return compressed;
    }

    static load(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('Failed to load from localStorage:', e);
            return null;
        }
    }

    static remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Failed to remove from localStorage:', e);
            return false;
        }
    }

    static clear() {
        try {
            localStorage.clear();
            return true;
        } catch (e) {
            console.error('Failed to clear localStorage:', e);
            return false;
        }
    }

    // 获取已使用的存储空间
    static getUsedSize() {
        let total = 0;
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                total += localStorage[key].length * 2; // UTF-16 编码
            }
        }
        return total;
    }

    // 获取剩余存储空间
    static getRemainingSize() {
        return this.MAX_SIZE - this.getUsedSize();
    }
}

class FontDetector {
    static baseFonts = ['monospace', 'sans-serif', 'serif'];

    static fontDetectString = 'mmmmmmmmmmlli';

    static testFont(font) {
        const s = document.createElement('span');
        s.style.fontSize = '72px';
        s.style.position = 'absolute';
        s.style.left = '-9999px';
        s.style.visibility = 'hidden';
        s.innerHTML = this.fontDetectString;
        document.body.appendChild(s);

        let detected = false;

        for (const base of this.baseFonts) {
            s.style.fontFamily = base;
            const defaultWidth = s.offsetWidth;

            s.style.fontFamily = `'${font}', ${base}`;
            detected = s.offsetWidth !== defaultWidth;

            if (detected) break;
        }

        document.body.removeChild(s);
        return detected;
    }

    static detectAllFonts() {
        const fontList = [
            { name: '微软雅黑', value: 'Microsoft YaHei' },
            { name: '黑体', value: 'SimHei' },
            { name: '宋体', value: 'SimSun' },
            { name: '楷体', value: 'KaiTi' },
            { name: '仿宋', value: 'FangSong' },
            { name: '隶书', value: 'LiSu' },
            { name: '幼圆', value: 'YouYuan' },
            { name: '华文细黑', value: 'STXihei' },
            { name: '华文黑体', value: 'STHeiti' },
            { name: '华文楷体', value: 'STKaiti' },
            { name: '华文宋体', value: 'STSong' },
            { name: '华文仿宋', value: 'STFangsong' },
            { name: '方正舒体', value: 'FZShuTi' },
            { name: '方正姚体', value: 'FZYaoti' },
            { name: '华文彩云', value: 'STCaiyun' },
            { name: '华文琥珀', value: 'STHupo' },
            { name: '华文行楷', value: 'STXingkai' },
            { name: '华文新魏', value: 'STXinwei' },
            { name: 'Arial', value: 'Arial' },
            { name: 'Arial Black', value: 'Arial Black' },
            { name: 'Arial Narrow', value: 'Arial Narrow' },
            { name: 'Calibri', value: 'Calibri' },
            { name: 'Cambria', value: 'Cambria' },
            { name: 'Comic Sans MS', value: 'Comic Sans MS' },
            { name: 'Consolas', value: 'Consolas' },
            { name: 'Constantia', value: 'Constantia' },
            { name: 'Corbel', value: 'Corbel' },
            { name: 'Courier', value: 'Courier' },
            { name: 'Courier New', value: 'Courier New' },
            { name: 'Georgia', value: 'Georgia' },
            { name: 'Helvetica', value: 'Helvetica' },
            { name: 'Impact', value: 'Impact' },
            { name: 'Lucida Console', value: 'Lucida Console' },
            { name: 'Lucida Sans Unicode', value: 'Lucida Sans Unicode' },
            { name: 'Microsoft Sans Serif', value: 'Microsoft Sans Serif' },
            { name: 'Palatino Linotype', value: 'Palatino Linotype' },
            { name: 'Segoe UI', value: 'Segoe UI' },
            { name: 'Tahoma', value: 'Tahoma' },
            { name: 'Times', value: 'Times' },
            { name: 'Times New Roman', value: 'Times New Roman' },
            { name: 'Trebuchet MS', value: 'Trebuchet MS' },
            { name: 'Verdana', value: 'Verdana' },
            { name: 'Wingdings', value: 'Wingdings' },
            { name: '站酷快乐体2016修订版', value: '站酷快乐体2016修订版' },
            { name: '站酷文艺体', value: '站酷文艺体' },
            { name: '站酷庆科黄油体常规', value: '站酷庆科黄油体常规' },
            { name: '字体传奇南安体', value: '字体传奇南安体-免费商用' },
        ];

        const availableFonts = [];

        for (const font of fontList) {
            if (this.testFont(font.value)) {
                availableFonts.push(font);
            }
        }

        return availableFonts;
    }

    static populateFontSelect(selectId, defaultFont = 'Microsoft YaHei') {
        const select = document.getElementById(selectId);
        if (!select) return;

        const availableFonts = this.detectAllFonts();

        select.innerHTML = '';

        if (availableFonts.length === 0) {
            select.innerHTML = `
                <option value="Microsoft YaHei">微软雅黑</option>
                <option value="SimSun">宋体</option>
                <option value="Arial">Arial</option>
            `;
            return;
        }

        let hasDefault = false;
        for (const font of availableFonts) {
            const option = document.createElement('option');
            option.value = font.value;
            option.textContent = font.name;
            select.appendChild(option);

            if (font.value === defaultFont) {
                hasDefault = true;
            }
        }

        if (!hasDefault && availableFonts.length > 0) {
            const option = document.createElement('option');
            option.value = defaultFont;
            option.textContent = '默认字体';
            select.insertBefore(option, select.firstChild);
        }
    }
}
