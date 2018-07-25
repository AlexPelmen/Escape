var Macs = {
	array: [],
	refresh: null,
	create: null,
};

//Main charater structure
class _Mac{
	constructor( vect = new _Vector( MAC_SPEED, 0 ) ){
		//physical characteristics
		this.speed = vect;
		this.angleSpeed = MAC_ANGLE_SPEED;
		this.acceleration = new _Vector( 0, G );
		this.time = 0;
		this.obj = this.getObject();
		this.state = "fly";
		this.destroy = false;	
	}
	getObject(){		
		return new pjs.game.newAnimationObject({
			animation : MAC_ANIMATION.fly, 
			delay: MAC_ANIMATION_DELAY,
		    x: objectPers.x + MAC_OFFSET_X, 
		    y: objectPers.y + MAC_OFFSET_Y, 
		    w: MAC_W, 
		    h: MAC_H 
		})
	}
	switchToPoof(){
		this.obj.setAnimation( MAC_ANIMATION.poof );
		this.state = "poof";
	}
	checkTime(){
		if( this.time == MAC_TTL )
			this.switchToPoof();
		else if( this.time == MAC_TTL + MAC_POOF_TIME )
			this.destroy = true;
		this.time++;
	}
	checkCameraVisibility(){
		if( ! this.obj.isInCamera() )
			this.destroy = true;
	}
	checkCollisions(){
		var Sx = this.speed.x;
		var Sy = this.speed.y;
		var floor = false;
		var w  = this.obj.w;
		var h  = this.obj.h;
		var x  = this.obj.x;
		var y  = this.obj.y;

		blockObjects.forEach( ( block ) => {
			if( block.isInCamera() ){

				var bx = block.x;
				var by = block.y;

				//down
				if( block.isStaticIntersect( this.obj.getStaticBoxS( 0, Sy + h/2, 0, Sy - h/2 ) ) ){			
					this.obj.setPosition( point( x, by - h) );
					this.speed.y = 0;
					this.acceleration.Set();
				}
				//right
				if( block.isStaticIntersect( this.obj.getStaticBoxD( Sx + w/2, 0, -w/2 ) ) ){
					this.obj.setPosition( point( bx - w, y ) );
					if( Sx > 0 ) this.speed.x = 0;
				}
				//left
				if( block.isStaticIntersect( this.obj.getStaticBoxA( Sx, 0, -w/2 ) ) ){
					if( Sx < 0 ) this.speed.x = 0; 
					this.obj.setPosition( point( bx + BLOCK_W + 1, y) );
				}
				//bottom
				if( ! floor )			
					if( block.isStaticIntersect( this.obj.getStaticBoxS( 0, h, 0, -h + Sy + 3 ) ) )		
						floor = true;
			}
		});
		if( ! floor ){
			this.angleSpeed = MAC_ANGLE_SPEED;
			this.acceleration.y = G;			
		}
		else{
			//friction force
			if( this.speed.x > 0 ) 
				this.acceleration.x = -MAC_F_RESIST;
			else if( this.speed.x < 0 )	
				this.acceleration.x = MAC_F_RESIST;
			else
				this.acceleration.x = 0;
			//stop turning
			this.angleSpeed = 0;
			this.obj.setAngle( 0 );
		}
}
	drawCollisionBoxes(){
		var Sx = this.speed.x;
		var Sy = this.speed.y;
		var w  = this.obj.w;
		var h  = this.obj.h;
		var x  = this.obj.x;
		var y  = this.obj.y;

		this.obj.drawStaticBoxS( 0, Sy + h/2, 0, Sy - h/2, "blue" );		
		this.obj.drawStaticBoxD( Sx + w/2, 0, - w/2, "brown" );
		this.obj.drawStaticBoxA( Sx, 0, - w/2, 0, "red" );
		this.obj.drawStaticBoxS( 0, h, 0, -h + Sy, "green" );
	}
}

Macs.refresh = () => {
	if( ! Macs.array.length ) return;
	for( i in Macs.array ){
		var mac = Macs.array[i];
		mac.checkCameraVisibility();		
		mac.speed.Add( mac.acceleration.x, mac.acceleration.y );
		mac.checkCollisions();
		mac.obj.move( mac.speed.Get() );
		mac.obj.turn( mac.angleSpeed );
	}
	mac = Macs.array[ Macs.array.length - 1 ];
	if( mac.destroy ) //time to live is out
		mac = Macs.array.pop();
}

//Variable to score ticks to sync animation and creating macs
var timeSpacePressed = 0;

Macs.checkSync = () => {
	if( timeSpacePressed == FRAME_TO_THROW_MAC )
		Macs.create();
	if( timeSpacePressed == FRAME_TO_RESET_MAC )
		timeSpacePressed = 0;
}

Macs.create = () => {
	if( timeSpacePressed == FRAME_TO_THROW_MAC )
		Macs.array.push( new _Mac );
}

