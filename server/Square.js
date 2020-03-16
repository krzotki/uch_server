Square = class
{
	constructor(x,y,color,name,rotation=0)
	{
		this.x = x;
		this.y = y;
		this.size = GENERAL_SIZE;
		this.centerX = this.x + this.size/2;
		this.centerY = this.y + this.size/2;
		this.initcenterX = this.x + this.size/2;
		this.initcenterY = this.y + this.size/2;
		this.initialX = this.x;
		this.initialY = this.y;
		this.initialDistanceFromSpinner =0;
		this.color = color;
		this.rotation =Math.round(rotation * 10000) / 10000;
		this.initialRotation =this.rotation;
		this.initialAngle = this.rotation* (180/Math.PI);
		this.angle = this.initialAngle;
		this.spinner=0;
		this.angleDelta=0;
		this.update();
		this.name=name;
	}
	collision(id,parent)
	{
		var hitboxDivider = 1;
		if(parent=="shooter")
		{
			//smaller hitbox for  arrow
			hitboxDivider=2;
		}
		if(this.name == "saw_blade")
		{
			hitboxDivider=1.5;
		}
		if(this.name == "blackhole")
		{
			hitboxDivider=2;
		}
		
		var player = SOCKET_LIST[id].player;
		this.centerX = this.x+this.size/2;
		this.centerY = this.y+this.size/2;
		
		var vectorX = this.centerX- player.centerX;
		var vectorY = this.centerY- player.centerY;
		
		//collision detection
		if(vectorX*vectorX < (GENERAL_SIZE*GENERAL_SIZE)/hitboxDivider && vectorY*vectorY<(GENERAL_SIZE*GENERAL_SIZE)/hitboxDivider)
		{
			//saw blade or other deadly blocks
			if((this.name == "saw_blade" || this.name=="blackhole") && !player.finished)
			{
				PLAYERS_FINISHED++;
				player.finished = true;
				player.killed=true;
				return true;
			}
			
			//shooters 
			if(parent=="shooter" )
			{
				if(!player.finished)
				{
					PLAYERS_FINISHED++;
					player.finished = true;
					player.killed=true;
				}
				return true;
			}
			if(vectorX*vectorX>vectorY*vectorY)
			{
				//col on x axis
				if(vectorX>0)
				{
					//player->square
					player.speedX = 0;
					player.x = this.x - player.width;
					player.canJump = true;
				}
				else
				{
					//square<-player
					player.speedX = 0;
					player.x = this.x + this.size;
					player.canJump = true;
				}
			}
			else if(vectorX*vectorX<vectorY*vectorY)
			{
				//col on y axis
				if(vectorY>0)
				{
					//player
					//square
					player.speedY=0;
					player.y = this.y - player.height;
					player.inAir = false;
					player.canJump = true;
					return true;
				}
				else
				{
					//square
					//player
					player.speedY=0;
					player.y = this.y + this.size;
				}
			}
			
		}
		return false;
	}
	
	collideWithElement(element,parent)
	{
		
		
		if(parent=="shooter")
		{
			var vectorX = this.centerX - element.centerX;
			var vectorY = this.centerY - element.centerY;
			var dist = Math.sqrt(vectorX*vectorX + vectorY*vectorY);
			if(dist<=GENERAL_SIZE/2)return true;
			else return false;
		}
		else
		{
			var vectorX = this.initcenterX - element.initcenterX;
			var vectorY = this.initcenterY - element.initcenterY;
			
			var dist = Math.sqrt(vectorX*vectorX + vectorY*vectorY);
			if(dist==GENERAL_SIZE)
			{
				return true;
			}
			else return false;
		}
		
	}
	
	update()
	{
		
		if(this.spinner)
		{
			if(this.spinner.rotation>=2*Math.PI)
			{
				this.x = this.initialX;
				this.y = this.initialY;
			}
			this.rotation=Math.round(this.spinner.rotation * 10000) / 10000;
			this.angle = this.initialAngle+ this.rotation* (180/Math.PI);
			var centerX = this.spinner.x;
			var centerY = this.spinner.y;
			var dist =  this.initialDistanceFromSpinner;
			var deltaX = -Math.cos(this.rotation+this.angleDelta)*dist;
			var deltaY = -Math.sin(this.rotation+this.angleDelta)*dist;
			this.x = Math.floor(centerX - deltaX);
			this.y = Math.floor(centerY - deltaY);
		}
		
	}

}
