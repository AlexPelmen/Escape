//Main charater structure
var Pers = {
	//control flags	
	allowControl: true,
	jumpMove: false,	
	state: "stand",
	//physical characteristics
	speed: new _Vector,
	acceleration: new _Vector,
	health: 100,	
	//Methods
	refresh: null,
	checkCollisions: null,
	//functions to switch state
	states: {
		stand: 		null,
		goLeft: 	null,
		jumpLeft: 	null,
		goRight: 	null,
		jumpRight: 	null,
		throw: 		null
	},
	//motion till X-coord when pers is jumping or falling
	jumpMove: {
		left: null,
		right: null,
		stop: null
	}
}

//AnimationObject of pers 
var objectPers = new pjs.game.newAnimationObject({
	animation : PERS_ANIMATION.stand, 
	delay: PERS_ANIMATION_DELAY,
    x: PERS_START_BX * BLOCK_W, 
    y: PERS_START_BY * BLOCK_H, 
    w: PERS_START_BW * BLOCK_W, 
    h: PERS_START_BH * BLOCK_H, 
})


//Cycle refreshing pers's data
Pers.refresh = () => {
	Pers.speed.x += Pers.acceleration.x;
	if( Pers.speed.y + Pers.acceleration.y < PERS_MAX_FALLSPEED )
		Pers.speed.y += Pers.acceleration.y;	
	Pers.checkCollisions();
	objectPers.move( Pers.speed.Get() );
}

//check collisions and make resistance
Pers.checkCollisions = () => {
	var Sx = Pers.speed.x ? Pers.speed.x : 1;
	var Sy = Pers.speed.y ? Pers.speed.y : 1;
	var floor = false;	//smth under legs of pers

	/*objectPers.drawStaticBoxA( Sx + objectPers.w / 4, 0,  -3*objectPers.w / 4,  0, "green");
	objectPers.drawStaticBoxS( objectPers.w / 4,  Sy + objectPers.h / 2, -objectPers.w / 2,  -objectPers.h / 2, "red");
	objectPers.drawStaticBoxD( Sx + objectPers.w / 2, 0,  -3*objectPers.w / 4, 0, "yellow");
	objectPers.drawStaticBoxW( objectPers.w / 4,  Sy, -objectPers.w / 2,  -objectPers.h / 2, "black");*/
	//objectPers.drawStaticBoxS( objectPers.w / 4, objectPers.h, -objectPers.w / 2,  -3*objectPers.h /4 , "brown");

	blockObjects.forEach( ( block ) => {
		if( block.isInCamera() ){
			//down
			if( block.isStaticIntersect( objectPers.getStaticBoxS( objectPers.w / 4,  Sy + objectPers.h / 2, -objectPers.w / 2,  -objectPers.h / 2 ) ) ){			
				Pers.allowControl = true;
				objectPers.setPosition( point( objectPers.x, block.y - objectPers.h ) );
				Pers.states.stand();	//then stand
			}
			//right
			if( block.isStaticIntersect( objectPers.getStaticBoxD( Sx + objectPers.w / 2, 0,  -3*objectPers.w / 4 ) ) ){
				objectPers.setPosition( point( block.x - 3*objectPers.w/4, objectPers.y ) );
				if( Pers.speed.x > 0 ) Pers.speed.x = 0;
			}
			//left
			if( block.isStaticIntersect( objectPers.getStaticBoxA( Sx + objectPers.w / 4, 0,  -3*objectPers.w / 4 ) ) ){
				if( Pers.speed.x < 0 ) Pers.speed.x = 0; 
				objectPers.setPosition( point( block.x + BLOCK_W - objectPers.w/4, objectPers.y ) );
			}
			//bottom
			if( ! floor )			
				if( block.isStaticIntersect( objectPers.getStaticBoxS( objectPers.w / 4, objectPers.h, -objectPers.w / 2,  -3*objectPers.h /4 ) ) )		
					floor = true;
		}
	})

	if( ! floor && Pers.state != "fallsLeft" && Pers.state != "fallsRight" ) 
		if( Pers.speed.x < 0 )
			Pers.states.fallsLeft();
		else
			Pers.states.fallsRight();
}

Pers.states.goLeft = () => {
	Pers.state = "goLeft"; 
	Pers.speed.Set( -PERS_WALK_SPEED, 0 );
	objectPers.setAnimation( PERS_ANIMATION.goLeft );
}

Pers.states.goRight = () => {
	Pers.state = "goRight"; 
	Pers.speed.Set( PERS_WALK_SPEED, 0 );
	objectPers.setAnimation( PERS_ANIMATION.goRight );
}

Pers.states.stand = () => {
	Pers.state = "stand"; 
	Pers.speed.Set();
	Pers.acceleration.Set();
	objectPers.setAnimation( PERS_ANIMATION.stand );
}

Pers.states.jumpLeft = () => {
	Pers.state = "jumpLeft";
	Pers.speed.Add( 0, -PERS_JUMPSPEED );
	Pers.allowControl = false;
	objectPers.setAnimation( PERS_ANIMATION.jumpLeft );
}

Pers.states.jumpRight = () => {
	Pers.state = "jumpRight";
	Pers.speed.Add( 0, -PERS_JUMPSPEED );
	Pers.allowControl = false;
	objectPers.setAnimation( PERS_ANIMATION.jumpRight );
}

Pers.states.fallsLeft = () => {
	Pers.state = "fallsLeft";
	Pers.acceleration.Add( 0, G );
	Pers.allowControl = false;
	objectPers.setAnimation( PERS_ANIMATION.jumpLeft );
}

Pers.states.fallsRight = () => {
	Pers.state = "fallsRight";
	Pers.acceleration.Add( 0, G );
	Pers.allowControl = false;
	objectPers.setAnimation( PERS_ANIMATION.jumpRight );
}

Pers.jumpMove.left = () => {
	Pers.speed.x = -PERS_WALK_SPEED;
}

Pers.jumpMove.right = () => {
	Pers.speed.x = PERS_WALK_SPEED;
}

Pers.jumpMove.stop = () => {
	Pers.speed.x = 0;
}