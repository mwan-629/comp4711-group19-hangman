var AWS = require("aws-sdk");

var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();


exports.handler = function(event, context, callback) {
    // console.log("EVENT: "+ event)
    console.log("EVENT:"+JSON.stringify(event['body-json']['token']))
    
    var params = {
        TableName: "hangmandb",
        Key:{
           "token": event['body-json']['token'],
       },
       UpdateExpression: "set score = :s",
       ExpressionAttributeValues:{
           ":s":event['body-json']['score']
       },
       ReturnValue: "UPDATED_NEW"
    };
    console.log("Updating the item...");
    docClient.update(params, function(err, data) {
    if (err) {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        callback(null, JSON.parse( JSON.stringify({"Update failed": 0}, null, 2)));
    } else {
        console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
        callback(null, JSON.parse( JSON.stringify({"Score update successful": 0}, null, 2)));
    }
});
    
}



