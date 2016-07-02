'use strict'

const util = require('util');
const Bots = require('../index');
const Text = Bots.Text;
const ButtonTemplate = Bots.ButtonTemplate;
const GenericTemplate = Bots.GenericTemplate;
const ReceiptTemplate = Bots.ReceiptTemplate;
const Image = Bots.Image;
const FbPage = Bots.FbPage;
const EventEmitter = Bots.EventEmitter;

function MyBot() {
  FbPage.call(this, process.env.FACEBOOK_PAGE_ID, process.env.FACEBOOK_ACCESS_TOKEN);
}

util.inherits(MyBot, FbPage);

MyBot.prototype.onMessage = function(entry, message) {
  console.log('Message arrived ', 'Entry: ', entry, 'Message: ', message);
};

MyBot.prototype.onMessageDelivery = function(entry, message) {
  console.log('Message delivered notification arrived ', 'Entry: ', entry, 'Message: ', message);
};

MyBot.prototype.onMessagingPostbacks = function(entry, message) {
  console.log('Postback arrived ', 'Entry: ', entry, 'Message: ', message);
};

MyBot.prototype.onMessagingOptins = function(entry, message) {
  console.log('Optins message arrived ', 'Entry: ', entry, 'Message: ', message);
};

const bot = new MyBot();

EventEmitter.listenEventsFrom(bot);

EventEmitter.accept(/*INCOMING_BATCH*/); /* Must be called in the webhook controller to start accepting incoming events*/

const text = new Text({ id: process.env.FACEBOOK_TEST_RECIPIENT });

const btnTemplate = new ButtonTemplate({ id: process.env.FACEBOOK_TEST_RECIPIENT });

const genericTemplate = new GenericTemplate({ id: process.env.FACEBOOK_TEST_RECIPIENT });

const image = new Image({ id: process.env.FACEBOOK_TEST_RECIPIENT });

const receiptTemplate = new ReceiptTemplate({ id: process.env.FACEBOOK_TEST_RECIPIENT });

//Text case
bot.sendMessage(text.setMessage('Basic text message'))
.then(result => console.log(result))
.catch(err => console.log('Error: ', err));

//Button Template
bot.sendMessage(btnTemplate.setText('Testing Button template').addButtons([
  { type: ButtonTemplate.WEB_URL, url: 'http://www.facebook.com', title: 'Go to facebook' },
  { type: ButtonTemplate.POSTBACK, title: 'Go to your webhook' }
]))
.then(result => console.log(result))
.catch(err => console.log('Error: ', err));

//Generic template
bot.sendMessage(genericTemplate.addElement({
  title: 'element #1',
  subtitle: 'Subtitle for element #1',
  imageUrl: 'http://petersapparel.parseapp.com/img/item100-thumb.png'
}).addButtons([
  {
    type: GenericTemplate.WEB_URL,
    url: 'http://petersapparel.parseapp.com/img/item100-thumb.png',
    title: 'View Detail'
  }, {
    type: GenericTemplate.POSTBACK,
    title: 'Buy this',
    payload: {}
}])
.addElement({
  title: 'element #2',
  subtitle: 'subtitle for element #2',
  imageUrl: 'http://petersapparel.parseapp.com/img/item101-thumb.png'
}).addButtons([
  {
    type: GenericTemplate.WEB_URL,
    url: 'http://petersapparel.parseapp.com/img/item101-thumb.png',
    title: 'View Detail'
  }, {
    type: GenericTemplate.POSTBACK,
    title: 'Buy this',
    payload: {}
}]))
.then(result => console.log(result))
.catch(err => console.log(err));

//Image case
bot.sendMessage(image.setURL('http://petersapparel.parseapp.com/img/item100-thumb.png'))
.then(result => console.log(result))
.catch(err => console.log(err));

//Receipt template
bot.sendMessage(receiptTemplate.setRecipientName('User name')
.setOrderNumber('0123456')
.setCurrency('USD')
.setPaymentMethod('Credit ***1234')
.setOrderUrl('http://petersapparel.parseapp.com/img/item100-thumb.png')
.setAddress('Street line 1', 'Street line 2', 'City name', 'post code number', 'State name', 'Country name')
.setSummary({
  subtotal: 12.50,
  shippingCost: 0.00,
  totalTax: 1.2,
  totalCost: 13.70
})
.addAdjustments([
  { name: 'Discount #1', amount: 1 },
  { name: 'Discount #2', amount: 3}
])
.addElements([
  {
    title: 'element #1',
    subtitle: 'subtitle for element #1',
    imageUrl: 'http://petersapparel.parseapp.com/img/item100-thumb.png',
    price: 2.45,
    quantity: 3,
    currency: 'USD'
  }, {
    title: 'element #2',
    subtitle: 'subtitle for element #2',
    imageUrl: 'http://petersapparel.parseapp.com/img/item101-thumb.png',
    price: 5.23,
    quantity: 5,
    currency: 'USD'
  }
]))
.then(result => console.log(result))
.catch(err => console.log(err.error));

//Get User profile info { first_name, last_name, profile_pic, locale, timezone, gender }
bot.getUser(process.env.FACEBOOK_TEST_RECIPIENT)
.then(user => console.log(user))
.catch(err => console.log(err.error));
