
var AWS = require("aws-sdk");

var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();


exports.handler = function(event, context, callback) {
    console.log(event)
    var json = event;
    
    var params = {
        TableName: "hangmandb"
    };
    
    docClient.scan(params, onScan);
    
    function onScan(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        let json = data['Items'];
        json.sort(function(a, b){
            return b.score - a.score;
        });
        console.log(JSON.stringify(json, null, 2));
        
        for (let i = 0; i < json.length; i++) {
                var params = {
                    TableName: "hangmandb",
                    Key:{
                       "token": json[i].token,
                   },
                   UpdateExpression: "set ranknum = :s",
                   ExpressionAttributeValues:{
                       ":s": i+1
                   },
                   ReturnValue: "UPDATED_NEW"
                };
                console.log("Updating the item...");
                docClient.update(params, function(err, data) {
                if (err) {
                    console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
                }
            });
        }

    }
    }
}