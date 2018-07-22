function viewCycle(){
	drawBackground();
	drawPers();
	drawBlocks();	
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

//Drawing sky
function drawBackground(){
	game.fill( "#ddf" );
}