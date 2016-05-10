
function Loader() {}

Loader.prototype = {
    get Message() { return require('./messages/Message'); },
    get GenericTemplate() { return require('./messages/GenericTemplate'); },
    get ButtonTemplate() { return require('./messages/ButtonTemplate'); },
    get ReceiptTemplate() { return require('./messages/ReceiptTemplate'); },
    get Text() { return require('./messages/Text'); },
    get Image() { return require('./messages/Image'); },
    get FbPage() { return require('./FbPage'); },
    get EventEmitter() { return require('./eventEmitter'); }
};


module.exports = new Loader();
