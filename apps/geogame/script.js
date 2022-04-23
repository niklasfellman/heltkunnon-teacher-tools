
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
    //test[i].style.fill = `hsl(${(255/test.length) * i},60%,70%)`
    countries.push(new Country(test[i]))

    console.log(countries[i].name)
}

boardElement.addEventListener("click", (e)=>{
    console.log(e.target.id)
})