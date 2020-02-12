import {Rod} from './Rod.js';
import {Fish} from './Fish.js';
import {User} from './User.js';
//imports above


const goToMapScreen = document.getElementById('go-to-map-screen');
const goToSmallPond = document.getElementById('go-to-small-pond');
const goToProfileScreen = document.getElementById('go-to-profile-screen');
const goToShopScreen = document.getElementById('go-to-shop-screen');
const goToSellScreen = document.getElementById('go-to-sell-screen');
const goToBuyScreen = document.getElementById('go-to-buy-screen');
const mapChoiceScreen = document.getElementById('map-choice-screen');
const homeScreen = document.getElementById('home-screen');
const throwButton = document.getElementById('throw-button');
const profileScreen = document.getElementById('profile-screen');
const shopScreen = document.getElementById('shop-screen');
const sellScreen = document.getElementById('sell-screen');
const buyScreen = document.getElementById('buy-screen');
const displayInfoSell = document.getElementById('dislay-info-on-sell');

//ponds
const smallPond = document.getElementById('small-pond');

//rods
const woddenRod = new Rod("Wooden Rod", 20, "Hybrid", 0, 'wooden-rod');

//fishes
const bullTrout = new Fish('Bull Trout', 'Trout', [woddenRod['wooden-rod']], 5, 3, 0, "home");

//user rod system
let userAdmin = new User('Admin', [woddenRod], [], 0, undefined, 0, []);

//onload
window.onload = function(){
    addEventToNav();
}


/*Event Listners for the navagation*/

goToMapScreen.addEventListener('click', () => {
    setDisplayNone(homeScreen);
    setDisplayVisible(mapChoiceScreen);
    userAdmin.areaIn = "mapScreen"
});
goToSmallPond.addEventListener('click', () => {
    setDisplayNone(mapChoiceScreen);
    setDisplayVisible(smallPond);
    userAdmin.areaIn = "smallPond";
    userAdmin.setRods();
    userAdmin.removeRods();
});
goToProfileScreen.addEventListener('click', () => {
    setDisplayNone(homeScreen);
    setDisplayVisible(profileScreen);
    userAdmin.areaIn = "profileScreen";
    const userName = document.getElementById('user-name');
    const userTotalCatch = document.getElementById('user-total-catch');
    const userMoney = document.getElementById('money');
    userName.innerHTML = userAdmin.name;
    userTotalCatch.innerHTML = userAdmin.totalCatch;
    console.log(userAdmin.money);
    userMoney.innerHTML = userAdmin.userMoney;
});
goToShopScreen.addEventListener('click', () => {
    setDisplayNone(homeScreen);
    setDisplayVisible(shopScreen);
    userAdmin.areaIn = 'shopScreen';
});
goToSellScreen.addEventListener('click', () => {
    setDisplayNone(shopScreen);
    setDisplayVisible(sellScreen);
    userAdmin.areaIn = 'sellScreen';
    for(let i = 0; i < userAdmin.storeDiffFish.length; i++){
        const sellPageInfo = document.createElement('p');
        sellPageInfo.innerHTML = userAdmin.storeDiffFish[i].name + " - " + userAdmin.storeDiffFish[i].numCought;
        displayInfoSell.append(sellPageInfo);
    }
});
goToBuyScreen.addEventListener('click', () => {
    setDisplayNone(shopScreen);
    setDisplayVisible(buyScreen);
    userAdmin.areaIn = 'buyScreen';
});
//catching fishes
throwButton.addEventListener('click', catchFish);
let currentRod;//stores the current rod the user is using
let currentArea;//stores the current area user is in
const update = document.getElementById('update');//used to give user updates
function catchFish(){
    for(let i = 0; i < userAdmin.storeRods.length; i++){
        if(userAdmin.storeRods[i].checked){
            currentRod = userAdmin.catchRods[i];
        }
    }
    switch(userAdmin.areaIn){
        case 'smallPond':
                if(currentRod == woddenRod){
                    if(woddenRod.power > bullTrout.weight){
                        catchFishTime(bullTrout.name);
                        bullTrout.numCought += 1;
                        userAdmin.totalCatch += 1;
                        userAdmin.storeDiffFish.push(bullTrout);
                    }else{
                        catchFishTime();
                        update.innerHTML += "Not Cought";
                    }
                }
        break;
    }
}


async function catchFishTime(fishName){
    for(let i = 0; i < 4; i++){
    await delay(1000);
    update.innerHTML += "Waiting...</br>";
    }  
    update.innerHTML += "You cought a " + fishName + "</br>";    
}
function delay(milisec){
    return new Promise(function(resolve, reject){
        setTimeout(
            function(){
                resolve()
            }, milisec
        )
    });
}

//return to pages
const returnButton = document.getElementById('returnButton');
const returnButtonMapChoice = document.getElementById('returnButtonMapChoiceScreen');
const returnProfileScreen = document.getElementById('returnButtonProfileScreen');
const returnShopScreen = document.getElementById('returnToHomeFromShop');
const  returnSellScreen = document.getElementById('returnToHomeFromSell');
const returnBuyScreen = document.getElementById('returnToHomeFromBuy');
function addEventToNav(){
    const arrOfReturnButton = [returnButton, returnButtonMapChoice, returnProfileScreen, returnShopScreen, returnSellScreen, returnBuyScreen];
    for(let i = 0; i < arrOfReturnButton.length; i++){
        arrOfReturnButton[i].addEventListener('click', returnFunction);
    }
}
// returnButton.addEventListener('click', returnFunction);

function returnFunction(){
    switch(userAdmin.areaIn){
        case "smallPond":
            setDisplayNone(smallPond);
            setDisplayVisible(mapChoiceScreen);
            userAdmin.areaIn = "mapScreen";
        break;
        case "mapScreen":
            setDisplayNone(mapChoiceScreen);
            setDisplayVisible(homeScreen);
            userAdmin.areaIn = "home";
        break;
        case "profileScreen":
            setDisplayNone(profileScreen);
            setDisplayVisible(homeScreen);
            userAdmin.areaIn = 'home';
        break;
        case "shopScreen":
            setDisplayNone(shopScreen);
            setDisplayVisible(homeScreen);
            userAdmin.areaIn = 'home';
        break;
        case 'sellScreen':
            setDisplayNone(sellScreen);
            setDisplayVisible(shopScreen);
            userAdmin.areaIn = 'shopScreen';
        break;
        case 'buyScreen':
            setDisplayNone(buyScreen);
            setDisplayVisible(shopScreen);
            userAdmin.areaIn = 'shopScreen';
        break;
    }
}




function setDisplayNone(elem){
    elem.classList.add('hidden');
}
function setDisplayVisible(elem){
    elem.classList.remove('hidden');
}