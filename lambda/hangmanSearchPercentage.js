let AWS = require("aws-sdk");

let dynamodb = new AWS.DynamoDB();
let docClient = new AWS.DynamoDB.DocumentClient();


exports.handler = function(event, context, callback) {
    if (event.params.header.Authorization !== "HzISRA0vTL") {
        callback(null, JSON.parse( JSON.stringify({"invalid Authorization": 0}, null, 2)));
    }    
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
            let json = [];
            if (event['body-json']['comparator'] === ">=" && event['body-json']['percentage'] > 0) {
                for(let i=0;i<data['Count'];i++) {
                    if (Math.round(data['Items'][i]['ranknum']/data['Count']*100) >= event['body-json']['percentage']
                        && data['Items'][i].hasOwnProperty('rankupid')) {
                        json.push({"rank": data['Items'][i]['ranknum'],"userid": data['Items'][i]['userid'],"rankupid": data['Items'][i]['rankupid'],"Percentage": Math.round(data['Items'][i]['ranknum']/data['Count']*100) + "%"});
                    }
                }
            } else if (event['body-json']['comparator'] === "<=" && event['body-json']['percentage'] > 0){
                for(let i=0;i<data['Count'];i++) {
                    if (Math.round(data['Items'][i]['ranknum']/data['Count']*100) <= event['body-json']['percentage']
                        && data['Items'][i].hasOwnProperty('rankupid')) {
                        json.push({"rank": data['Items'][i]['ranknum'],"userid": data['Items'][i]['userid'],"rankupid": data['Items'][i]['rankupid'],"Percentage": Math.round(data['Items'][i]['ranknum']/data['Count']*100) + "%"});
                    }
                }
            } else {
                callback(null, JSON.parse( JSON.stringify({"invalid comparator or percentage": 0}, null, 2)));
            }
            callback(null, json)
        }
    }
}
