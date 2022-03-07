const answerBox = document.querySelector(".answer")
const questionBox = document.querySelector(".question")
const historyBox = document.querySelector(".history")

const keypad = document.querySelector(".keypad")

let history = []
let sessionHistoryArr = []

if (sessionStorage.test != null) {

    console.log(sessionStorage.test)

    sessionHistoryArr.push(sessionStorage.test)
}

let createHistory = function (q, a, r) {
    let newHistory = document.createElement("span")
    newHistory.innerText = `${q} ${a}`
    if (!r) {
        newHistory.classList.add("wrong")
    }
    history.push(newHistory)
    historyBox.prepend(history[history.length - 1])

    sessionHistoryArr.push(newHistory.innerText)
    sessionStorage.test = sessionHistoryArr
    console.log(sessionStorage.test)
}

let multiplication = true;
let division = true;
let addition = true;
let subtraction = true;

let question;
let answer;
let generateQuestion = function () {

    let methods = []

    if (multiplication === true) methods.push("m")
    if (division === true) methods.push("d")
    if (addition === true) methods.push("a")
    if (subtraction === true) methods.push("s")

    console.log(methods)
    let method = methods[Math.floor(Math.random() * (methods.length))]

    switch (method) {
        case "m":
            console.log("multiplication fuck yyyeeeah!!")

            let terms = [Math.ceil(Math.random() * 10), Math.ceil(Math.random() * 10)]
            question = `${terms[0]} x ${terms[1]} =`
            answer = terms[0] * terms[1]

            break;
        case "d":
            console.log("division fuuuck yeaeaah")

            let factors = [Math.ceil(Math.random() * 10), Math.ceil(Math.random() * 10)]
            question = `${factors[0] * factors[1]} : ${factors[0]} =`
            answer = (factors[0] * factors[1]) / factors[0]

            break;
        case "s":
            console.log("subtraction fuuuck yeah")

            let subTerms = [Math.ceil(Math.random() * 100), Math.ceil(Math.random() * 100)]

            subTerms = subTerms.sort((a, b) => a - b);
            question = `${subTerms[1]} - ${subTerms[0]} =`
            answer = subTerms[1] - subTerms[0]

            break;
        default:
            console.log("addition, fuuuck yeah")

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