//variables
var SHOW_COLLISION_ZONES = false;

function viewCycle(){
	drawBackground();
	drawPers();
	drawMacs();
	drawBlocks();
	/*Macs.array.forEach( ( mac ) => {
		mac.drawCollisionBoxes();
	})*/
	if( SHOW_COLLISION_ZONES )
		drawCollisionZones();
}

//drawing character
function drawPers(){
	objectPers.draw();
}

//blocks redrawing
function drawBlocks(){	
	blockObjects.forEach( ( b ) => {
		if( b.isInCamera() )
			b.draw();
	})	
}

function drawMacs(){
	Macs.array.forEach( ( mac ) => {
		mac.obj.draw();
		//mac.drawCollisionBoxes();
	})
}

//Drawing sky
function drawBackground(){
	game.fill( "#ddf" );
}



function drawCollisionZones(){
	var Sx = Pers.speed.x;
	var Sy = Pers.speed.y;
	var w  = objectPers.w;
	var w2 = objectPers.w / 2;
	var w4 = objectPers.w / 4;
	var h  = objectPers.h;
	var h2 = objectPers.h / 2;
	var h4 = objectPers.h / 4;
	var x  = objectPers.x;
	var y  = objectPers.y;	
	
	objectPers.drawStaticBoxA( Sx + w4, 0, -3*w4, 0, "green");
	objectPers.drawStaticBoxS( w4,  Sy + h2, -w2, -h2, "red");
	objectPers.drawStaticBoxD( Sx + w2, 0, -3*w4, 0, "yellow");
	objectPers.drawStaticBoxW( w4, Sy, -w2, -h2, "black");
	objectPers.drawStaticBoxS( w4, h, -w2, -3*h4, "brown");	
}