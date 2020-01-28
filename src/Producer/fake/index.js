const Producer = require('../Producer');

class Fake extends Producer {
    constructor (config) {
        super(config);
    }

    async publish (payload) {
        console.log('this is a fake publish');
    }
}

module.exports = Fake;
