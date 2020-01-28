const Consumer = require('../Consumer');

class Fake extends Consumer {
    constructor(config) {
        super(config);
    }

    async consume () {
        console.log('this is a fake consumer');
    }
}

module.exports = Fake;
