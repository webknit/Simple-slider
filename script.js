var Base = Base || {};

Base.functionName = function() {
	
	// Our Variables 
	
	// The slideshow
	var slideShow = $('.slideshow');
	var slideShowWidth = slideShow.width();
	var slideShowHeight = slideShow.height();
	// The slideshow mask
	var slideshowMask = $('.slideshow__mask');
	// The slideshow ul
	var mask = $('.slideshow__images');
	// The slider lis
	var images = $('.slideshow__slideli')
	//The pagination lis
	var pagination = $('.slideshow__pagination li');
	// Last element is one before the end
	var lastElem = pagination.length - 1;
	// Slide next button
	var slideNextBtn = $('.slideshow__control--next');
	// Slide prev button
	var slidePrevBtn = $('.slideshow__control--prev');
	// The width of our images
	var imgWidth = mask.width();
	// The chosen slide
	var slideChoice;
	// The setInterval for the slider
	var sliderRun
	// Number of slides
	var numSlides;

	// Call the functions
	function init() {

		// Make the first pagination active
		images.first().addClass('active');
		pagination.first().addClass('active');
		checkSize();
		
		// We need to calculate the width of all the slides and apply to the ul
		// Add the extra one on againt o find true value
		// E.g 600 x 5 = 3000px
		mask.css('width', slideShowWidth * (lastElem + 1) +'px');
		
		pagination.click(paginationAction);
		slideNextBtn.click(slideNext);
		slidePrevBtn.click(slidePrev);
		
		// Start the slider
		sliderRun = setInterval(slideNext, 5000);
		
		var $window = $(window);
		// Each time the user resized the window call this
		$window.resize(function () {
		
			var id;
		
			// Reset the timeout
			clearTimeout(id);
			
			// Call the function after it has stopped being resized
			id = setTimeout(checkSize, 500);
			
		});

	}
	
	function checkSize() {
	
		// Check if width has changed
		slideShowWidth = slideShow.width();
	
		// Update the css widths
		slideshowMask.css('width', slideShowWidth);
		images.css('width', slideShowWidth);
		
		moveSlider(0);
		
	}
	
	function moveSlider(slideChoice) {
	
		// This tells us how far we want the css left negative position to be
		var slidePos = slideShowWidth * slideChoice;
	
		// stop() stop animation, then we reanimate it to the left position we want
	    mask.stop(true,false).animate({'left':'-'+ slideShowWidth * slideChoice +'px'},600);
	    
	    // Sort active states on images
	    images.removeClass('active').eq(slideChoice).addClass('active');
	    
	    // Remove active states on the pagination
	    // eq() selects the correct pagination eg if slideChoice == 2 the 3rd pagingation addClass
	    pagination.removeClass('active').eq(slideChoice).addClass('active');
	    
	    // reset the time again
	    resetTime();
	    
	}
	
	function paginationAction() {
	
		if (!$(this).hasClass('active')) {
		
			// index() returns the index position of of pagination 
	        slideChoice = $(this).index();
			
			// Move the slider to the specified slideChoice
	        moveSlider(slideChoice);
	        
	        // Need to reset the slider timing
	        resetTime();
	        
	    }
	
	}
	
	// Prev slide
	function slidePrev() {
	
		// Need to find the currectly active slide 
		slideChoice = $('.slideshow__slideli.active').index();
		
		// If we're already at the bottom we need to ensure we're going to the top next
		if(slideChoice === 0) {
		
			slideChoice = lastElem;
			
		}
		
		// Anything else we can move slideChoice down one
		else {
		
			slideChoice = slideChoice - 1;
		
		}
		
		// Move the slider
	    moveSlider(slideChoice);
	
	}
	
	// Next slide
	function slideNext() {
	
		// Need to find the currectly active slide 
		slideChoice = $('.slideshow__slideli.active').index();
		
		// If we're already at the top we need to ensure we're going to the start next
		if(slideChoice === lastElem) {
		
			slideChoice = 0;
			
		}
		
		// Anything else we can move slideChoice up one
		else {
		
			slideChoice = slideChoice + 1;
		
		}
		
		// Move the slider
	    moveSlider(slideChoice);
		
	}
	
	// We need to clearInterval each time and start again
	function resetTime() {
	
	    clearInterval(sliderRun);
	    sliderRun = setInterval(slideNext, 5000);
	    
	}

	init();
	
};

// ON DOC READY
$(function() {
	
	new Base.functionName();
	
});