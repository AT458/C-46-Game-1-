var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, game, player;

var rocks, rock1, rock2;
var ground, rock1Img, rock2Img;

function preload() {
    ground = loadImage("../Images/Ground.jpg");
    rock1Img = loadImage("../Images/Rock 1.png");
    rock2Img = loadImage("../Images/Rock 2.png");
}

function setup() {
    createCanvas(windowWidth - 30, windowHeight - 30);

    database = firebase.database();

    game = new Game();
    game.getState();
    game.start();
}

function draw() {
    if (playerCount === 2) {
        game.update(1);
    }
    if (gameState === 1) {
        clear();
        game.play();
    }
    if (gameState === 2) {
        game.end();
    }
}