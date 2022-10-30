window.onload = function() {
    $('body').removeClass('loading');
    $('body').addClass('loaded');
    pageLoadedHandler();
};

// Variables
const tl = new TimelineMax();
const isi = $('.isi');
const isiMain = $('.isi-main');
const isiWrapper = $('.isi_wrapper');
const mainExit = $('#main-exit');
const pi = $('.pi');
const piIsi = $('.pi-isi');
const pdfIsi = $('.pdf-isi');
const fdaIsi = $('.fda-isi');
const abbvieIsi = $('.abbvie-isi');
const initialScrollSpeed = 90000;
const scrollToTop = true; // Set to false if you do not need to scroll to the top when the auto scroll finished
let myScroll = null;
let scrollBar = null;
let scrollSpeed = 0;
let scrolledPercentage = 0;
let isiHeight = 0;
let isiFinished = false;
let animationFinished = false;
let scrollWrapHeight = isiWrapper.clientHeight;
// Assign timeline to window to be able to test.
window.tl = tl;

// Scroll init function. Keep disable options as they
function initScrollBars() {
    myScroll = new IScroll('.isi_wrapper', {
        scrollbars: 'custom',
        interactiveScrollbars: true,
        resizeScrollbars: false,
        mouseWheel: true,
        momentum: true,
        click: true,
        disablePointer: true,
        disableTouch: false,
        disableMouse: false,
    });

    window.myScroll = myScroll;

    scrollBar = $('.iScrollVerticalScrollbar');
}

function scrollSetUp(e) {
    myScroll.scrollBy(0, 0, 1, {
        fn: function(k) {
            return k;
        },
    });
}

function finishedAnimation() {
    animationFinished = true;
    startScroll();
}

function startScroll() {
    (scrollWrapHeight = $('.isi_wrapper').outerHeight()),
    (isiHeight = -1 * (isi.outerHeight() - scrollWrapHeight)),
    (scrolledPercentage = (myScroll.y * 100) / isiHeight),
    (scrollSpeed =
        initialScrollSpeed - initialScrollSpeed * (scrolledPercentage / 100));

    myScroll.refresh();
    setTimeout(function() {
        if (scrolledPercentage >= 100) {
            isiFinished = true;
        }
        myScroll.scrollTo(0, isiHeight, scrollSpeed, {
            fn: function(k) {
                return k;
            },
        });
    }, 300);
}

function stopScroll() {
    myScroll.isAnimating = false; // stop animation
}

// scroll init
initScrollBars();

scrollBar.mouseenter(function() {
    scrollSetUp();
});

isiMain.mouseenter(function() {
    stopScroll();
});

isiMain.mouseleave(function() {
    if (animationFinished) {
        if (!isiFinished) {
            startScroll();
        }
    }
});

myScroll.on('scrollStart', function() {
    if (animationFinished) {
        if (myScroll.isAnimating) {
            stopScroll();
        }
    }
});

myScroll.on('scrollEnd', function() {
    if (!scrollToTop) return;
    if (myScroll.maxScrollY >= myScroll.y) {
        stopScroll();
        setTimeout(function() {
            myScroll.scrollTo(0, 0, 2000);
        }, 3000);
    }
});

//
// Timeline Animation
//

function pageLoadedHandler() {
    tl.addLabel('f1')
        .set(bio, { opacity: 0 })
        .set(circle, { scale: 0.3, x: 0, y: 220 })
        .set(smallCircle, { scale: 0.3, x: 0, y: -40 })
        .set(topMark, { scale: 2, x: -120, y: -70 })
        .set(bottomMark, { scale: 2, x: 120, y: 70 })
        .set(cta, { x: 300 })

        .to(bg, 6, { x: -30, rotationZ: 0.0001, force3D: true, ease: Power1.linear }, 'f1+=0')
        .to(bio, 0.5, { opacity: 1 }, 'f1+=0')

        .addLabel('f2', 'f1+=3')
        .to(bio, 0.5, { opacity: 0 }, 'f2+=0')
        .to([topMark, bottomMark], 1, { scale: 1, x: 0, y: 0, ease: Power4.easeInOut }, 'f2+=0')
        .to(circle, 1, { x: 0, y: 0, ease: Power1.easeInOut }, 'f2+=0')

        .addLabel('f3', 'f2+=1')
        .to(circle, 1, { scale: 1, ease: Power1.easeInOut }, 'f3+=0')
        .to(bg02, 1, { opacity: 1, ease: Power1.easeInOut }, 'f3+=0')
        .to(txt01, 0.5, { opacity: 1, ease: Power1.easeInOut }, 'f3+=1.5')
        .to([topMark, bottomMark], 0.5, { scale: 0.9, ease: Power0.easeInOut }, 'f3+=2')
        .to([topMark, bottomMark], 0.5, { scale: 1, ease: Power0.easeInOut }, 'f3+=3')
        .to([topMark, bottomMark], 0.5, { scale: 0.9, ease: Power0.easeInOut }, 'f3+=4')
        .to([topMark, bottomMark], 0.5, { scale: 1, ease: Power0.easeInOut }, 'f3+=5.5')

        .addLabel('f4', '+=0')
        .to(bg, 0, { x: -23, ease: Power2.easeInOut }, 'f4+=0')
    // .to(bg, 5, { x: -15, ease: Power2.easeOut }, "f1+=0")
        .to([txt01], 0.5, { opacity: 0, ease: Power1.easeInOut }, 'f4+=0')
        .to([bg02], 1, { opacity: 0, ease: Power1.easeInOut }, 'f4+=0')
        .to(topMark, 0.5, { scale: 2, x: -120, y: -70, ease: Power4.easeInOut }, 'f4+=0.5')
        .to(bottomMark, 0.5, { scale: 2, x: 120, y: 70, ease: Power4.easeInOut }, 'f4+=0.5')
        .to(circle, 0.5, { scale: 0.3, x: 0, y: 0, ease: Power1.easeInOut }, 'f4+=0.5')

        .addLabel('f5', '+=0')
        .to(circle, 0.5, { y: 220, ease: Power1.easeInOut }, 'f5+=0')
        .to(smallCircle, 0.5, { scale: 1, x: 0, y: 0, ease: Power4.easeInOut }, 'f5+=0.5')
        .to(cta, 0.5, { x: 0, ease: Power4.easeInOut }, 'f5+=0.5')
        .to(txt02, 0.5, { opacity: 1, ease: Power4.easeInOut }, 'f5+=0.5')
        .add(function() {
            finishedAnimation();
        }, 'f5+=5');
}
// ClickTags
$('#main-exit').bind('click', function() {
    window.open(clickTag1);
});
$('.pi').bind('click', function() {
    window.open(clickTag2);
});
$('.pi-isi').bind('click', function() {
    window.open(clickTag3);
});
$('.pdf-isi').bind('click', function() {
    window.open(clickTag4);
});
$('.fda-isi').bind('click', function() {
    window.open(clickTag5);
});
$('.abbvie-isi').bind('click', function() {
    window.open(clickTag6);
});
