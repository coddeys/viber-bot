'use strict';

require("dotenv").load();

const EasySoap = require('easysoap');

const params = {
  host: 'http://api.rossko.ru',
  path: '/service/GetSearch',
  wsdl: '/service/GetSearch?wsdl'

  // set soap headers (optional)
  // headers: [{
  //   'name'      : 'item_name',
  //   'value'    : 'item_value',
  //   'namespace': 'item_namespace'
  // }]
};

// Create
const soapClient = EasySoap(params);


/*
 * get all available functions
 */
soapClient.getAllFunctions()
  .then((functionArray) => { console.log(functionArray); })
  .catch((err) => { throw new Error(err); });


/*
 * get the method params by given methodName
 */
soapClient.getMethodParamsByName('GetSearch')
   .then((methodParams) => {
      console.log(methodParams.request);
      console.log(methodParams.response);
    })
    .catch((err) => { throw new Error(err); });

/*
 * call soap method
 */
soapClient.call({
  method    : 'GetSearch',
  params: {
    KEY1: process.env.KEY1,
    KEY2: process.env.KEY2,
    TEXT: '23412'
  }
})
  .then((callResponse) => {
    console.log(callResponse.data);	// response data as json
    console.log(callResponse.body);	// response body
    console.log(callResponse.header);  //response header
  })
  .catch((err) => { console.log("Got an error making SOAP call: ", err); });

console.log(process.env.KEY1);
console.log(process.env.KEY2);
