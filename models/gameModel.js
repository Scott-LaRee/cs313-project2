const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL || "postgres://keepscoreuser:scorekeeping@localhost:5432/keepscore"
const pool = new Pool({connectionString: connectionString});

function getGameFromDb(title, password, callback) {
  console.log("getGameFromDb called with title", title);
  // var results = {success:true};
  // callback(null, results);
  //var results = {id:1, title: 'uno'};
    
  var sql = "SELECT game_id, title, win_low, name, total, round1, round2, round3, " +
            "round4, round5, round6, round7, round8, round9, round10 " + 
            "FROM players INNER JOIN game_players ON players.id = " + 
            "game_players.player_id INNER JOIN games ON " +
            "game_players.game_id = games.id WHERE games.title = $1::varchar";
  var params = [title];

  pool.query(sql, params, function(err, result) {
      if (err) {
          console.log("An error with the database occurred");
          console.log(err);
          callback(err, null);
      }

      console.log("Found DB result: " + JSON.stringify(result.rows));

      callback(null, result.rows);
  });
  
}

function insertGame(title, password, callback) {
  console.log("Inserting Game");
//   var sql = "INSERT INTO games title, win_low VALUES " +
//             "($1::varchar, $2::boolean)";
//   var params = [game.title, game.win_low];
  
//   pool.query(sql, params, function(err, result) {
//     if (err) {
//         console.log("An error with the database occurred");
//         console.log(err);
//         callback(err, null);
//     }
// });

  var results = {success:true};
  callback(null, results);
}

function insertPlayers(playersArray, callback) {
  console.log("Inserting Players");

  // var sql = "INSERT INTO players (name, total, round1, round2, " +
  //               "round3, round4, round5, round6, round7, round8, round9" +
  //               "round10) VALUES";
    

  // for (var i = 0; i < playersArray.length - 1; i++) {
  //   if (playersArray[i].score != NaN) {
  //     sql += " ($1::varchar, $2::int, $3::int, $4::int," + 
  //            " $5::int, $6::int, $7::int, $8::int, $9::int," +
  //            " $10::int, $11::int, $12::int)";
  //   }
  // }

  // var params = [playersArray[i].name, playersArray[i].score, 
  //               playersArray[i].round1, playersArray[i].round2,
  //               playersArray[i].round3, playersArray[i].round4,
  //               playersArray[i].round5, playersArray[i].round6,
  //               playersArray[i].round7, playersArray[i].round8,
  //               playersArray[i].round9, playersArray[i].round10];

//   pool.query(sql, params, function(err, result) {
//     if (err) {
//         console.log("An error with the database occurred");
//         console.log(err);
//         callback(err, null);
//     }
// });

  var results = {success:true};
  callback(null, results);  
}

function insertGamePlayer(gameId, playerId, callback) {
  console.log("Inserting Game Players");
  var results = {success:true};
  callback(null, results);
  // var gameId = getGameId(game);
  
  // for (var i = 0; i < playersArray.length - 1; i++) {
  //   var sql = "SELECT id FROM games WHERE games.title = $1::varchar"
  // }
}

function getGameId(game, callback) {
  console.log("Getting Game ID");
  var results = {success:true};
  callback(null, results);
//   var sql = "SELECT id FROM games WHERE games.title = $1::varchar"

//   params = [game.title];
//   pool.query(sql, params, function(err, result) {
//     if (err) {
//         console.log("An error with the database occurred");
//         console.log(err);
//         callback(err, null);
//     }
// });

//   var results = {success:true};
//   callback(null, results); 
}

function getPlayerId(player, callback) {
  console.log("Getting Player ID");
  var results = {success:true};
  callback(null, results);
//   var sql = "SELECT id FROM players WHERE players.name = $1::varchar" +
//             " AND players.total = $2::int;";

//   params = [player.name, player.score];

//   pool.query(sql, params, function(err, result) {
//     if (err) {
//         console.log("An error with the database occurred");
//         console.log(err);
//         callback(err, null);
//     }
// });

//   var results = {success:true};
//   callback(null, results); 
}


function deleteGame(title, password, callback) {
  console.log("Deleting Game");
  var results = {success:true};
  callback(null, results);
}

module.exports = {
  getGameFromDb: getGameFromDb,
  insertGame: insertGame,
  insertPlayers: insertPlayers,
  insertGamePlayer: insertGamePlayer,
  getGameId: getGameId,
  getPlayerId: getPlayerId,
  deleteGame: deleteGame
}