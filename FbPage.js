const Sender = require('./Sender');

function FbPage(id, accessToken) {
  this.id = id || null;
  accessToken = accessToken || null;
  if(!this.id) throw new Error('Facebook Page ID is missing');
  if(!accessToken) throw new Error('Facebook Access Token is missing');
  this._sender = new Sender(accessToken);
}

FbPage.prototype.sendMessage = function(message) {
  return this._sender.send(message);
};

FbPage.prototype.onMessage = function(entry, message) {
  throw new Error('`onMessage` must be implemented to accept `messages` events');
};

FbPage.prototype.onMessageDelivery = function(entry, message) {
  throw new Error('`onMessageDelivery` must be implemented to accept `message_deliveries` events');
};

FbPage.prototype.onMessagingOptins = function(entry, message) {
  throw new Error('`onMessagingOptins` must be implemented to accept `messaging_optins` events');
};

FbPage.prototype.onMessagingPostbacks = function(entry, message) {
  throw new Error('`onMessagingPostbacks` must be implemented to accept `messaging_postbacks` events');
};

module.exports = FbPage;
