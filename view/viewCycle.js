//variables
var SHOW_COLLISION_ZONES = false;

function viewCycle(){
	drawBackground();
	drawPers();
	drawMacs();
	drawBlocks();
	drawEggs();
	drawUfo();
	drawIndicators();	
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

function drawUfo(){
	Ufo.obj.draw();
}

function drawEggs(){
	Eggs.array.forEach( ( egg ) => {
		egg.obj.draw();
	})
}

function drawIndicators(){
	EggsBox.obj.drawFrame( 10 - EggsBox.eggs );
}
