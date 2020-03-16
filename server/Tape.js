Tape = class extends Trap
{
	
	constructor(x,y,size,rotation,canBeMoved=true)
	{
		super(x,y);
		this.canBeMoved=canBeMoved;
		this.size = size;
		this.squares = [];
		this.initialRotation = 0;
		this.index;
		this.squares.push(new Square(this.x,this.y,"#00FF00","tape"));
		this.spinner = 0;
	}
	collision(player)
	{	
		return super.collision(player);
	}
	glue()
	{
		var spinner=0;
		var colliders = [];
		
		//find spinner then give it to the colliders and itself
		if(this.squares[0].spinner!=0)spinner = this.squares[0].spinner;
	
		for(var i in TRAPS)
		{
			var trap = TRAPS[i];
			if(TRAPS[i].index!=this.index)
			{
				
				for(var g in trap.squares)
				{
					var square = trap.squares[g];
					if(this.squares[0].collideWithElement(square))
					{
						colliders.push(trap)
						if(square.spinner && spinner==0)spinner = square.spinner;
						break;
					}
				}
			}
		}
		for(var i in colliders)
		{
			if(!colliders[i].squares[0].spinner && spinner)
			{
				colliders[i].joinSpinner(spinner);
				
			}
		}
		if(this.squares[0].spinner==0 || this.squares[0].spinner==undefined && spinner)this.joinSpinner(spinner);
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
