//My classes
class _Color{
	constructor( R, G, B){
		this.R = R;
		this.G = G;
		this.B = B;
	}
	get(){
		return "RGB(" + this.R + ", " + this.G + ", "  + this.B + " )";
	}
}

//Vector class
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