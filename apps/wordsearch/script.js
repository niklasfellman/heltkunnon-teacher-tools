const board = document.querySelector(".board")

let gridSize = 10

let boardArr = []

for (let i = 0; i < gridSize; i++) {
    boardArr.push([])
    for (let j = 0; j < gridSize; j++) {
        boardArr[i].push(document.createElement("div"))
        boardArr[i][j].classList.add("cell")
        boardArr[i][j].dataset.id = `${i}-${j}`
        board.append(boardArr[i][j])
    }
}

let words = ["apa", "bur", "sol", "bak", "bit"]

let placeWordsHelperDirection = function(p,number){
    
    if(number <.33) return [p[0] ++,p[1]]
    else if(number <.66) return [p[0] ,p[1]++]
    else return [p[0] ++,p[1]++]

}

let placeWords = function (w) {

    for(let i = 0;i<words.length;i++){

    let current = words[i]
    console.log(current)

    directionNumber = Math.random()

    let pos = [Math.floor(Math.random() * boardArr.length), Math.floor(Math.random() * boardArr.length)]
    while (pos[0] + current.length > boardArr.length || pos[1] + current.length > boardArr.length) {
        console.log("new try")
        pos = [Math.floor(Math.random() * boardArr.length), Math.floor(Math.random() * boardArr.length)]
    }
    for (let j = 0; j < current.length; j++) {
        boardArr[pos[0]][pos[1]].innerText = current[j]
        placeWordsHelperDirection(pos,directionNumber)
    }


}}

placeWords()