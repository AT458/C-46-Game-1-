class Game {
    constructor() {

    }
    getState(){
        var gameStateRef  = database.ref('gameState');
        gameStateRef.on("value",function(data){
            gameState = data.val();
        });
    }
    update(state){
        database.ref('/').update({
            gameState: state
        });
    }
    async start(){
        if(gameState === 0){
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if(playerCountRef.exists()){
                playerCount = playerCountRef.val();
                player.getCount();
            }
            form = new Form()
            form.display();
        }
        rock1 = createSprite(100, 200);
        rock1.addImage("rock1", rock1Img);
        rock1.scale = 0.125;
        rock2 = createSprite(300, 200);
        rock2.addImage("rock2", rock2Img);
        rock2.scale = 0.125;
        rocks = [rock1, rock2];
    }
    play(){
        form.hide();
        
        Player.getPlayerInfo();
        player.getRocksAtEnd();
        
        if(allPlayers !== undefined){
            image(ground, 0,-windowHeight*4,windowWidth, windowHeight*5);
          
            var index = 0;
    
            var x = 175 ;
            var y;
    
            for(var plr in allPlayers){
                index = index + 1 ;
    
                x = x + 200;
                y = windowHeight - allPlayers[plr].distance;
                rocks[index-1].x = x;
                rocks[index-1].y = y;    
           
                if (index === player.index){
                    stroke(10);
                    fill("red");
                    ellipse(x,y,60,60);
                    rocks[index - 1].shapeColor = "red";
                    camera.position.x = windowWidth/2;
                    camera.position.y = rocks[index-1].y;
                }
            }
        }
        if(keyIsDown(UP_ARROW) && player.index !== null){
            player.distance +=10
            player.update();
        }

        if(player.distance < -2009){
            gameState = 2;
            player.rank +=1
            Player.updateRocksAtEnd(player.rank)
        }

        drawSprites();
    }
    end(){
        console.log("Game Ended");
        console.log(player.rank);
    }
}