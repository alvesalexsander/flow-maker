const shortid = require('shortid');
const valueDefault = require('../../integrityRequirements/valueDefault');

const ChartEntity = require('../common/ChartEntity.class');

class Flow extends ChartEntity{

    constructor() {
        super();
        this.type = this.constructor.name;
        this.set('id', shortid.generate());
    }
}