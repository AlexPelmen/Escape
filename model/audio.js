var Audio = {
	track: AUDIO_MAIN,
	/*persHit: AUDIO_PERS_HIT,
	ufoSound: AUDIO_UFO_SOUND,
	ufoCrack: AUDIO_UFO_CRACK,*/
	check: null,

}

Audio.check = () => {
	if( ! Audio.track.playing )
		Audio.track.replay();
}