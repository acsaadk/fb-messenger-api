const Request = require('request-promise');

const url = 'https://graph.facebook.com/v2.6/';

function Sender(accessToken) {
  this._accessToken = accessToken || null;
  if(!this._accessToken) throw new Error('Access token is missing');
}

Sender.prototype.send = function(message) {
  if(!message.__base__ || message.__base__ !== 'Message') throw new Error('Invalid message provided');
  const opts = {
    method: 'POST',
    uri: url + 'me/messages',
    qs: {
      access_token: this._accessToken
    },
    headers: {
      'Content-Type': 'application/json'
    },
    body: message._build(),
    json: true
  };
  return Request(opts);
};

Sender.prototype.getUser = function(id) {
  if(!id) return null;
  const opts = {
    method: 'GET',
    uri: url + id,
    qs: {
      access_token: this._accessToken
    },
    json: true
  };
  return Request(opts);
};

module.exports = Sender;
