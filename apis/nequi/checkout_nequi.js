
aws = require('./aws_credenciales.js');


const API_RESOURCES = {
    host: 'a7zgalw2j0.execute-api.us-east-1.amazonaws.com',
    services : {
        validateClient : '/qa/-services-paymentservice-unregisteredpayment'
    },
    headers:{            
        'content-type' : 'application/json'
    }   
};


enviar_notificacion=(numero,valor)=>{
  body  = peticion(numero,valor)
  aws.makeSignedRequest(API_RESOURCES.host,
    API_RESOURCES.services.validateClient,'POST',
    API_RESOURCES.headers,body,
    (statusCode,resultado)=>{
      console.log(statusCode)
      console.log(resultado)
    })
}


peticion = (numero, valor)=>{
  var messageId = new Date().getTime().toString();
	return {
  		"RequestMessage": {
  		  "RequestHeader": {
  		    "Channel": "PNP04-C001",
  		    "RequestDate": new Date().toJSON(),
  		    "MessageID": messageId.substring(messageId.length-9),
  		    "ClientID": numero.toString(),
  		    "Destination": {
  		      "ServiceName": "PaymentsService",
  		      "ServiceOperation": "unregisteredPayment",
  		      "ServiceRegion": "C001",
  		      "ServiceVersion": "1.0.0"
  		    }
  		  },
  		  "RequestBody": {
  		    "any": {
  		      "unregisteredPaymentRQ": {
  		        "phoneNumber": numero.toString(),
  		        "code": "NIT_1",
  		        "value": valor.toString()
  		      }
  		    }
  		  }
  		}
  	}
}

module.exports={
	enviar_notificacion
}