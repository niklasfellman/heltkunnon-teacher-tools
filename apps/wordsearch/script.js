const board = document.querySelector(".board")

let gridSize = 15
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

let words = ["aaa","bbbb","ccccc","dddddd","eeeeeee","fffffffff"]

let placeWordsHelperDirection = function (p, number) {
    if (number < .33) return [p[0]++, p[1]]
    else if (number < .66) return [p[0], p[1]++]
    else return [p[0]++, p[1]++]
}

let placeWords = function (w) {

    for (let i = 0; i < words.length; i++) {
        let history = []
        let current = words[i]
        directionNumber = Math.random()
        let pos = [Math.floor(Math.random() * boardArr.length), Math.floor(Math.random() * boardArr.length)]
        while (pos[0] + current.length > boardArr.length || pos[1] + current.length > boardArr.length) {
            pos = [Math.floor(Math.random() * boardArr.length), Math.floor(Math.random() * boardArr.length)]
        }
        for (let j = 0; j < current.length; j++) {
            console.log(history)
            console.log(pos)
            if(boardArr[pos[0]][pos[1]].innerText.length != 0){
                for (let k = 0;k<history.length;k++){
                    let currentK = history[k].split("-")
                    boardArr[parseInt(currentK[0])][parseInt(currentK[1])].innerText = ""   
                }
                i--
                break
            }
            else{

            history.push(pos.join("-"))
            boardArr[pos[0]][pos[1]].innerText = current[j]
            placeWordsHelperDirection(pos, directionNumber)
            }
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

board.addEventListener("click",(e)=>{
    console.log(e.target.innerText.length)
})
