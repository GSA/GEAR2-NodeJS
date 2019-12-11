/**
 * @cfg el String jQuery selector
 */
window.gsaea = window.gsaea || {};
window.module = window.module || {};

gsaea.pie = module.exports = (function () {
    'use strict';

    // dependencies (added manually via script tags)
    var legend = gsaea.legend,
        tooltip = gsaea.tooltip;

    // privates (publics are revealed on the return object)
    var el, $el, dataUrl, dataset, hoverIncrease, height, width, radius,
        arcSpan, innerRadius, tooltipHeight, tooltipWidth, margin, canvas, self,
        svg, pieGroup, legendGroup, pie, arc, biggerArc, pieOffsetX, pieOffsetY,
        tooltipX, tooltipY, currentSelection, $scope, $location;

    var init = function (cfg) {
        el = cfg.el;
        $el = $(el);
        $scope = cfg.$scope;
        $location = cfg.$location;
        dataUrl = cfg.dataUrl || null;
        dataset = cfg.dataset || null;
        hoverIncrease = cfg.hoverIncrease;
        margin = cfg.margin;
        width = cfg.width || 'auto';
        height = cfg.height || 'auto';

        bootstrap();
    };

    /**
     * Based off stored @cfg from init(), calc dimensions
     */
    var bootstrap = function () {
        width = width === 'auto' ? $el.width() : width;
        height = height === 'auto' ? width * 0.6 : height;
        canvas = {
            width: width - margin.left - margin.right,
            height: height - margin.top - margin.bottom
        };
        radius = (Math.min(canvas.width / 2, canvas.height) / 2) * (1 - hoverIncrease);
        arcSpan = radius * 0.4;
        innerRadius = radius - arcSpan;
        pieOffsetX = (radius + margin.left * (1 + hoverIncrease));
        pieOffsetY = (radius + margin.top * (1 + hoverIncrease));
        tooltipHeight = Math.sin(30 * (Math.PI / 180)) * (innerRadius * 2);
        tooltipWidth = Math.sin(60 * (Math.PI / 180)) * (innerRadius * 2);
        tooltipX = pieOffsetX - tooltipWidth / 2;
        tooltipY = pieOffsetY - tooltipHeight / 2;

        arc = d3.svg.arc()
            .innerRadius(innerRadius)
            .outerRadius(radius);
        biggerArc = d3.svg.arc()
            .innerRadius(innerRadius * (1 - hoverIncrease))
            .outerRadius(radius * (1 + hoverIncrease));

        if (dataset !== null) {
            render();
            renderLegend();
        } else if (dataset === null && dataUrl !== null) {
            fetchData()
                .then(transformData)
                .then(render)
                .then(renderLegend);
        } else {
            console.warn('[GSAEA PIE] No dataset or data URL found to process.');
        }
    };

    var render = function () {
        if (!!dataset) {
            $el.empty();
        }
        $el.css('position', 'relative');

        applyColorScale(dataset);

        svg = d3.select(el)
            .append('svg')
                .attr('width', canvas.width + margin.left + margin.right)
                .attr('height', canvas.height + margin.top + margin.bottom);

        svg.append('rect')
            .attr('width', canvas.width + margin.left + margin.right - 1)
            .attr('height', canvas.height + margin.top + margin.bottom - 1)
            .attr('fill', 'rgba(100,100,100,0)')
            .on('click', hideSelection);


        pieGroup = svg.append('g')
            .attr('class', 'ea-pie')
            .attr('transform', 'translate(' +
                pieOffsetX + ',' +
                pieOffsetX + ')');

        legendGroup = svg.append('g')
            .attr('class', 'ea-legend-group')
            .attr('transform', 'translate(' + (canvas.width / 2 + margin.left + margin.right) + ',' + 0 + ')');

        svg.append('line')
            .attr('stroke', '#ececec')
            .attr('shape-rendering', 'crispEdges')
            .attr('y1', 0)
            .attr('y2', canvas.height + margin.top + margin.bottom)
            .attr('x1', canvas.width / 2 + margin.left)
            .attr('x2', canvas.width / 2 + margin.left);

        pie = d3.layout.pie()
            .value(function (d) { return d.count; })
            .sort(null);

        var path = pieGroup.selectAll('path')
            .data(pie(dataset))
            .enter()
            .append('path')
                .attr('d', arc)
                .attr('fill', function (d, i) {
                    return d.data.color;
                })
                .attr('stroke', '#fff')
                .attr('class', function (d) {
                    return d.data.key;
                })
                .on('click', function (d) {
                    openApplicationsReport($location, $scope, d.data.label);
                })
                .on('mouseover', displaySelection);

        enableResize();
    };

    var enableResize = function () {
        $(window).bind('resize', onWindowResize);
    };
	
	var onWindowResize = function () {
		_.debounce(function () {
			width = 'auto';
			bootstrap();
		}, 200);
	}

    var openApplicationsReport = function ($location, $scope, name) {
        $location.path('/applications_BySSO/' + name);
        $scope.$apply();
    };

    var displaySelection = function (d) {
        if (currentSelection) {
            unexpandArc.call(currentSelection.el, currentSelection.d);
            hideTooltip.call(currentSelection.el, currentSelection.d);
        }
        currentSelection = {
            el: this,
            d: d
        };
        expandArc.call(this, d);
        showTooltip.call(this, d);
    };

    var hideSelection = function (d) {
        unexpandArc.call(currentSelection.el, currentSelection.d);
        hideTooltip.call(currentSelection.el, currentSelection.d);
    };

    var renderLegend = function () {
        legend.render({
            el: '.ea-legend-group',
            dataset: dataset,
            cls: 'ea-legend',
            maxHeight: radius * 2,
            innerRadius: innerRadius,
            radius: radius,
            hoverIncrease: hoverIncrease
        });
    };

    var showTooltip = function (d) {
        tooltip.show({
            height: tooltipHeight,
            width: tooltipWidth,
            x: tooltipX,
            y: tooltipY,
            title: d.data.count,
            msg: d.data.display,
            svg: svg[0][0] // <-- need to figure out the array thing
        });
    };

    var hideTooltip = function (d) {
        tooltip.hide();
    };

    var expandArc = function (d) {
        this._current = d;
        d3.select(this).transition()
            .duration(300)
            .attr('d', biggerArc);
    };

    var unexpandArc = function (d) {
        d3.select(this).transition()
            .duration(300)
            .attr('d', arc);
    };

    var applyColorScale = function (coll) {
        var colorScale = d3.scale.category20b();
        _.each(coll, function (obj) {
            _.extend(obj, {
                color: colorScale(obj.key)
            });
        });
    };

    var fetchData = function (u) {
        dataUrl = u || dataUrl;

        var promise = $.ajax({
            method: 'GET',
            url: dataUrl,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        promise.error(function (xhr, e, msg) {
            throw ('[Pie fetchData] ' + msg);
        });

        return promise;
    };

    var transformData = function (d) {
        var active = _.filter(d, function (item) {
            return item.Status !== 'Retired' && item.SSO !== 'External';
        });
        var grouped = _.countBy(active, "SSO");

        var mapped = _.map(grouped, function (val, lab) {
            return {
                key: _.uniqueId('sso_'),
                label: lab,
                display: lab.indexOf('(A)') >= 0 ? 'Administrator (A)' : lab,
                count: val
            };
        });
        dataset = _.sortBy(mapped, 'count').reverse();
    };

    return {
        init: init,
        height: height,
        width: width
    };
}());
