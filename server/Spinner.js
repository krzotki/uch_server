Spinner = class extends Trap
{
	constructor(x,y,canBeMoved)
	{
		super(x,y);
		this.squares = [];
		this.squares.push(new Square(this.x,this.y,"#FF0000","spinner"));
		this.rotation = 0;
		this.centerX = this.x + GENERAL_SIZE/2;
		this.centerY = this.y + GENERAL_SIZE/2;
		this.initialX = this.x;
		this.initialY = this.y;
		this.angle=0;
		this.canBeMoved = false;
	}
	collision(player)
	{
		super.collision(player);
	}
	//Override
	update()
	{
		if(GENERAL_TIMER<=180)
		{
			this.rotation+=(Math.PI/360)*2;
		}
		this.angle = this.rotation* (180/Math.PI);
		this.squares[0].angle = this.angle;
		if(Math.round(this.rotation * 10000) / 10000==Math.round(2*Math.PI * 10000) / 10000)this.rotation=0;

		this.centerX = this.x + GENERAL_SIZE/2;
		this.centerY = this.y + GENERAL_SIZE/2;

	}
	//Override
	checkForMover()
	{
		//this element cannot have a mover
	}
	joinSpinner()
	{
		
	}
	reset()
	{
		super.reset();
		this.rotation=0;
	}
}