
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
            for(let i=0;i<data['Count'];i++) {
                if(event.params.header.rankupid == data['Items'][i]['rankupid'] && event.params.header.Authorization == data['Items'][i]['appid']) {
                    callback(null, JSON.parse( JSON.stringify({"rank": data['Items'][i]['ranknum'],"userid": data['Items'][i]['userid'],"rankupid": data['Items'][i]['rankupid'],"Percentage": Math.round(data['Items'][i]['ranknum']/data['Count']*100) + "%"}, null, 2)));
                } 
            } 
            callback(null, JSON.parse( JSON.stringify({"app id or user id missing": 0}, null, 2)));
        }
    }
}

