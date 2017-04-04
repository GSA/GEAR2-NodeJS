window.ea = window.ea || {};

ea.videoPlayer = (function (_) {
    var metadata = [
        {
            id: 1,
            name: 'What is GEAR?',
            src: '/media/What%20is%20GEAR.mp4',
            poster: '/media/What%20is%20GEAR.png',
            vtt: '/media/What%20is%20GEAR.txt',
            duration: '1:46',
            desc: ''
        },
        {
            id: 2,
            name: 'Navigating the GEAR Homepage',
            src: '/media/Navigating%20the%20GEAR%20Homepage.mp4',
            poster: '/media/Navigating%20the%20GEAR%20Homepage.png',
            vtt: '/media/Navigating%20the%20GEAR%20Homepage.txt',
            duration: '2:02',
            desc: ''
        },
		{
            id: 3,
            name: 'Organization Chart',
            src: '/media/Demo%20Video%203%20Organization%20Chart%20Final.mp4',
            poster: '/media/Demo%20Video%203%20Organization%20Chart%20Final.png',
            vtt: '/media/Demo%20Video%203%20Organization%20Chart%20Final.txt',
            duration: '1:38',
            desc: ''
        },
    ];

    // Some templates are static HTML. It made sense to keep all the video
    // elements together for the sake of maintainability.
    var $navSubsectionCntr = $('' +
        '<li>' +
            '<a href="#"><i class="fa fa-video-camera"></i> Quick Video Tutorials<span class="fa arrow"></span></a>' +
            '<ul id="side-submenu-vids" class="nav nav-second-level">' +
                '<li class="eavp-side-submenu-item">' +
                '</li>' +
            '</ul>' +
        '</li>');
    var popoutBtnTpl = _.template('' +
        '<a href="#"' +
            'class="eavp-popout<% if (ctx==="inline-player") { %> fa fa-expand<% } %>"' +
            'data-video-id="<%= id %>" data-video-context="<%= ctx %>">' +
            '<% if (ctx === "side-submenu-vids") { %><%= name %><% } %>' +
        '</a>');
    var playerTpl = _.template('' +
        '<video id="ea-video-<%= id %>" data-video-name="<%= name %>" class="video-js" ' +
            'controls="controls" preload="false" ' +
            '<% if (ctx === "side-submenu-vids") { %>autoplay <% } %>' +
            'poster="<%= poster %>" data-setup="{}" width="480" height="360">' +
            '<source src="<%= src %>" type="video/mp4" />' +
            '<% if (typeof vtt !== "undefined") { %>' +
            '<track kind="captions" src="<%= vtt %>" srclang="en" ' +
                'label="English" default="default" />' +
            '<% } %>' +
        '</video>');
    var modalTpl = _.template('' +
        '<div id="eavp-modal-<%= id %>" class="eavp-modal modal fade" tabindex="-1" role="dialog">' +
            '<div class="modal-dialog" role="document">' +
                '<div class="modal-content">' +
                    '<div class="modal-header">' +
                        '<button type="button" class="close" data-dismiss="modal" ' +
                            'aria-label="Close">' +
                            '<span aria-hidden="true">&times;</span></button>' +
                        '<h4 class="modal-title"><%= name %></h4>' +
                    '</div>' +
                    '<div class="modal-body">' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>');
    var playlistItemTpl = _.template('' +
        '<li class="eavp-playlist-item">' +
            '<a href="#" class="eavp-playlist-link tablefix" data-video-id="<%= id %>">' +
                '<span class="fa fa-gear eavp-playlist-illo" ' +
                'style="background-image:url(<%= poster %>);"></span>' +
                '<span class="eavp-playlist-title"><%= name %></span>' +
                '<span class="eavp-playlist-time">Duration <b><%= duration %></b></span>' +
                '<span class="eavp-playlist-desc"><%= desc %></span>' +
            '</a>' +
        '</li>');
    var carouselItemTpl = _.template('<div class="eavp-owl-item"></div>');
    var overlayTpl = _.template('<div class="eavp-olay"><h4><%= name %></h4></div>');

    var popout = function (event) {
        var context = $(event.currentTarget).data('video-context'),
            videoId = $(event.currentTarget).data('video-id'),
            $modal, currentVideoMetadata, $vjsCntr, vjsPlayer;

        event.preventDefault();
        event.stopPropagation();

        switch (context) {
            case 'side-submenu-vids':
                // if About > Tutorials tab, delegate these clicks to inline-player
                if (!!$('#inline-player') &&
                    $('#tutorials-tab').parent('li').hasClass('active')) {

                    $('#inline-player')
                        .find('.eavp-playlist-link[data-video-id="' + videoId + '"]').click();
                    $('#inline-player')
                        .find('#ea-video-' + videoId).siblings('.eavp-popout').click();

                    return;
                }
                $vjsCntr = $('#eavp-modal-' + videoId).find('#ea-video-' + videoId);
                break;
            case 'inline-player':
                $vjsCntr = $('#' + context).find('.eavp-owl-item').find('#ea-video-' + videoId);
                break;
            default:
        }

        $modal = $('#eavp-modal-' + videoId);
        currentVideoMetadata = _.findWhere(metadata, {id: videoId});

        if (!$modal.length) {
            $modal = $(modalTpl(currentVideoMetadata));
            $(document.body).append($modal);
        }

        $modal.find('.modal-body').empty();

        if (!$vjsCntr.length) {
            $vjsCntr = $(playerTpl(currentVideoMetadata));
        }
        $modal.find('.modal-body').append($vjsCntr);

        if (context ==='side-submenu-vids' &&
            !$(document.body).hasClass('ea-video-' + currentVideoMetadata.id + '-ready')) {
            vjsPlayer = videojs('ea-video-' + currentVideoMetadata.id);
            watchPlayerEvents(vjsPlayer);
        } else {
            vjsPlayer = $vjsCntr.find('video')[0];
        }

        $modal.modal();
        $modal.on('hide.bs.modal', function (event) {
            switch ($(this).data('video-context')) {
                case 'side-submenu-vids':
                    vjsPlayer.pause();
                    break;
                case 'inline-player':
                    $('.owl-item.active').find('.eavp-owl-item').prepend($vjsCntr);
                    break;
            }
        }.bind(this));
    };

    var advPlayer = function () {
        var $owl = $('#owl'),
            $playlist = $('#eavp-playlist');

        _.each(metadata, function (item, i) {
            var $owlItem = $(carouselItemTpl(item)),
                $overlay = $(overlayTpl(item)),
                $popoutBtn = $(popoutBtnTpl(_.extend(item, {ctx: 'inline-player'}))),
                $playlistItem = $(playlistItemTpl(item)),
                $vjsCntr = $('#eavp-modal-' + item.id).find('.video-js'),
                vjsPlayer;

            $playlistItem.find('.eavp-playlist-link').attr('data-video-index', i);

            if (i===0) {
                $playlistItem.find('.eavp-playlist-link').addClass('is-active');
            }

            if (!$vjsCntr.length) {
                $vjsCntr = $(playerTpl(item));
            }

            $owlItem.append($vjsCntr);
            // TOO MANY append()s! Should try .html() for optimal performance.
            $owlItem.append($overlay);
            $owlItem.append($popoutBtn);
            $owl.append($owlItem);
            $playlist.append($playlistItem);

            if (!$(document.body).hasClass('ea-video-' + item.id + '-ready')) {
                vjsPlayer = videojs($vjsCntr.attr('id'));
                watchPlayerEvents(vjsPlayer);
            }

        });

        $('.owl-carousel').owlCarousel({
            items:1,
            loop: false,
            nav:true,
            mouseDrag: false,
            touchDrag: false
        });

        $('.eavp-popout').click(popout);
        $('.eavp-playlist-link').click(function (event) {
            event.stopPropagation();
            event.preventDefault();

            $('.owl-dot').get($(event.currentTarget).data('video-index')).click();

            var activeDot = $('.owl-dot.active').index();

            $('.eavp-playlist-item')
                .find('a')
                .removeClass('is-active');

            $('.eavp-playlist-item')
                .eq(activeDot)
                .find('a')
                .addClass('is-active');

        });
    };

    var watchPlayerEvents = function (player) {
        player
            .on('ready', function (e) {
                $('body').addClass(e.target.id + '-ready');
            })
            .on('firstplay', function (e) {
                var stateClass = e.target.id + '-firstplay',
                    gaEvent = 'play',
                    gaVideoAction = $(e.target).data('video-name') + '-start',
                    gaContext = 'Videos-pop';

                if (!!$(e.target).parents('#inline-player').length) {
                    gaContext = 'Videos-FAQ';
                }

                if (!$('body').hasClass(stateClass)) {
                    if (typeof ga !== 'undefined') {
                        ga('send', 'event', gaContext, gaEvent, gaVideoAction);
                    } else {
                        console.log('SIMULATE GA EVENT:');
                        console.log("ga('send', 'event', '%s', '%s', '%s')",
                            gaContext, gaEvent, gaVideoAction);
                    }
                    $('body').addClass(stateClass);
                }
            })
            .on('play', function (e) {
                $('body').removeClass(e.target.id + '-ended');
            })
            .on('ended', function (e) {
                console.log('ENDED!', e);
                var stateClass = e.target.id + '-ended',
                    gaEvent = 'finish',
                    gaVideoAction = $(e.target).data('video-name') + '-end',
                    gaContext = 'Videos-pop';

                if (!!$(e.target).parents('#inline-player').length) {
                    gaContext = 'Videos-FAQ';
                }

                if (!$('body').hasClass(stateClass)) {

                    if (typeof ga !== 'undefined') {
                        ga('send', 'event', gaContext, gaEvent, gaVideoAction);
                    } else {
                        console.log('SIMULATE GA EVENT:');
                        console.log("ga('send', 'event', '%s', '%s', '%s')",
                            gaContext, gaEvent, gaVideoAction);
                    }
                    $('body').addClass(stateClass);
                }
            });
    };

    // SELF-INITIALIZING LEFT NAV
    // ...since it's a global component, it should be fine
    var init = (function (d) {
        $('#side-menu').append($navSubsectionCntr);

        _.each(d, function (item, i) {
            var $link = $(popoutBtnTpl(_.extend(item, {ctx: 'side-submenu-vids'})));
            $link.click(popout);
            $('#side-submenu-vids')
                .find('.eavp-side-submenu-item').append($link);
        });
    }(metadata));

    return {
        popout: popout,
        advPlayer: advPlayer
    };
}(_));
