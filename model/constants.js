//height
const POS_CHANGE_HEIGHT = 0.5;
const MAX_H = 15;
const MIN_H = 0;
const MID_H = MAX_H - MIN_H;

//steep
const MAX_STEEP = 2;
const MIN_STEEP = 0;
const POS_CHANGE_STEEP = 0.3;

//block coords
const MIN_BX = 0;
const MIN_BY = MIN_H;
const MAX_BX = 1000;
const MAX_BY = MAX_H;

//color
const COLORS = [ "R", "G", "B" ];
const DEFAULT_BLOCK_COLOR = {
	R: 80,
	G: 136,
	B: 47
}
const MAX_COLOR = {
	R: DEFAULT_BLOCK_COLOR.R + 50,
	G: DEFAULT_BLOCK_COLOR.G + 50,
	B: DEFAULT_BLOCK_COLOR.B + 50
}
const MIN_COLOR = {
	R: DEFAULT_BLOCK_COLOR.R - 50,
	G: DEFAULT_BLOCK_COLOR.G - 50,
	B: DEFAULT_BLOCK_COLOR.B - 50
}
const COLOR_STEP = 5;
const POS_CHANGE_COLOR = {
	R: 0.5,
	G: 0.5,
	B: 0.5
}

//blocks
var BLOCK_W = 70;
var BLOCK_H = 70;

//physics
const G = 1.5;

//character
const PERS_START_BX = 10;
const PERS_START_BY = -6;
const PERS_START_BW = 1.5;
const PERS_START_BH = 2.25;

//character animation
const PERS_ANIMATION = {
	stand: 			tiles.newImage("images/gg_stand.png").getAnimation(0, 0, 200, 300, 1 ),
	goLeft: 		tiles.newImage("images/gg_goLeft.png").getAnimation( 0, 0, 200, 300, 23 ),
	jumpLeft: 		tiles.newImage("images/gg_jumpLeft.png").getAnimation( 0, 0, 200, 300, 1 ),
	goRight: 		tiles.newImage("images/gg_goRight.png").getAnimation(0, 0, 200, 300, 23 ),
	jumpRight: 		tiles.newImage("images/gg_jumpRight.png").getAnimation(0, 0, 200, 300, 1 ),
	throw: 	null,
}
const PERS_ANIMATION_DELAY = 3;

//Pers properties
const PERS_WALK_SPEED = 4;
const PERS_JUMPSPEED = 20;
const PERS_MAX_FALLSPEED = 40;
