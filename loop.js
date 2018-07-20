var pjs = new PointJS( '2d', 800, 600 );
pjs.system.initFullPage();
pjs.system.initFPSCheck();

var game = pjs.game;
var point = pjs.vector.point;
var key = pjs.keyControl;
var OOP = pjs.OOP;
var brush = pjs.brush;
var key = pjs.keyControl.initKeyControl();
var camera = pjs.camera;
var tiles = pjs.tiles;
var vector = pjs.vector;

//Just main loop
game.newLoop( "game", () => {
	control();
	view();
});


class _Vector {
	constructor( x = 0, y = 0 ){
		this.x = x;
		this.y = y;
	}

	Get(){
		return point( this.x, this.y );
	}

	Set( x = 0, y = 0 ){
		this.x = x;
		this.y = y;
	}

	Add( x, y ){
		this.x += x;
		this.y += y;
	}
} 

const G = 1.5;

//Main charater
var Pers = {

	//constants
	Bx: 10,
	By: 5,
	Bw: 2,
	Bh: 3,

	allowControl: true,

	//physical characteristics
	state: "stand",
	speed: new _Vector,
	acceleration: new _Vector,
	health: 100,

	//scalar
	walkSpeed: 4,
	jumpSpeed: 20,

	//update function
	refresh: null,

	animation: {
		stand: 	tiles.newImage("images/gg_stand.png").getAnimation(0, 0, 200, 300, 1 ),
		goLeft: tiles.newImage("images/gg_goLeft.png").getAnimation( 0, 0, 200, 300, 23 ),
		jumpLeft: tiles.newImage("images/gg_jumpLeft.png").getAnimation( 0, 0, 200, 300, 1 ),
		goRight: tiles.newImage("images/gg_goRight.png").getAnimation(0, 0, 200, 300, 23 ),
		jumpRight: tiles.newImage("images/gg_jumpRight.png").getAnimation(0, 0, 200, 300, 1 ),
		throw: 	null,
	},

	states: {
		stand: 		null,
		goLeft: 	null,
		jumpLeft: 	null,
		goRight: 	null,
		jumpRight: 	null,
		throw: 		null
	}
}

Pers.refresh = () => {
	Pers.speed.x += Pers.acceleration.x;
	Pers.speed.y += Pers.acceleration.y;
	vector.moveCollision( objectPers, blockObjects, Pers.speed.Get() );
	Pers.checkCollisions();
}

Pers.checkCollisions = () => {
	blockObjects.forEach( ( block ) => {
		if( block.isInCamera() ){
			if( objectPers.getDistanceC( block ) < Pers.Bh + blockH + 20 ){
				Pers.states.stand();
				Pers.allowControl = true;
				//break;
			}
		}
	})
}

Pers.states.goLeft = () => {
	Pers.state = "goLeft"; 
	Pers.speed.Set( -Pers.walkSpeed, 0 );
	objectPers.setAnimation( Pers.animation.goLeft );
}

Pers.states.goRight = () => {
	Pers.state = "goRight"; 
	Pers.speed.Set( Pers.walkSpeed, 0 );
	objectPers.setAnimation( Pers.animation.goRight );
}

Pers.states.stand = () => {
	Pers.state = "stand"; 
	Pers.speed.Set();
	Pers.acceleration.Set();
	objectPers.setAnimation( Pers.animation.stand );
}

Pers.states.jumpLeft = () => {
	Pers.state = "jumpLeft";
	Pers.speed.Add( 0, -Pers.jumpSpeed );
	Pers.acceleration.Add( 0, G );
	Pers.allowControl = false;
	objectPers.setAnimation( Pers.animation.jumpLeft );
}

Pers.states.jumpRight = () => {
	Pers.state = "jumpRight";
	Pers.speed.Add( 0, -Pers.jumpSpeed );
	Pers.acceleration.Add( 0, G );
	Pers.allowControl = false;
	objectPers.setAnimation( Pers.animation.jumpRight );
}


var objectPers = new pjs.game.newAnimationObject({
	animation : tiles.newImage("images/gg_stand.png").getAnimation(0, 0, 200, 300, 1 ), 
	delay: 3,
    x: Pers.Bx * blockW, 
    y: Pers.By * blockH, 
    w: Pers.Bw * blockW, 
    h: Pers.Bh * blockH, 
})

//start game
initialization();
game.startLoop( "game" );


