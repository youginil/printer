(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["pkg"] = factory();
	else
		root["pkg"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/printer.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/host.ts":
/*!*********************!*\
  !*** ./src/host.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ua = window.navigator.userAgent;
function isEdge() {
    return ua.indexOf('Edge') > 0;
}
exports.isEdge = isEdge;
function isIE11() {
    return ua.indexOf('Trident') >= 0 && ua.indexOf('rv:11.0') >= 0;
}
exports.isIE11 = isIE11;
function isIE10() {
    return ua.indexOf('MSIE 10.0') > 0;
}
exports.isIE10 = isIE10;
function isIE9() {
    return ua.indexOf('MSIE 9.0') > 0;
}
exports.isIE9 = isIE9;
function isIE() {
    return isIE11() || isIE10() || isIE9();
}
exports.isIE = isIE;
function isChrome() {
    return ua.indexOf('Chrome') > 0 && ua.indexOf('Edge') < 0;
}
exports.isChrome = isChrome;
function isFirefox() {
    return ua.indexOf('Firefox') > 0;
}
exports.isFirefox = isFirefox;
function isSafari() {
    return ua.indexOf('Safari') > 0 && ua.indexOf('Chrome') < 0;
}
exports.isSafari = isSafari;


/***/ }),

/***/ "./src/printer.ts":
/*!************************!*\
  !*** ./src/printer.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var host_1 = __webpack_require__(/*! ./host */ "./src/host.ts");
var NEW_PAGE_CLASS = 'prt-new-page';
var NO_PRINT_CLASS = 'prt-no-print';
var Printer = /** @class */ (function () {
    function Printer(options) {
        var _this = this;
        this.head = null;
        this.body = null;
        this.importCSS = true;
        this.preview = false;
        this.ready = false;
        this.waitingPrint = false;
        this.contentTransitStation = [];
        options = options || {};
        this.iframe = document.createElement('iframe');
        this.iframe.style.position = 'fixed';
        this.iframe.style.width = '0';
        this.iframe.style.height = '0';
        this.iframe.style.left = '-1000px';
        this.iframe.style.top = '-1000px';
        document.body.appendChild(this.iframe);
        if ('importCSS' in options) {
            this.importCSS = !!options.importCSS;
        }
        if ('preview' in options) {
            this.preview = !!options.preview;
        }
        var printAfterLoadIfWaiting = function () {
            if (!_this.waitingPrint) {
                return;
            }
            _this.contentTransitStation.forEach(function (item) {
                _this.append(item.elem, item.clone);
            });
            _this.print();
        };
        if (host_1.isIE()) {
            this.iframe.contentWindow.onload = function () {
                _this._onload(printAfterLoadIfWaiting);
            };
        }
        else if (host_1.isFirefox()) {
            setTimeout(function () {
                _this._onload(printAfterLoadIfWaiting);
            }, 0);
        }
        else {
            this._onload(printAfterLoadIfWaiting);
        }
        if (options.content) {
            this.append(options.content);
        }
    }
    Printer.prototype._onload = function (cb) {
        var _this = this;
        var doc = this.iframe.contentWindow.document;
        this.head = doc.head;
        this.body = doc.body;
        var printerStyle = document.createElement('style');
        printerStyle.innerText = "@media print {." + NO_PRINT_CLASS + " {display: none;}." + NEW_PAGE_CLASS + " {page-break-before: always;}}";
        this.head.appendChild(printerStyle);
        if (!this.importCSS) {
            this.ready = true;
            cb();
            return;
        }
        var linkElements = document.querySelectorAll('link[type="text/css"]');
        var linkCount = linkElements.length;
        for (var i = 0; i < linkElements.length; i++) {
            var link = document.createElement('link');
            link.type = 'text/css';
            link.rel = 'stylesheet';
            link.href = linkElements[i].href;
            this.head.appendChild(link);
            link.onerror = link.onload = function () {
                linkCount--;
                if (linkCount > 0) {
                    return;
                }
                _this.ready = true;
                cb();
            };
        }
        // TODO link style 顺序
        var styleElements = document.getElementsByTagName('style');
        for (var i = 0; i < styleElements.length; i++) {
            var style = document.createElement('style');
            style.innerText = styleElements[i].innerText.replace(/\r|\n|\r\n/g, '');
            this.head.appendChild(style);
        }
        if (linkCount === 0) {
            this.ready = true;
            cb();
        }
    };
    Printer.prototype.print = function () {
        if (!this.ready) {
            this.waitingPrint = true;
            return this;
        }
        if (this.preview) {
            this.iframe.style.width = '100%';
            this.iframe.style.height = '100%';
            this.iframe.style.background = 'white';
            this.iframe.style.left = '0';
            this.iframe.style.top = '0';
            this.iframe.style.zIndex = '99999';
        }
        else {
            if (host_1.isIE()) {
                this.iframe.contentWindow.document.execCommand('print', false);
            }
            else {
                this.iframe.contentWindow.print();
            }
        }
        this.waitingPrint = false;
        return this;
    };
    Printer.prototype.append = function (elem, clone) {
        if (clone === void 0) { clone = true; }
        if (!this.ready) {
            this.contentTransitStation.push({
                elem: elem,
                clone: clone
            });
            return this;
        }
        if (elem instanceof Element) {
            this.body.appendChild(clone ? elem.cloneNode(true) : elem);
        }
        else if (elem instanceof HTMLCollection || elem instanceof NodeList) {
            for (var j = 0; j < elem.length; j++) {
                this.body.appendChild(clone ? elem[j].cloneNode(true) : elem[j]);
            }
        }
        return this;
    };
    Printer.prototype.splitPage = function () {
        var div = document.createElement('div');
        div.className = NEW_PAGE_CLASS;
        if (!this.ready) {
            this.contentTransitStation.push({
                elem: div,
                clone: false
            });
            return this;
        }
        this.body.appendChild(div);
        return this;
    };
    Printer.prototype.clear = function () {
        if (!this.ready) {
            return this;
        }
        this.body.innerHTML = '';
        return this;
    };
    Printer.prototype.destroy = function () {
        this.iframe.remove();
        this.iframe = null;
        this.head = null;
        this.body = null;
    };
    return Printer;
}());
exports.Printer = Printer;


/***/ })

/******/ });
});
//# sourceMappingURL=build.js.map