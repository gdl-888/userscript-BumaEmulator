// ==UserScript==
// @name         BumaEmulator
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://namu.wiki/*
// @match        https://awiki.theseed.io/*
// @match        https://theseed.io/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var ss = document.createElement('style');
    ss.innerHTML = `
div.r div.c[data-v-085ae043] {
    display: block;
}

div.r div.h.f[data-v-085ae043] {
    background: #70cc93;
}
div.r div.h[data-v-085ae043] {
    padding: 10px 12px 5px 15px;
    background: #aaa;
    border-radius: 4px 4px 0 0;
    border: none;
}
div.r div.b[data-v-085ae043] {
padding: 5px 10px 10px 15px;
background: #e8e8e8;
border-radius: 0 0 4px 4px;
overflow-x: scroll;
border: none;
}
div.r div.b.s[data-v-085ae043] {
    background: orange;
}
@keyframes head-loading {
    from {
        background-color:#747474;
    } to {
        background-color:#cacaca;
    }
}
@keyframes body-loading {
    from {
        background-color:#e2d7d7;
    } to {
        background-color:#f3f3f3;
    }
}
div.r[data-v-085ae043] {
    margin: 30px 0;
}
div.r.l div.h[data-v-085ae043], div.r.l.v[data-v-085ae043] {
    animation: head-loading .5s infinite !important;
    -moz-animation: head-loading .5s infinite !important;
    -webkit-animation: head-loading .5s infinite !important;
}
div.r.l div.b[data-v-085ae043] {
    animation: body-loading .5s infinite !important;
    -moz-animation: body-loading .5s infinite !important;
    -webkit-animation: head-loading .5s infinite !important;
    padding: 10px !important;
    height: 30px !important;
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
table th[data-v-0f0079ab], table th[data-v-24f321a4] {
    border-top: 1px solid #eceeef !important;
}
table tbody tr[data-v-0f0079ab]:hover, table tbody tr[data-v-24f321a4]:hover {
    background-color: #f5f5f5;
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
    `;

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

    var ndha = setInterval(function() {
        if(document.getElementById("noDisplayHideAuthor").checked)
            document.getElementById("noDisplayHideAuthor").click();
    }, 1000);

    function $(q) {
        return document.querySelector(q);
    }

    if($("div.title h1").innerHTML == "오류") {
        $("div.title h1").innerHTML = "문제가 발생했습니다!";
        $("div.liberty-content-main.wiki-article div").innerHTML = '<h2>' + $("div.liberty-content-main.wiki-article div").innerHTML + "</h2>";
    }

    document.body.insertBefore(ss, document.getElementById('app'));
})();
