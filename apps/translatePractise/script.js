const gridLeftTop = document.querySelector('.gridLeftTop');
const addBtn = document.querySelector('.add');
const removeBtn = document.querySelector('.remove');
const from = document.querySelectorAll('.from');
const to = document.querySelectorAll('.to');
let arrFrom = [];
let arrTo = [];
// size = 10;

// addBtn.addEventListener('click', () => {
//         arrFrom.push(document.createElement("input"));
//         arrTo.push(document.createElement("input"));
//         gridLeftTop.appendChild(arrFrom);
//         gridLeftTop.appendChild(arrTo);
// })


// for (let i = 0; i < size; i++) {
//     removeBtn.addEventListener('click', () => {
//         gridLeftTop.removeChild(gridLeftTop.lastChild);
//         gridLeftTop.removeChild(gridLeftTop.lastChild);
//     })
// }

// console.log(arrFrom);


removeBtn.addEventListener('click', () => {
    gridLeftTop.removeChild(gridLeftTop.lastChild);
    gridLeftTop.removeChild(gridLeftTop.lastChild);
})

addBtn.addEventListener('click', () => {
    var boxFrom = document.createElement("input");
    var boxTo = document.createElement("input");
    boxFrom.classList.add('from');
    boxTo.classList.add('to');
    gridLeftTop.appendChild(boxFrom);
    gridLeftTop.appendChild(boxTo);
})