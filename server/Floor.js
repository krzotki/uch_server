Floor = class extends Trap
{
	
	constructor(x,y,size,rotation,canBeMoved=true)
	{
		super(x,y);
		this.canBeMoved=canBeMoved;
		this.size = size;
		this.squares = [];
		if(!canBeMoved)this.partOfMap=true;
		this.initialRotation = rotation;
		if(rotation==0)
		{
			for(var i =0;i<this.size;i++)
			{
				this.squares.push(new Square(this.x+(SQARE_DENSITY)*i,this.y,"#00FF00","floor"));
			}
		}
		else if(rotation==90)
		{
			for(var i =0;i<this.size;i++)
			{
				this.squares.push(new Square(this.x,this.y+(SQARE_DENSITY)*i,"#00FF00","floor"));
			}
		}
		else if(rotation==180)
		{
			for(var i =0;i<this.size;i++)
			{
				this.squares.push(new Square(this.x-(SQARE_DENSITY)*i,this.y,"#00FF00","floor"));
			}
		}
		else if(rotation==270)
		{
			for(var i =0;i<this.size;i++)
			{
				this.squares.push(new Square(this.x,this.y-(SQARE_DENSITY)*i,"#00FF00","floor"));
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
