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
        
        this.countingSequence = [
            [ -1, -1 ],
            [ -1, 0],
            [ -1, 1 ],
            [ 0, -1 ],
            [ 0, 1 ],
            [ 1, -1 ],
            [ 1, 0 ],
            [ 1, 1 ],
        ]
    }

    main() {
        this.initElementSelectors()

        this.handleEasyOptionBtn()
        this.handleMiddleOptionBtn()
        this.handleHardOptionBtn()
    }

    initElementSelectors() {
        this.mineFlag = document.querySelector('#mine-flag')
        this.mineBullseye = document.querySelector('#mine-bullseye')
        
        this.timerCounterElement = document.querySelector("#timer-counter")
        this.bombCounterElement = document.querySelector("#bomb-counter")

        this.difficultyWrapperElement = document.querySelector(".difficultyWrapper")

        this.easyOptionBtn = document.querySelector("#easyOption")
        this.middleOptionBtn = document.querySelector("#middleOption")
        this.hardOptionBtn = document.querySelector("#hardOption")
    }

    handleEasyOptionBtn() {
        this.easyOptionBtn.onclick = (e) => {
            this.completeState(this.easyLevelState)
            this.difficultyWrapperElement.style.display = 'none'
            this.initGame()
        }
    }

    handleMiddleOptionBtn() {
        this.middleOptionBtn.onclick = (e) => {
            this.completeState(this.middleLevelState)
            this.difficultyWrapperElement.style.display = 'none'
            this.initGame()
        }
    }

    handleHardOptionBtn() {
        this.hardOptionBtn.onclick = (e) => {
            this.completeState(this.hardLevelState)
            this.difficultyWrapperElement.style.display = 'none'
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
        let RenderInstance = new Render()
            RenderInstance.renderCells(this.state)
        
        this.state.amountOfBomb = this.state.dangerousCellsAmount
        this.state.cells = RenderInstance.cellsState
    }


    // ------------------
    // handlers gamestyle
    // ------------------

    handleForGameStyle() {
        this.mineFlag.onclick = this.mineFlagOnClick.bind(this)
        this.mineBullseye.onclick =  this.mineBullseyeOnClick.bind(this)

        document.body.onkeydown = (e) => {
            if (e.code == "MetaLeft") this.mineBullseyeOnClick()
        }

        document.body.onkeyup = (e) => {
            if (e.code == "MetaLeft") this.mineFlagOnClick()

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

                // demining logic
                if(this.state.gameStyle === "demining") {

                    // only if not was flagged
                    if(e.target.id != "flagged") {

                        // for mines | END | Loose
                        if(this.state.cells[cellRowNumber][cellPositionNumber].isDangerous) {
                            e.target.style.background = "#cc0000"
                            e.target.classList.add('fa')
                            e.target.classList.add('fa-bomb')

                            clearInterval(this.timerCounterInterval)
                            setTimeout(()=>{alert("you loose")}, 300)
                            // location.reload()
                        }
                        
                        // for common
                        if(!this.state.cells[cellRowNumber][cellPositionNumber].isDangerous) {
                            this.commonCellClickProcessing(e.target, cellRowNumber, cellPositionNumber)
                        }

                        console.dir(this.state.involvedСells)
                        console.dir("amountOfBomb - " + this.state.amountOfBomb)

                        // END
                        if(this.state.amountOfBomb <= 0 && this.state.involvedСells == this.state.cellsCount) {
                            clearInterval(this.timerCounterInterval)
                            setTimeout(()=>{alert("you win")}, 100)
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
                        console.dir(this.state.involvedСells)

                        if(this.state.cells[cellRowNumber][cellPositionNumber].isDangerous) {
                            this.state.amountOfBomb++
                        } else {
                            this.state.amountOfBomb--
                        }

                    } else {

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
                        }
                    }

                    console.dir(this.state.involvedСells)
                    console.dir("amountOfBomb - " + this.state.amountOfBomb)

                    // END
                    if(this.state.amountOfBomb <= 0 && this.state.involvedСells == this.state.cellsCount) {
                        clearInterval(this.timerCounterInterval)
                        setTimeout(()=>{alert("you win")}, 100)
                    }

                }
            }
        })
    }

    commonCellClickProcessing(target, cellRowNumber, cellPositionNumber) {
        if (this.state.timerCounter == 'ready') {
            this.state.timerCounter = 'go'
            this.timerCounterInterval = setInterval(() => {
                this.timerCounterElement.innerText = Number(this.timerCounterElement.innerText) + 1
                this.bombCounterElement.innerText = this.state.amountOfBomb
            }, 1000)
        }

        if (!this.state.openedCells.includes(String(cellRowNumber) + "-" +  String(cellPositionNumber))) {
            this.state.involvedСells++
            console.dir(this.state.involvedСells)
            this.state.openedCells.push(String(cellRowNumber) + "-" +  String(cellPositionNumber))
        } else {
            return;
        }

        let finalScore = this.bombNearbyCounter(cellRowNumber, cellPositionNumber)

        this.revealCell(target, finalScore)

        // сделать норм управление стилями и хранение данных про flagged
        // if(!this.state.cells[cellRowNumber][cellPositionNumber].isDangerous && ) {
        //     this.state.amountOfBomb--
        // }
        
        if (finalScore === 0) {
            this.revealNeighboars(finalScore, cellRowNumber, cellPositionNumber)
        }
    }

    // commonCellClickProcessing
    bombNearbyCounter(cellRowNumber, cellPositionNumber) {
        let finalScore = 0

        // realization for counting nearby cell score
        for (let i = 0; i < this.countingSequence.length; i++) {
            const rowShiftNumber = cellRowNumber + this.countingSequence[i][0];
            const positionShiftNumber = cellPositionNumber + this.countingSequence[i][1];

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
    revealNeighboars(finalScore, cellRowNumber, cellPositionNumber) {
        for (let i = 0; i < this.countingSequence.length; i++) {
            const rowShiftNumber = cellRowNumber + this.countingSequence[i][0];
            const positionShiftNumber = cellPositionNumber + this.countingSequence[i][1];

            let HTMLelement = document.querySelector(`div[data-row-number="${rowShiftNumber}"][data-position-number="${positionShiftNumber}"]`)

            if(HTMLelement != null) {
                this.commonCellClickProcessing(HTMLelement, rowShiftNumber, positionShiftNumber)
            }
        }
    }
}

let Game_ex = new Game()
    Game_ex.main()