rankings = document.getElementById("rankingBoard");
var db;
//get database data as json 
function getDataAndRank(){
 
      var array = [];

      //push database data to array
      for (var key in db) {
          array.push(db[key]); 
      }

      array.sort(function(a, b){
          return b.score - a.score;
      });
      
      var rank = 1;

      for (var i = 0; i < array.length; i++) {
        if (i > 0 && array[i].score < array[i - 1].score) {
            rank++;
        }
          array[i].rank = rank;
      }
      console.log(array);

  }

  getDataAndRank();

  var tbl=$("<table/>").attr("id","mytable");
  $("#rankingBoard").append(tbl);

  function getDB() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            db = xhr.responseText;
            console.log(db);
            db = JSON.parse(db);
            console.log(db.Items[0]);
            parseData(db);

        }
    }
    xhr.open('GET', 'https://cg3adfllh2.execute-api.us-west-2.amazonaws.com/development/user/rank', true);
    xhr.send(null);
}
function parseData(value) {
    console.log(value.Items.length);
    for(let i=0; i<value.Items.length; i++) {
        var tr="<tr>";
        var td1="<td>"+value.Items[i]["rank"]+"</td>";
        var td2="<td>"+value.Items[i]["userid"]+"</td>";
        var td3="<td>"+value.Items[i]["score"]+"</td><tr>";

        $("#mytable").append(tr+td1+td2+td3); 
    }
}