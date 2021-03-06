Arrow = class extends Trap
{
	
	constructor(x,y,sx,sy,rotation)
	{
		super(x,y);
		this.speedX = sx;
		this.speedY = sy;
		this.squares = [];
		this.squares.push(new Square(this.x,this.y,"#FF0000","arrow",rotation));
		this.rotation = rotation;
		this.isDestroyed=false;
		this.lifeLength=0;
	}
	collision(player)
	{	
		//arrow collisoon with player
		var result = super.collision(player,"shooter");
		if(result)this.isDestroyed=true;
		return result;
	}
	update()
	{
		this.lifeLength++;
		//arrow collision with other blocks
		for(var i=0;i<TRAPS.length;i++)
		{
			for(var g=0;g<TRAPS[i].squares.length;g++)
			{
				if(this.squares[0].collideWithElement(TRAPS[i].squares[g],"shooter"))
				{
					if(this.lifeLength>5 && !(TRAPS[i] instanceof Arrow))
					{
						
						this.isDestroyed = true;
						return;
					}
				}
			}
		}
	
		this.squares[0].x += this.speedX;
		this.squares[0].y += this.speedY;
		this.squares[0].centerX = this.squares[0].x+this.squares[0].size/2;
		this.squares[0].centerY = this.squares[0].y+this.squares[0].size/2;
		//arrow out of map
		if(this.squares[0].x<0 || this.squares[0].x > CANVAS.width || this.squares[0].y<0 || this.squares[0].y > CANVAS.height)
		{
			this.isDestroyed = true;
		}
		
	}	
	joinSpinner(spinner)
	{
		
		
	}
	checkForMover()
	{
		
	}
	reset()
	{
		
	}
}
