const Request = require('request-promise');

const url = 'https://graph.facebook.com/v2.6/me/messages';
const method = 'POST';

function Sender(accessToken) {
  this._accessToken = accessToken || null;
  if(!this._accessToken) throw new Error('Access token is missing');
}

Sender.prototype.send = function(message) {
  if(!message.__base__ || message.__base__ !== 'Message') throw new Error('Invalid message');
  const opts = {
    method: method,
    uri: url,
    body: message,
    json: true
  };
  return Request(opts);
};

module.exports = Sender;
