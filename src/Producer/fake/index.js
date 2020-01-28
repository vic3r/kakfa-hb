const Producer = require('../Producer');

class Fake extends Producer {
    constructor () {
        super(config);
    }

    async publish (payload) {
        
    }
}

module.exports = Fake;
