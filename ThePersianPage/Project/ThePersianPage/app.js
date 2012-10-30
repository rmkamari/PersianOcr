<<<<<<< HEAD
var zwnj = '\u200c';
var alefba = 'آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیؤئيك';
var harekat = 'ًٌٍَُِّْٔ';
var notJoinableToNext = 'ةآأإادذرزژو';
function isAlefba(char) {
    return alefba.indexOf(char) !== -1;
}
function isJoinableToNext(char) {
    return notJoinableToNext.indexOf(char) === -1 && isAlefba(char);
}
function isHarekat(char) {
    return harekat.indexOf(char) !== -1;
}
var SamplePage = (function () {
    function SamplePage(page) {
        this.page = page;
    }
    SamplePage.prototype.insert = function (input) {
        var chars = input;
        var sb = [];
        var id = 0;
        var nextMustJoined = false;
        sb.push('<p>');
        for(var i = 0; i < chars.length; i++) {
            var char = chars[i];
            var nextChar = chars[i + 1];
            if(char === '\n') {
                sb.push('</p><p>');
            } else {
                if(char === ' ' || char === zwnj) {
                    sb.push(char);
                } else {
                    var before = '';
                    var content = [];
                    var after = '';
                    content.push(char);
                    while(true) {
                        if((isHarekat(nextChar)) || (isJoinableToNext(char) && isAlefba(nextChar))) {
                            content.push(nextChar);
                            i++;
                            char = chars[i];
                            nextChar = chars[i + 1];
                        } else {
                            break;
                        }
                    }
                    sb.push('<span class="char" id="ch' + id + '" content="' + content.join('') + '">' + before + content.join('') + after + "</span>");
                }
            }
        }
        sb.push('</p>');
        var section = sb.join('');
        var html = '<div>' + section + '</div>';
        this.page.html(html);
        var elements = $('.char', this.page).toArray();
        var sb = [];
        var ptop = this.page[0].offsetTop;
        var pleft = this.page[0].offsetLeft;
        var pheight = this.page[0].offsetHeight;
        var pwidth = this.page[0].offsetWidth;
        var scale = $('#scale').val();
        var canvas = document.getElementById('canvas');
        canvas.height = pheight * scale;
        canvas.width = pwidth * scale;
        var context = canvas.getContext('2d');
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.textBaseline = 'bottom';
        context.fillStyle = 'black';
        var fontpx = parseInt(getComputedStyle(elements[0]).getPropertyValue('font-size')) * scale;
        var pageClasses = this.page[0].getAttribute('class');
        context.font = $('#style').val() + ' ' + fontpx + 'px ' + $('#font').val();
        var ishift = parseInt($('#ishift').val());
        var iishift = parseInt($('#iishift').val());
        var iiishift = parseInt($('#iiishift').val());
        var ivshift = parseInt($('#ivshift').val());
        for(var i in elements) {
            var el = elements[i];
            sb.push(el.getAttribute('content'));
            sb.push(' ');
            var left = el.offsetLeft - pleft;
            var top = el.offsetTop - ptop;
            var height = el.offsetHeight;
            var width = el.offsetWidth;
            sb.push((left * scale) + ishift);
            sb.push(' ');
            sb.push(((pheight - (top + height)) * scale) + iishift);
            sb.push(' ');
            sb.push(((left + width) * scale) + iiishift);
            sb.push(' ');
            sb.push(((pheight - top) * scale) + ivshift);
            sb.push(' 0');
            sb.push('\n');
            context.fillText(el.getAttribute('content'), (left + width) * scale, (top + height) * scale);
        }
        context.save();
        var boxes = sb.join('');
        $('#boxes').val(boxes);
        var fontFileName = $('#font').val() + $('#style').val().replace(" ", "");
        var pngDownload = document.getElementById('downloadPNG');
        pngDownload.setAttribute('download', "per." + fontFileName + ".exp0.png");
        pngDownload.setAttribute('href', canvas.toDataURL("image/png"));
        var boxDownload = document.getElementById('downloadBOX');
        boxDownload.setAttribute('download', "per." + fontFileName + ".exp0.box");
        boxDownload.setAttribute('href', 'data:text/plain;charset=utf-8,' + boxes.replace(/\n/g, "%0A"));
    };
    return SamplePage;
})();
window.onload = function () {
    $('#button').click(function () {
        var t = $('textarea#inputText');
        var p = $('div#page');
        p.removeClass('nazli arial tahoma').addClass($('#font').val());
        p.removeClass('bold italic').addClass($('#style').val());
        var page = new SamplePage(p);
        page.insert(t.val());
    }).click();
};
=======
var zwnj = '\u200c';
var alefba = 'آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیؤئيك';
var harekat = 'ًٌٍَُِّْٔ';
var notJoinableToNext = 'ةآأإادذرزژو';
var zwj = '\u200d';
function isAlefba(char) {
    return alefba.indexOf(char) !== -1;
}
function isJoinableToNext(char) {
    return notJoinableToNext.indexOf(char) === -1 && isAlefba(char);
}
function isHarekat(char) {
    return harekat.indexOf(char) !== -1;
}
var SamplePage = (function () {
    function SamplePage(page) {
        this.page = page;
    }
    SamplePage.prototype.insert = function (input) {
        var chars = input;
        var sb = [];
        var id = 0;
        var nextMustJoined = false;
        sb.push('<p>');
        var extraSpace = ($('#extraSpace')[0]).checked ? ' ' : '';
        var letterByLetter = ($('#letterByLetter')[0]).checked;
        for(var i = 0; i < chars.length; i++) {
            var char = chars[i];
            var nextChar = chars[i + 1];
            if(char === '\n') {
                sb.push('</p><p>');
            } else {
                if(char === ' ' || char === zwnj) {
                    sb.push(char);
                } else {
                    var isb = [];
                    isb.push(char);
                    while(true) {
                        if((isHarekat(nextChar)) || (isJoinableToNext(char) && isAlefba(nextChar))) {
                            if(letterByLetter && !isHarekat(nextChar)) {
                                isb.push(zwj);
                                isb.push('</span>');
                                isb.push('<span class="char">');
                                isb.push(zwj);
                            }
                            isb.push(nextChar);
                            i++;
                            char = chars[i];
                            nextChar = chars[i + 1];
                        } else {
                            break;
                        }
                    }
                    console.log(isb.join(''));
                    sb.push('<span class="char">');
                    sb.push(isb.join(''));
                    sb.push('</span>');
                    sb.push(extraSpace);
                }
            }
        }
        sb.push('</p>');
        var section = sb.join('');
        var html = '<div>' + section + '</div>';
        this.page.html(html);
        $('.char').css('margin-left', $('#letterSpacing').val() + 'px');
        this.page[0].style.fontSize = $('#fontSize').val() + 'px';
        var elements = $('.char', this.page).toArray();
        var sb = [];
        var ptop = this.page[0].offsetTop;
        var pleft = this.page[0].offsetLeft;
        var pheight = this.page[0].offsetHeight;
        var pwidth = this.page[0].offsetWidth;
        var scale = $('#scale').val();
        var huge = ($('#huge')[0]).checked;
        if(!huge) {
            var canvas = document.getElementById('canvas');
            canvas.height = pheight * scale;
            canvas.width = pwidth * scale;
            var context = canvas.getContext('2d');
            context.fillStyle = 'white';
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.textBaseline = 'bottom';
            context.fillStyle = 'black';
        }
        var fontpx = parseInt(getComputedStyle(elements[0]).getPropertyValue('font-size')) * scale;
        var pageClasses = this.page[0].getAttribute('class');
        if(!huge) {
            context.font = $('#style').val() + ' ' + fontpx + 'px ' + $('#font').val();
        }
        var ishift = parseInt($('#ishift').val());
        var iishift = parseInt($('#iishift').val());
        var iiishift = parseInt($('#iiishift').val());
        var ivshift = parseInt($('#ivshift').val());
        for(var i in elements) {
            var el = elements[i];
            var elcontent = el.innerHTML;
            sb.push(elcontent);
            sb.push(' ');
            var left = el.offsetLeft - pleft;
            var top = el.offsetTop - ptop;
            var height = el.offsetHeight;
            var width = el.offsetWidth;
            sb.push((left * scale) + ishift);
            sb.push(' ');
            sb.push(((pheight - (top + height)) * scale) + iishift);
            sb.push(' ');
            sb.push(((left + width) * scale) + iiishift);
            sb.push(' ');
            sb.push(((pheight - top) * scale) + ivshift);
            sb.push(' 0');
            sb.push('\n');
            if(!huge) {
                context.fillText(elcontent, (left + width) * scale, (top + height) * scale);
            }
        }
        if(!huge) {
            context.save();
        }
        var boxes = sb.join('');
        if(($('#removeZwj')[0]).checked) {
            boxes = boxes.replace(/\u200d/g, "");
        }
        $('#boxes').val(boxes);
        var fontFileName = $('#font').val() + $('#style').val().replace(" ", "");
        if(!huge) {
            var pngDownload = document.getElementById('downloadPNG');
            pngDownload.setAttribute('download', "per." + fontFileName + ".exp0.png");
            pngDownload.setAttribute('href', canvas.toDataURL("image/png"));
            var boxDownload = document.getElementById('downloadBOX');
            boxDownload.setAttribute('download', "per." + fontFileName + ".exp0.box");
            boxDownload.setAttribute('href', 'data:text/plain;charset=utf-8,' + boxes.replace(/\n/g, "%0A"));
        }
    };
    return SamplePage;
})();
document.addEventListener('DOMContentLoaded', function () {
    $('#button').click(function () {
        var t = $('textarea#inputText');
        var p = $('div#page');
        p.removeClass('nazli arial tahoma').addClass($('#font').val());
        p.removeClass('bold italic').addClass($('#style').val());
        var page = new SamplePage(p);
        page.insert(t.val());
    }).click();
});
>>>>>>> e3d3902dcea2a82e5fc71511d5812723d9b3b6f9
