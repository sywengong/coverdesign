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
        },
        // ========== 热门模板 ==========
        {
            id: 'template_007',
            name: '赛博朋克',
            category: 'hot',
            thumbnail: 'linear-gradient(135deg, #ff0080 0%, #7928ca 50%, #00d4ff 100%)',
            width: 1080,
            height: 1920,
            background: {
                color: '#0a0a1a',
                useGradient: true,
                gradientStart: '#ff0080',
                gradientEnd: '#7928ca',
                gradientDirection: 'to-br'
            },
            elements: [
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 40,
                    y: 40,
                    width: 1000,
                    height: 1840,
                    fill: 'transparent',
                    stroke: '#ff0080',
                    strokeWidth: 2
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 80,
                    y: 80,
                    width: 920,
                    height: 1760,
                    fill: 'transparent',
                    stroke: 'rgba(121,40,202,0.5)',
                    strokeWidth: 1
                },
                {
                    type: 'text',
                    text: 'CYBER',
                    x: 540,
                    y: 600,
                    fontSize: 140,
                    fontFamily: 'Arial',
                    fontWeight: 'bold',
                    color: '#ff0080',
                    textAlign: 'center',
                    letterSpacing: 20,
                    textShadow: '0 0 30px rgba(255,0,128,0.6), 0 0 60px rgba(255,0,128,0.3)'
                },
                {
                    type: 'text',
                    text: 'PUNK',
                    x: 540,
                    y: 780,
                    fontSize: 140,
                    fontFamily: 'Arial',
                    fontWeight: 'bold',
                    color: '#00d4ff',
                    textAlign: 'center',
                    letterSpacing: 20,
                    textShadow: '0 0 30px rgba(0,212,255,0.6), 0 0 60px rgba(0,212,255,0.3)'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 340,
                    y: 980,
                    width: 400,
                    height: 3,
                    fill: 'rgba(255,0,128,0.5)'
                },
                {
                    type: 'text',
                    text: '未来已来 · 无限可能',
                    x: 540,
                    y: 1050,
                    fontSize: 36,
                    fontFamily: 'Microsoft YaHei',
                    color: '#cccccc',
                    textAlign: 'center'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 390,
                    y: 1500,
                    width: 300,
                    height: 70,
                    fill: 'transparent',
                    stroke: '#ff0080',
                    strokeWidth: 2
                },
                {
                    type: 'text',
                    text: '进入未来',
                    x: 540,
                    y: 1540,
                    fontSize: 28,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#ff0080',
                    textAlign: 'center'
                }
            ]
        },
        {
            id: 'template_008',
            name: '金色荣耀',
            category: 'hot',
            thumbnail: 'linear-gradient(135deg, #1a1a2e 0%, #c6a04a 50%, #1a1a2e 100%)',
            width: 1080,
            height: 1920,
            background: {
                color: '#0f0f1a',
                useGradient: true,
                gradientStart: '#1a1a2e',
                gradientEnd: '#2d1f3d',
                gradientDirection: 'to-bottom'
            },
            elements: [
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 0,
                    y: 750,
                    width: 1080,
                    height: 420,
                    fill: 'rgba(198,160,74,0.08)'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 140,
                    y: 780,
                    width: 800,
                    height: 1,
                    fill: 'rgba(198,160,74,0.5)'
                },
                {
                    type: 'text',
                    text: '荣耀时刻',
                    x: 540,
                    y: 900,
                    fontSize: 96,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#c6a04a',
                    textAlign: 'center',
                    textShadow: '0 0 20px rgba(198,160,74,0.4)'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 140,
                    y: 1100,
                    width: 800,
                    height: 1,
                    fill: 'rgba(198,160,74,0.5)'
                },
                {
                    type: 'text',
                    text: 'GOLDEN GLORY',
                    x: 540,
                    y: 1200,
                    fontSize: 32,
                    fontFamily: 'Arial',
                    color: '#8a7033',
                    textAlign: 'center',
                    letterSpacing: 12
                },
                {
                    type: 'text',
                    text: '追求卓越 · 铸就辉煌',
                    x: 540,
                    y: 1300,
                    fontSize: 36,
                    fontFamily: 'Microsoft YaHei',
                    color: '#aaaaaa',
                    textAlign: 'center'
                },
                {
                    type: 'shape',
                    shapeType: 'circle',
                    x: 90,
                    y: 90,
                    width: 120,
                    height: 120,
                    fill: 'transparent',
                    stroke: 'rgba(198,160,74,0.3)',
                    strokeWidth: 1
                },
                {
                    type: 'shape',
                    shapeType: 'circle',
                    x: 870,
                    y: 1700,
                    width: 120,
                    height: 120,
                    fill: 'transparent',
                    stroke: 'rgba(198,160,74,0.3)',
                    strokeWidth: 1
                }
            ]
        },
        {
            id: 'template_009',
            name: '渐变波浪',
            category: 'hot',
            thumbnail: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 50%, #f6d365 100%)',
            width: 1080,
            height: 1920,
            background: {
                color: '#1a1a2e',
                useGradient: true,
                gradientStart: '#a18cd1',
                gradientEnd: '#fbc2eb',
                gradientDirection: 'to-br'
            },
            elements: [
                {
                    type: 'shape',
                    shapeType: 'circle',
                    x: -200,
                    y: 300,
                    width: 600,
                    height: 600,
                    fill: 'rgba(255,255,255,0.08)'
                },
                {
                    type: 'shape',
                    shapeType: 'circle',
                    x: 700,
                    y: 1200,
                    width: 500,
                    height: 500,
                    fill: 'rgba(255,255,255,0.06)'
                },
                {
                    type: 'shape',
                    shapeType: 'circle',
                    x: -100,
                    y: 1400,
                    width: 300,
                    height: 300,
                    fill: 'rgba(255,255,255,0.05)'
                },
                {
                    type: 'text',
                    text: '创意',
                    x: 540,
                    y: 800,
                    fontSize: 120,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    textAlign: 'center'
                },
                {
                    type: 'text',
                    text: '无界',
                    x: 540,
                    y: 960,
                    fontSize: 120,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    textAlign: 'center'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 390,
                    y: 1150,
                    width: 300,
                    height: 4,
                    fill: 'rgba(255,255,255,0.6)'
                },
                {
                    type: 'text',
                    text: 'CREATIVE BOUNDLESS',
                    x: 540,
                    y: 1250,
                    fontSize: 28,
                    fontFamily: 'Arial',
                    color: 'rgba(255,255,255,0.8)',
                    textAlign: 'center',
                    letterSpacing: 8
                }
            ]
        },
        {
            id: 'template_010',
            name: '暗夜星光',
            category: 'hot',
            thumbnail: 'linear-gradient(135deg, #0c1445 0%, #1a0533 50%, #2d1b69 100%)',
            width: 1080,
            height: 1920,
            background: {
                color: '#0a0a1a',
                useGradient: true,
                gradientStart: '#0c1445',
                gradientEnd: '#2d1b69',
                gradientDirection: 'to-bottom'
            },
            elements: [
                {
                    type: 'shape',
                    shapeType: 'circle',
                    x: 100,
                    y: 200,
                    width: 8,
                    height: 8,
                    fill: '#ffffff'
                },
                {
                    type: 'shape',
                    shapeType: 'circle',
                    x: 400,
                    y: 150,
                    width: 5,
                    height: 5,
                    fill: 'rgba(255,255,255,0.7)'
                },
                {
                    type: 'shape',
                    shapeType: 'circle',
                    x: 800,
                    y: 300,
                    width: 6,
                    height: 6,
                    fill: 'rgba(255,255,255,0.5)'
                },
                {
                    type: 'shape',
                    shapeType: 'circle',
                    x: 600,
                    y: 100,
                    width: 4,
                    height: 4,
                    fill: 'rgba(255,255,255,0.6)'
                },
                {
                    type: 'shape',
                    shapeType: 'circle',
                    x: 300,
                    y: 400,
                    width: 3,
                    height: 3,
                    fill: 'rgba(255,255,255,0.4)'
                },
                {
                    type: 'text',
                    text: '暗夜',
                    x: 540,
                    y: 800,
                    fontSize: 100,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    textAlign: 'center',
                    textShadow: '0 0 40px rgba(138,92,246,0.6)'
                },
                {
                    type: 'text',
                    text: '星光',
                    x: 540,
                    y: 960,
                    fontSize: 100,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#c4b5fd',
                    textAlign: 'center',
                    textShadow: '0 0 40px rgba(196,181,253,0.4)'
                },
                {
                    type: 'text',
                    text: '在黑暗中找到属于你的光',
                    x: 540,
                    y: 1150,
                    fontSize: 32,
                    fontFamily: 'Microsoft YaHei',
                    color: 'rgba(255,255,255,0.6)',
                    textAlign: 'center'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 440,
                    y: 1550,
                    width: 200,
                    height: 60,
                    fill: 'rgba(138,92,246,0.3)',
                    stroke: '#8a5cf6',
                    strokeWidth: 1,
                    borderRadius: 30
                },
                {
                    type: 'text',
                    text: '探索更多',
                    x: 540,
                    y: 1590,
                    fontSize: 26,
                    fontFamily: 'Microsoft YaHei',
                    color: '#c4b5fd',
                    textAlign: 'center'
                }
            ]
        },
        // ========== 商务模板 ==========
        {
            id: 'template_011',
            name: '黑金商务',
            category: 'business',
            thumbnail: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #c9a84c 100%)',
            width: 1080,
            height: 1920,
            background: {
                color: '#0f0f0f',
                useGradient: false
            },
            elements: [
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 0,
                    y: 0,
                    width: 1080,
                    height: 8,
                    fill: '#c9a84c'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 80,
                    y: 500,
                    width: 4,
                    height: 200,
                    fill: '#c9a84c'
                },
                {
                    type: 'text',
                    text: '精英峰会',
                    x: 540,
                    y: 600,
                    fontSize: 80,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    textAlign: 'center'
                },
                {
                    type: 'text',
                    text: 'ELITE SUMMIT 2026',
                    x: 540,
                    y: 740,
                    fontSize: 32,
                    fontFamily: 'Arial',
                    color: '#c9a84c',
                    textAlign: 'center',
                    letterSpacing: 8
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 340,
                    y: 850,
                    width: 400,
                    height: 2,
                    fill: 'rgba(201,168,76,0.3)'
                },
                {
                    type: 'text',
                    text: '引领商业未来\n共创卓越价值',
                    x: 540,
                    y: 1000,
                    fontSize: 40,
                    fontFamily: 'Microsoft YaHei',
                    color: '#999999',
                    textAlign: 'center'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 340,
                    y: 1400,
                    width: 400,
                    height: 80,
                    fill: '#c9a84c',
                    borderRadius: 4
                },
                {
                    type: 'text',
                    text: '立即报名',
                    x: 540,
                    y: 1448,
                    fontSize: 32,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#0f0f0f',
                    textAlign: 'center'
                }
            ]
        },
        {
            id: 'template_012',
            name: '蓝海战略',
            category: 'business',
            thumbnail: 'linear-gradient(135deg, #0a2342 0%, #2ca6a4 100%)',
            width: 1080,
            height: 1920,
            background: {
                color: '#0a2342',
                useGradient: true,
                gradientStart: '#0a2342',
                gradientEnd: '#1a3a5c',
                gradientDirection: 'to-bottom'
            },
            elements: [
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 0,
                    y: 1600,
                    width: 1080,
                    height: 320,
                    fill: 'rgba(44,166,164,0.15)'
                },
                {
                    type: 'shape',
                    shapeType: 'circle',
                    x: 850,
                    y: 100,
                    width: 300,
                    height: 300,
                    fill: 'rgba(44,166,164,0.08)'
                },
                {
                    type: 'text',
                    text: 'BLUE',
                    x: 540,
                    y: 550,
                    fontSize: 130,
                    fontFamily: 'Arial',
                    fontWeight: 'bold',
                    color: '#2ca6a4',
                    textAlign: 'center',
                    letterSpacing: 15
                },
                {
                    type: 'text',
                    text: 'OCEAN',
                    x: 540,
                    y: 700,
                    fontSize: 130,
                    fontFamily: 'Arial',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    textAlign: 'center',
                    letterSpacing: 15
                },
                {
                    type: 'text',
                    text: '蓝海战略 · 突破边界',
                    x: 540,
                    y: 920,
                    fontSize: 36,
                    fontFamily: 'Microsoft YaHei',
                    color: 'rgba(255,255,255,0.7)',
                    textAlign: 'center'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 390,
                    y: 1050,
                    width: 300,
                    height: 2,
                    fill: '#2ca6a4'
                },
                {
                    type: 'text',
                    text: '战略 · 创新 · 领航',
                    x: 540,
                    y: 1150,
                    fontSize: 28,
                    fontFamily: 'Microsoft YaHei',
                    color: 'rgba(255,255,255,0.5)',
                    textAlign: 'center',
                    letterSpacing: 6
                }
            ]
        },
        {
            id: 'template_013',
            name: '极简白',
            category: 'business',
            thumbnail: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
            width: 1080,
            height: 1920,
            background: {
                color: '#ffffff',
                useGradient: false
            },
            elements: [
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 0,
                    y: 1800,
                    width: 1080,
                    height: 120,
                    fill: '#1a1a1a'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 80,
                    y: 600,
                    width: 60,
                    height: 6,
                    fill: '#e74c3c'
                },
                {
                    type: 'text',
                    text: '简约不简单',
                    x: 80,
                    y: 700,
                    fontSize: 72,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#1a1a1a',
                    textAlign: 'left'
                },
                {
                    type: 'text',
                    text: 'Less is More',
                    x: 80,
                    y: 820,
                    fontSize: 36,
                    fontFamily: 'Arial',
                    color: '#999999',
                    textAlign: 'left'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 80,
                    y: 920,
                    width: 920,
                    height: 1,
                    fill: '#eeeeee'
                },
                {
                    type: 'text',
                    text: '以极简之道\n驭商业之变',
                    x: 80,
                    y: 1000,
                    fontSize: 40,
                    fontFamily: 'Microsoft YaHei',
                    color: '#666666',
                    textAlign: 'left'
                }
            ]
        },
        {
            id: 'template_014',
            name: '年度报告',
            category: 'business',
            thumbnail: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
            width: 1080,
            height: 1920,
            background: {
                color: '#2c3e50',
                useGradient: true,
                gradientStart: '#2c3e50',
                gradientEnd: '#34495e',
                gradientDirection: 'to-bottom'
            },
            elements: [
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 0,
                    y: 0,
                    width: 1080,
                    height: 200,
                    fill: 'rgba(52,152,219,0.2)'
                },
                {
                    type: 'text',
                    text: '2026',
                    x: 540,
                    y: 80,
                    fontSize: 60,
                    fontFamily: 'Arial',
                    fontWeight: 'bold',
                    color: '#3498db',
                    textAlign: 'center',
                    letterSpacing: 20
                },
                {
                    type: 'text',
                    text: 'ANNUAL REPORT',
                    x: 540,
                    y: 500,
                    fontSize: 40,
                    fontFamily: 'Arial',
                    fontWeight: 'bold',
                    color: '#3498db',
                    textAlign: 'center',
                    letterSpacing: 12
                },
                {
                    type: 'text',
                    text: '年度报告',
                    x: 540,
                    y: 620,
                    fontSize: 80,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    textAlign: 'center'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 340,
                    y: 760,
                    width: 400,
                    height: 3,
                    fill: 'rgba(52,152,219,0.5)'
                },
                {
                    type: 'text',
                    text: '回顾与展望',
                    x: 540,
                    y: 860,
                    fontSize: 36,
                    fontFamily: 'Microsoft YaHei',
                    color: 'rgba(255,255,255,0.6)',
                    textAlign: 'center'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 340,
                    y: 1400,
                    width: 400,
                    height: 70,
                    fill: '#3498db',
                    borderRadius: 4
                },
                {
                    type: 'text',
                    text: '查看完整报告',
                    x: 540,
                    y: 1445,
                    fontSize: 28,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    textAlign: 'center'
                }
            ]
        },
        {
            id: 'template_015',
            name: '数据驱动',
            category: 'business',
            thumbnail: 'linear-gradient(135deg, #1e3a5f 0%, #4a90d9 100%)',
            width: 1080,
            height: 1920,
            background: {
                color: '#1e3a5f',
                useGradient: true,
                gradientStart: '#1e3a5f',
                gradientEnd: '#0d1b2a',
                gradientDirection: 'to-bottom'
            },
            elements: [
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 100,
                    y: 1400,
                    width: 60,
                    height: 200,
                    fill: 'rgba(74,144,217,0.6)',
                    borderRadius: 4
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 220,
                    y: 1300,
                    width: 60,
                    height: 300,
                    fill: 'rgba(74,144,217,0.5)',
                    borderRadius: 4
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 340,
                    y: 1250,
                    width: 60,
                    height: 350,
                    fill: 'rgba(74,144,217,0.4)',
                    borderRadius: 4
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 460,
                    y: 1150,
                    width: 60,
                    height: 450,
                    fill: 'rgba(74,144,217,0.7)',
                    borderRadius: 4
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 580,
                    y: 1100,
                    width: 60,
                    height: 500,
                    fill: '#4a90d9',
                    borderRadius: 4
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 700,
                    y: 1200,
                    width: 60,
                    height: 400,
                    fill: 'rgba(74,144,217,0.6)',
                    borderRadius: 4
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 820,
                    y: 1350,
                    width: 60,
                    height: 250,
                    fill: 'rgba(74,144,217,0.4)',
                    borderRadius: 4
                },
                {
                    type: 'text',
                    text: 'DATA DRIVEN',
                    x: 540,
                    y: 500,
                    fontSize: 56,
                    fontFamily: 'Arial',
                    fontWeight: 'bold',
                    color: '#4a90d9',
                    textAlign: 'center',
                    letterSpacing: 10
                },
                {
                    type: 'text',
                    text: '数据驱动决策',
                    x: 540,
                    y: 620,
                    fontSize: 64,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    textAlign: 'center'
                },
                {
                    type: 'text',
                    text: '用数据洞察未来',
                    x: 540,
                    y: 740,
                    fontSize: 36,
                    fontFamily: 'Microsoft YaHei',
                    color: 'rgba(255,255,255,0.6)',
                    textAlign: 'center'
                }
            ]
        },
        // ========== 生活模板 ==========
        {
            id: 'template_016',
            name: '晨间日记',
            category: 'lifestyle',
            thumbnail: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
            width: 1080,
            height: 1920,
            background: {
                color: '#ffecd2',
                useGradient: true,
                gradientStart: '#ffecd2',
                gradientEnd: '#fcb69f',
                gradientDirection: 'to-bottom'
            },
            elements: [
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 80,
                    y: 400,
                    width: 920,
                    height: 700,
                    fill: 'rgba(255,255,255,0.7)',
                    borderRadius: 20
                },
                {
                    type: 'shape',
                    shapeType: 'circle',
                    x: 460,
                    y: 300,
                    width: 160,
                    height: 160,
                    fill: '#fcb69f',
                    borderRadius: 80
                },
                {
                    type: 'text',
                    text: '早安',
                    x: 540,
                    y: 380,
                    fontSize: 50,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    textAlign: 'center'
                },
                {
                    type: 'text',
                    text: '晨间日记',
                    x: 540,
                    y: 600,
                    fontSize: 64,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#5d4037',
                    textAlign: 'center'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 390,
                    y: 700,
                    width: 300,
                    height: 3,
                    fill: '#fcb69f'
                },
                {
                    type: 'text',
                    text: '记录每一天的小确幸\n让生活充满仪式感',
                    x: 540,
                    y: 800,
                    fontSize: 32,
                    fontFamily: 'Microsoft YaHei',
                    color: '#8d6e63',
                    textAlign: 'center'
                }
            ]
        },
        {
            id: 'template_017',
            name: '健身打卡',
            category: 'lifestyle',
            thumbnail: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
            width: 1080,
            height: 1920,
            background: {
                color: '#0a2e1a',
                useGradient: true,
                gradientStart: '#11998e',
                gradientEnd: '#38ef7d',
                gradientDirection: 'to-br'
            },
            elements: [
                {
                    type: 'shape',
                    shapeType: 'circle',
                    x: 780,
                    y: 100,
                    width: 400,
                    height: 400,
                    fill: 'rgba(255,255,255,0.06)'
                },
                {
                    type: 'shape',
                    shapeType: 'circle',
                    x: -100,
                    y: 1500,
                    width: 350,
                    height: 350,
                    fill: 'rgba(255,255,255,0.05)'
                },
                {
                    type: 'text',
                    text: 'FIT',
                    x: 540,
                    y: 500,
                    fontSize: 150,
                    fontFamily: 'Arial',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    textAlign: 'center',
                    letterSpacing: 20
                },
                {
                    type: 'text',
                    text: '健身打卡',
                    x: 540,
                    y: 750,
                    fontSize: 64,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    textAlign: 'center'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 340,
                    y: 900,
                    width: 400,
                    height: 3,
                    fill: 'rgba(255,255,255,0.4)'
                },
                {
                    type: 'text',
                    text: '自律即自由',
                    x: 540,
                    y: 1000,
                    fontSize: 40,
                    fontFamily: 'Microsoft YaHei',
                    color: 'rgba(255,255,255,0.8)',
                    textAlign: 'center'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 340,
                    y: 1400,
                    width: 400,
                    height: 70,
                    fill: 'rgba(255,255,255,0.2)',
                    borderRadius: 35
                },
                {
                    type: 'text',
                    text: '开始训练 →',
                    x: 540,
                    y: 1445,
                    fontSize: 28,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    textAlign: 'center'
                }
            ]
        },
        {
            id: 'template_018',
            name: '读书笔记',
            category: 'lifestyle',
            thumbnail: 'linear-gradient(135deg, #2c3e50 0%, #fd746c 100%)',
            width: 1080,
            height: 1920,
            background: {
                color: '#2c3e50',
                useGradient: true,
                gradientStart: '#2c3e50',
                gradientEnd: '#4a6741',
                gradientDirection: 'to-bottom'
            },
            elements: [
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 140,
                    y: 300,
                    width: 800,
                    height: 600,
                    fill: 'rgba(255,255,255,0.08)',
                    borderRadius: 16
                },
                {
                    type: 'text',
                    text: '📖',
                    x: 540,
                    y: 400,
                    fontSize: 80,
                    fontFamily: 'Arial',
                    color: '#ffffff',
                    textAlign: 'center'
                },
                {
                    type: 'text',
                    text: '读书笔记',
                    x: 540,
                    y: 550,
                    fontSize: 72,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    textAlign: 'center'
                },
                {
                    type: 'text',
                    text: 'READING NOTES',
                    x: 540,
                    y: 670,
                    fontSize: 28,
                    fontFamily: 'Arial',
                    color: '#fd746c',
                    textAlign: 'center',
                    letterSpacing: 8
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 390,
                    y: 750,
                    width: 300,
                    height: 2,
                    fill: 'rgba(253,116,108,0.4)'
                },
                {
                    type: 'text',
                    text: '书中自有黄金屋\n每页都是新世界',
                    x: 540,
                    y: 1100,
                    fontSize: 36,
                    fontFamily: 'Microsoft YaHei',
                    color: 'rgba(255,255,255,0.7)',
                    textAlign: 'center'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 340,
                    y: 1500,
                    width: 400,
                    height: 70,
                    fill: '#fd746c',
                    borderRadius: 35
                },
                {
                    type: 'text',
                    text: '开始阅读',
                    x: 540,
                    y: 1545,
                    fontSize: 28,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    textAlign: 'center'
                }
            ]
        },
        {
            id: 'template_019',
            name: '居家时光',
            category: 'lifestyle',
            thumbnail: 'linear-gradient(135deg, #e8d5b7 0%, #b8a080 100%)',
            width: 1080,
            height: 1920,
            background: {
                color: '#e8d5b7',
                useGradient: true,
                gradientStart: '#e8d5b7',
                gradientEnd: '#d4c0a0',
                gradientDirection: 'to-bottom'
            },
            elements: [
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 0,
                    y: 0,
                    width: 1080,
                    height: 500,
                    fill: 'rgba(139,109,80,0.15)'
                },
                {
                    type: 'text',
                    text: 'HOME',
                    x: 540,
                    y: 200,
                    fontSize: 100,
                    fontFamily: 'Arial',
                    fontWeight: 'bold',
                    color: '#8b6d50',
                    textAlign: 'center',
                    letterSpacing: 15
                },
                {
                    type: 'text',
                    text: '居家时光',
                    x: 540,
                    y: 700,
                    fontSize: 72,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#5d4037',
                    textAlign: 'center'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 390,
                    y: 820,
                    width: 300,
                    height: 3,
                    fill: '#8b6d50'
                },
                {
                    type: 'text',
                    text: '享受慵懒午后的\n每一刻宁静',
                    x: 540,
                    y: 950,
                    fontSize: 36,
                    fontFamily: 'Microsoft YaHei',
                    color: '#6d4c41',
                    textAlign: 'center'
                },
                {
                    type: 'shape',
                    shapeType: 'circle',
                    x: 80,
                    y: 1550,
                    width: 60,
                    height: 60,
                    fill: 'rgba(139,109,80,0.2)'
                },
                {
                    type: 'shape',
                    shapeType: 'circle',
                    x: 940,
                    y: 1650,
                    width: 40,
                    height: 40,
                    fill: 'rgba(139,109,80,0.15)'
                }
            ]
        },
        {
            id: 'template_020',
            name: '花艺生活',
            category: 'lifestyle',
            thumbnail: 'linear-gradient(135deg, #fce4ec 0%, #f48fb1 100%)',
            width: 1080,
            height: 1920,
            background: {
                color: '#fce4ec',
                useGradient: true,
                gradientStart: '#fce4ec',
                gradientEnd: '#f8bbd0',
                gradientDirection: 'to-bottom'
            },
            elements: [
                {
                    type: 'shape',
                    shapeType: 'circle',
                    x: -80,
                    y: -80,
                    width: 300,
                    height: 300,
                    fill: 'rgba(244,143,177,0.2)'
                },
                {
                    type: 'shape',
                    shapeType: 'circle',
                    x: 860,
                    y: 1600,
                    width: 280,
                    height: 280,
                    fill: 'rgba(244,143,177,0.15)'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 190,
                    y: 600,
                    width: 700,
                    height: 500,
                    fill: 'rgba(255,255,255,0.8)',
                    borderRadius: 24
                },
                {
                    type: 'text',
                    text: '花艺生活',
                    x: 540,
                    y: 750,
                    fontSize: 72,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#c2185b',
                    textAlign: 'center'
                },
                {
                    type: 'text',
                    text: 'FLORAL LIFE',
                    x: 540,
                    y: 870,
                    fontSize: 28,
                    fontFamily: 'Arial',
                    color: '#e91e63',
                    textAlign: 'center',
                    letterSpacing: 8
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 440,
                    y: 940,
                    width: 200,
                    height: 3,
                    fill: '#f48fb1'
                },
                {
                    type: 'text',
                    text: '用花的语言\n诠释生活之美',
                    x: 540,
                    y: 1300,
                    fontSize: 36,
                    fontFamily: 'Microsoft YaHei',
                    color: '#880e4f',
                    textAlign: 'center'
                }
            ]
        },
        // ========== 科技模板 ==========
        {
            id: 'template_021',
            name: 'AI 未来',
            category: 'tech',
            thumbnail: 'linear-gradient(135deg, #000428 0%, #004e92 100%)',
            width: 1080,
            height: 1920,
            background: {
                color: '#000428',
                useGradient: true,
                gradientStart: '#000428',
                gradientEnd: '#001833',
                gradientDirection: 'to-bottom'
            },
            elements: [
                {
                    type: 'shape',
                    shapeType: 'circle',
                    x: 340,
                    y: 500,
                    width: 400,
                    height: 400,
                    fill: 'transparent',
                    stroke: 'rgba(0,78,146,0.4)',
                    strokeWidth: 1
                },
                {
                    type: 'shape',
                    shapeType: 'circle',
                    x: 290,
                    y: 450,
                    width: 500,
                    height: 500,
                    fill: 'transparent',
                    stroke: 'rgba(0,78,146,0.25)',
                    strokeWidth: 1
                },
                {
                    type: 'shape',
                    shapeType: 'circle',
                    x: 240,
                    y: 400,
                    width: 600,
                    height: 600,
                    fill: 'transparent',
                    stroke: 'rgba(0,78,146,0.15)',
                    strokeWidth: 1
                },
                {
                    type: 'text',
                    text: 'AI',
                    x: 540,
                    y: 650,
                    fontSize: 180,
                    fontFamily: 'Arial',
                    fontWeight: 'bold',
                    color: '#00d4ff',
                    textAlign: 'center',
                    textShadow: '0 0 40px rgba(0,212,255,0.5)'
                },
                {
                    type: 'text',
                    text: 'FUTURE',
                    x: 540,
                    y: 880,
                    fontSize: 60,
                    fontFamily: 'Arial',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    textAlign: 'center',
                    letterSpacing: 25
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 340,
                    y: 1020,
                    width: 400,
                    height: 2,
                    fill: 'rgba(0,212,255,0.3)'
                },
                {
                    type: 'text',
                    text: '人工智能 · 重塑未来',
                    x: 540,
                    y: 1150,
                    fontSize: 36,
                    fontFamily: 'Microsoft YaHei',
                    color: 'rgba(255,255,255,0.6)',
                    textAlign: 'center'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 390,
                    y: 1500,
                    width: 300,
                    height: 60,
                    fill: 'transparent',
                    stroke: '#00d4ff',
                    strokeWidth: 2
                },
                {
                    type: 'text',
                    text: '了解更多',
                    x: 540,
                    y: 1535,
                    fontSize: 26,
                    fontFamily: 'Microsoft YaHei',
                    color: '#00d4ff',
                    textAlign: 'center'
                }
            ]
        },
        {
            id: 'template_022',
            name: '量子计算',
            category: 'tech',
            thumbnail: 'linear-gradient(135deg, #1a0033 0%, #6a11cb 100%)',
            width: 1080,
            height: 1920,
            background: {
                color: '#0a001a',
                useGradient: true,
                gradientStart: '#1a0033',
                gradientEnd: '#0d001f',
                gradientDirection: 'to-bottom'
            },
            elements: [
                {
                    type: 'shape',
                    shapeType: 'circle',
                    x: 340,
                    y: 400,
                    width: 400,
                    height: 400,
                    fill: 'transparent',
                    stroke: 'rgba(106,17,203,0.4)',
                    strokeWidth: 1
                },
                {
                    type: 'shape',
                    shapeType: 'circle',
                    x: 440,
                    y: 500,
                    width: 200,
                    height: 200,
                    fill: 'transparent',
                    stroke: 'rgba(106,17,203,0.6)',
                    strokeWidth: 1
                },
                {
                    type: 'shape',
                    shapeType: 'circle',
                    x: 490,
                    y: 550,
                    width: 100,
                    height: 100,
                    fill: 'rgba(106,17,203,0.1)'
                },
                {
                    type: 'text',
                    text: 'QUANTUM',
                    x: 540,
                    y: 900,
                    fontSize: 72,
                    fontFamily: 'Arial',
                    fontWeight: 'bold',
                    color: '#a855f7',
                    textAlign: 'center',
                    letterSpacing: 15,
                    textShadow: '0 0 30px rgba(168,85,247,0.5)'
                },
                {
                    type: 'text',
                    text: '量子计算',
                    x: 540,
                    y: 1060,
                    fontSize: 56,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    textAlign: 'center'
                },
                {
                    type: 'text',
                    text: '突破经典极限\n开启算力新纪元',
                    x: 540,
                    y: 1200,
                    fontSize: 32,
                    fontFamily: 'Microsoft YaHei',
                    color: 'rgba(255,255,255,0.5)',
                    textAlign: 'center'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 390,
                    y: 1500,
                    width: 300,
                    height: 60,
                    fill: 'rgba(106,17,203,0.3)',
                    stroke: '#a855f7',
                    strokeWidth: 1,
                    borderRadius: 30
                },
                {
                    type: 'text',
                    text: '探索量子世界',
                    x: 540,
                    y: 1535,
                    fontSize: 24,
                    fontFamily: 'Microsoft YaHei',
                    color: '#a855f7',
                    textAlign: 'center'
                }
            ]
        },
        {
            id: 'template_023',
            name: '区块链',
            category: 'tech',
            thumbnail: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
            width: 1080,
            height: 1920,
            background: {
                color: '#0f2027',
                useGradient: true,
                gradientStart: '#0f2027',
                gradientEnd: '#203a43',
                gradientDirection: 'to-bottom'
            },
            elements: [
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 180,
                    y: 500,
                    width: 120,
                    height: 120,
                    fill: 'transparent',
                    stroke: 'rgba(44,83,100,0.8)',
                    strokeWidth: 2,
                    rotation: 45
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 380,
                    y: 500,
                    width: 120,
                    height: 120,
                    fill: 'transparent',
                    stroke: 'rgba(44,83,100,0.8)',
                    strokeWidth: 2,
                    rotation: 45
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 580,
                    y: 500,
                    width: 120,
                    height: 120,
                    fill: 'transparent',
                    stroke: 'rgba(44,83,100,0.8)',
                    strokeWidth: 2,
                    rotation: 45
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 780,
                    y: 500,
                    width: 120,
                    height: 120,
                    fill: 'transparent',
                    stroke: 'rgba(44,83,100,0.8)',
                    strokeWidth: 2,
                    rotation: 45
                },
                {
                    type: 'text',
                    text: 'BLOCKCHAIN',
                    x: 540,
                    y: 800,
                    fontSize: 60,
                    fontFamily: 'Arial',
                    fontWeight: 'bold',
                    color: '#2ec4b6',
                    textAlign: 'center',
                    letterSpacing: 10
                },
                {
                    type: 'text',
                    text: '区块链',
                    x: 540,
                    y: 950,
                    fontSize: 72,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    textAlign: 'center'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 340,
                    y: 1080,
                    width: 400,
                    height: 2,
                    fill: 'rgba(46,196,182,0.3)'
                },
                {
                    type: 'text',
                    text: '去中心化 · 信任重构',
                    x: 540,
                    y: 1180,
                    fontSize: 36,
                    fontFamily: 'Microsoft YaHei',
                    color: 'rgba(255,255,255,0.5)',
                    textAlign: 'center'
                }
            ]
        },
        {
            id: 'template_024',
            name: '数字孪生',
            category: 'tech',
            thumbnail: 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #238636 100%)',
            width: 1080,
            height: 1920,
            background: {
                color: '#0d1117',
                useGradient: true,
                gradientStart: '#0d1117',
                gradientEnd: '#161b22',
                gradientDirection: 'to-bottom'
            },
            elements: [
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 50,
                    y: 50,
                    width: 980,
                    height: 1820,
                    fill: 'transparent',
                    stroke: 'rgba(35,134,54,0.2)',
                    strokeWidth: 1
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 50,
                    y: 50,
                    width: 20,
                    height: 20,
                    fill: '#238636'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 1010,
                    y: 50,
                    width: 20,
                    height: 20,
                    fill: '#238636'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 50,
                    y: 1850,
                    width: 20,
                    height: 20,
                    fill: '#238636'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 1010,
                    y: 1850,
                    width: 20,
                    height: 20,
                    fill: '#238636'
                },
                {
                    type: 'text',
                    text: 'DIGITAL TWIN',
                    x: 540,
                    y: 600,
                    fontSize: 56,
                    fontFamily: 'Arial',
                    fontWeight: 'bold',
                    color: '#238636',
                    textAlign: 'center',
                    letterSpacing: 10
                },
                {
                    type: 'text',
                    text: '数字孪生',
                    x: 540,
                    y: 760,
                    fontSize: 80,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    textAlign: 'center'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 340,
                    y: 920,
                    width: 400,
                    height: 2,
                    fill: 'rgba(35,134,54,0.4)'
                },
                {
                    type: 'text',
                    text: '虚实映射 · 智能驱动',
                    x: 540,
                    y: 1040,
                    fontSize: 36,
                    fontFamily: 'Microsoft YaHei',
                    color: 'rgba(255,255,255,0.5)',
                    textAlign: 'center'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 390,
                    y: 1450,
                    width: 300,
                    height: 60,
                    fill: '#238636',
                    borderRadius: 4
                },
                {
                    type: 'text',
                    text: '了解更多',
                    x: 540,
                    y: 1488,
                    fontSize: 26,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    textAlign: 'center'
                }
            ]
        },
        {
            id: 'template_025',
            name: '芯片世界',
            category: 'tech',
            thumbnail: 'linear-gradient(135deg, #1b1b2f 0%, #162447 50%, #e43f5a 100%)',
            width: 1080,
            height: 1920,
            background: {
                color: '#1b1b2f',
                useGradient: true,
                gradientStart: '#1b1b2f',
                gradientEnd: '#162447',
                gradientDirection: 'to-bottom'
            },
            elements: [
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 340,
                    y: 600,
                    width: 400,
                    height: 400,
                    fill: 'transparent',
                    stroke: '#e43f5a',
                    strokeWidth: 2
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 440,
                    y: 700,
                    width: 200,
                    height: 200,
                    fill: 'rgba(228,63,90,0.1)',
                    stroke: 'rgba(228,63,90,0.5)',
                    strokeWidth: 1
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 530,
                    y: 600,
                    width: 2,
                    height: 100,
                    fill: '#e43f5a'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 548,
                    y: 600,
                    width: 2,
                    height: 100,
                    fill: '#e43f5a'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 530,
                    y: 900,
                    width: 2,
                    height: 100,
                    fill: '#e43f5a'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 548,
                    y: 900,
                    width: 2,
                    height: 100,
                    fill: '#e43f5a'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 340,
                    y: 790,
                    width: 100,
                    height: 2,
                    fill: '#e43f5a'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 340,
                    y: 808,
                    width: 100,
                    height: 2,
                    fill: '#e43f5a'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 640,
                    y: 790,
                    width: 100,
                    height: 2,
                    fill: '#e43f5a'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 640,
                    y: 808,
                    width: 100,
                    height: 2,
                    fill: '#e43f5a'
                },
                {
                    type: 'text',
                    text: 'CHIP',
                    x: 540,
                    y: 1100,
                    fontSize: 80,
                    fontFamily: 'Arial',
                    fontWeight: 'bold',
                    color: '#e43f5a',
                    textAlign: 'center',
                    letterSpacing: 15
                },
                {
                    type: 'text',
                    text: '芯片世界',
                    x: 540,
                    y: 1250,
                    fontSize: 56,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    textAlign: 'center'
                },
                {
                    type: 'text',
                    text: '微观之力 宏观之变',
                    x: 540,
                    y: 1400,
                    fontSize: 32,
                    fontFamily: 'Microsoft YaHei',
                    color: 'rgba(255,255,255,0.5)',
                    textAlign: 'center'
                }
            ]
        },
        // ========== 美食模板 ==========
        {
            id: 'template_026',
            name: '日式料理',
            category: 'food',
            thumbnail: 'linear-gradient(135deg, #fff1eb 0%, #ace0f9 100%)',
            width: 1080,
            height: 1920,
            background: {
                color: '#fff1eb',
                useGradient: true,
                gradientStart: '#fff1eb',
                gradientEnd: '#e8f4f8',
                gradientDirection: 'to-bottom'
            },
            elements: [
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 80,
                    y: 500,
                    width: 920,
                    height: 600,
                    fill: 'rgba(255,255,255,0.6)',
                    borderRadius: 24
                },
                {
                    type: 'text',
                    text: '和食',
                    x: 540,
                    y: 650,
                    fontSize: 100,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#c0392b',
                    textAlign: 'center'
                },
                {
                    type: 'text',
                    text: 'JAPANESE CUISINE',
                    x: 540,
                    y: 790,
                    fontSize: 28,
                    fontFamily: 'Arial',
                    color: '#e74c3c',
                    textAlign: 'center',
                    letterSpacing: 6
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 440,
                    y: 860,
                    width: 200,
                    height: 3,
                    fill: '#c0392b'
                },
                {
                    type: 'text',
                    text: '匠心之作 · 味蕾之享',
                    x: 540,
                    y: 1250,
                    fontSize: 36,
                    fontFamily: 'Microsoft YaHei',
                    color: '#7f8c8d',
                    textAlign: 'center'
                },
                {
                    type: 'shape',
                    shapeType: 'circle',
                    x: 900,
                    y: 100,
                    width: 200,
                    height: 200,
                    fill: 'rgba(192,57,43,0.06)'
                },
                {
                    type: 'shape',
                    shapeType: 'circle',
                    x: -40,
                    y: 1600,
                    width: 160,
                    height: 160,
                    fill: 'rgba(172,224,249,0.15)'
                }
            ]
        },
        {
            id: 'template_027',
            name: '甜品诱惑',
            category: 'food',
            thumbnail: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fdfcfb 100%)',
            width: 1080,
            height: 1920,
            background: {
                color: '#fdf2f2',
                useGradient: true,
                gradientStart: '#ff9a9e',
                gradientEnd: '#fecfef',
                gradientDirection: 'to-bottom'
            },
            elements: [
                {
                    type: 'shape',
                    shapeType: 'circle',
                    x: 780,
                    y: 50,
                    width: 350,
                    height: 350,
                    fill: 'rgba(255,255,255,0.3)'
                },
                {
                    type: 'shape',
                    shapeType: 'circle',
                    x: -100,
                    y: 1500,
                    width: 300,
                    height: 300,
                    fill: 'rgba(255,255,255,0.2)'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 140,
                    y: 550,
                    width: 800,
                    height: 500,
                    fill: 'rgba(255,255,255,0.85)',
                    borderRadius: 30,
                    rotation: -2
                },
                {
                    type: 'text',
                    text: 'Sweet',
                    x: 540,
                    y: 680,
                    fontSize: 90,
                    fontFamily: 'Arial',
                    fontWeight: 'bold',
                    color: '#e91e63',
                    textAlign: 'center',
                    rotation: -2
                },
                {
                    type: 'text',
                    text: '甜品诱惑',
                    x: 540,
                    y: 830,
                    fontSize: 48,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#c2185b',
                    textAlign: 'center',
                    rotation: -2
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 440,
                    y: 1200,
                    width: 200,
                    height: 60,
                    fill: '#e91e63',
                    borderRadius: 30
                },
                {
                    type: 'text',
                    text: '品尝甜蜜',
                    x: 540,
                    y: 1240,
                    fontSize: 26,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    textAlign: 'center'
                }
            ]
        },
        {
            id: 'template_028',
            name: '咖啡时光',
            category: 'food',
            thumbnail: 'linear-gradient(135deg, #3e2723 0%, #795548 50%, #d7ccc8 100%)',
            width: 1080,
            height: 1920,
            background: {
                color: '#3e2723',
                useGradient: true,
                gradientStart: '#3e2723',
                gradientEnd: '#5d4037',
                gradientDirection: 'to-bottom'
            },
            elements: [
                {
                    type: 'shape',
                    shapeType: 'circle',
                    x: 340,
                    y: 450,
                    width: 400,
                    height: 400,
                    fill: 'rgba(121,85,72,0.2)'
                },
                {
                    type: 'text',
                    text: 'COFFEE',
                    x: 540,
                    y: 580,
                    fontSize: 80,
                    fontFamily: 'Arial',
                    fontWeight: 'bold',
                    color: '#d7ccc8',
                    textAlign: 'center',
                    letterSpacing: 12
                },
                {
                    type: 'text',
                    text: '咖啡时光',
                    x: 540,
                    y: 780,
                    fontSize: 72,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#efebe9',
                    textAlign: 'center'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 340,
                    y: 920,
                    width: 400,
                    height: 3,
                    fill: 'rgba(215,204,200,0.3)'
                },
                {
                    type: 'text',
                    text: '一杯好咖啡\n一段好时光',
                    x: 540,
                    y: 1050,
                    fontSize: 36,
                    fontFamily: 'Microsoft YaHei',
                    color: 'rgba(215,204,200,0.7)',
                    textAlign: 'center'
                },
                {
                    type: 'shape',
                    shapeType: 'circle',
                    x: -50,
                    y: 1500,
                    width: 250,
                    height: 250,
                    fill: 'rgba(121,85,72,0.15)'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 390,
                    y: 1400,
                    width: 300,
                    height: 60,
                    fill: 'transparent',
                    stroke: '#d7ccc8',
                    strokeWidth: 2,
                    borderRadius: 30
                },
                {
                    type: 'text',
                    text: '来一杯 →',
                    x: 540,
                    y: 1435,
                    fontSize: 26,
                    fontFamily: 'Microsoft YaHei',
                    color: '#d7ccc8',
                    textAlign: 'center'
                }
            ]
        },
        {
            id: 'template_029',
            name: '烧烤派对',
            category: 'food',
            thumbnail: 'linear-gradient(135deg, #c0392b 0%, #e74c3c 50%, #f39c12 100%)',
            width: 1080,
            height: 1920,
            background: {
                color: '#1a0a00',
                useGradient: true,
                gradientStart: '#c0392b',
                gradientEnd: '#e74c3c',
                gradientDirection: 'to-br'
            },
            elements: [
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 0,
                    y: 1700,
                    width: 1080,
                    height: 220,
                    fill: 'rgba(0,0,0,0.3)'
                },
                {
                    type: 'shape',
                    shapeType: 'circle',
                    x: 820,
                    y: 100,
                    width: 350,
                    height: 350,
                    fill: 'rgba(243,156,18,0.15)'
                },
                {
                    type: 'shape',
                    shapeType: 'circle',
                    x: -80,
                    y: 1300,
                    width: 280,
                    height: 280,
                    fill: 'rgba(243,156,18,0.1)'
                },
                {
                    type: 'text',
                    text: 'BBQ',
                    x: 540,
                    y: 600,
                    fontSize: 160,
                    fontFamily: 'Arial',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    textAlign: 'center',
                    textShadow: '4px 4px 0 rgba(0,0,0,0.2)'
                },
                {
                    type: 'text',
                    text: '烧烤派对',
                    x: 540,
                    y: 850,
                    fontSize: 64,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#f39c12',
                    textAlign: 'center'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 340,
                    y: 1000,
                    width: 400,
                    height: 3,
                    fill: 'rgba(243,156,18,0.5)'
                },
                {
                    type: 'text',
                    text: '火辣滋味 · 热情狂欢',
                    x: 540,
                    y: 1150,
                    fontSize: 36,
                    fontFamily: 'Microsoft YaHei',
                    color: 'rgba(255,255,255,0.8)',
                    textAlign: 'center'
                }
            ]
        },
        {
            id: 'template_030',
            name: '有机轻食',
            category: 'food',
            thumbnail: 'linear-gradient(135deg, #a8e063 0%, #56ab2f 100%)',
            width: 1080,
            height: 1920,
            background: {
                color: '#f1f8e9',
                useGradient: true,
                gradientStart: '#a8e063',
                gradientEnd: '#56ab2f',
                gradientDirection: 'to-br'
            },
            elements: [
                {
                    type: 'shape',
                    shapeType: 'circle',
                    x: -80,
                    y: -80,
                    width: 300,
                    height: 300,
                    fill: 'rgba(255,255,255,0.2)'
                },
                {
                    type: 'shape',
                    shapeType: 'circle',
                    x: 800,
                    y: 1600,
                    width: 350,
                    height: 350,
                    fill: 'rgba(255,255,255,0.12)'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 190,
                    y: 550,
                    width: 700,
                    height: 500,
                    fill: 'rgba(255,255,255,0.85)',
                    borderRadius: 24
                },
                {
                    type: 'text',
                    text: '有机轻食',
                    x: 540,
                    y: 700,
                    fontSize: 72,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#2e7d32',
                    textAlign: 'center'
                },
                {
                    type: 'text',
                    text: 'ORGANIC & LIGHT',
                    x: 540,
                    y: 820,
                    fontSize: 26,
                    fontFamily: 'Arial',
                    color: '#4caf50',
                    textAlign: 'center',
                    letterSpacing: 6
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 440,
                    y: 880,
                    width: 200,
                    height: 3,
                    fill: '#4caf50'
                },
                {
                    type: 'text',
                    text: '健康从每一口开始',
                    x: 540,
                    y: 1250,
                    fontSize: 36,
                    fontFamily: 'Microsoft YaHei',
                    color: '#1b5e20',
                    textAlign: 'center'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 390,
                    y: 1450,
                    width: 300,
                    height: 60,
                    fill: '#2e7d32',
                    borderRadius: 30
                },
                {
                    type: 'text',
                    text: '查看菜单',
                    x: 540,
                    y: 1490,
                    fontSize: 26,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    textAlign: 'center'
                }
            ]
        },
        // ========== 旅行模板 ==========
        {
            id: 'template_031',
            name: '公路旅行',
            category: 'travel',
            thumbnail: 'linear-gradient(135deg, #ff8008 0%, #ffc837 100%)',
            width: 1080,
            height: 1920,
            background: {
                color: '#1a0e00',
                useGradient: true,
                gradientStart: '#ff8008',
                gradientEnd: '#ffc837',
                gradientDirection: 'to-bottom'
            },
            elements: [
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 0,
                    y: 1700,
                    width: 1080,
                    height: 220,
                    fill: 'rgba(0,0,0,0.25)'
                },
                {
                    type: 'shape',
                    shapeType: 'circle',
                    x: 780,
                    y: 100,
                    width: 350,
                    height: 350,
                    fill: 'rgba(255,255,255,0.08)'
                },
                {
                    type: 'text',
                    text: 'ROAD',
                    x: 540,
                    y: 550,
                    fontSize: 120,
                    fontFamily: 'Arial',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    textAlign: 'center',
                    letterSpacing: 15
                },
                {
                    type: 'text',
                    text: 'TRIP',
                    x: 540,
                    y: 700,
                    fontSize: 120,
                    fontFamily: 'Arial',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    textAlign: 'center',
                    letterSpacing: 15
                },
                {
                    type: 'text',
                    text: '公路旅行',
                    x: 540,
                    y: 900,
                    fontSize: 56,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#1a0e00',
                    textAlign: 'center'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 340,
                    y: 1030,
                    width: 400,
                    height: 3,
                    fill: 'rgba(255,255,255,0.5)'
                },
                {
                    type: 'text',
                    text: '在路上遇见更好的自己',
                    x: 540,
                    y: 1150,
                    fontSize: 36,
                    fontFamily: 'Microsoft YaHei',
                    color: 'rgba(255,255,255,0.9)',
                    textAlign: 'center'
                }
            ]
        },
        {
            id: 'template_032',
            name: '海岛度假',
            category: 'travel',
            thumbnail: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)',
            width: 1080,
            height: 1920,
            background: {
                color: '#001833',
                useGradient: true,
                gradientStart: '#00c6ff',
                gradientEnd: '#0072ff',
                gradientDirection: 'to-bottom'
            },
            elements: [
                {
                    type: 'shape',
                    shapeType: 'circle',
                    x: -100,
                    y: 1400,
                    width: 500,
                    height: 500,
                    fill: 'rgba(255,255,255,0.05)'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 0,
                    y: 1700,
                    width: 1080,
                    height: 220,
                    fill: 'rgba(0,0,0,0.2)'
                },
                {
                    type: 'text',
                    text: 'ISLAND',
                    x: 540,
                    y: 500,
                    fontSize: 110,
                    fontFamily: 'Arial',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    textAlign: 'center',
                    letterSpacing: 15
                },
                {
                    type: 'text',
                    text: '海岛度假',
                    x: 540,
                    y: 700,
                    fontSize: 72,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    textAlign: 'center'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 340,
                    y: 850,
                    width: 400,
                    height: 3,
                    fill: 'rgba(255,255,255,0.4)'
                },
                {
                    type: 'text',
                    text: '阳光 · 沙滩 · 海浪',
                    x: 540,
                    y: 1000,
                    fontSize: 40,
                    fontFamily: 'Microsoft YaHei',
                    color: 'rgba(255,255,255,0.8)',
                    textAlign: 'center',
                    letterSpacing: 4
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 390,
                    y: 1400,
                    width: 300,
                    height: 70,
                    fill: 'rgba(255,255,255,0.2)',
                    borderRadius: 35
                },
                {
                    type: 'text',
                    text: '立即出发',
                    x: 540,
                    y: 1448,
                    fontSize: 28,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    textAlign: 'center'
                }
            ]
        },
        {
            id: 'template_033',
            name: '古都漫步',
            category: 'travel',
            thumbnail: 'linear-gradient(135deg, #544a7d 0%, #ffd452 100%)',
            width: 1080,
            height: 1920,
            background: {
                color: '#2d2444',
                useGradient: true,
                gradientStart: '#544a7d',
                gradientEnd: '#3d3456',
                gradientDirection: 'to-bottom'
            },
            elements: [
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 140,
                    y: 450,
                    width: 800,
                    height: 550,
                    fill: 'rgba(255,255,255,0.06)',
                    borderRadius: 16
                },
                {
                    type: 'text',
                    text: '古都漫步',
                    x: 540,
                    y: 580,
                    fontSize: 80,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#ffd452',
                    textAlign: 'center'
                },
                {
                    type: 'text',
                    text: 'ANCIENT CAPITAL',
                    x: 540,
                    y: 710,
                    fontSize: 28,
                    fontFamily: 'Arial',
                    color: 'rgba(255,212,82,0.7)',
                    textAlign: 'center',
                    letterSpacing: 8
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 440,
                    y: 780,
                    width: 200,
                    height: 3,
                    fill: 'rgba(255,212,82,0.4)'
                },
                {
                    type: 'text',
                    text: '千年古韵\n一步一景',
                    x: 540,
                    y: 1150,
                    fontSize: 40,
                    fontFamily: 'Microsoft YaHei',
                    color: 'rgba(255,255,255,0.7)',
                    textAlign: 'center'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 340,
                    y: 1500,
                    width: 400,
                    height: 70,
                    fill: '#ffd452',
                    borderRadius: 35
                },
                {
                    type: 'text',
                    text: '探索古都',
                    x: 540,
                    y: 1548,
                    fontSize: 28,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#2d2444',
                    textAlign: 'center'
                }
            ]
        },
        {
            id: 'template_034',
            name: '雪山远征',
            category: 'travel',
            thumbnail: 'linear-gradient(135deg, #e6dada 0%, #274046 100%)',
            width: 1080,
            height: 1920,
            background: {
                color: '#1a2a30',
                useGradient: true,
                gradientStart: '#274046',
                gradientEnd: '#1a2a30',
                gradientDirection: 'to-bottom'
            },
            elements: [
                {
                    type: 'shape',
                    shapeType: 'triangle',
                    x: 290,
                    y: 300,
                    width: 500,
                    height: 500,
                    fill: 'rgba(255,255,255,0.04)'
                },
                {
                    type: 'text',
                    text: 'SUMMIT',
                    x: 540,
                    y: 600,
                    fontSize: 90,
                    fontFamily: 'Arial',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    textAlign: 'center',
                    letterSpacing: 20,
                    textShadow: '0 0 20px rgba(255,255,255,0.2)'
                },
                {
                    type: 'text',
                    text: '雪山远征',
                    x: 540,
                    y: 800,
                    fontSize: 64,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#e6dada',
                    textAlign: 'center'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 340,
                    y: 940,
                    width: 400,
                    height: 2,
                    fill: 'rgba(255,255,255,0.2)'
                },
                {
                    type: 'text',
                    text: '征服每一座巅峰\n挑战每一个极限',
                    x: 540,
                    y: 1080,
                    fontSize: 36,
                    fontFamily: 'Microsoft YaHei',
                    color: 'rgba(255,255,255,0.5)',
                    textAlign: 'center'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 390,
                    y: 1500,
                    width: 300,
                    height: 60,
                    fill: 'rgba(255,255,255,0.15)',
                    stroke: 'rgba(255,255,255,0.4)',
                    strokeWidth: 1,
                    borderRadius: 30
                },
                {
                    type: 'text',
                    text: '开启征途',
                    x: 540,
                    y: 1535,
                    fontSize: 26,
                    fontFamily: 'Microsoft YaHei',
                    color: '#e6dada',
                    textAlign: 'center'
                }
            ]
        },
        {
            id: 'template_035',
            name: '星空露营',
            category: 'travel',
            thumbnail: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
            width: 1080,
            height: 1920,
            background: {
                color: '#0f0c29',
                useGradient: true,
                gradientStart: '#0f0c29',
                gradientEnd: '#302b63',
                gradientDirection: 'to-bottom'
            },
            elements: [
                {
                    type: 'shape',
                    shapeType: 'circle',
                    x: 150,
                    y: 120,
                    width: 6,
                    height: 6,
                    fill: '#ffffff'
                },
                {
                    type: 'shape',
                    shapeType: 'circle',
                    x: 400,
                    y: 80,
                    width: 4,
                    height: 4,
                    fill: 'rgba(255,255,255,0.7)'
                },
                {
                    type: 'shape',
                    shapeType: 'circle',
                    x: 700,
                    y: 200,
                    width: 5,
                    height: 5,
                    fill: 'rgba(255,255,255,0.6)'
                },
                {
                    type: 'shape',
                    shapeType: 'circle',
                    x: 900,
                    y: 100,
                    width: 3,
                    height: 3,
                    fill: 'rgba(255,255,255,0.5)'
                },
                {
                    type: 'shape',
                    shapeType: 'circle',
                    x: 550,
                    y: 160,
                    width: 4,
                    height: 4,
                    fill: 'rgba(255,255,255,0.8)'
                },
                {
                    type: 'shape',
                    shapeType: 'circle',
                    x: 820,
                    y: 300,
                    width: 3,
                    height: 3,
                    fill: 'rgba(255,255,255,0.4)'
                },
                {
                    type: 'text',
                    text: '星空露营',
                    x: 540,
                    y: 700,
                    fontSize: 80,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    textAlign: 'center',
                    textShadow: '0 0 30px rgba(79,70,229,0.5)'
                },
                {
                    type: 'text',
                    text: 'STARRY CAMPING',
                    x: 540,
                    y: 850,
                    fontSize: 30,
                    fontFamily: 'Arial',
                    color: '#818cf8',
                    textAlign: 'center',
                    letterSpacing: 8
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 340,
                    y: 960,
                    width: 400,
                    height: 2,
                    fill: 'rgba(129,140,248,0.3)'
                },
                {
                    type: 'text',
                    text: '与星空为伴\n与自然共眠',
                    x: 540,
                    y: 1100,
                    fontSize: 36,
                    fontFamily: 'Microsoft YaHei',
                    color: 'rgba(255,255,255,0.6)',
                    textAlign: 'center'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 390,
                    y: 1500,
                    width: 300,
                    height: 60,
                    fill: 'rgba(79,70,229,0.3)',
                    stroke: '#818cf8',
                    strokeWidth: 1,
                    borderRadius: 30
                },
                {
                    type: 'text',
                    text: '预约营地',
                    x: 540,
                    y: 1535,
                    fontSize: 26,
                    fontFamily: 'Microsoft YaHei',
                    color: '#818cf8',
                    textAlign: 'center'
                }
            ]
        },
        // ========== 时尚模板 ==========
        {
            id: 'template_036',
            name: '高定时装',
            category: 'fashion',
            thumbnail: 'linear-gradient(135deg, #0c0c0c 0%, #e2b9ff 100%)',
            width: 1080,
            height: 1920,
            background: {
                color: '#0c0c0c',
                useGradient: false
            },
            elements: [
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 0,
                    y: 0,
                    width: 1080,
                    height: 6,
                    fill: '#e2b9ff'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 0,
                    y: 1914,
                    width: 1080,
                    height: 6,
                    fill: '#e2b9ff'
                },
                {
                    type: 'text',
                    text: 'HAUTE',
                    x: 540,
                    y: 600,
                    fontSize: 100,
                    fontFamily: 'Arial',
                    fontWeight: 'bold',
                    color: '#e2b9ff',
                    textAlign: 'center',
                    letterSpacing: 20
                },
                {
                    type: 'text',
                    text: 'COUTURE',
                    x: 540,
                    y: 740,
                    fontSize: 100,
                    fontFamily: 'Arial',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    textAlign: 'center',
                    letterSpacing: 20
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 340,
                    y: 900,
                    width: 400,
                    height: 2,
                    fill: 'rgba(226,185,255,0.4)'
                },
                {
                    type: 'text',
                    text: '高定时装',
                    x: 540,
                    y: 1020,
                    fontSize: 56,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    textAlign: 'center'
                },
                {
                    type: 'text',
                    text: '优雅永不过时',
                    x: 540,
                    y: 1150,
                    fontSize: 32,
                    fontFamily: 'Microsoft YaHei',
                    color: 'rgba(226,185,255,0.7)',
                    textAlign: 'center'
                }
            ]
        },
        {
            id: 'template_037',
            name: '街头潮流',
            category: 'fashion',
            thumbnail: 'linear-gradient(135deg, #fc466b 0%, #3f5efb 100%)',
            width: 1080,
            height: 1920,
            background: {
                color: '#1a1a2e',
                useGradient: true,
                gradientStart: '#fc466b',
                gradientEnd: '#3f5efb',
                gradientDirection: 'to-br'
            },
            elements: [
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 80,
                    y: 500,
                    width: 920,
                    height: 500,
                    fill: 'rgba(0,0,0,0.3)',
                    rotation: -3
                },
                {
                    type: 'text',
                    text: 'STREET',
                    x: 540,
                    y: 580,
                    fontSize: 120,
                    fontFamily: 'Arial',
                    fontWeight: 'bold',
                    color: '#fc466b',
                    textAlign: 'center',
                    letterSpacing: 15,
                    rotation: -3,
                    textShadow: '3px 3px 0 rgba(0,0,0,0.3)'
                },
                {
                    type: 'text',
                    text: 'WEAR',
                    x: 540,
                    y: 730,
                    fontSize: 120,
                    fontFamily: 'Arial',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    textAlign: 'center',
                    letterSpacing: 15,
                    rotation: -3
                },
                {
                    type: 'text',
                    text: '街头潮流',
                    x: 540,
                    y: 1150,
                    fontSize: 56,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    textAlign: 'center'
                },
                {
                    type: 'text',
                    text: '不做追随者 只做引领者',
                    x: 540,
                    y: 1300,
                    fontSize: 32,
                    fontFamily: 'Microsoft YaHei',
                    color: 'rgba(255,255,255,0.6)',
                    textAlign: 'center'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 390,
                    y: 1500,
                    width: 300,
                    height: 60,
                    fill: '#fc466b',
                    borderRadius: 4
                },
                {
                    type: 'text',
                    text: '探索系列',
                    x: 540,
                    y: 1538,
                    fontSize: 26,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    textAlign: 'center'
                }
            ]
        },
        {
            id: 'template_038',
            name: '极简风格',
            category: 'fashion',
            thumbnail: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 50%, #e0e0e0 100%)',
            width: 1080,
            height: 1920,
            background: {
                color: '#ffffff',
                useGradient: false
            },
            elements: [
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 0,
                    y: 0,
                    width: 6,
                    height: 1920,
                    fill: '#1a1a1a'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 0,
                    y: 1890,
                    width: 1080,
                    height: 30,
                    fill: '#1a1a1a'
                },
                {
                    type: 'text',
                    text: 'MINIMAL',
                    x: 540,
                    y: 600,
                    fontSize: 80,
                    fontFamily: 'Arial',
                    fontWeight: 'bold',
                    color: '#1a1a1a',
                    textAlign: 'center',
                    letterSpacing: 20
                },
                {
                    type: 'text',
                    text: '极简风格',
                    x: 540,
                    y: 760,
                    fontSize: 64,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#1a1a1a',
                    textAlign: 'center'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 340,
                    y: 890,
                    width: 400,
                    height: 2,
                    fill: '#cccccc'
                },
                {
                    type: 'text',
                    text: '简约即是极致的复杂',
                    x: 540,
                    y: 1000,
                    fontSize: 32,
                    fontFamily: 'Microsoft YaHei',
                    color: '#999999',
                    textAlign: 'center'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 340,
                    y: 1200,
                    width: 400,
                    height: 70,
                    fill: '#1a1a1a',
                    borderRadius: 4
                },
                {
                    type: 'text',
                    text: '浏览系列',
                    x: 540,
                    y: 1248,
                    fontSize: 28,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    textAlign: 'center'
                }
            ]
        },
        {
            id: 'template_039',
            name: '复古风潮',
            category: 'fashion',
            thumbnail: 'linear-gradient(135deg, #8e2de2 0%, #4a00e0 50%, #c8a2c8 100%)',
            width: 1080,
            height: 1920,
            background: {
                color: '#1a0033',
                useGradient: true,
                gradientStart: '#2d004d',
                gradientEnd: '#1a0033',
                gradientDirection: 'to-bottom'
            },
            elements: [
                {
                    type: 'shape',
                    shapeType: 'circle',
                    x: 340,
                    y: 400,
                    width: 400,
                    height: 400,
                    fill: 'transparent',
                    stroke: 'rgba(200,162,200,0.2)',
                    strokeWidth: 1
                },
                {
                    type: 'shape',
                    shapeType: 'circle',
                    x: 440,
                    y: 500,
                    width: 200,
                    height: 200,
                    fill: 'transparent',
                    stroke: 'rgba(200,162,200,0.15)',
                    strokeWidth: 1
                },
                {
                    type: 'text',
                    text: 'RETRO',
                    x: 540,
                    y: 650,
                    fontSize: 110,
                    fontFamily: 'Arial',
                    fontWeight: 'bold',
                    color: '#c8a2c8',
                    textAlign: 'center',
                    letterSpacing: 15,
                    textShadow: '0 0 20px rgba(200,162,200,0.3)'
                },
                {
                    type: 'text',
                    text: '复古风潮',
                    x: 540,
                    y: 860,
                    fontSize: 64,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    textAlign: 'center'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 340,
                    y: 1000,
                    width: 400,
                    height: 2,
                    fill: 'rgba(200,162,200,0.3)'
                },
                {
                    type: 'text',
                    text: '经典永流传\n复古亦时髦',
                    x: 540,
                    y: 1150,
                    fontSize: 36,
                    fontFamily: 'Microsoft YaHei',
                    color: 'rgba(255,255,255,0.6)',
                    textAlign: 'center'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 390,
                    y: 1500,
                    width: 300,
                    height: 60,
                    fill: 'rgba(200,162,200,0.2)',
                    stroke: '#c8a2c8',
                    strokeWidth: 1,
                    borderRadius: 30
                },
                {
                    type: 'text',
                    text: '查看详情',
                    x: 540,
                    y: 1535,
                    fontSize: 26,
                    fontFamily: 'Microsoft YaHei',
                    color: '#c8a2c8',
                    textAlign: 'center'
                }
            ]
        },
        {
            id: 'template_040',
            name: '春日花语',
            category: 'fashion',
            thumbnail: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 50%, #ff9a9e 100%)',
            width: 1080,
            height: 1920,
            background: {
                color: '#fff5ee',
                useGradient: true,
                gradientStart: '#ffecd2',
                gradientEnd: '#fcb69f',
                gradientDirection: 'to-bottom'
            },
            elements: [
                {
                    type: 'shape',
                    shapeType: 'circle',
                    x: -60,
                    y: -60,
                    width: 250,
                    height: 250,
                    fill: 'rgba(255,154,158,0.15)'
                },
                {
                    type: 'shape',
                    shapeType: 'circle',
                    x: 850,
                    y: 1650,
                    width: 300,
                    height: 300,
                    fill: 'rgba(252,182,159,0.12)'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 140,
                    y: 550,
                    width: 800,
                    height: 550,
                    fill: 'rgba(255,255,255,0.7)',
                    borderRadius: 24
                },
                {
                    type: 'text',
                    text: '春日花语',
                    x: 540,
                    y: 700,
                    fontSize: 72,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#c2185b',
                    textAlign: 'center'
                },
                {
                    type: 'text',
                    text: 'SPRING BLOOM',
                    x: 540,
                    y: 830,
                    fontSize: 28,
                    fontFamily: 'Arial',
                    color: '#e91e63',
                    textAlign: 'center',
                    letterSpacing: 8
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 440,
                    y: 900,
                    width: 200,
                    height: 3,
                    fill: '#f48fb1'
                },
                {
                    type: 'text',
                    text: '绽放你的春日风采',
                    x: 540,
                    y: 1250,
                    fontSize: 36,
                    fontFamily: 'Microsoft YaHei',
                    color: '#880e4f',
                    textAlign: 'center'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 390,
                    y: 1450,
                    width: 300,
                    height: 60,
                    fill: '#c2185b',
                    borderRadius: 30
                },
                {
                    type: 'text',
                    text: '查看系列',
                    x: 540,
                    y: 1490,
                    fontSize: 26,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    textAlign: 'center'
                }
            ]
        },
        {
            id: 'template_041',
            name: '都市丽人',
            category: 'fashion',
            thumbnail: 'linear-gradient(135deg, #2c3e50 0%, #fd746c 100%)',
            width: 1080,
            height: 1920,
            background: {
                color: '#2c3e50',
                useGradient: true,
                gradientStart: '#2c3e50',
                gradientEnd: '#34495e',
                gradientDirection: 'to-bottom'
            },
            elements: [
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 0,
                    y: 0,
                    width: 1080,
                    height: 500,
                    fill: 'rgba(253,116,108,0.1)'
                },
                {
                    type: 'text',
                    text: 'URBAN',
                    x: 540,
                    y: 250,
                    fontSize: 100,
                    fontFamily: 'Arial',
                    fontWeight: 'bold',
                    color: '#fd746c',
                    textAlign: 'center',
                    letterSpacing: 20
                },
                {
                    type: 'text',
                    text: 'CHIC',
                    x: 540,
                    y: 400,
                    fontSize: 80,
                    fontFamily: 'Arial',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    textAlign: 'center',
                    letterSpacing: 15
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 340,
                    y: 700,
                    width: 400,
                    height: 2,
                    fill: 'rgba(253,116,108,0.4)'
                },
                {
                    type: 'text',
                    text: '都市丽人',
                    x: 540,
                    y: 850,
                    fontSize: 64,
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    textAlign: 'center'
                },
                {
                    type: 'text',
                    text: '自信优雅 从容不迫',
                    x: 540,
                    y: 1000,
                    fontSize: 32,
                    fontFamily: 'Microsoft YaHei',
                    color: 'rgba(255,255,255,0.6)',
                    textAlign: 'center'
                },
                {
                    type: 'shape',
                    shapeType: 'rectangle',
                    x: 390,
                    y: 1400,
                    width: 300,
                    height: 60,
                    fill: '#fd746c',
                    borderRadius: 4
                },
                {
                    type: 'text',
                    text: '探索风格',
                    x: 540,
                    y: 1438,
                    fontSize: 26,
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
