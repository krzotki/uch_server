BlackHole = class extends Trap
{
	
	constructor(x,y,size,rotation,canBeMoved=true)
	{
		super(x,y);
		this.canBeMoved=canBeMoved;
		this.size = size;
		this.squares = [];
		this.initialRotation = rotation;
		
		this.squares.push(new Square(this.x,this.y,"#00FF00","blackhole"));
		
		
	}
	collision(player)
	{	
		return super.collision(player,"shooter");
	}
	update()
	{
		super.update();
		
		for(var i in SOCKET_LIST)
		{
			
			var player = SOCKET_LIST[i].player;
			var hole = this.squares[0];
			var distance = Math.sqrt(Math.pow(player.centerX-hole.centerX,2)+Math.pow(player.centerY-hole.centerY,2));
			if(distance<125)
			{
				player.speedX+=(hole.centerX-player.centerX)/(distance+1);
				player.speedY+=(hole.centerY-player.centerY)/(distance+1);
			}
		}
		
		for(var i in TRAPS)
		{
			if(TRAPS[i] instanceof Arrow)
			{
				var arrow = TRAPS[i];
				var hole = this.squares[0];
				var distance = Math.sqrt(Math.pow(arrow.squares[0].centerX-hole.centerX,2)+Math.pow(arrow.squares[0].centerY-hole.centerY,2));
				if(distance<125)
				{
					
					arrow.speedX+=(hole.centerX-arrow.squares[0].centerX)/(distance+1);
					arrow.speedY+=(hole.centerY-arrow.squares[0].centerY)/(distance+1);
					arrow.squares[0].rotation = Math.atan2(-arrow.speedY,-arrow.speedX);
					arrow.squares[0].angle = arrow.squares[0].rotation *  (180/3.14159265);
				}
			}
		}
		
	}	
	joinSpinner(spinner)
	{
		super.joinSpinner(spinner);
		
	}
	checkForMover()
	{
		super.checkForMover();
	}
	reset()
	{
		super.reset();
	}
}
