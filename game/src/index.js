import Helper from './helper'
import Render from './render'

class Game {

    constructor() {
        this.state = {
            gameStyle: 'demining',
            timerCounter: 'ready',
            amountOfBomb: 0,
            involvedСells: 0,
            cellsCount: 0,
            openedCells: [],
            cells: []
        }

        this.selectedLevelState = {}
        
        this.easyLevelState = {
            maxInRow: 9,
            maxInColumn: 9,
            dangerousCellsAmount: 10, 
        }
        
        this.middleLevelState = {
            maxInRow: 16,
            maxInColumn: 16,
            dangerousCellsAmount: 40, 
        }
        
        this.hardLevelState = {
            maxInRow: 30,
            maxInColumn: 16,
            dangerousCellsAmount: 99, 
        }

        this.time = 0
        this.flagAmount = 0
        this.flagedCellsArray = []
    }

    main() {
        this.initElementSelectors()

        this.handleEasyOptionBtn()
        this.handleMiddleOptionBtn()
        this.handleHardOptionBtn()

        this.handleRestartGameBtn()
        this.handleBackToMenuBtn()
    }

    initElementSelectors() {
        this.mineFlag = document.querySelector('#mine-flag')
        this.mineBullseye = document.querySelector('#mine-bullseye')
        
        this.timerCounterElement = document.querySelector("#timer-counter")
        this.bombCounterElement = document.querySelector("#bomb-counter")

        this.controllerWrapperElement = document.querySelector(".controllerWrapper")
        this.difficultyWrapperElement = document.querySelector(".difficultyWrapper")
        this.fieldElement = document.querySelector(".field")

        this.easyOptionBtn = document.querySelector("#easyOption")
        this.middleOptionBtn = document.querySelector("#middleOption")
        this.hardOptionBtn = document.querySelector("#hardOption")

        this.gameResultsElement = document.querySelector(".game-results")
        this.gameResultsTitle = document.querySelector(".game-results-title")
        this.restartGameBtn = document.querySelector("#restart-game-btn")
        this.backToMenuBtn = document.querySelector("#menu-btn")
        
    }

    handleBackToMenuBtn() {
        this.backToMenuBtn.onclick = () => {
            location.reload()
        }
    }

    handleRestartGameBtn() {
        this.restartGameBtn.onclick = () => {
            this.state = {
                gameStyle: 'demining',
                timerCounter: 'ready',
                amountOfBomb: 0,
                involvedСells: 0,
                cellsCount: 0,
                openedCells: [],
                cells: []
            }

            this.completeState(this.selectedLevelState)
            this.time = 0

            this.render()
        }
    }

    handleEasyOptionBtn() {
        this.easyOptionBtn.onclick = (e) => {
            this.selectedLevelState = this.easyLevelState
            this.completeState(this.selectedLevelState)
            this.initGame()
        }
    }

    handleMiddleOptionBtn() {
        this.middleOptionBtn.onclick = (e) => {
            this.selectedLevelState = this.middleLevelState
            this.completeState(this.selectedLevelState)
            this.initGame()
        }
    }

    handleHardOptionBtn() {
        this.hardOptionBtn.onclick = (e) => {
            this.selectedLevelState = this.hardLevelState
            this.completeState(this.selectedLevelState)
            this.initGame()
        }
    }

    completeState(levelState) {
        this.state = {...this.state, ...levelState}
        this.state.cellsCount = this.state.maxInRow * this.state.maxInColumn
    }

    initGame() {
        // first render
        this.render()

        // set handlers
        this.handleForGameStyle()
        this.handleCellsClick()
    }

    render() {
        // hide other windows
        Render.setDisplayStatusForElement(this.difficultyWrapperElement, 'none')
        Render.setDisplayStatusForElement(this.gameResultsElement, 'none')
        Render.setDisplayStatusForElement(this.controllerWrapperElement, 'flex')

        // set up info bar data
        Render.setContent(this.bombCounterElement, this.state.dangerousCellsAmount)
        Render.setContent(this.timerCounterElement, '')

        // clear cells
        Render.removeContent(this.fieldElement)

        let RenderInstance = new Render()
            RenderInstance.renderCells(this.state)
        
        this.state.amountOfBomb = this.state.dangerousCellsAmount
        this.flagAmount = this.state.dangerousCellsAmount
        this.flagedCellsArray = []
        this.state.cells = RenderInstance.cellsState
    }


    // ------------------
    // handlers gamestyle
    // ------------------

    handleForGameStyle() {
        this.mineFlag.onclick = this.mineFlagOnClick.bind(this)
        this.mineBullseye.onclick =  this.mineBullseyeOnClick.bind(this)

        document.body.onkeydown = (e) => {
            if (e.code == "MetaLeft" || e.code == "ControlLeft") this.mineBullseyeOnClick()
        }

        document.body.onkeyup = (e) => {
            if (e.code == "MetaLeft" || e.code == "ControlLeft") this.mineFlagOnClick()

            if (e.code == "Space") {
                if (this.state.gameStyle == 'demining') {
                    this.mineBullseyeOnClick()
                } else if (this.state.gameStyle == 'flaging') {
                    this.mineFlagOnClick()
                }
            }
        }

        
    }

    mineFlagOnClick() {
        this.state.gameStyle = 'demining'

        this.mineFlag.style.display = 'none'
        this.mineBullseye.style.display = 'block'
    }

    mineBullseyeOnClick() {
        this.state.gameStyle = 'flaging'

        this.mineBullseye.style.display = 'none'
        this.mineFlag.style.display = 'block'
    }

    // ----------------------
    // releave click handlers
    // ----------------------

    handleCellsClick() {
        window.addEventListener('click', (e) => {
            if(e.target.classList.contains('cell')) {
                let cellRowNumber = Number(e.target.dataset.rowNumber)
                let cellPositionNumber = Number(e.target.dataset.positionNumber)

                // first click
                if (this.state.timerCounter == 'ready') {
                    // setup: timer
                    this.state.timerCounter = 'go'
                    this.timerCounterInterval = setInterval(() => {
                        this.time = this.time + 1

                        let minutes = Math.floor(this.time / 60);
                        let seconds = this.time % 60
                        let timeFormated = (minutes) ? `${minutes} Minutes and ${seconds} Seconds` : `${seconds} Seconds`
                        Render.setContent(this.timerCounterElement, timeFormated)
                    }, 1000)

                    // setup: dangers cels
                    let bombGridAsocArray = Helper.getSafeBombArray(this.state, cellRowNumber, cellPositionNumber)

                    for (let i = 0; i < this.state.cells.length; i++) {
                        const subArray = this.state.cells[i];

                        for (let j = 0; j < subArray.length; j++) {
                            const cell = subArray[j];
                                  cell.isDangerous = bombGridAsocArray[i][j]
                            this.state.cells[i][j] = cell
                        }
                    }
                }

                // demining logic
                if(this.state.gameStyle === "demining") {

                    // only if not was flagged
                    if(e.target.id != "flagged") {

                        // for mines | END | Loose
                        if(this.state.cells[cellRowNumber][cellPositionNumber].isDangerous) {
                            this.bombCellClickProcessing(e.target)
                        }
                        
                        // for common
                        if(!this.state.cells[cellRowNumber][cellPositionNumber].isDangerous) {
                            this.commonCellClickProcessing(e.target, cellRowNumber, cellPositionNumber)
                        }

                        // END
                        if(this.state.amountOfBomb <= 0 && this.state.involvedСells == this.state.cellsCount) {
                            this.winCondifionProcessing()
                        }

                    }

                } else {
                    // flagging logic

                    // when open cells - clear mismarket bombcells ????
                    if (this.state.openedCells.includes(String(cellRowNumber) + "-" + String(cellPositionNumber))) {
                        return;
                    }

                    if(e.target.id == "flagged") {
                        e.target.id = ''
                        e.target.classList.remove("fa");
                        e.target.classList.remove("fa-flag");

                        this.state.involvedСells--
                        this.flagAmount++
                        this.flagedCellsArray.push(String(cellRowNumber) + "-" + String(cellPositionNumber))

                        if(this.state.cells[cellRowNumber][cellPositionNumber].isDangerous) {
                            this.state.amountOfBomb++
                        } else {
                            this.state.amountOfBomb--
                        }

                    } else {
                        // if flags is not over
                        if (this.flagAmount > 0) {

                            if(this.state.cells[cellRowNumber][cellPositionNumber].isDangerous) {
                                this.state.amountOfBomb--
                            } else {
                                this.state.amountOfBomb++
                            }
    
                            if(this.state.amountOfBomb >= 0 && !e.target.classList.contains('openedCell')) {
                                e.target.id = "flagged"
                                e.target.classList.add("fa")
                                e.target.classList.add("fa-flag")
    
                                this.state.involvedСells++
                                this.flagAmount--
                                this.flagedCellsArray.push(String(cellRowNumber) + "-" + String(cellPositionNumber))
                            }
                            
                        }
                    }

                    Render.setContent(this.bombCounterElement, this.flagAmount)

                    // END
                    if(this.state.amountOfBomb <= 0 && this.state.involvedСells == this.state.cellsCount) {
                        this.winCondifionProcessing()
                    }

                }
            }
        })
    }

    bombCellClickProcessing(target) {
        target.style.background = "#cc0000"
        target.classList.add('fa')
        target.classList.add('fa-bomb')

        clearInterval(this.timerCounterInterval)

        let bombAmount = this.state.amountOfBomb
        let looseTitle = `You lose in ${this.time} seconds ${bombAmount} ${bombAmount > 1 ? 'bombs' : 'bomb'} remain`
        Render.setContent(this.gameResultsTitle, looseTitle)

        Render.setDisplayStatusForElement(this.gameResultsElement, 'block')
        Render.setDisplayStatusForElement(this.controllerWrapperElement, 'none')
        this.gameResultsElement.style.background = "linear-gradient(-45deg, #ee7752, #e73c7e, #e73c7e, #e73c3c)"
    }

    winCondifionProcessing() {
        clearInterval(this.timerCounterInterval)
        Render.setContent(this.gameResultsTitle, `You win in ${this.time} seconds`)
        Render.setDisplayStatusForElement(this.gameResultsElement, 'block')
        this.gameResultsElement.style.background = "linear-gradient(-45deg, #234cd5, #23a6d5, #23a6d5, #23d5ab)"
        
        const queryString = location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id')

        let score = this.time
        let xhttp = new XMLHttpRequest()
            xhttp.open("GET", `${location.hostname}/highscore/${score}?id=${id}`, true);
            xhttp.send();
    }

    commonCellClickProcessing(target, cellRowNumber, cellPositionNumber) {
        if (!this.state.openedCells.includes(String(cellRowNumber) + "-" +  String(cellPositionNumber))) {
            this.state.involvedСells++
            this.state.openedCells.push(String(cellRowNumber) + "-" +  String(cellPositionNumber))
        } else {
            // for miss-choosen flag set (need remove amoun, its hust style)
            target.style.background = 'white'
            return;
        }

        let finalScore = this.bombNearbyCounter(cellRowNumber, cellPositionNumber)

        this.revealCell(target, finalScore)

        // сделать норм управление стилями и хранение данных про flagged
        // if(!this.state.cells[cellRowNumber][cellPositionNumber].isDangerous && ) {
        //     this.state.amountOfBomb--
        // }
        
        if (finalScore === 0) {
            this.revealNeighboars(cellRowNumber, cellPositionNumber)
        }

        // for simplify a game process
        // if (finalScore === 1) {
        //     this.revealNeighboarsForASingle(cellRowNumber, cellPositionNumber)
        // }
    }

    // commonCellClickProcessing
    bombNearbyCounter(cellRowNumber, cellPositionNumber) {
        let finalScore = 0

        // realization for counting nearby cell score
        for (let i = 0; i < Helper.countingSequence.length; i++) {
            const rowShiftNumber = cellRowNumber + Helper.countingSequence[i][0];
            const positionShiftNumber = cellPositionNumber + Helper.countingSequence[i][1];

            let midValue = (typeof this.state.cells[rowShiftNumber] == 'undefined') ? 0 : (this.state.cells[rowShiftNumber][positionShiftNumber]?.isDangerous ? 1 : 0)

            finalScore += midValue
        }

        return finalScore
    }

    // commonCellClickProcessing
    revealCell(target, finalScore) {
        target.classList.remove("fa")
        target.classList.remove("fa-flag")
        target.classList.add('openedCell')
        target.innerText = finalScore != 0 ? finalScore : ''
    }

    // commonCellClickProcessing
    revealNeighboars(cellRowNumber, cellPositionNumber) {
        for (let i = 0; i < Helper.countingSequence.length; i++) {
            const rowShiftNumber = cellRowNumber + Helper.countingSequence[i][0];
            const positionShiftNumber = cellPositionNumber + Helper.countingSequence[i][1];

            let HTMLelement = document.querySelector(`div[data-row-number="${rowShiftNumber}"][data-position-number="${positionShiftNumber}"]`)

            if(HTMLelement != null) {
                this.commonCellClickProcessing(HTMLelement, rowShiftNumber, positionShiftNumber)
            }
        }
    }

    revealNeighboarsForASingle(cellRowNumber, cellPositionNumber) {
        let isHaveBombnearby = false

        // if have marked bomb nearby
        for (let i = 0; i < Helper.countingSequence.length; i++) {
            const rowShiftNumber = cellRowNumber + Helper.countingSequence[i][0];
            const positionShiftNumber = cellPositionNumber + Helper.countingSequence[i][1];

            if(this.flagedCellsArray.includes(String(rowShiftNumber) + "-" +  String(positionShiftNumber))) {
                isHaveBombnearby = true
            }

        }

        if (isHaveBombnearby) {
            for (let i = 0; i < Helper.countingSequence.length; i++) {
                const rowShiftNumber = cellRowNumber + Helper.countingSequence[i][0];
                const positionShiftNumber = cellPositionNumber + Helper.countingSequence[i][1];
    

                // let test2424 = (typeof this.state.cells[rowShiftNumber] == 'undefined') ? 0 : (this.state.cells[rowShiftNumber][positionShiftNumber]?.isDangerous ? 1 : 0)
                // if(test2424) {
                if(!this.flagedCellsArray.includes(String(rowShiftNumber) + "-" +  String(positionShiftNumber))) {
                    let HTMLelement = document.querySelector(`div[data-row-number="${rowShiftNumber}"][data-position-number="${positionShiftNumber}"]`)
        
                    if(HTMLelement != null) {
                        this.commonCellClickProcessing(HTMLelement, rowShiftNumber, positionShiftNumber)
                    }
                }
            }
        }
    }
}

let Game_ex = new Game()
    Game_ex.main()