const express = require("express");
const gameModel = require("../models/gameModel.js");
const bodyParser = require('body-parser');
var app = express();
app.use(bodyParser());

function loadGame(req, res) {
  console.log("Loading Game");
  var title = req.query.title;
  var password = req.query.password;

  console.log("Retrieving game with title ", title);

  var results = gameModel.getGameFromDb(title, password, function(error, result) {
    if (error || result == null /*|| result.length != 1*/) {
        res.status(500).json({success:false, data: error});
    } else {
        res.json(result);
        //res.render('result', {id: 23, title: 'game', user_id: 63, win_high: 'f'});
        //res.end();
    }
    console.log("Back from getGameFromDb with result:", result);

    // res.json(results);
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
  // console.log(req.body);
  
  var title = req.body.title;
  var password = req.body.password;
  var win_low = req.body.win_low;
  var playersArray = req.body.players;
  
  gameModel.insertGame(title, password, win_low, function(error, result) {
    if (error || result == null /*|| result.length != 1*/) {
      console.log(result);
      res.status(500).json({success:false, data: error});
    } else {
      console.log("Back from insertGame with result:", result);
      res.json(result);
      var gameId;
      var playerId;

      gameModel.getGameId(title, function (error, result) {
        if (error || result == null) {
          console.log(result);
          res.status(500).json({success:false, data: error});
        } else {
          console.log("Back from getGameId with result: ", result);
          console.log("result = " + result + " result[0].id = " + result[0].id);
          gameId = result[0].id;
        }

      //for (var i = 0; i < playersArray.length; i++) {
        if (playersArray[0].score != null) {
          gameModel.insertPlayer(playersArray[0], function (error, result){
            if(error|| result == null) {
            console.log(result);
            //res.status(500).json({success:false, data: error});
          } else {
          console.log("Back from insertPlayer with result: ", result);
          // res.json(result);
          
            // console.log("i = " + i);
              gameModel.getPlayerId(playersArray[0], function (error, result) {
                if(error || result == null) {
                  console.log(result);
                  res.status(500).json({success:false, data: error});
                } else {
                  playerId = result[0].id;
                  console.log("Back from getPlayerId with result: ", result);
                  gameModel.insertGamePlayer(gameId, playerId, function (error, result) {
                    if (error || result == null) {
                      console.log(result);
                      //res.status(500).json({success:false, data: error});
                    } else {
                      console.log("Back from insertGamePlayer with result: ", result);
                    }
                  });
                }
              });
              //});
            }
          });
        }
      //}
      if (playersArray[1].score != null) {
        gameModel.insertPlayer(playersArray[1], function (error, result){
          if(error|| result == null) {
          console.log(result);
          //res.status(500).json({success:false, data: error});
        } else {
        console.log("Back from insertPlayer with result: ", result);
        // res.json(result);
        
          // console.log("i = " + i);
            gameModel.getPlayerId(playersArray[1], function (error, result) {
              if(error || result == null) {
                console.log(result);
                res.status(500).json({success:false, data: error});
              } else {
                playerId = result[0].id;
                console.log("Back from getPlayerId with result: ", result);
                gameModel.insertGamePlayer(gameId, playerId, function (error, result) {
                  if (error || result == null) {
                    console.log(result);
                    //res.status(500).json({success:false, data: error});
                  } else {
                    console.log("Back from insertGamePlayer with result: ", result);
                  }
                });
              }
            });
            //});
          }
        });
      }
      if (playersArray[2].score != null) {
        gameModel.insertPlayer(playersArray[2], function (error, result){
          if(error|| result == null) {
          console.log(result);
          //res.status(500).json({success:false, data: error});
        } else {
        console.log("Back from insertPlayer with result: ", result);
        // res.json(result);
        
          // console.log("i = " + i);
            gameModel.getPlayerId(playersArray[2], function (error, result) {
              if(error || result == null) {
                console.log(result);
                res.status(500).json({success:false, data: error});
              } else {
                playerId = result[0].id;
                console.log("Back from getPlayerId with result: ", result);
                gameModel.insertGamePlayer(gameId, playerId, function (error, result) {
                  if (error || result == null) {
                    console.log(result);
                    //res.status(500).json({success:false, data: error});
                  } else {
                    console.log("Back from insertGamePlayer with result: ", result);
                  }
                });
              }
            });
            //});
          }
        });
      }
      if (playersArray[3].score != null) {
        gameModel.insertPlayer(playersArray[3], function (error, result){
          if(error|| result == null) {
          console.log(result);
          //res.status(500).json({success:false, data: error});
        } else {
        console.log("Back from insertPlayer with result: ", result);
        // res.json(result);
        
          // console.log("i = " + i);
            gameModel.getPlayerId(playersArray[3], function (error, result) {
              if(error || result == null) {
                console.log(result);
                res.status(500).json({success:false, data: error});
              } else {
                playerId = result[0].id;
                console.log("Back from getPlayerId with result: ", result);
                gameModel.insertGamePlayer(gameId, playerId, function (error, result) {
                  if (error || result == null) {
                    console.log(result);
                    //res.status(500).json({success:false, data: error});
                  } else {
                    console.log("Back from insertGamePlayer with result: ", result);
                  }
                });
              }
            });
            //});
          }
        });
      }
      if (playersArray[4].score != null) {
        gameModel.insertPlayer(playersArray[4], function (error, result){
          if(error|| result == null) {
          console.log(result);
          //res.status(500).json({success:false, data: error});
        } else {
        console.log("Back from insertPlayer with result: ", result);
        // res.json(result);
        
          // console.log("i = " + i);
            gameModel.getPlayerId(playersArray[4], function (error, result) {
              if(error || result == null) {
                console.log(result);
                res.status(500).json({success:false, data: error});
              } else {
                playerId = result[0].id;
                console.log("Back from getPlayerId with result: ", result);
                gameModel.insertGamePlayer(gameId, playerId, function (error, result) {
                  if (error || result == null) {
                    console.log(result);
                    //res.status(500).json({success:false, data: error});
                  } else {
                    console.log("Back from insertGamePlayer with result: ", result);
                  }
                });
              }
            });
            //});
          }
        });
      }
      if (playersArray[5].score != null) {
        gameModel.insertPlayer(playersArray[5], function (error, result){
          if(error|| result == null) {
          console.log(result);
          //res.status(500).json({success:false, data: error});
        } else {
        console.log("Back from insertPlayer with result: ", result);
        // res.json(result);
        
          // console.log("i = " + i);
            gameModel.getPlayerId(playersArray[5], function (error, result) {
              if(error || result == null) {
                console.log(result);
                res.status(500).json({success:false, data: error});
              } else {
                playerId = result[0].id;
                console.log("Back from getPlayerId with result: ", result);
                gameModel.insertGamePlayer(gameId, playerId, function (error, result) {
                  if (error || result == null) {
                    console.log(result);
                    //res.status(500).json({success:false, data: error});
                  } else {
                    console.log("Back from insertGamePlayer with result: ", result);
                  }
                });
              }
            });
            //});
          }
        });
      }
    });
  }
});
}

function deleteSavedGame(req, res) {
  console.log("Deleting Saved Game");
  // var title = "title";
  // var password = "password";
  var title = req.body.title;
  var password = req.body.password;

  gameModel.deleteGame(title, password, function(error, result){
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