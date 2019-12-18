CREATE TABLE users 
( id SERIAL NOT NULL PRIMARY KEY
, username VARCHAR(80) NOT NULL
, password VARCHAR(255) NOT NULL
);

CREATE TABLE games
( id SERIAL NOT NULL PRIMARY KEY
, title VARCHAR(80) NOT NULL
, win_low BOOLEAN
);

CREATE TABLE players
( id SERIAL NOT NULL PRIMARY KEY
, name VARCHAR(80)
, total iNT
, round1 iNT
);

CREATE TABLE game_players
( id SERIAL NOT NULL PRIMARY KEY
, game_id INT NOT NULL REFERENCES games(id)
, player_id INT NOT NULL REFERENCES players(id)
);

INSERT INTO users
( username, password)
VALUES
('admin', 'password');

INSERT INTO games
( title, user_id, win_low)
VALUES
( 'uno', 1, true);

INSERT INTO players
(name, total, round1)
VALUES
('Mom', 25, 25);

INSERT INTO players
(name, total, round1)
VALUES
('Dad', 30, 30);

INSERT INTO players
(name, total, round1)
VALUES
('LaRee', 10, 10);

INSERT INTO game_players
(game_id, player_id)
VALUES
(1,1);

INSERT INTO game_players
(game_id, player_id)
VALUES
(1,2);

INSERT INTO game_players
(game_id, player_id)
VALUES
(1,3);

INSERT INTO games
( title, user_id, win_low)
VALUES
( 'rook', 1, false);

INSERT INTO players
(name, total, round1)
VALUES
('Mom', 45, 45);

INSERT INTO players
(name, total, round1)
VALUES
('Dad', 20, 20);

INSERT INTO players
(name, total, round1)
VALUES
('LaRee', 15, 15);

INSERT INTO game_players
(game_id, player_id)
VALUES
(2,4);

INSERT INTO game_players
(game_id, player_id)
VALUES
(2,5);

INSERT INTO game_players
(game_id, player_id)
VALUES
(2,6);

CREATE USER keepscoreuser WITH PASSWORD 'scorekeeping';

GRANT SELECT, INSERT, UPDATE, DELETE ON games to keepscoreuser;
GRANT SELECT, INSERT, UPDATE, DELETE ON players to keepscoreuser;
GRANT SELECT, INSERT, UPDATE, DELETE ON game_players to keepscoreuser;
GRANT SELECT, INSERT, UPDATE, DELETE ON users to keepscoreuser;

GRANT USAGE, SELECT ON SEQUENCE games_id_seq to keepscoreuser;
GRANT USAGE, SELECT ON SEQUENCE players_id_seq to keepscoreuser;
GRANT USAGE, SELECT ON SEQUENCE games_players_id_seq to keepscoreuser;

ALTER TABLE players
ADD round2 INT,
ADD round3 INT,
ADD round4 INT,
ADD round5 INT,
ADD round6 INT,
ADD round7 INT,
ADD round8 INT,
ADD round9 INT,
ADD round10 INT;

ALTER TABLE games 
RENAME COLUMN win_high TO win_low;

/*Statements to insert into players games & game_players in sequence*/
BEGIN;
INSERT INTO games (title, win_low)
VALUES ("shanghai", true);

INSERT INTO players (name, total, round1, round2, round3)
VALUES ("Joe", 32, 23, 9)
       ("Sam", 187, 98, 89)
       ("Eli", 890, 98, 08);

SELECT id FROM games WHERE games.title = "shanghai";
SELECT id FROM players WHERE players.name = "Joe" AND players.total = 32;

INSERT INTO game_players (game_id, player_id);
VALUES (/*value from above, value from above*/)
COMMIT;

/*select players matching a certain gameID*/
SELECT game_id, win_low, name, total, round1, round2, round3, round4, 
  round5, round6, round7, round8, round9, round10 FROM players 
  INNER JOIN game_players
    ON players.id = game_players.player_id
  INNER JOIN games
    ON game_players.game_id = games.id
  WHERE
    games.title = 'uno';

/*delete a game and all of its players*/


-- select all values once from each table
SELECT game_id, player_id, name, title, total, round1, round2, round3,
  round4, round5, round6, round8, round9, round10
  FROM game_players
	INNER JOIN players
		ON players.id = game_players.player_id
	INNER JOIN games
		ON game_players.game_id = games.id
	WHERE 
		games.title = 'uno';

  ALTER TABLE games
  DROP COLUMN user_id;

  ALTER TABLE games
  ADD COLUMN password varchar(255);

  UPDATE games
  SET password = 'password'
  WHERE
    title = 'uno';