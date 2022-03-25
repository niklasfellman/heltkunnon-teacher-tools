const answerBox = document.querySelector(".answer")
const questionBox = document.querySelector(".question")
const historyBox = document.querySelector(".history")

const resultBtn = document.querySelector(".results")
const resultsPage = document.querySelector(".results-page")
const resultsBoard = document.querySelector(".results-board")

const settingsBtn = document.querySelector(".settings")
const settingsPage = document.querySelector(".settings-page")

const optionsBoxes = document.querySelectorAll(".options-box")

const keypad = document.querySelector(".keypad")

const additionRangeElement = document.querySelector("#addition-range") 
const subtractionRangeElement = document.querySelector("#subtraction-range") 

console.log(additionRangeElement)

let history = []
let sessionHistoryArr = []

let createHistory = function (q, a, r) {
    nrAnswers++
    let newHistory = document.createElement("span")
    newHistory.innerText = `${q} ${a}`

    if (!r) {
        newHistory.classList.add("wrong")
    }

    history.push(newHistory)
    historyBox.prepend(history[history.length - 1])

    if (!(nrAnswers in sessionStorage)) {
        sessionStorage[nrAnswers] = `${q} ${a}`
        console.log("added to session")
    }

    let resultsPagePost = document.createElement("div")
    resultsPagePost.innerText = `${q} ${a}`
    if (!r) resultsPagePost.style.color = "red"
    resultsBoard.append(resultsPagePost)
}

let nrAnswers = 0

function calcHelper(t1, t2, operation, a) {
    if (operation === "x") return (parseInt(t1) * parseInt(t2) === parseInt(a))
    if (operation === "-") return (parseInt(t1) - parseInt(t2) === parseInt(a))
    if (operation === "+") return (parseInt(t1) + parseInt(t2) === parseInt(a))
    if (operation === ":") return (parseInt(t1) / parseInt(t2) === parseInt(a))
}

if (sessionStorage != null) {
    for (let i = 0; i < sessionStorage.length; i++) {
        let key = sessionStorage.key(i)
        if (key === "IsThisFirstTime_Log_From_LiveServer") continue
        let current = sessionStorage[key].split(" ")
        createHistory(`${current[0]} ${current[1]} ${current[2]} = `, current[4], calcHelper(current[0], current[2], current[1], current[4]))
    }
}

let multiplication = false;
let division = false;
let addition = true;
let subtraction = false;

let additionMax = 50
let subtractionMax = 50

let challangeMode = false

let question;
let answer;
let generateQuestion = function () {

    let operations = []

    if (multiplication === true) operations.push("multiplication")
    if (division === true) operations.push("division")
    if (addition === true) operations.push("addition")
    if (subtraction === true) operations.push("subtraction")

    let operation = operations[Math.floor(Math.random() * (operations.length))]

    switch (operation) {
        case "multiplication":

            let terms = [Math.ceil(Math.random() * 10), Math.ceil(Math.random() * 10)]
            question = `${terms[0]} x ${terms[1]} =`
            answer = terms[0] * terms[1]

            break;
        case "division":

            let factors = [Math.ceil(Math.random() * 10), Math.ceil(Math.random() * 10)]
            question = `${factors[0] * factors[1]} : ${factors[0]} =`
            answer = (factors[0] * factors[1]) / factors[0]

            break;
        case "subtraction":

            let subTerms = [Math.ceil(Math.random() * subtractionMax), Math.ceil(Math.random() * subtractionMax)]

            subTerms = subTerms.sort((a, b) => a - b);
            question = `${subTerms[1]} - ${subTerms[0]} =`
            answer = subTerms[1] - subTerms[0]

            break;
        case "addition":

            let addTerms = [Math.ceil(Math.random() * additionMax), Math.ceil(Math.random() * additionMax)]

            question = `${addTerms[0]} + ${addTerms[1]} = `
            answer = addTerms[0] + addTerms[1]

            break;
    }

    questionBox.innerText = question
}

generateQuestion()

let myAnswer = ""

function handleKey(key) {


    if (key === "Backspace") {
        myAnswer = myAnswer.slice(0, myAnswer.length - 1)
    } 
   
    else if (challangeMode && answerBox.innerText + key == answer){
        console.log("riiiight")
        createHistory(question, (myAnswer + key), (myAnswer + key) == answer)
            console.log("right answer - - - add some animation and score")
            generateQuestion()
            myAnswer = ""
            answerBox.innerText = myAnswer
            answerBox.classList.remove("wrong")
            return
    }

    else if (key === "Enter") {
        createHistory(question, myAnswer, myAnswer == answer)
        if (myAnswer == answer) {
            console.log("right answer - - - add some animation and score")
            generateQuestion()
            myAnswer = ""
            answerBox.innerText = myAnswer
            answerBox.classList.remove("wrong")
            return
        } else {
            console.log("wrong answer")
            answerBox.classList.add("wrong")
            return
        }
    } else if (isNaN(key)) {
        console.log("not a number")

    } else if (myAnswer.length > 4) {
        console.log("too long")
    } else {
        myAnswer += key
    }
}

document.addEventListener("keydown", (e) => {
    handleKey(e.key)
    answerBox.innerText = myAnswer
})

keypad.addEventListener("click", (x) => {
    handleKey(x.target.dataset.id)
    answerBox.innerText = myAnswer
})

resultBtn.addEventListener("click", () => {
    resultsPage.classList.toggle("active")
})

resultsPage.addEventListener("click", (x) => {
    resultsPage.classList.toggle("active")
})

settingsBtn.addEventListener("click", ()=>{
    settingsPage.classList.toggle("active")
})


settingsPage.addEventListener("click", (x)=>{
    if (x.target === optionsBoxes[0]){
        !x.target.checked ? addition = false : addition = true
        generateQuestion()
    }
    if (x.target === optionsBoxes[1]){
        !x.target.checked ? subtraction = false : subtraction = true
        generateQuestion()
    }
    if (x.target === optionsBoxes[2]){
        !x.target.checked ? multiplication = false : multiplication = true
        generateQuestion()
    }
    if (x.target === optionsBoxes[3]){
        !x.target.checked ? division = false : division = true
        generateQuestion()
    }
})

additionRangeElement.addEventListener("input",(x)=>{
    console.log(x.target.labels[0].innerText = `1 - ${x.target.value}`)
})

additionRangeElement.addEventListener("change",(x)=>{
    additionMax = x.target.value
})

subtractionRangeElement.addEventListener("input",(x)=>{
    console.log(x.target.labels[0].innerText = `1 - ${x.target.value}`)
})

subtractionRangeElement.addEventListener("change",(x)=>{
    subtractionMax = x.target.value
})

