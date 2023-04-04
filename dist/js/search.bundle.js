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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"convertCSVtoArray\": function() { return /* binding */ convertCSVtoArray; },\n/* harmony export */   \"getCSV\": function() { return /* binding */ getCSV; }\n/* harmony export */ });\n// 2023/03/17\r\n// getCSV(new URL(\"database.csv\", \"http://127.0.0.1:5500/dist/\")); // 本番：パスを変更\r\ngetCSV(new URL(\"database.csv\", \"https://www.sugilab.net/mori.hiroyuki.lab/NishiureArchive/dist/\"));\r\n//processes about CSV\r\nfunction getCSV(URLObj) {\r\n    const req = new XMLHttpRequest();\r\n    const url = new URL(URLObj);\r\n    req.open(\"get\", url, true);\r\n    req.send(null);\r\n    //if csv could get, call convertCSVtoArray()\r\n    req.onload = function () {\r\n        convertCSVtoArray(req.responseText, URLObj);\r\n    };\r\n}\r\n//chage CSV to two-dimensional array\r\nfunction convertCSVtoArray(str, URLObj) {\r\n    let result = [];\r\n    let tmp = str.split(\"\\n\");\r\n    // if (URLObj.toString() == \"http://127.0.0.1:5500/dist/database.csv\") {//本番：パスの変更\r\n    if (URLObj.toString() == \"https://www.sugilab.net/mori.hiroyuki.lab/NishiureArchive/dist/database.csv\") {\r\n        // create two-dimensional array separate each lows in \",\"\r\n        for (let i = 0; i < tmp.length; ++i) {\r\n            result[i] = tmp[i].split(\",\");\r\n        }\r\n        for (let i = 0; i < result.length; i++) {\r\n            for (let o = 0; o < result[i].length; o++) {\r\n                if (result[i][o].indexOf(\"\\r\") != -1 && result[i][o] != undefined) {\r\n                    result[i][o] = result[i][o].substr(0, result[i][o].indexOf(\"\\r\"));\r\n                }\r\n                if (result[i][o].indexOf(\"<br>\") != -1) { //remove <br> from database text \r\n                    result[i][o] = result[i][o].substring(0, result[i][o].indexOf(\"<br>\")) + result[i][o].substring(result[i][o].indexOf(\"<br>\") + 4, result[i][o].length);\r\n                }\r\n            }\r\n        }\r\n        makeResultList(result);\r\n    }\r\n}\r\n//get parameter from URL\r\nfunction getParam(name, url) {\r\n    if (url == \"\")\r\n        url = window.location.href;\r\n    name = name.replace(/[\\[\\]]/g, \"\\\\$&\");\r\n    var regex = new RegExp(\"[?&]\" + name + \"(=([^&#]*)|&|#|$)\"), results = regex.exec(url);\r\n    if (!results)\r\n        return null;\r\n    if (!results[2])\r\n        return \"\";\r\n    return decodeURIComponent(results[2].replace(/\\+/g, \" \"));\r\n}\r\n//make result list of literature based on query search\r\nfunction makeResultList(result) {\r\n    const requestQuery = getParam(\"programID\", \"\") || \"0\";\r\n    const programID = parseInt(requestQuery) - 1;\r\n    let resultTitle = document.getElementById(\"result-title\");\r\n    if (resultTitle !== null) {\r\n        resultTitle.textContent = `検索ワード：${result[programID][1]}`;\r\n    }\r\n    let resultList = document.getElementById(\"result-list\");\r\n    if (resultList !== null && programID >= 0) {\r\n        for (let p = 3; result[programID][p]; p = p + 3) {\r\n            resultList.innerHTML += `\r\n            <div class=\"document-block\">\r\n              <a class='document-link' href='./view.html?manifest1=${result[programID][p + 2]}'>\r\n                <p class='author-title'>${result[programID][p]}<br>${result[programID][p + 1]}</p>\r\n                <img class='book' src='./img/${result[programID][p]}_thumbnail.jpg' alt='thumbnail image'><br>\r\n              </a>\r\n            </div>`;\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://nishiurearchives/./src/search.ts?");

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