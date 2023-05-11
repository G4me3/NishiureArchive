/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/search.ts":
/*!***********************!*\
  !*** ./src/search.ts ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"convertCSVtoArray\": function() { return /* binding */ convertCSVtoArray; },\n/* harmony export */   \"getCSV\": function() { return /* binding */ getCSV; }\n/* harmony export */ });\n// 2023/03/17\n// getCSV(new URL(\"database.csv\", \"http://127.0.0.1:5500/dist/\")); // 本番：パスを変更\ngetCSV(new URL(\"database.csv\", \"https://www.sugilab.net/mori.hiroyuki.lab/NishiureArchive/dist/\"));\n//processes about CSV\nfunction getCSV(URLObj) {\n    const req = new XMLHttpRequest();\n    const url = new URL(URLObj);\n    req.open(\"get\", url, true);\n    req.send(null);\n    //if csv could get, call convertCSVtoArray()\n    req.onload = function () {\n        convertCSVtoArray(req.responseText, URLObj);\n    };\n}\n//chage CSV to two-dimensional array\nfunction convertCSVtoArray(str, URLObj) {\n    let result = [];\n    let tmp = str.split(\"\\n\");\n    // if (URLObj.toString() == \"http://127.0.0.1:5500/dist/database.csv\") {//本番：パスの変更\n    if (URLObj.toString() == \"https://www.sugilab.net/mori.hiroyuki.lab/NishiureArchive/dist/database.csv\") {\n        // create two-dimensional array separate each lows in \",\"\n        for (let i = 0; i < tmp.length; ++i) {\n            result[i] = tmp[i].split(\",\");\n        }\n        for (let i = 0; i < result.length; i++) {\n            for (let o = 0; o < result[i].length; o++) {\n                if (result[i][o].indexOf(\"\\r\") != -1 && result[i][o] != undefined) {\n                    result[i][o] = result[i][o].substr(0, result[i][o].indexOf(\"\\r\"));\n                }\n                if (result[i][o].indexOf(\"<br>\") != -1) { //remove <br> from database text \n                    result[i][o] = result[i][o].substring(0, result[i][o].indexOf(\"<br>\")) + result[i][o].substring(result[i][o].indexOf(\"<br>\") + 4, result[i][o].length);\n                }\n            }\n        }\n        makeResultList(result);\n    }\n}\n//get parameter from URL\nfunction getParam(name, url) {\n    if (url == \"\")\n        url = window.location.href;\n    name = name.replace(/[\\[\\]]/g, \"\\\\$&\");\n    var regex = new RegExp(\"[?&]\" + name + \"(=([^&#]*)|&|#|$)\"), results = regex.exec(url);\n    if (!results)\n        return null;\n    if (!results[2])\n        return \"\";\n    return decodeURIComponent(results[2].replace(/\\+/g, \" \"));\n}\n//make result list of literature based on query search\nfunction makeResultList(result) {\n    const requestQuery = getParam(\"programID\", \"\") || \"0\";\n    const programID = parseInt(requestQuery) - 1;\n    let resultTitle = document.getElementById(\"result-title\");\n    if (resultTitle !== null) {\n        resultTitle.textContent = `検索ワード：${result[programID][1]}`;\n    }\n    let resultList = document.getElementById(\"result-list\");\n    if (resultList !== null && programID >= 0) {\n        for (let p = 3; result[programID][p]; p = p + 3) {\n            resultList.innerHTML += `\n            <div class=\"document-block\">\n              <a class='document-link' href='./view.html?manifest1=${result[programID][p + 2]}'>\n                <p class='author-title'>${result[programID][p]}<br>${result[programID][p + 1]}</p>\n                <img class='book' src='./img/${result[programID][p]}_thumbnail.jpg' alt='thumbnail image'><br>\n              </a>\n            </div>`;\n        }\n    }\n}\n\n\n//# sourceURL=webpack://nishiurearchives/./src/search.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/search.ts"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;