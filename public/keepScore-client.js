// const express = require("express");
// var app = express();

function updateScore(plyr) {
  var inputArray = createInputArray(plyr);
  var playerScoresArray = [];

  //creates an array of scores
	for (var i = 0; i < inputArray.length - 1; i++) {
    var value = document.getElementById(inputArray[i]).value;
    if (value != null && value != "") {
      playerScoresArray[i] = value;
    } else {
      playerScoresArray[i] = 0; //to avoid NaN
    }
  }

  console.log(playerScoresArray);
  var sum = 0;
  var score = 0;

  //computes sum
  for (var i = 0; i < playerScoresArray.length; i++) {
    score = parseInt(playerScoresArray[i]);
    if (score != NaN && score != "") {
    sum += score;
    }
  }
 
  document.getElementById(inputArray[inputArray.length - 1]).value = sum;
}

/****
* createInputArray
* Creates array containing the id's for the text boxes
* holding the player's scores
****/
function createInputArray(plyr) {
  var inputArray = [];
  for (i = 0; i < 10; i++) {
    inputArray[i] = plyr + "_h" + (i + 1);
  }

  inputArray[10] = plyr + "_total";

  return inputArray;
}

function declareWinner() {
  var playersArray = createPlayersArray();
  var winLow = document.getElementById('high_low').checked;
  var totalScoreSum = calculateTotalScoreSum(playersArray);
  var output = '';
  var winnerInfo = [];

  if (totalScoreSum != 0) {
    if (winLow) {
      winnerInfo = calculateLowestScore(playersArray);
    } else {
      winnerInfo = calculateHighestScore(playersArray);
    }
    
    output = winnerInfo[0] + " wins with a score of " + winnerInfo[1];
  } else {
    output = "Please enter some scores before declaring a winner";
  }
  document.getElementById('winnerDiv').innerHTML = output;
}

function calculateTotalScoreSum(playersArray) {
  var total = 0;

  for (var i = 0; i < playersArray.length - 1; i++) {
    if(playersArray[i].score != null) {
      total += playersArray[i].score;
    }
  }

  return total;
}

function setSaveForm() {
  var newTextBox0 = document.createElement("input");
  newTextBox0.setAttribute('id', "save_title");
  newTextBox0.setAttribute('type', 'text');
  newTextBox0.setAttribute('size', '7');
  newTextBox0.setAttribute('name', 'save_title');
  
  var newLabel0 = document.createElement("LABEL");
  newLabel0.setAttribute("for", "save_title");
  newLabel0.innerHTML = 'Enter Password';

  var newLine0 = document.createElement("BR");

  var newTextBox1 = document.createElement("input");
  newTextBox1.setAttribute('id', "save_pass");
  newTextBox1.setAttribute('type', 'text');
  newTextBox1.setAttribute('size', '7');
  newTextBox1.setAttribute('name', 'save_pass');
  
  var newLabel1 = document.createElement("LABEL");
  newLabel1.setAttribute("for", "save_pass");
  newLabel1.innerHTML = 'Enter Password';

  var newLine1 = document.createElement("BR");

  var newTextBox2 = document.createElement("input");
  newTextBox2.setAttribute('id', "pass_confirm");
  newTextBox2.setAttribute('type', 'text');
  newTextBox2.setAttribute('size', '7');
  newTextBox2.setAttribute("name", "pass_confirm");
  
  var newLabel2 = document.createElement("LABEL");
  newLabel2.setAttribute("for", "pass_confirm");
  newLabel2.innerHTML = 'Confirm Password';

  var newLine2 = document.createElement("BR");

  var newButton = document.createElement('INPUT');
  newButton.setAttribute("type", "submit");
  newButton.setAttribute("value", "Confirm Save");
  newButton.setAttribute("id", "save");
  newButton.setAttribute("onclick", "saveGame()");


  var parent = document.getElementById('saveForm');
  parent.appendChild(newTextBox0);
  parent.appendChild(newLabel0);
  parent.appendChild(newLine0);

  parent.appendChild(newTextBox1);
  parent.appendChild(newLabel1);
  parent.appendChild(newLine1);
  
  parent.appendChild(newTextBox2);
  parent.appendChild(newLabel2);
  parent.appendChild(newLine2);

  parent.appendChild(newButton);
}

function setLoadForm() {
  var newTextBox0 = document.createElement("input");
  newTextBox0.setAttribute('id', "load_title");
  newTextBox0.setAttribute('type', 'text');
  newTextBox0.setAttribute('size', '7');
  newTextBox0.setAttribute('name', 'load_title');
  
  var newLabel0 = document.createElement("LABEL");
  newLabel0.setAttribute("for", "load_title");
  newLabel0.innerHTML = 'Enter Title';

  var newLine0 = document.createElement("BR");
/*
  var newTextBox1 = document.createElement("input");
  newTextBox1.setAttribute('id', "game_id");
  newTextBox1.setAttribute('type', 'text');
  newTextBox1.setAttribute('size', '7');
  newTextBox1.setAttribute("name", "game_id");
  
  var newLabel1 = document.createElement("LABEL");
  newLabel1.setAttribute("for", "game_id");
  newLabel1.innerHTML = 'Enter Game ID';

  var newLine1 = document.createElement("BR");
*/
  // var parent = document.getElementById('loadForm');
  // parent.appendChild(newTextBox1);
  // parent.appendChild(newLabel1);
  // parent.appendChild(newLine1);

  var newTextBox2 = document.createElement("input");
  newTextBox2.setAttribute('id', "load_pass");
  newTextBox2.setAttribute('type', 'text');
  newTextBox2.setAttribute('size', '7');
  newTextBox2.setAttribute("name", "load_pass");
  
  var newLabel2 = document.createElement("LABEL");
  newLabel2.setAttribute("for", "load_pass");
  newLabel2.innerHTML = 'Enter Password';

  var newLine2 = document.createElement("BR");

  var newButton = document.createElement('INPUT');
  newButton.setAttribute("type", "submit");
  newButton.setAttribute("value", "Confirm Load");
  newButton.setAttribute("onclick", "LoadGame()");
  newButton.setAttribute("id", "load");

  var parent = document.getElementById('loadForm');
  parent.appendChild(newTextBox0);
  parent.appendChild(newLabel0);
  parent.appendChild(newLine0);
  
  parent.appendChild(newTextBox2);
  parent.appendChild(newLabel2);
  parent.appendChild(newLine2);

  parent.appendChild(newButton);
}

function Game (title, password, win_low) {
  this.title = title;
  this.password = password;
  this.win_low = win_low;
}

function Player(name, score, round1, round2, round3,
               round4, round5, round6, round7, 
               round8, round9, round10) {
  this.playerName = name;
  this.score = score;
  if (round1 != NaN) {
    this.round1 = round1;
  } else {
    this.round1 = 0;
  }
  
  if (round2 != NaN) {
    this.round2 = round2;
  } else {
    this.round2 = 0;
  }

  if (round3 != NaN) {
  this.round3 = round3;
  } else {
    this.round3 = 0;
  }
  
  if (round4 != NaN) {
  this.round4 = round4;
  } else {
    this.round4 = 0;
  }
  
  if (round5 != NaN) {
  this.round5 = round5;
  } else {
    this.round5 = 0;
  }
  
  if (round6 != NaN) {
  this.round6 = round6;
  } else {
    this.round6 = 0;
  }
  
  if (round7 != NaN) {
  this.round7 = round7;
  } else {
    this.round7 = 0;
  }
  
  if (round8 != NaN) {
  this.round8 = round8;
  } else {
    this.round8 = 0;
  }
  
  if (round9 != NaN) {
  this.round9 = round9;
  } else {
    this.round9 = 0;
  }
  
  if (round10 != NaN) {
  this.round10 = round10;
  } else {
    this.round10 = 0;
  }
  
}

function createPlayersArray() {
  playersArray = [];
  var name = '';
  var score = 0;

  for (i = 1; i < 7; i++) {
    nameId = "p" + i + "_name";
    scoreId = "p" + i + "_total";
    r1Id = "p" + i + "_h1";
    r2Id = "p" + i + "_h2";
    r3Id = "p" + i + "_h3";
    r4Id = "p" + i + "_h4";
    r5Id = "p" + i + "_h5";
    r6Id = "p" + i + "_h6";
    r7Id = "p" + i + "_h7";
    r8Id = "p" + i + "_h8";
    r9Id = "p" + i + "_h9";
    r10Id = "p" + i + "_h10";

    name = document.getElementById(nameId).value;
    score = parseInt(document.getElementById(scoreId).value);
    round1 = parseInt(document.getElementById(r1Id).value);
    round2 = parseInt(document.getElementById(r2Id).value);
    round3 = parseInt(document.getElementById(r3Id).value);
    round4 = parseInt(document.getElementById(r4Id).value);
    round5 = parseInt(document.getElementById(r5Id).value);
    round6 = parseInt(document.getElementById(r6Id).value);
    round7 = parseInt(document.getElementById(r7Id).value);
    round8 = parseInt(document.getElementById(r8Id).value);
    round9 = parseInt(document.getElementById(r9Id).value);
    round10 = parseInt(document.getElementById(r10Id).value);

    
    if(score != NaN) {
      player = new Player(name, score, round1, round2, round3, round4,
                          round5, round6, round7, round8, round9, round10);
      playersArray[i-1] = player;
    }
  }

  return playersArray;
}

function calculateLowestScore(playersArray) {
  var winnerInfo = ['',0];
  winnerInfo[0] = playersArray[0].playerName;
  winnerInfo[1] = playersArray[0].score;
  for (i = 1; i < playersArray.length - 1; i++) {
    if(playersArray[i].score < winnerInfo[1]) {
      winnerInfo[0] = playersArray[i].playerName;
      winnerInfo[1] = playersArray[i].score;
    }
  }
  return winnerInfo;
}

function calculateHighestScore(playersArray) {
  var winnerInfo = ['',0];
  winnerInfo[0] = playersArray[0].playerName;
  winnerInfo[1] = playersArray[0].score;
  for (i = 1; i < playersArray.length - 1; i++) {
    if(playersArray[i].score > winnerInfo[1]) {
      winnerInfo[0] = playersArray[i].playerName;
      winnerInfo[1] = playersArray[i].score;
    }
  }
  return winnerInfo;
}

function saveGame() {
  console.log("Saving Game");

  var title = document.getElementById('save_title');
  
  var pass1 = document.getElementById('save_pass');
  var pass2 = document.getElementById('confirm_pass');
  var password = '';

  if (pass1 === pass2) {
    password = pass1;
  } else {
    console.log("passwords do not match");
  }

  var winLow = document.getElementById('high_low').checked;

  var playersArray = createPlayersArray();
  var game = new Game(title, password, winLow);

  app.post("/saveGame", game, playersArray, function(req,res){
    console.log("Back from server for save");

  });
}

