"use strict";

var assert = require('assert');

var AuthenticateTestController = require('../lib/apicontrollers.js').AuthenticateTestController;

var ApiContracts = require('../lib/apicontracts.js');
var AuthenticateTestResponse = require('../lib/apicontracts.js').AuthenticateTestResponse;
var MerchantAuthenticationType = require('../lib/apicontracts.js').MerchantAuthenticationType;

var apiLoginKey = "5KP3u95bQpv";
var transactionKey = "4Ktq966gC55GAX7S";


describe('AuthenticateTest', function() {
	this.timeout(120000);
  describe('request', function () {
  	var response;

  	before(function(done){
  		var merchant = new ApiContracts.MerchantAuthenticationType();

		merchant.setName(apiLoginKey);
		merchant.setTransactionKey(transactionKey);

    	var request = new ApiContracts.AuthenticateTestRequest();
		request.setMerchantAuthentication(merchant);
			
		var ctrl = new AuthenticateTestController(request.getJSON());

		ctrl.execute(function(){
			
				var apiResponse = ctrl.getResponse();

				response = new ApiContracts.AuthenticateTestResponse(apiResponse);

				//console.log(JSON.stringify(response.getMessages().getResultCode()));
			    
			    done();
		});
    });

    it('should return resultcode Ok when successful', function () {

    	assert.equal(response.getMessages().getResultCode(),"Ok");
    });
  });
});
