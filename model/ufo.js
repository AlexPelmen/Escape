var Ufo = {
	speed: new _Vector( 0, 0 ),
	acceleration: new _Vector( 0, 0 ),
	state: "flyLeft",
	obj: null,

	refresh: null,
	behavior: null,
	lastSpeed: null,
	changeSpeedTime: 0,
	checkCollisions: null,

	states: {
		fly: null,
		hit: null,
		attacks: null,
		explodes: null
	}
}

Ufo.obj =  new game.newAnimationObject({
	x: UFO_X,
	y: UFO_Y,
	w: UFO_W,
	h: UFO_H,
	delay: UFO_ANIMATION_DELAY,
	animation: UFO_ANIMATION.fly
});

//variable to count number of animation frames, which've been played yet
animationFramesPlayed = 0;

Ufo.refresh = () => {
	animationFramesPlayed++;
	if( Ufo.state == "attacks" && animationFramesPlayed == EGG_FRAME_TO_THROW )
		Eggs.create();
	Ufo.behavior();
	Ufo.checkCollisions();
	Ufo.obj.move( Ufo.speed.Get() );
}

Ufo.checkCollisions = () => {
	var Sx = Ufo.speed.x;
	var Sy = Ufo.speed.y;
	var w  = Ufo.obj.w;
	var h  = Ufo.obj.h;
	var x  = Ufo.obj.x;
	var y  = Ufo.obj.y;

	Macs.array.forEach( ( mac ) => {
		var mx = mac.x;
		var my = mac.y;
		var mSx = mac.speed.x;
		var mSy = mac.speed.y;

		//down
		if( mac.obj.isStaticIntersect( Ufo.obj.getStaticBoxS( 0, Sy + h/2, 0, Sy - h/2 ) ) ){			
			Ufo.states.hit();
			mac.destroy = true;
		}
		//right
		if( mac.obj.isStaticIntersect( Ufo.obj.getStaticBoxD( Sx + w/2, 0, -w/2 ) ) ){
			Ufo.states.hit();
			mac.destroy = true;
		}
		//left
		if( mac.obj.isStaticIntersect( Ufo.obj.getStaticBoxA( Sx, 0, -w/2 ) ) ){
			Ufo.states.hit();
			mac.destroy = true;
		}
		//top
		if( mac.obj.isStaticIntersect( Ufo.obj.getStaticBoxW( 0, Sx, 0, -w/2 ) ) ){
			Ufo.states.hit();
			mac.destroy = true;
		}
	});
}

Ufo.states.flyRight = () => {
	animationFramesPlayed = 0;
	Ufo.speed.Set( UFO_SPEED_X, 0 );
	Ufo.obj.setAnimation( UFO_ANIMATION.fly );
	Ufo.state = "flyRight";
}

Ufo.states.flyLeft = () => {
	animationFramesPlayed = 0;
	Ufo.speed.Set( -UFO_SPEED_X, 0 );
	Ufo.obj.setAnimation( UFO_ANIMATION.fly );
	Ufo.state = "flyLeft";
}

Ufo.states.hit = () => {
	animationFramesPlayed = 0;
	Ufo.speed.Set();
	Ufo.acceleration.Set();
	Ufo.obj.setAnimation( UFO_ANIMATION.hit );
	Ufo.state = "hit";
}

Ufo.states.attacks = () => {
	animationFramesPlayed = 0;
	Ufo.speed.Set();
	Ufo.acceleration.Set();
	Ufo.obj.setAnimation( UFO_ANIMATION.attacks );
	Ufo.state = "attacks";
}

zona = null;

Ufo.behavior = () => {

	//time after moment when pers changed speed
	if( Ufo.changeSpeedTime ) 
		Ufo.changeSpeedTime++;

	//If some animation still playing we must not stop it
	if( Ufo.state == "hit" && animationFramesPlayed != UFO_HIT_ANIMATION_TIME ) 
		return;
	if( Ufo.state == "explodes" && animationFramesPlayed != UFO_EXPLODES_ANIMATION_TIME ) 
		return;
	if( Ufo.state == "attacks" && animationFramesPlayed != UFO_ATTACKS_ANIMATION_TIME ) 
		return;
	animationFramesPlayed = 0;
	if( Ufo.state == "hit" )
		Ufo.obj.setPosition( point( objectPers.x + SCREEN_W, Ufo.obj.y ) );

	Ux = Ufo.obj.x + UFO_W/2;
	Px = objectPers.x;
	Ps = Pers.speed.x;

	if( Ps <= 0 ){
		if( Ufo.lastSpeed > 0 ){
			Ps = Ufo.lastSpeed;
			if( ! Ufo.changeSpeedTime ){
				Ps = Ufo.lastSpeed;
				Ufo.changeSpeedTime++;
			}
			if( Ufo.changeSpeedTime > UFO_WAITING_TIME ){
				Ufo.changeSpeedTime = 0;
				Ufo.lastSpeed = Pers.speed.x;
			}
		}
	}
	else
		Ufo.lastSpeed = Pers.speed.x;

	//area (right and left points) where pers is supposed to be in some time
	supPxRight = Px + Ps*UFO_AIM_POINT_DIST + objectPers.w;
	supPxLeft = Px + Ps*UFO_AIM_POINT_DIST;

	var fly = true;
	if( supPxRight > Ux )
		if( supPxLeft < Ux ){
			Ufo.states.attacks();		//we bomb it, if pers is supposed to be there
			fly = false;
		}

	if( fly ){
		//if ufo still haven't aimed to pers then move it
		if( supPxRight > Ux  ){
			if( Ufo.state != "flyRight" ) 
				Ufo.states.flyRight();
		}
		if( supPxRight < Ux  ){
			if( Ufo.state != "flyLeft" ) 
				Ufo.states.flyLeft();
		}
	}
}