const letters = "abcdefghijklmnopqrstuvxyzöäå"

let sampleWords = new Array("appple","pear","mango","banana","orange")

class Cell {
    constructor() {
        this.domElement = document.createElement("div")
        this.domElement.classList.add("cell")
        this.letter = ""
    }

    fillLetter(l){
        this.letter = l
        this.domElement.innerText = this.letter

    }

    fillRandom(){
        this.letter = letters.charAt(Math.floor(Math.random() * letters.length))
        this.domElement.innerText = this.letter
    }

}

class Word{
    constructor(word,position){
        this.word = word;
        this.length = word.length
        this.position = position
        this.random = Math.random()
    }

    direction(){
        if (this.random < 0.33){this.position}
    }

}

class Board {
    constructor(size = 15) {
        this.size = size
        this.domElement = document.querySelector(".board")
        this.cells = []
        this.words = []
    }

    makeBoard(w){
        for(let i = 0;i<this.size;i++){
            this.cells.push([])
            for(let j = 0;j<this.size;j++){
                this.cells[i].push(new Cell)
                //this.cells[i][j].fillRandom()
                this.domElement.append(this.cells[i][j].domElement)
            }
        }
    
        for(let i = 0;i<w.length;i++){
            this.words.push(new Word(w[i],{x: Math.floor(Math.random()*this.size),y:Math.floor(Math.random()*this.size)}))
        }

        for(let asd of this.words){
            this.cells[asd.position.x][asd.position.y].domElement.innerText = asd.word[0]
        }

    }

    clearBoard(){
        let child = this.domElement.lastElementChild
        while(child){
            this.domElement.removeChild(child)
            child = this.domElement.lastElementChild
        }
    }



}



let test = new Board()

test.makeBoard(sampleWords)

console.log(test)