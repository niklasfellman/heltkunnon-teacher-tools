const letters = "abcdefghijklmnopqrstuvxyzöäå"

let sampleWords = new Array("apple", "pear", "mango", "banana", "orange")

class Cell {
    constructor() {
        this.domElement = document.createElement("div")
        this.domElement.classList.add("cell")
        this.letter = ""
    }

    fillLetter(l) {
        this.letter = l
        this.domElement.innerText = this.letter
    }

    fillRandom() {
        this.letter = letters.charAt(Math.floor(Math.random() * letters.length))
        this.domElement.innerText = this.letter
    }

}

class Word {
    constructor(word) {
        this.filled = false
        this.word = word;
        this.length = word.length
        this.random = Math.random()
        this.position = {
            x: 0,
            y: 0
        }

        this.cells = []
    }

    newPosition(){
        if (this.random > .66) {
            this.position.x = Math.floor(Math.random() * (15 - this.word.length))
            this.position.y = Math.floor(Math.random() * (15))
        } else if (this.random > .33) {
            this.position.x = Math.floor(Math.random() * (15))
            this.position.y = Math.floor(Math.random() * (15 - this.word.length))
        } else {
            this.position.x = Math.floor(Math.random() * (15 - this.word.length))
            this.position.y = Math.floor(Math.random() * (15 - this.word.length))
        }
    }

    updatePosition() {
        if (this.random > 0.66) {
            this.position.x = this.position.x + 1
            this.position.y = this.position.y
        } else if (this.random > 0.33) {
            this.position.x = this.position.x
            this.position.y = this.position.y + 1
        } else {
            this.position.x = this.position.x + 1
            this.position.y = this.position.y + 1
        }
    }

}

class Board {
    constructor(size = 15) {
        this.size = size
        this.domElement = document.querySelector(".board")
        this.cells = []
        this.words = []
    }

    makeBoard(w) {
        for (let i = 0; i < this.size; i++) {
            this.cells.push([])
            for (let j = 0; j < this.size; j++) {
                this.cells[i].push(new Cell)
                //this.cells[i][j].fillRandom()
                this.domElement.append(this.cells[i][j].domElement)
            }
        }

        for (let i = 0; i < w.length; i++) {
            this.words.push(new Word(w[i]))
            this.words[i].newPosition()
        }

        for (let i = 0; i < this.words.length; i++) {
            let failed = false
            for (let j = 0; j < this.words[i].length; j++) {
                if (this.cells[this.words[i].position.x][this.words[i].position.y].filled) {
                    console.log("was already taken, should skip")
                    failed = true
                    break
                }
                this.words[i].cells.push(this.cells[this.words[i].position.x][this.words[i].position.y])
                this.words[i].updatePosition()
            }
            if (failed){
               this.words[i].cells = []
               this.words[i].newPosition()
               i--
            }
            else{
            for (let k = 0; k < this.words[i].cells.length; k++) {
                this.words[i].cells[k].fillLetter(this.words[i].word[k])
                this.words[i].cells[k].filled = true
            }}
        }

        for(let i = 0;i<this.cells.length;i++){
            for(let j = 0;j<this.cells[i].length;j++){
                if(!this.cells[i][j].filled){
                    this.cells[i][j].fillRandom()
                }
            }
        }

    }

    clearBoard() {
        let child = this.domElement.lastElementChild
        while (child) {
            this.domElement.removeChild(child)
            child = this.domElement.lastElementChild
        }
    }



}



let test = new Board()

test.makeBoard(sampleWords)

console.log(test)