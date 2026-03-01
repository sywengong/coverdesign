class CanvasElement {
    constructor(options = {}) {
        this.id = options.id || Utils.generateId();
        this.type = options.type || 'element';
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.width = options.width || 100;
        this.height = options.height || 100;
        this.rotation = options.rotation || 0;
        this.opacity = options.opacity !== undefined ? options.opacity : 100;
        this.visible = options.visible !== undefined ? options.visible : true;
        this.locked = options.locked || false;
        this.name = options.name || '元素';
        this.zIndex = options.zIndex || 0;
    }

    getBounds() {
        return {
            left: this.x,
            top: this.y,
            right: this.x + this.width,
            bottom: this.y + this.height,
            width: this.width,
            height: this.height
        };
    }

    getRotatedBounds() {
        if (this.rotation === 0) {
            return this.getBounds();
        }

        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height / 2;
        const angle = this.rotation * Math.PI / 180;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        // 计算四个角点
        const corners = [
            { x: this.x, y: this.y },
            { x: this.x + this.width, y: this.y },
            { x: this.x + this.width, y: this.y + this.height },
            { x: this.x, y: this.y + this.height }
        ];

        // 旋转每个角点
        const rotatedCorners = corners.map(corner => {
            const dx = corner.x - centerX;
            const dy = corner.y - centerY;
            return {
                x: centerX + dx * cos - dy * sin,
                y: centerY + dx * sin + dy * cos
            };
        });

        // 计算边界
        const xs = rotatedCorners.map(c => c.x);
        const ys = rotatedCorners.map(c => c.y);

        return {
            left: Math.min(...xs),
            top: Math.min(...ys),
            right: Math.max(...xs),
            bottom: Math.max(...ys),
            width: Math.max(...xs) - Math.min(...xs),
            height: Math.max(...ys) - Math.min(...ys)
        };
    }

    containsPoint(px, py) {
        if (this.rotation === 0) {
            return px >= this.x && px <= this.x + this.width &&
                   py >= this.y && py <= this.y + this.height;
        }

        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height / 2;
        const angle = -this.rotation * Math.PI / 180;

        const dx = px - centerX;
        const dy = py - centerY;

        const localX = dx * Math.cos(angle) - dy * Math.sin(angle) + this.width / 2;
        const localY = dx * Math.sin(angle) + dy * Math.cos(angle) + this.height / 2;

        return localX >= 0 && localX <= this.width &&
               localY >= 0 && localY <= this.height;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    setSize(width, height) {
        this.width = width;
        this.height = height;
    }

    setRotation(rotation) {
        this.rotation = rotation;
    }

    setOpacity(opacity) {
        this.opacity = opacity;
    }

    toJSON() {
        return {
            id: this.id,
            type: this.type,
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            rotation: this.rotation,
            opacity: this.opacity,
            visible: this.visible,
            locked: this.locked,
            name: this.name,
            zIndex: this.zIndex
        };
    }

    clone() {
        return ElementFactory.createFromJSON(this.toJSON());
    }
}

class TextElement extends CanvasElement {
    constructor(options = {}) {
        super(options);
        this.type = 'text';
        this.text = options.text || '双击编辑文字';
        this.fontSize = options.fontSize || 48;
        this.fontFamily = options.fontFamily || 'Microsoft YaHei';
        this.fontWeight = options.fontWeight || 'normal';
        this.color = options.color || '#000000';
        this.textAlign = options.textAlign || 'left';
        this.lineHeight = options.lineHeight || 1.5;
        this.name = '文字';
        
        this.autoSize();
    }

    autoSize() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.font = `${this.fontWeight} ${this.fontSize}px ${this.fontFamily}`;

        const lines = this.text.split('\n');
        let maxWidth = 0;
        
        lines.forEach(line => {
            const m = ctx.measureText(line);
            // 使用 actualBoundingBox 获取更准确的宽度
            const width = m.actualBoundingBoxLeft !== undefined 
                ? m.actualBoundingBoxLeft + m.actualBoundingBoxRight 
                : m.width;
            if (width > maxWidth) maxWidth = width;
        });

        // 宽度计算：与实际文本宽度一致，不添加额外padding
        // 渲染时文本根据 textAlign 在 this.width 范围内对齐
        this.width = Math.ceil(maxWidth);
        
        // 高度计算：与渲染时保持一致
        // 渲染时：index * this.fontSize * this.lineHeight
        // 最后一行的Y位置是 (lineCount - 1) * this.fontSize * this.lineHeight
        // 需要加上字体大小作为行高
        const lineCount = Math.max(1, lines.length);
        const lineHeightPx = this.fontSize * this.lineHeight;
        
        // 高度 = (行数 - 1) * 行高 + 字体大小
        // 这样确保最后一行文字完整显示
        this.height = Math.ceil((lineCount - 1) * lineHeightPx + this.fontSize);
        
        // 确保最小尺寸
        this.width = Math.max(this.width, this.fontSize);
        this.height = Math.max(this.height, this.fontSize);
    }

    setText(text) {
        this.text = text;
        this.autoSize();
    }

    setSize(width, height) {
        const oldWidth = this.width;
        const oldHeight = this.height;
        this.width = width;
        this.height = height;

        if (oldWidth > 0 && oldHeight > 0) {
            const scaleX = width / oldWidth;
            const scaleY = height / oldHeight;
            this.fontSize = Math.max(8, Math.round(this.fontSize * scaleY));
        }
    }

    toJSON() {
        return {
            ...super.toJSON(),
            text: this.text,
            fontSize: this.fontSize,
            fontFamily: this.fontFamily,
            fontWeight: this.fontWeight,
            color: this.color,
            textAlign: this.textAlign,
            lineHeight: this.lineHeight
        };
    }

    render(ctx) {
        if (!this.visible) return;
        
        ctx.save();
        ctx.globalAlpha = this.opacity / 100;
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.translate(-this.width / 2, -this.height / 2);
        
        ctx.font = `${this.fontWeight} ${this.fontSize}px ${this.fontFamily}`;
        ctx.fillStyle = this.color;
        ctx.textAlign = this.textAlign;
        ctx.textBaseline = 'top';
        
        const lines = this.text.split('\n');
        let drawX = 0;
        switch (this.textAlign) {
            case 'center':
                drawX = this.width / 2;
                break;
            case 'right':
                drawX = this.width;
                break;
            default:
                drawX = 0;
        }

        lines.forEach((line, index) => {
            ctx.fillText(line, drawX, index * this.fontSize * this.lineHeight);
        });
        
        ctx.restore();
    }
}

class ImageElement extends CanvasElement {
    constructor(options = {}) {
        super(options);
        this.type = 'image';
        this.src = options.src || '';
        this.imageData = null;
        this.name = '图片';
        
        if (options.imageData) {
            // 如果有保存的图片数据，直接加载
            if (typeof options.imageData === 'string') {
                this.loadImage(options.imageData);
            } else if (options.imageData instanceof Image) {
                this.imageData = options.imageData;
            }
        }
    }

    async loadImage(src) {
        this.src = src;
        const tryLoad = (img, url) => new Promise((res, rej) => {
            img.onload = () => res(img);
            img.onerror = () => rej(new Error('load error'));
            img.src = url;
        });

        // Try several strategies: with CORS, without CORS, fetch+blob, then placeholder
        try {
            // 1) try with crossOrigin
            let img = new Image();
            img.crossOrigin = 'anonymous';
            await tryLoad(img, src);
            this.width = img.naturalWidth || img.width;
            this.height = img.naturalHeight || img.height;
            this.imageData = img;
            // 显示成功提示
            if (typeof Utils !== 'undefined') {
                Utils.showToast('图片加载成功', 'success');
            }
            return img;
        } catch (err1) {
            try {
                // 2) try without crossOrigin
                let img2 = new Image();
                await tryLoad(img2, src);
                this.width = img2.naturalWidth || img2.width;
                this.height = img2.naturalHeight || img2.height;
                this.imageData = img2;
                if (typeof Utils !== 'undefined') {
                    Utils.showToast('图片加载成功', 'success');
                }
                return img2;
            } catch (err2) {
                try {
                    // 3) try fetch -> blob -> objectURL
                    const resp = await fetch(src, { mode: 'cors' });
                    const blob = await resp.blob();
                    const url = URL.createObjectURL(blob);
                    let img3 = new Image();
                    await tryLoad(img3, url);
                    URL.revokeObjectURL(url);
                    this.width = img3.naturalWidth || img3.width;
                    this.height = img3.naturalHeight || img3.height;
                    this.imageData = img3;
                    return img3;
                } catch (err3) {
                    console.warn('Image load failed for', src, err3);
                    // 显示错误提示
                    if (typeof Utils !== 'undefined') {
                        Utils.showToast('图片加载失败，使用占位符', 'error');
                    }
                    // 4) fallback placeholder image so UI keeps working
                    const placeholderSize = 200;
                    const canvas = document.createElement('canvas');
                    canvas.width = placeholderSize;
                    canvas.height = placeholderSize;
                    const ctx = canvas.getContext('2d');
                    ctx.fillStyle = '#f0f0f0';
                    ctx.fillRect(0, 0, placeholderSize, placeholderSize);
                    ctx.fillStyle = '#cccccc';
                    ctx.fillRect(10, 10, placeholderSize - 20, placeholderSize - 20);
                    ctx.fillStyle = '#999999';
                    ctx.font = '14px sans-serif';
                    ctx.textAlign = 'center';
                    ctx.fillText('Image failed', placeholderSize / 2, placeholderSize / 2);
                    const imgPlaceholder = new Image();
                    imgPlaceholder.src = canvas.toDataURL();
                    this.width = placeholderSize;
                    this.height = placeholderSize;
                    this.imageData = imgPlaceholder;
                    return imgPlaceholder;
                }
            }
        }
    }

    setImageData(imageData) {
        this.imageData = imageData;
        if (imageData) {
            this.width = imageData.naturalWidth || imageData.width;
            this.height = imageData.naturalHeight || imageData.height;
        }
    }

    toJSON() {
        const data = {
            ...super.toJSON(),
            src: this.src
        };
        
        // 如果图片已加载，保存图片数据以便撤销/重做时恢复
        if (this.imageData && this.imageData.src) {
            // 检查是否是base64数据或blob URL
            if (this.imageData.src.startsWith('data:')) {
                data.imageData = this.imageData.src;
            } else if (this.imageData.src.startsWith('blob:')) {
                // 对于blob URL，尝试转换为canvas并保存为base64
                try {
                    const canvas = document.createElement('canvas');
                    canvas.width = this.imageData.naturalWidth || this.imageData.width;
                    canvas.height = this.imageData.naturalHeight || this.imageData.height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(this.imageData, 0, 0);
                    data.imageData = canvas.toDataURL('image/png');
                } catch (e) {
                    console.warn('Failed to save image data for undo/redo:', e);
                }
            }
        }
        
        return data;
    }

    clone() {
        const data = this.toJSON();
        data.id = Utils.generateId();
        const clone = new ImageElement(data);
        clone.imageData = this.imageData;
        return clone;
    }

    render(ctx) {
        if (!this.visible || !this.imageData) return;
        
        ctx.save();
        ctx.globalAlpha = this.opacity / 100;
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.translate(-this.width / 2, -this.height / 2);
        
        ctx.drawImage(this.imageData, 0, 0, this.width, this.height);
        ctx.restore();
    }
}

class ShapeElement extends CanvasElement {
    constructor(options = {}) {
        super(options);
        this.type = 'shape';
        this.shapeType = options.shapeType || 'rectangle';
        this.fill = options.fill || '#ff6b6b';
        this.stroke = options.stroke || '';
        this.strokeWidth = options.strokeWidth || 0;
        this.borderRadius = options.borderRadius || 0;
        this.name = '形状';
    }

    toJSON() {
        return {
            ...super.toJSON(),
            shapeType: this.shapeType,
            fill: this.fill,
            stroke: this.stroke,
            strokeWidth: this.strokeWidth,
            borderRadius: this.borderRadius
        };
    }

    render(ctx) {
        if (!this.visible) return;
        
        ctx.save();
        ctx.globalAlpha = this.opacity / 100;
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.translate(-this.width / 2, -this.height / 2);
        
        ctx.fillStyle = this.fill;
        ctx.strokeStyle = this.stroke;
        ctx.lineWidth = this.strokeWidth;
        
        const radius = Math.min(this.borderRadius, this.width / 2, this.height / 2);
        
        ctx.beginPath();
        
        switch (this.shapeType) {
            case 'rectangle':
                this.drawRoundedRect(ctx, 0, 0, this.width, this.height, radius);
                break;
            case 'circle':
                ctx.ellipse(this.width / 2, this.height / 2, this.width / 2, this.height / 2, 0, 0, Math.PI * 2);
                break;
            case 'triangle':
                ctx.moveTo(this.width / 2, 0);
                ctx.lineTo(this.width, this.height);
                ctx.lineTo(0, this.height);
                ctx.closePath();
                break;
            case 'star':
                this.drawStar(ctx, this.width / 2, this.height / 2, 5, this.width / 2, this.width / 4);
                break;
            default:
                this.drawRoundedRect(ctx, 0, 0, this.width, this.height, radius);
        }
        
        ctx.fill();
        if (this.strokeWidth > 0) {
            ctx.stroke();
        }
        
        ctx.restore();
    }

    drawRoundedRect(ctx, x, y, width, height, radius) {
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
    }

    drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
        let rot = Math.PI / 2 * 3;
        let x = cx;
        let y = cy;
        const step = Math.PI / spikes;
        
        ctx.moveTo(cx, cy - outerRadius);
        
        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            ctx.lineTo(x, y);
            rot += step;
            
            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            ctx.lineTo(x, y);
            rot += step;
        }
        
        ctx.lineTo(cx, cy - outerRadius);
        ctx.closePath();
    }
}

class StickerElement extends CanvasElement {
    constructor(options = {}) {
        super(options);
        this.type = 'sticker';
        this.stickerType = options.stickerType || 'star';
        this.color = options.color || '#ffd700';
        this.size = options.size || 50;
        this.name = '贴纸';
        
        this.width = this.size;
        this.height = this.size;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            stickerType: this.stickerType,
            color: this.color,
            size: this.size
        };
    }

    render(ctx) {
        if (!this.visible) return;
        
        ctx.save();
        ctx.globalAlpha = this.opacity / 100;
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.translate(-this.width / 2, -this.height / 2);
        
        ctx.fillStyle = this.color;
        
        const size = this.width;
        const cx = size / 2;
        const cy = size / 2;
        
        ctx.beginPath();
        
        switch (this.stickerType) {
            case 'heart':
                this.drawHeart(ctx, cx, cy, size / 2);
                ctx.fill();
                break;
            case 'star':
                this.drawStar(ctx, cx, cy, 5, size / 2, size / 4);
                ctx.fill();
                break;
            case 'fire':
                this.drawFire(ctx, cx, cy, size / 2);
                break;
            case 'sparkle':
                this.drawSparkle(ctx, cx, cy, size / 2);
                break;
            case 'flower':
                this.drawFlower(ctx, cx, cy, size / 2);
                break;
            default:
                this.drawStar(ctx, cx, cy, 5, size / 2, size / 4);
                ctx.fill();
        }
        
        ctx.restore();
    }

    drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
        let rot = Math.PI / 2 * 3;
        
        ctx.moveTo(cx, cy - outerRadius);
        
        for (let i = 0; i < spikes; i++) {
            const x = cx + Math.cos(rot) * outerRadius;
            const y = cy + Math.sin(rot) * outerRadius;
            ctx.lineTo(x, y);
            rot += Math.PI / spikes;
            
            const x2 = cx + Math.cos(rot) * innerRadius;
            const y2 = cy + Math.sin(rot) * innerRadius;
            ctx.lineTo(x2, y2);
            rot += Math.PI / spikes;
        }
        
        ctx.lineTo(cx, cy - outerRadius);
        ctx.closePath();
    }

    drawFlower(ctx, cx, cy, radius) {
        const petals = 6;
        for (let i = 0; i < petals; i++) {
            const angle = (i / petals) * Math.PI * 2;
            const x = cx + Math.cos(angle) * radius * 0.5;
            const y = cy + Math.sin(angle) * radius * 0.5;
            
            ctx.beginPath();
            ctx.ellipse(x, y, radius * 0.4, radius * 0.2, angle, 0, Math.PI * 2);
            ctx.fill();
        }
        
        ctx.beginPath();
        ctx.arc(cx, cy, radius * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = '#ffff00';
        ctx.fill();
    }

    // 绘制心形
    drawHeart(ctx, cx, cy, radius) {
        const x = cx;
        const y = cy + radius * 0.3;
        const topY = cy - radius * 0.7;
        
        ctx.beginPath();
        ctx.moveTo(x, y);
        // 左侧曲线
        ctx.bezierCurveTo(
            x - radius * 1.2, y - radius * 0.5,  // 控制点1
            x - radius * 1.2, topY + radius * 0.3, // 控制点2
            x - radius * 0.5, topY + radius * 0.3  // 终点
        );
        // 左上弧线
        ctx.bezierCurveTo(
            x - radius * 0.1, topY + radius * 0.3,
            x, topY + radius * 0.6,
            x, topY + radius * 0.8
        );
        // 右上弧线
        ctx.bezierCurveTo(
            x, topY + radius * 0.6,
            x + radius * 0.1, topY + radius * 0.3,
            x + radius * 0.5, topY + radius * 0.3
        );
        // 右侧曲线
        ctx.bezierCurveTo(
            x + radius * 1.2, topY + radius * 0.3,
            x + radius * 1.2, y - radius * 0.5,
            x, y
        );
        ctx.closePath();
    }

    // 绘制火焰
    drawFire(ctx, cx, cy, radius) {
        // 火焰主体 - 使用渐变
        const gradient = ctx.createRadialGradient(cx, cy + radius * 0.3, 0, cx, cy, radius);
        gradient.addColorStop(0, '#ff6b35'); // 中心橙色
        gradient.addColorStop(0.5, '#f7931e'); // 中间橙色
        gradient.addColorStop(1, '#ffd700'); // 边缘黄色
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        
        // 火焰底部
        ctx.moveTo(cx - radius * 0.5, cy + radius * 0.5);
        
        // 左侧火焰
        ctx.bezierCurveTo(
            cx - radius * 0.8, cy + radius * 0.2,
            cx - radius * 0.6, cy - radius * 0.3,
            cx - radius * 0.3, cy - radius * 0.6
        );
        
        // 火焰顶部
        ctx.bezierCurveTo(
            cx - radius * 0.1, cy - radius * 0.9,
            cx + radius * 0.1, cy - radius * 0.9,
            cx + radius * 0.3, cy - radius * 0.6
        );
        
        // 右侧火焰
        ctx.bezierCurveTo(
            cx + radius * 0.6, cy - radius * 0.3,
            cx + radius * 0.8, cy + radius * 0.2,
            cx + radius * 0.5, cy + radius * 0.5
        );
        
        ctx.closePath();
        ctx.fill();
        
        // 内部小火焰
        ctx.fillStyle = '#ff4500';
        ctx.beginPath();
        ctx.moveTo(cx, cy + radius * 0.3);
        ctx.bezierCurveTo(cx - radius * 0.2, cy, cx - radius * 0.1, cy - radius * 0.3, cx, cy - radius * 0.4);
        ctx.bezierCurveTo(cx + radius * 0.1, cy - radius * 0.3, cx + radius * 0.2, cy, cx, cy + radius * 0.3);
        ctx.closePath();
        ctx.fill();
    }

    // 绘制闪光/星星
    drawSparkle(ctx, cx, cy, radius) {
        // 绘制四角星
        ctx.fillStyle = '#ffd700';
        
        for (let i = 0; i < 4; i++) {
            const angle = (i / 4) * Math.PI * 2;
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(angle);
            
            ctx.beginPath();
            ctx.moveTo(0, -radius);
            ctx.quadraticCurveTo(radius * 0.2, -radius * 0.3, 0, 0);
            ctx.quadraticCurveTo(-radius * 0.2, -radius * 0.3, 0, -radius);
            ctx.closePath();
            ctx.fill();
            
            ctx.restore();
        }
        
        // 中心圆点
        ctx.beginPath();
        ctx.arc(cx, cy, radius * 0.15, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
    }
}

class ElementFactory {
    static createText(options = {}) {
        return new TextElement(options);
    }

    static createImage(options = {}) {
        return new ImageElement(options);
    }

    static createShape(options = {}) {
        return new ShapeElement(options);
    }

    static createSticker(options = {}) {
        return new StickerElement(options);
    }

    static createFromJSON(data) {
        switch (data.type) {
            case 'text':
                return new TextElement(data);
            case 'image':
                return new ImageElement(data);
            case 'shape':
                return new ShapeElement(data);
            case 'sticker':
                return new StickerElement(data);
            default:
                return new CanvasElement(data);
        }
    }
}

class ElementManager {
    constructor() {
        this.elements = [];
        this.selectedElementIds = [];
        this.zIndexCounter = 0;
    }

    addElement(element) {
        this.zIndexCounter++;
        element.zIndex = this.zIndexCounter;
        this.elements.push(element);
        return element;
    }

    removeElement(elementId) {
        const index = this.elements.findIndex(e => e.id === elementId);
        if (index !== -1) {
            this.elements.splice(index, 1);
            // 从选中列表中移除
            this.removeFromSelection(elementId);
            return true;
        }
        return false;
    }

    selectElement(elementId, isMultiSelect = false) {
        const element = this.elements.find(e => e.id === elementId);
        if (element) {
            if (isMultiSelect) {
                // 如果元素已经选中，则取消选中
                if (this.selectedElementIds.includes(elementId)) {
                    this.selectedElementIds = this.selectedElementIds.filter(id => id !== elementId);
                } else {
                    // 否则添加到选中列表
                    this.selectedElementIds.push(elementId);
                }
            } else {
                // 单选模式，替换选中列表
                this.selectedElementIds = [elementId];
            }
            return element;
        } else if (!isMultiSelect) {
            // 单选模式下点击空白区域，取消所有选中
            this.selectedElementIds = [];
        }
        return null;
    }

    getSelectedElement() {
        // 返回最近选中的（作为主要操作对象）元素
        if (!this.selectedElementIds || this.selectedElementIds.length === 0) return null;
        const lastId = this.selectedElementIds[this.selectedElementIds.length - 1];
        return this.elements.find(e => e.id === lastId) || null;
    }

    getSelectedElements() {
        // 返回所有选中的元素
        return this.elements.filter(e => this.selectedElementIds.includes(e.id));
    }

    addToSelection(elementId) {
        // 添加元素到选中列表
        if (!this.selectedElementIds.includes(elementId)) {
            this.selectedElementIds.push(elementId);
        }
    }

    removeFromSelection(elementId) {
        // 从选中列表移除元素
        this.selectedElementIds = this.selectedElementIds.filter(id => id !== elementId);
    }

    clearSelection() {
        // 清空选中列表
        this.selectedElementIds = [];
    }

    isSelected(elementId) {
        // 检查元素是否被选中
        return this.selectedElementIds.includes(elementId);
    }

    bringToFront(elementId) {
        const element = this.elements.find(e => e.id === elementId);
        if (element) {
            this.zIndexCounter++;
            element.zIndex = this.zIndexCounter;
            return true;
        }
        return false;
    }

    moveUp(elementId) {
        const sortedElements = this.getElementsByZIndex();
        const index = sortedElements.findIndex(e => e.id === elementId);
        if (index !== -1 && index < sortedElements.length - 1) {
            const currentElement = sortedElements[index];
            const aboveElement = sortedElements[index + 1];
            const tempZ = currentElement.zIndex;
            currentElement.zIndex = aboveElement.zIndex;
            aboveElement.zIndex = tempZ;
            return true;
        }
        return false;
    }

    moveDown(elementId) {
        const sortedElements = this.getElementsByZIndex();
        const index = sortedElements.findIndex(e => e.id === elementId);
        if (index > 0) {
            const currentElement = sortedElements[index];
            const belowElement = sortedElements[index - 1];
            const tempZ = currentElement.zIndex;
            currentElement.zIndex = belowElement.zIndex;
            belowElement.zIndex = tempZ;
            return true;
        }
        return false;
    }

    sendToBack(elementId) {
        const element = this.elements.find(e => e.id === elementId);
        if (element) {
            const minZ = Math.min(...this.elements.map(e => e.zIndex));
            element.zIndex = minZ - 1;
            return true;
        }
        return false;
    }

    getElementsByZIndex() {
        return [...this.elements].sort((a, b) => a.zIndex - b.zIndex);
    }

    getElementById(elementId) {
        return this.elements.find(e => e.id === elementId);
    }

    clear() {
        this.elements = [];
        this.selectedElementIds = [];
        this.zIndexCounter = 0;
    }

    toJSON() {
        return {
            elements: this.elements.map(e => e.toJSON()),
            selectedElementIds: this.selectedElementIds,
            selectedElementId: this.selectedElementIds.length > 0 ? this.selectedElementIds[this.selectedElementIds.length - 1] : null, // 保持向后兼容，返回最近选中的
            zIndexCounter: this.zIndexCounter
        };
    }

    fromJSON(data) {
        if (!data) return;
        
        this.clear();
        
        if (data.elements) {
            data.elements.forEach(elementData => {
                const element = ElementFactory.createFromJSON(elementData);
                this.elements.push(element);
            });
        }
        
        if (data.selectedElementIds) {
            this.selectedElementIds = data.selectedElementIds;
        } else if (data.selectedElementId) {
            // 向后兼容旧版本
            this.selectedElementIds = [data.selectedElementId];
        }
        
        if (data.zIndexCounter) {
            this.zIndexCounter = data.zIndexCounter;
        }
    }
}
