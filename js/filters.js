// 滤镜管理器 - 处理图片滤镜和特效
class FilterManager {
    static FILTERS = {
        brightness: { name: '亮度', min: 0, max: 200, default: 100, unit: '%' },
        contrast: { name: '对比度', min: 0, max: 200, default: 100, unit: '%' },
        saturate: { name: '饱和度', min: 0, max: 200, default: 100, unit: '%' },
        grayscale: { name: '灰度', min: 0, max: 100, default: 0, unit: '%' },
        sepia: { name: '复古', min: 0, max: 100, default: 0, unit: '%' },
        hueRotate: { name: '色相旋转', min: 0, max: 360, default: 0, unit: 'deg' },
        invert: { name: '反色', min: 0, max: 100, default: 0, unit: '%' },
        blur: { name: '模糊', min: 0, max: 20, default: 0, unit: 'px' },
        opacity: { name: '不透明度', min: 0, max: 100, default: 100, unit: '%' }
    };

    // 将滤镜对象转换为 CSS filter 字符串
    static toCSSString(filters) {
        if (!filters || Object.keys(filters).length === 0) {
            return '';
        }

        const parts = [];
        for (const [key, value] of Object.entries(filters)) {
            const config = this.FILTERS[key];
            if (!config) continue;

            // 如果值是默认值，跳过
            if (value === config.default) continue;

            // 特殊处理一些滤镜名称
            let cssName = key;
            if (key === 'hueRotate') cssName = 'hue-rotate';
            else if (key === 'saturate') cssName = 'saturate';

            parts.push(`${cssName}(${value}${config.unit})`);
        }

        return parts.join(' ');
    }

    // 重置滤镜为默认值
    static getDefaultFilters() {
        const defaults = {};
        for (const [key, config] of Object.entries(this.FILTERS)) {
            defaults[key] = config.default;
        }
        return defaults;
    }

    // 创建滤镜预设
    static PRESETS = {
        normal: { name: '正常', filters: {} },
        grayscale: { name: '黑白', filters: { grayscale: 100 } },
        sepia: { name: '复古', filters: { sepia: 100 } },
        vintage: { name: '怀旧', filters: { sepia: 50, contrast: 120, saturate: 80 } },
        cold: { name: '冷色调', filters: { hueRotate: 180, saturate: 50 } },
        warm: { name: '暖色调', filters: { hueRotate: 30, saturate: 120 } },
        highContrast: { name: '高对比', filters: { contrast: 150 } },
        lowContrast: { name: '低对比', filters: { contrast: 50 } },
        bright: { name: '明亮', filters: { brightness: 120 } },
        dark: { name: '昏暗', filters: { brightness: 70 } },
        blur: { name: '模糊', filters: { blur: 5 } },
        sharpen: { name: '锐化', filters: { contrast: 150, saturate: 120 } },
        invert: { name: '反色', filters: { invert: 100 } }
    };
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FilterManager;
}
