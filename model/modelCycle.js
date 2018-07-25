//model cycle function
function modelCycle(){
	Pers.refresh();
	Macs.refresh();
	camera.follow( objectPers, 10 );
}


