var socket = io('https://multiplayer-game-uch.herokuapp.com/', {transports: ['websocket']});
var USERNAME = getCookie("username");
var SKIN = "ninja_boy";
var ITEM_CHOSEN="empty";
var ITEM_ROTATION = 0;
var ITEM_X=0;
var ITEM_Y=0;
var GENERAL_SIZE=50;
var GAME_STATE = "";
var CURRENT_CANVAS;
var PLAYERS_CONNECTED =0;
var GENERAL_TIMER;
var ITEM_MAP = {};
var canvas = document.getElementById("gameArea");
//set canvas width
var MAP_WIDTH = 2000;
var CANVAS_WIDTH = screen.width-20;
var PROPORTION = MAP_WIDTH/CANVAS_WIDTH;
canvas.style.width = CANVAS_WIDTH+"px"
var itemCanvas = document.getElementById("itemShop");
itemCanvas.style.width = CANVAS_WIDTH+"px"
var mouse ={
	x:0,
	y:0
}
var mainContext = canvas.getContext("2d");
var TEMP_BLOCK;

var pressedKeys={
	w:false,
	a:false,
	s:false,
	space:false
}
var SCORE_BOARD;




function placeItemOnMap(x,y,width,height,item)
{
	//assign specific item to coords
	var x1 = x;
	var x2 = x+width;
	var y1 = y;
	var y2 = y +height;
	for(var i =x1;i<x2;i+=GENERAL_SIZE)
	{
		for(var g=y1;g<y2;g+=GENERAL_SIZE)
		{
			ITEM_MAP[g][i]=item;
		}
	}
	
}


function initializeMapItem()
{
	//assign EMPTY to every field
	for(var i =0;i<itemCanvas.height;i+=GENERAL_SIZE)
	{
		var row = {};
		for(var g =0;g<itemCanvas.width;g+=GENERAL_SIZE)
		{
			row[g] = "empty";
		}
		ITEM_MAP[i] = row;
	}
}

function initializeThings()
{
	
	initializeMapItem();
	
	//item shop drawings and assigning coords to items
	placeItemOnMap(50,50,200,50,"floor");
	placeItemOnMap(300,50,50,50,"spinner");
	placeItemOnMap(400,50,200,50,"corner");
	placeItemOnMap(550,50,50,200,"corner");
	placeItemOnMap(650,50,50,50,"crossbow");
	placeItemOnMap(50,150,50,50,"bomb");
	placeItemOnMap(150,200,250,50,"linear_saw");
	placeItemOnMap(150,150,50,50,"linear_saw_blade");
	placeItemOnMap(650,200,50,50,"blackhole");
	placeItemOnMap(750,150,50,50,"tape");
	//draw the item shop just once
	drawItemMap();
}
initializeThings();

function drawImage(ctx, image, x, y, w, h, degrees,direction="right"){
  if(!image)return;
  ctx.save();
  ctx.translate(x+w/2, y+h/2);
  ctx.rotate(degrees*Math.PI/180.0);
  ctx.translate(-x-w/2, -y-h/2);
  if(direction=="left")
  {
	  ctx.scale(-1, 1);
	  ctx.drawImage(image, -x, y, w*-1, h);
	  ctx.restore();
  }
  else if(direction=="right")
  {
	  ctx.drawImage(image, x, y, w, h);
	  ctx.restore();
  }
  
  
}

function drawSingleBlock(context,name,x,y,rotation)
{
	if(name=="empty")return;
	var image;
	if(name=="floor")
	{
		image = WOOD_BLOCK;
	}
	if(name=="saw_table" || name=="linear_saw")
	{
		image = SAW_TABLE;
	}
	if(name=="saw_blade" || name=="linear_saw_blade")
	{
		if(name=="linear_saw_blade")y+=GENERAL_SIZE/2;
		image = SAW_BLADE;
		rotation = GENERAL_TIMER;
	}
	if(name=="spinner")
	{
		image = SPINNER_BLOCK;
	}	
	if(name=="corner")
	{
		image = METAL_BLOCK;
	}
	if(name=="crossbow")
	{
		image = CROSSBOW_SPRITE[CROSSBOW_FRAME];
	}
	if(name=="arrow")
	{
		image = ARROW_BLOCK;
	}
	if(name=="bomb")
	{
		image = BOMB_BLOCK;
	}
	if(name=="blackhole")
	{
		image = BLACKHOLE;
		rotation = GENERAL_TIMER;
	}
	if(name=="tape")
	{
		image = TAPE_BLOCK;
	}
	drawImage(context,image,x,y,GENERAL_SIZE,GENERAL_SIZE,rotation);
}


function drawTheMap(z)
{
	if(z==0)mainContext.drawImage(MAP_BACKGROUD,0,0);
	else if(z==1)mainContext.drawImage(MAP_ELEMENTS,0,0);
}


function drawItemMap()
{
	//for now just rectangles, later graphics, although coords assignation must remain the same
	var ctx = itemCanvas.getContext("2d");
	ctx.clearRect(0,0,itemCanvas.width,itemCanvas.height);
	for(var y =0;y<itemCanvas.height;y+=GENERAL_SIZE)
	{
		for(var x =0;x<itemCanvas.width;x+=GENERAL_SIZE)
		{
			var item = ITEM_MAP[y][x];
			drawSingleBlock(ctx,item,x,y);
			
		}
	}
}

function refreshHUD()
{
	document.getElementById("gameState").innerHTML = GAME_STATE;
	document.getElementById("playerCount").innerHTML = "Players: "+ PLAYERS_CONNECTED;
	var text = "";
	for(var i in SCORE_BOARD)
	{
		text+= i + " : "+SCORE_BOARD[i]+"&emsp;";
	}
	document.getElementById("scoreBoard").innerHTML = text;
	SKIN = document.getElementById("skinSelect").value;
}

//close item shop
socket.on("blocksPlaced",function(){
	itemCanvas.style.display = "none";
	canvas.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
})
//open item shop
socket.on("playersFinished",function(){
	itemCanvas.style.display = "initial";
	itemCanvas.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
})


socket.on("gameData",function(data){
	mainContext.clearRect(0,0,canvas.width,canvas.height);
	
	//some game info
	drawItemMap();
	GAME_STATE = data.state;
	GENERAL_TIMER = data.timer360;
	
	//send your name
	socket.emit("playerName",{name:USERNAME,skin:SKIN});
	
	//get the score
	SCORE_BOARD = null;
	SCORE_BOARD = data.score;
	
	var count=0;
	for(var i in SCORE_BOARD)
	{
		count++;
	}
	PLAYERS_CONNECTED=count;
	//display game status
	refreshHUD();
	
	if(GAME_STATE=="waitForFinish")
	{
		itemCanvas.style.display = "none";
	}
	
	
	if(pressedKeys.a)socket.emit("playerMove","L");
	if(pressedKeys.d)socket.emit("playerMove","R");
	if(pressedKeys.w)socket.emit("playerJump");
	socket.emit("playerSprint",pressedKeys.space);
	//DRAW THE MAP BACKGROUND BEFORE THE REST
	drawTheMap(0);
	
	//DRAW THE PLAYERS
	for(var i =0;i<data.players.length;i++)
	{	
		var player = data.players[i];
		mainContext.fillStyle=player.color;
		var skin  =data.players[i].skin;
		var state = data.players[i].state;
		var image;
		if(skin=="ninja_girl")
		{
			if(state=="idle")image = NINJA_GIRL_SKIN_IDLE;
			if(state=="run")
			{
				var frame = Math.floor(player.runAnim/5);
				image = NINJA_GIRL_SKIN_RUN[frame];
			}
			if(state=="jump")image = NINJA_GIRL_SKIN_JUMP[0];
			if(state=="dead")image = NINJA_GIRL_SKIN_DEAD;
		}
		if(skin=="ninja_boy")
		{
			if(state=="idle")image = NINJA_BOY_SKIN_IDLE;
			if(state=="run")
			{
				var frame = Math.floor(player.runAnim/5);
				image = NINJA_BOY_SKIN_RUN[frame];
			}
			if(state=="jump")image = NINJA_BOY_SKIN_JUMP[0];
			if(state=="dead")image = NINJA_BOY_SKIN_DEAD;
		}
		
		if(!image)continue;
		var x = data.players[i].x;
		
		//scroll the page
		if(player.username == USERNAME && GAME_STATE=="waitForFinish")
		{	
			//canvas.style.left=window.innerWidth/2-player.x+"px"
			//window.scrollTo((-window.innerWidth/2 + player.x),-canvas.height/3 + player.y);
		}
		if(GAME_STATE=="waitForTraps")
		{
			//window.scrollTo((-window.innerWidth/2 + mouse.x), mouse.y);
		}
		var y = data.players[i].y;
		var width = image.width;
		var height = data.players[i].height;
		var direction = data.players[i].direction;
		drawImage(mainContext, image, x, y, width, height, 0,direction)
		
		mainContext.font = "15px Arial";
		mainContext.textAlign = "center";
		drawStroked(mainContext,player.username,x+15,y-10);
		//mainContext.fillText(data.players[i].username,x+15,y-10);
	}
	//DRAW EVERY TRAP SQUARE
	for(var g =0;g<data.traps.length;g++)
	{
		if(data.traps[g].squares[0].name=="crossbow")
		{
			CROSSBOW_FRAME = Math.floor(data.traps[g].reload * CROSSBOW_SPRITE.length/100);
		}
		for(var z=0;z<data.traps[g].squares.length;z++)
		{
			var square = data.traps[g].squares[z];
			
			drawSingleBlock(mainContext,square.name,square.x,square.y,square.angle);
		}
	}
	
	//DRAW TEMPORARY ITEM PLACE
	if(TEMP_BLOCK!=undefined && ITEM_CHOSEN!="empty")
	{
		for(var i in TEMP_BLOCK.squares)
		{
			mainContext.fillStyle = TEMP_BLOCK.squares[i].color;
			var square = TEMP_BLOCK.squares[i];
			
			drawSingleBlock(mainContext,square.name,square.x,square.y,square.angle);
		}
	}
	//DRAW THE REST OF THE MAP TO COVER STUFF
	drawTheMap(1);
	
	//GET THE ITEM"S POSITION FROM SERVER (easier that way)
	if(ITEM_CHOSEN!="empty")
	{
		ITEM_PLACING_DATA = {
			x:ITEM_X,
			y:ITEM_Y,
			rotation:ITEM_ROTATION,
			name:ITEM_CHOSEN
		}
		socket.emit("builder",ITEM_PLACING_DATA);
	}
})

function drawStroked(ctx,text, x, y) {
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.strokeText(text, x, y);
    ctx.fillStyle = 'white';
    ctx.fillText(text, x, y);
}



//JUST RESPONSE FROM THIS GUY ABOVE ^^
socket.on("drawBuilder",function(data){
	TEMP_BLOCK = data;
})


//HIDE the item shop
socket.on("buildSuccess",function(){
	itemCanvas.style.display = "none";
})


onmousemove = function(event)
{
	var layerx = parseInt(event.layerX*PROPORTION);
	var layery = parseInt(event.layerY*PROPORTION);
	ITEM_X = layerx-layerx%GENERAL_SIZE;
	ITEM_Y = layery- layery%GENERAL_SIZE;
	
	CURRENT_CANVAS = event.path[0].id;
	mouse.x = event.clientX;
	mouse.y = event.clientY;
}
onmousedown = function(event)
{
	if(CURRENT_CANVAS=="itemShop")
	{
		if(GAME_STATE!="waitForTraps")return;
		ITEM_CHOSEN = ITEM_MAP[ITEM_Y][ITEM_X];
		
		if(ITEM_CHOSEN=="empty") TEMP_BLOCK = undefined;
		else
		{
			canvas.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
		}
	}
	if(CURRENT_CANVAS=="gameArea")
	{
		if(ITEM_CHOSEN!="empty")
		{
			TEMP_BLOCK.rotation = ITEM_ROTATION;
			socket.emit("placeBlock",TEMP_BLOCK);
			TEMP_BLOCK=undefined;
			ITEM_CHOSEN="empty";
		}
	}
}

onkeypress = function(event)
{
	var key = event.key.toLowerCase();
	if(key=="r")
	{
		ITEM_ROTATION+=90;
		if(ITEM_ROTATION==360)ITEM_ROTATION=0;
	}
	if(key=="w")
	{
		pressedKeys.w = true;
	}
	if(key=="a")
	{
		pressedKeys.a = true;
	}
	if(key=="d")
	{
		pressedKeys.d = true;
	}
	if(key==" ")
	{
		pressedKeys.space = true;
	}
	if(key=="e")
	{
		itemCanvas.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
	}
}
onkeyup = function(event)
{
	var key = event.key.toLowerCase();
	if(key=="a")
	{
		pressedKeys.a = false;
	}
	if(key=="d")
	{
		pressedKeys.d = false;
	}
	if(key=="w")
	{
		pressedKeys.w = false;
	}
	if(key==" ")
	{
		pressedKeys.space = false;
	}
}
