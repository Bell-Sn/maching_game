//変数の宣言
let startTime;
let timer, setTimer;
let trycount = 0;
let firstClick = true;
let firstCard;
let compUnit = 0;
let score;
let full_pair;

//カードの固定数値
let suits = ["♥","♦","♠","♣"];
let ranks= ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

window.onload = firstScript();
//カードの表示とゲームスタート
function firstScript() {
    let beforeDeck = [];
    let afterDeck = [];

    for (let suit of suits){    //カードの作成
        for(let i=0;i<ranks.length;i++){
            let card = {
                suit: suit,
                ranks: ranks[i],
                value: i+1,
                color: getColor(suit)
            };
            beforeDeck.push(card);
        }
    }

    for ( let i = 0; i < 52; i++) {  //カードのシャッフル
        let r = Math.floor(Math.random() * beforeDeck.length);
        afterDeck.push(beforeDeck[r]);
        beforeDeck.splice(r, 1);
    }
    let field = document.getElementById("field");

    for (let i = 0; i < 52; i++) {
        let card = afterDeck[i];
        let div = document.createElement("div");
        div.cardData = card;
        div.className = "card back";
        div.cardFace = card.suit+card.ranks;
        div.innerHTML = "";
        div.onclick = turn;
        field.appendChild(div);
    }
    full_pair = (afterDeck.length / 2);
    startTime = new Date();
    timer = setInterval(drawResult, 1000);
}

//経過時間と回数を表示する関数
function drawResult() {
    let nowTime = new Date();
    let time = Math.floor((nowTime - startTime) / 1000);
    let result = document.getElementById("result");
    let str = "TIME:" + time + "秒		TRY:" + trycount + "回";
    result.innerHTML = str;
}

//カードがクリックされたときの処理
function turn(e) {
    if (setTimer) { return; }
    let choiceCard = e.target;
    if (choiceCard.innerHTML == "") { //カードが裏向きなら
        choiceCard.classList.remove("back");
        if(choiceCard.cardData.color === "red"){
            choiceCard.classList.add("red");
        }
        choiceCard.innerHTML = choiceCard.cardFace;
    } else return;//表向きなら何もせず、返す

    if (firstClick) {	//カードが裏かつ1枚目なら
        firstCard = choiceCard;
        firstClick = false;
    } else {	//カードが裏かつ2枚目なら
        trycount++;
        if (firstCard.cardData.ranks == choiceCard.cardData.ranks) {	//カードが一致したら
            compUnit++;
            setTimer = setTimeout(function () {
                choiceCard.className = "card comp";
                firstCard.className = "card comp";
                if (compUnit == full_pair) clearInterval(timer);
                setTimer = null;
            }, 500);
        } else {
            setTimer = setTimeout(function () {
                choiceCard.className = "card back";
                firstCard.className = "card back";
                choiceCard.innerHTML = "";
                firstCard.innerHTML = "";
                setTimer = null;
            }, 1500)
        }
        firstClick = true;
    }
}

//色の取得
function getColor(suit){
    if (suit === "♥"||suit === "♦"){
            return "red";
        }
    return "black";
}
function calcScore() {

}
