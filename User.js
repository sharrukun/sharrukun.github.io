export class User{
    constructor(name, catchRods, storeRods, totalCatch, areaIn, userMoney, storeDiffFish){
        this.name = name;
        this.catchRods = catchRods;
        this.storeRods = storeRods;
        this.totalCatch = totalCatch;
        this.areaIn = areaIn;
        this.userMoney = userMoney;
        this.storeDiffFish = storeDiffFish;

    }
    setRods(){
            let id = 0;
            for(let i = 0; i < this.catchRods.length; i++){
                const radioInput = document.createElement('input');
                radioInput.type = 'radio';
                radioInput.value = this.catchRods[i].value;
                radioInput.name = 'wooden-rod-name';
                radioInput.id = (id);
                id += 1;
                const userRodHtml = document.getElementById('user-rod-html');
                userRodHtml.append(radioInput);
                userRodHtml.append(this.catchRods[i].name);
                this.storeRods.push(radioInput);
            }
    }
    removeRods(){
        const userRodHtml = document.getElementById('user-rod-html');
        for(let i = 0; i < userRodHtml.childNodes.length; i++){
            userRodHtml.removeChild(userRodHtml.childNodes[i]);
            console.log(userRodHtml.childNodes[i]);
        }
    }
}