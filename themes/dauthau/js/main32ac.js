/* *
 * @Project NUKEVIET 4.x
 * @Author VINADES.,JSC <contact@vinades.vn>
 * @Copyright (C) 2014 VINADES.,JSC. All rights reserved
 * @License GNU/GPL version 2 or any later version
 * @Createdate 31/05/2010, 00:36
 */
// NukeViet Default Custom JS
var myTimerPage = "",
    myTimersecField = "",
    tip_active = !1,
    ftip_active = !1,
    tip_autoclose = !0,
    ftip_autoclose = !0,
    screen_sm = !1,
    screen_sm_checked = !1,
    screen_dekstop_checked = !1,
    winX = 0,
    winY = 0,
    oldWinX = 0,
    oldWinY = 0,
    cRangeX = 0,
    cRangeY = 0,
    docX = 0,
    docY = 0,
    brcb = $('.breadcrumbs-wrap'),
    reCapIDs = [],
    menuSite = $('#menusite'),
    menuSiteButton = $("#menuSiteButton"),
    news_other = null,
    ps = null;

function ScaleSize() {
    oldWinX = winX;
    oldWinY = winY;
    winX = $(window).width();
    winY = $(window).height();
    docX = $(document).width();
    docY = $(document).height();
    cRangeX = Math.abs(winX - oldWinX);
    cRangeY = Math.abs(winY - oldWinY);
}

function winResize() {
    ScaleSize();
    if (!winX || !winY || !docX || !docY) {
        setTimeout(ScaleSize, 30);
    }
    checkMenu();
}

function fix_banner_center() {
    var a = Math.round((winX - 1330) / 2);
    0 <= a ? ($("div.fix_banner_left").css("left", a + "px"), $("div.fix_banner_right").css("right", a + "px"), a = Math.round((winY - $("div.fix_banner_left").height()) / 2), 0 >= a && (a = 0), $("div.fix_banner_left").css("top", a + "px"), a = Math.round((winY - $("div.fix_banner_right").height()) / 2), 0 >= a && (a = 0), $("div.fix_banner_right").css("top", a + "px"), $("div.fix_banner_left").show(), $("div.fix_banner_right").show()) : ($("div.fix_banner_left").hide(), $("div.fix_banner_right").hide())
}

function timeoutsesscancel() {
    $("#timeoutsess").slideUp("slow", function() {
        clearInterval(myTimersecField);
        myTimerPage = setTimeout(function() {
            timeoutsessrun()
        }, nv_check_pass_mstime)
    })
}

function timeoutsessrun() {
    clearInterval(myTimerPage);
    $("#secField").text("60");
    jQuery("#timeoutsess").show();
    var b = (new Date).getTime();
    myTimersecField = setInterval(function() {
        var a = (new Date).getTime();
        a = 60 - Math.round((a - b) / 1E3);
        0 <= a ? $("#secField").text(a) : -3 > a && (clearInterval(myTimersecField), $(window).unbind(), $.ajax({
            type: "POST",
            cache: !1,
            url: nv_base_siteurl + "index.php?" + nv_lang_variable + "=" + nv_lang_data + "&" + nv_name_variable + "=users&" + nv_fc_variable + "=logout",
            data: "nv_ajax_login=1&system=1"
        }).done(function(a) {
            location.reload()
        }));
    }, 1E3)
}

function locationReplace(url) {
    if (history.pushState) {
        history.pushState(null, null, url);
    }
}

function delete_confirm(ob) {
    bootbox.confirm(nv_is_del_confirm[0], function(result){
      if (result) {
        window.location.href = $(ob).attr("href")
      }
  });
  return!1;
}

function click_show_sitemenu(event) {
    event.preventDefault();
    event.stopPropagation();
    $(this).parent().siblings().removeClass('open');
    $(this).parent().toggleClass('open');
}

function set_dropdown_event() {
    if ($("body").is('.touch')) {
        $(".dropdown", menuSite).unbind('mouseenter mouseleave');
        $(".dropdown-toggle", menuSite).attr('data-toggle', 'dropdown');
        $(".parent-menu", menuSite).show();
        $('[data-toggle=dropdown]', menuSite).bind('click', click_show_sitemenu);
    } else {
        $('[data-toggle=dropdown]', menuSite).unbind('click', click_show_sitemenu);
        $("[data-toggle=dropdown]", menuSite).attr('data-toggle', '');
        $(".parent-menu", menuSite).hide();
        $(".dropdown", menuSite).hover(function() {
            $(this).addClass("open")
        }, function() {
            $(this).removeClass("open")
        });
    }
}

function checkMenu() {
    if (!theme_responsive) {
        $(".dropdown-submenu .caret", menuSite).addClass("caret-right");
    } else {
        if (menuSiteButton.is(":visible")) {
            screen_sm = !0;
            screen_dekstop_checked = !1;
            if (!screen_sm_checked) {
                $(".dropdown-submenu .caret", menuSite).removeClass("caret-right");
                screen_sm_checked = !0;
            }
            $(".navbar-nav", menuSite).on('swipeleft', function(e) {
                $('.navbar-collapse', menuSite).collapse('hide')
            });
            $(".touch-content").on('swiperight', function(e) {
                if ($(".navbar-collapse", menuSite).hasClass('in')) {} else {
                    $('.navbar-collapse', menuSite).collapse('show')
                }
            });
        } else {
            $('.navbar-collapse', menuSite).collapse('hide')
            screen_sm = !1;
            screen_sm_checked = !1;
            if (!screen_dekstop_checked) {
                $(".dropdown-submenu .caret", menuSite).addClass("caret-right");
                screen_dekstop_checked = !0;
            }
            if ($(".navbar-nav").width() > $("body").width() + 10) {
                $(".navbar-collapse", menuSite).css({
                    width: $("body").width()
                }).addClass("scroll-menu")
            }
        }
    }
}

function checkWidthMenu() {
    $('ul.dropdown-menu [data-toggle=dropdown]').on('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        $(this).parent().siblings().removeClass('open');
        $(this).parent().toggleClass('open');
    });
}

function checkAll(a) {
    $(".checkAll", a).is(":checked") ? $(".checkSingle", a).each(function() {
        $(this).prop("checked", !0)
    }) : $(".checkSingle", a).each(function() {
        $(this).prop("checked", !1)
    });
    return !1
}

function checkSingle(a) {
    var b = 0,
        c = 0;
    $(".checkSingle", a).each(function() {
        $(this).is(":checked") ? b++ : c++
    });
    0 != b && 0 == c ? $(".checkAll", a).prop("checked", !0) : $(".checkAll", a).prop("checked", !1);
    return !1
}

function tipHide() {
    $("[data-toggle=tip]").attr("data-click", "y").removeClass("active");
    $("#tip").hide();
    tip_active = !1;
    tipAutoClose(!0)
}

function ftipHide() {
    $("[data-toggle=ftip]").attr("data-click", "y").removeClass("active");
    $("#ftip").hide();
    ftip_active = !1;
    ftipAutoClose(!0)
}

function tipAutoClose(a) {
    !0 != a && (a = !1);
    tip_autoclose = a
}

function ftipAutoClose(a) {
    !0 != a && (a = !1);
    ftip_autoclose = a
}

function tipShow(a, b, callback) {
    if ($(a).is(".pa")) {
        switchTab(".guest-sign", a);
    }
    tip_active && tipHide();
    ftip_active && ftipHide();
    $("[data-toggle=tip]").removeClass("active");
    $(a).attr("data-click", "n").addClass("active");
    if (typeof callback != "undefined") {
        $("#tip").attr("data-content", b).show("fast", function() {
            if (callback == "recaptchareset" && typeof nv_is_recaptcha != "undefined" && nv_is_recaptcha) {
                $('[data-toggle="recaptcha"]', $(this)).each(function() {
                    var parent = $(this).parent();
                    var oldID = $(this).attr('id');
                    var id = "recaptcha" + (new Date().getTime()) + nv_randomPassword(8);
                    var ele;
                    var btn = false,
                        pnum = 0,
                        btnselector = '';
                    $(this).remove();
                    parent.append('<div id="' + id + '" data-toggle="recaptcha"></div>');
                    for (i = 0, j = nv_recaptcha_elements.length; i < j; i++) {
                        ele = nv_recaptcha_elements[i];
                        if (typeof ele.pnum != "undefined" && typeof ele.btnselector != "undefined" && ele.pnum && ele.btnselector != "" && ele.id == oldID) {
                            pnum = ele.pnum;
                            btnselector = ele.btnselector;
                            btn = $('#' + id);
                            for (k = 1; k <= ele.pnum; k++) {
                                btn = btn.parent();
                            }
                            btn = $(ele.btnselector, btn);
                            break;
                        }
                    }
                    var newEle = {};
                    newEle.id = id;
                    if (ele && ele.size) {
                        newEle.size = ele.size;
                    }
                    if (btn != false) {
                        newEle.btn = btn;
                        newEle.pnum = pnum;
                        newEle.btnselector = btnselector;
                    }
                    nv_recaptcha_elements.push(newEle);
                });
                reCaptchaLoadCallback();
            }
        });
    } else {
        $("#tip").attr("data-content", b).show("fast");
    }
    tip_active = 1;
}

function ftipShow(a, b, callback) {
    if ($(a).is(".qrcode") && "no" == $(a).attr("data-load")) {
        return qrcodeLoad(a), !1;
    }
    tip_active && tipHide();
    ftip_active && ftipHide();
    $("[data-toggle=ftip]").removeClass("active");
    $(a).attr("data-click", "n").addClass("active");
    if (typeof callback != "undefined") {
        $("#ftip").attr("data-content", b).show("fast", function() {
            if (callback == "recaptchareset" && typeof nv_is_recaptcha != "undefined" && nv_is_recaptcha) {
                $('[data-toggle="recaptcha"]', $(this)).each(function() {
                    var parent = $(this).parent();
                    var oldID = $(this).attr('id');
                    var id = "recaptcha" + (new Date().getTime()) + nv_randomPassword(8);
                    var ele;
                    var btn = false,
                        pnum = 0,
                        btnselector = '';
                    $(this).remove();
                    parent.append('<div id="' + id + '" data-toggle="recaptcha"></div>');
                    for (i = 0, j = nv_recaptcha_elements.length; i < j; i++) {
                        ele = nv_recaptcha_elements[i];
                        if (typeof ele.pnum != "undefined" && typeof ele.btnselector != "undefined" && ele.pnum && ele.btnselector != "" && ele.id == oldID) {
                            pnum = ele.pnum;
                            btnselector = ele.btnselector;
                            btn = $('#' + id);
                            for (k = 1; k <= ele.pnum; k++) {
                                btn = btn.parent();
                            }
                            btn = $(ele.btnselector, btn);
                            break;
                        }
                    }
                    var newEle = {};
                    newEle.id = id;
                    if (ele && ele.size) {
                        newEle.size = ele.size;
                    }
                    if (btn != false) {
                        newEle.btn = btn;
                        newEle.pnum = pnum;
                        newEle.btnselector = btnselector;
                    }
                    nv_recaptcha_elements.push(newEle);
                });
                reCaptchaLoadCallback();
            }
        });
    } else {
        $("#ftip").attr("data-content", b).show("fast");
    }
    ftip_active = 1;
};

function openID_load(a) {
    var s = $(this).attr("src");
    nv_open_browse(a, "NVOPID", 550, 500, "resizable=no,scrollbars=1,toolbar=no,location=no,titlebar=no,menubar=0,location=no,status=no");
    return !1;
}

function openID_result() {
    $("#openidResult").fadeIn();
    setTimeout(function() {
        "" != $("#openidResult").attr("data-redirect") ? window.location.href = $("#openidResult").attr("data-redirect") : "success" == $("#openidResult").attr("data-result") ? window.location.href = window.location.href : $("#openidResult").hide(0).text("").attr("data-result", "").attr("data-redirect", "")
    }, 5E3);
    return !1
}
// QR-code

function qrcodeLoad(a) {
    var b = new Image,
        c = $(a).data("img");
    $(b).on('load', function() {
        $(c).attr("src", b.src);
        $(a).attr("data-load", "yes").click()
    });
    b.src = nv_base_siteurl + "index.php?second=qr&u=" + encodeURIComponent($(a).data("url")) + "&l=" + $(a).data("level") + "&ppp=" + $(a).data("ppp") + "&of=" + $(a).data("of")
};
// Switch tab

function switchTab(a) {
    if ($(a).is(".current")) {
        return !1;
    }
    var b = $(a).data("switch").split(/\s*,\s*/),
        c = $(a).data("obj");
    $(c + " [data-switch]").removeClass("current");
    $(a).addClass("current");
    $(c + " " + b[0]).removeClass("hidden");
    for (i = 1; i < b.length; i++) {
        $(c + " " + b[i]).addClass("hidden")
    }
};
// Change Captcha

function change_captcha(a) {
    if (typeof nv_is_recaptcha != "undefined" && nv_is_recaptcha) {
        for (i = 0, j = reCapIDs.length; i < j; i++) {
            var ele = reCapIDs[i];
            var btn = nv_recaptcha_elements[ele[0]];
            if ($('#' + btn.id).length) {
                if (typeof btn.btn != "undefined" && btn.btn != "") {
                    btn.btn.prop('disabled', true);
                }
                grecaptcha.reset(ele[1]);
            }
        }
        reCaptchaLoadCallback();
    } else {
        $("img.captchaImg").attr("src", nv_base_siteurl + "index.php?scaptcha=captcha&nocache=" + nv_randomPassword(10));
        "undefined" != typeof a && "" != a && $(a).val("");
    }
    return !1
}
// Form Ajax-login

function loginForm(redirect) {
    if (nv_is_user == 1) {
        return !1;
    }
    if (redirect != '') {
        redirect = '&nv_redirect=' + redirect;
    }
    $.ajax({
        type: 'POST',
        url: nv_base_siteurl + 'index.php?' + nv_lang_variable + '=' + nv_lang_data + '&' + nv_name_variable + '=users&' + nv_fc_variable + '=login' + redirect,
        cache: !1,
        data: '&nv_ajax=1',
        dataType: "html"
    }).done(function(a) {
        modalShow('', a, 'recaptchareset');
    });
    return !1;
}
// ModalShow

function modalShow(a, b, callback) {
    "" != a && 'undefined' != typeof a && $("#sitemodal .modal-content").prepend('<div class="modal-header"><h2 class="modal-title">' + a + '</h2></div>');
    $("#sitemodal").find(".modal-title").html(a);
    $("#sitemodal").find(".modal-body").html(b);
    var scrollTop = false;
    if (typeof callback != "undefined") {
        if (callback == "recaptchareset" && typeof nv_is_recaptcha != "undefined" && nv_is_recaptcha) {
            scrollTop = $(window).scrollTop();
            $('#sitemodal').on('show.bs.modal', function() {
                $('[data-toggle="recaptcha"]', $(this)).each(function() {
                    var parent = $(this).parent();
                    var oldID = $(this).attr('id');
                    var id = "recaptcha" + (new Date().getTime()) + nv_randomPassword(8);
                    var ele;
                    var btn = false,
                        pnum = 0,
                        btnselector = '';
                    $(this).remove();
                    parent.append('<div id="' + id + '" data-toggle="recaptcha"></div>');
                    for (i = 0, j = nv_recaptcha_elements.length; i < j; i++) {
                        ele = nv_recaptcha_elements[i];
                        if (typeof ele.pnum != "undefined" && typeof ele.btnselector != "undefined" && ele.pnum && ele.btnselector != "" && ele.id == oldID) {
                            pnum = ele.pnum;
                            btnselector = ele.btnselector;
                            btn = $('#' + id);
                            for (k = 1; k <= ele.pnum; k++) {
                                btn = btn.parent();
                            }
                            btn = $(ele.btnselector, btn);
                            break;
                        }
                    }
                    var newEle = {};
                    newEle.id = id;
                    if (btn != false) {
                        newEle.btn = btn;
                        newEle.pnum = pnum;
                        newEle.btnselector = btnselector;
                    }
                    nv_recaptcha_elements.push(newEle);
                });
                reCaptchaLoadCallback();
            });
        }
    }
    if (scrollTop) {
        $("html,body").animate({
            scrollTop: 0
        }, 200, function() {
            $("#sitemodal").modal({
                backdrop: "static"
            });
        });
        $('#sitemodal').on('hide.bs.modal', function() {
            $("html,body").animate({
                scrollTop: scrollTop
            }, 200);
        });
    } else {
        $("#sitemodal").modal({
            backdrop: "static"
        });
    }
    $('#sitemodal').on('hidden.bs.modal', function() {
        $("#sitemodal .modal-content").find(".modal-header").remove();
    });
}

function modalShowByObj(a, callback) {
    var b = $(a).attr("title"),
        c = $(a).html();
    modalShow(b, c, callback)
}
// Build google map for block Company Info

function initializeMap() {
    var ele = false
    $('.company-map-modal').each(function() {
        if ($(this).data('trigger')) {
            ele = $('.company-map', $(this)).attr('id')
            return
        }
    })
    if (ele) {
        var map, marker, ca, cf, a, f, z;
        ca = parseFloat($('#' + ele).data('clat'));
        cf = parseFloat($('#' + ele).data('clng'));
        a = parseFloat($('#' + ele).data('lat'));
        f = parseFloat($('#' + ele).data('lng'));
        z = parseInt($('#' + ele).data('zoom'));
        map = new google.maps.Map(document.getElementById(ele), {
            zoom: z,
            center: {
                lat: ca,
                lng: cf
            }
        });
        marker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(a, f),
            draggable: false,
            animation: google.maps.Animation.DROP
        });
    }
}
// Breadcrumbs

function nvbreadcrumbs() {
    if (brcb.length) {
        var g = $(".display", brcb).innerWidth() - 40,
            b = $(".breadcrumbs", brcb),
            h = $(".temp-breadcrumbs", brcb),
            e = $(".subs-breadcrumbs", brcb),
            ic_d = brcb.data("icon-down"),
            ic_u = brcb.data("icon-up"),
            a = [],
            c = !1;
        h.find("a").each(function() {
            a.push([$(this).attr("title"), $(this).attr("href")])
        });
        b.html("");
        e.html("");
        for (i = a.length - 1; 0 <= i; i--) {
            if (i == a.length - 1) {
                b.prepend('<li id="brcr_' + i + '"><a href="' + a[i][1] + '"><span>' + a[i][0] + "</span></a></li>");
                var d = $("li", b).outerWidth(!0);
                d > g && $("li a span", b).addClass("dotsign")
            } else {
                if (!c) {
                    var d = 0;
                    b.prepend('<li id="brcr_' + i + '"><a href="' + a[i][1] + '"><span>' + a[i][0] + "</span></a></li>");
                    b.find("li").each(function() {
                        d += $(this).outerWidth(!0)
                    });
                    d > g && (c = !0, $("#brcr_" + i, b).remove())
                }
                c && e.append('<li><a href="' + a[i][1] + '"><span><em class="' + ic_u + '"></em> ' + a[i][0] + "</span></a></li>")
            }
        }
        c && b.prepend('<li><a class="show-subs-breadcrumbs" href="#" onclick="showSubBreadcrumbs(this, event);"><span><em class="' + ic_d + '"></em></span></a></li>')
    }
}

function showSubBreadcrumbs(a, b) {
    b.preventDefault();
    b.stopPropagation();
    var c = $(".subs-breadcrumbs", brcb),
        ic_r = brcb.data("icon-right"),
        ic_d = brcb.data("icon-down");
    $("em", a).is("." + ic_d) ? $("em", a).removeClass(ic_d).addClass(ic_r) : $("em", a).removeClass(ic_r).addClass(ic_d);
    c.toggleClass("open");
    $(document).on("click", function() {
        $("em", a).is("." + ic_r) && ($("em", a).removeClass(ic_r).addClass(ic_d), c.removeClass("open"))
    })
}

function add_hint(type, url) {
    if (!type || !url) {
        return;
    }
    var el = document.createElement("link");
    el.setAttribute("rel", type);
    el.setAttribute("href", url);
    document.getElementsByTagName("head")[0].appendChild(el)
}

function footerSubMenu(t) {
    var a = $(".footerSubMenu-caret", t),
        d = $(t).next(),
        b = $(t).attr("data-icon-hide"),
        c = $(t).attr("data-icon-show");
    if (a.css('display') !== 'none') {
        if (d.hasClass('hd-xs')) {
            d.removeClass('hd-xs');
            a.removeClass(b).addClass(c)
        } else {
            d.addClass('hd-xs');
            a.removeClass(c).addClass(b)
        }
    }
}
var reCaptchaLoadCallback = function() {
    for (i = 0, j = nv_recaptcha_elements.length; i < j; i++) {
        var ele = nv_recaptcha_elements[i];
        if (typeof ele.typeload != "undefined") {
            if ($('#' + ele.id).length && typeof reCapIDs[i] == "undefined") {
                var size = '';
                if (typeof ele.btn != "undefined" && ele.btn != "") {
                    ele.btn.prop('disabled', true);
                }
                if (typeof ele.size != "undefined" && ele.size == "compact") {
                    size = 'compact';
                }
                reCapIDs.push([
                i, grecaptcha.render(ele.id, {
                    'sitekey': nv_recaptcha_sitekey,
                    'type': nv_recaptcha_type,
                    'size': size,
                    'callback': ele.typeload == 1 ? click_update : click_update_business
                })]);
            }
        } else {
            if ($('#' + ele.id).length && typeof reCapIDs[i] == "undefined") {
                var size = '';
                if (typeof ele.btn != "undefined" && ele.btn != "") {
                    ele.btn.prop('disabled', true);
                }
                if (typeof ele.size != "undefined" && ele.size == "compact") {
                    size = 'compact';
                }
                reCapIDs.push([
                i, grecaptcha.render(ele.id, {
                    'sitekey': nv_recaptcha_sitekey,
                    'type': nv_recaptcha_type,
                    'size': size,
                    'callback': reCaptchaResCallback
                })]);
            }
        }
    }
}
var reCaptchaResCallback = function() {
    for (i = 0, j = reCapIDs.length; i < j; i++) {
        var ele = reCapIDs[i];
        var btn = nv_recaptcha_elements[ele[0]];
        if ($('#' + btn.id).length) {
            var res = grecaptcha.getResponse(ele[1]);
            if (res != "") {
                if (typeof btn.btn != "undefined" && btn.btn != "") {
                    btn.btn.prop('disabled', false);
                }
            }
        }
    }
}
$(function() {
    try {
        document.createEvent("TouchEvent");
        $("body").addClass('touch');
    } catch (e) {
        $("body").removeClass('touch');
    }
    set_dropdown_event();
    $(".get_social_icons_block").html($(".social_icons_block").html());
    $(".get_head_right_block").html($(".head_right_block").html());
    // Modify all empty link
    $('a[href="#"], a[href=""]').attr("href", "javascript:void(0);");
    // Smooth scroll to top
    $("#totop,#bttop,.bttop").click(function(e) {
        e.preventDefault();
        $("html,body").animate({
            scrollTop: 0
        }, 800);
        return !1
    });

    news_other = document.querySelector('.news_other');
    ps = news_other !== null ? new PerfectScrollbar(news_other) : null;

    if (typeof bootbox != 'undefined') {
        bootbox.setDefaults({
            locale: nv_lang_interface,
            show: true,
            backdrop: true,
            closeButton: false,
            animate: false,
            className: "my-bootbox"
        });
    }

    // Search form
    $(".headerSearch button").on("click", function() {
        if ("n" == $(this).attr("data-click")) {
            return !1;
        }
        $(this).attr("data-click", "n");
        var a = $("input", $(this).parents(".headerSearch")),
            c = a.attr("maxlength"),
            b = strip_tags(a.val()),
            d = $(this).attr("data-minlength");
        a.parent().removeClass("has-error");
        "" == b || b.length < d || b.length > c ? (a.parent().addClass("has-error"), a.val(b).focus(), $(this).attr("data-click", "y")) : window.location.href = $(this).attr("data-url") + rawurlencode(b);
        return !1
    });
    $(".headerSearch input").on("keypress", function(a) {
        13 != a.which || a.shiftKey || (a.preventDefault(), $("button", $(this).parents(".headerSearch")).trigger("click"))
    });
    // Show messger timeout login users
    nv_is_user && (myTimerPage = setTimeout(function() {
        timeoutsessrun()
    }, nv_check_pass_mstime));
    // Show confirm message on leave, reload page
    $("form.confirm-reload").change(function() {
        $(window).bind("beforeunload", function() {
            return nv_msgbeforeunload
        })
    });
    // Tooltip
    $(".form-tooltip").tooltip({
        selector: "[data-toggle=tooltip]",
        container: "body"
    });
    $("[data-rel='tooltip'][data-content!='']").removeAttr("title").tooltip({
        container: "body",
        html: !0,
        title: function() {
            return ("" == $(this).data("img") || !$(this).data("img") ? "" : '<img class="img-thumbnail pull-left" src="' + $(this).data("img") + '" width="90" />') + $(this).data("content")
        }
    });
    // Change site lang
    $(".nv_change_site_lang").change(function() {
        document.location = $(this).val()
    });
    // Menu bootstrap
    $("a", menuSite).hover(function() {
        $(this).attr("rel", $(this).attr("title"));
        $(this).removeAttr("title")
    }, function() {
        $(this).attr("title", $(this).attr("rel"));
        $(this).removeAttr("rel")
    });
    // Tip + Ftip
    $(document).on("keydown", function(a) {
        27 === a.keyCode && (tip_active && tip_autoclose && tipHide(), ftip_active && ftip_autoclose && ftipHide(), menuSiteButton.is(":visible") && $(".navbar-collapse", menuSite).hasClass('in') && $('.navbar-collapse', menuSite).collapse('hide'))
    });
    menuSiteButton.on("click", function(a) {
        tipHide();
        ftipHide();
    });
    $(document).on("click", function() {
        tip_active && tip_autoclose && tipHide();
        ftip_active && ftip_autoclose && ftipHide();
        menuSiteButton.is(":visible") && $(".navbar-collapse", menuSite).hasClass('in') && $('.navbar-collapse', menuSite).collapse('hide')
    });
    // Tip + Ftip
    $("#tip, #ftip").on("click", function(a) {
        a.stopPropagation();
    });
    $(".navbar-nav", menuSite).on("click", function(a) {
        a.stopPropagation();
    });
    $("[data-toggle=tip], [data-toggle=ftip]").click(function() {
       menuSiteButton.is(":visible") && ($(".navbar-collapse", menuSite).hasClass('in') && $('.navbar-collapse', menuSite).collapse('hide'));
        var a = $(this).attr("data-target"),
            d = $(a).html(),
            b = $(this).attr("data-toggle"),
            c = "tip" == b ? $("#tip").attr("data-content") : $("#ftip").attr("data-content");
        var callback = $(this).data("callback");
        a != c ? ("" != c && $('[data-target="' + c + '"]').attr("data-click", "y"), "tip" == b ? ($("#tip .bg").html(d), tipShow(this, a, callback)) : ($("#ftip .bg").html(d), ftipShow(this, a, callback))) : "n" == $(this).attr("data-click") ? "tip" == b ? tipHide() : ftipHide() : "tip" == b ? tipShow(this, a, callback) : ftipShow(this, a, callback);
        return !1
    });
    // Google map
    if ($('.company-address').length) {
        $('.company-map-modal').on('shown.bs.modal', function() {
            $('.company-map-modal').data('trigger', false)
            $(this).data('trigger', true)
            if (!$('#googleMapAPI').length) {
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.id = 'googleMapAPI';
                script.src = 'https://maps.googleapis.com/maps/api/js?' + ($(this).data('apikey') != '' ? 'key=' + $(this).data('apikey') + '&' : '') + 'callback=initializeMap';
                document.body.appendChild(script);
            } else {
                initializeMap();
            }
        })
    };
    // maxLength for textarea
    $("textarea").on("input propertychange", function() {
        var a = $(this).prop("maxLength");
        if (!a || "number" != typeof a) {
            var a = $(this).attr("maxlength"),
                b = $(this).val();
            b.length > a && $(this).val(b.substr(0, a))
        }
    });
    // Alerts
    $("[data-dismiss=alert]").on("click", function(a) {
        $(this).is(".close") && $(this).parent().remove()
    });
    // OpenID
    $("#openidBt").on("click", function() {
        openID_result();
        return !1
    });
    // Change Localtion
    $("[data-location]").on("click", function() {
        locationReplace($(this).data("location"))
    });
    // Add preload: link rel="prefetch", link rel="prerender"
/*
     * $(document).bind("mousemove", function(e) { if (!e.target.href || e.target.href.indexOf(location.host) == -1 || e.target.hintAdded) return; add_hint("prefetch", e.target.href); add_hint("prerender", e.target.href); e.target.hintAdded = true });
     */
    /*
     * T???i tr?????c script recaptcha
     */
    if (typeof nv_is_recaptcha != "undefined" && nv_is_recaptcha && nv_recaptcha_elements.length > 0) {
        var a = document.createElement("script");
        a.type = "text/javascript";
        a.async = !0;
        a.src = "https://www.google.com/recaptcha/api.js?hl=" + nv_lang_interface + "&onload=reCaptchaLoadCallback&render=explicit";
        var b = document.getElementsByTagName("script")[0];
        b.parentNode.insertBefore(a, b);
    }
});
// Fix bootstrap multiple modal
$(document).on({
    'show.bs.modal': function() {
        var zIndex = 1040 + (10 * $('.modal:visible').length);
        $(this).css('z-index', zIndex);
        setTimeout(function() {
            $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
        }, 0);
    },
    'hidden.bs.modal': function() {
        if ($('.modal:visible').length > 0) {
            setTimeout(function() {
                $(document.body).addClass('modal-open');
            }, 0);
        }
    }
}, '.modal');
$(window).bind("load resize orientationchange", function() {
    winResize();
    fix_banner_center();
    nvbreadcrumbs();
    ps !== null && ps.update();
    // if (150 < cRangeX || 150 < cRangeY) tipHide(), ftipHide()
});
// Load Social script - lasest
$(window).on('load', function() {
    (0 < $(".fb-like").length || 0 < $(".fb-comments").length) && (1 > $("#fb-root").length && $("body").append('<div id="fb-root"></div>'), function(a, b, c) {
        var d = a.getElementsByTagName(b)[0];
        var fb_app_id = ($('[property="fb:app_id"]').length > 0) ? '&appId=' + $('[property="fb:app_id"]').attr("content") : '';
        var fb_locale = ($('[property="og:locale"]').length > 0) ? $('[property="og:locale"]').attr("content") : ((nv_lang_data == "vi") ? 'vi_VN' : 'en_US');
        a.getElementById(c) || (a = a.createElement(b), a.id = c, a.src = "//connect.facebook.net/" + fb_locale + "/all.js#xfbml=1" + fb_app_id, d.parentNode.insertBefore(a, d));
    }(document, "script", "facebook-jssdk"));
    0 < $(".twitter-share-button").length &&
    function() {
        var a = document.createElement("script");
        a.type = "text/javascript";
        a.src = "//platform.twitter.com/widgets.js";
        var b = document.getElementsByTagName("script")[0];
        b.parentNode.insertBefore(a, b);
    }();
});
$(window).scroll(function() {
    if ($(window).scrollTop() > 300 && ($(window).scrollTop() + $(window).height() < $(document).height() - $("#footer").height())) {
        $('#totop').addClass('fixed');
    } else {
        $('#totop').removeClass('fixed');
    }
});
