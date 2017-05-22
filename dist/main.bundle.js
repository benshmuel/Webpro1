webpackJsonp([1,4],{

/***/ 300:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* unused harmony export Board_Width */
/* unused harmony export Board_Height */
/* unused harmony export Board_mines */
/* unused harmony export CubeArr */
/* unused harmony export cubePosition */
/* unused harmony export flagesOverMines */
/* unused harmony export GameOver */
/* unused harmony export superOn */
/* unused harmony export CubeRadious */
/* unused harmony export resize */
/* unused harmony export ChangeCubeState */
/* unused harmony export boardInit */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GameService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var Board_Width;
var Board_Height;
var Board_mines;
var CubeArr = []; // any;
var cubePosition = 0;
var flagesOverMines = { hit: 0, miss: 0 };
var GameOver;
var superOn;
var CubeRadious = function (currentIndex, callFunc) {
    var isInRange = function (checkIndex) {
        if (checkIndex >= 0 && checkIndex < CubeArr.length) {
            callFunc(CubeArr[checkIndex]); // outside
        }
    };
    isInRange(currentIndex);
    if (currentIndex % Board_Width !== 0) {
        isInRange(currentIndex - 1);
        isInRange(currentIndex - Board_Width - 1);
        isInRange(currentIndex + Board_Width - 1);
    }
    if (currentIndex % Board_Width !== Board_Width - 1) {
        isInRange(currentIndex + 1);
        isInRange(currentIndex - Board_Width + 1);
        isInRange(currentIndex + Board_Width + 1);
    }
    isInRange(currentIndex - Board_Width);
    isInRange(currentIndex + Board_Width);
};
var resize;
var ChangeCubeState = function (Cube) {
    Cube.ChangeOpacity(1);
    if (!Cube.revealed && !Cube.flagged) {
        if (Cube.cubeValue === '*') {
        }
        else {
            Cube.revealed = true;
            if (Cube.cubeValue === 0) {
                Cube.Img = '../assets/clear.png';
                CubeRadious(Cube.cubeOnBoard, ChangeCubeState);
            }
            else {
                Cube.Img = 'assets/' + Cube.cubeValue + '.png';
            }
        }
    }
};
var boardInit = function () {
    for (var i = 0; i < CubeArr.length; i++) {
        CubeArr[i].Img = '../assets/cube.png';
        CubeArr[i].cubeOnBoard = i;
        CubeArr[i].cubeValue = 0;
        CubeArr[i].flagged = false;
        CubeArr[i].revealed = false;
        CubeArr[i].wid = resize;
        CubeArr[i].hei = resize;
        CubeArr[i].ChangeOpacity(1);
    }
};
var GameService = (function () {
    function GameService() {
        this.flagChanger = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.UserMessage = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
    }
    GameService.prototype.runGame = function (w, h, m) {
        var _this = this;
        this.UserMessage.next('');
        boardInit();
        superOn = false;
        flagesOverMines.miss = flagesOverMines.hit = 0;
        Board_Width = w / 1;
        Board_Height = h / 1;
        Board_mines = m / 1;
        if (GameOver) {
            boardInit();
        }
        GameOver = false;
        resize = this.calcSizeOfCube();
        this.flagsHandler();
        boardInit();
        setTimeout(function () {
            _this.GameInit();
            console.log('game ready');
        }, 30);
    };
    GameService.prototype.GameInit = function () {
        var addValueToCube = function (Cube) {
            if (Cube.cubeValue !== '*') {
                Cube.cubeValue++;
            }
        };
        for (var i = 0; i < Board_mines; i++) {
            var Position = Math.floor(Math.random() * CubeArr.length);
            if (CubeArr[Position].cubeValue !== '*') {
                CubeArr[Position].cubeValue = '*';
                CubeRadious(Position, addValueToCube);
            }
            else {
                i--;
            }
        }
    };
    GameService.prototype.getPosition = function () {
        return cubePosition++;
    };
    GameService.prototype.userClick = function (event, Cube) {
        if (!GameOver) {
            if (event.shiftKey) {
                if (flagesOverMines.hit + flagesOverMines.miss === Board_mines) {
                    alert('Whoops ! no more flags left :)');
                }
                else {
                    Cube.flagged = !Cube.flagged;
                    Cube.Img = Cube.flagged ? this.relvtImg(1) : this.relvtImg(0);
                    var selector = Cube.flagged ? 1 : -1;
                    Cube.cubeValue === '*' ? flagesOverMines.hit += selector : flagesOverMines.miss += selector;
                    this.flagsHandler();
                    if (flagesOverMines.hit === Board_mines) {
                        Cube.Img = this.relvtImg(1);
                        this.UserMessage.next('Winner !');
                        setTimeout(function () {
                            alert('Congratz ! you won !!');
                            ;
                            GameOver = true;
                        }, 100);
                    }
                }
            }
            else {
                if (Cube.cubeValue === '*') {
                    Cube.ChangeOpacity(1);
                    this.UserMessage.next('Game Over');
                    this.gameOver();
                }
                else {
                    ChangeCubeState(CubeArr[Cube.cubeOnBoard]);
                }
            }
        }
    };
    GameService.prototype.relvtImg = function (selector) {
        return selector === 0 ? '../assets/cube.png' : '../assets/flag.png';
    };
    GameService.prototype.gameOver = function () {
        GameOver = !GameOver;
        for (var i = 0; i < CubeArr.length; i++) {
            if (CubeArr[i].cubeValue === '*') {
                CubeArr[i].Img = '../assets/mine.png';
            }
        }
    };
    GameService.prototype.flagsHandler = function () {
        this.flagChanger.next(Board_mines - flagesOverMines.hit - flagesOverMines.miss);
    };
    GameService.prototype.calcSizeOfCube = function () {
        return (((10 / Board_Height) * 50) + 5) < 50 ? (((10 / Board_Height) * 50) + 11) : 50;
    };
    GameService.prototype.FillArray = function (arr) {
        CubeArr = arr.toArray();
        boardInit();
    };
    GameService.prototype.SupermanClick = function () {
        superOn = !superOn;
        var identifier = !superOn ? 1 : 0.2;
        if (CubeArr) {
            for (var i = 0; i < CubeArr.length; i++) {
                if (!CubeArr[i].revealed) {
                    CubeArr[i].ChangeOpacity(identifier);
                    superOn ? CubeArr[i].Img = 'assets/' + CubeArr[i].cubeValue + '.png' : CubeArr[i].Img = 'assets/cube.png';
                    CubeArr[i].flagged ? CubeArr[i].Img = 'assets/flag.png' : console.log();
                }
                else {
                    CubeArr[i].cubeValue === '*' ? CubeArr[i].Img = 'assets/mine.png' : console.log();
                }
            }
        }
    };
    GameService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Injectable */])(), 
        __metadata('design:paramtypes', [])
    ], GameService);
    return GameService;
}());
//# sourceMappingURL=/Users/benshmuel/webpro1/src/gameService.service.js.map

/***/ }),

/***/ 343:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 343;


/***/ }),

/***/ 344:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(432);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(456);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__(455);




if (__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=/Users/benshmuel/webpro1/src/main.js.map

/***/ }),

/***/ 452:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gameService_service__ = __webpack_require__(300);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CubeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CubeComponent = (function () {
    function CubeComponent(_gameService) {
        this._gameService = _gameService;
        this.CubeClicked = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* EventEmitter */]();
        this.Img = '../assets/cube.png';
        this.flagged = false;
        this.revealed = false;
        this.cubeValue = 0;
        this.cubeOnBoard = this._gameService.getPosition();
        // this._gameService.setCubeArr(this);
        this.wid = this.hei = this._gameService.calcSizeOfCube();
    }
    CubeComponent.prototype.clicker = function (event) {
        event.target.parentNode.onclick = this._gameService.userClick(event, this);
        console.log('clicked');
    };
    CubeComponent.prototype.resize = function () {
        this.wid = this.hei = this._gameService.calcSizeOfCube();
    };
    CubeComponent.prototype.ChangeOpacity = function (opacity) {
        this.opac = opacity;
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* Output */])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* EventEmitter */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* EventEmitter */]) === 'function' && _a) || Object)
    ], CubeComponent.prototype, "CubeClicked", void 0);
    CubeComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* Component */])({
            selector: 'cube',
            styles: [__webpack_require__(610)],
            template: "\n    <img src= {{Img}} (click)=\"clicker($event)\" [style.width.px]=\"wid\" [style.height.px]=\"hei\" [style.opacity]=\"opac\"  />\n  \n  "
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__gameService_service__["a" /* GameService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__gameService_service__["a" /* GameService */]) === 'function' && _b) || Object])
    ], CubeComponent);
    return CubeComponent;
    var _a, _b;
}());
//# sourceMappingURL=/Users/benshmuel/webpro1/src/Cube.component.js.map

/***/ }),

/***/ 453:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GameSettingsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var GameSettingsComponent = (function () {
    function GameSettingsComponent() {
        this.setGame = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* EventEmitter */]();
    }
    GameSettingsComponent.prototype.onClick = function (w, h, m) {
        this.setGame.emit({ w: w, h: h, m: m });
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* Output */])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* EventEmitter */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* EventEmitter */]) === 'function' && _a) || Object)
    ], GameSettingsComponent.prototype, "setGame", void 0);
    GameSettingsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* Component */])({
            selector: 'GameSettings',
            template: __webpack_require__(613),
            styles: [__webpack_require__(611)]
        }), 
        __metadata('design:paramtypes', [])
    ], GameSettingsComponent);
    return GameSettingsComponent;
    var _a;
}());
//# sourceMappingURL=/Users/benshmuel/webpro1/src/GameSettings.component.js.map

/***/ }),

/***/ 454:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gameService_service__ = __webpack_require__(300);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = (function () {
    function AppComponent(_gameService) {
        var _this = this;
        this._gameService = _gameService;
        this.revealed = false;
        this.controlsOn = false;
        this.dynWidth = 50;
        this.isready = true;
        this.flagsLeft = 5;
        _gameService.flagChanger.subscribe(function (value) {
            _this.flagsLeft = value;
        });
        _gameService.UserMessage.subscribe(function (msg) {
            _this.gameMessage = msg;
        });
    }
    AppComponent.prototype.createRange = function (TableValue) {
        var number = ((TableValue === 'w') ? this.Width : this.Height);
        var items = [];
        for (var i = 1; i <= number; i++) {
            items.push(i);
        }
        return items;
    };
    // data passed from GameSetting component
    AppComponent.prototype.setGameVals = function (event) {
        var _this = this;
        this.Width = event.w;
        this.Height = event.h;
        this.mines = Math.min(this.Width * this.Height, event.m);
        this.dynWidth = this._gameService.calcSizeOfCube() * 0.9; // making table properties dynamic
        this.dynHeight = this._gameService.calcSizeOfCube() * 0.9 - 2;
        this._gameService.runGame(this.Width, this.Height, this.mines);
        setTimeout(function () {
            console.log('woke up !!!!!!####!!');
            _this.Start();
        }, 25);
    };
    AppComponent.prototype.getControlsOnStyleDisplay = function () {
        if (this.controlsOn) {
            return 'block';
        }
        else {
            return 'show';
        }
    };
    AppComponent.prototype.Start = function () {
        this._gameService.FillArray(this.cub);
    };
    AppComponent.prototype.superman = function () {
        this._gameService.SupermanClick();
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* ViewChildren */])('cube'), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* QueryList */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* QueryList */]) === 'function' && _a) || Object)
    ], AppComponent.prototype, "cub", void 0);
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* Component */])({
            selector: 'app-root',
            providers: [__WEBPACK_IMPORTED_MODULE_1__gameService_service__["a" /* GameService */]],
            styles: [__webpack_require__(612)],
            template: " \n            <div class = \"gamePanel\">\n              <GameSettings (setGame)=\"setGameVals($event)\" >\n              </GameSettings>\n            </div>\n            \n            <div class=\"flag\" align=\"center\">\n            <label>{{flagsLeft}}</label>\n            <img src=\"../assets/mainflag.png\"/>\n              <label>{{ gameMessage }}</label>\n              <img (click)=\"superman()\" src=\"../assets/superman.png\"/>\n            </div>\n      \n    <table *ngIf=\"isready\">\n\n      <tbody>\n      <tr  *ngFor=\"let Row of createRange('h'); \">\n        <td *ngFor=\"let Cube of createRange('w');\" [style.width.px]=\"dynWidth\"  [style.height.px]=\"dynHeight\">\n          <div >\n            <cube  #cube [style.display]=\"getControlsOnStyleDisplay()\"></cube>\n          </div>\n         \n        </td>\n      </tr>\n\n\n      </tbody>\n\n\n    </table>\n\n  ",
            changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["X" /* ChangeDetectionStrategy */].OnPush
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__gameService_service__["a" /* GameService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__gameService_service__["a" /* GameService */]) === 'function' && _b) || Object])
    ], AppComponent);
    return AppComponent;
    var _a, _b;
}());
//# sourceMappingURL=/Users/benshmuel/webpro1/src/app.component.js.map

/***/ }),

/***/ 455:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(422);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(428);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(454);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__GameSettings_GameSettings_component__ = __webpack_require__(453);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Cube_Cube_component__ = __webpack_require__(452);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_5__GameSettings_GameSettings_component__["a" /* GameSettingsComponent */],
                __WEBPACK_IMPORTED_MODULE_6__Cube_Cube_component__["a" /* CubeComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */]
            ],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=/Users/benshmuel/webpro1/src/app.module.js.map

/***/ }),

/***/ 456:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=/Users/benshmuel/webpro1/src/environment.js.map

/***/ }),

/***/ 610:
/***/ (function(module, exports) {

module.exports = "img{\n  width: 50px;\n  height: 50px;\n  border-radius: 25px;\n\n}\n"

/***/ }),

/***/ 611:
/***/ (function(module, exports) {

module.exports = "body, div, dl, dt, dd, ul, ol, li,legend, h2, h3, h4, h5, h6,\npre, form, fieldset, input, textarea, p, blockquote, th, td {\n  padding:0;\n  margin:0;}\n\nfieldset, img {border:0}\n\nol, ul, li {list-style:none}\n\n:focus {outline:none}\n\nbody,\ninput,\ntextarea,\nselect {\n  font-family: 'Open Sans', sans-serif;\n  font-size: 10px;\n  color: #4c4c4c;\n}\n\n\nlegend {\n  font-size: 25px;\n  font-weight: 300;\n  color: #4c4c4c;\n  text-align: center;\n  padding-top: 10px;\n  margin-bottom: 10px;\n}\n\n\n.testbox {\n  cursor: pointer;\n  position: relative;\n  left: 0;\n  width: 125px;\n  height: 200px;\n  border-radius: 8px/7px;\n  background-color: #ebebeb;\n  box-shadow: 1px 2px 5px rgba(0,0,0,.31);\n  border: solid 1px #cbc9c9;\n  border-radius: 25px;\n}\n\ninput[type=radio] {\n  visibility: hidden;\n}\n\nform{\n  margin: 0 30px;\n}\n\nlabel {\n  text-indent: 18px;\n  overflow: visible;\n  display: inline-block;\n  margin-bottom: 4px;\n}\n\nhr{\n  color: #a9a9a9;\n  opacity: 0.5;\n}\n\ninput[type=text]{\n  width: 35px;\n  height: 20px;\n  border-radius: 0px 4px 4px 0px/5px 5px 4px 4px;\n  background-color: #fff;\n  box-shadow: 2px 2px 5px rgba(0,0,0,.09);\n  border: solid 1px #cbc9c9;\n  margin-left: 10px;\n  margin-top: -1px;\n  padding-left: 10px;\n\n}\n\n\n\n\n\n\n"

/***/ }),

/***/ 612:
/***/ (function(module, exports) {

module.exports = "@import url( https://fonts.googleapis.com/css?family=Montserrat );\nbody {\n  background : #cccccc;\n}\nimg.center {\n  display: block;\n  margin: 0 auto;\n}\ntable {\n  margin: auto;\n  position: relative;\n  top: 175px;\n  -webkit-user-select: none;\n}\ndiv, a {\n  position: relative;\n  text-align: center;\n  margin: auto;\n}\ntd {\n  position: relative;\n  border: 0px #163e78 solid;\n  padding: 0px;\n  margin: 0px;\n  width: 50px;\n  height: 50px;\n  text-align: center;\n  vertical-align: middle;\n  border-radius: 30px;\n}\n\ntable div {\n  position: absolute;\n  z-index: 1;\n  top: 0px;\n  left: 0px;\n  width: 30px;\n  height: 30px;\n}\ntr {\n  position: inherit;\n  top: 10px;\n  left: 0px;\n  width: 30px;\n  height: 30px;\n}\n\nimg{\n  width: 50px;\n  height: 50px;\n}\n.gamePanel{\n  position: absolute;\n  top: 8px;\n  left: 16px;\n  width: 250px;\n  height: 150px;\n}\n.flag {\n  width: 40px;\n  height: 40px;\n}\nlabel {\n  color: #ebebeb;\n  font-size: large;\n  font-family: \"Apple Braille\";\n}\n"

/***/ }),

/***/ 613:
/***/ (function(module, exports) {

module.exports = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n</head>\n<body>\n<div class=\"testbox\">\n  <fieldset>\n    <!-- Form Name -->\n    <legend>Settings</legend>\n  <hr>\n  <!-- Text input for Width-->\n    <div class=\"form-group\">\n      <label class=\"col-md-4 control-label\" for=\"WidthIn\">Width</label>\n      <div class=\"col-md-2\">\n        <input value=\"10\" #WidthIn id=\"WidthIn\" name=\"WidthIn\" type=\"text\" placeholder=\"10\" class=\"form-control input-md\">\n\n      </div>\n\n    </div>\n\n    <!-- Text input for Height-->\n    <div class=\"form-group\">\n      <label class=\"col-md-4 control-label\" for=\"HeightIn\">Height</label>\n      <div class=\"col-md-2\">\n        <input value=\"10\" #HeightIn id=\"HeightIn\" name=\"HeightIn\" type=\"text\" placeholder=\"10\" class=\"form-control input-md\">\n\n      </div>\n    </div>\n\n    <!-- Text input for mines-->\n    <div class=\"form-group\">\n      <label class=\"col-md-4 control-label\" for=\"MinesIn\">Mines</label>\n      <div class=\"col-md-2\">\n        <input value=\"5\" #MinesIn id=\"MinesIn\" name=\"MinesIn\" type=\"text\" placeholder=\"5\" class=\"form-control input-md\" >\n\n      </div>\n    </div>\n\n    <div class=\"container\" (click)=\"onClick(WidthIn.value,HeightIn.value,MinesIn.value)\">\n      <button class=\"btn btn-info\">\n        start game\n      </button>\n    </div>\n\n  </fieldset>\n</div>\n</body>\n</html>\n"

/***/ }),

/***/ 627:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(344);


/***/ })

},[627]);
//# sourceMappingURL=main.bundle.map