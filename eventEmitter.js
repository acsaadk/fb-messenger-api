const _fbPages = {};

function EventEmitter() {}

EventEmitter.prototype._buildEntry = function(entry) {
  const entryObj = {};
  for(key in entry) {
    if(entry.hasOwnProperty(key) && key !== 'messaging') entryObj[key] = entry[key];
  }
  return entryObj;
};

EventEmitter.prototype.listenEvents = function(fbPage) {
  _fbPages[fbPage.id] = fbPage;
};

EventEmitter.prototype.unsubscribePage = function(id) {
  delete _fbPages[id];
};

EventEmitter.prototype.accept = function(incomingBatch) {
    const batch = incomingBatch;
    for(var i = 0, entry, numEntries = batch.entry.length; i < numEntries; i++) {
      entry = this._buildEntry(batch.entry[i]);
      for(var j = 0, page, numMessages = batch.entry[i].messaging.length; j < numMessages; j++) {
        const message = batch.entry[i].messaging[j];
        if((page = this.isSubscribed(message.recipient.id))) {
          if(message.optin) page.onMessagingOptins(entry, message);
          else if(message.message) page.onMessage(entry, message);
          else if(message.delivery) page.onMessageDelivery(entry, message);
          else if(message.postback) page.onMessagingPostbacks(entry, message);
        }
      }
    }
};

EventEmitter.prototype.isSubscribed = function(id) {
  return _fbPages[id];
};

module.exports = new EventEmitter();
