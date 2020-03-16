
const MAP_BACKGROUD = new Image();
MAP_BACKGROUD.src = './client/map_rooftops/background.png';
const MAP_ELEMENTS = new Image();
MAP_ELEMENTS.src = './client/map_rooftops/elements.png';

const WOOD_BLOCK = new Image(50, 50);
WOOD_BLOCK.src = './client/wood.png';
const METAL_BLOCK = new Image(50, 50);
METAL_BLOCK.src = './client/metal.png';
const SPINNER_BLOCK = new Image(50, 50);
SPINNER_BLOCK.src = './client/spinner.png';

var CROSSBOW_SPRITE =[];
var CROSSBOW_FRAME=0;
for(var i=1;i<=57;i++)
{
	const CROSSBOW_BLOCK = new Image(50, 50);
	CROSSBOW_BLOCK.src = './client/crossbow/crossbow'+i+'.png';
	CROSSBOW_SPRITE.push(CROSSBOW_BLOCK);
}

const ARROW_BLOCK = new Image(50, 50);
ARROW_BLOCK.src = './client/crossbow/arrow.png';

const BOMB_BLOCK = new Image(50, 50);
BOMB_BLOCK.src = './client/bomb.png';

const SAW_TABLE = new Image(50, 50);
SAW_TABLE.src = './client/linear_saw/table.png';

const SAW_BLADE = new Image(50, 50);
SAW_BLADE.src = './client/linear_saw/saw.png';

const BLACKHOLE = new Image();
BLACKHOLE.src = './client/blackhole.png';


const TAPE_BLOCK = new Image();
TAPE_BLOCK.src = './client/tape.png';

//ninja girl skin
const NINJA_GIRL_SKIN_IDLE = new Image();
NINJA_GIRL_SKIN_IDLE.src = './client/ninja_girl/Idle__000.png';
const NINJA_GIRL_SKIN_DEAD = new Image();
NINJA_GIRL_SKIN_DEAD.src = './client/ninja_girl/Dead__009.png';
var NINJA_GIRL_SKIN_RUN =[];
for(var i=1;i<=9;i++)
{
	const skin = new Image();
	skin.src = './client/ninja_girl/Run__00'+i+'.png';
	NINJA_GIRL_SKIN_RUN.push(skin);
}

var NINJA_GIRL_SKIN_JUMP =[];
for(var i=1;i<=1;i++)
{
	const skin = new Image();
	skin.src = './client/ninja_girl/Jump__00'+i+'.png';
	NINJA_GIRL_SKIN_JUMP.push(skin);
}


//ninja boy skin
const NINJA_BOY_SKIN_IDLE = new Image();
NINJA_BOY_SKIN_IDLE.src = './client/ninja_boy/Idle__000.png';
const NINJA_BOY_SKIN_DEAD = new Image();
NINJA_BOY_SKIN_DEAD.src = './client/ninja_boy/Dead__009.png';
var NINJA_BOY_SKIN_RUN =[];
for(var i=1;i<=9;i++)
{
	const skin = new Image();
	skin.src = './client/ninja_boy/Run__00'+i+'.png';
	NINJA_BOY_SKIN_RUN.push(skin);
}

var NINJA_BOY_SKIN_JUMP =[];
for(var i=1;i<=1;i++)
{
	const skin = new Image();
	skin.src = './client/ninja_boy/Jump__00'+i+'.png';
	NINJA_BOY_SKIN_JUMP.push(skin);
}
