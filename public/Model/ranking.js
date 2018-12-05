rankings = document.getElementById("rankingBoard");
let db;
//get database data as json
function getDataAndRank(){

      let array = [];

      //push database data to array
      for (let key in db) {
          array.push(db[key]);
      }

      array.sort(function(a, b){
          return b.score - a.score;
      });

      let rank = 1;

      for (let i = 0; i < array.length; i++) {
        if (i > 0 && array[i].score < array[i - 1].score) {
            rank++;
        }
          array[i].rank = rank;
      }
  }

  getDataAndRank();

  let tbl=$(`<table class='table table-striped'>    
  <thead>
  <tr>
    <th class="text-center">Rank</th>
    <th class="text-center">Display Name</th>
    <th class="text-center">Score</th>
  </tr>
</thead></table>`).attr("id","mytable");
  $("#rankingBoard").append(tbl);

  function getDB() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            db = xhr.responseText;
            db = JSON.parse(db);
            parseData(db);

        }
    }
    xhr.open('GET', 'https://cg3adfllh2.execute-api.us-west-2.amazonaws.com/development/user/rank', true);
    xhr.send(null);
}
function parseData(value) {
    unsortedrank = []
    for(let i=0; i<value.Items.length; i++) {
          unsortedrank[i] = value.Items[i];
    }

    unsortedrank.sort(function(a, b){
        return a.ranknum - b.ranknum;
    });


    for(let i=0; i< unsortedrank.length; i++) {
        let tr="<tr>";
        let td1="<td>"+unsortedrank[i]["ranknum"]+"</td>";
        let td2="<td>"+unsortedrank[i]["userid"]+"</td>";
        let td3="<td>"+unsortedrank[i]["score"]+"</td><tr>";

        $("#mytable").append(tr+td1+td2+td3);
    }
}
