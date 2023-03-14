"use strict";
// 2023/03/14
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
    if (URLObj.toString() == "http://127.0.0.1:5500/dist/database.csv") { //本番：パスの変更
        // create two-dimensional array separate each lows in ","
        for (let i = 0; i < tmp.length; ++i) {
            result[i] = tmp[i].split(',');
        }
        for (let i = 0; i < result.length; i++) {
            for (let o = 0; o < result[i].length; o++) {
                if (result[i][o].indexOf("\r") != -1 && result[i][o] != undefined) {
                    result[i][o] = result[i][o].substr(0, result[i][o].indexOf("\r"));
                }
            }
        }
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
        return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function makeResultList() {
    const requestQuery = getParam("programID", "");
}
//# sourceMappingURL=search.js.map