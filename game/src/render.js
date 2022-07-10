import Helper from './helper'


class Render {
    constructor(level = 'easy') {
        this.field = document.querySelector('.field')
        this.cellsState = []
        this.level = level

        this.bordersWidth = 2

        this.cellSizeMap = {
            easy: {
                width: 40,
                height: 30,
                fontSize: 20
            },
            middle: {
                width: 35,
                height: 25,
                fontSize: 16
            },
            hard: {
                width: 30,
                height: 20,
                fontSize: 14
            }
        }

        this.baseWidthCell = this.cellSizeMap[this.level].width + this.bordersWidth
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

                    cell.style.width = `${this.cellSizeMap[this.level].width}px`
                    cell.style.height = `${this.cellSizeMap[this.level].height}px`
                    cell.style.fontSize = `${this.cellSizeMap[this.level].fontSize}px`

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