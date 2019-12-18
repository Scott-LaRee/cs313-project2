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
    if (error || result == null) {
        res.status(500).json({success:false, data: error});
    } else {
        res.json(result);
    }
    console.log("Back from getGameFromDb with result:", result);
});
}

function saveGame(req, res) {
  console.log("Saving Game");
  
  var title = req.body.title;
  var password = req.body.password;
  var win_low = req.body.win_low;
  var playersArray = req.body.players;
  var gameId;
  var playerId;

  gameModel.getGameId(title, password, function (error, result) {
    if (error || result == null) {
      console.log(result);
      res.status(500).json({success:false, data: error});
    } else {
      if (result.length == 0) {
        console.log("The game does not exist yet proceed to new save");
        gameModel.insertGame(title, password, win_low, function(error, result) {
          if (error || result == null) {
            console.log(result);
            res.status(500).json({success:false, data: error});
          } else {
            console.log("Back from insertGame with result:", result);
            res.json(result);
      
            gameModel.getGameId(title, password, function (error, result) {
              if (error || result == null) {
                console.log(result);
                res.status(500).json({success:false, data: error});
              } else {
                console.log("Back from getGameId with result: ", result);
                console.log("result = " + result + " result[0].id = " + result[0].id);
                gameId = result[0].id;
              }
      
              if (playersArray[0].score != null) {
                gameModel.insertPlayer(playersArray[0], function (error, result){
                  if(error|| result == null) {
                  console.log(result);
                } else {
                console.log("Back from insertPlayer with result: ", result);
                
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
                          } else {
                            console.log("Back from insertGamePlayer with result: ", result);
                          }
                        });
                      }
                    });
                  }
                });
              }
            if (playersArray[1].score != null) {
              gameModel.insertPlayer(playersArray[1], function (error, result){
                if(error|| result == null) {
                console.log(result);
              } else {
              console.log("Back from insertPlayer with result: ", result);
            
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
                        } else {
                          console.log("Back from insertGamePlayer with result: ", result);
                        }
                      });
                    }
                  });
                }
              });
            }
            if (playersArray[2].score != null) {
              gameModel.insertPlayer(playersArray[2], function (error, result){
                if(error|| result == null) {
                console.log(result);
                console.log('error: ' + error);
              } else {
              console.log("Back from insertPlayer with result: ", result);
             
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
                          console.log('error: ' + error);
                        } else {
                          console.log("Back from insertGamePlayer with result: ", result);
                        }
                      });
                    }
                  });
                }
              });
            }
            if (playersArray[3].score != null) {
              gameModel.insertPlayer(playersArray[3], function (error, result){
                if(error|| result == null) {
                console.log(result);
                console.log('error: ' + error);
              } else {
              console.log("Back from insertPlayer with result: ", result);
              
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
                          console.log('error: ' + error);
                        } else {
                          console.log("Back from insertGamePlayer with result: ", result);
                        }
                      });
                    }
                  });
                }
              });
            }
            if (playersArray[4].score != null) {
              gameModel.insertPlayer(playersArray[4], function (error, result){
                if(error|| result == null) {
                console.log(result);
                console.log('error: ' + error);
              } else {
              console.log("Back from insertPlayer with result: ", result);
              
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
                          console.log('error: ' + error);
                        } else {
                          console.log("Back from insertGamePlayer with result: ", result);
                        }
                      });
                    }
                  });
                }
              });
            }
            if (playersArray[5].score != null) {
              gameModel.insertPlayer(playersArray[5], function (error, result){
                if(error|| result == null) {
                console.log(result);
                console.log('error: ' + error);
              } else {
              console.log("Back from insertPlayer with result: ", result);
              
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
                          console.log('error: ' + error);
                        } else {
                          console.log("Back from insertGamePlayer with result: ", result);
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
      } else {
        console.log("Back from getGameId with result: ", result);
        console.log("result = " + result + " result[0].id = " + result[0].id);
        gameId = result[0].id;

        if (playersArray[0].score != null) {
          gameModel.updatePlayer(playersArray[0], function(error, result) {
            if (error || result == null) {
              console.log(result);
              console.log('error: ' + error);
            } else {
              console.log("Back from updatePlayer with result: ", result);
            }
          });
        }

        if (playersArray[1].score != null) {
          gameModel.updatePlayer(playersArray[1], function(error, result) {
            if (error || result == null) {
              console.log(result);
              console.log('error: ' + error);
            } else {
              console.log("Back from updatePlayer with result: ", result);
            }
          });
        }
        if (playersArray[2].score != null) {
          gameModel.updatePlayer(playersArray[2], function(error, result) {
            if (error || result == null) {
              console.log(result);
              console.log('error: ' + error);
            } else {
              console.log("Back from updatePlayer with result: ", result);
            }
          });
        }
        if (playersArray[3].score != null) {
          gameModel.updatePlayer(playersArray[3], function(error, result) {
            if (error || result == null) {
              console.log(result);
              console.log('error: ' + error);
            } else {
              console.log("Back from updatePlayer with result: ", result);
            }
          });
        }
        if (playersArray[4].score != null) {
          gameModel.updatePlayer(playersArray[4], function(error, result) {
            if (error || result == null) {
              console.log(result);
              console.log('error: ' + error);
            } else {
              console.log("Back from updatePlayer with result: ", result);
            }
          });
        }
        if (playersArray[5].score != null) {
          gameModel.updatePlayer(playersArray[5], function(error, result) {
            if (error || result == null) {
              console.log(result);
              console.log('error: ' + error);
            } else {
              console.log("Back from updatePlayer with result: ", result);
            }
          });
        }
      }
    }
  });
  
}

function deleteSavedGame(req, res) {
  console.log("Deleting Saved Game");
  
  var title = req.body.title;
  var password = req.body.password;

  gameModel.deleteGame(title, password, function(error, result){
    if (error || result == null) {
      console.log(result);
      res.status(500).json({success:false, data: error});
    } else {
      console.log("Back from deleteGame with result:", result);
      res.json(result);
    }  
  });
}

function getGameId(req, res) {
  console.log("Deleting Saved Game");
  
  var title = 'imagine';
  var password = 'poison';

  gameModel.getGameId(title, password, function(error, result){
    if (error || result == null) {
      console.log(result);
      res.status(500).json({success:false, data: error});
    } else {
      console.log("Back from deleteGame with result:", result);
      res.json(result);
      if (result.length == 0) {
        console.log("The game does not exist");
      }
    }  
  });
}

module.exports = {
  loadGame: loadGame,
  saveGame: saveGame,
  deleteSavedGame: deleteSavedGame,
  getGameId: getGameId
}