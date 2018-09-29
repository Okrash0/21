var deck = [];
var hand = [];
var house = [];
var handTot, houseTot;
var Pturn;

function setup(){
  creatCards();
  deck =  shuffle(deck);
  startHand(hand, house);
  Pturn = true
  updateText();
}

function updateHand(){
  handTot = handValue(hand);
  houseTot = handValue(house);
}

function creatCards(){
  var face;
  var v;



  for (var c = 0; c < 4; c++){
    if (c == 0){
      face = "clubs";
    }
    else if (c == 1){
      face = "diamonds";
    }
    else if (c == 2){
      face = "hearts";
    }
    else {
      face = "spades";
    }
    for (var i = 2; i < 15; i++){
      if (i < 10){
        v = i;
      }
      else if (i == 14){
        v = 11;
      }
      else {
        v = 10;
      }
      var card = {
        num: i,
        face: face,
        value: v
      }
      deck.push(card);
    }
  }
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function startHand(ha, ho){
  for (var i = 0; i < 2; i++){
    ha.unshift(deck.shift());
    ho.unshift(deck.shift());

  }
}

function handValue(h){
  var tot = 0;
  for (var i in h){
    tot += h[i].value;
  }
  return tot;
}

function houseB(){
  var playWin;
  updateHand();
  while (houseTot < 17 && houseTot < handTot && Pturn == false){
    hit(house);
    houseTot = handValue(house);
    updateText();
    if (houseTot <= 21 && houseTot >= handTot){
      Pturn = true;
      updateText();
    }
    else if (houseTot > 21 && handTot <= 21){
      playWin = true;
      document.getElementById("gameTurn").innerHTML = "Player wins";
      document.getElementById('gameTurn').style.color = "green";
    }
  }

  if (houseTot >= 17 && houseTot >= handTot && playWin == false){
    console.log("hose more");
    Pturn = true;
    updateText();
  }

  if (Pturn){
    console.log('ds');
    if (handTot > houseTot){
      document.getElementById("gameTurn").innerHTML = "Player wins";
      document.getElementById('gameTurn').style.color = "green";
  }
    else if (houseTot > handTot) {
      document.getElementById("gameTurn").innerHTML = "House wins"
      document.getElementById("gameTurn").style.color = "red";
    }
    else {
      document.getElementById("gameTurn").innerHTML = "Draw"
      document.getElementById("gameTurn").style.color = "yellow";
    }
  }
  updateHand();
}

function hitP(){
  if (Pturn){
    hand.push(deck.shift());
    updateText();
    if (handTot > 21 && houseTot <= 21){
      document.getElementById("gameTurn").innerHTML = "House wins"
      document.getElementById("gameTurn").style.color = "red";
      Pturn = false;
    }
  }
}

function stand(){
    if (Pturn && houseTot < handTot){
      Pturn = false;
      houseB();
    }

    else if (houseTot == handTot && houseTot >= 17 ) {
      document.getElementById("gameTurn").innerHTML = "Draw"
      document.getElementById("gameTurn").style.color = "yellow";
    }

    else if (houseTot < handTot){
      document.getElementById("gameTurn").innerHTML = "Player wins";
      document.getElementById('gameTurn').style.color = "green";
    }
    else if (handTot < houseTot) {
      document.getElementById("gameTurn").innerHTML = "House wins"
      document.getElementById("gameTurn").style.color = "red";
    }

}

function hit(h){
  house.push(deck.shift());
}

function updateText(){
  var HouseS = document.getElementById("hosueShow");
  var HandS = document.getElementById("handShow");
  var HouseH = document.getElementById("houseHand");
  var HandH = document.getElementById("playerHand");

  updateHand();

  HouseS.innerHTML = houseTot;
  HandS.innerHTML = handTot;
  HouseH.textContent = null;
  HandH.textContent = null;
    for (var i in house){
      HouseH.textContent += house[i].num + " of " + house[i].face + ". ";
    }
    for (var i in hand){
      HandH.textContent += hand[i].num + " of " + hand[i].face + ". ";
    }
      document.getElementById("gameTurn").style.color = "black";
    if (Pturn){
      document.getElementById("gameTurn").textContent = "Player turn"
    }
    else {
      document.getElementById("gameTurn").textContent = "House turn"
    }

}

function reset(){
  deck = [];
  hand = [];
  house = [];
  handTot, houseTot;
  Pturn;
  setup();
}
