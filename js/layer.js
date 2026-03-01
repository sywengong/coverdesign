class Layer {
    constructor(data = {}) {
        this.id = data.id || Utils.generateId();
        this.name = data.name || '图层';
        this.type = data.type || 'unknown';
        this.visible = data.visible !== undefined ? data.visible : true;
        this.locked = data.locked || false;
        this.data = data.data || {};
        this.order = data.order || 0;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            type: this.type,
            visible: this.visible,
            locked: this.locked,
            data: this.data,
            order: this.order
        };
    }
}

class LayerManager {
    constructor() {
        this.layers = [];
        this.selectedLayerId = null;
        this.maxOrder = 0;
        this.onChangeCallbacks = [];
    }

    addLayer(layer) {
        this.maxOrder++;
        layer.order = this.maxOrder;
        this.layers.push(layer);
        this.triggerOnChange('add', layer);
        return layer;
    }

    removeLayer(layerId) {
        const index = this.layers.findIndex(l => l.id === layerId);
        if (index !== -1) {
            const removed = this.layers.splice(index, 1)[0];
            this.triggerOnChange('remove', removed);
            if (this.selectedLayerId === layerId) {
                this.selectedLayerId = null;
            }
            return true;
        }
        return false;
    }

    selectLayer(layerId) {
        if (layerId === null || layerId === undefined) {
            this.selectedLayerId = null;
            return null;
        }
        const layer = this.layers.find(l => l.id === layerId);
        if (layer) {
            this.selectedLayerId = layerId;
            this.triggerOnChange('select', layer);
            return layer;
        }
        return null;
    }

    getSelectedLayer() {
        return this.layers.find(l => l.id === this.selectedLayerId);
    }

    moveLayer(layerId, direction) {
        const index = this.layers.findIndex(l => l.id === layerId);
        if (index === -1) return false;
        
        let newIndex;
        if (direction === 'up' && index < this.layers.length - 1) {
            newIndex = index + 1;
        } else if (direction === 'down' && index > 0) {
            newIndex = index - 1;
        } else {
            return false;
        }
        
        [this.layers[index], this.layers[newIndex]] = [this.layers[newIndex], this.layers[index]];
        
        this.layers[index].order = index;
        this.layers[newIndex].order = newIndex;

        this.triggerOnChange('move', this.layers[index]);
        return true;
    }

    bringToFront(layerId) {
        const layer = this.layers.find(l => l.id === layerId);
        if (!layer) return false;
        
        this.layers = this.layers.filter(l => l.id !== layerId);
        this.maxOrder++;
        layer.order = this.maxOrder;
        this.layers.push(layer);
        
        this.reorderLayers();
        this.triggerOnChange('reorder', layer);
        return true;
    }

    sendToBack(layerId) {
        const layer = this.layers.find(l => l.id === layerId);
        if (!layer) return false;
        
        this.layers = this.layers.filter(l => l.id !== layerId);
        this.layers.unshift(layer);
        
        this.reorderLayers();
        this.triggerOnChange('reorder', layer);
        return true;
    }

    reorderLayers() {
        this.layers.forEach((layer, index) => {
            layer.order = index;
        });
    }

    toggleVisibility(layerId) {
        const layer = this.layers.find(l => l.id === layerId);
        if (layer) {
            layer.visible = !layer.visible;
            this.triggerOnChange('visibility', layer);
            return layer;
        }
        return null;
    }

    toggleLock(layerId) {
        const layer = this.layers.find(l => l.id === layerId);
        if (layer) {
            layer.locked = !layer.locked;
            this.triggerOnChange('lock', layer);
            return layer;
        }
        return null;
    }

    renameLayer(layerId, newName) {
        const layer = this.layers.find(l => l.id === layerId);
        if (layer) {
            layer.name = newName;
            this.triggerOnChange('rename', layer);
            return layer;
        }
        return null;
    }

    getLayersByType(type) {
        return this.layers.filter(l => l.type === type);
    }

    getTopLayer() {
        if (this.layers.length === 0) return null;
        return this.layers.reduce((top, layer) => 
            layer.order > top.order ? layer : top, this.layers[0]);
    }

    getLayerIndex(layerId) {
        return this.layers.findIndex(l => l.id === layerId);
    }

    clear() {
        this.layers = [];
        this.selectedLayerId = null;
        this.maxOrder = 0;
        this.triggerOnChange('clear');
    }

    onChange(callback) {
        this.onChangeCallbacks.push(callback);
    }

    triggerOnChange(action, layer) {
        this.onChangeCallbacks.forEach(cb => cb(action, layer));
    }

    toJSON() {
        return {
            layers: this.layers.map(l => l.toJSON()),
            selectedLayerId: this.selectedLayerId,
            maxOrder: this.maxOrder
        };
    }

    fromJSON(data) {
        if (!data) return;
        
        this.clear();
        
        if (data.layers) {
            data.layers.forEach(layerData => {
                const layer = new Layer(layerData);
                this.layers.push(layer);
                this.maxOrder = Math.max(this.maxOrder, layer.order);
            });
        }
        
        if (data.selectedLayerId) {
            this.selectLayer(data.selectedLayerId);
        }
    }
}
