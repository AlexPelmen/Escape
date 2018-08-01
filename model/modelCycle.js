//model cycle function
function modelCycle(){
	WinLoose.check();
	if( WinLoose.playing ){
		Pers.refresh();
		Macs.refresh();
		Ufo.refresh();
		Eggs.refresh();
		EggsBox.refresh(); 
		camera.follow( objectPers, 10 );
		Audio.check();
 	}
}


