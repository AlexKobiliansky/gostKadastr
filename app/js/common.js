    $(document).ready(function() {






        /**
     * mobile-mnu customization
     */
    var mmenu = $('#mobile-mnu');
    var menuLogo = mmenu.data("logo");
    var $mmenu = mmenu.mmenu({
        navbars: [{
            content: [ "<img src=" + menuLogo + " class=\"img-responsive mm-logo\" alt=\"alt\"/>" ],
            height: 3
        }],
        "pageScroll": true,

        "navbar": {
            "title" : "",
        },
        "extensions": [
            "theme-dark",
            "pagedim-black",
            // "position-front",
            "fx-listitems-slide",
        ],
    }, {
        offCanvas: {
            pageSelector: "#page-container"
        },
    });

    var mmenuBtn = $("#mmenu-btn");
    var API = $mmenu.data("mmenu");

    mmenuBtn.click(function() {
        API.open();
        $(this).addClass('is-active')
    });

    API.bind( "close:start", function() {
        setTimeout(function() {
            mmenuBtn.removeClass( "is-active" );
        }, 300);
    });
    /**
     * end mobile-mnu customization
     */

    $('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }

            // Replace image with new SVG
            $img.replaceWith($svg);
        }, 'xml');
    });

    $('.adv-gal').photoswipe();

    function heightses() {


        if ($(window).width()>=480) {
            $('.header-item-title').height('auto').equalHeights();
            $('.header-item-desc').height('auto').equalHeights();
            $('.first-adv-row').height('auto').equalHeights();
            $('.second-adv-row').height('auto').equalHeights();

        }

        $('.client-logo').height('auto').equalHeights();
    }

    $(window).resize(function() {
        heightses();
    });

    heightses();

        $(window).on('load', function (){
            $(window).resize(function() {
                heightses();
            });

            heightses();
        });


        $('.clients-slider').owlCarousel({
            loop:true,
            margin: 50,
            items: 5,
            nav: true,
            dots: true,
            dotsEach: 1,
            navText: ['',''],
            responsive : {
                0 : {
                    items: 2,
                },
                480 : {
                    items: 3,
                },
                992: {
                    items: 5,
                }
            }
        });


        /**
         * FAQ custom
         */
        $('.faq-item:first-child').find('.faq-item-quest').addClass('opened').siblings('.faq-item-ans').css('display', 'block');

        $('.faq-item-quest').on("click", function(){
            var th = $(this);
            var parent = th.parents('.faq-item');


            th.toggleClass('opened');
            th.siblings('.faq-item-ans').slideToggle();

            parent.siblings('.faq-item').each(function(){
                $(this).find('.faq-item-quest').removeClass('opened');
                $(this).find('.faq-item-ans').slideUp();
            });
        });
        /**
         * end FAQ custom
         */





   $('.main-mnu a').mPageScroll2id();


    $(function() {
        $("a[href='#popup-form']").magnificPopup({
            type: "inline",
            fixedContentPos: !1,
            fixedBgPos: !0,
            overflowY: "auto",
            closeBtnInside: !0,
            preloader: !1,
            midClick: !0,
            removalDelay: 300,
            mainClass: "my-mfp-zoom-in"
        })
    });



        var totalCost = 0;

        $('.check-item').each(function(){
            var th = $(this),
                check = th.find('input[type="checkbox"]'),
                cost = check.data("value");

            check.click(function(){
                th.toggleClass('checked');
                if($(this).prop('checked')) {
                    totalCost = totalCost + cost;
                } else {
                    totalCost = totalCost - cost;
                }
                $('#total-cost .cost span').html(totalCost);
                $('#costval').val(totalCost);
            });
        });


        /**
         * toTop functionality start
         */
        $(window).scroll(function() {
            if($(this).scrollTop() > 1000) {
                $('#toTop1').css('opacity', '.6');
            } else {
                $('#toTop1').css('opacity', '0');
            }
        });

        $('body').bind('touchmove', function (e)
        {
            if($(this).scrollTop() > 1000) {
                $('#toTop1').css('opacity', '.6');
            } else {
                $('#toTop1').css('opacity', '0');
            }
        });

        $('#toTop1').click(function() {
            $('body,html').animate({scrollTop:0},600);
        });
        /**
         * toTop functionality end
         */


    /**
     * PARALLAX
     */
    (function() {
        var Parallax, initMap, throttle;

        window.scrollList = [];

        throttle = function(fn, env, time) {
            if (((time + 30) - Date.now()) < 0) {
                fn.call(env);
                return true;
            } else {
                return false;
            }
        };

        Parallax = (function() {
            function Parallax(node) {
                var top;
                this.node = $(node);
                this.listed = this.node.find(' > *');
                this.coef = [0.1, 0.2, 0.3, 0.4, 0.5];
                top = this.node.offset().top;
                this.top = top + parseInt(this.node.data('totop') ? this.node.data('totop') : 0);
                this.bot = top + this.node.height() + parseInt(this.node.data('tobot') ? this.node.data('tobot') : 0);
                this.reverse = this.node.data('reverse') ? true : false;
                this.horizontal = this.node.data('horizontal') ? true : false;
                this.doc = document.documentElement;
                this.init();
            }

            Parallax.prototype.init = function() {
                if (this.reverse) {
                    if (!this.horizontal) {
                        return window.scrollList.push([this.rscroll, this]);
                    } else {
                        return window.scrollList.push([this.hrscroll, this]);
                    }
                } else {
                    if (!this.horizontal) {
                        return window.scrollList.push([this.scroll, this]);
                    } else {
                        return window.scrollList.push([this.hscroll, this]);
                    }
                }
            };

            Parallax.prototype.scroll = function() {
                var P, rbot, rtop, top, wh;
                P = this;
                top = (window.pageYOffset || this.doc.scrollTop) + (this.doc.clientTop || 0);
                wh = window.innerHeight;
                rtop = this.top - wh;
                rbot = this.bot;
                if (top > rtop && top < rbot) {
                    return this.listed.each(function(index, o) {
                        var mt, obj;
                        obj = $(o);
                        mt = parseInt((P.top - top) * P.coef[index]);
                        return obj.css('margin-top', mt + 'px');
                    });
                }
            };

            Parallax.prototype.rscroll = function() {
                var P, rbot, rtop, top, wh;
                P = this;
                top = (window.pageYOffset || this.doc.scrollTop) + (this.doc.clientTop || 0);
                wh = window.innerHeight;
                rtop = this.top - wh;
                rbot = this.bot;
                if (top > rtop && top < rbot) {
                    return this.listed.each(function(index, o) {
                        var mt, obj;
                        obj = $(o);
                        mt = parseInt((top - P.top) * P.coef[index]);
                        return obj.css('margin-top', mt + 'px');
                    });
                }
            };

            Parallax.prototype.hscroll = function() {
                var P, mt, rbot, rtop, top, wh;
                P = this;
                top = (window.pageYOffset || this.doc.scrollTop) + (this.doc.clientTop || 0);
                wh = window.innerHeight;
                rtop = this.top - wh;
                rbot = this.bot;
                if (top > rtop && top < rbot) {
                    mt = parseInt((this.top - top) * this.coef[2]);
                    return this.node.css('background-position', mt + 'px top');
                }
            };

            Parallax.prototype.hrscroll = function() {
                var P, mt, rbot, rtop, top, wh;
                P = this;
                top = (window.pageYOffset || this.doc.scrollTop) + (this.doc.clientTop || 0);
                wh = window.innerHeight;
                rtop = this.top - wh;
                rbot = this.bot;
                if (top > rtop && top < rbot) {
                    mt = parseInt((top - this.top) * this.coef[2]);
                    return this.node.css('background-position', mt + 'px top');
                }
            };

            return Parallax;
        })();

        $('document').ready(function() {
            var parallaxTime;
            $('[data-node="parallax"]').each(function(index, node) {
                new Parallax(node);
                return true;
            });
            parallaxTime = Date.now();
            $(document).on('scroll', function() {
                var fnwe, j, len, ref, reset;
                reset = false;
                ref = window.scrollList;
                for (j = 0, len = ref.length; j < len; j++) {
                    fnwe = ref[j];
                    if (throttle(fnwe[0], fnwe[1], parallaxTime)) {
                        reset = true;
                    }
                }
                if (reset) {
                    return parallaxTime = Date.now();
                }
            });
            setTimeout(function() {
                return $(document).trigger('scroll');
            }, 100);
        });

    }).call(this);
    /**
     * end PARALLAX
     */


        /**
         * FORMS
         */
        var uPhone = $('.user-phone');
        uPhone.mask("+7 (999) 999-99-99",{autoclear: false});

        uPhone.on('click', function (ele) {
            var needelem = ele.target || event.srcElement;
            needelem.setSelectionRange(4,4);
            needelem.focus();
        });

        $.validate({
            form : '.contact-form',
            scrollToTopOnError: false
        });

        //E-mail Ajax Send
        $("form").submit(function() { //Change
            var th = $(this);
            var t = th.find(".btn").text();
            th.find(".btn").prop("disabled", "disabled").addClass("disabled").text("Отправлено!");

            $.ajax({
                type: "POST",
                url: "mail.php", //Change
                data: th.serialize()
            }).done(function() {
                setTimeout(function() {
                    th.find(".btn").removeAttr('disabled').removeClass("disabled").text(t);
                    th.trigger("reset");
                    $.magnificPopup.close();
                }, 2000);
            });
            return false;
        });
        /**
         * FORMS end
         */

        $('.preloader').fadeOut(0);


});


