import Helper from './helper'


class Render {
    constructor() {
        this.field = document.querySelector('.field')
        this.baseWidthCell = 42

        this.amountOfBomb = 0
        this.cellsState = []
    }

    setUpGameFieldWidth(state) {
        let fieldWidthValue = state.maxInRow * this.baseWidthCell
        this.field.style.width = `${fieldWidthValue}px`
    }

    renderCells(state) {
        this.setUpGameFieldWidth(state)

        let localCellsCount = state.cellsCount
        let approximateBombAmount = state.approximateDangerousCellsAmount

        for (let j = 0; j < state.maxInColumn; j++) {
            let midArray = []

            for (let i = 0; i < state.maxInRow; i++) {
                let percentageOfDangerousCells = approximateBombAmount/localCellsCount * 100
                let isDangerous = (Helper.getRandomInt(0, 100) <= percentageOfDangerousCells && approximateBombAmount > 0) ? true : false
        
                midArray.push({ "isDangerous": isDangerous, "isOpen": false })

                isDangerous ? approximateBombAmount-- : localCellsCount--

                // create element
                let cell = document.createElement('div')
                    cell.className = 'cell'
                    cell.dataset.rowNumber = j
                    cell.dataset.positionNumber = i

                if(isDangerous) {
                    // cell.style.background = "red"
                    this.amountOfBomb++
                }

                this.field.appendChild(cell)
            }

            // push row-array
            this.cellsState.push(midArray)
        }

        // if (state.approximateDangerousCellsAmount != this.amountOfBomb) {
        //     this.field.innerHTML = ''
        //     this.cellsState = []
        //     this.amountOfBomb = 0
        //     this.renderCells(state)
        // }

        console.dir(this.cellsState)
    }

    determineIsDangerStatus() {
        
    }
}

export default Render