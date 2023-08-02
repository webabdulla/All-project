/* Examples */
(function($) {
 
  $('.first.circle').circleProgress({
    value: 0.35,
    animation: false,
    fill: {gradient: ['#ff1e41', '#ff5f43']}
  });

 
  $('.second.circle').circleProgress({
    value: 0.6
  }).on('circle-animation-progress', function(event, progress) {
    $(this).find('strong').html(Math.round(90 * progress) + '<i>%</i>');
  });

 
  $('.third.circle').circleProgress({
    value: 0.75,
    fill: {gradient: [['#0681c4', .5], ['#4ac5f8', .5]], gradientAngle: Math.PI / 4}
  }).on('circle-animation-progress', function(event, progress, stepValue) {
    $(this).find('strong').text(stepValue.toFixed(2).substr(1));
  });

 
  var c4 = $('.forth.circle');

  c4.circleProgress({
    startAngle: -Math.PI / 4 * 3,
    value: 0.5,
    lineCap: 'round',
    fill: {color: '#ffa500'}
  });

})(jQuery);
