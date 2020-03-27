// ==UserScript==
// @name         seed-reverter
// @namespace    http://tampermonkey.net/
// @version      3.3.3.0
// @description  try to take over the world!
// @author       You
// @match        https://namu.wiki/*
// @match        https://awiki.theseed.io/*
// @match        https://theseed.io/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    /* https://www.experts-exchange.com/questions/21058968/on-error-resume-next-for-javascript.html */
    function handleError() {
        return true;
    }
    window.onerror = handleError;

    var jq = document.createElement('script');
    jq.setAttribute('src', 'https://theseed.io/js/jquery-2.1.4.min.js');

    document.body.insertBefore(jq, document.getElementById('app'));

    var ss = document.createElement('style');
    ss.innerHTML = `
table[data-v-0f0079ab] thead tr, table[data-v-24f321a4] thead tr {
    border-top: 1px solid #eceeef !important;
}
table[data-v-0f0079ab] tbody tr:hover, table[data-v-24f321a4] tbody tr:hover {
    background-color: #f5f5f5 !important;
}

button[data-v-64c847a2], a[data-v-760ceebb] {
display: inline-block;
font-weight: 400;
line-height: 1.25;
text-align: center;
white-space: nowrap;
vertical-align: middle;
user-select: none;
border: 1px solid transparent;
padding: .5rem 1rem;
font-size: 1rem;
border-radius: .25rem;
transition: all .2s ease-in-out;
}
button.s[data-v-64c847a2]:focus {
    box-shadow: 0 0 0 2px rgba(2,117,216,.5);
}
select, textarea, input:not([type=checkbox]):not([type=radio]) {
    display: block;
    width: 100% !important;
    padding: .5rem .75rem !important;
    font-size: 1rem ;
    line-height: 1.25 !important;
    color: #464a4c ;
    background-color: #fff;
    background-image: none;
    background-clip: padding-box;
    border: 1px solid rgba(0,0,0,.15) !important;
    border-radius: .25rem !important;
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
}
select:focus, textarea:focus, input:not([type=checkbox]):not([type=radio]):focus {
    color: #464a4c;
    background-color: #fff;
    border-color: #5cb3fd !important;;
    outline: none;
}
select[disabled], textarea[disabled], input:not([type=checkbox]):not([type=radio])[disabled] {
    background: #eceeef !important;
}
li button[data-v-3b1bf9e7]:hover {
    border-color: #ddd #ddd transparent !important;
}
div.r div.b.h[data-v-085ae043] {
    background: #000 !important;
    color: #fff;
}
a.b[data-v-e08abd6e] {
    color: #0275d8 !important;
    text-decoration: none !important;
}
button[data-v-64c847a2][class=""], a[data-v-760ceebb][class=""] {
    border: 1px solid #eceeef !important;
}
div[style][onmouseover][onmouseout] span[data-v-76ca162d] {
    font-size: 14pt !important;
}

#noDisplayHideAuthor, label[for="noDisplayHideAuthor"] {
    display: none !important;
}
table thead[data-v-0f0079ab] tr, table thead[data-v-24f321a4] tr {
    border-top: 1px solid #eceeef !important;
}
table[data-v-0f0079ab] tbody tr:hover, table[data-v-24f321a4] tbody tr:hover {
    background-color: #f5f5f5 !important;
}
    `;

    /* https://stackoverflow.com/questions/4793604/how-to-insert-an-element-after-another-element-in-javascript-without-using-a-lib */
    /* jQuery 없으면 왜 이렇게 피곤하지.. */
    function insertAfter(newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }

    usrLnks = document.querySelectorAll('.r a.b[data-v-e08abd6e]')
    for (const usrLnk of usrLnks) {
        if(!$(usrLnk).parent().children("sub").length) {
            var bi = document.createElement("sub");
            bi.innerText = " (차단됨)";
            usrLnk.after(bi);
        }
    }

    $('a[href]').click(function() {
        location.href = $(this).attr('href');
    });

    var usrLnks = document.querySelectorAll('a[class=""][data-v-e08abd6e]')
    for (const usrLnk of usrLnks) {
        usrLnk.addEventListener('click', function(event) {
            location.href = "/contribution/ip/" + this.innerText + "/document";
        }, false);
    }

    usrLnks = document.querySelectorAll('a[class="u"][data-v-e08abd6e]')
    for (const usrLnk of usrLnks) {
        usrLnk.addEventListener('click', function(event) {
            location.href = "/w/사용자:" + this.innerText;
        }, false);
    }

    try {
        if(document.getElementById("noDisplayHideAuthor").checked) {
            document.getElementById("noDisplayHideAuthor").click();
        }
    } catch(e) {}


    if($(".title").html() == "오류") {
        $(".title").html("문제가 발생했습니다!");
        $("div.liberty-content-main.wiki-article div").html('<h2>' + $("div.liberty-content-main.wiki-article div").html() + "</h2>");
    }

    $(".title h1").html($(".title h1").html().replace(/\s[(]역사[)]/, '의 역사').replace(/\s[(]역링크[)]/, '의 역링크'));

    if($("ul[data-v-7d7e0054]").length) {
        $("ul[data-v-7d7e0054]").attr("class", "nav nav-tabs");
        $("ul[data-v-7d7e0054]").attr("role", "tablist");
        $("li[data-v-7d7e0054]").attr("class", "nav-item");
        $("button.a[data-v-7d7e0054]").replaceWith('<a class="nav-link active" data-toggle=tab role=tab>' + $('button.a[data-v-7d7e0054]').html() +'</a>')
        $('button[type="button"][data-v-7d7e0054]').replaceWith('<a class=nav-link data-toggle=tab role=tab>' + $('button[data-v-7d7e0054]').html() +'</a>')

        $("form[data-v-7d7e0054]").attr('id', 'editForm');
    }

    $("body").attr("class", "Liberty");

    $(".r.v").attr("class", "r v res-wrapper");
    $(".r.v").attr("class", "r v res-wrapper");

    $(".c[data-v-085ae043]").each(function() {
        if($(this).children('.b.s').length) {
            $(this).attr('class', "c res res-type-status");
        } else {
            $(this).attr('class', "c res res-type-normal");
        }
    });

    var resfix = setInterval(function() {
        /*
        $(".h.f[data-v-085ae043]").attr('class', "h f r-head first-author");
        $(".h:not(.f)[data-v-085ae043]").attr('class', "h r-head");
        $(".b.h[data-v-085ae043]").attr('class', "b h r-body r-hidden-body");
        $(".b:not(.h)[data-v-085ae043]").attr('class', "b r-body");
        */

        if($(".r").length) {
            $(".res").each(function() {
                var thisObj = $(this);
                if(!thisObj.parent().hasClass("l") && !thisObj.children('.combo.admin-menu').length) {
                    if(thisObj.children(".b").hasClass("h")) {
                        thisObj.append('<div class="combo admin-menu"><a href="/admin' + window.location.pathname + '/' + thisObj.children('.h').children('span').children('a').attr('id') + '/show" class="btn btn-danger btn-sm">[ADMIN] 숨기기 해제</a></div>');
                    } else {
                        thisObj.append('<div class="combo admin-menu"><a href="/admin' + window.location.pathname + '/' + thisObj.children('.h').children('span').children('a').attr('id') + '/hide" class="btn btn-danger btn-sm">[ADMIN] 숨기기</a></div>');
                    }
                }
            });

            if(!$("#thread-status-form").length) {
                $("form.c[data-v-3f12fd1d]").before(
                    `<form method="post" id="thread-status-form" action="/admin` + window.location.pathname + `/status"> [ADMIN] 쓰레드 상태 변경 <select name="status"> <option value="close">close </option><option value="pause">pause </option><option value="agree">agree </option></select> <button id="changeBtn" class="d_btn type_blue" type="submit">변경</button> </form>`
                );
                $("form.c[data-v-3f12fd1d]").before(
                    `<form method="post" id="thread-document-form" action="/admin` + window.location.pathname + `/document"> [ADMIN] 쓰레드 이동 <input type="text" name="document" value=""> <button id="changeBtn" class="d_btn type_blue" type="submit">변경</button> </form>`
                );
                $("form.c[data-v-3f12fd1d]").before(
                    `<form method="post" id="thread-topic-form" action="/admin/` + window.location.pathname + `/topic"> [ADMIN] 쓰레드 주제 변경 <input type="text" name="topic" value=""> <button id="changeBtn" class="d_btn type_blue" type="submit">변경</button> </form>`
                );
            }
        }
    }, 1000);

    $("form[data-v-3f12fd1d]").attr('id', 'new-thread-form');

    var formControl = $('.liberty-content-main.wiki-article input:not([type="radio"]):not([type="checkbox"]), .liberty-content-main.wiki-article textarea, .liberty-content-main.wiki-article select');
    if(!formControl.hasClass("form-control")) {
        formControl.addClass("form-control");
    }

    document.body.insertBefore(ss, document.getElementById('app'));
})();
