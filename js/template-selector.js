// 模板选择器类
class TemplateSelector {
    constructor() {
        this.currentCategory = 'all';
        this.templates = CoverTemplates.getAllTemplates();
        this.categories = CoverTemplates.getCategories();
        this.container = null;
        this.init();
    }

    init() {
        this.createUI();
        this.bindEvents();
    }

    // 创建模板选择器UI
    createUI() {
        // 获取左侧面板
        const leftPanel = document.querySelector('.left-panel');
        if (!leftPanel) return;

        // 创建模板选择区域
        const templateSection = document.createElement('div');
        templateSection.className = 'panel-section template-section';
        templateSection.innerHTML = `
            <h3><i class="fas fa-magic"></i> 精美模板</h3>
            <div class="template-categories">
                ${this.categories.map(cat => `
                    <button class="template-category-btn ${cat.id === 'all' ? 'active' : ''}" data-category="${cat.id}">
                        <i class="fas ${cat.icon}"></i>
                        <span>${cat.name}</span>
                    </button>
                `).join('')}
            </div>
            <div class="template-grid" id="templateGrid">
                ${this.renderTemplateGrid()}
            </div>
        `;

        // 插入到左侧面板的最前面
        leftPanel.insertBefore(templateSection, leftPanel.firstChild);
        this.container = templateSection;
    }

    // 渲染模板网格
    renderTemplateGrid() {
        const templates = CoverTemplates.getTemplatesByCategory(this.currentCategory);

        if (templates.length === 0) {
            return '<div class="template-empty">暂无该分类模板</div>';
        }

        return templates.map(template => `
            <div class="template-card" data-template-id="${template.id}" title="${template.name}">
                <div class="template-preview" style="background: ${template.thumbnail}">
                    <div class="template-overlay">
                        <button class="template-use-btn">
                            <i class="fas fa-check"></i> 使用模板
                        </button>
                    </div>
                </div>
                <div class="template-info">
                    <span class="template-name">${template.name}</span>
                    <span class="template-size">${template.width}×${template.height}</span>
                </div>
            </div>
        `).join('');
    }

    // 绑定事件
    bindEvents() {
        if (!this.container) return;

        // 分类按钮点击
        const categoryBtns = this.container.querySelectorAll('.template-category-btn');
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = btn.dataset.category;
                this.switchCategory(category);

                // 更新按钮状态
                categoryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // 模板卡片点击
        const templateGrid = this.container.querySelector('#templateGrid');
        if (templateGrid) {
            templateGrid.addEventListener('click', (e) => {
                const card = e.target.closest('.template-card');
                if (card) {
                    const templateId = card.dataset.templateId;
                    this.loadTemplate(templateId);
                }
            });
        }
    }

    // 切换分类
    switchCategory(category) {
        this.currentCategory = category;
        const grid = this.container.querySelector('#templateGrid');
        if (grid) {
            grid.innerHTML = this.renderTemplateGrid();
        }
    }

    // 加载模板
    async loadTemplate(templateId) {
        const template = CoverTemplates.getTemplateById(templateId);
        if (!template) {
            Utils.showToast('模板不存在', 'error');
            return;
        }

        // 确认是否替换当前内容
        const hasContent = window.app.canvasEditor.elementManager.elements.length > 0;
        if (hasContent) {
            if (!confirm('使用模板将替换当前画布内容，是否继续？')) {
                return;
            }
        }

        try {
            // 显示加载提示
            Utils.showToast('正在加载模板...', 'info');

            // 设置画布尺寸
            window.app.canvasEditor.setSize(template.width, template.height);

            // 设置背景
            if (template.background) {
                window.app.canvasEditor.setBackgroundColor(template.background.color);
                if (template.background.useGradient) {
                    window.app.canvasEditor.setGradient(
                        true,
                        template.background.gradientStart,
                        template.background.gradientEnd,
                        template.background.gradientDirection
                    );
                }
            }

            // 清空现有元素
            window.app.canvasEditor.elementManager.clear();
            window.app.canvasEditor.layerManager.clear();

            // 添加模板元素
            if (template.elements && template.elements.length > 0) {
                for (const elemData of template.elements) {
                    await this.createElementFromTemplate(elemData);
                }
            }

            // 渲染并保存
            window.app.canvasEditor.render();
            window.app.updateLayerList();
            window.app.saveProject();

            Utils.showToast(`模板「${template.name}」加载成功！`, 'success');

        } catch (error) {
            console.error('加载模板失败:', error);
            Utils.showToast('模板加载失败: ' + error.message, 'error');
        }
    }

    // 根据模板数据创建元素
    async createElementFromTemplate(elemData) {
        let element;

        switch (elemData.type) {
            case 'text':
                element = ElementFactory.createText({
                    x: elemData.x - (elemData.textAlign === 'center' ? 0 : 0),
                    y: elemData.y,
                    text: elemData.text,
                    fontSize: elemData.fontSize,
                    fontFamily: elemData.fontFamily,
                    fontWeight: elemData.fontWeight,
                    color: elemData.color,
                    textAlign: elemData.textAlign,
                    letterSpacing: elemData.letterSpacing || 0,
                    textShadow: elemData.textShadow || ''
                });
                // 调整位置使其居中
                if (elemData.textAlign === 'center') {
                    element.x = elemData.x - element.width / 2;
                    element.y = elemData.y - element.height / 2;
                }
                if (elemData.rotation) {
                    element.rotation = elemData.rotation;
                }
                break;

            case 'shape':
                element = ElementFactory.createShape({
                    x: elemData.x,
                    y: elemData.y,
                    width: elemData.width,
                    height: elemData.height,
                    shapeType: elemData.shapeType,
                    fill: elemData.fill,
                    stroke: elemData.stroke,
                    strokeWidth: elemData.strokeWidth,
                    borderRadius: elemData.borderRadius
                });
                if (elemData.rotation) {
                    element.rotation = elemData.rotation;
                }
                break;

            case 'image':
                element = ElementFactory.createImage({
                    x: elemData.x,
                    y: elemData.y,
                    width: elemData.width,
                    height: elemData.height
                });
                if (elemData.src) {
                    await element.loadImage(elemData.src);
                }
                break;
        }

        if (element) {
            window.app.canvasEditor.elementManager.addElement(element);
            window.app.canvasEditor.createLayer(element);
        }

        return element;
    }
}

// 在 DOM 加载完成后初始化模板选择器
document.addEventListener('DOMContentLoaded', () => {
    // 延迟初始化，确保其他组件已加载
    setTimeout(() => {
        window.templateSelector = new TemplateSelector();
    }, 100);
});
