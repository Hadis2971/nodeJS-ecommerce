const orderBtns = document.getElementsByClassName("order-btn");

function orderBtnHandler(evt){
    evt.preventDefault();
    console.log(evt.target);
}

for(let i = 0; i < orderBtns.length; i++){
    orderBtns[i].addEventListener("click", orderBtnHandler);
}