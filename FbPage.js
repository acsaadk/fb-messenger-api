function FbPage(id, accessToken) {
  this.id = id;
  this.accessToken = accessToken;
}

FbPage.prototype.sendMessage = function() {
  throw 'Not implemented yet!';
};

FbPage.prototype.onMessage = function() {
  throw 'Must be implemented to accept `messages` events';
};

FbPage.prototype.onMessageDelivery = function() {
  throw 'Must be implemented to accept `message_deliveries` events';
};

FbPage.prototype.onMessagingOptins = function() {
  throw 'Must be implemented to accept `messaging_optins` events';
};

FbPage.prototype.onMessagingPostbacks = function() {
  throw 'Must be implemented to accept `messaging_postbacks` events';
};

module.exports = FbPage;
