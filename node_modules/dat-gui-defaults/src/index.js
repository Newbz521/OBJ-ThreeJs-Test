import * as dat from 'dat.gui';

class DatGuiDefaults {
    constructor(data) {
        this.gui = new dat.GUI();
        this.data = data;
        this.params = {};
        this.defaults = {};
    }
    // override me
    initGui(gui, data, params) {
        // implementation of gui given data and params
    }
    setDefaults(defaults) {
        this.defaults = defaults;
        Object.assign(this.params, defaults);
        this.initGui(this.gui, this.data, this.params);
    }
    applyDefaults() {
        Object.assign(this.params, this.defaults);
        this.gui.updateDisplay();
    }
}

export default DatGuiDefaults;
