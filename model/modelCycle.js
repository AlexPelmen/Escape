//model cycle function
function modelCycle(){
	Pers.refresh();
	Macs.refresh();
	Ufo.refresh();
	Eggs.refresh();
	EggsBox.refresh(); 
	camera.follow( objectPers, 10 );
}


