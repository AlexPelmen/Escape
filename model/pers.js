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
		fallsLeft:  null,
		fallsRight: null,
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
	var Sx = Pers.speed.x;
	var Sy = Pers.speed.y;
	var floor = false;	//smth under legs of pers
	var w  = objectPers.w;
	var w2 = objectPers.w / 2;
	var w4 = objectPers.w / 4;
	var h  = objectPers.h;
	var h2 = objectPers.h / 2;
	var h4 = objectPers.h / 4;
	var x  = objectPers.x;
	var y  = objectPers.y;

	blockObjects.forEach( ( block ) => {
		if( block.isInCamera() ){

			var bx = block.x;
			var by = block.y;

			//down
			if( block.isStaticIntersect( objectPers.getStaticBoxS( w4, Sy + h2, -w2, -h2 ) ) ){			
				objectPers.setPosition( point( x, block.y - h) );
				Pers.states.stand();	//then stand
			}
			//right
			if( block.isStaticIntersect( objectPers.getStaticBoxD( Sx + w2, 0, -3*w4 ) ) ){
				objectPers.setPosition( point( bx - 3*w4, y ) );
				if( Sx > 0 ) Pers.speed.x = 0;
			}
			//left
			if( block.isStaticIntersect( objectPers.getStaticBoxA( Sx + w4, 0, -3*w4 ) ) ){
				if( Sx < 0 ) Pers.speed.x = 0; 
				objectPers.setPosition( point( bx + BLOCK_W - w4, y) );
			}
			//bottom
			if( ! floor )			
				if( block.isStaticIntersect( objectPers.getStaticBoxS( w4, h, -w2, -3*h4 ) ) )		
					floor = true;
		}
	})

	//if there is nothing under pers's legs and he isn't falling then fall 
	if( ! floor && Pers.state != "fallsLeft" && Pers.state != "fallsRight" ) 
		if( Sx < 0 )
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
	Pers.allowControl = true; 
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

Pers.states.throwLeft = () => {
	Pers.state = "throwLeft";
	objectPers.setAnimation( PERS_ANIMATION.throwLeft );
}

Pers.states.throwRight = () => {
	Pers.state = "throwRight";
	objectPers.setAnimation( PERS_ANIMATION.throwRight );
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