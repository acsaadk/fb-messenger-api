const Message = require('./Message');
const util = require('util');

function Image(recipient, notificationType) {
  Message.call(this, recipient, notificationType);
  this._url = '';
}

util.inherits(Image, Message);

Image.prototype.setURL = function(url) {
  this._url = (url || '').toString();
  return this;
};

Image.prototype.content = function() {
  return {
    attachment: {
      type: 'image',
      payload: {
        url: this._url
      }
    }
  };
};

module.exports = Image;
