Crossbow = class extends Trap
{
	
	constructor(x,y,size,rotation,canBeMoved=true)
	{
		super(x,y);
		this.canBeMoved=canBeMoved;
		this.size = 1;
		this.squares = [];
		this.initialRotation = rotation;
		this.squares.push(new Square(this.x,this.y,"#00FF00","crossbow",rotation*Math.PI/180));
		this.shootInfo = {x:0,y:0,speedX:0,speedY:0,rotation:0};
		this.reload =0;
	}
	collision(player)
	{	
		return super.collision(player);
	}
	update()
	{
		super.update();
		this.reload++;
		if(this.reload>=100)
		{
			this.reload=0;
			this.shoot();
		}
		var square = this.squares[0];
		var x = square.centerX-GENERAL_SIZE/2;
		var y = square.centerY-GENERAL_SIZE/2;
		var rot;
		
		if(square.spinner==undefined || square.spinner==0)
		{
			rot = Math.round((square.rotation) * 10000) / 10000;
		}
		else 
		{
			rot = Math.round((square.rotation+square.initialRotation) * 10000) / 10000;
		}
			
		
		var sx = -Math.cos(rot)*10;
		var sy = -Math.sin(rot)*10;
		
		this.shootInfo = {
			x:x,
			y:y,
			speedX:sx,
			speedY:sy,
			rotation:rot,
		}
	}	
	shoot()
	{	
		if(!GAME_IS_READY)return;
		var arr = new Arrow(this.shootInfo.x,this.shootInfo.y,this.shootInfo.speedX,this.shootInfo.speedY,this.shootInfo.rotation);
		TRAPS.push(arr);
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
		this.reload=0;
		this.shootInfo = {x:0,y:0,speedX:0,speedY:0,rotation:0};
	}
}
