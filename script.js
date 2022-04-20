sessionStorage.setItem('lang', 'swe');

console.log(sessionStorage.lang)

const languageEl = document.querySelector(".language")

console.log(languageEl)

let test = document.createElement("li")

test.setAttribute("W","w")
languageEl.append(test)