let test = document.querySelectorAll("path")
let boardElement = document.querySelector(".board")

let countryToFindElement = document.querySelector(".country-to-find") 

class Country{
    constructor(dom){
        this.domElement = dom 
        this.name= this.domElement.id;
        this.color = `hsl(${(Math.floor(Math.random()*255))},70%,70%)`
    }

    changeColor(){
        this.domElement.style.fill = this.color
    }
}

let countries = []
let countriesToFind = []
for(let i = 0;i<test.length;i++){
    countries.push(new Country(test[i]))
    countriesToFind.push(countries[i].name)
    //console.log(countries[i].name)
}

let currentCountry = countriesToFind.pop()
countryToFindElement.innerText = currentCountry

boardElement.addEventListener("click", (e)=>{
    let clickedName = e.target.id
    let clickedCountry;
    for (let x of countries){
        if(x.name === clickedName){
         clickedCountry = x
        }
    }
    console.log(clickedCountry.name)

    if(clickedCountry.name === currentCountry){
        clickedCountry.changeColor()
        currentCountry = countriesToFind.pop()
        countryToFindElement.innerText = currentCountry
    }

}
)

