let paths = document.querySelectorAll("path")
let boardElement = document.querySelector(".board")

let countryToFindElement = document.querySelector(".country-to-find") 

class Country{
    constructor(dom,capital = "unknown"){
        this.domElement = dom 
        this.name= this.domElement.id;
        this.capital = capital 
        this.color = `hsl(${(Math.floor(Math.random()*255))},70%,70%)`
    }

    changeColor(){
        this.domElement.style.fill = this.color
    }
}

let countries = []
let countriesToFind = []
for(let i = 0;i<paths.length;i++){
    countries.push(new Country(paths[i]))
    countriesToFind.push(countries[i].name)
    //console.log(countries[i].name)
}

let currentCountry = countriesToFind.pop()
countryToFindElement.innerText = currentCountry

boardElement.addEventListener("click", (e)=>{
    let clickedName = e.target.id
    console.log(clickedName)
    let clickedCountry;
    for (let x of countries){
        if(x.name === clickedName){
         clickedCountry = x
        }
    }
    if(clickedCountry.name === currentCountry){
        clickedCountry.changeColor()
        currentCountry = countriesToFind.splice(Math.floor(Math.random()*countriesToFind.length),1)[0]
        //currentCountry = countriesToFind.pop()
        countryToFindElement.innerText = currentCountry
    }

}
)

