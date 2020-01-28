class Producer {
    constructor (config) {
        if (!config) {
            throw new Error('undefined config');
        }
    }

    async publish (payload) {
        
    }
}

module.exports = Producer;
