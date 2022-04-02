const board = document.querySelector(".board")
const wordsInputElement = document.querySelector(".words-input")
const createBtn = document.querySelector(".create")
const wordSettings = document.querySelector(".words-settings")

let gridSize = 15
let boardArr = []

let letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "t", "u", "v", "x", "y", "z", "å", "ä", "ö"]

for (let i = 0; i < gridSize; i++) {
    boardArr.push([])
    for (let j = 0; j < gridSize; j++) {
        boardArr[i].push(document.createElement("div"))
        boardArr[i][j].classList.add("cell")
        boardArr[i][j].dataset.id = `${i}-${j}`
        board.append(boardArr[i][j])
    }
}

let words = ["aaa", "bbbb", "ccccc", "dddddd", "eeeeeee", "fffff", "gggggg", "hhhhh", "iiii", "jjjj"]

let placeWordsHelperDirection = function (p, number) {
    if (number < .25) return [p[0]++, p[1]]
    else if (number < .50) return [p[0], p[1]++]
    else if (number < .75) return [p[0]--, p[1]++]
    else return [p[0]++, p[1]++]
}

let placeWords = function (w) {

    for (let i = 0; i < w.length; i++) {
        let history = []
        let current = w[i]
        let triesToPlace = 0;
        directionNumber = Math.random()
        let pos = [Math.floor(Math.random() * boardArr.length), Math.floor(Math.random() * boardArr.length)]
        while (pos[0] + current.length > boardArr.length || pos[1] + current.length > boardArr.length) {
            pos = [Math.floor(Math.random() * boardArr.length), Math.floor(Math.random() * boardArr.length)]
            triesToPlace ++
            if(triesToPlace > 100){
                console.log(current)
                current = w[i+1]
                i++
                console.log(current)
                triesToPlace = 0
                continue
            }
        }
        for (let j = 0; j < current.length; j++) {
            if (boardArr[pos[0]][pos[1]].innerText.length != 0 || pos[0] <= 0 || pos[1] <= 0) {
                for (let k = 0; k < history.length; k++) {
                    let currentK = history[k].split("-")
                    boardArr[parseInt(currentK[0])][parseInt(currentK[1])].innerText = ""
                    //! troubleshoot style
                    boardArr[currentK[0]][currentK[1]].style.color = "black"
                    //!- -  - - - - - - - - - - - - - - 
                }
                i--
                break
            } else {
                history.push(pos.join("-"))
                boardArr[pos[0]][pos[1]].innerText = current[j]
                //! troubleshoot style
                boardArr[pos[0]][pos[1]].style.color = "red"
                //!- -  - - - - - - - - - - - - - - 
                placeWordsHelperDirection(pos, directionNumber)
            }
        }
    }
}

function fillWithLetters() {
    for (let i = 0; i < boardArr.length; i++) {
        for (let j = 0; j < boardArr[i].length; j++) {
            let str = ""
            if (boardArr[i][j].innerText.length === 0) boardArr[i][j].innerText = letters[Math.floor(Math.random() * letters.length)]
        }
    }
}

function clearBoard() {
    for (let i = 0; i < boardArr.length; i++) {
        for (let j = 0; j < boardArr[i].length; j++) {
            boardArr[i][j].innerText = ""
            //! troubleshoot style
            boardArr[i][j].style.color = "black"
            //!- -  - - - - - - - - - - - - - - 
        }
    }
}

//placeWords(words)
fillWithLetters()

createBtn.addEventListener("click", () => {
    words = wordsInputElement.value.split("\n")
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].trim()
    }

    clearBoard()
    placeWords(words)
    fillWithLetters()

   /*  for(let x of words){
        let test = document.createElement("p")
        test.innerText = x
        wordSettings.append(test)
    } */

})

let clicked = false
let dragString = ""
let dragHistory = []

board.addEventListener("mousedown", (x) => {
    clicked = true
    if (x.target != board) {
        dragString += x.target.innerText
        dragHistory.push(x.target)
        x.target.classList.add("active")
    }
})

board.addEventListener("mouseover", (x) => {
    if (clicked && x.target != board) {
        dragString += x.target.innerText
        dragHistory.push(x.target)
        x.target.classList.add("active")
    }
})

board.addEventListener("mouseup", (x) => {
    clicked = false
    console.log(dragString)
    for (let i = 0; i < words.length; i++) {
        if (words[i].toUpperCase() === dragString.toUpperCase()) {
            console.log("found one")
            for (let x of dragHistory) {
                x.classList.add("found")
            }
            dragHistory = []
        }
    }
    for (let x of dragHistory) {
        x.classList.remove("active")
    }
    dragHistory = []
    dragString = ""
})