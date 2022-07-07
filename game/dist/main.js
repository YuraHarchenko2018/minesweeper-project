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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render */ \"./src/render.js\");\n\n\nclass Helper {\n\n    static countingSequence = [\n        [ -1, -1 ],\n        [ -1, 0],\n        [ -1, 1 ],\n        [ 0, -1 ],\n        [ 0, 1 ],\n        [ 1, -1 ],\n        [ 1, 0 ],\n        [ 1, 1 ],\n    ]\n\n    static getRandomInt(min, max) {\n        min = Math.ceil(min);\n        max = Math.floor(max);\n        return Math.floor(Math.random() * (max - min + 1)) + min;\n    }\n\n    static shuffle(array) {\n        let currentIndex = array.length,  randomIndex;\n      \n        // While there remain elements to shuffle.\n        while (currentIndex != 0) {\n      \n          // Pick a remaining element.\n          randomIndex = Math.floor(Math.random() * currentIndex);\n          currentIndex--;\n      \n          // And swap it with the current element.\n          [array[currentIndex], array[randomIndex]] = [\n            array[randomIndex], array[currentIndex]];\n        }\n      \n        return array;\n    }\n\n    static chunk_inefficient(array, chunkSize) {\n        // - array например [1, 2, 3, 4, 5, 6], chunkSize например 3\n        // - concat делает из [5] и [1, 2, 3] = [5].concat([1, 2, 3]) -> [5, 1, 2, 3]\n        // - apply первым параметром принимает новый контекст, в данном случае это пустой массив\n        // - apply вторым параметром передает функции concat ее агрумент, типо [[[1, 2]], [], [[3, 4]]]\n        // - второй аргумер это функция map, которая на четное число делает новый масив\n        //      через slice, например [[1, 2, 3]], а на четное просто пустой массив []\n        // - в конце функция concat раскрывает массив переданный в аргументе\n        //       например  [[[1, 2]], [], [[3, 4]]] ->  [[1, 2], [3, 4]]\n        return [].concat.apply(\n            [],\n            array.map(function (elem, i) {\n                return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];\n            })\n        );\n    }\n\n    static getSafeBombArray(state, cellRowNumber, cellPositionNumber) {\n        let bombGridAsocArray = _render__WEBPACK_IMPORTED_MODULE_0__[\"default\"].generateBombGridAsocArray(state)\n        let bombNearbyCount = Helper.bombNearbyCounterForBombGridAsocArray(bombGridAsocArray, cellRowNumber, cellPositionNumber)\n\n        // is click was on a danger cell: regenerate\n        if (bombGridAsocArray[cellRowNumber][cellPositionNumber] === true || bombNearbyCount !== 0) {\n            bombGridAsocArray = Helper.getSafeBombArray(state, cellRowNumber, cellPositionNumber)\n        }\n\n        return bombGridAsocArray\n    }\n\n    static bombNearbyCounterForBombGridAsocArray(bombGridAsocArray, cellRowNumber, cellPositionNumber) {\n        let finalScore = 0\n\n        // realization for counting nearby cell score\n        for (let i = 0; i < Helper.countingSequence.length; i++) {\n            const rowShiftNumber = cellRowNumber + Helper.countingSequence[i][0];\n            const positionShiftNumber = cellPositionNumber + Helper.countingSequence[i][1];\n\n            let midValue = (typeof bombGridAsocArray[rowShiftNumber] == 'undefined') ? 0 : (bombGridAsocArray[rowShiftNumber][positionShiftNumber] ? 1 : 0)\n\n            finalScore += midValue\n        }\n\n        return finalScore\n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Helper);\n\n//# sourceURL=webpack://minesweeper-ts/./src/helper.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper */ \"./src/helper.js\");\n/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render */ \"./src/render.js\");\n\n\n\nclass Game {\n\n    constructor() {\n        this.state = {\n            gameStyle: 'demining',\n            timerCounter: 'ready',\n            amountOfBomb: 0,\n            involvedСells: 0,\n            cellsCount: 0,\n            openedCells: [],\n            cells: []\n        }\n\n        this.selectedLevelState = {}\n        \n        this.easyLevelState = {\n            maxInRow: 9,\n            maxInColumn: 9,\n            dangerousCellsAmount: 10, \n        }\n        \n        this.middleLevelState = {\n            maxInRow: 16,\n            maxInColumn: 16,\n            dangerousCellsAmount: 40, \n        }\n        \n        this.hardLevelState = {\n            maxInRow: 30,\n            maxInColumn: 16,\n            dangerousCellsAmount: 99, \n        }\n\n        this.time = 0\n        this.flagAmount = 0\n        this.flagedCellsArray = []\n    }\n\n    main() {\n        this.initElementSelectors()\n\n        this.handleEasyOptionBtn()\n        this.handleMiddleOptionBtn()\n        this.handleHardOptionBtn()\n\n        this.handleRestartGameBtn()\n        this.handleBackToMenuBtn()\n    }\n\n    initElementSelectors() {\n        this.mineFlag = document.querySelector('#mine-flag')\n        this.mineBullseye = document.querySelector('#mine-bullseye')\n        \n        this.timerCounterElement = document.querySelector(\"#timer-counter\")\n        this.bombCounterElement = document.querySelector(\"#bomb-counter\")\n\n        this.controllerWrapperElement = document.querySelector(\".controllerWrapper\")\n        this.difficultyWrapperElement = document.querySelector(\".difficultyWrapper\")\n        this.fieldElement = document.querySelector(\".field\")\n\n        this.easyOptionBtn = document.querySelector(\"#easyOption\")\n        this.middleOptionBtn = document.querySelector(\"#middleOption\")\n        this.hardOptionBtn = document.querySelector(\"#hardOption\")\n\n        this.gameResultsElement = document.querySelector(\".game-results\")\n        this.gameResultsTitle = document.querySelector(\".game-results-title\")\n        this.restartGameBtn = document.querySelector(\"#restart-game-btn\")\n        this.backToMenuBtn = document.querySelector(\"#menu-btn\")\n        \n    }\n\n    handleBackToMenuBtn() {\n        this.backToMenuBtn.onclick = () => {\n            location.reload()\n        }\n    }\n\n    handleRestartGameBtn() {\n        this.restartGameBtn.onclick = () => {\n            this.state = {\n                gameStyle: 'demining',\n                timerCounter: 'ready',\n                amountOfBomb: 0,\n                involvedСells: 0,\n                cellsCount: 0,\n                openedCells: [],\n                cells: []\n            }\n\n            this.completeState(this.selectedLevelState)\n            this.time = 0\n\n            this.render()\n        }\n    }\n\n    handleEasyOptionBtn() {\n        this.easyOptionBtn.onclick = (e) => {\n            this.selectedLevelState = this.easyLevelState\n            this.completeState(this.selectedLevelState)\n            this.initGame()\n        }\n    }\n\n    handleMiddleOptionBtn() {\n        this.middleOptionBtn.onclick = (e) => {\n            this.selectedLevelState = this.middleLevelState\n            this.completeState(this.selectedLevelState)\n            this.initGame()\n        }\n    }\n\n    handleHardOptionBtn() {\n        this.hardOptionBtn.onclick = (e) => {\n            this.selectedLevelState = this.hardLevelState\n            this.completeState(this.selectedLevelState)\n            this.initGame()\n        }\n    }\n\n    completeState(levelState) {\n        this.state = {...this.state, ...levelState}\n        this.state.cellsCount = this.state.maxInRow * this.state.maxInColumn\n    }\n\n    initGame() {\n        // first render\n        this.render()\n\n        // set handlers\n        this.handleForGameStyle()\n        this.handleCellsClick()\n    }\n\n    render() {\n        // hide other windows\n        _render__WEBPACK_IMPORTED_MODULE_1__[\"default\"].setDisplayStatusForElement(this.difficultyWrapperElement, 'none')\n        _render__WEBPACK_IMPORTED_MODULE_1__[\"default\"].setDisplayStatusForElement(this.gameResultsElement, 'none')\n        _render__WEBPACK_IMPORTED_MODULE_1__[\"default\"].setDisplayStatusForElement(this.controllerWrapperElement, 'flex')\n\n        // set up info bar data\n        _render__WEBPACK_IMPORTED_MODULE_1__[\"default\"].setContent(this.bombCounterElement, this.state.dangerousCellsAmount)\n        _render__WEBPACK_IMPORTED_MODULE_1__[\"default\"].setContent(this.timerCounterElement, '')\n\n        // clear cells\n        _render__WEBPACK_IMPORTED_MODULE_1__[\"default\"].removeContent(this.fieldElement)\n\n        let RenderInstance = new _render__WEBPACK_IMPORTED_MODULE_1__[\"default\"]()\n            RenderInstance.renderCells(this.state)\n        \n        this.state.amountOfBomb = this.state.dangerousCellsAmount\n        this.flagAmount = this.state.dangerousCellsAmount\n        this.flagedCellsArray = []\n        this.state.cells = RenderInstance.cellsState\n    }\n\n\n    // ------------------\n    // handlers gamestyle\n    // ------------------\n\n    handleForGameStyle() {\n        this.mineFlag.onclick = this.mineFlagOnClick.bind(this)\n        this.mineBullseye.onclick =  this.mineBullseyeOnClick.bind(this)\n\n        document.body.onkeydown = (e) => {\n            if (e.code == \"MetaLeft\" || e.code == \"ControlLeft\") this.mineBullseyeOnClick()\n        }\n\n        document.body.onkeyup = (e) => {\n            if (e.code == \"MetaLeft\" || e.code == \"ControlLeft\") this.mineFlagOnClick()\n\n            if (e.code == \"Space\") {\n                if (this.state.gameStyle == 'demining') {\n                    this.mineBullseyeOnClick()\n                } else if (this.state.gameStyle == 'flaging') {\n                    this.mineFlagOnClick()\n                }\n            }\n        }\n\n        \n    }\n\n    mineFlagOnClick() {\n        this.state.gameStyle = 'demining'\n\n        this.mineFlag.style.display = 'none'\n        this.mineBullseye.style.display = 'block'\n    }\n\n    mineBullseyeOnClick() {\n        this.state.gameStyle = 'flaging'\n\n        this.mineBullseye.style.display = 'none'\n        this.mineFlag.style.display = 'block'\n    }\n\n    // ----------------------\n    // releave click handlers\n    // ----------------------\n\n    handleCellsClick() {\n        window.addEventListener('click', (e) => {\n            if(e.target.classList.contains('cell')) {\n                let cellRowNumber = Number(e.target.dataset.rowNumber)\n                let cellPositionNumber = Number(e.target.dataset.positionNumber)\n\n                // first click\n                if (this.state.timerCounter == 'ready') {\n                    // setup: timer\n                    this.state.timerCounter = 'go'\n                    this.timerCounterInterval = setInterval(() => {\n                        this.time = this.time + 1\n\n                        let minutes = Math.floor(this.time / 60);\n                        let seconds = this.time % 60\n                        let timeFormated = (minutes) ? `${minutes} Minutes and ${seconds} Seconds` : `${seconds} Seconds`\n                        _render__WEBPACK_IMPORTED_MODULE_1__[\"default\"].setContent(this.timerCounterElement, timeFormated)\n                    }, 1000)\n\n                    // setup: dangers cels\n                    let bombGridAsocArray = _helper__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getSafeBombArray(this.state, cellRowNumber, cellPositionNumber)\n\n                    for (let i = 0; i < this.state.cells.length; i++) {\n                        const subArray = this.state.cells[i];\n\n                        for (let j = 0; j < subArray.length; j++) {\n                            const cell = subArray[j];\n                                  cell.isDangerous = bombGridAsocArray[i][j]\n                            this.state.cells[i][j] = cell\n                        }\n                    }\n                }\n\n                // demining logic\n                if(this.state.gameStyle === \"demining\") {\n\n                    // only if not was flagged\n                    if(e.target.id != \"flagged\") {\n\n                        // for mines | END | Loose\n                        if(this.state.cells[cellRowNumber][cellPositionNumber].isDangerous) {\n                            this.bombCellClickProcessing(e.target)\n                        }\n                        \n                        // for common\n                        if(!this.state.cells[cellRowNumber][cellPositionNumber].isDangerous) {\n                            this.commonCellClickProcessing(e.target, cellRowNumber, cellPositionNumber)\n                        }\n\n                        // END\n                        if(this.state.amountOfBomb <= 0 && this.state.involvedСells == this.state.cellsCount) {\n                            this.winCondifionProcessing()\n                        }\n\n                    }\n\n                } else {\n                    // flagging logic\n\n                    // when open cells - clear mismarket bombcells ????\n                    if (this.state.openedCells.includes(String(cellRowNumber) + \"-\" + String(cellPositionNumber))) {\n                        return;\n                    }\n\n                    if(e.target.id == \"flagged\") {\n                        e.target.id = ''\n                        e.target.classList.remove(\"fa\");\n                        e.target.classList.remove(\"fa-flag\");\n\n                        this.state.involvedСells--\n                        this.flagAmount++\n                        this.flagedCellsArray.push(String(cellRowNumber) + \"-\" + String(cellPositionNumber))\n\n                        if(this.state.cells[cellRowNumber][cellPositionNumber].isDangerous) {\n                            this.state.amountOfBomb++\n                        } else {\n                            this.state.amountOfBomb--\n                        }\n\n                    } else {\n                        // if flags is not over\n                        if (this.flagAmount > 0) {\n\n                            if(this.state.cells[cellRowNumber][cellPositionNumber].isDangerous) {\n                                this.state.amountOfBomb--\n                            } else {\n                                this.state.amountOfBomb++\n                            }\n    \n                            if(this.state.amountOfBomb >= 0 && !e.target.classList.contains('openedCell')) {\n                                e.target.id = \"flagged\"\n                                e.target.classList.add(\"fa\")\n                                e.target.classList.add(\"fa-flag\")\n    \n                                this.state.involvedСells++\n                                this.flagAmount--\n                                this.flagedCellsArray.push(String(cellRowNumber) + \"-\" + String(cellPositionNumber))\n                            }\n                            \n                        }\n                    }\n\n                    _render__WEBPACK_IMPORTED_MODULE_1__[\"default\"].setContent(this.bombCounterElement, this.flagAmount)\n\n                    // END\n                    if(this.state.amountOfBomb <= 0 && this.state.involvedСells == this.state.cellsCount) {\n                        this.winCondifionProcessing()\n                    }\n\n                }\n            }\n        })\n    }\n\n    bombCellClickProcessing(target) {\n        target.style.background = \"#cc0000\"\n        target.classList.add('fa')\n        target.classList.add('fa-bomb')\n\n        clearInterval(this.timerCounterInterval)\n\n        let bombAmount = this.state.amountOfBomb\n        let looseTitle = `You lose in ${this.time} seconds ${bombAmount} ${bombAmount > 1 ? 'bombs' : 'bomb'} remain`\n        _render__WEBPACK_IMPORTED_MODULE_1__[\"default\"].setContent(this.gameResultsTitle, looseTitle)\n\n        _render__WEBPACK_IMPORTED_MODULE_1__[\"default\"].setDisplayStatusForElement(this.gameResultsElement, 'block')\n        _render__WEBPACK_IMPORTED_MODULE_1__[\"default\"].setDisplayStatusForElement(this.controllerWrapperElement, 'none')\n        this.gameResultsElement.style.background = \"linear-gradient(-45deg, #ee7752, #e73c7e, #e73c7e, #e73c3c)\"\n    }\n\n    winCondifionProcessing() {\n        clearInterval(this.timerCounterInterval)\n        _render__WEBPACK_IMPORTED_MODULE_1__[\"default\"].setContent(this.gameResultsTitle, `You win in ${this.time} seconds`)\n        _render__WEBPACK_IMPORTED_MODULE_1__[\"default\"].setDisplayStatusForElement(this.gameResultsElement, 'block')\n        this.gameResultsElement.style.background = \"linear-gradient(-45deg, #234cd5, #23a6d5, #23a6d5, #23d5ab)\"\n        \n        const queryString = location.search;\n        const urlParams = new URLSearchParams(queryString);\n        const id = urlParams.get('id')\n\n        let score = this.time\n        let xhttp = new XMLHttpRequest()\n            xhttp.open(\"GET\", `${location.hostname}/highscore/${score}?id=${id}`, true);\n            xhttp.send();\n    }\n\n    commonCellClickProcessing(target, cellRowNumber, cellPositionNumber) {\n        if (!this.state.openedCells.includes(String(cellRowNumber) + \"-\" +  String(cellPositionNumber))) {\n            this.state.involvedСells++\n            this.state.openedCells.push(String(cellRowNumber) + \"-\" +  String(cellPositionNumber))\n        } else {\n            // for miss-choosen flag set (need remove amoun, its hust style)\n            target.style.background = 'white'\n            return;\n        }\n\n        let finalScore = this.bombNearbyCounter(cellRowNumber, cellPositionNumber)\n\n        this.revealCell(target, finalScore)\n\n        // сделать норм управление стилями и хранение данных про flagged\n        // if(!this.state.cells[cellRowNumber][cellPositionNumber].isDangerous && ) {\n        //     this.state.amountOfBomb--\n        // }\n        \n        if (finalScore === 0) {\n            this.revealNeighboars(cellRowNumber, cellPositionNumber)\n        }\n\n        // for simplify a game process\n        // if (finalScore === 1) {\n        //     this.revealNeighboarsForASingle(cellRowNumber, cellPositionNumber)\n        // }\n    }\n\n    // commonCellClickProcessing\n    bombNearbyCounter(cellRowNumber, cellPositionNumber) {\n        let finalScore = 0\n\n        // realization for counting nearby cell score\n        for (let i = 0; i < _helper__WEBPACK_IMPORTED_MODULE_0__[\"default\"].countingSequence.length; i++) {\n            const rowShiftNumber = cellRowNumber + _helper__WEBPACK_IMPORTED_MODULE_0__[\"default\"].countingSequence[i][0];\n            const positionShiftNumber = cellPositionNumber + _helper__WEBPACK_IMPORTED_MODULE_0__[\"default\"].countingSequence[i][1];\n\n            let midValue = (typeof this.state.cells[rowShiftNumber] == 'undefined') ? 0 : (this.state.cells[rowShiftNumber][positionShiftNumber]?.isDangerous ? 1 : 0)\n\n            finalScore += midValue\n        }\n\n        return finalScore\n    }\n\n    // commonCellClickProcessing\n    revealCell(target, finalScore) {\n        target.classList.remove(\"fa\")\n        target.classList.remove(\"fa-flag\")\n        target.classList.add('openedCell')\n        target.innerText = finalScore != 0 ? finalScore : ''\n    }\n\n    // commonCellClickProcessing\n    revealNeighboars(cellRowNumber, cellPositionNumber) {\n        for (let i = 0; i < _helper__WEBPACK_IMPORTED_MODULE_0__[\"default\"].countingSequence.length; i++) {\n            const rowShiftNumber = cellRowNumber + _helper__WEBPACK_IMPORTED_MODULE_0__[\"default\"].countingSequence[i][0];\n            const positionShiftNumber = cellPositionNumber + _helper__WEBPACK_IMPORTED_MODULE_0__[\"default\"].countingSequence[i][1];\n\n            let HTMLelement = document.querySelector(`div[data-row-number=\"${rowShiftNumber}\"][data-position-number=\"${positionShiftNumber}\"]`)\n\n            if(HTMLelement != null) {\n                this.commonCellClickProcessing(HTMLelement, rowShiftNumber, positionShiftNumber)\n            }\n        }\n    }\n\n    revealNeighboarsForASingle(cellRowNumber, cellPositionNumber) {\n        let isHaveBombnearby = false\n\n        // if have marked bomb nearby\n        for (let i = 0; i < _helper__WEBPACK_IMPORTED_MODULE_0__[\"default\"].countingSequence.length; i++) {\n            const rowShiftNumber = cellRowNumber + _helper__WEBPACK_IMPORTED_MODULE_0__[\"default\"].countingSequence[i][0];\n            const positionShiftNumber = cellPositionNumber + _helper__WEBPACK_IMPORTED_MODULE_0__[\"default\"].countingSequence[i][1];\n\n            if(this.flagedCellsArray.includes(String(rowShiftNumber) + \"-\" +  String(positionShiftNumber))) {\n                isHaveBombnearby = true\n            }\n\n        }\n\n        if (isHaveBombnearby) {\n            for (let i = 0; i < _helper__WEBPACK_IMPORTED_MODULE_0__[\"default\"].countingSequence.length; i++) {\n                const rowShiftNumber = cellRowNumber + _helper__WEBPACK_IMPORTED_MODULE_0__[\"default\"].countingSequence[i][0];\n                const positionShiftNumber = cellPositionNumber + _helper__WEBPACK_IMPORTED_MODULE_0__[\"default\"].countingSequence[i][1];\n    \n\n                // let test2424 = (typeof this.state.cells[rowShiftNumber] == 'undefined') ? 0 : (this.state.cells[rowShiftNumber][positionShiftNumber]?.isDangerous ? 1 : 0)\n                // if(test2424) {\n                if(!this.flagedCellsArray.includes(String(rowShiftNumber) + \"-\" +  String(positionShiftNumber))) {\n                    let HTMLelement = document.querySelector(`div[data-row-number=\"${rowShiftNumber}\"][data-position-number=\"${positionShiftNumber}\"]`)\n        \n                    if(HTMLelement != null) {\n                        this.commonCellClickProcessing(HTMLelement, rowShiftNumber, positionShiftNumber)\n                    }\n                }\n            }\n        }\n    }\n}\n\nlet Game_ex = new Game()\n    Game_ex.main()\n\n//# sourceURL=webpack://minesweeper-ts/./src/index.js?");

/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper */ \"./src/helper.js\");\n\n\n\nclass Render {\n    constructor() {\n        this.field = document.querySelector('.field')\n        this.baseWidthCell = 42\n\n        this.cellsState = []\n    }\n\n    setUpGameFieldWidth(state) {\n        let fieldWidthValue = state.maxInRow * this.baseWidthCell\n        this.field.style.width = `${fieldWidthValue}px`\n    }\n\n    renderCells(state) {\n        this.setUpGameFieldWidth(state)\n\n        for (let j = 0; j < state.maxInColumn; j++) {\n            let midArray = []\n\n            for (let i = 0; i < state.maxInRow; i++) {\n                midArray.push({ \"isDangerous\": false, \"isOpen\": false })\n\n                // create element\n                let cell = document.createElement('div')\n                    cell.className = 'cell'\n                    cell.dataset.rowNumber = j\n                    cell.dataset.positionNumber = i\n\n                this.field.appendChild(cell)\n            }\n\n            // push row-array\n            this.cellsState.push(midArray)\n        }\n\n        console.dir(this.cellsState)\n    }\n\n    static generateBombGridAsocArray(state) {\n        let cellsAmount = state.maxInColumn * state.maxInRow\n        let bombGridArray = []\n\n        for (let i = 0; i < cellsAmount; i++) {\n            if (i < state.dangerousCellsAmount) {\n                bombGridArray.push(true)\n            } else {\n                bombGridArray.push(false)\n            }\n            \n        }\n\n        bombGridArray = _helper__WEBPACK_IMPORTED_MODULE_0__[\"default\"].shuffle(bombGridArray)\n        bombGridArray = _helper__WEBPACK_IMPORTED_MODULE_0__[\"default\"].chunk_inefficient(bombGridArray, state.maxInRow)\n\n        return bombGridArray\n    }\n\n    static removeContent(element) {\n        element.innerHTML = \"\"\n    }\n\n    static setContent(element, value = \"\") {\n        element.innerText = value\n    }\n\n    static setDisplayStatusForElement(element, status = 'none') {\n        element.style.display = status\n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Render);\n\n//# sourceURL=webpack://minesweeper-ts/./src/render.js?");

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