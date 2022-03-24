const answerBox = document.querySelector(".answer")
const questionBox = document.querySelector(".question")
const historyBox = document.querySelector(".history")

const resultBtn = document.querySelector(".results")
const resultsPage = document.querySelector(".results-page")
const resultsBoard = document.querySelector(".results-board")

const keypad = document.querySelector(".keypad")

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

let multiplication = true;
let division = true;
let addition = true;
let subtraction = true;

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

            let subTerms = [Math.ceil(Math.random() * 100), Math.ceil(Math.random() * 100)]

            subTerms = subTerms.sort((a, b) => a - b);
            question = `${subTerms[1]} - ${subTerms[0]} =`
            answer = subTerms[1] - subTerms[0]

            break;
        default:

            let addTerms = [Math.ceil(Math.random() * 100), Math.ceil(Math.random() * 100)]

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

    } else if (key === "Enter") {
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
    // ! if answerBox.value + e.key is === answer, then next number
    // * have to use + e.key because the input don't see the last input
    handleKey(e.key)
    answerBox.innerText = myAnswer
    console.log(history)
})

keypad.addEventListener("click", (x) => {
    handleKey(x.target.dataset.id)
    answerBox.innerText = myAnswer
})


resultBtn.addEventListener("click", () => {
    console.log("result clicked")
    resultsPage.classList.toggle("active")
})

resultsPage.addEventListener("click", (x) => {
    console.log(x)

    resultsPage.classList.toggle("active")
})