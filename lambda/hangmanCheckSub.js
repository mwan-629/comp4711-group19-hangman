var AWS = require("aws-sdk");
var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();
exports.handler = (event, context, callback) => {
    console.log(JSON.stringify(event))
   // TODO implement
   var params = {
       TableName: "hangmandb",
       Key:{
           "id": event.params.header.token
       }
   };

   docClient.get(params, function(err, data) {
       if (err) {
           console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("DATA: " + data)
           if(event.params.header.userid == data['Item']['userid']) 
               callback(null, JSON.parse( JSON.stringify({"score": data['Item']['score'], "userid":data['Item']['userid']}, null, 2)));
            else
               callback(null, JSON.parse( JSON.stringify({"verification failed": 0}, null, 2)));
       }
   });
};