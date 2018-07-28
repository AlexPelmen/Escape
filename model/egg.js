var Eggs = {
	array: [],
	create: null,
	refresh: null
}

class _Egg{
	constructor( s = 0 ){
		this.speed = new _Vector( 0, s );
		this.acceleration = new _Vector( 0, G );
		this.destroy = false;
		this.obj = this.createObject();
	}
	createObject(){
		return new game.newAnimationObject({
			x: Ufo.obj.x + EGG_OFFSET_X,
			y: Ufo.obj.y + EGG_OFFSET_Y,
			w: EGG_W,
			h: EGG_H,
			animation: EGG_ANIMATION
		});
	}
	checkCollisions(){
		var x = this.obj.x;
		var y = this.obj.y;
		var w = this.obj.w;
		var h = this.obj.h;
		var S = this.speed.y;
		var staticBox = this.obj.getStaticBoxS( 0, S, 0, -EGG_H + S );

		blockObjects.forEach( ( block ) => {			
			//down
			if( block.isStaticIntersect( staticBox ) )
				this.destroy = true;
		});
		if( objectPers.isStaticIntersect( staticBox ) ){
			Pers.health -= PERS_EGG_DAMAGE;
			EggsBox.removeEgg();
			this.destroy = true;			
		}
	}
}

Eggs.create = () => {
	Eggs.array.push( new _Egg( 0 ) );
}

Eggs.refresh = () => {
	for( i in Eggs.array ){
		var egg = Eggs.array[ i ];
		egg.speed.Add( egg.acceleration.x, egg.acceleration.y );
		egg.checkCollisions();
		if( egg.destroy )
			Eggs.array.splice( i, 1 );
		else
			egg.obj.move( egg.speed.Get() );
	};
}