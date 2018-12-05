let AWS = require("aws-sdk");
let dynamodb = new AWS.DynamoDB();
let docClient = new AWS.DynamoDB.DocumentClient();
exports.handler = (event, context, callback) => {
    console.log(event)
    let params = {
        TableName: "hangmandb"
    };
    
    docClient.scan(params, onScan);
    
    function onScan(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        for (let i = 0; i < data['Count']; i++) {
            if (event['body-json']['id'] === data['Items'][i]['cognitoid'] || event['body-json']['id'] === data['Items'][i]['rankupid']) {
                callback(null, JSON.parse( JSON.stringify(data['Items'][i], null, 2)));
            }
        }

    }
    }
};