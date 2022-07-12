//declaring a few gloabl variables

let addToCartBtn = document.getElementsByClassName("addToCart");
let cartContainer = document.getElementById("cart-container");
let cartCol = document.getElementById("cart-col");
let product;
let cartObj = {
    items: [],
    total: 0
}

// Add an eventListener() to all the cart buttons

for(let i = 0; i < addToCartBtn.length; i++){
    addToCartBtn[i].addEventListener("click",function(){
        let button = addToCartBtn[i];
        //alert(button);
         cart(button);
    })
}

//cart()


function cart(item){
//alert(item);
let parent = item.parentElement;
//alert(parent);
let children = parent.children;
product = children;
//alert(product);
/*
for(let i = 0;  i < product.length; i++){
    alert(product[i].innerHTML);
}
*/
buildCartObj(product);
}//end of function

function buildCartObj(product){

    let productObj = {};

   // for(let i = 0; i < product.length; i++){
        productObj.productName = product[0].innerHTML;
        productObj.productPrice = product[4].innerHTML;
        productObj.productImg = product[1].src; 
        productObj.productId =  Math.floor(Math.random() * 101);
    //}
   // alert(productObj);
    cartObj.items.push(productObj);
   // alert(cartObj.items.length);
    //remove duplicates 

    let result = cartObj.items.filter(function(item,index){
        return cartObj.items.findIndex((x)=>{
          return x.productName === item.productName && x.productPrice === item.productPrice; 
        }) == index;
    })
    cartObj.items = result;
   buildDOM();
    console.log(cartObj.items.length);
}//end of buildCartObj

function buildDOM(){
//console.log(cartObj.items);

while(cartCol.children.length){
    cartCol.removeChild(cartCol.children[0]);
}


let cartItems =  cartObj.items;

for(let i = 0;  i < cartItems.length; i++){
 let div = document.createElement("div");
let productTitle = document.createElement("h5");
let image = document.createElement("img");
let productPrice = document.createElement("p");
let productId = document.createElement("p");
let removeButton = document.createElement('button');

 div.setAttribute('class', "col-sm-8 d-flex justify-content-between cart-div");
 productTitle.innerHTML = cartItems[i].productName;
 image.src = cartItems[i].productImg;
 image.class ="cart-image"; //img-fluid
 image.style.width = "20%";
 productPrice.innerHTML = cartItems[i].productPrice;
 productId.innerHTML = cartItems[i].productId;
 
removeButton.setAttribute("class", "btn btn-danger");
removeButton.innerHTML = "remove";
removeButton.setAttribute("onclick", "remove(this)");
div.appendChild(productTitle);
div.appendChild(image);
div.appendChild(productPrice);
div.appendChild(productId);
div.appendChild(removeButton);
cartCol.appendChild(div);
}//end of for
cartContainer.style.display = "block";

total();
}//end of buildDOM



function remove(button){

console.log(button);
console.log(button.parentElement);
let itemId = parseInt(button.previousElementSibling.innerHTML);
console.log(itemId);
for(let i = 0; i <cartObj.items.length; i++){
    if(cartObj.items[i].productId === itemId){
      cartObj.items.splice(i, 1);
    }
}
buildDOM();
total();
}//end of remove()

function total(){
let sum = 0;
cartObj.items.forEach(function(item){
    let itemPrice = parseFloat(item.productPrice.substring(1));
    alert(itemPrice);
    sum += itemPrice;
})
cartObj.total = sum;
document.getElementById('totalP').innerHTML = "Cart total is " + sum + " ";
paypal();
}//end of total()

//paypal()


function paypal(){
    if(cartObj.total > 0){
  let paypalButton = document.createElement("button");
  paypalButton.setAttribute("class", "btn btn-primary btn-lg");
  let anchor = document.createElement("a");
  anchor.id = "anchor";
  anchor.href = "paypal.html";
  anchor.innerHTML = "Paypal";
  paypalButton.appendChild(anchor);
  document.getElementById("totalP").appendChild(paypalButton);
  sessionStorage.setItem("paypalTotal", JSON.stringify(cartObj.total));
    }//end of if()
}//end of paypal()
