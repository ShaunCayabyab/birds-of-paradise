/**
* ===================
* AUDIO-HANDLER.js
* ===================
*
* Resonsible for handling the audio playback for the app.
*
* @since 1.0.0
*/


/**
* AUDIOHANDLER MODULE
* ===================
*
* Module holding the functionality for howler.js
* audio playback
*
* @since 1.0.0
*/
var AudioHandler = (function(){

	//River audio file reference
	var river = new Howl({
		src: ['/audio/river.mp3'],
		volume: 0.5,
		loop: true,
	});

	//Array holding the bird calls as Howl objects
	var birds = [
		//bluejay
		new Howl({
			src: ['/audio/bluejay.mp3'],
			volume: 0.4,
			buffer: true,
		}),
		//cardinal
		new Howl({
			src: ['/audio/cardinal.mp3'],
			volume: 0.4,
			buffer: true,
		}),
		//dove
		new Howl({
			src: ['/audio/dove.mp3'],
			volume: 0.2,
			buffer: true,
		}),
		//eaglet
		new Howl({
			src: ['/audio/eaglet.mp3'],
			volume: 0.4,
			buffer: true,
		}),
		//killdeer
		new Howl({
			src: ['/audio/killdeer.mp3'],
			volume: 0.4,
			buffer: true,
		}),
		//mallard
		new Howl({
			src: ['/audio/mallard.mp3'],
			volume: 0.4,
			buffer: true,
		}),
		//meadowlark
		new Howl({
			src: ['/audio/meadowlark.mp3'],
			volume: 0.4,
			buffer: true,
		}),
		//parrot
		new Howl({
			src: ['/audio/parrot.mp3'],
			volume: 0.4,
			buffer: true,
		}),
		//warbling
		new Howl({
			src: ['/audio/warbling.mp3'],
			volume: 0.4,
			buffer: true,
		}),
	];

	//For handling unique bird call playing
	var prev_index;


	/**
	* playRandomBird
	* ==============
	* Function for playing a random bird call audio file.
	* 3d position of the playback, as well as playrate, is 
	* also randomized to create a more organic sonic soundscape
	* of birds
	*
	* @since 1.0.0
	*/
	function playRandomBird() {
		//Randomly choose a bird
	    var index = chooseUniqueBird();

	    //Sometimes chooseUniqueBird returns undefined, not sure why.
	    //So this is a just-in-case.
	    index = (index === undefined) ? Math.floor(Math.random() * (birds.length)) : index;
	    prev_index = index;

	    //Sound position variables. Randomized to create 3d soundscape
	    var x = Math.round(100 * (2 - (Math.random() * 4))) / 100;
		var y = Math.round(100 * (2 - (Math.random() * 4))) / 100;

		//Randomize playrate, to give a little variety to soundscape
		var speed = (Math.random() * 0.05) + 0.975;

		//Play bird call
		try{
			birds[index].rate(speed);
			birds[index].pos(x, y, -0.5);
		    birds[index].play();
	    }
	    catch(err){
	    	console.log(err);
	    }
	}


	/**
	* chooseUniqueBird
	* ================
	*
	* Function to make sure a bird call is not played twice in a row.
	* Generate a random index, and if it matches the previous call's index,
	* generate another.
	*
	* @since 1.0.0
	*/
	function chooseUniqueBird(){

		var index = Math.floor(Math.random() * (birds.length));

		if(index !== prev_index){
			return index;
		}
		else{
			chooseUniqueBird();
		}
	}


	/**
	* startRiver
	* ==========
	*
	* Just to get the river audio playing
	*
	* @since 1.0.0
	*/
	function startRiver(){

		river.play();

	}


	return {

		playBird: function(){

			playRandomBird();
		
		},
		playRiver: function(){

			startRiver();

		}
	}

})();


//Start the river ambience
AudioHandler.playRiver();