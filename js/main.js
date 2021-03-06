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

$(document).ready(function() {
  var mouseX, mouseY;
  var traX, traY;
  $(document).mousemove(function(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
    traX = (4 * mouseX) / 570 + 40;
    traY = (4 * mouseY) / 570 + 50;
    $('.letterDrop').css({ 'background-position': traX + '%' + traY + '%' });
  });

  $.get(
    'https://ew-hackathon-dashboards.herokuapp.com/us',
    (response, status) => {
      if (response.headline) {
        const news =
          'Today ' +
          response.source +
          ' reported ' +
          response.headline +
          '...and as of 430PM we made';
        $('.news').text(news);
        let totalRevDoD = response.total_revenue || 54165;
        let money = '';
        let finalResult = '';
        if (totalRevDoD > 0) {
          // we made money
          money = '$' + totalRevDoD;
          finalResult = 'more';
        } else if (totalRevDoD < 0) {
          // we lost money
          money = '$' + Math.abs(Number(totalRevDoD));
          finalResult = 'less';
        }
        $('.money').text(money);
        $('.money').letterDrop();
        $('.footer').text(
          finalResult +
            " than this time yesterday and on track to make $65k total! I'm not saying theyre related, but we can't rule it out!"
        );
      }
    }
  );
});
