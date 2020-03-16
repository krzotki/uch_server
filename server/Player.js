
Player = class 
{
	constructor(id,color)
	{
		this.x = SPAWN_POINT.x;
		this.y = SPAWN_POINT.y;
		this.width =GENERAL_SIZE;
		this.height=GENERAL_SIZE;
		this.speedX=0;
		this.speedY=GRAVITY;
		this.id = id;
		this.inAir = true;
		this.canJump = false;
		this.maxSpeedX =8;
		this.maxSpeedY =15;
		this.color = color;
		this.centerX = this.x + this.width/2;
		this.centerY = this.y + this.height/2;
		this.finished = false;
		this.points =0;
		this.host=false;
		this.username="";
		this.skin="";
		this.direction="right";
		this.state="idle";
		this.killed=false;
		this.runAnim=0;
		this.airSteering=0.25;
		this.traction = 0.15;
		this.moveSpeed = 2.5;
		this.connected =0;
		this.gravity = 0.8;
		this.jumpForce=15;
	}
	update()
	{
		
		//for the sprite
		if(this.killed)this.state="dead";
		else if(this.speedX==0 && this.speedY==0 && this.inAir==false)this.state ="idle";
		
		//traction and gravity
		if(this.inAir)this.speedY+=this.gravity;
		else
		{
			this.speedX*=1-this.traction;
		}
				
		this.speedX = Math.floor(this.speedX*10000)/10000;
		this.speedY = Math.floor(this.speedY*10000)/10000;
		if(this.speedX<0.1 && this.speedX>-0.1)this.speedX=0;
		if(this.speedY > this.maxSpeedY)this.speedY = this.maxSpeedY
		if(this.speedY < -this.maxSpeedY)this.speedY = -this.maxSpeedY
		
		
		//check if player fell of the world
		if(this.y>CANVAS.height && !this.finished)
		{
			PLAYERS_FINISHED++;
			this.finished=true;
		}
		//check is player actually finished the level
		if(this.x > END_POINT.x1 && this.x<END_POINT.x2 && this.y >END_POINT.y1 && this.y<END_POINT.y2)
		{
			if(!this.finished)
			{
				PLAYERS_FINISHED++;
				this.finished=true;
				this.points++;
			}
			
		}
		
		if(this.x <0)this.x=0;
		if(this.x+this.width>CANVAS.width)this.x = CANVAS.width-this.width;
		
		this.x += this.speedX;
		this.y += this.speedY;
		this.centerX = this.x + this.width/2;
		this.centerY = this.y + this.height/2;
		
		this.collision();
	}
	collision()
	{
		var didLand = false;
		for(var i =0;i<TRAPS.length;i++)
		{
			var result = TRAPS[i].collision(this.id);
			if(result)didLand = true;
		}
		if(!didLand)this.inAir = true;
	}
	sprint(mode)
	{
		if(mode)this.maxSpeedX=15
		else this.maxSpeedX=8;
	}
	jump()
	{
		if(!GAME_IS_READY || this.finished)return;
		if(this.canJump && this.speedY>-this.maxSpeedY)
		{
			this.y--;
			this.speedY-=this.jumpForce;
			this.canJump=false;
			this.inAir =true;
			
			//for the sprite
			this.state="jump";
		}
	}
	move(direction)
	{
		if(!GAME_IS_READY || this.finished)return;
		if(direction=="L" && this.speedX>-this.maxSpeedX)
		{
			if(!this.inAir)
			{
				this.speedX-=this.moveSpeed;
				this.direction="left";
			}
			else
			{
				this.speedX-=this.moveSpeed*this.airSteering;
				this.direction="left";
			}
		}
		if(direction=="R" && this.speedX<this.maxSpeedX)
		{
			if(!this.inAir)
			{
				this.speedX+=this.moveSpeed;
				this.direction="right";
			}
			else
			{
				this.speedX+=this.moveSpeed*this.airSteering;
				this.direction="right";
			}
		}
		this.runAnim+=this.maxSpeedX/3.5;
		if(this.runAnim>=45)this.runAnim=0;
		//for the sprite
		if(this.speedY==0)this.state="run";
	}
}
