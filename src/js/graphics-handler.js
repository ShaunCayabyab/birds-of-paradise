/**
* ===================
* GRAPHICS-HANDLR.js
* ===================
*
* Resonsible for handling the graphics for the app.
*
* @since 1.0.0
*/


/**
* CANVASAREA MODULE
* =================
*
* Module for dealing with the SVG visualization on the page
*
* @since 1.0.0
*/
var CanvasArea = (function(){

	var svg;
	var graphics_group = [];

	var canvas_background = '#1DA1F2';
	var element = document.documentElement;
	var graphics_canvas = document.getElementsByTagName('#area')[0];
	var width = window.innerWidth || element.clientWidth || graphics_canvas.clientWidth;
	var height = window.innerHeight || element.clientHeight || graphics_canvas.clientHeight;


	/**
	* createNewCanvas
	* ===============
	*
	* Upon page load, creates the canvas for Twitter visualization
	*
	* @since 1.0.0
	*/
	var createNewCanvas = function(){
	
		//Setting up the SVG canvas area using D3.js
		svg = d3.select('#area').append('svg').attr("id", "svg-area");
		svg.attr("width", width).attr("height", height);
		$('svg').css('background-color', canvas_background)

		//Setting up window resize listening
		window.onresize = repaintCanvas;
		repaintCanvas();

	}


	/**
	* repaintCanvas
	* =============
	*
	* Updates the graphics canvas dimensions upon window change
	*
	* @since 1.0.0
	*/
	var repaintCanvas = function(){

		//Set the new dimensions
		width = window.innerWidth || element.clientWidth || graphicsCanvas.clientWidth;
		height = window.innerHeight || element.clientHeight || graphicsCanvas.clientHeight;

		//Update the SVG canvas area
		svg.attr("width", width).attr("height", height);	
	}


	/**
	* createNewTweetGraphic
	* ====================
	* 
	* Function used to create a visualization for a new incoming Tweet
	*
	* @param someTweet 	The given tweet to create the new graphic of
	* @since 1.0.0
	*/
	var createNewTweetGraphic = function(someTweet){

		//Create the new graphic object
		var graphic = new TweetCircle(someTweet, svg);

		//Add to the group of already-rendered graphics
		graphics_group.push(graphic);

		//Draw the generated graphic
		graphic.draw();
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

		if( $('#svg-area').children().length > 10 ){
			$('#svg-area').children().first().remove();
			graphics_group.splice(1, 1);
		}

	}


	/**
	* FUNCTIONS TO RETURN
	* ===================
	*
	* @function initCanvas
	* @function updateCanvas
	* @function createNewTweetCircle
	* @function limitTweets
	*/
	return {

		initCanvas: function(){
			
			createNewCanvas();

		},
		updateCanvas: function(){
			
			repaintCanvas();

		},
		newTweet: function(someTweet){

			createNewTweetGraphic(someTweet);

		},
		limitTweets: function(){
			
			limitList();

		},
	};
})();



/**
* TWEETCIRCLE OBJECT
* ==================
*
* Object for creating a circle for each Tweet.
* Position and size are randomized for each individual circle.
*
* @since 1.0.0
*/
function TweetCircle(someTweetData, svg_area){

	//this.id = someID;
	//this.svg_area = some_svg_area;
	this.radius = 44;
	this.x = (Math.random() * (svg_area.attr("width") - this.radius)) + this.radius;
	this.y = (Math.random() * (svg_area.attr("height") - this.radius)) + this.radius;
	this.color = '#FFF';
	this.init_opacity = 1;
	this.opacity = 1;
	this.decay = 5000;

	this.username = someTweetData.user;
	this.tweet = someTweetData.text;

	/**
	* draw
	* ==========
	*
	* Function for drawing the circle onto
	* the SVG canvas area.
	*
	* @since 1.0.0
	*/
	this.draw = function(){

		//Create the container for the circle graphic
		var circle_area = svg_area.append('g')
			.attr('transform', 'translate(' + this.x + ', ' + this.y + ')')
			.attr('fill', this.color)
			.style('opacity', this.init_opacity);
	
		//Add the circle to the window for rendering
		var circle = circle_area.append('circle');
		//circle.classed(type, true);
		circle.attr('r', this.radius)
			.attr('fill', this.color)
			.transition()
			.duration(this.decay)
			.style('opacity', 0)
			.remove();
	}
}