const gridLeftTop = document.querySelector('.gridLeftTop');
const addBtn = document.querySelector('.add');
const removeBtn = document.querySelector('.remove');
const from = document.querySelectorAll('.from');
const to = document.querySelectorAll('.to');
let arrFrom = [];
let arrTo = [];

removeBtn.addEventListener('click', () => {
    if (arrFrom.length <= 0) {
        return false;
    } else {
        arrFrom.pop();
        arrTo.pop();
        gridLeftTop.removeChild(gridLeftTop.lastChild);
        gridLeftTop.removeChild(gridLeftTop.lastChild);
    }
    console.log(arrFrom);
    console.log(arrTo);
})

addBtn.addEventListener('click', () => {
    var boxFrom = document.createElement("input");
    var boxTo = document.createElement("input");
    boxFrom.classList.add('from');
    boxTo.classList.add('to');
    arrFrom.push(boxFrom);
    arrTo.push(boxTo);
    gridLeftTop.appendChild(boxFrom);
    gridLeftTop.appendChild(boxTo);
    console.log(arrFrom);
    console.log(arrTo);
})


/* !  

addBtn.addEventListener('click', () => {
    arrFrom.push(document.createElement("input"))
    arrFrom.at(-1).classList.add("from")

    arrTo.push(document.createElement("input"))
    arrTo.at(-1).classList.add("to")

    gridLeftTop.append(arrFrom.at(-1));
    gridLeftTop.append(arrTo.at(-1));

    console.log(arrFrom);
    console.log(arrTo);
}) 

*/