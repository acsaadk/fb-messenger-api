const Message = require('./Message');
const util = require('util');

function _buildWebURL(button) {
  return {
    type: ButtonTemplate.WEB_URL,
    url: button.url || 'https://developers.facebook.com/docs/messenger-platform/send-api-reference#examples',
    title: button.title || 'Button'
  };
}

function _buildPostback(button) {
  return {
    type: ButtonTemplate.POSTBACK,
    title: button.title || 'Postback',
    payload: JSON.stringify(button.payload || {})
  };
}

function ButtonTemplate(recipient, notificationType) {
  Message.call(this, recipient, notificationType);
  this._text = '';
  this._buttons = [];
}

util.inherits(ButtonTemplate, Message);

ButtonTemplate.WEB_URL = 'web_url';

ButtonTemplate.POSTBACK = 'postback';

ButtonTemplate.prototype.setText = function(txt) {
  this._text = (txt || '').toString();
  return this;
};

ButtonTemplate.prototype.addButtons = function(buttons) {
  if(buttons) {
    if(buttons.constructor !== Array) buttons = [buttons];
    for(var i = 0, len = buttons.length; i < len; i++) this._buttons.push((buttons[i].type && buttons[i].type === ButtonTemplate.POSTBACK) ? _buildPostback(buttons[i]) : _buildWebURL(buttons[i]));
  }
  return this;
};

ButtonTemplate.prototype.content = function() {
  return {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'button',
        text: this._text,
        buttons: this._buttons
      }
    }
  };
};

module.exports = ButtonTemplate;
