const gameModel = require("../models/gameModel.js");

function loadGame(req, res) {
  console.log("Loading Game");

  var title = 'uno';
  console.log("Retrieving game with title ", title);

  var results = gameModel.getGameFromDb(title, function(error, result) {
    if (error || result == null /*|| result.length != 1*/) {
        res.status(500).json({success:false, data: error});
    } else {
        res.json(result);
        //res.render('result', {id: 23, title: 'game', user_id: 63, win_high: 'f'});
        //res.end();
    }
    console.log("Back from getGameFromDb with result:", result);

    res.json(results);
});

  
  /*
  gameModel.getGameFromDb(title, function(error, result) {
      if (error || result == null || result.length != 1) {
          Response.status(500).json({success:false, data: error});
      } else {
          res.json(result[0]);
          //res.render('result', {id: 23, title: 'game', user_id: 63, win_high: 'f'});
          //res.end();
      }
      console.log("Back from getGameFromDb with result:", result);
  });
  /*
  var result = {
      game_id: 23,
      title: 'shanghi', 
      user_id: 11,
      win_high: 'f', 
    players: {
      player1: {name: 'Mom', total: 30, round1: 30},
      player2: {name: 'Dad', total: 20, round1: 20},
      player3: {name: 'LaRee', total: 10, round1: 10}
  } 
};
  res.json(result);
  /*
  res.write("{\"name\" : \"LaRee\"}");
  res.end();*/
}



function saveGame(req, res) {
  console.log("Saving Game");
  var title = "uno"
  var players = [];

  gameModel.insertGame(title, password, playersArray, function(error, result){
    if (error || result == null /*|| result.length != 1*/) {
      console.log(result);
      res.status(500).json({success:false, data: error});
    } else {
      console.log("Back from insertGame with result:", result);
      res.json(result);
    }  
  });
}

function deleteSavedGame(req, res) {
  console.log("Deleting Saved Game");
  var title = "title";
  var password = "password";

  gameModel.deleteGame(title, function(error, result){
    if (error || result == null /*|| result.length != 1*/) {
      console.log(result);
      res.status(500).json({success:false, data: error});
    } else {
      console.log("Back from deleteGame with result:", result);
      res.json(result);
    }  
  });
}

module.exports = {
  loadGame: loadGame,
  saveGame: saveGame,
  deleteSavedGame: deleteSavedGame
}