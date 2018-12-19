(function($) {
  $.fn.letterDrop = function() {
    // Chainability
    return this.each(function() {
      var obj = $(this);

      var drop = {
        arr: obj.text().split(''),

        range: {
          min: 1,
          max: 9
        },

        styles: function() {
          var dropDelays = '\n',
            addCSS;

          for (i = this.range.min; i <= this.range.max; i++) {
            dropDelays += '.ld' + i + ' { animation-delay: 1.' + i + 's; }\n';
          }

          addCSS = $('<style>' + dropDelays + '</style>');
          $('head').append(addCSS);
        },

        main: function() {
          var dp = 0;
          obj.text('');

          $.each(this.arr, function(index, value) {
            dp = dp.randomInt(drop.range.min, drop.range.max);

            if (value === ' ') value = '&nbsp'; //Add spaces

            obj.append(
              '<span class="letterDrop ld' + dp + '">' + value + '</span>'
            );
          });
        }
      };

      Number.prototype.randomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      };

      // Create styles
      drop.styles();

      // Initialise
      drop.main();
    });
  };
})(jQuery);

// USAGE
$('h1').letterDrop();

$(document).ready(function() {
  var mouseX, mouseY;
  var traX, traY;
  $(document).mousemove(function(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
    traX = (4 * mouseX) / 570 + 40;
    traY = (4 * mouseY) / 570 + 50;
    console.log(traX);
    $('.letterDrop').css({ 'background-position': traX + '%' + traY + '%' });
  });

  $.get('http://localhost:3000/us', (response, status) => {
    debugger;
    if (response.data && response.data.length > 0) {
      debugger;
      response.data.sort((a, b) => {
        return new Date(b.create_date) - new Date(a.create_date);
      });
      createCharts(response.data[0]);
    }
  });
});
