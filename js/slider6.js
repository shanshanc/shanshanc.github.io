// Can also be used with $(document).ready()
$(window).load(function() {
  $('.flexslider').flexslider({
    animation: "slide",
    itemWidth: 415,
    itemMargin: 2
  });


});


// sticky navigation
$('#topNav').sticky({
	responsiveWidth: true

});



// FAQ blog template - back to top
$(document).ready(function() {
    var offset = 220;
    var duration = 500;
    jQuery(window).scroll(function() {
        if (jQuery(this).scrollTop() > offset) {
            jQuery('.back-to-top').fadeIn(duration);
        } else {
            jQuery('.back-to-top').fadeOut(duration);
        }
    });
    
    jQuery('.back-to-top').click(function(event) {
        event.preventDefault();
        jQuery('html, body').animate({scrollTop: 0}, duration);
        return false;
    })
});

$(window).on("hashchange", function () {
    window.scrollTo(window.scrollX, window.scrollY - 200);
});

