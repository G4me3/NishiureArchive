"use strict";
// 2023/03/17
getCSV(new URL("database.csv", "http://127.0.0.1:5500/dist/")); // 本番：パスを変更
//processes about CSV
function getCSV(URLObj) {
    const req = new XMLHttpRequest();
    const url = new URL(URLObj);
    req.open("get", url, true);
    req.send(null);
    //if csv could get, call convertCSVtoArray()
    req.onload = function () {
        convertCSVtoArray(req.responseText, URLObj);
    };
}
//chage CSV to two-dimensional array
function convertCSVtoArray(str, URLObj) {
    let result = [];
    let tmp = str.split("\n");
    if (URLObj.toString() == "http://127.0.0.1:5500/dist/database.csv") {
        //本番：パスの変更
        // create two-dimensional array separate each lows in ","
        for (let i = 0; i < tmp.length; ++i) {
            result[i] = tmp[i].split(",");
        }
        for (let i = 0; i < result.length; i++) {
            for (let o = 0; o < result[i].length; o++) {
                if (result[i][o].indexOf("\r") != -1 && result[i][o] != undefined) {
                    result[i][o] = result[i][o].substr(0, result[i][o].indexOf("\r"));
                }
                if (result[i][o].indexOf("<br>") != -1) { //remove <br> from database text 
                    result[i][o] = result[i][o].substring(0, result[i][o].indexOf("<br>")) + result[i][o].substring(result[i][o].indexOf("<br>") + 4, result[i][o].length);
                }
            }
        }
        makeResultList(result);
    }
}
//get parameter from URL
function getParam(name, url) {
    if (url == "")
        url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
//make result list of literature based on query search
function makeResultList(result) {
    const requestQuery = getParam("programID", "") || "0";
    const programID = parseInt(requestQuery) - 1;
    let resultTitle = document.getElementById("result-title");
    if (resultTitle !== null) {
        resultTitle.textContent = `検索ワード：${result[programID][1]}`;
    }
    let resultList = document.getElementById("result-list");
    if (resultList !== null && programID >= 0) {
        for (let p = 3; result[programID][p]; p = p + 3) {
            resultList.innerHTML += `
            <div class="document-block">
              <a class='document-link' href='./view.html?manifest1=${result[programID][p + 2]}'>
                <p class='author-title'>${result[programID][p]}<br>${result[programID][p + 1]}</p>
                <img class='book' src='./img/${result[programID][p]}_thumbnail.jpg' alt='thumbnail image'><br>
              </a>
            </div>`;
        }
    }
}
//# sourceMappingURL=search.js.map