const Message = require('./Message');
const util = require('util');

function _buildWebURL(button) {
  return {
    type: GenericTemplate.WEB_URL,
    url: button.url || 'https://developers.facebook.com/docs/messenger-platform/send-api-reference#examples',
    title: button.title || 'Button'
  };
}

function _buildPostback(button) {
  return {
    type: GenericTemplate.POSTBACK,
    title: button.title || 'Postback',
    payload: JSON.stringify(button.payload || {})
  };
}

function GenericTemplate(recipient, notificationType) {
  Message.call(this, recipient, notificationType);
  this._elements = [];
  this._currElement = -1;
}

util.inherits(GenericTemplate, Message);

GenericTemplate.WEB_URL = 'web_url';

GenericTemplate.POSTBACK = 'postback';

GenericTemplate.prototype.addElement = function(element) {
  if(element) {
    this._elements.push({
      title: element.title || 'Element',
      subtitle: element.subtitle || 'Subtitle',
      image_url: element.imageUrl || '',
      buttons: []
    });
    this._currElement++;
  }
  return this;
};

GenericTemplate.prototype.addButtons = function(buttons) {
  if(buttons) {
    if(buttons.constructor !== Array) buttons = [buttons];
    const element = this._elements[this._currElement];
    for(var i = 0, len = buttons.length; i < len; i++) element.buttons.push((buttons[i].type && buttons[i].type === GenericTemplate.POSTBACK) ? _buildPostback(buttons[i]) : _buildWebURL(buttons[i]));
  }
  return this;
};

GenericTemplate.prototype.content = function() {
  return {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'generic',
        elements: this._elements
      }
    }
  };
};

module.exports = GenericTemplate;
