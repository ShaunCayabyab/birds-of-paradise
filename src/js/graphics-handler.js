
/**
* limitList
* =========
* Used to limit the number of tweet elements on the page.
* This is so the page is not flooded with old tweet elements.
*
* @since 1.0.0
*/
function limitList(){
	if($('.tweets').children().length > 10){
		$('.tweets').children().last().remove();
	}
}


var CanvasArea = (function(){

	var createNewCanvas = function(){

	}

	var repaintCanvas = function(){

	}

	var createNewTweetCircle = function(){

	}


	/**
	* limitList
	* =========
	* Used to limit the number of tweet elements on the page.
	* This is so the page is not flooded with old tweet elements.
	*
	* @since 1.0.0
	*/
	var limitList = function(){
		if( $('.tweets').children().length > 10 ){
			$('.tweets').children().last().remove();
		}
	}


	return {

		initCanvas: function(){
			createNewCanvas();
		},
		repaintCanvas: function(){

		},
		createNewTweetCircle: function(){

		},
		limitTweets: function(){
			limitList();
		},
	};
})();



function TweetCirlce(someTweetData){

	this.radius;
	this.color;
	this.decay = 5000;

	this.username = someTweetData.user;
	this.tweet = someTweetData.text;
}