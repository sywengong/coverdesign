// 封面模板系统
// 预置精美模板数据

const CoverTemplates = {
    // 模板分类
    categories: [
        { id: 'all', name: '全部', icon: 'fa-th-large' },
        { id: 'hot', name: '热门', icon: 'fa-fire' },
        { id: 'business', name: '商务', icon: 'fa-briefcase' },
        { id: 'lifestyle', name: '生活', icon: 'fa-coffee' },
        { id: 'tech', name: '科技', icon: 'fa-microchip' },
        { id: 'food', name: '美食', icon: 'fa-utensils' },
        { id: 'travel', name: '旅行', icon: 'fa-plane' },
        { id: 'fashion', name: '时尚', icon: 'fa-tshirt' }
    ],

    // 预置模板数据
    templates: [
        // 热门模板
        {
            id: 'template_001',
            name: '霓虹标题',
            category: 'hot',
            thumbnail: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            width: 1080,
            height: 1920,
            background: {
                color: '#1a1a2e',
                useGradient: true,
                gradientStart: '#667eea',
                gradientEnd: '#764ba2',
                gradientDirection: 'to-br'
            },
            elements: [
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 540,
                    y: 800,
                    width: 800,
                    height: 400,
                    fill: 'rgba(255,255,255,0.1)',
                    stroke: '#667eea',
                    strokeWidth: 3,
                    rotation: -5
                },
                {
                    type: 'text',
                    text: '精彩标题\n在这里',
                    x: 540,
                    y: 850,
                    fontSize: 72,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    textAlign: 'center'
                },
                {
                    type: 'text',
                    text: '副标题描述内容',
                    x: 540,
                    y: 1050,
                    fontSize: 36,
                    fontFamily: 'Microsoft YaHei',
                    color: '#cccccc',
                    textAlign: 'center'
                }
            ]
        },
        {
            id: 'template_002',
            name: '极简商务',
            category: 'business',
            thumbnail: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            width: 1080,
            height: 1920,
            background: {
                color: '#f5f7fa',
                useGradient: false
            },
            elements: [
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 0,
                    y: 0,
                    width: 1080,
                    height: 400,
                    fill: '#2c3e50'
                },
                {
                    type: 'text',
                    text: 'BUSINESS',
                    x: 540,
                    y: 200,
                    fontSize: 48,
                    fontFamily: 'Arial',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    textAlign: 'center',
                    letterSpacing: 10
                },
                {
                    type: 'text',
                    text: '专业商务\n解决方案',
                    x: 540,
                    y: 700,
                    fontSize: 56,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#2c3e50',
                    textAlign: 'center'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 440,
                    y: 900,
                    width: 200,
                    height: 4,
                    fill: '#3498db'
                }
            ]
        },
        {
            id: 'template_003',
            name: '活力生活',
            category: 'lifestyle',
            thumbnail: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            width: 1080,
            height: 1920,
            background: {
                color: '#fff5f5',
                useGradient: true,
                gradientStart: '#fa709a',
                gradientEnd: '#fee140',
                gradientDirection: 'to-br'
            },
            elements: [
                {
                    type: 'shape',
                    shapeType: 'circle',
                    x: 200,
                    y: 300,
                    width: 150,
                    height: 150,
                    fill: 'rgba(255,255,255,0.3)'
                },
                {
                    type: 'shape',
                    shapeType: 'circle',
                    x: 800,
                    y: 500,
                    width: 100,
                    height: 100,
                    fill: 'rgba(255,255,255,0.2)'
                },
                {
                    type: 'text',
                    text: '享受\n美好生活',
                    x: 540,
                    y: 900,
                    fontSize: 80,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    textAlign: 'center',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 340,
                    y: 1100,
                    width: 400,
                    height: 80,
                    fill: 'rgba(255,255,255,0.9)',
                    borderRadius: 40
                },
                {
                    type: 'text',
                    text: '开始探索 →',
                    x: 540,
                    y: 1150,
                    fontSize: 32,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#fa709a',
                    textAlign: 'center'
                }
            ]
        },
        {
            id: 'template_004',
            name: '科技感',
            category: 'tech',
            thumbnail: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)',
            width: 1080,
            height: 1920,
            background: {
                color: '#0c0c0c',
                useGradient: true,
                gradientStart: '#0c0c0c',
                gradientEnd: '#16213e',
                gradientDirection: 'to-bottom'
            },
            elements: [
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 50,
                    y: 100,
                    width: 2,
                    height: 200,
                    fill: '#00d4ff'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 50,
                    y: 100,
                    width: 100,
                    height: 2,
                    fill: '#00d4ff'
                },
                {
                    type: 'text',
                    text: 'TECH',
                    x: 540,
                    y: 300,
                    fontSize: 120,
                    fontFamily: 'Arial',
                    fontWeight: 'bold',
                    color: '#00d4ff',
                    textAlign: 'center',
                    letterSpacing: 20
                },
                {
                    type: 'text',
                    text: 'INNOVATION',
                    x: 540,
                    y: 420,
                    fontSize: 36,
                    fontFamily: 'Arial',
                    color: '#667eea',
                    textAlign: 'center',
                    letterSpacing: 10
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 140,
                    y: 700,
                    width: 800,
                    height: 2,
                    fill: 'rgba(0,212,255,0.3)'
                },
                {
                    type: 'text',
                    text: '探索未来科技\n引领数字创新',
                    x: 540,
                    y: 900,
                    fontSize: 48,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    textAlign: 'center'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 440,
                    y: 1400,
                    width: 200,
                    height: 60,
                    fill: 'transparent',
                    stroke: '#00d4ff',
                    strokeWidth: 2
                },
                {
                    type: 'text',
                    text: '了解更多 →',
                    x: 540,
                    y: 1440,
                    fontSize: 24,
                    fontFamily: 'Microsoft YaHei',
                    color: '#00d4ff',
                    textAlign: 'center'
                }
            ]
        },
        {
            id: 'template_005',
            name: '美食诱惑',
            category: 'food',
            thumbnail: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
            width: 1080,
            height: 1920,
            background: {
                color: '#fff9f0',
                useGradient: true,
                gradientStart: '#ff6b6b',
                gradientEnd: '#feca57',
                gradientDirection: 'to-br'
            },
            elements: [
                {
                    type: 'shape',
                    shapeType: 'circle',
                    x: -100,
                    y: -100,
                    width: 400,
                    height: 400,
                    fill: 'rgba(255,255,255,0.2)'
                },
                {
                    type: 'shape',
                    shapeType: 'circle',
                    x: 800,
                    y: 1600,
                    width: 300,
                    height: 300,
                    fill: 'rgba(255,255,255,0.15)'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 290,
                    y: 400,
                    width: 500,
                    height: 500,
                    fill: 'rgba(255,255,255,0.9)',
                    borderRadius: 20,
                    rotation: -3
                },
                {
                    type: 'text',
                    text: '美食',
                    x: 540,
                    y: 600,
                    fontSize: 100,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#ff6b6b',
                    textAlign: 'center',
                    rotation: -3
                },
                {
                    type: 'text',
                    text: '今日推荐',
                    x: 540,
                    y: 720,
                    fontSize: 40,
                    fontFamily: 'Microsoft YaHei',
                    color: '#feca57',
                    textAlign: 'center',
                    rotation: -3
                },
                {
                    type: 'text',
                    text: 'DELICIOUS FOOD',
                    x: 540,
                    y: 1100,
                    fontSize: 32,
                    fontFamily: 'Arial',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    textAlign: 'center',
                    letterSpacing: 8
                },
                {
                    type: 'text',
                    text: '探索美食的无限可能',
                    x: 540,
                    y: 1200,
                    fontSize: 36,
                    fontFamily: 'Microsoft YaHei',
                    color: '#ffffff',
                    textAlign: 'center'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 440,
                    y: 1350,
                    width: 200,
                    height: 60,
                    fill: '#ffffff',
                    borderRadius: 30
                },
                {
                    type: 'text',
                    text: '查看详情',
                    x: 540,
                    y: 1390,
                    fontSize: 28,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#ff6b6b',
                    textAlign: 'center'
                }
            ]
        },
        {
            id: 'template_006',
            name: '旅行日记',
            category: 'travel',
            thumbnail: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            width: 1080,
            height: 1920,
            background: {
                color: '#e3f2fd',
                useGradient: true,
                gradientStart: '#4facfe',
                gradientEnd: '#00f2fe',
                gradientDirection: 'to-bottom'
            },
            elements: [
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 0,
                    y: 0,
                    width: 1080,
                    height: 600,
                    fill: 'rgba(255,255,255,0.3)'
                },
                {
                    type: 'text',
                    text: 'TRAVEL',
                    x: 540,
                    y: 300,
                    fontSize: 100,
                    fontFamily: 'Arial',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    textAlign: 'center',
                    letterSpacing: 15
                },
                {
                    type: 'text',
                    text: '探索世界 发现美好',
                    x: 540,
                    y: 450,
                    fontSize: 40,
                    fontFamily: 'Microsoft YaHei',
                    color: '#ffffff',
                    textAlign: 'center'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 140,
                    y: 800,
                    width: 800,
                    height: 400,
                    fill: 'rgba(255,255,255,0.9)',
                    borderRadius: 20
                },
                {
                    type: 'text',
                    text: '旅行日记',
                    x: 540,
                    y: 950,
                    fontSize: 48,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#4facfe',
                    textAlign: 'center'
                },
                {
                    type: 'text',
                    text: '记录每一个精彩瞬间',
                    x: 540,
                    y: 1050,
                    fontSize: 32,
                    fontFamily: 'Microsoft YaHei',
                    color: '#666666',
                    textAlign: 'center'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 440,
                    y: 1350,
                    width: 200,
                    height: 60,
                    fill: '#4facfe',
                    borderRadius: 30
                },
                {
                    type: 'text',
                    text: '开始旅程',
                    x: 540,
                    y: 1390,
                    fontSize: 28,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    textAlign: 'center'
                }
            ]
        }
    ],

    // 获取所有模板
    getAllTemplates() {
        return this.templates;
    },

    // 按分类获取模板
    getTemplatesByCategory(categoryId) {
        if (categoryId === 'all') {
            return this.templates;
        }
        return this.templates.filter(t => t.category === categoryId);
    },

    // 根据ID获取模板
    getTemplateById(templateId) {
        return this.templates.find(t => t.id === templateId);
    },

    // 获取所有分类
    getCategories() {
        return this.categories;
    }
};

// 导出模板系统
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CoverTemplates;
}
