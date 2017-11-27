window.gsaea = window.gsaea || {};
window.module = window.module || {};

gsaea.legend = module.exports = (function () {
    'use strict';

    //var d3 = require('d3');
    var d3LegendItems;

    /**
     * @param el String jQuery selector for target SVG element
     * @param dataset Array
     * @param cls String jQuery
     * @param maxHeight Number
     *
     */
    var render = function (cfg) {
        var el = cfg.el,
            dataset = cfg.dataset.slice(0), // we need a modifiable clone to parse cols
            cls = cfg.cls,
            maxHeight = cfg.maxHeight,
            $el = $(el),
            $svg = $el.parents('svg').first(),
            margin = {
                top: 15,
                right: 15,
                bottom: 15,
                left: 15
            },
            boxMargin = {
                top: 0,
                right: 5,
                bottom: 0,
                left: 0
            },
            lineHeight = calcRenderedText(dataset[0].label, cls).height,
            boxSize = lineHeight,
            itemHeight = boxMargin.top + boxSize,
            availableHeight = maxHeight,
            requiredHeight = itemHeight * dataset.length,
            columnsNeeded = Math.ceil(requiredHeight / availableHeight  * 1.5),//updated 11/16 AL test 10 item per column
            maxItemsPerColumn = Math.min(Math.ceil(dataset.length / columnsNeeded),10), //update 11/16
            columnarData = [];

        cls = cls || null;
        // easiest to store rendered, on-screen width so we can retrieve the
        // _.max() further down the pipe
        _.each(dataset, function (item) {
            _.extend(item, {
                width: calcRenderedText(item.display, cls).width
            });
        });

        while (dataset.length > 0) {
            columnarData.push(dataset.splice(0, maxItemsPerColumn));
        }

        var d3ColumnGroups = d3.select(el)
            .selectAll()
            .data(columnarData)
            .enter()
            .append('g')
                .attr('class', 'ea-column-group')
                .attr('transform', function (d, i) {
                    var x = _.max(d, function (d) {
                        return d.width;
                    }).width * i;
                    return 'translate(' + x + ',' + margin.top + ')';
                });

        d3LegendItems = d3ColumnGroups
            .selectAll()
            .data(function (d) {
                return d;
            })
            .enter()
            .append('g')
                .attr('class', function (d) {
                    return cls + ' ' + d.key;
                })
                .attr('transform', function (d, i) {
                    var x = 0,
                        y = i * itemHeight;

                    return 'translate(' + x + ',' + y + ')';
                });

        d3LegendItems.append('rect')
            .attr('width', boxSize)
            .attr('height', boxSize)
            .attr('fill', function (d) {
                return d.color || '#ccc';
            });

        d3LegendItems.append('text')
            .attr('x', boxSize + boxMargin.right)
            .attr('y', lineHeight * 0.8)
            .text(function (d) {
                return d.display;
            });

        $(d3ColumnGroups[0]).each(function (i, el) {
            distributeHeights($(el).children('g'), 0, availableHeight);
        });

        events();
    };

    var events = function () {
        d3LegendItems.on('click', function (d) {
            var match = d3.select('.ea-pie').select('.' + d.key);
            match.trigger('click');

        });
        d3LegendItems.on('mouseover', function (d) {
            var match = d3.select('.ea-pie').select('.' + d.key);
            match.trigger('mouseover');

        });
        d3LegendItems.on('mouseout', function (d) {
            var match = d3.select('.ea-pie').select('.' + d.key);
            match.trigger('mouseout');

        });
    };


    /**
     * @param str String string to test
     * @param [cls] String CSS class name
     *
     * Given a string and optional CSS class name, returns the rendered height
     * in pixels of the text. Expects a single-line string.
     *
     */
    var calcRenderedText = function (str, cls) {
        var svg = document.createElement('svg'),
            text = document.createElement('text'),
            height = 0,
            width = 0;

        text.innerText = str;

        if (cls) {
            text.classList.add(cls);
        }

        // make working/test svg hidden and out of the way
        document.body.appendChild(svg);
        _.extend(svg.style, {
            visibility: 'hidden',
            position: 'absolute',
            bottom: 0,
            left: 0
        });
        svg.appendChild(text);

        height = $(text).height();
        width = $(text).width();

        document.body.removeChild(svg);

        return {
            height: height,
            width: width
        };
    };

    /**
     * @param $children String jQuery selection
     * @param start Number
     * @param end Number
     *
     * Distribute space between a given set of HTML/SVG elements
     * ($collection) between two y-coordinates.
     */
    var distributeHeights = function ($collection, start, end) {
        var maxHeight = Math.abs(end - start),
            collectiveHeight = 0,
            margin;

        $collection.each(function (i, el) {
            collectiveHeight += el.getBBox().height;
        });

        margin = (maxHeight - collectiveHeight) / ($collection.length - 1);

        $collection.each(function (i, el) {
            var y = i * (margin + el.getBBox().height);
            d3.select(el).attr('transform', 'translate(0,'+ y +')');
        });
    };

    return {
        render:render,
        calcRenderedText: calcRenderedText
    };

}());
