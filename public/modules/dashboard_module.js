/* eslint-disable */

// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'dashboard' module
var dashboard = angular.module('dashboard', [
  'apps.graveyard',
  'known-issues',
  'release-notes',
  'manager-page',
  'interfacesv2'
]);


dashboard.run(['$route', '$rootScope', '$location',
function ($route, $rootScope, $location) {
  // @param pushState {Boolean} pass `true` to push (vs replace) state to history
  $location.saveState = function (path, pushState) {

    if ($location.path() == path) {
      return;
    }

    var routeToKeep = $route.current;
    var onLocationChangeSuccess = $rootScope.$on('$locationChangeSuccess', function () {
      if (routeToKeep) {
        $route.current = routeToKeep;
        routeToKeep = null;
      }
      // alt to the "off...on" pattern
      onLocationChangeSuccess();
      onLocationChangeSuccess = null;
    });

    $location.path(path);

    if (!pushState) {
      $location.replace();
    }
  };
}]);

dashboard.factory('WcfConfig', function () {
  var local = {
    urlRoot: 'http://gear.local/api/'
  }
  var dev = {
    urlRoot: 'api/'
  }
  var stage = {
    urlRoot: 'api/'
  }
  var prod = {
    urlRoot: 'EAOpen/'
  }

  var path = prod;

  switch (window.location.hostname.split('.')[0]) {
    case "lvh":
    case "192":
    case "localhost":
    path = local;
    break;
    case "dev":
    case "dev1":
    case "dev2":
    case "dev3":
    case "dev4":
    case "dev5":
    path = dev;
    break;
    case "stage":
    path = stage;
    break;
    default:
    path = prod;
  }
  return path;
});

dashboard.factory('Utils', function () {
  return {
    /**
    * @param el SVGTextElement
    * element to be wrapped
    * @param mw Number
    * max width in pixels to wrap at
    * @param [ctx] String
    * either 'HTML'|'SVG' so we know what kind of span/tspan to render
    *
    * Simple word wrapping.
    * Takes in an SVG text element and a max width in pixels and returns a
    * group of tspan elements, none of which are longer than the max width.
    *
    * Takes a 'procrastinating' approach. Pop words off current line until it fits
    * while unshifting everying into the next line, which we are unconcerned with
    * until the next cycle.
    *
    * USAGE EXAMPLE:
    *
    *  $('.my-d3-bar .tick > text').each(function (i, el) {
    *      Utils.wrapSVGText(el, xScale.rangeBand(), 'SVG');
    *  });
    */

    wrapSVGText: function (el, mw, ctx) {
      var $el = $(el),
      maxWidth = mw,
      context = ctx || 'SVG',
      bbox = el.getBBox(),
      i = 0,
      lines = [$el.text()], // stores as lines in a pgraf; init w $el text
      $ogEl = $el.clone();

      // Split strings to arrays at ' ', collected in a working array, lines. Use
      // Array.pop() to reduce the words until it can be joined into a string
      // that fits into the defined max width. Repeat for each new string/array
      // created.

      // @var lines[i] = original
      // @var lines[i+1] = new/next: stores overflow.

      var sentry = 0;
      while ($el.width() > maxWidth) {
        if (sentry === 30) {
          var msg = 'SVG word wrapping is taking too long for: \n\t' +
          'el: ' + el.id + '\n\t' +
          'text: ' + $el.text();
          // if it fails, just write out the string as is
          $el
          .attr('dy', $ogEl.attr('dy'))
          .text(lines.join(' '));

          throw(msg);
        }
        // since we want to word-wrap on spaces, let's split on that
        lines[i] = lines[i].split(' ');
        // Start Reducing current line until it fits.
        var w = lines[i].pop();
        // (make sure there's space declared at [i+1])
        if (!lines[i+1]) {
          lines[i+1] = [];
        } else {
          lines[i+1] = lines[i+1].split(' ');
        }
        // Store *entire* remainder in the next spot in the array. The
        // remainder will be inspected on the next cycle, if need be.
        lines[i+1].unshift(w);

        // rejoin words *from this point further*; hence var j=i
        for (var j = i; j < lines.length; j += 1) {
          lines[j] = lines[j].join(' ');
        }

        // Now, let's render current line, lines[i] so we can test its width
        var $tmpEl = $('<p />');
        $tmpEl.css({
          'font-family': $el.css('font-family'),
          'font-size': $el.css('font-size'),
          'font-style': $el.css('font-style'),
          'font-weight': $el.css('font-weight')
        });
        $tmpEl.attr('id', 'tmp-' + Math.floor(Math.random() * 1000));
        $tmpEl.addClass('ea-discardable');
        $tmpEl.css('display', 'inline-block');
        $tmpEl.text(lines[i]);
        $(document.body).append($tmpEl[0]);

        // clear $el & we'll replace its content with substrs wrapped in <tspan>s
        $el.empty();

        // Init new <tspan> from a string since it's SVG. Typical HTML element
        // methods seem to behave unexpectedly.
        var htmlString = '';

        // rebuild markup from full lines[] array
        for (var k = 0; k < lines.length; k += 1) {
          var dy = '1.2em',
          x = el.getAttribute('x');

          // adjust dy coord to take over parent el's y-position
          if (k===0) {
            dy = $ogEl.attr('dy');
          }

          htmlString += '<tspan x="'+x+'" dy="'+dy+'">';
          htmlString += lines[k];
          htmlString += '</tspan>';
        }

        $el.html(htmlString);
        $el.attr({
          dy: 0
        });

        // if $tmpEl width is good, increment i so we can move onto the next
        // one, lines[i+1]
        if ($tmpEl.width() <= maxWidth) {
          i = i+1;
        }
        sentry += 1;
      }
      $('.ea-discardable').remove();
      return this;
    }
  };
});
