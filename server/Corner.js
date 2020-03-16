Corner  = class extends Trap
{
	
	constructor(x,y,rotation,canBeMoved=true)
	{
		super(x,y);
		this.canBeMoved=canBeMoved;
		this.size = 8;
		this.squares = [];
		this.initialRotation = rotation;
		if(rotation==0)
		{
			for(var i =0;i<this.size;i++)
			{
				if(i<this.size/2)this.squares.push(new Square(this.x+(SQARE_DENSITY)*i,this.y,"#00FF00","corner"));
				else this.squares.push(new Square(this.x,this.y+(SQARE_DENSITY)*(i-4),"#00FF00","corner"));
			}
		}
		else if(rotation==90)
		{
			for(var i =0;i<this.size;i++)
			{
				if(i<this.size/2)this.squares.push(new Square(this.x,this.y+(SQARE_DENSITY)*i,"#00FF00","corner"));
				else this.squares.push(new Square(this.x-(SQARE_DENSITY)*(i-4),this.y,"#00FF00","corner"));
			}
		}
		else if(rotation==180)
		{
			for(var i =0;i<this.size;i++)
			{
				if(i<this.size/2)this.squares.push(new Square(this.x-(SQARE_DENSITY)*i,this.y,"#00FF00","corner"));
				else this.squares.push(new Square(this.x,this.y-(SQARE_DENSITY)*(i-4),"#00FF00","corner"));
			}
		}
		else if(rotation==270)
		{
			for(var i =0;i<this.size;i++)
			{
				if(i<this.size/2)this.squares.push(new Square(this.x,this.y-(SQARE_DENSITY)*i,"#00FF00","corner"));
				else this.squares.push(new Square(this.x+(SQARE_DENSITY)*(i-4),this.y,"#00FF00","corner"));
			}
		}
		
	}
	collision(player)
	{	
		return super.collision(player);
	}
	update()
	{
		super.update();
	
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
