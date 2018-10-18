const orderBtns  = document.getElementsByClassName("order-btn");
const numOfItems = document.getElementById("numOfItems");
const postLink   = document.getElementById("post-link");

const appData = {
    orders: []
}

function makeOrder(){
    if(!appData.orders.length){return;}
    const xmlHTTP = new XMLHttpRequest();
    xmlHTTP.open("POST", "/myOrder", true);
    xmlHTTP.setRequestHeader("Content-Type", "application/json");
    xmlHTTP.send(JSON.stringify(appData.orders));
};

function orderBtnHandler(evt){
    evt.preventDefault();

    let num = (Number(numOfItems.textContent));
    num += 1;
    numOfItems.textContent = num;

    const parent   = evt.target.parentNode;
    const title    = parent.getElementsByClassName("card-title")[0].textContent;
    const platform = parent.getElementsByClassName("platform")[0].textContent;
    const price = parent.getElementsByClassName("price")[0].textContent;

    appData.orders.push({title: title, platform: platform, price: price});
    
};

for(let i = 0; i < orderBtns.length; i++){
    orderBtns[i].addEventListener("click", orderBtnHandler);
};

postLink.addEventListener("click", makeOrder);