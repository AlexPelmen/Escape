view = () => {
	game.fill( "#ddf" );

	//blocks redrawing
	blockObjects.forEach( ( b ) => {
		if( b.isInCamera() )
			b.draw();
	})	
	test.draw();

	//pers
	drawPers();	
	camera.follow( objectPers, 10 );
}

//drawing character
function drawPers(){

	Pers.refresh();
	objectPers.draw();
}