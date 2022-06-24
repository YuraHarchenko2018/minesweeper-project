import Helper from './helper'


class Render {
    constructor() {
        this.field = document.querySelector('.field')
        this.baseWidthCell = 42

        this.cellsState = []
    }

    setUpGameFieldWidth(state) {
        let fieldWidthValue = state.maxInRow * this.baseWidthCell
        this.field.style.width = `${fieldWidthValue}px`
    }

    renderCells(state) {
        this.setUpGameFieldWidth(state)

        for (let j = 0; j < state.maxInColumn; j++) {
            let midArray = []

            for (let i = 0; i < state.maxInRow; i++) {
                midArray.push({ "isDangerous": false, "isOpen": false })

                // create element
                let cell = document.createElement('div')
                    cell.className = 'cell'
                    cell.dataset.rowNumber = j
                    cell.dataset.positionNumber = i

                this.field.appendChild(cell)
            }

            // push row-array
            this.cellsState.push(midArray)
        }

        console.dir(this.cellsState)
    }

    static generateBombGridAsocArray(state) {
        let cellsAmount = state.maxInColumn * state.maxInRow
        let bombGridArray = []

        for (let i = 0; i < cellsAmount; i++) {
            if (i < state.dangerousCellsAmount) {
                bombGridArray.push(true)
            } else {
                bombGridArray.push(false)
            }
            
        }

        bombGridArray = Helper.shuffle(bombGridArray)
        bombGridArray = Helper.chunk_inefficient(bombGridArray, state.maxInRow)

        return bombGridArray
    }

    static removeContent(element) {
        element.innerHTML = ""
    }

    static setContent(element, value = "") {
        element.innerText = value
    }

    static setDisplayStatusForElement(element, status = 'none') {
        element.style.display = status
    }
}

export default Render