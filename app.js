//変数の宣言
let startTime;
let timer,setTimer;
let trycount = 0;
let firstClick = true;
let firstCard;
let compUnit = 0;
let score;

window.onload = firstScript();
//カードの表示とゲームスタート
function firstScript(){
    let i;
    let beforeArray = [];
    let afterArray = [];
    for(i=0;i<13;i++){
        let sub = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
        beforeArray.push("♠"+sub[i]);
        beforeArray.push("<span style='color:red'>♥</span>"+sub[i]);
        beforeArray.push("♣"+sub[i]);
        beforeArray.push("<span style='color:red'>♦</span>"+sub[i]);
	}
    for(i=0;i<52;i++){
        let r =Math.floor(Math.random()*beforeArray.length);
        afterArray.push(beforeArray[r]);
        beforeArray.splice(r,1);
    }
    let field = document.getElementById("field");
    for(i=0;i<52;i++){
        let div = document.createElement("div");
        div.className = "card back";
        div.cardFace = afterArray[i];
        div.innerHTML = "";
        div.onclick = turn;
        field.appendChild(div);
    }
    startTime = new Date();
    timer = setInterval(drawResult,1000);
}

//経過時間と回数を表示する関数
function drawResult(){
	let nowTime = new Date();
	let time = Math.floor((nowTime-startTime)/1000);
	let result = document.getElementById("result");
	let str = "TIME:" +time+"秒		TRY:"+trycount+"回";
	result.innerHTML = str;
}

//カードがクリックされたときの処理
function turn(e){
	if(setTimer){return;}
	let choiceCard = e.target;

	if(choiceCard.innerHTML == ""){ //カードが裏向きなら
		choiceCard.className = "card"
		choiceCard.innerHTML = choiceCard.cardFace;
	}else return;//表向きなら何もせず、返す

	if(firstClick){		//カードが裏かつ1枚目なら
		firstCard = choiceCard;
		firstClick = false;
	}else{						//カードが裏かつ2枚目なら
		trycount++;
		if (firstCard.cardFace.substr(-1) == choiceCard.cardFace.substr(-1)){	//カードが一致したら
			compUnit++;
			setTimer = setTimeout(function(){
				choiceCard.className = "card comp";
                firstCard.className = "card comp";
                if(compUnit==(afterArray.length%2)) clearInterval(timer);
				setTimer = null;
			},500);
		}else{
            setTimer = setTimeout(function(){
                choiceCard.className = "card back";
                firstCard.className = "card back";
                choiceCard.innerHTML = "";
                firstCard.innerHTML = "";
                setTimer = null;
            }, 1500)
			
		}
		firstClick =true;
	}
}

function calcScore(){
	
}