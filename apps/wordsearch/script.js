function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

let boardElement = document.querySelector(".board")

//! TROUBLESHOOTING REMOVE LATER
let tsBoard = document.querySelector(".ts-board")
tsBoard.addEventListener("click", () => {
    console.log(test)
})
//! - - - - - - - - - - - - - - -

const letters = "abcdefghijklmnopqrstuvxyzöäå"

let sampleWords = new Array("backscattering","apple", "pear", "mango", "banana", "orange","pineapple","plum","grapefruit","watermelon","tomato","appricot","tangerine","dragonfruit")

class Cell {
    constructor(pos = "1-1") {
        this.domElement = document.createElement("div")
        this.domElement.classList.add("cell")
        this.domElement.dataset.position = pos
        this.letter = ""
        this.inWord = false
        this.filled = false
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
    constructor(word, color = Math.floor(Math.random()*255)) {
        this.word = word;
        this.length = word.length
        this.random = Math.random()
        this.position = {
            x: 0,
            y: 0
        }
        this.cells = []
        this.color = color 
        this.tries = 0
        this.skipped = false
    }

    newPosition() {

        this.tries ++
        
        if (this.tries % 5) this.random = Math.random()

        let length = this.word.length
        if (this.random > .75) {
            this.position.x = getRandom(0, (14 - length))
            this.position.y = getRandom(0, 14)
        } else if (this.random > .50) {
            this.position.x = getRandom(0, 14)
            this.position.y = getRandom(0, (14 - length))
        } else if (this.random > .25) {
            this.position.x = getRandom(0, (14 - length))
            this.position.y = getRandom(0, (14 - length))
        } else {
            this.position.x = getRandom(length, 14)
            this.position.y = getRandom(0, (14 - length))
        }
    }

    updatePosition() {
        if (this.random > .75) {
            this.position.x = this.position.x + 1
            this.position.y = this.position.y
        } else if (this.random > .50) {
            this.position.x = this.position.x
            this.position.y = this.position.y + 1
        } else if (this.random > .25) {
            this.position.x = this.position.x + 1
            this.position.y = this.position.y + 1
        } else {
            this.position.x = this.position.x - 1
            this.position.y = this.position.y + 1
        }
    }

    updateBackground(){
        for (let x of this.cells){
            x.domElement.style.background = `hsl(${this.color},70%,80%)`
            x.domElement.style.boxShadow = `0 0 0 .25rem hsl(${this.color},70%,80%)`
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
                this.cells[i].push(new Cell(`${i}-${j}`))
                this.cells[i][j].fillRandom()
                this.domElement.append(this.cells[i][j].domElement)
            }
        }

        for (let i = 0; i < w.length; i++) {
            this.words.push(new Word(w[i], (255/w.length)*i))
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
            if (failed) {
                if (this.words[i].tries > 100) {
                    this.words[i].skipped = true
                    console.log("skipped " + this.words[i].word)
                    continue
                }    
                this.words[i].cells = []
                this.words[i].newPosition()
                i--
            
            } else {
                for (let k = 0; k < this.words[i].cells.length; k++) {
                    this.words[i].cells[k].fillLetter(this.words[i].word[k])
                    this.words[i].cells[k].filled = true
                    this.words[i].cells[k].inWord = this.words[i]
                }
            }
        }

       /*  for (let i = 0; i < this.cells.length; i++) {
            for (let j = 0; j < this.cells[i].length; j++) {
                if (!this.cells[i][j].filled) {
                    this.cells[i][j].fillRandom()
                }
            }
        } */

//! should go to when you find the word, here for troubleshooting
        for (let x of this.words){
            if(!x.skipped)x.updateBackground()
            
        }
//! -----------------------------------------------------------
    
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

boardElement.addEventListener("click", (e) => {

    let position = e.target.dataset.position.split("-")
    console.log(position)
    let cell = test.cells[position[0]][position[1]]
    console.log(cell)
    if (cell.inWord) {
        console.log(cell.inWord)
    }
})