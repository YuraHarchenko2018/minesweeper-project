/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/helper.js":
/*!***********************!*\
  !*** ./src/helper.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n\n\nclass Helper {\n    static getRandomInt(min, max) {\n        min = Math.ceil(min);\n        max = Math.floor(max);\n        return Math.floor(Math.random() * (max - min + 1)) + min;\n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Helper);\n\n//# sourceURL=webpack://minesweeper-ts/./src/helper.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render */ \"./src/render.js\");\n\n\nclass Game {\n\n    constructor() {\n        this.state = {\n            gameStyle: 'demining',\n            timerCounter: 'ready',\n            amountOfBomb: 0,\n            involvedСells: 0,\n            cellsCount: 0,\n            openedCells: [],\n            cells: []\n        }\n        \n        this.easyLevelState = {\n            maxInRow: 9,\n            maxInColumn: 9,\n            approximateDangerousCellsAmount: 10, \n        }\n        \n        this.middleLevelState = {\n            maxInRow: 16,\n            maxInColumn: 16,\n            approximateDangerousCellsAmount: 40, \n        }\n        \n        this.hardLevelState = {\n            maxInRow: 30,\n            maxInColumn: 16,\n            approximateDangerousCellsAmount: 99, \n        }\n        \n        this.countingSequence = [\n            [ -1, -1 ],\n            [ -1, 0],\n            [ -1, 1 ],\n            [ 0, -1 ],\n            [ 0, 1 ],\n            [ 1, -1 ],\n            [ 1, 0 ],\n            [ 1, 1 ],\n        ]\n    }\n\n    main() {\n        this.initElementSelectors()\n\n        this.handleEasyOptionBtn()\n        this.handleMiddleOptionBtn()\n        this.handleHardOptionBtn()\n    }\n\n    initElementSelectors() {\n        this.mineFlag = document.querySelector('#mine-flag')\n        this.mineBullseye = document.querySelector('#mine-bullseye')\n        \n        this.timerCounterElement = document.querySelector(\"#timer-counter\")\n\n        this.difficultyWrapperElement = document.querySelector(\".difficultyWrapper\")\n\n        this.easyOptionBtn = document.querySelector(\"#easyOption\")\n        this.middleOptionBtn = document.querySelector(\"#middleOption\")\n        this.hardOptionBtn = document.querySelector(\"#hardOption\")\n    }\n\n    handleEasyOptionBtn() {\n        this.easyOptionBtn.onclick = (e) => {\n            this.completeState(this.easyLevelState)\n            this.difficultyWrapperElement.style.display = 'none'\n            this.initGame()\n        }\n    }\n\n    handleMiddleOptionBtn() {\n        this.middleOptionBtn.onclick = (e) => {\n            this.completeState(this.middleLevelState)\n            this.difficultyWrapperElement.style.display = 'none'\n            this.initGame()\n        }\n    }\n\n    handleHardOptionBtn() {\n        this.hardOptionBtn.onclick = (e) => {\n            this.completeState(this.hardLevelState)\n            this.difficultyWrapperElement.style.display = 'none'\n            this.initGame()\n        }\n    }\n\n    completeState(levelState) {\n        this.state = {...this.state, ...levelState}\n        this.state.cellsCount = this.state.maxInRow * this.state.maxInColumn\n    }\n\n    initGame() {\n        // first render\n        this.render()\n\n        // set handlers\n        this.handleForGameStyle()\n        this.handleCellsClick()\n    }\n\n    render() {\n        let RenderInstance = new _render__WEBPACK_IMPORTED_MODULE_0__[\"default\"]()\n            RenderInstance.renderCells(this.state)\n        \n        this.state.amountOfBomb = RenderInstance.amountOfBomb\n        this.state.cells = RenderInstance.cellsState\n    }\n\n\n    // ------------------\n    // handlers gamestyle\n    // ------------------\n\n    handleForGameStyle() {\n        this.mineFlag.onclick = this.mineFlagOnClick.bind(this)\n        this.mineBullseye.onclick =  this.mineBullseyeOnClick.bind(this)\n\n        document.body.onkeydown = (e) => {\n            if (e.code == \"MetaLeft\") this.mineBullseyeOnClick()\n        }\n\n        document.body.onkeyup = (e) => {\n            if (e.code == \"MetaLeft\") this.mineFlagOnClick()\n\n            if (e.code == \"Space\") {\n                if (this.state.gameStyle == 'demining') {\n                    this.mineBullseyeOnClick()\n                } else if (this.state.gameStyle == 'flaging') {\n                    this.mineFlagOnClick()\n                }\n            }\n        }\n\n        \n    }\n\n    mineFlagOnClick() {\n        this.state.gameStyle = 'demining'\n\n        this.mineFlag.style.display = 'none'\n        this.mineBullseye.style.display = 'block'\n    }\n\n    mineBullseyeOnClick() {\n        this.state.gameStyle = 'flaging'\n\n        this.mineBullseye.style.display = 'none'\n        this.mineFlag.style.display = 'block'\n    }\n\n    // ----------------------\n    // releave click handlers\n    // ----------------------\n\n    handleCellsClick() {\n        window.addEventListener('click', (e) => {\n            if(e.target.classList.contains('cell')) {\n                let cellRowNumber = Number(e.target.dataset.rowNumber)\n                let cellPositionNumber = Number(e.target.dataset.positionNumber)\n\n                // demining logic\n                if(this.state.gameStyle === \"demining\") {\n\n                    // only if not was flagged\n                    if(e.target.id != \"flagged\") {\n\n                        // for mines | END | Loose\n                        if(this.state.cells[cellRowNumber][cellPositionNumber].isDangerous) {\n                            e.target.style.background = \"#cc0000\"\n                            e.target.classList.add('fa')\n                            e.target.classList.add('fa-bomb')\n\n                            clearInterval(this.timerCounterInterval)\n                            setTimeout(()=>{alert(\"you loose\")}, 300)\n                            // location.reload()\n                        }\n                        \n                        // for common\n                        if(!this.state.cells[cellRowNumber][cellPositionNumber].isDangerous) {\n                            this.commonCellClickProcessing(e.target, cellRowNumber, cellPositionNumber)\n                        }\n\n                        console.dir(this.state.involvedСells)\n                        console.dir(\"amountOfBomb - \" + this.state.amountOfBomb)\n\n                        // END\n                        if(this.state.amountOfBomb <= 0 && this.state.involvedСells == this.state.cellsCount) {\n                            clearInterval(this.timerCounterInterval)\n                            setTimeout(()=>{alert(\"you win\")}, 100)\n                        }\n\n                    }\n\n                } else {\n                    // flagging logic\n\n                    // when open cells - clear mismarket bombcells ????\n                    if (this.state.openedCells.includes(String(cellRowNumber) + \"-\" + String(cellPositionNumber))) {\n                        return;\n                    }\n\n                    if(e.target.id == \"flagged\") {\n                        e.target.id = ''\n                        e.target.classList.remove(\"fa\");\n                        e.target.classList.remove(\"fa-flag\");\n                        this.state.involvedСells--\n                        console.dir(this.state.involvedСells)\n\n                        if(this.state.cells[cellRowNumber][cellPositionNumber].isDangerous) {\n                            this.state.amountOfBomb++\n                        } else {\n                            this.state.amountOfBomb--\n                        }\n\n                    } else {\n\n                        if(this.state.cells[cellRowNumber][cellPositionNumber].isDangerous) {\n                            this.state.amountOfBomb--\n                        } else {\n                            this.state.amountOfBomb++\n                        }\n\n                        if(this.state.amountOfBomb >= 0 && !e.target.classList.contains('openedCell')) {\n                            e.target.id = \"flagged\"\n                            e.target.classList.add(\"fa\")\n                            e.target.classList.add(\"fa-flag\")\n                            this.state.involvedСells++\n                        }\n                    }\n\n                    console.dir(this.state.involvedСells)\n                    console.dir(\"amountOfBomb - \" + this.state.amountOfBomb)\n\n                    // END\n                    if(this.state.amountOfBomb <= 0 && this.state.involvedСells == this.state.cellsCount) {\n                        clearInterval(this.timerCounterInterval)\n                        setTimeout(()=>{alert(\"you win\")}, 100)\n                    }\n\n                }\n            }\n        })\n    }\n\n    commonCellClickProcessing(target, cellRowNumber, cellPositionNumber) {\n        if (this.state.timerCounter == 'ready') {\n            this.state.timerCounter = 'go'\n            this.timerCounterInterval = setInterval(() => {\n                this.timerCounterElement.innerText = Number(this.timerCounterElement.innerText) + 1\n            }, 1000)\n        }\n\n        if (!this.state.openedCells.includes(String(cellRowNumber) + \"-\" +  String(cellPositionNumber))) {\n            this.state.involvedСells++\n            console.dir(this.state.involvedСells)\n            this.state.openedCells.push(String(cellRowNumber) + \"-\" +  String(cellPositionNumber))\n        } else {\n            return;\n        }\n\n        let finalScore = this.bombNearbyCounter(cellRowNumber, cellPositionNumber)\n\n        this.revealCell(target, finalScore)\n\n        // сделать норм управление стилями и хранение данных про flagged\n        // if(!this.state.cells[cellRowNumber][cellPositionNumber].isDangerous && ) {\n        //     this.state.amountOfBomb--\n        // }\n        \n        if (finalScore === 0) {\n            this.revealNeighboars(finalScore, cellRowNumber, cellPositionNumber)\n        }\n    }\n\n    // commonCellClickProcessing\n    bombNearbyCounter(cellRowNumber, cellPositionNumber) {\n        let finalScore = 0\n\n        // realization for counting nearby cell score\n        for (let i = 0; i < this.countingSequence.length; i++) {\n            const rowShiftNumber = cellRowNumber + this.countingSequence[i][0];\n            const positionShiftNumber = cellPositionNumber + this.countingSequence[i][1];\n\n            let midValue = (typeof this.state.cells[rowShiftNumber] == 'undefined') ? 0 : (this.state.cells[rowShiftNumber][positionShiftNumber]?.isDangerous ? 1 : 0)\n\n            finalScore += midValue\n        }\n\n        return finalScore\n    }\n\n    // commonCellClickProcessing\n    revealCell(target, finalScore) {\n        target.classList.remove(\"fa\")\n        target.classList.remove(\"fa-flag\")\n        target.classList.add('openedCell')\n        target.innerText = finalScore != 0 ? finalScore : ''\n    }\n\n    // commonCellClickProcessing\n    revealNeighboars(finalScore, cellRowNumber, cellPositionNumber) {\n        for (let i = 0; i < this.countingSequence.length; i++) {\n            const rowShiftNumber = cellRowNumber + this.countingSequence[i][0];\n            const positionShiftNumber = cellPositionNumber + this.countingSequence[i][1];\n\n            let HTMLelement = document.querySelector(`div[data-row-number=\"${rowShiftNumber}\"][data-position-number=\"${positionShiftNumber}\"]`)\n\n            if(HTMLelement != null) {\n                this.commonCellClickProcessing(HTMLelement, rowShiftNumber, positionShiftNumber)\n            }\n        }\n    }\n}\n\nlet Game_ex = new Game()\n    Game_ex.main()\n\n//# sourceURL=webpack://minesweeper-ts/./src/index.js?");

/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper */ \"./src/helper.js\");\n\n\n\nclass Render {\n    constructor() {\n        this.field = document.querySelector('.field')\n        this.baseWidthCell = 42\n\n        this.amountOfBomb = 0\n        this.cellsState = []\n    }\n\n    setUpGameFieldWidth(state) {\n        let fieldWidthValue = state.maxInRow * this.baseWidthCell\n        this.field.style.width = `${fieldWidthValue}px`\n    }\n\n    renderCells(state) {\n        this.setUpGameFieldWidth(state)\n\n        let localCellsCount = state.cellsCount\n        let approximateBombAmount = state.approximateDangerousCellsAmount\n\n        for (let j = 0; j < state.maxInColumn; j++) {\n            let midArray = []\n\n            for (let i = 0; i < state.maxInRow; i++) {\n                let percentageOfDangerousCells = approximateBombAmount/localCellsCount * 100\n                let isDangerous = (_helper__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getRandomInt(0, 100) <= percentageOfDangerousCells && approximateBombAmount > 0) ? true : false\n        \n                midArray.push({ \"isDangerous\": isDangerous, \"isOpen\": false })\n\n                isDangerous ? approximateBombAmount-- : localCellsCount--\n\n                // create element\n                let cell = document.createElement('div')\n                    cell.className = 'cell'\n                    cell.dataset.rowNumber = j\n                    cell.dataset.positionNumber = i\n\n                if(isDangerous) {\n                    // cell.style.background = \"red\"\n                    this.amountOfBomb++\n                }\n\n                this.field.appendChild(cell)\n            }\n\n            // push row-array\n            this.cellsState.push(midArray)\n        }\n\n        // if (state.approximateDangerousCellsAmount != this.amountOfBomb) {\n        //     this.field.innerHTML = ''\n        //     this.cellsState = []\n        //     this.amountOfBomb = 0\n        //     this.renderCells(state)\n        // }\n\n        console.dir(this.cellsState)\n    }\n\n    determineIsDangerStatus() {\n        \n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Render);\n\n//# sourceURL=webpack://minesweeper-ts/./src/render.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;