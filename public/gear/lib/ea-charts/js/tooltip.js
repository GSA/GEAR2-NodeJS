window.gsaea = window.gsaea || {};
window.module = window.module || {};

gsaea.tooltip = module.exports = (function () {
    'use strict';

    var tooltip, height, width, x, y, svg, title, msg;

    var show = function (cfg) {
        height = cfg.height;
        width = cfg.width;
        x = cfg.x;
        y = cfg.y;
        svg = cfg.svg;
        title = cfg.title;
        msg = cfg.msg;

        if (tooltip) {
            tooltip.remove();
        }

        tooltip = d3.select(svg.parentNode)
            .append('div')
            .attr('class', 'chart-tooltip')
            .style({
                'height': height + 'px',
                'width': width + 'px',
                'display': 'block',
                'position': 'absolute',
                'top': 0,
                'left': 0,
                'transform': 'translate(' + x + 'px,' + y + 'px)',
                'font-size': (height * 0.6) + 'px'
            });

        tooltip.append('div')
            .attr('class', 'count')
            .html(title);

        var label = tooltip.append('div')
            .attr('class', 'label')
            .html(msg);

        if ($(label[0][0]).width() > width) {
            label.style({
                'font-size': '0.35em'
            });
        }
    };

    var hide = function () {
        tooltip.remove();
    };

    return {
        show: show,
        hide: hide
    };

}());
