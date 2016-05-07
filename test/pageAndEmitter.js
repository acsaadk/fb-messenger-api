// Testing EventEmitter with Tasker as a subclass of FbPage
const FbPage = require('../FbPage');
const EventEmitter = require('../EventEmitter');
const util = require('util');


//Constructor
function Tasker(id, accessToken) {
  //super
  FbPage.call(this, id, accessToken);
}
//Inheritance
util.inherits(Tasker, FbPage);

//--- Method Implementations for each type of event
Tasker.prototype.onMessage = function(entry, message) {
  console.log('Entry: ', entry, 'Message: ', message);
};

Tasker.prototype.onMessageDelivery = function(entry, message) {
  console.log('Entry: ', entry, 'Delivery: ', message);
};

Tasker.prototype.onMessagingOptins = function(entry, message) {
  console.log('Entry: ', entry, 'Optins: ', message);
}

Tasker.prototype.onMessagingPostbacks = function(entry, message) {
  console.log('Entry: ', entry, 'Postback: ', message);
}
//----

//Adding Tasker to listen incoming events
EventEmitter.listenEvents(new Tasker('1443', '9abd45535445cdee24436ff'));

const onMessage = {
  "object":"page",
  "entry":[
    {
      "id":'1443',
      "time":1458696618911,
      "messaging":[
        {
          "sender":{
            "id":'USER_ID'
          },
          "recipient":{
            "id":'1443'
          },
          "timestamp":1458696618268,
          "message":{
            "mid":"mid.1458696618141:b4ef9d19ec21086067",
            "seq":51,
            "attachments":[
              {
                "type":"image",
                "payload":{
                  "url":"IMAGE_URL"
                }
              }
            ]
          }
        }
      ]
    }
  ]
};
//Simulating incoming onMessage event
EventEmitter.accept(onMessage);

const onMessageDelivery = {
   "object":"page",
   "entry":[
      {
         "id":'1443',
         "time":1458668856451,
         "messaging":[
            {
               "sender":{
                  "id":'USER_ID'
               },
               "recipient":{
                  "id":'1443'
               },
               "delivery":{
                  "mids":[
                     "mid.1458668856218:ed81099e15d3f4f233"
                  ],
                  "watermark":1458668856253,
                  "seq":37
               }
            }
         ]
      }
   ]
};

//Simulating incoming onMessageDelivery event
EventEmitter.accept(onMessageDelivery);

const onMessagingOptins = {
  "object":"page",
  "entry":[
    {
      "id":'1443',
      "time":12341,
      "messaging":[
        {
          "sender":{
            "id":'USER_ID'
          },
          "recipient":{
            "id":'1443'
          },
          "timestamp":1234567890,
          "optin":{
            "ref":"PASS_THROUGH_PARAM"
          }
        }
      ]
    }
  ]
};

//Simulating incoming onMessagingOptins event
EventEmitter.accept(onMessagingOptins);

const onMessagingPostbacks = {
  "object":"page",
  "entry":[
    {
      "id":'1443',
      "time":1458692752478,
      "messaging":[
        {
          "sender":{
            "id":'USER_ID'
          },
          "recipient":{
            "id":'1443'
          },
          "timestamp":1458692752478,
          "postback":{
            "payload":"USER_DEFINED_PAYLOAD"
          }
        }
      ]
    }
  ]
};

//Simulating incoming onMessagingPostbacks event
EventEmitter.accept(onMessagingPostbacks);
