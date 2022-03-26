
const board = document.querySelector(".board")

let boardArr = []

for(let i = 0;i<5;i++){
    boardArr.push([])
    for(let j = 0;j<5;j++){
        boardArr[i].push(document.createElement("div"))
        boardArr[i][j].classList.add("cell")
        boardArr[i][j].dataset.id = `${i}-${j}`
        board.append(boardArr[i][j])
    }
}
