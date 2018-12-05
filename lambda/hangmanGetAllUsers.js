
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
        callback(null, JSON.parse( JSON.stringify(data, null, 2)));

    }
    }
}