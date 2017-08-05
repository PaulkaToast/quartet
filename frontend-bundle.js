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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_createjs__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_createjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_createjs__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



//variables//
var speed = 10;
var stage = void 0;
var ctx = void 0;
var canvas = void 0;

var play = void 0;
var pause = void 0;
var line = void 0;
var stop = void 0;
var cSize = void 0;
//Classes//

var PauseButton = function () {
    function PauseButton(cSize) {
        _classCallCheck(this, PauseButton);

        this.x = 150 * (cSize / 650);
        this.y = cSize - 70 * (cSize / 650);
        this.length = 51 * (cSize / 650);
        this.width = 17 * (cSize / 650);
        this.r = 247;
        this.b = 0;
        this.g = 239;
        this.a = 0.5; //aplha
        this.af = 0.1; //aplha fill
        this.cSize = cSize;
        this.clicked = false;

        this.shape = new __WEBPACK_IMPORTED_MODULE_0_createjs___default.a.Shape();
        this.shape.x = 0;
        this.shape.y = 0;
        stage.addChild(this.shape);
        this.shape.on("click", this.onClick.bind(this));
        this.shape.on("mouseover", this.mouseOver.bind(this));
        this.shape.on("mouseout", this.mouseOut.bind(this));
    }

    _createClass(PauseButton, [{
        key: "draw",
        value: function draw() {
            this.shape.graphics.clear().beginFill('rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.af + ')').setStrokeStyle(3 * (this.cSize / 650), 'round', 'round').beginStroke('rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')').drawRect(this.x + this.width * 2, this.y, this.width, this.length).drawRect(this.x + this.width * 4, this.y, this.width, this.length).endFill().endStroke();
        }
    }, {
        key: "drawAndUpdate",
        value: function drawAndUpdate() {
            this.draw();
            stage.update();
        }
    }, {
        key: "unclick",
        value: function unclick() {
            if (this.clicked == true) {
                this.af = 0.1;
            }
            this.clicked = false;
            this.drawAndUpdate();
        }
    }, {
        key: "onClick",
        value: function onClick() {
            if (!this.clicked) {
                this.af = 0.5;
            } else {
                this.af = 0.1;
            }
            play.unclick();
            stop.unclick();
            this.clicked = !this.clicked;
            this.drawAndUpdate();
            line.drawAndUpdate();
        }
    }, {
        key: "mouseOver",
        value: function mouseOver() {
            this.a = 1;
            this.drawAndUpdate();
        }
    }, {
        key: "mouseOut",
        value: function mouseOut() {
            this.a = 0.5;
            this.drawAndUpdate();
        }
    }]);

    return PauseButton;
}();

var StopButton = function () {
    function StopButton(cSize) {
        _classCallCheck(this, StopButton);

        this.x = 20 * (cSize / 650);
        this.y = cSize - 70 * (cSize / 650);
        this.side = 51 * (cSize / 650);
        this.r = 247;
        this.b = 0;
        this.g = 0;
        this.a = 0.5; //aplha
        this.af = 0.1; //aplha fill
        this.cSize = cSize;
        this.clicked = false;

        this.shape = new __WEBPACK_IMPORTED_MODULE_0_createjs___default.a.Shape();
        this.shape.x = 0;
        this.shape.y = 0;
        stage.addChild(this.shape);
        this.shape.on("click", this.onClick.bind(this));
        this.shape.on("mouseover", this.mouseOver.bind(this));
        this.shape.on("mouseout", this.mouseOut.bind(this));
    }

    _createClass(StopButton, [{
        key: "draw",
        value: function draw() {
            this.shape.graphics.clear().beginFill('rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.af + ')').setStrokeStyle(3 * (this.cSize / 650), 'round', 'round').beginStroke('rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')').drawRect(this.x, this.y, this.side, this.side).endFill().endStroke();
        }
    }, {
        key: "drawAndUpdate",
        value: function drawAndUpdate() {
            this.draw();
            stage.update();
        }
    }, {
        key: "unclick",
        value: function unclick() {
            if (this.clicked == true) {
                this.af = 0.1;
            }
            this.clicked = false;
            this.drawAndUpdate();
        }
    }, {
        key: "onClick",
        value: function onClick() {
            if (!this.clicked) {
                this.af = 0.5;
            } else {
                this.af = 0.1;
            }
            play.unclick();
            pause.unclick();
            this.clicked = !this.clicked;
            this.drawAndUpdate();
            line.drawAndUpdate();
        }
    }, {
        key: "mouseOver",
        value: function mouseOver() {
            this.a = 1;
            this.drawAndUpdate();
        }
    }, {
        key: "mouseOut",
        value: function mouseOut() {
            this.a = 0.5;
            this.drawAndUpdate();
        }
    }]);

    return StopButton;
}();

var PlayButton = function () {
    function PlayButton(cSize) {
        _classCallCheck(this, PlayButton);

        this.x = 100 * (cSize / 650);
        this.y = cSize - 70 * (cSize / 650);
        this.side = 51 * (cSize / 650);
        this.r = 0;
        this.b = 27;
        this.g = 237;
        this.a = 0.5; //aplha
        this.af = 0.1; //aplha fill
        this.cSize = cSize;
        this.clicked = false;

        this.shape = new __WEBPACK_IMPORTED_MODULE_0_createjs___default.a.Shape();
        this.shape.x = 0;
        this.shape.y = 0;
        stage.addChild(this.shape);
        this.shape.on("click", this.onClick.bind(this));
        this.shape.on("mouseover", this.mouseOver.bind(this));
        this.shape.on("mouseout", this.mouseOut.bind(this));
    }

    _createClass(PlayButton, [{
        key: "draw",
        value: function draw() {
            this.shape.graphics.clear().beginFill('rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.af + ')').setStrokeStyle(3 * (this.cSize / 650), 'round', 'round').beginStroke('rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')').moveTo(this.x, this.y).lineTo(this.x, this.y + this.side).lineTo(this.x + this.side, this.y + this.side / 2).lineTo(this.x, this.y).endFill().endStroke();
        }
    }, {
        key: "drawAndUpdate",
        value: function drawAndUpdate() {
            this.draw();
            stage.update();
        }
    }, {
        key: "unclick",
        value: function unclick() {
            if (this.clicked == true) {
                this.af = 0.1;
            }
            this.clicked = false;
            this.drawAndUpdate();
        }
    }, {
        key: "onClick",
        value: function onClick() {
            if (!this.clicked) {
                this.af = 0.5;
            } else {
                this.af = 0.1;
            }
            stop.unclick();
            pause.unclick();
            this.clicked = !this.clicked;
            this.drawAndUpdate();
            line.drawAndUpdate();
        }
    }, {
        key: "mouseOver",
        value: function mouseOver() {
            this.a = 1;
            this.drawAndUpdate();
        }
    }, {
        key: "mouseOut",
        value: function mouseOut() {
            this.a = 0.5;
            this.drawAndUpdate();
        }
    }]);

    return PlayButton;
}();

var Circle = function () {
    function Circle(i, j, cSize) {
        _classCallCheck(this, Circle);

        this.radius = 30 * (cSize / 650); //radius
        this.x = (40 + i * 70) * (cSize / 650); //x cordinate
        this.y = (40 + j * 70) * (cSize / 650); //y cordinate
        this.r = 0; //red
        this.b = Math.floor(255 - 25 * i); //blue
        this.g = Math.floor(255 - 5 * j); //green
        this.a = 0.5; //aplha
        this.af = 0.1; //aplha fill
        this.cSize = cSize;
        this.clicked = false;

        this.shape = new __WEBPACK_IMPORTED_MODULE_0_createjs___default.a.Shape();
        this.shape.x = this.x;
        this.shape.y = this.y;
        stage.addChild(this.shape);
        this.shape.on("click", this.onClick.bind(this));
        this.shape.on("mouseover", this.mouseOver.bind(this));
        this.shape.on("mouseout", this.mouseOut.bind(this));
    }

    _createClass(Circle, [{
        key: "draw",
        value: function draw() {
            this.shape.graphics.clear().beginFill('rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.af + ')').setStrokeStyle(3 * (this.cSize / 650), 'round', 'round').beginStroke('rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')').drawCircle(0, 0, this.radius).endFill().endStroke();
        }
    }, {
        key: "drawAndUpdate",
        value: function drawAndUpdate() {
            this.draw();
            stage.update();
        }
    }, {
        key: "onClick",
        value: function onClick() {
            if (!this.clicked) {
                this.af = 0.5;
            } else {
                this.af = 0.1;
            }
            this.clicked = !this.clicked;
            this.drawAndUpdate();
        }
    }, {
        key: "mouseOver",
        value: function mouseOver() {
            this.a = 1;
            this.drawAndUpdate();
        }
    }, {
        key: "mouseOut",
        value: function mouseOut() {
            this.a = 0.5;
            this.drawAndUpdate();
        }
    }]);

    return Circle;
}();

var Line = function () {
    function Line(cSize) {
        _classCallCheck(this, Line);

        this.x = 0; //x cordinate
        this.y = 0; //y cordinate
        this.length = 560 * (cSize / 650);
        this.r = 255; //red
        this.b = 0; //blue
        this.g = 0; //green
        this.a = 0.5; //aplha fill
        this.cSize = cSize;
        this.moving = false;

        this.shape = new __WEBPACK_IMPORTED_MODULE_0_createjs___default.a.Shape();
        this.shape.x = this.x;
        this.shape.y = this.y;
        stage.addChild(this.shape);
    }

    _createClass(Line, [{
        key: "draw",
        value: function draw() {
            if (stop.clicked) {
                this.r = 247;
                this.b = 0;
                this.g = 0;
                this.x = 0;
            }
            if (play.clicked) {
                this.r = 0;
                this.b = 27;
                this.g = 237;
            }
            if (pause.clicked) {
                this.r = 247;
                this.b = 0;
                this.g = 239;
            }
            this.shape.graphics.clear().setStrokeStyle(15 * (this.cSize / 650), 'round', 'round').beginStroke('rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')').moveTo(this.x, this.y).lineTo(this.x, this.length).endStroke();
        }
    }, {
        key: "drawAndUpdate",
        value: function drawAndUpdate() {
            this.draw();
            stage.update();
        }
    }]);

    return Line;
}();

//functions//


function initCanvas() {
    canvas = document.getElementById('tutorial');
    ctx = canvas.getContext('2d');
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    draw();
}
window.initCanvas = initCanvas;
function reInitCanvas() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    draw();
}
window.reInitCanvas = reInitCanvas;
function tick() /*e*/{
    if (play.clicked) {
        if (line.x < 560 * (cSize / 650)) {
            line.x = line.x + speed * (cSize / 650);
            line.draw();
            stage.update();
        } else {
            line.x = 0;
        }
    }
}

function draw() {
    stage = new __WEBPACK_IMPORTED_MODULE_0_createjs___default.a.Stage(canvas);
    stage.enableMouseOver(30);
    var list = new Array();
    cSize = 0;
    if (ctx.canvas.width > ctx.canvas.height) {
        cSize = ctx.canvas.height;
    } else {
        cSize = ctx.canvas.width;
    }

    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            var curr = new Circle(i, j, cSize);
            curr.draw();
            list.push(curr);
        }
    }
    play = new PlayButton(cSize);
    play.draw();
    stop = new StopButton(cSize);
    stop.draw();
    pause = new PauseButton(cSize);
    pause.draw();
    line = new Line(cSize);
    line.draw();
    __WEBPACK_IMPORTED_MODULE_0_createjs___default.a.Ticker.addEventListener("tick", tick);

    stage.update();
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = createjs;

/***/ })
/******/ ]);