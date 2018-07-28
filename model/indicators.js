var EggsBox = {
	obj: null,
	refresh: null,
	removeEgg: null,
	addEgg: null,
	create: null,
	eggs: 10
}

EggsBox.obj = new game.newAnimationObject({
	x: camera.getPosition().x,
	y: camera.getPosition().y,
	w: EGGS_BOX_W,
	h: EGGS_BOX_H,
	animation: EGGS_BOX_ANIMATION
});

EggsBox.refresh = () => {
	EggsBox.obj.setPosition( camera.getPosition() );
}

EggsBox.removeEgg = () => {
	if( EggsBox.eggs ) 
		--EggsBox.eggs;
}

EggsBox.addEgg = () => {
	if( EggsBox.eggs )
		++EggsBox.eggs;
}