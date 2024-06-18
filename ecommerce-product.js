const add = document.getElementById("add");
const minus = document.getElementById("minus");
const cartNumber = document.getElementById("cart-number");
const addToCartButton = document.getElementById("add-to-cart");
const cart = document.getElementById("cart");
const noOfItems = document.getElementById("no-of-items");
const emptyCart = document.getElementById("empty-cart");
const fullCart = document.getElementById("full-cart");
const noOfCartItems = document.getElementById("no-of-cart-items");
const noOfOrderedItems = document.getElementById("no-of-ordered-items");
const totalCartPrice = document.getElementById("total-cart-price");
const orderPrice = document.getElementById("order-price");
const deleteCart = document.getElementById("delete-cart");
const addToCartButtonText = document.getElementById("add-to-cart-text");
const addToCartCart = document.getElementById("add-to-cart-cart");
const smallPics = document.querySelectorAll(".small-pics");
const bigPics = document.querySelectorAll(".big-pics");
const lightBox = document.getElementById("light-box");
const lightBoxMains = document.querySelectorAll(".light-box-main");
const lightBoxSubs = document.querySelectorAll(".light-box-sub")
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const close = document.getElementById("close");
const checkOut = document.getElementById("check-out");
const checkOutContent = document.getElementById("check-out-content");
const cartTitle = document.getElementById("cart-title");
const profilePicPicker = document.getElementById("profile-pic-picker");
const profilePic = document.getElementById("profile-pic");

window.addEventListener("load", () => {
const button = document.querySelector("button");
  
    if (window.self !== window.top) {
      button.textContent = "View live result of the example code above";
      button.addEventListener("click", () => window.open(location.href));
      return;
    }
  
    checkOut.addEventListener("click", () => {
      if (Notification?.permission === "granted") {
      let n = new Notification("sneakers.com", {
        body: `Order: ${totalCartNo} Fall Limited Edition Sneakers. Make a transfer of $${totalPrice}.00 to the Zenith Account: 4230814118`, icon: "/ecommerce-product-page-main/images/image-product-2-thumbnail.jpg"
      });
        // const interval = setInterval(() => {
        //   n.close()
        // }, 10000);
      } else if (Notification && Notification.permission !== "denied") {
         Notification.requestPermission().then((status) => {
      if (status === "granted") {
      let n = new Notification("sneakers.com", {
        body: `Order: ${totalCartNo} Fall Limited Edition Sneakers. Make a transfer of $${totalPrice}.00 to the Zenith Account: 4230814118`, icon: "/ecommerce-product-page-main/images/image-product-2-thumbnail.jpg"
      });
        // const interval = setInterval(() => {
        //   n.close()
        // }, 10000);
          } else {
            alert("You have to give notification permission to get the checkout notification");
          }
        });
      } else {
        alert("You have to give notification permission to get the checkout notification");
      }
    });
  });


if(localStorage.imgsrc !== undefined){
    profilePic.src = localStorage.imgsrc;
}




profilePicPicker.addEventListener('change', showImage);
function showImage(evt){
    var files = evt.target.files;

    var reader = new FileReader();
    reader.onload = function(event){
    var img = profilePic;
    try {
       localStorage.imgsrc = event.target.result;
       img.src = event.target.result;
    } catch (error) {
    alert(`The image file selected is too large!!`)
    }   
    }
    reader.readAsDataURL(files[0]);
}



var cartNo = 1;
var costPrice = 125;
var totalPrice = 0;
var totalCartNo = 0;
var totalStock = 30;
var maxAdd = 10;
var slideIndex = 1;
var stockLeft;
var addMax;


add.addEventListener('click', ()=>{
    stockLeft = totalStock - totalCartNo;
   if (stockLeft >= maxAdd){
    addMax = maxAdd;
   } else{
   addMax = stockLeft;
}
   addSetting(addMax);
})

function addSetting(x){
    if(cartNo < x){
        cartNo ++;
        console.log(cartNo);
        cartNumber.innerHTML = cartNo;
        if(totalCartNo < totalStock){
           addToCartButton.style.opacity = "1";
        }
        CartButton(addToCartButton);
        minusOpaque(minus);
        addOpaque(add,x);}
    if(cartNo >= x){
        cartNo = x;
        cartNumber.innerHTML = x;
        CartButton(addToCartButton)
        minusOpaque(minus);
        addOpaque(add,x);
        if(cartNo === 0 ){
            addToCartButtonText.innerHTML = "Out of Stock";
            addToCartCart.style.transform = "rotate(80deg)";
            addToCartButton.style.opacity = "0.7";
        }
    }
}
minus.addEventListener('click', ()=>{
    stockLeft = totalStock - totalCartNo;
    if(cartNo > 1){
        cartNo--;
        cartNumber.innerHTML = cartNo;
        if(totalCartNo < totalStock){
           addToCartButton.style.opacity = "1";
    }
        CartButton(addToCartButton);
        minusOpaque(minus);
        addOpaque(add,addMax);
    }
    if(cartNo === 1){
        cartNo = 1;
        CartButton(addToCartButton);
        minusOpaque(minus);
        addOpaque(add,addMax);
    }
})



function CartButton(button) {
    button.addEventListener('mouseover', ()=>{
    button.style.opacity = "0.7";
})
    button.addEventListener('mouseout', ()=> {
    button.style.opacity = "1.0";
    if(parseInt(cartNumber.innerHTML) === 0) {
    button.style.opacity = "0.7";
    }
})}

function addOpaque(ad,n) {
    if(cartNo < n)
    {
        ad.classList.add("hover");
    } else {
        ad.classList.remove("hover");   
    }
}
function minusOpaque(min) {
    if(cartNo > 1)
    {
        min.classList.add("hover");
    } else {
        min.classList.remove("hover")
    }
}

var formerOrder = localStorage.totalorder;
if (formerOrder === undefined){
    formerOrder = 0;
} 
console.log(formerOrder)
add.classList.add("hover");

var f = 0;
formerOrder = parseInt(formerOrder);
if(formerOrder > 0 && f === 0){
    totalCartNo = formerOrder;
    totalPrice = totalPrice + (costPrice * totalCartNo)
    totalCartPrice.textContent = `$${totalPrice}.00`;
    orderPrice.textContent = `$${totalPrice}.00`;
    noOfItems.textContent = totalCartNo;
    noOfOrderedItems.textContent = totalCartNo;
    noOfCartItems.textContent = totalCartNo;
    emptyCart.style.display = "none";
    fullCart.style.display = "flex";
    noOfItems.style.display = "block"; 
    noOfItems.style.animationName = "happy-ball";
    cart.style.animationName = "happy-cart";
    if(totalCartNo >= totalStock)
    {
        addToCartButtonText.innerHTML = "Out of Stock";
        addToCartCart.style.transform = "rotate(80deg)";
        addToCartButton.style.opacity = "0.7";
        CartButton(addToCartButton);
        cartNumber.innerHTML = 0;
        add.classList.remove("hover");
    }
}


var clickCounter = 0;
addToCartButton.addEventListener('click', ()=>{
    cartTitle.innerHTML = "Cart";
    checkOutContent.style.display = "none";
    stockLeft = totalStock - totalCartNo;
    CartButton(addToCartButton);
    addMax = maxAdd;
    clickCounter ++; 
    f = 1;
    if(totalCartNo < totalStock){ 
    if(clickCounter === 1){
        totalCartNo = 0;
        totalCartNo = cartNo + formerOrder;
        totalPrice = (costPrice * totalCartNo);
        cartNo = 1;
        cartNumber.innerHTML = cartNo;
        addOpaque(add, addMax)
        minusOpaque(minus)
    } else {
    totalCartNo += cartNo;
    cartNo = 1;
    cartNumber.innerHTML = cartNo;
    totalPrice = 0;
    totalPrice = (costPrice * totalCartNo);
    addOpaque(add, addMax)
    minusOpaque(minus)
    }
    localStorage.totalorder = totalCartNo;
    if(totalCartNo === 0){ 
        emptyCart.style.display = "flex";
        fullCart.style.display = "none";
        noOfItems.style.display = "none";
        noOfItems.style.animationName = "";
        cart.style.animationName = "";
    } else {
    totalCartPrice.textContent = `$${totalPrice}.00`;
    orderPrice.textContent = `$${totalPrice}.00`;
    noOfItems.textContent = totalCartNo;
    noOfOrderedItems.textContent = totalCartNo;
    noOfCartItems.textContent = totalCartNo;
    emptyCart.style.display = "none";
    fullCart.style.display = "flex";
    noOfItems.style.display = "block"; 
    noOfItems.style.animationName = "happy-ball";
    cart.style.animationName = "happy-cart";
    }} else if(checkOutClickCounter < 1){
        addToCartButtonText.innerHTML = "Out of Stock";
        addToCartCart.style.transform = "rotate(80deg)";
        addToCartButton.style.opacity = "0.7";
        cartNumber.innerHTML = 0;
        CartButton(addToCartButton);
        add.classList.remove("hover");
}})
deleteCart.addEventListener('click', ()=>{
    if (window.confirm("Are you sure you want to delete cart?")){
    delete localStorage.totalorder;
    emptyCart.style.display = "flex";
    fullCart.style.display = "none";
    noOfItems.style.display = "none";
    noOfItems.style.animationName = "";
    cart.style.animationName = "";
    addToCartButton.style.opacity = "1";
    formerOrder = 0;
    totalPrice = 0;
    totalCartNo = 0;
    cartNo = 1;
    addMax = maxAdd;
    cartNumber.innerHTML = cartNo;
    addToCartButtonText.innerHTML = "Add to cart";
    addToCartCart.style.transform = "rotate(0deg)";
    addToCartButton.style.opacity = "1";
    CartButton(addToCartButton);
    addOpaque(add, addMax);
    minusOpaque(minus);}
})

var checkOutClickCounter = 0;
checkOut.addEventListener('click', ()=>{
    checkOutClickCounter++;
    console.log(checkOutClickCounter)
    emptyCart.style.display = "none";
    fullCart.style.display = "none";
    checkOutContent.style.display = "flex";
    cartTitle.innerHTML = "Check Out";
})
smallPics.forEach((smallPic,i) => {  
    smallPic.addEventListener('click', ()=>{        
        smallPics.forEach((smallPicture) => {
        smallPicture.className = smallPicture.className.replace(" current","");
        })
        smallPic.className += " current";
        bigPics.forEach((bigPic,i) => {
            bigPic.style.display = "none";
        })
        bigPics[i].style.display = "block";
    })
});
bigPics.forEach((bigPicture,i) => {
bigPicture.addEventListener('click', ()=> {
    lightBox.style.display = "flex";
    lightBoxOpen(slideIndex = i+1);
})})

close.addEventListener('click', ()=>{
    lightBox.style.display = "none";
})

lightBoxSubs.forEach((lightBoxSub,i) => {  
    lightBoxSub.addEventListener('click', ()=>{
        lightBoxOpen(slideIndex = i+1);
    })
});

function lightBoxOpen(n){        
    lightBoxSubs.forEach((lightBoxSubstitute) => {
    if(n > lightBoxSubs.length){
        slideIndex = 1;
    }
    if(n < 1){
        slideIndex = lightBoxSubs.length;
    }
    lightBoxSubstitute.className = lightBoxSubstitute.className.replace(" current","");
    })
    lightBoxSubs[slideIndex-1].className += " current";
    lightBoxMains.forEach((lightBoxMain) => {
        lightBoxMain.style.display = "none";
    })
    lightBoxMains[slideIndex-1].style.display = "block";
}

prev.addEventListener('click', ()=>{
   slideIndex -= 1;
   console.log(slideIndex);
   lightBoxOpen(slideIndex);
})
next.addEventListener('click', ()=>{
    slideIndex += 1;
    console.log(slideIndex);
    lightBoxOpen(slideIndex);
})

