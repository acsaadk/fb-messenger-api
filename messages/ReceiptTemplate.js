const Message = require('./Message');
const util = require('util');

function ReceiptTemplate(recipient, notificationType) {
  Message.call(this, recipient, notificationType);
}

util.inherits(ReceiptTemplate, Message);

ReceiptTemplate.prototype.addElements = function(elements) {
  this._elements = this._elements || [];
  if(elements.constructor !== Array) elements = [elements];
  for(var i = 0, len = elements.length; i < len; i++) {
    this._elements.push({
      title: elements[i].title || `Product #${i}`,
      subtitle: elements[i].subtitle || '',
      quantity: elements[i].quantity || 1,
      price: elements[i].price || 0,
      currency: elements[i].currency || 'USD',
      image_url: elements[i].imageUrl || ''
    });
  }
  return this;
};

ReceiptTemplate.prototype.setRecipientName = function(name) {
  this._recipientName = name || '';
  return this;
};

ReceiptTemplate.prototype.setOrderNumber = function(number) {
  this._orderNumber = number || '';
  return this;
};

ReceiptTemplate.prototype.setCurrency = function(currency) {
  this._currency = currency || 'USD';
  return this;
};

ReceiptTemplate.prototype.setPaymentMethod = function(method) {
  this._paymentMethod = method || '****';
  return this;
};

ReceiptTemplate.prototype.setOrderUrl = function(url) {
  this._orderUrl = url || '';
  return this;
};

ReceiptTemplate.prototype.setAddress = function(street1, street2, city, postalCode, state, country) {
  this._street1 = street1 || '';
  this._street2 = street2 || '';
  this._city = city || '';
  this._postalCode = postalCode || '';
  this._state = state || '';
  this._country = country || '';
  return this;
};

ReceiptTemplate.prototype.setSummary = function(costs) {
  this._subtotal = costs.subtotal || 0.00;
  this._shippingCost = costs.shippingCost || 0.00;
  this._totalTax = costs.totalTax || 0.00;
  this._totalCost = costs.totalCost || 0.00;
  return this;
};

ReceiptTemplate.prototype.addAdjustments = function(adjustments) {
  this._adjustments = this._adjustments || [];
  if(adjustments.constructor !== Array) adjustments = [adjustments];
  for(var i = 0, len = adjustments.length; i < len; i++) {
    this._adjustments.push({
      name: adjustments[i].name || '',
      amount: adjustments[i].amount || 0
    });
  }
  return this;
};

ReceiptTemplate.prototype.content = function() {
  const timestamp = new Date().getTime();
  return {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'receipt',
        recipient_name: this._recipientName || '****',
        order_number: this._orderNumber || (timestamp + Math.floor(Math.random() * 10 + 1)),
        currency: this._currency || 'USD',
        payment_method: this._paymentMethod || '****',
        order_url: this._orderUrl || '',
        //timestamp: timestamp, /*Removed because of this error: (#1200) Temporary send message failure*/
        elements: this._elements,
        address: {
          street_1: this._street1 || '',
          street_2: this._street2 || '',
          city: this._city || '',
          postal_code: this._postalCode || '',
          state: this._state || '',
          country: this._country || ''
        },
        summary: {
          subtotal: this._subtotal || 0.00,
          shipping_cost: this._shippingCost || 0.00,
          total_tax: this._totalTax || 0.00,
          total_cost: this._totalCost || 0.00
        },
        adjustments: this._adjustments || []
      }
    }
  };
};

module.exports = ReceiptTemplate;
