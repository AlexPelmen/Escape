//screen
const SCREEN_W = pjs.game.getWH().w;
const SCREEN_H = pjs.game.getWH().h;
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
const MAX_BX = 300;
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
	throwRight: 	tiles.newImage("images/gg_throwRight.png").getAnimation(0, 0, 200, 300, 9 ),
	throwLeft: 		tiles.newImage("images/gg_throwLeft.png").getAnimation(0, 0, 200, 300, 9 )
}
const PERS_ANIMATION_DELAY = 3;

//Pers properties
const PERS_WALK_SPEED = 4;
const PERS_JUMPSPEED = 20;
const PERS_MAX_FALLSPEED = 40;
const PERS_EGG_DAMAGE = 10;

//macs
const MAC_SPEED_X = 20;
const MAC_SPEED_Y = -20;
const MAC_F_RESIST = 1;
const MAC_ANGLE_SPEED = 50;
const MAC_TTL = 2*60;
const MAC_POOF_TIME = 30;
//macs animation
const MAC_ANIMATION = {
	fly: 			tiles.newImage("images/mac_fly.png").getAnimation(0, 0, 192, 134, 1 ),
	poof:           tiles.newImage("images/poof.png").getAnimation(0, 0, 192, 134, 1 ),
}
const MAC_ANIMATION_DELAY = 3;
const MAC_OFFSET_X = 0;
const MAC_OFFSET_Y = 0;
const MAC_W = 50;
const MAC_H = 35;
const FRAME_TO_THROW_MAC = 8*PERS_ANIMATION_DELAY;
const FRAME_TO_RESET_MAC = 15*PERS_ANIMATION_DELAY;


//UFO
const UFO_SPEED_X = 6;
const UFO_SPEED_Y = 0;
const UFO_ANIMATION = {
	fly: 			tiles.newImage("images/ufo_attacks.png").getAnimation(0, 0, 400, 225, 1 ),
	attacks: 		tiles.newImage("images/ufo_attacks.png").getAnimation(0, 0, 400, 225, 12 ),
	hit: 			tiles.newImage("images/ufo_hit.png").getAnimation(0, 0, 400, 225, 13 ),	 			
}
const UFO_ANIMATION_DELAY = 3;
const UFO_HIT_ANIMATION_TIME = 60;
const UFO_ATTACKS_ANIMATION_TIME = 65;
const UFO_EXPLODES_ANIMATION_TIME = 60;
const UFO_AIM_POINT_DIST = 40;
const UFO_BOMB_DIST = BLOCK_W;
const UFO_X = PERS_START_BX * BLOCK_W /*+ 800*/;
const UFO_W = 400;
const UFO_H = 225;
const UFO_Y = -MAX_H*BLOCK_H + SCREEN_H - UFO_H;
const UFO_WAITING_TIME = 20;

//Eggs
const EGG_W = 35;
const EGG_H = 50;
const EGG_OFFSET_X = UFO_W/2 - EGG_W/2;
const EGG_OFFSET_Y = UFO_H - 60;
const EGG_ANIMATION = tiles.newImage("images/egg.png").getAnimation(0, 0, 350, 500, 1 );
const EGG_FRAME_TO_THROW = 25;

//Indicators
const EGGS_BOX_X = 0;
const EGGS_BOX_Y = 0;
const EGGS_BOX_W = 200;
const EGGS_BOX_H = 143;
const EGGS_BOX_ANIMATION = tiles.newImage("images/eggsBox.png").getAnimation(0, 0, 200, 143, 1 );

//WinLoose
const WIN_PIC = game.newImageObject({
		file: "images/win.jpg",
		x: 0,
		y: 0,
		w: SCREEN_W,
		h: SCREEN_H
	});
const LOOSE_PIC = game.newImageObject({
		file: "images/loose.jpg",
		x: 0,
		y: 0,
		w: SCREEN_W,
		h: SCREEN_H
	});
const WIN_X = MAX_BX*0.95 * BLOCK_W;

//audio
const AUDIO_MAIN = pjs.wAudio.newAudio( "Apache.mp3", 0.2 );