/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./browser-env.js":
/*!************************!*\
  !*** ./browser-env.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = {\n  \"PORT\": \"4500\",\n  \"NASA_API_KEY\": \"6lhKe8THkB2ny0LTI4gSKopkMVmFvkiUCjSjl2Cn\"\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9icm93c2VyLWVudi5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9icm93c2VyLWVudi5qcz9kNzQzIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0ge1xuICBcIlBPUlRcIjogXCI0NTAwXCIsXG4gIFwiTkFTQV9BUElfS0VZXCI6IFwiNmxoS2U4VEhrQjJueTBMVEk0Z1NLb3BrTVZtRnZraVVDalNqbDJDblwiXG59Il0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUZBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./browser-env.js\n");

/***/ }),

/***/ "./public/js/main.js":
/*!***************************!*\
  !*** ./public/js/main.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _browserEnv = __webpack_require__(/*! ../../browser-env */ \"./browser-env.js\");\n\nif ('serviceWorker' in navigator) {\n\n  navigator.serviceWorker.register('http://localhost:' + _browserEnv.PORT + '/serviceWorker.js').then(function () {\n    return console.log('ServiceWorker is working!!');\n  }).catch(function (e) {\n    return console.log('ServiceWorker failed to register', e);\n  });\n}\n\n// FETCH IMAGE FROM NASA\nfetch('https://api.nasa.gov/planetary/apod?api_key=' + _browserEnv.NASA_API_KEY).then(function (d) {\n  return d.json();\n}).then(function (s) {\n  console.log(s);\n  var url = s.url;\n\n  document.querySelector('.s_img').src = url;\n}).catch(function (e) {\n  return console.log(e);\n});\n\n// FETCH PHOTOS\nfetch('https://jsonplaceholder.typicode.com/photos').then(function (resp) {\n  return resp.json();\n}).then(function (resp) {\n  var images = resp.slice(0, 10);\n  var UL = document.querySelector('.photos');\n\n  console.log(images);\n  images.forEach(function (image) {\n    var LI = document.createElement('li');\n    var IMG = document.createElement('img');\n\n    IMG.setAttribute('src', image.thumbnailUrl);\n    LI.appendChild(IMG);\n    UL.appendChild(LI);\n  });\n}).catch(function (e) {\n  return console.log(e);\n});\n\n// FETCH GITHUB\nfetch('https://api.github.com/users/yTakkar/repos').then(function (resp) {\n  return resp.json();\n}).then(function (repos) {\n  console.log(repos);\n  var UL = document.querySelector('.github_repos');\n\n  repos.forEach(function (repo) {\n    var LI = document.createElement('li');\n    var A = document.createElement('a');\n\n    A.setAttribute('href', 'https://github.com/' + repo.full_name);\n    var AText = document.createTextNode(repo.full_name);\n\n    A.appendChild(AText);\n    LI.appendChild(A);\n\n    UL.appendChild(LI);\n  });\n}).catch(function (e) {\n  return console.log(e);\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wdWJsaWMvanMvbWFpbi5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9wdWJsaWMvanMvbWFpbi5qcz8wNmQxIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBPUlQsIE5BU0FfQVBJX0tFWSB9IGZyb20gJy4uLy4uL2Jyb3dzZXItZW52J1xuXG5pZiAoJ3NlcnZpY2VXb3JrZXInIGluIG5hdmlnYXRvcikge1xuXG4gIG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyXG4gICAgLnJlZ2lzdGVyKGBodHRwOi8vbG9jYWxob3N0OiR7UE9SVH0vc2VydmljZVdvcmtlci5qc2ApXG4gICAgLnRoZW4oKCkgPT5cbiAgICAgIGNvbnNvbGUubG9nKCdTZXJ2aWNlV29ya2VyIGlzIHdvcmtpbmchIScpXG4gICAgKVxuICAgIC5jYXRjaChlID0+XG4gICAgICBjb25zb2xlLmxvZygnU2VydmljZVdvcmtlciBmYWlsZWQgdG8gcmVnaXN0ZXInLCBlKVxuICAgIClcblxufVxuXG4vLyBGRVRDSCBJTUFHRSBGUk9NIE5BU0FcbmZldGNoKFxuICBgaHR0cHM6Ly9hcGkubmFzYS5nb3YvcGxhbmV0YXJ5L2Fwb2Q/YXBpX2tleT0ke05BU0FfQVBJX0tFWX1gXG4pXG4gIC50aGVuKGQgPT4gZC5qc29uKCkpXG4gIC50aGVuKHMgPT4ge1xuICAgIGNvbnNvbGUubG9nKHMpXG4gICAgbGV0IHsgdXJsIH0gPSBzXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNfaW1nJykuc3JjID0gdXJsXG4gIH0pXG4gIC5jYXRjaChlID0+IGNvbnNvbGUubG9nKGUpKVxuXG4vLyBGRVRDSCBQSE9UT1NcbmZldGNoKCdodHRwczovL2pzb25wbGFjZWhvbGRlci50eXBpY29kZS5jb20vcGhvdG9zJylcbiAgLnRoZW4ocmVzcCA9PiByZXNwLmpzb24oKSlcbiAgLnRoZW4ocmVzcCA9PiB7XG4gICAgbGV0IGltYWdlcyA9IHJlc3Auc2xpY2UoMCwgMTApXG4gICAgbGV0IFVMID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBob3RvcycpXG5cbiAgICBjb25zb2xlLmxvZyhpbWFnZXMpXG4gICAgaW1hZ2VzLmZvckVhY2goaW1hZ2UgPT4ge1xuICAgICAgbGV0IExJID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgbGV0IElNRyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG5cbiAgICAgIElNRy5zZXRBdHRyaWJ1dGUoJ3NyYycsIGltYWdlLnRodW1ibmFpbFVybClcbiAgICAgIExJLmFwcGVuZENoaWxkKElNRylcbiAgICAgIFVMLmFwcGVuZENoaWxkKExJKVxuICAgIH0pXG5cbiAgfSlcbiAgLmNhdGNoKGUgPT4gY29uc29sZS5sb2coZSkpXG5cbi8vIEZFVENIIEdJVEhVQlxuZmV0Y2goJ2h0dHBzOi8vYXBpLmdpdGh1Yi5jb20vdXNlcnMveVRha2thci9yZXBvcycpXG4gIC50aGVuKHJlc3AgPT4gcmVzcC5qc29uKCkpXG4gIC50aGVuKHJlcG9zID0+IHtcbiAgICBjb25zb2xlLmxvZyhyZXBvcylcbiAgICBsZXQgVUwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2l0aHViX3JlcG9zJylcblxuICAgIHJlcG9zLmZvckVhY2gocmVwbyA9PiB7XG4gICAgICBsZXQgTEkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgICBsZXQgQSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKVxuXG4gICAgICBBLnNldEF0dHJpYnV0ZSgnaHJlZicsIGBodHRwczovL2dpdGh1Yi5jb20vJHtyZXBvLmZ1bGxfbmFtZX1gKVxuICAgICAgbGV0IEFUZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUocmVwby5mdWxsX25hbWUpXG5cbiAgICAgIEEuYXBwZW5kQ2hpbGQoQVRleHQpXG4gICAgICBMSS5hcHBlbmRDaGlsZChBKVxuXG4gICAgICBVTC5hcHBlbmRDaGlsZChMSSlcbiAgICB9KVxuXG4gIH0pXG4gIC5jYXRjaChlID0+IGNvbnNvbGUubG9nKGUpKVxuIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBR0E7QUFBQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFBQTtBQUVBO0FBREE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQUEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./public/js/main.js\n");

/***/ })

/******/ });