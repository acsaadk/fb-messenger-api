function Message(recipient, notificationType) {
  this.__base__ = 'Message';
  this.body = {
    recipient: {
      id: null,
      phone_number: null
    },
    message: null,
    notification_type: null
  };
  this.body.recipient.id = recipient.id || null;
  this.body.recipient.phone_number = recipient.phoneNumber || null;
  if(!this.body.recipient.id && !this.body.recipient.phone_number) throw new Error('`recipient.id` or `recipient.phoneNumber` must be set');
  this.body.notification_type = notificationType || 'REGULAR';
};

Message.prototype.NOTIFICATION_TYPE = {
  REGULAR: 'REGULAR',
  SILENT_PUSH: 'SILENT_PUSH',
  NO_PUSH: 'NO_PUSH'
};

Message.prototype.content = function() {
  throw new Error('Must return the message content');
}

Message.prototype._build = function() {
  this.body.message = this.content();
  return this.body;
};



module.exports = Message;
