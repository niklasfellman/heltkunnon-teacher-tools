let test = document.querySelectorAll("path")
let boardElement = document.querySelector(".board")

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

for(let i = 0;i<test.length;i++){
    countries.push(new Country(test[i]))

    console.log(countries[i].name)
}

boardElement.addEventListener("click", (e)=>{
    console.log(e.target.id)

    let clickedName = e.target.id
    let clickedCountry;
    for (let x of countries){
        if(x.name === clickedName){
         clickedCountry = x
            x.changeColor()
        }
    }

    console.log(clickedCountry)

})