import Render from './render'

class Helper {

    static countingSequence = [
        [ -1, -1 ],
        [ -1, 0],
        [ -1, 1 ],
        [ 0, -1 ],
        [ 0, 1 ],
        [ 1, -1 ],
        [ 1, 0 ],
        [ 1, 1 ],
    ]

    static getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
    }

    static chunk_inefficient(array, chunkSize) {
        // - array например [1, 2, 3, 4, 5, 6], chunkSize например 3
        // - concat делает из [5] и [1, 2, 3] = [5].concat([1, 2, 3]) -> [5, 1, 2, 3]
        // - apply первым параметром принимает новый контекст, в данном случае это пустой массив
        // - apply вторым параметром передает функции concat ее агрумент, типо [[[1, 2]], [], [[3, 4]]]
        // - второй аргумер это функция map, которая на четное число делает новый масив
        //      через slice, например [[1, 2, 3]], а на четное просто пустой массив []
        // - в конце функция concat раскрывает массив переданный в аргументе
        //       например  [[[1, 2]], [], [[3, 4]]] ->  [[1, 2], [3, 4]]
        return [].concat.apply(
            [],
            array.map(function (elem, i) {
                return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
            })
        );
    }

    static getSafeBombArray(state, cellRowNumber, cellPositionNumber) {
        let bombGridAsocArray = Render.generateBombGridAsocArray(state)
        let bombNearbyCount = Helper.bombNearbyCounterForBombGridAsocArray(bombGridAsocArray, cellRowNumber, cellPositionNumber)

        // is click was on a danger cell: regenerate
        if (bombGridAsocArray[cellRowNumber][cellPositionNumber] === true || bombNearbyCount !== 0) {
            bombGridAsocArray = Helper.getSafeBombArray(state, cellRowNumber, cellPositionNumber)
        }

        return bombGridAsocArray
    }

    static bombNearbyCounterForBombGridAsocArray(bombGridAsocArray, cellRowNumber, cellPositionNumber) {
        let finalScore = 0

        // realization for counting nearby cell score
        for (let i = 0; i < Helper.countingSequence.length; i++) {
            const rowShiftNumber = cellRowNumber + Helper.countingSequence[i][0];
            const positionShiftNumber = cellPositionNumber + Helper.countingSequence[i][1];

            let midValue = (typeof bombGridAsocArray[rowShiftNumber] == 'undefined') ? 0 : (bombGridAsocArray[rowShiftNumber][positionShiftNumber] ? 1 : 0)

            finalScore += midValue
        }

        return finalScore
    }
}

export default Helper