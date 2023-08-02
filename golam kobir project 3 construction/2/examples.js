/* Examples */
(function($) {
 
  $('.first.circle').circleProgress({
    value: 0.35,
    animation: false,
    fill: {gradient: ['#ff1e41']}
  });

 
  $('.second.circle').circleProgress({
    value: .90
  }).on('circle-animation-progress', function(event, progress) {
    $(this).find('strong').html(Math.round(80 * progress) + '<i>%</i>');
  });

 


 
 

})(jQuery);
