// Can also be used with $(document).ready()
$(window).load(function() {
  $('.flexslider').flexslider({
    animation: "slide",
    itemWidth: 415,
    itemMargin: 2
  });

  	// About equipment gallery effect
  	// based on Codepen: http://codepen.io/q51/pen/feIcJ
	// based on JQ I found here: http://stackoverflow.com/posts/3842442/revisions
	//initial rotation
	$('.equipment-photo').each(function() {
    	var randrot = Math.random() * 20 - 10; //has to be local to run w/ each function call
    	$(this).css('transform', 'rotate(' + randrot + 'deg) scale(1)');
	});

	//hover/unhover rotations
	$('.equipment-photo').hover(function() {
    	var randrot = Math.random() * 20 - 10; //has to be local to run w/ each function call
  		$(this).css({
    	transform: "rotate(" + randrot + "deg) scale(1.25)", 
    	'z-index': "1"//kind of hacky, but standard notation didn't like the '-' in z-index, open to suggestions
    	});
	}, function() {
    	var randrot = Math.random() * 20 - 10; //has to be local to run w/ each function call
  		$(this).css({
    	transform: "rotate(" + randrot + "deg) scale(1)", 
    	'z-index': "0"//kind of hacky, but standard notation didn't like the '-' in z-index, open to suggestions
    	});
	});
	// About equipment gallery effect
 


});