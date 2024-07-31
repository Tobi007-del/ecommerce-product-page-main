//#VANILLA JAVASCRIPT ONLY


//declaration of variables, doesn't have to be done at the top though since variables are hoisted in javascript, it's just preference
// EVERYTHING IS STORED IN VARIABLES AND CAN BE HIGHLY CUSTOMISABLE
//CUSTOMISABLE VARIABLES
var CP = 32550,//COST PRICE
D = 30,//DISCOUNT
AP = parseFloat(CP / ((100-D)/100)),//ACTUAL PRICE
TS = 70,//TOTAL STOCK: TOTAL NUMBER OF ITEMS IN STOCK #should be greater than MAX,MIN and MNI values
MAX = 10,//MAXIMUM NUMBER OF ITEMS THAT CAN BE ADDED TO CART AT A TIME
MIN = 1,//MINIMUM NUMBER OF ITEMS THAT CAN BE ADDED TO CART AT A TIME #should not be more than the MAX value
MNI = MIN,//MINIMUM NUMBER OF ITEMS THAT CAN BE BOUGHT, DEFAULT IS MIN VALUE #independent of MAX or MIN value
//NOTE: CURRENCY HAS TO BE SUPPORTED BY THE ISO 4217 CURRENCY CODES
CY = 'NGN',//CURRENCY
// var CY = "\u20A6";
// var CY = "$";

//NON-CUSTOMISABLE VARIABLES
AM = MAX,//ADDMAX: maximum number of items that can be added to cart at real time
MM = MIN,//MINMINUS: mimimum number of items that can be added to cart at real time
TP = 0,//TOTAL PRICE: total price of items at real time
TCN = 0,//TOTAL CART NUMBER: total number of items in cart at real time
CN = MNI,//CART NUMBER: this variable stores the cn at real time 
SL = TS,//STOCK LEFT: this variable stores the number of items left in stock
MSL = SL,//MIN STOCK LEFT: this variable stores the number of items left in stock at real time
CC = 0,//CLICK COUNTER: handles just the first click of the add to cart button
FO = localStorage.totalorder,//FORMER ORDER: pre-existing order being fetched from localStorage if present
ISL = TS,//INITIAL STOCK LEFT: number of items left in stock at the time the user enters the page
f = 0,//a value used to know if the user session just started or not to prevent miscalculation
SIN = 1;//SLIDE INDEX: used to control the image being shown at the current time


//declaring constants for DOM manipulation
const add = document.getElementById("add"),
minus = document.getElementById("minus"),
cn = document.getElementById("cart-number"),
atcb = document.getElementById("add-to-cart"),
cart = document.getElementById("cart"),
noi = document.getElementById("no-of-items"),
ec = document.getElementById("empty-cart"),
fc = document.getElementById("full-cart"),
noci = document.getElementById("no-of-cart-items"),
nooi = document.getElementById("no-of-ordered-items"),
tcp = document.getElementById("total-cart-price"),
op = document.getElementById("order-price"),
dc = document.getElementById("delete-cart"),
di = document.getElementById("delete-items"),
atcbt = document.getElementById("add-to-cart-text"),
atcc = document.getElementById("add-to-cart-cart"),
sps = document.querySelectorAll(".small-pics"),
bps = document.querySelectorAll(".big-pics"),
lb = document.getElementById("light-box"),
lbm = document.querySelectorAll(".light-box-main"),
lbss = document.querySelectorAll(".light-box-sub"),
prev = document.getElementById("prev"),
next = document.getElementById("next"),
close = document.getElementById("close"),
co = document.getElementById("check-out"),
coc = document.getElementById("check-out-content"),
ct = document.getElementById("cart-title"),
ppp = document.getElementById("profile-pic-picker"),
pp = document.getElementById("profile-pic"),
Stock = document.getElementById("left-in-stock");


//DOM manipulation functions for the text content of the stock text element
//stock function called after the itmes have been added to cart
const stock = (e) => {
    if(e === 0){
        Stock.innerHTML = "";
        document.getElementById("stock-text").innerHTML = "Out of Stock";
    } else{
        document.getElementById("stock-text").innerHTML = "In Stock";
        Stock.innerHTML = e;
    }
}
//real time stock function for the plus and minus button before items have been added to cart
const RTstock = (e) => {
    if(e === 0){
        Stock.innerHTML = "";
        if(parseInt(cn.innerHTML) === 0){
            document.getElementById("stock-text").innerHTML = "Out of Stock";
        } else{
            document.getElementById("stock-text").innerHTML = "0 left in Stock";
        }
    } else {
        document.getElementById("stock-text").innerHTML = "left In Stock";
        Stock.innerHTML = e;
    }
}


//function to get pre-existing order from the local storage if any
function getExistingOrder(){
if (FO === undefined){
    FO = 0;
} 

FO = parseInt(FO);
if(FO > 0 && f === 0){
    TCN = FO;
    ISL = TS - TCN;
    stock(ISL);
    TP = TP + (CP * TCN)
    tcp.textContent = CPV(TP);
    op.textContent = CPV(TP);
    noi.textContent = TCN;
    nooi.textContent = TCN;
    noci.textContent = `x ${TCN}`;
    if(TCN > 1){
    di.title = `Remove ${TCN} items from cart`;
    }
    else {
    di.title = `Remove ${TCN} item from cart`;
    }
    ec.style.display = "none";
    fc.style.display = "flex";
    noi.style.display = "block"; 
    noi.style.animationName = "happy-ball";
    cart.style.animationName = "happy-cart";
    cart.classList.add('active');
    if(TCN >= TS)
    {
        atcbt.innerHTML = "Out of Stock";
        atcc.style.transform = "rotate(80deg)";
        atcb.style.opacity = "0.7";
        CartButton(atcb);
        cn.innerHTML = 0;
        add.classList.remove("hover");
    }
    if(ISL > MIN){
        CN = MIN;
        cn.innerHTML = CN;
    } else{
        CN = ISL;
        cn.innerHTML = CN;
    }
} else{
    if(MIN !== MNI){
    cn.innerHTML = MNI;
    stock(SL);
    } else {
    cn.innerHTML = MIN;
    stock(SL);
    }
}
}
window.onloadstart = getExistingOrder()

//function to calculate price value
function CPV(C){
    //using number format API to format the price values for standardization of currency and to prevent loss
    const WN = new Intl.NumberFormat('en',{
        style:'currency',
        currency: CY,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    })
    const F = new Intl.NumberFormat('en',{
        style:'currency',
        currency: CY,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })
    const FO = new Intl.NumberFormat('en',{
        style:'currency',
        currency: CY,
        minimumFractionDigits: 1,
        maximumFractionDigits: 2,
    })
    let th = C/1000,
        tth = C/10000,
        hth = C/100000,
        m = C/1000000,
        b = C/1000000000,
        tr = C/1000000000000;
    if((th < 1) && (tth < 1) && (hth < 1) && (m < 1) && (b < 1) && (tr < 1)){
        if(((C) - Math.floor(C)) !== 0){
            return `${F.format(C)}`;
        } else {
            return `${F.format(C)}`;
        }
    } else if((th >= 1) && (tth < 1) && (hth < 1) && (m < 1) && (b < 1) && (tr < 1)){
        if(((C) - Math.floor(C)) !== 0){
            return `${F.format(C)}`;
        } else {
            return `${WN.format(C)}`;
        }
    } else if((tth >= 1) && (th > 1) && (hth < 1) && (m < 1) && (b < 1) && (tr < 1)){
        if(((C) - Math.floor(C)) !== 0){
            return `${FO.format(C)}`;
        } else {
            return `${WN.format(C)}`;
        }
    } else if((hth >= 1) && (th > 1) && (tth > 1) && (m < 1) && (b < 1) && (tr < 1)){
        if(((th) - Math.floor(th)) !== 0){
            return `${F.format(th)}K`;
        } else {
            return `${WN.format(th)}K`;
        }
    } else if((m >= 1) && (th > 1) && (tth > 1) && (hth > 1) && (b < 1) && (tr < 1)){
        if(((m) - Math.floor(m)) !== 0){
            return `${FO.format(m)}M`;
        } else {
            return `${WN.format(m)}M`;
        }        
    } else if((b >= 1) && (th > 1) && (tth > 1) && (hth > 1) && (m > 1) && (tr < 1)){
        if(((b) - Math.floor(b)) !== 0){
            return `${FO.format(b)}B`;
        } else {
            return `${WN.format(b)}B`;
        }        
    } else if((tr >= 1) && (th > 1) && (tth > 1) && (hth > 1) && (m > 1) && (b > 1)){
        if(((tr) - Math.floor(tr)) !== 0){
            return `${FO.format(tr)}T`;
        } else {
            return `${WN.format(tr)}T`;
        }        
    }
}

//function to round data off to a fixed decimal point depending on the number
function RD(d){
    if((d - Math.floor(d)) !== 0){
        return d.toFixed(2)
    } else {
        return d.toFixed()
    }
}

//DOM manipulation to fill in all the default price values on the page at startup
function insertPriceValues(){
document.getElementById("current-price").innerHTML = CPV(CP);
document.getElementById("discount").innerHTML = `${RD(D)}% Off`;
document.getElementById("actual-price").innerHTML = CPV(AP)
document.getElementById("actual-price").setAttribute("data-length", CPV(AP))
document.getElementById("cart-price-value").innerHTML = CPV(CP);
}
window.onloadstart = insertPriceValues()

//setting the hover state of the add button on page start
if((MAX > MIN) && (MAX > MNI) && (FO === 0) && (f === 0)){
    add.classList.add("hover");
 } else if((FO > 0) && (f === 0)){
    add.classList.add("hover");
}

//adding click event listener for the cart on phones
var TCH = 0;
document.getElementById("cart").addEventListener('click',()=>{
    TCH ++;
    if(TCH == 1){
        noi.classList.add('hover');
        cart.classList.add('hover');
        document.getElementById("cart-dropdown").classList.add('hover');
    } else {
        TCH = 0;
        noi.classList.remove('hover');
        cart.classList.remove('hover');
        document.getElementById("cart-dropdown").classList.remove('hover');
    }
})

//adding click event listener for the hamburger icon on phones
document.getElementById("hamburger-icon").addEventListener('click',()=>{
    document.getElementById('nav-menu-container').style.display = "flex";
})

document.getElementById("close-menu").addEventListener('click',()=>{
    document.getElementById('nav-menu-container').style.display = "none";
})

//registering the service worker to enable the notification feature usiing an asynchronous function
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

//adding click event listener to send a notifiaction on checkout using the seviceWorker API  
    co.addEventListener("click", () => {
        const tt = "sneakers.com";
        const ops = {
            body: `Make a transfer of ${CPV(TP)} to the Zenith Account: 4230814118. Order: ${TCN} Fall Limited Edition Sneakers. `, 
            icon: "/ecommerce-product-page-main/images/image-product-2-thumbnail.jpg", 
            image: "/ecommerce-product-page-main/images/image-product-3.jpg",
            badge: "/ecommerce-product-page-main/icons8-sneakers-75.png",
            tag: 'renotify',
            renotify: true,
        };        
      if (Notification?.permission === "granted") {
        registerServiceWorker()
        navigator.serviceWorker.ready.then(function(registration) {
            registration.showNotification(tt, ops);
        });
        }

       else if (Notification && Notification.permission !== "denied") {
         Notification.requestPermission().then((status) => {
        if (status === "granted") {
            registerServiceWorker()
            navigator.serviceWorker.ready.then(function(registration) {
            registration.showNotification(tt, ops);
            });
            alert("You have to give notification permission to get the check out notification");
          }
        });
      } else {
        alert("You have to give notification permission to get the check out notification");
      }
    });



//checking local storage for any custom user images 
if(localStorage.imgsrc !== undefined){
    pp.src = localStorage.imgsrc;
}

//using file reader API to help the user pick a custom image for the profile picture
ppp.addEventListener('change', showImage);
function showImage(evt){
    var fs = evt.target.files;

    var r = new FileReader();
    r.onload = function(event){
    var img = pp;
    try {
       localStorage.imgsrc = event.target.result;
       img.src = event.target.result;
    } catch (error) {
    alert(`The image file selected is too large!!`)
    }   
    }
    r.readAsDataURL(fs[0]);
}



//adding click event listener for the plus button
add.addEventListener('click', ()=>{
   SL = TS - TCN;
   if (SL >= MAX){
     AM = MAX;
   } else{
     AM = SL;
   }
   as(AM);
})
//function for calculating the value of the cart number and other settings called on the click of the add button 
function as(x){
    if((MNI !== MIN) && (MNI >= MAX) && (CC === 0) && (FO === 0)){
        add.classList.remove("hover");
    } else {
    if(CN < x){
        CN ++;
        cn.innerHTML = CN;   
        RTstock(SL - CN);
        CartButton(atcb);
        MO(minus,MIN);
        AO(add,x);}
    if(CN >= x){
        CN = x;
        cn.innerHTML = CN;
        RTstock(SL - CN);
        CartButton(atcb)
        MO(minus,MIN);
        AO(add,x);
        if(CN === 0 ){
            atcbt.innerHTML = "Out of Stock";
            atcc.style.transform = "rotate(80deg)";
            atcb.style.opacity = "0.7";
        }
    }
    }
}

//adding click event listener for the minus button
minus.addEventListener('click', ()=>{
    SL = TS - TCN;
    if (SL >= MIN){
      MM = MIN;
    } else{
      MM = SL;
    }
    ms(MM);
})
//function for calculating the value of the cart number and other settings called on the click of the minus button 
function ms(x){    
if((MNI !== MIN) && (CN === MNI) && (CC === 0) && (FO === 0)){
    minus.classList.remove("hover")
} else {
    if(CN > x){
        if(CN === 1){
            CN = 1;
            cn.innerHTML = 1;
            RTstock(SL - CN);
            CartButton(atcb)
            MO(minus,1);
            AO(add,AM);
        } else {
            CN --;
            cn.innerHTML = CN;
            RTstock(SL - CN);
            CartButton(atcb);
            MO(minus,x);
            AO(add,AM);
        }
    }
}
}

//cart button function for setting the hover state
function CartButton(btn) {
    btn.addEventListener('mouseover', ()=>{
    btn.style.opacity = "0.8";
})
    btn.addEventListener('mouseout', ()=> {
    btn.style.opacity = "1.0";
    if(parseInt(cn.innerHTML) === 0) {
    btn.style.opacity = "0.8";
    }
})}
//add button function for setting the hover state
function AO(ad,n) {
    if(CN < n)
    { 
    if(parseInt(cn.innerHTML) === 0){
        ad.classList.remove("hover");   
    } else{
        ad.classList.add("hover");
    }
    } else {
        ad.classList.remove("hover");   
    }
}
//minus button function for setting the hover state
function MO(min,n) {
    if(CN > n)
    {
        min.classList.add("hover");
    } else {
        min.classList.remove("hover")
    }
}

//click event listener for the add to cart button to control the setting the stock and price values
atcb.addEventListener('click', ()=>{
    ct.innerHTML = "Cart";
    coc.style.display = "none";
    SL = TS - TCN;
    CartButton(atcb);
    AM = MAX;
    CC ++; 
    f = 1;
    if(TCN < TS){ 
    if(CC === 1){
        TCN = CN + FO;
        TP = (CP * TCN);
        if(SL > MIN){
            CN = MIN;
            cn.innerHTML = CN;
        } else{
            CN = SL;
            cn.innerHTML = CN;
        }
        AO(add, AM)
        MO(minus,MIN)
    } else {
    TCN += CN;
    MSL = TS - TCN;
    if(MSL > MIN){
        CN = MIN;
        cn.innerHTML = CN;
    } else if(MSL === 0){
        CN = 0;
        cn.innerHTML = 1;
    } else{
        CN = MSL;
        cn.innerHTML = CN;
    }
    TP = 0;
    TP = (CP * TCN);
    AO(add, AM)
    MO(minus,MIN)
    }
    localStorage.totalorder = TCN;
    if(TCN === 0){ 
        ec.style.display = "flex";
        fc.style.display = "none";
        noi.style.display = "none";
        noi.style.animationName = "";
        cart.style.animationName = "";
    } else {
    tcp.textContent = CPV(TP);
    op.textContent = CPV(TP);
    noi.textContent = TCN;
    nooi.textContent = TCN;
    noci.textContent = `x ${TCN}`;
    stock(TS - TCN);
    if(TCN > 1){
    di.title = `Remove ${TCN} items from cart`;
    }
    else {
    di.title = `Remove ${TCN} item from cart`;
    }
    ec.style.display = "none";
    fc.style.display = "flex";
    noi.style.display = "block"; 
    noi.style.animationName = "happy-ball";
    cart.style.animationName = "happy-cart";
    cart.classList.add('active');
    }} else if(coCC < 1){
        atcbt.innerHTML = "Out of Stock";
        atcc.style.transform = "rotate(80deg)";
        atcb.style.opacity = "0.7";
        cn.innerHTML = 0;
        CartButton(atcb);
        add.classList.remove("hover");
}})

//click event listener for the delete cart button for removing all items from cart and restoring all values to default
dc.addEventListener('click', ()=>{
    if (window.confirm(`You are about to remove ${TCN} ${document.getElementById("product-name").innerHTML} from your cart`)){
    delete localStorage.totalorder;
    ec.style.display = "flex";
    fc.style.display = "none";
    noi.style.display = "none";
    noi.style.animationName = "";
    cart.style.animationName = "";
    cart.classList.remove('active');
    atcb.style.opacity = "1";
    CC = 0;
    FO = 0;
    TP = 0;
    TCN = 0;
    stock(TS);
    CN = MNI;
    AM = MAX;
    cn.innerHTML = CN;
    atcbt.innerHTML = "Add to cart";
    atcc.style.transform = "rotate(0deg)";
    atcb.style.opacity = "1";
    CartButton(atcb);
    AO(add, AM);
    MO(minus, MNI);}
})

//click event listener for the check out button, considered one way as there is no going back until page reload
var coCC = 0;
co.addEventListener('click', ()=>{
    coCC++;
    ec.style.display = "none";
    fc.style.display = "none";
    coc.style.display = "flex";
    ct.innerHTML = "Check Out";
})



//functions for all the items images on the page
sps.forEach((sp,i) => {  
    sp.addEventListener('click', ()=>{        
        sps.forEach((spture) => {
        spture.className = spture.className.replace(" current","");
        })
        sp.className += " current";
        bps.forEach((bigPic,i) => {
            bigPic.style.display = "none";
        })
        bps[i].style.display = "block";
    })
});
bps.forEach((bp,i) => {
bp.addEventListener('click', ()=> {
    lb.style.display = "flex";
    lbOpen(SIN = i+1);
})})

close.addEventListener('click', ()=>{
    lb.style.display = "none";
})

lbss.forEach((lbSub,i) => {  
    lbSub.addEventListener('click', ()=>{
        lbOpen(SIN = i+1);
    })
});

function lbOpen(n){        
    lbss.forEach((lbs) => {
    if(n > lbss.length){
        SIN = 1;
    }
    if(n < 1){
        SIN = lbss.length;
    }
    lbs.className = lbs.className.replace(" current","");
    })
    lbss[SIN-1].className += " current";
    lbm.forEach((lbmain) => {
        lbmain.style.display = "none";
    })
    lbm[SIN-1].style.display = "block";
}

prev.addEventListener('click', ()=>{
   SIN -= 1;
   lbOpen(SIN);
})
next.addEventListener('click', ()=>{
    SIN += 1;
    lbOpen(SIN);
})

