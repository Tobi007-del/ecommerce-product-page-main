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
const deleteItems = document.getElementById("delete-items");
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
const Stock = document.getElementById("left-in-stock");

var toucher = 0;
document.getElementById("cart").addEventListener('click',()=>{
    toucher ++;
    if(toucher == 1){
        document.getElementById("dropdown").classList.add('hover');
    } else {
        toucher = 0;
        document.getElementById("dropdown").classList.remove('hover');
    }
})

document.getElementById("hamburger-icon").addEventListener('click',()=>{
    document.getElementById('nav-menu-container').style.display = "flex";
})

document.getElementById("close-menu").addEventListener('click',()=>{
    document.getElementById('nav-menu-container').style.display = "none";
})

async function registerServiceWorker(){
    if("serviceWorker" in navigator){
    await navigator.serviceWorker.register('e-service-worker.js').then(function(registration) {
    console.log('Registration succeeded. ',registration);
    })
    .catch(function(error) {
      // registration failed
      console.log('Registration failed with ' + error);
    })} else {
        console.error("Service workers are not supported.")
    }
}


window.addEventListener("load", () => {
  
    checkOut.addEventListener("click", () => {
        const title = "sneakers.com";
        const options = {
            body: `Order: ${totalCartNo} Fall Limited Edition Sneakers. Make a transfer of ${CPV(TP)} to the Zenith Account: 4230814118`, 
            icon:"/ecommerce-product-page-main/images/image-product-2-thumbnail.jpg", 
            image: "/ecommerce-product-page-main/images/image-product-3.jpg",
            tag: 'renotify',
            renotify: true,
        };        
      if (Notification?.permission === "granted") {
        registerServiceWorker()
        navigator.serviceWorker.ready.then(function(registration) {
            registration.showNotification(title, options);
        });
        }

       else if (Notification && Notification.permission !== "denied") {
         Notification.requestPermission().then((status) => {
        if (status === "granted") {
            registerServiceWorker()
            navigator.serviceWorker.ready.then(function(registration) {
            registration.showNotification(title, options);
            });
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



var CP = 125000;
var discount = 50;
var AP = parseFloat(CP / (discount/100));
var TP = 0;
var totalCartNo = 0;
var totalStock = 30;
var MAX = 10;
var MIN = 1;
var minItems = MIN;
var cartNo = minItems;
var slideIndex = 1;
var stockLeft = totalStock;
var addMax = MAX;
var minMinus = MIN;
var clickCounter = 0;
// var CY = "\u20A6";
var CY = "$";


function RD(d){
    if((d - Math.floor(d)) !== 0){
        return discount.toFixed(2)
    } else {
        return discount.toFixed()
    }
}
function CPV(C){
    let th,m,b,tr;
    th = C/1000;
    m = C/1000000;
    b = C/1000000000;
    tr = C/1000000000000;
    if((th < 1) && (m < 1) && (b < 1) && (tr < 1)){
        if(((C) - Math.floor(C)) !== 0){
            return `${CY}${C.toFixed(2)}`;
        } else {
            return `${CY}${C.toFixed(2)}`;
        }
    } else if((th >= 1) && (m < 1) && (b < 1) && (tr < 1)){
        if(((C) - Math.floor(C)) !== 0){
            return `${CY}${C.toFixed(2)}`;
        } else {
            return `${CY}${C.toFixed()}`;
        }
    } else if((m >= 1) && (th > 1) && (b < 1) && (tr < 1)){
        if(((m) - Math.floor(m)) !== 0){
            return `${CY}${m.toFixed(2)}M`;
        } else {
            return `${CY}${m.toFixed()}M`;
        }        
    } else if((b >= 1) && (th > 1) && (m > 1) && (tr < 1)){
        if(((b) - Math.floor(b)) !== 0){
            return `${CY}${b.toFixed(2)}B`;
        } else {
            return `${CY}${b.toFixed()}B`;
        }        
    } else if((tr >= 1)&& (th > 1) && (m > 1) && (b > 1)){
        if(((tr) - Math.floor(tr)) !== 0){
            return `${CY}${tr.toFixed(2)}T`;
        } else {
            return `${CY}${tr.toFixed()}T`;
        }        
    }
}

document.getElementById("current-price").innerHTML = CPV(CP);
document.getElementById("discount").innerHTML = `${RD(discount)}% Off`;
document.getElementById("actual-price").innerHTML = CPV(AP)
document.getElementById("actual-price").setAttribute("data-length", CPV(CP))
document.getElementById("cart-price-value").innerHTML = `${CPV(CP)} x`;


const stock = (e) => {
    if(e === 0){
        Stock.innerHTML = "";
        document.getElementById("stock-text").innerHTML = "Out of Stock";
    } else{
        document.getElementById("stock-text").innerHTML = "In Stock";
        Stock.innerHTML = e;
    }
}
const RTstock = (e) => {
    if(e === 0){
        Stock.innerHTML = "";
        if(parseInt(cartNumber.innerHTML) === 0){
            document.getElementById("stock-text").innerHTML = "Out of Stock";
        } else{
            document.getElementById("stock-text").innerHTML = "0 left in Stock";
        }
    } else {
        document.getElementById("stock-text").innerHTML = "left In Stock";
        Stock.innerHTML = e;
    }
}

add.addEventListener('click', ()=>{
   stockLeft = totalStock - totalCartNo;
   if (stockLeft >= MAX){
     addMax = MAX;
   } else{
     addMax = stockLeft;
   }
   addSetting(addMax);
})

function addSetting(x){
    if((minItems !== MIN) && (minItems >= MAX) && (clickCounter === 0) && (formerOrder === 0)){
        console.log(`Ain't no way u adding to that number boiii`);
        add.classList.remove("hover");
    } else {
    if(cartNo < x){
        cartNo ++;
        cartNumber.innerHTML = cartNo;   
        RTstock(stockLeft - cartNo);
        CartButton(addToCartButton);
        minusOpaque(minus,MIN);
        addOpaque(add,x);}
    if(cartNo >= x){
        cartNo = x;
        cartNumber.innerHTML = cartNo;
        console.log(`Ain't no way u adding to that number boiii`);
        RTstock(stockLeft - cartNo);
        CartButton(addToCartButton)
        minusOpaque(minus,MIN);
        addOpaque(add,x);
        if(cartNo === 0 ){
            addToCartButtonText.innerHTML = "Out of Stock";
            addToCartCart.style.transform = "rotate(80deg)";
            addToCartButton.style.opacity = "0.7";
        }
    }
    }
}
minus.addEventListener('click', ()=>{
    stockLeft = totalStock - totalCartNo;
    if (stockLeft >= MIN){
      minMinus = MIN;
    } else{
      minMinus = stockLeft;
    }
    minusSetting(minMinus);
})

function minusSetting(x){    
if((minItems !== MIN) && (cartNo === minItems) && (clickCounter === 0) && (formerOrder === 0)){
    console.log(`Ain't no way u removing from that number boiii`);
    minus.classList.remove("hover")
} else {
    if(cartNo > x){
        if(cartNo === 1){
            cartNo = 1;
            cartNumber.innerHTML = 1;
            console.log(`Ain't no way u removing from that number boiii`);
            RTstock(stockLeft - cartNo);
            CartButton(addToCartButton)
            minusOpaque(minus,1);
            addOpaque(add,addMax);
        } else {
            cartNo --;
            cartNumber.innerHTML = cartNo;
            RTstock(stockLeft - cartNo);
            CartButton(addToCartButton);
            minusOpaque(minus,x);
            addOpaque(add,addMax);
        }
    }
}
}


function CartButton(button) {
    button.addEventListener('mouseover', ()=>{
    button.style.opacity = "0.8";
})
    button.addEventListener('mouseout', ()=> {
    button.style.opacity = "1.0";
    if(parseInt(cartNumber.innerHTML) === 0) {
    button.style.opacity = "0.8";
    }
})}

function addOpaque(ad,n) {
    if(cartNo < n)
    { 
    if(parseInt(cartNumber.innerHTML) === 0){
        ad.classList.remove("hover");   
    } else{
        ad.classList.add("hover");
    }
    } else {
        ad.classList.remove("hover");   
    }
}
function minusOpaque(min,n) {
    if(cartNo > n)
    {
        min.classList.add("hover");
    } else {
        min.classList.remove("hover")
    }
}

var formerOrder = localStorage.totalorder;
var initialStockLeft = totalStock;
if (formerOrder === undefined){
    formerOrder = 0;
} 


var f = 0;

formerOrder = parseInt(formerOrder);
if(formerOrder > 0 && f === 0){
    totalCartNo = formerOrder;
    initialStockLeft = totalStock - totalCartNo;
    stock(initialStockLeft);
    TP = TP + (CP * totalCartNo)
    totalCartPrice.textContent = CPV(TP);
    orderPrice.textContent = CPV(TP);
    noOfItems.textContent = totalCartNo;
    noOfOrderedItems.textContent = totalCartNo;
    noOfCartItems.textContent = totalCartNo;
    if(totalCartNo > 1){
    deleteItems.title = `Remove ${totalCartNo} items from cart`;
    }
    else {
    deleteItems.title = `Remove ${totalCartNo} item from cart`;
    }
    emptyCart.style.display = "none";
    fullCart.style.display = "flex";
    noOfItems.style.display = "block"; 
    noOfItems.style.animationName = "happy-ball";
    cart.style.animationName = "happy-cart";
    cart.classList.add('active');
    if(totalCartNo >= totalStock)
    {
        addToCartButtonText.innerHTML = "Out of Stock";
        addToCartCart.style.transform = "rotate(80deg)";
        addToCartButton.style.opacity = "0.7";
        CartButton(addToCartButton);
        cartNumber.innerHTML = 0;
        add.classList.remove("hover");
    }
    if(initialStockLeft > MIN){
        cartNo = MIN;
        cartNumber.innerHTML = cartNo;
    } else{
        cartNo = initialStockLeft;
        cartNumber.innerHTML = cartNo;
    }
} else{
    if(MIN !== minItems){
    cartNumber.innerHTML = minItems;
    stock(stockLeft);
    } else {
    cartNumber.innerHTML = MIN;
    stock(stockLeft);
    }
}


if((MAX > MIN) && (MAX > minItems) && (formerOrder === 0) && (f === 0)){
    add.classList.add("hover");
 } else if((formerOrder > 0) && (f === 0)){
    add.classList.add("hover");
 }


var minStockLeft = stockLeft;
addToCartButton.addEventListener('click', ()=>{
    cartTitle.innerHTML = "Cart";
    checkOutContent.style.display = "none";
    stockLeft = totalStock - totalCartNo;
    CartButton(addToCartButton);
    addMax = MAX;
    clickCounter ++; 
    f = 1;
    if(totalCartNo < totalStock){ 
    if(clickCounter === 1){
        totalCartNo = 0;
        totalCartNo = cartNo + formerOrder;
        TP = (CP * totalCartNo);
        if(stockLeft > MIN){
            cartNo = MIN;
            cartNumber.innerHTML = cartNo;
        } else{
            cartNo = stockLeft;
            cartNumber.innerHTML = cartNo;
        }
        // cartNo = 1;
        // cartNumber.innerHTML = cartNo;
        addOpaque(add, addMax)
        minusOpaque(minus,MIN)
    } else {
    totalCartNo += cartNo;
    minStockLeft = totalStock - totalCartNo;
    if(minStockLeft > MIN){
        cartNo = MIN;
        cartNumber.innerHTML = cartNo;
    } else if(minStockLeft === 0){
        cartNo = 0;
        cartNumber.innerHTML = 1;
    } else{
        cartNo = minStockLeft;
        cartNumber.innerHTML = cartNo;
    }
    // cartNo = 1;
    // cartNumber.innerHTML = cartNo;
    TP = 0;
    TP = (CP * totalCartNo);
    addOpaque(add, addMax)
    minusOpaque(minus,MIN)
    }
    localStorage.totalorder = totalCartNo;
    if(totalCartNo === 0){ 
        emptyCart.style.display = "flex";
        fullCart.style.display = "none";
        noOfItems.style.display = "none";
        noOfItems.style.animationName = "";
        cart.style.animationName = "";
    } else {
    totalCartPrice.textContent = CPV(TP);
    orderPrice.textContent = CPV(TP);
    noOfItems.textContent = totalCartNo;
    noOfOrderedItems.textContent = totalCartNo;
    noOfCartItems.textContent = totalCartNo;
    stock(totalStock - totalCartNo);
    if(totalCartNo > 1){
    deleteItems.title = `Remove ${totalCartNo} items from cart`;
    }
    else {
    deleteItems.title = `Remove ${totalCartNo} item from cart`;
    }
    emptyCart.style.display = "none";
    fullCart.style.display = "flex";
    noOfItems.style.display = "block"; 
    noOfItems.style.animationName = "happy-ball";
    cart.style.animationName = "happy-cart";
    cart.classList.add('active');
    }} else if(checkOutClickCounter < 1){
        addToCartButtonText.innerHTML = "Out of Stock";
        addToCartCart.style.transform = "rotate(80deg)";
        addToCartButton.style.opacity = "0.7";
        cartNumber.innerHTML = 0;
        CartButton(addToCartButton);
        add.classList.remove("hover");
}})
deleteCart.addEventListener('click', ()=>{
    if (window.confirm(`You are about to remove ${totalCartNo} ${document.getElementById("product-name").innerHTML} from your cart`)){
    delete localStorage.totalorder;
    emptyCart.style.display = "flex";
    fullCart.style.display = "none";
    noOfItems.style.display = "none";
    noOfItems.style.animationName = "";
    cart.style.animationName = "";
    cart.classList.remove('active');
    addToCartButton.style.opacity = "1";
    formerOrder = 0;
    clickCounter = 0;
    TP = 0;
    totalCartNo = 0;
    stock(totalStock);
    cartNo = minItems;
    addMax = MAX;
    cartNumber.innerHTML = cartNo;
    addToCartButtonText.innerHTML = "Add to cart";
    addToCartCart.style.transform = "rotate(0deg)";
    addToCartButton.style.opacity = "1";
    CartButton(addToCartButton);
    addOpaque(add, addMax);
    minusOpaque(minus, minItems);}
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

