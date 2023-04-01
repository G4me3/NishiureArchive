getCSV();
//processes about CSV
function getCSV() {
    var req = new XMLHttpRequest();
    req.open("get", "./database.csv", true);
    req.send(null);

    //if response return call convertCSVtoArray()
    req.onload = function () {
        console.log("success");
        convertCSVtoArray(req.responseText);
    }
}
var result = [];
//chage CSV to two-dimensional array
function convertCSVtoArray(str) {
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
    makeExternalLinkToMovieArchive();
    makeRelationalList(result);
    makeCatalogList(result);
}

//get parameter from URL
function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

manifest = getParam("manifest1");
manifestCategory = 0;
manifestCategory = Number(manifest.substr((manifest.indexOf(".json") - 1), 1));

function makeExternalLinkToMovieArchive(){
    const programID=manifestCategory;
    let externalLink=document.getElementById("MovieArchive-link-url");
    externalLink.href=`https://www.sugilab.net/iida.yuta.lab/sotsuken/search.html?programID=${programID}`;
}

function makeRelationalList(result) {
    manifests = [];
    for (i = 3; i < result[manifestCategory - 1].length; i++) {
        manifests.push({ author: result[manifestCategory - 1][i], title: result[manifestCategory - 1][++i], url: result[manifestCategory - 1][++i] });
    }
    otherReferences = document.getElementById("other-references");
    for (i = 0; i < manifests.length; i++) {
        if (manifests[i].url != manifest) {
            otherReferences.innerHTML += "<div class='book-data'><a class='relation-link' href='./view.html?manifest1=" + manifests[i].url + "'><img class='book' src='./img/" + manifests[i].author + "_thumbnail.jpg' alt='thumbnail image'><br><p class='des'>" + manifests[i].author + "<br>" + manifests[i].title + "</p></div>";
        }
    }
}

//make catalog list and give it to function making Mirador instance 
function makeCatalogList(result) {
    catalogContents = [];
    for (i = 0; i < result[manifestCategory - 1].length; i++) {
        if (result[manifestCategory - 1][i].indexOf('manifest') != -1) {
            manifestURL = result[manifestCategory - 1][i];
            catalogContents.push({ manifestId: manifestURL });
        }
    }
    makeMiradorInstance(catalogContents);
}

function makeMiradorInstance(catalogContents) {
    //get manifest from query
    manifests = []
    for (i = 1; i <= 4; i++) {
        if (getParam("manifest" + i) != null) {
            manifests.push(getParam("manifest" + i));
        }
    }

    miradorProperty = {};

    if (manifests.length == 1) { // one literature
        miradorProperty = {
            id: "viewer",
            windows: [
                {
                    loadedManifest: manifests[0]
                }
            ],
            catalog: [

            ],
            window: {
                highlightAllAnnotations: true,
                sideBarOpen: true,
                panels: {
                    "info": true,
                    "attribution": true,
                    "canvas": true,
                    "annotations": true,
                    "search": true,
                    "layers": false,
                }
            }
        };

        //add relational literature at catalog of Mirador
        for (manifest of catalogContents) {
            miradorProperty.catalog.push(manifest);
        }

    } else if (manifests.length == 2) { //two literature
        miradorProperty = {
            id: "viewer",
            windows: [
                {
                    loadedManifest: manifests[0]
                },
                {
                    loadedManifest: manifests[1]
                }
            ],
            catalog: [

            ],
            window: {
                highlightAllAnnotations: true,
                sideBarOpen: false,
                panels: {
                    "info": true,
                    "attribution": true,
                    "canvas": true,
                    "annotations": true,
                    "search": true,
                    "layers": false,
                }
            }
        };

        //add relational literature at catalog of Mirador
        for (manifest of catalogContents) {
            miradorProperty.catalog.push(manifest);
        }

    }
    else if (manifests.length == 3) { //three literature
        miradorProperty = {
            id: "viewer",
            windows: [
                {
                    loadedManifest: manifests[0]
                },
                {
                    loadedManifest: manifests[1]
                },
                {
                    loadedManifest: manifests[2]
                }
            ],
            catalog: [

            ],
            window: {
                highlightAllAnnotations: true,
                sideBarOpen: false,
                panels: {
                    "info": true,
                    "attribution": true,
                    "canvas": true,
                    "annotations": true,
                    "search": true,
                    "layers": false,
                }
            }
        };

        //add relational literature at catalog of Mirador
        for (manifest of catalogContents) {
            miradorProperty.catalog.push(manifest);
        }
    }
    else if (manifests.length == 4) { //four literature(Max)
        miradorProperty = {
            id: "viewer",
            windows: [
                {
                    loadedManifest: manifests[0]
                },
                {
                    loadedManifest: manifests[1]
                },
                {
                    loadedManifest: manifests[2]
                },
                {
                    loadedManifest: manifests[3]
                }
            ],
            catalog: [

            ],
            window: {
                highlightAllAnnotations: true,
                sideBarOpen: false,
                panels: {
                    "info": true,
                    "attribution": true,
                    "canvas": true,
                    "annotations": true,
                    "search": true,
                    "layers": false,
                }
            }
        };

        //add relational literature at catalog of Mirador
        for (manifest of catalogContents) {
            miradorProperty.catalog.push(manifest);
        }
    }
    let miradorInstance = Mirador.viewer(miradorProperty);
}