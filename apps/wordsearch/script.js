const board = document.querySelector(".board")

let gridSize = 10
let boardArr = []

let letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","t","u","v","x","y","z","å","ä","ö"]

for (let i = 0; i < gridSize; i++) {
    boardArr.push([])
    for (let j = 0; j < gridSize; j++) {
        boardArr[i].push(document.createElement("div"))
        boardArr[i][j].classList.add("cell")
        boardArr[i][j].dataset.id = `${i}-${j}`
        board.append(boardArr[i][j])
    }
}

let words = ["apa", "bur", "sol","längre", "bak", "bit"]

let placeWordsHelperDirection = function (p, number) {
    if (number < .33) return [p[0]++, p[1]]
    else if (number < .66) return [p[0], p[1]++]
    else return [p[0]++, p[1]++]
}

let placeWords = function (w) {

    for (let i = 0; i < words.length; i++) {
        let current = words[i]
        directionNumber = Math.random()
        let pos = [Math.floor(Math.random() * boardArr.length), Math.floor(Math.random() * boardArr.length)]
        while (pos[0] + current.length > boardArr.length || pos[1] + current.length > boardArr.length) {
            pos = [Math.floor(Math.random() * boardArr.length), Math.floor(Math.random() * boardArr.length)]
        }
        for (let j = 0; j < current.length; j++) {
            boardArr[pos[0]][pos[1]].innerText = current[j]
            placeWordsHelperDirection(pos, directionNumber)
        }
    }
}

function fillWithLetters(){
    for(let i = 0;i<boardArr.length;i++){
        for(let j = 0;j<boardArr[i].length;j++){
            let str = "" 
            if(boardArr[i][j].innerText.length === 0) boardArr[i][j].innerText = letters[Math.floor(Math.random()*letters.length)] 
        }
    }
}

placeWords()
fillWithLetters()

board.addEventListener("click",(e)=>{
    console.log(e.target.innerText.length)
})
