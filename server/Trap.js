Trap = class
{
	constructor(x,y,width,height,rotation,canBeMoved=true)
	{
		this.x = x;
		this.y = y;
		this.rotation = 0;
		this.spinner=0;
		this.canBeMoved=canBeMoved;
		this.partOfMap;
		this.index = Math.random();
	}
	collision(player,parent)
	{
		var didLand = false;
		for(var i=0;i<this.squares.length;i++)
		{	
			var result = this.squares[i].collision(player,parent);
			if(result)didLand = true;
		}
		return didLand;
	}
	update()
	{
		for(var i in this.squares)
		{
			this.squares[i].update();
		}
	}
	checkForMover()
	{
		var foundSpinner = false;
		if(!this.canBeMoved)return;
		for(var i in TRAPS)
		{
				
			for(var g in this.squares)
			{
				
				for(var z in TRAPS[i].squares)
				{
					if(this.squares[g].collideWithElement(TRAPS[i].squares[z]))
					{
						if(TRAPS[i] instanceof Spinner)
						{
							foundSpinner=true;
							if(this.squares[0].spinner)continue;
							
							this.joinSpinner(TRAPS[i]);
							
						}
						
					}
				}
				
			}
				
		}
		if(!foundSpinner)this.unjoinSpinner();
	}
	glue(){}

	joinSpinner(spinner)
	{
		if(!this.canBeMoved || !spinner)return;
		if(this.y>spinner.y)
		{
			this.squares[0].angleDelta = Math.PI/2;
		}
		if(this.x > spinner.x)
		{
			this.squares[0].angleDelta = 0;
		}
		if(this.y < spinner.y)
		{
			this.squares[0].angleDelta = -Math.PI/2;
		}
		if(this.x < spinner.x)
		{
			this.squares[0].angleDelta = Math.PI;
		}
		for(var i=0;i<this.squares.length;i++)
		{
			this.squares[i].spinner = spinner;
			
			var deltaX = this.squares[i].x - this.squares[i].spinner.x;
			var deltaY = this.squares[i].y - this.squares[i].spinner.y;
			this.squares[i].initialDistanceFromSpinner = Math.sqrt(Math.pow(deltaX,2)+Math.pow(deltaY,2));
			this.squares[i].angleDelta = Math.atan2(deltaY,deltaX);
		}
	}
	unjoinSpinner()
	{
		this.spinner=0;
		for(var i=0;i<this.squares.length;i++)
		{
			this.squares[i].spinner = 0;
		}
		
	}
	spinnerValidation()
	{
		var spinner=0;
		
		if(this.squares[0].spinner)spinner = this.squares[0].spinner;
		else return;
		
		var validSpinnerFound = false;
		
		for(var i in TRAPS)
		{
			var trap = TRAPS[i];
			if(trap instanceof Spinner)
			{	
				if(trap.index==this.squares[0].spinner.index)
				{
					validSpinnerFound = true;
				}
			}
		}
		if(!validSpinnerFound)this.unjoinSpinner();
	}
	
	reset()
	{
		for(var g in this.squares)
		{
			this.squares[g].x = this.squares[g].initialX; 
			this.squares[g].y = this.squares[g].initialY; 
			this.squares[g].centerX = this.squares[g].initcenterX; 
			this.squares[g].centerY = this.squares[g].initcenterY; 
			this.squares[g].angle = this.squares[g].initialAngle;
			this.squares[g].rotation = this.squares[g].initialRotation;
		}
	}
}