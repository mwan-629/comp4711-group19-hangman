let AWS = require("aws-sdk");

let dynamodb = new AWS.DynamoDB();
let docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    console.log(event)
    let params = {
        TableName: 'hangmandb',
        Item:{
            'token' : event['body-json']['token'],
            'appid': 'HzISRA0vTL',
            'score': 0,
            'cognitoid': event['body-json']['cognitoid'],
            'userid': event['body-json']['userid'],
            'rankupid': event['body-json']['rankupid']
            }
        };


    console.log("Adding a new item...");
    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            
        } else {
             sortRank();
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
    
    function sortRank(){
    
    let params = {
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
                let params = {
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
};
