/**
* ===================
* GRAPHICS-HANDLER.js
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
	* @since 1.0.0
	* @param someTweet 	The given tweet to create the new graphic of
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
		
		if( $('.tweets').children().length > 20 ){
			$('.tweets').children().last().remove();
		}

		if( $('#svg-area').children().length > 20 ){
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
* @param someTweetData 	The given Tweet data to create the circle for
* @param svg_area 		SVG canvas area to draw the circle one
*/
function TweetCircle(someTweetData, svg_area){

	//this.id = someID;
	//this.svg_area = some_svg_area;
	this.radius = (Math.random() * 20) + 5;
	this.corona_radius = this.radius + 40;
	this.x = ( Math.random() * ( svg_area.attr("width") - ((this.radius * 2) + (this.corona_radius * 2)) ) ) + this.radius;
	this.y = ( Math.random() * ( svg_area.attr("height") - ((this.radius * 2) + (this.corona_radius * 2)) ) ) + this.radius;
	
	this.circle_color = '#E1E8ED';
	this.text_color = '#FFF';

	this.inner_opacity = 1;
	this.outer_opacity = 0.3;
	this.decay = 5000;
	this.outer_decay = 1000;
	this.text_decay = 8000;

	//Transition deltas for size
	this.inner_growth = 20;
	this.outer_growth = 200;

	this.username = someTweetData.user;
	this.tweet = someTweetData.text;


	/**
	* draw
	* ====
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
			.attr('fill', this.circle_color)
			.style('opacity', this.inner_opacity);
	
		//Add the circle to the window for rendering
		var circle = circle_area.append('circle');

		//Add in the SVG elements
		this.drawCorona(circle_area);
		this.drawBird(circle_area);

		//Add in the Twitter username
		var tweet_text01 = circle_area.append('text')
			.text(someTweetData.user)
			.classed('header-label', true)
			.attr('text-anchor', 'middle')
			.attr('font-size', '1.3em')
			.style('color', this.text_color)
			.transition()
			.delay(1000)
			.style('opacity', 0)
			.duration(this.text_decay)
			.remove();

		//Sub text
		var tweet_text_sub = circle_area.append('text')
			.attr("dy", '1.2em')
			.text("tweeted a bird")
			.classed('sub-label', true)
			.attr('text-anchor', 'middle')
			.attr('font-size', '0.8em')
			.style('color', this.text_color)
			.transition()
			.delay(1000)
			.style('opacity', 0)
			.duration(this.text_decay)
			.remove();
	
		//Add in the Tweet text
		var tweet_text02 = circle_area.append('text')
			.attr("dy", "2.8em")
			.text(someTweetData.text)
			.classed('article-label', true)
			.attr('text-decoration', 'overline')
			.attr('text-anchor', 'middle')
			.attr('font-size', '0.8em')
			.style('color', this.text_color)
			.transition()
			.delay(1000)
			.style('opacity', 0)
			.duration(this.text_decay)
			.remove();
	}


	/**
	* drawCorona
	* ==========
	*
	* Function for drawing the growing circle that surrounds
	* the Tweet and bird.
	*
	* @since 1.0.0
	* @param someArea 	The SVG canvas area to append the bird to
	*/
	this.drawCorona = function(someArea){

		//Add the outer circle
		var corona = someArea.append('circle');

		//Draw and animate
		corona.attr('r', this.corona_radius)
			.classed("corona", true)
			.attr('fill', this.circle_color)
			.style('opacity', this.outer_opacity);

		corona.transition()
			.attr('r', this.corona_radius + this.outer_growth)
			.style('opacity', 0)
			.ease(Math.sqrt)
			.duration(this.outer_decay)
			.remove();
	}


	/**
	* drawBird
	* ========
	*
	* Function for appending a bird SVG to the canvas
	*
	* @since 1.0.0
	* @param someArea 	The SVG canvas area to append the bird to
	*/
	this.drawBird = function(someArea){

		var bird = someArea.append('image')
			.attr("xlink:href", "/src/images/white-bird.svg")
			.classed("bird", true)
			.attr("width", 80)
			.attr("height", 80)
			.attr("transform", "translate(-40,-90)")
			.transition()
			.duration(this.decay)
			.style('opacity', 0)
			.remove();

	}
}