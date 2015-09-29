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


// chart
google.load('visualization', '1');   // Don't need to specify chart libraries!
      google.setOnLoadCallback(drawVisualization);

      function drawVisualization() {
        var wrapper = new google.visualization.ChartWrapper({
          chartType: 'ColumnChart',
          dataTable: [['', 'Germany', 'USA', 'Brazil', 'Canada', 'France', 'RU'],
                      ['', 700, 300, 400, 500, 600, 800]],
          options: {'title': 'Countries'},
          containerId: 'vis_div'
        });
        wrapper.draw();
      }