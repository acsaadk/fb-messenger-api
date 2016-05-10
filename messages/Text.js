const Message = require('./Message');
const util = require('util');

function Text(recipient, notificationType) {
  Message.call(this, recipient, notificationType);
  this._text = '';
}

util.inherits(Text, Message);

Text.prototype.setMessage = function(txt) {
  this._text = (txt || '').toString();
};

Text.prototype.content = function() {
  return { text: this._text };
};

module.exports = Text;
