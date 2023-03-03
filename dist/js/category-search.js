
getCSV("./database.csv");
getCSV("./database2.csv");

//processes about CSV
function getCSV(url) {
    var req = new XMLHttpRequest();
    req.open("get", url, true);
    req.send(null);

    //if response return call convertCSVtoArray()
    req.onload = function () {
        console.log("success");
        convertCSVtoArray(req.responseText, url);
    }
}

//chage CSV to two-dimensional array
function convertCSVtoArray(str, url) {
    var result = [];
    var tmp = str.split("\n");
    // create two-dimensional array separate each lows in ","
    for (var i = 0; i < tmp.length; ++i) {
        result[i] = tmp[i].split(',');
    }
    for (i = 0; i < result.length; i++) {
        for (o = 0; o < result[i].length; o++) {
            if (result[i][o].indexOf("\r") != -1 && result[i][o] != undefined) {
                result[i][o] = result[i][o].substr(0, result[i][o].indexOf("\r"))
            }
        }
    }
    makeTable(result, url);
}

function makeTable(dataset, url) {
    let prevAuthName;
    let authName;
    if (url == "./database.csv") {
        let authTable = document.getElementById("auth-table");

        //initialize
        for (let p = 3; p < dataset[0].length; p++) {
            authName = dataset[0][p].substr(0, dataset[0][p].indexOf("("));
            literatureName = dataset[0][++p];
            if (literatureName.indexOf("<br>") != -1) {
                literature1 = literatureName.substring(0, literatureName.indexOf("<"));
                literature2 = literatureName.substring(literatureName.indexOf(">") + 1, literatureName.length);
                literatureName = literature1 + " " + literature2;
            }
            literatureLink = dataset[0][++p];
            if (document.getElementById(authName) == null) {
                if (authName == "静岡県磐田郡水窪町史研究民俗学編") {
                    authName = authName.substr(authName.indexOf("水"), authName.length);
                }
                authTable.innerHTML += `<li><section><li id="${authName}" class="title">${authName}</li><div class="box"><li id="${authName}文献" class="title">${literatureName}</li><div id="${authName}link" class="box"><li class="detail-content"><a id="${literatureName}link" class="view-link" href="./view.html?manifest1=${literatureLink}">${dataset[0][1]}</a></li></div></div></section></li>`;
            } else if (document.getElementById(authName) != null) {
                document.getElementById(authName).parentNode.innerHTML += `<div class="box"><li id="${authName}文献" class="title">${literatureName}</li><div id="${authName}link" class="box"><li class="detail-content"><a id="${literatureName}link" class="view-link" href="./view.html?manifest1=${literatureLink}">${dataset[0][1]}</a></li></div></div>`;
            }
            document.getElementById(authName).textContent = authName + "(" + $("#" + authName + "文献").length + ")";// elements number of author
            document.getElementById(literatureName + "link").parentNode.parentNode.previousSibling.textContent = literatureName + "(" + document.getElementById(literatureName + "link").parentNode.parentNode.children.length + ")";
        }

        //classification
        for (let i = 1; i < dataset.length; i++) {
            for (let p = 3; p < dataset[i].length; p++) {
                literatureName = dataset[i][++p];
                literatureField = document.getElementById(literatureName + "link");
                if (literatureField != null) {
                    literatureField = literatureField.parentNode.parentNode;
                    literatureField.innerHTML += `<li class="detail-content"><a id="${literatureName}link" class="view-link" href="./view.html?manifest1=${dataset[i][++p]}">${dataset[i][1]}</a></li>`;
                    document.getElementById(literatureName + "link").parentNode.parentNode.previousSibling.textContent = literatureName + "(" + document.getElementById(literatureName + "link").parentNode.parentNode.children.length + ")";
                }
            }
        }
    } else if (url == "./database2.csv") {
        let itemTable = document.getElementById("item-table");
        let itemName;
        let programmName;
        let programmList = [];
        let authName;
        let literatureName;
        let literatureLink;
        for (let i = 0; i < dataset.length; i++) {
            itemName = dataset[i][0];
            programmList = [];
            programmList.push(dataset[i][1]);
            for (let p = 2; p < dataset[i].length; p++) {
                if (programmList[0].indexOf(dataset[i][p]) == -1) {
                    programmList.push(dataset[i][p]);
                } else {
                    break;
                }
            }
            itemTable.innerHTML += `<li><section><li id="${itemName}" class="title">${itemName}</li></section></li>`;
            // initialize
            for (let p = programmList.length + 1; p < dataset[i].length; p++) {
                if (programmList.includes(dataset[i][p])) {
                    programmName = dataset[i][p];
                    authName = dataset[i][++p];
                    literatureName = dataset[i][++p];
                    if (literatureName.indexOf("<br>") != -1) {
                        literature1 = literatureName.substring(0, literatureName.indexOf("<"));
                        literature2 = literatureName.substring(literatureName.indexOf(">") + 1, literatureName.length);
                        literatureName = literature1 + " " + literature2;
                    }
                    literatureLink = dataset[i][++p];
                    document.getElementById(itemName).parentNode.innerHTML += `<div class="box"><li id="${itemName}-programm" class="title">${programmName}</li><div id="${itemName}-${programmName}" class="box"><li class="detail-content"><a id="${itemName}-${programmName}link" class="view-link" href="./view.html?manifest1=${literatureLink}">${authName}<br>${literatureName}</a></li></div>`;
                } else {
                    if (document.getElementById(itemName + "-" + programmName) != null && dataset[i][p] != "") {
                        authName = dataset[i][p];
                        literatureName = dataset[i][++p];
                        if (literatureName.indexOf("<br>") != -1) {
                            literature1 = literatureName.substring(0, literatureName.indexOf("<"));
                            literature2 = literatureName.substring(literatureName.indexOf(">") + 1, literatureName.length);
                            literatureName = literature1 + literature2;
                        }
                        literatureLink = dataset[i][++p];
                        document.getElementById(itemName + "-" + programmName).innerHTML += `<li class="detail-content"><a id="${itemName}-${programmName}link" class="view-link" href="./view.html?manifest1=${literatureLink}">${authName}<br>${literatureName}</a></li>`;
                    }
                }
                document.getElementById(itemName + "-" + programmName).previousSibling.textContent = programmName + "(" + $("#" + itemName + "-" + programmName + "link").length + ")";// elements numbers of literature
            }
            document.getElementById(itemName).textContent = itemName + "(" + $("#" + itemName + "-programm").length + ")"; // elements numbers of item
        }
        accordion();
    }
    console.log("finish");
}

function accordion() {
    console.log("query");
    //アコーディオンをクリックした時の動作
    $('.title').on('click', function () {//when title cilicked
        var findElm = $(this).nextAll(".box");//get all box after the element
        $(findElm).slideToggle();//open or close accordion menu
        if ($(this).hasClass('close')) {//if has close
            $(this).removeClass('close');//remove clise
        } else {//has not close 
            $(this).addClass('close');//add close   
        }
    });
};