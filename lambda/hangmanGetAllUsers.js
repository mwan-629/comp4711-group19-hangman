
let AWS = require("aws-sdk");

let dynamodb = new AWS.DynamoDB();
let docClient = new AWS.DynamoDB.DocumentClient();


exports.handler = function(event, context, callback) {
    console.log(event)
    let json = event;
    
    let params = {
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