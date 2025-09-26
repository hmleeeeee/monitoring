/*
 *
 *   INSPINIA - Responsive Admin Theme
 *   version 2.8
 *
 */

$(document).ready(function () {

    // Fast fix bor position issue with Propper.js
    // Will be fixed in Bootstrap 4.1 - https://github.com/twbs/bootstrap/pull/24092
    Popper.Defaults.modifiers.computeStyle.gpuAcceleration = false;


    // Add body-small class if window less than 768px
    if ($(window).width() < 769) {
        $('body').addClass('body-small')
    } else {
        $('body').removeClass('body-small')
    }

    // MetisMenu
    var sideMenu = $('#side-menu').metisMenu();

    sideMenu.on('shown.metisMenu', function (e) {
        fix_height();
    });

    // Collapse ibox function
    $('.collapse-link').on('click', function (e) {
        e.preventDefault();
        var ibox = $(this).closest('div.ibox');
        var button = $(this).find('i');
        var content = ibox.children('.ibox-content');
        content.slideToggle(200);
        button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
        ibox.toggleClass('').toggleClass('border-bottom expanded');
        setTimeout(function () {
            ibox.resize();
            ibox.find('[id^=map-]').resize();
        }, 50);
    });

    // Close ibox function
    $('.close-link').on('click', function (e) {
        e.preventDefault();
        var content = $(this).closest('div.ibox');
        content.remove();
    });

    // Fullscreen ibox function
    $('.fullscreen-link').on('click', function (e) {
        e.preventDefault();
        var ibox = $(this).closest('div.ibox');
        var button = $(this).find('i');
        $('body').toggleClass('fullscreen-ibox-mode');
        button.toggleClass('fa-expand').toggleClass('fa-compress');
        ibox.toggleClass('fullscreen');
        setTimeout(function () {
            $(window).trigger('resize');
        }, 100);
    });

    // Close menu in canvas mode
    $('.close-canvas-menu').on('click', function (e) {
        e.preventDefault();
        $("body").toggleClass("mini-navbar");
        SmoothlyMenu();
    });

    // Run menu of canvas
    $('body.canvas-menu .sidebar-collapse').slimScroll({
        height: '100%',
        railOpacity: 0.9
    });

    // Open close right sidebar
    $('.right-sidebar-toggle').on('click', function (e) {
        e.preventDefault();
        $('#right-sidebar').toggleClass('sidebar-open');
    });

    // Initialize slimscroll for right sidebar
    $('.sidebar-container').slimScroll({
        height: '100%',
        railOpacity: 0.4,
        wheelStep: 10
    });

    // Open close small chat
    $('.open-small-chat').on('click', function (e) {
        e.preventDefault();
        $(this).children().toggleClass('fa-comments').toggleClass('fa-times');
        $('.small-chat-box').toggleClass('active');
    });

    // Initialize slimscroll for small chat
    $('.small-chat-box .content').slimScroll({
        height: '234px',
        railOpacity: 0.4
    });

    // Small todo handler
    $('.check-link').on('click', function () {
        var button = $(this).find('i');
        var label = $(this).next('span');
        button.toggleClass('fa-check-square').toggleClass('fa-square-o');
        label.toggleClass('todo-completed');
        return false;
    });

    // Append config box / Only for demo purpose
    // Uncomment on server mode to enable XHR calls
    //$.get("skin-config.html", function (data) {
    //    if (!$('body').hasClass('no-skin-config'))
    //        $('body').append(data);
    //});

    // Minimalize menu
    $('.navbar-minimalize').on('click', function (event) {
        event.preventDefault();
        $("body").toggleClass("mini-navbar");
        SmoothlyMenu();
		
		if (document.body.classList.contains('mini-navbar')) {
		    console.log('body에 mini-navbar 클래스가 있습니다.');
		} else {
		    console.log('body에 mini-navbar 클래스가 없습니다.');
		}
		
    });

    // Tooltips demo
    $('.tooltip-demo').tooltip({
        selector: "[data-toggle=tooltip]",
        container: "body"
    });


    // Move right sidebar top after scroll
    $(window).scroll(function () {
        if ($(window).scrollTop() > 0 && !$('body').hasClass('fixed-nav')) {
            $('#right-sidebar').addClass('sidebar-top');
        } else {
            $('#right-sidebar').removeClass('sidebar-top');
        }
    });

    $("[data-toggle=popover]")
        .popover();

    // Add slimscroll to element
    $('.full-height-scroll').slimscroll({
        height: '100%'
    })
});



// Fixed Sidebar
$(window).bind("load", function () {
    if ($("body").hasClass('fixed-sidebar')) {
        $('.sidebar-collapse').slimScroll({
            height: '100%',
            railOpacity: 0.9
        });
    }
});

function fix_height() {
    var heightWithoutNavbar = $("body > #wrapper").height() - 62;
    $(".sidebar-panel").css("min-height", heightWithoutNavbar + "px");

    var navbarheight = $('nav.navbar-default').height();
    var wrapperHeight = $('#page-wrapper').height();

    if (navbarheight > wrapperHeight) {
        $('#page-wrapper').css("min-height", navbarheight + "px");
    }

    if (navbarheight < wrapperHeight) {
        $('#page-wrapper').css("min-height", $(window).height() + "px");
    }

    if ($('body').hasClass('fixed-nav')) {
        if (navbarheight > wrapperHeight) {
            $('#page-wrapper').css("min-height", navbarheight + "px");
        } else {
            $('#page-wrapper').css("min-height", $(window).height() - 60 + "px");
        }
    }

}

$(window).bind("load resize scroll", function () {

    // Full height of sidebar
    setTimeout(function(){
        if (!$("body").hasClass('body-small')) {
            fix_height();
        }
    })

});

// Minimalize menu when screen is less than 768px
$(window).bind("resize", function () {
    if ($(this).width() < 769) {
        $('body').addClass('body-small')
    } else {
        $('body').removeClass('body-small')
    }
});

// Local Storage functions
// Set proper body class and plugins based on user configuration
$(document).ready(function () {
    if (localStorageSupport()) {

        var collapse = localStorage.getItem("collapse_menu");
        var fixedsidebar = localStorage.getItem("fixedsidebar");
        var fixednavbar = localStorage.getItem("fixednavbar");
        var boxedlayout = localStorage.getItem("boxedlayout");
        var fixedfooter = localStorage.getItem("fixedfooter");

        var body = $('body');

        if (fixedsidebar == 'on') {
            body.addClass('fixed-sidebar');
            $('.sidebar-collapse').slimScroll({
                height: '100%',
                railOpacity: 0.9
            });
        }

        if (collapse == 'on') {
            if (body.hasClass('fixed-sidebar')) {
                if (!body.hasClass('body-small')) {
                    body.addClass('mini-navbar');
                }
            } else {
                if (!body.hasClass('body-small')) {
                    body.addClass('mini-navbar');
                }

            }
        }

        if (fixednavbar == 'on') {
            $(".navbar-static-top").removeClass('navbar-static-top').addClass('navbar-fixed-top');
            body.addClass('fixed-nav');
        }

        if (boxedlayout == 'on') {
            body.addClass('boxed-layout');
        }

        if (fixedfooter == 'on') {
            $(".footer").addClass('fixed');
        }
    }
});

// check if browser support HTML5 local storage
function localStorageSupport() {
    return (('localStorage' in window) && window['localStorage'] !== null)
}

// For demo purpose - animation css script
function animationHover(element, animation) {
    element = $(element);
    element.hover(
        function () {
            element.addClass('animated ' + animation);
        },
        function () {
            //wait for animation to finish before removing classes
            window.setTimeout(function () {
                element.removeClass('animated ' + animation);
            }, 2000);
        });
}

function SmoothlyMenu() {
    if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
        // Hide menu in order to smoothly turn on when maximize menu
        $('#side-menu').hide();
        // For smoothly turn on menu
        setTimeout(
            function () {
                $('#side-menu').fadeIn(400);
            }, 200);
    } else if ($('body').hasClass('fixed-sidebar')) {
        $('#side-menu').hide();
        setTimeout(
            function () {
                $('#side-menu').fadeIn(400);
            }, 100);
    } else {
        // Remove all inline style from jquery fadeIn function to reset menu state
        $('#side-menu').removeAttr('style');
    }
}

// Dragable panels
function WinMove() {
    var element = "[class*=col]";
    var handle = ".ibox-title";
    var connect = "[class*=col]";
    $(element).sortable(
        {
            handle: handle,
            connectWith: connect,
            tolerance: 'pointer',
            forcePlaceholderSize: true,
            opacity: 0.8
        })
        .disableSelection();
}

// Draggable modal
(function () {
  var ROOT = '.js-draggable-modal';
  var HANDLE = '.js-drag-handle';
  var zIndexCounter = 0; // 기본 z-index 값보다 큰 값으로 시작

  $(document).on('shown.bs.modal', function (e) {
    var $m = $(e.target);
    if (!$m.is(ROOT)) return;

    // 모달을 body로 올려서 offset 부모 영향 제거
//    if (!$m.parent().is('body')) $m.appendTo('body');
    var $d = $m.find('.modal-dialog').css({ margin: 0, position: 'fixed' });

    // 드래그 초기화
    if (typeof $.fn.draggable === 'function' && !$d.data('drag-init')) {
      $d.draggable({ handle: HANDLE, containment: 'window', scroll: false })
        .data('drag-init', true);
    }

    // 오픈 시 중앙 배치
    var ww = $(window).width(), wh = $(window).height();
    var dw = $d.outerWidth(), dh = $d.outerHeight();
    $d.css({ left: Math.max(0, (ww - dw) / 2), top: Math.max(20, (wh - dh) / 2) });

    // z-index 값을 증가시켜서 새로운 모달이 위에 오도록 설정
    $m.css('z-index', zIndexCounter++);
  });

  // 닫을 때 위치 초기화
  $(document).on('hidden.bs.modal', function (e) {
    var $m = $(e.target);
    if (!$m.is(ROOT)) return;
    $m.find('.modal-dialog').removeAttr('style');

    // 모달 닫히면 z-index 초기화
    $m.removeAttr('style');
  });
})();


// Depth3 Auto Viewport Cap
(function () {
  var SEL = '.navbar-default #side-menu .nav-second-level.depth3';
  var MAX_VH = 90; // 자동 계산 cap 상한

  function px(n){ return parseFloat(n) || 0; }
  function getVar(el, name, fallback){
    var v = getComputedStyle(el).getPropertyValue(name).trim();
    return v ? parseFloat(v) : (fallback || 0);
  }

  function calcCap(el){
    // cap-rows / vh-unbound가 있으면 자동 계산 스킵(수동 규칙 우선)
    if (el.classList.contains('cap-rows') || el.classList.contains('vh-unbound')) return;

    var rows     = getVar(el, '--rows', 10);       // 예: rows-16 클래스면 --rows:16
    var rowH     = getVar(el, '--row-h', 30);      // 1행 총 높이(px)
    var panelPad = getVar(el, '--panel-pad', 0);   // 상하 패딩(px)
    var needPx   = (rowH * rows) + (panelPad * 2); // rows를 정확히 보여주기 위한 px
    var vh       = Math.ceil((needPx / window.innerHeight) * 100);

    vh = Math.min(vh, MAX_VH);

    el.style.setProperty('--vh-cap', vh + 'vh');
  }

  function run(){
    document.querySelectorAll(SEL).forEach(calcCap);
  }

  // 초기/리사이즈
  var t;
  window.addEventListener('resize', function(){ clearTimeout(t); t = setTimeout(run, 100); });
  document.addEventListener('DOMContentLoaded', run);

  // 메뉴 펼침 후 재계산
  $(document).on('shown.bs.collapse shown.metisMenu', function(){ run(); });
})();

//navActiveSync: GNB/SNB active 동기화
(function () {
  var SNB2 = '#side-menu > li > ul.depth2 li > a.menu-call[data-menu]';
  var GNB2 = '#navbar .dropdown-menu a.menu-call[data-menu]';
  // mini-navbar 스코프에 한정된 루트 셀렉터
  var SNB_ROOT = '.mini-navbar #side-menu li > a';
  var GNB_ROOT = '.mini-navbar #navbar .navbar-nav > li.dropdown > a.dropdown-toggle';

  function keyOf($a){
    var k = String($a.data('menu')||'').trim();
    if (k) return k;

    // 루트 a일 경우: 자식의 첫 2뎁스 data-menu 추출
    var $s = $a.next('ul').find('a.menu-call[data-menu]').first();
    if ($s.length) return String($s.data('menu')||'').trim();

    // GNB 루트 a일 경우: 하위 2뎁스의 첫 data-menu 추출
    var $g = $a.closest('li.dropdown').find('.dropdown-menu a.menu-call[data-menu]').first();
    if ($g.length) return String($g.data('menu')||'').trim();

    return '';
  }

  function markSNB(key){
    var $a = $(SNB2 + '[data-menu="'+key+'"]').first();
    var $side = $('#side-menu');

    // 초기화
    $side.find('a.menu-call.active').removeClass('active').attr('aria-expanded', null);
    $side.find('li.active').removeClass('active');
    if (!$a.length) return;

    // 현재 경로(체인)
    var $chainLis = $a.parentsUntil('#side-menu','li').add($a.closest('li'));
    var $chainUls = $a.parentsUntil('#side-menu','ul');

    // 다른 분기 닫기/비활성
    $side.find('ul.collapse').not($chainUls).each(function(){
      var $ul=$(this);
      if ($ul.hasClass('collapse') && $.fn.collapse) $ul.collapse('hide');
      $ul.removeClass('in show').attr('aria-expanded','false').css('height','');
    });

    // 현재 경로 펼치기 + 토글 표시
    $chainUls.each(function(){
      var $ul=$(this);
      if ($ul.hasClass('collapse') && $.fn.collapse) $ul.collapse('show');
      $ul.addClass('in show').attr('aria-expanded','true').css('height','');
      var $tg=$ul.prev('a'); // 루트 토글
      if ($tg.length) $tg.addClass('active').attr('aria-expanded','true');
    });

    // 타깃 + 모든 조상 li 활성화
    $a.addClass('active');
    $chainLis.addClass('active');
  }

  function markGNB(key){
    var $a = $(GNB2 + '[data-menu="'+key+'"]').first();
    var $nav = $('#navbar');
    var $roots = $nav.find('.navbar-nav > li.dropdown');

    // 다른 드롭다운 전부 닫기/비활성
    $roots.removeClass('active open show')
          .children('a.dropdown-toggle').removeClass('active').attr('aria-expanded','false');
    $roots.find('> .dropdown-menu').removeClass('show');
    $roots.find('.dropdown-menu a.menu-call').removeClass('active');
    $roots.find('.dropdown-menu li').removeClass('active');

    if (!$a.length) return;

    // 선택 루트/경로 활성화
    var $root = $a.closest('li.dropdown');
    $root.addClass('active show')
         .children('a.dropdown-toggle').addClass('active').attr('aria-expanded','true');
    $root.children('> .dropdown-menu').addClass('show');

    $a.addClass('active').closest('li').addClass('active');
  }

  function sync(key){ if (key){ markSNB(key); markGNB(key); } }

  // 2뎁스 클릭 → 양쪽 동기화
  $(document)
    .off('click.sync.dm', SNB2 + ', ' + GNB2)
    .on('click.sync.dm',  SNB2 + ', ' + GNB2, function(){
      var key = keyOf($(this));
      console.log('[navActiveSync] 2depth-click → key:%s, text:%s', key || '(none)', $.trim($(this).text()).replace(/\s+/g,' '));
      sync(key);
    });

  // mini-navbar: SNB 루트 a(토글) 클릭 → 동기화 + 해당 GNB 2뎁스 강제 클릭(화면 이동)
  $(document)
    .off('click.sync.mini.snb', SNB_ROOT)
    .on('click.sync.mini.snb',  SNB_ROOT, function(e){
      var $root = $(this);
      var key   = keyOf($root);

      console.log('[navActiveSync mini] SNB root-click → key:%s, text:%s', key || '(none)', $.trim($root.text()).replace(/\s+/g,' '));
      sync(key);

      if (key){
        var $gnb = $(GNB2 + '[data-menu="'+ key +'"]').first();
        if ($gnb.length){
          // 강제 이동: GNB의 해당 .menu-call 2뎁스를 클릭시켜 라우팅 실행
          $gnb.trigger('click');
        } else {
          // (폴백) 같은 키의 SNB 2뎁스가 있으면 그것이라도 클릭
          var $snb = $root.next('ul').find('a.menu-call[data-menu="'+ key +'"]').first();
          if ($snb.length) $snb.trigger('click');
        }
      }

      // '#' 점프 방지 (미니모드에서 우리는 강제 라우팅으로 처리)
      e.preventDefault();
    });

  // mini-navbar: GNB 루트 a 클릭 → 동기화만
  $(document)
    .off('click.sync.mini.gnb', GNB_ROOT)
    .on('click.sync.mini.gnb',  GNB_ROOT, function(){
      var key = keyOf($(this));
      console.log('[navActiveSync mini] GNB root-click → key:%s, text:%s', key || '(none)', $.trim($(this).text()).replace(/\s+/g,' ')); // 한 줄 체크 로그
      sync(key);
    });
})();