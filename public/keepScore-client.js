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
  var newTextBox1 = document.createElement("input");
  newTextBox1.setAttribute('id', "save_pass");
  newTextBox1.setAttribute('type', 'text');
  newTextBox1.setAttribute('size', '7');
  newTextBox1.setAttribute('name', 'save_pass');
  
  var newLabel1 = document.createElement("LABEL");
  newLabel1.setAttribute("for", "save_pass");
  newLabel1.innerHTML = 'Enter Password';

  var newLine1 = document.createElement("BR");

  var parent = document.getElementById('saveForm');
  parent.appendChild(newTextBox1);
  parent.appendChild(newLabel1);
  parent.appendChild(newLine1);

  var newTextBox2 = document.createElement("input");
  newTextBox2.setAttribute('id', "pass_confirm");
  newTextBox2.setAttribute('type', 'text');
  newTextBox2.setAttribute('size', '7');
  newTextBox2.setAttribute("name", "pass_confirm");
  
  var newLabel2 = document.createElement("LABEL");
  newLabel2.setAttribute("for", "pass_confirm");
  newLabel2.innerHTML = 'Confirm Password';

  var newLine2 = document.createElement("BR");

  parent.appendChild(newTextBox2);
  parent.appendChild(newLabel2);
  parent.appendChild(newLine2);

  var newButton = document.createElement('INPUT');
  newButton.setAttribute("type", "submit");
  newButton.setAttribute("value", "Confirm Save");
}

function setLoadForm() {
  var newTextBox1 = document.createElement("input");
  newTextBox1.setAttribute('id', "game_id");
  newTextBox1.setAttribute('type', 'text');
  newTextBox1.setAttribute('size', '7');
  newTextBox1.setAttribute("name", "game_id");
  
  var newLabel1 = document.createElement("LABEL");
  newLabel1.setAttribute("for", "game_id");
  newLabel1.innerHTML = 'Enter Game ID';

  var newLine1 = document.createElement("BR");

  var parent = document.getElementById('loadForm');
  parent.appendChild(newTextBox1);
  parent.appendChild(newLabel1);
  parent.appendChild(newLine1);

  var newTextBox2 = document.createElement("input");
  newTextBox2.setAttribute('id', "load_pass");
  newTextBox2.setAttribute('type', 'text');
  newTextBox2.setAttribute('size', '7');
  newTextBox2.setAttribute("name", "load_pass");
  
  var newLabel2 = document.createElement("LABEL");
  newLabel2.setAttribute("for", "load_pass");
  newLabel2.innerHTML = 'Enter Password';

  var newLine2 = document.createElement("BR");

  parent.appendChild(newTextBox2);
  parent.appendChild(newLabel2);
  parent.appendChild(newLine2);

  var newButton = document.createElement('INPUT');
  newButton.setAttribute("type", "submit");
  newButton.setAttribute("value", "Confirm Save");
}

function Player(name, score) {
  this.playerName = name;
  this.score = score;
}

function createPlayersArray() {
  playersArray = [];
  var name = '';
  var score = 0;

  for (i = 1; i < 7; i++) {
    nameId = "p" + i + "_name";
    scoreId = "p" + i + "_total";
    name = document.getElementById(nameId).value;
    score = parseInt(document.getElementById(scoreId).value);
    
    if(score != NaN) {
      player = new Player(name, score);
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