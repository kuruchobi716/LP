$(document).ready(function(){
	"use strict";
	var wow = new WOW(
	  {
		boxClass:     'wow',      // animated element css class (default is wow)
		animateClass: 'animated', // animation css class (default is animated)
		offset:       100,          // distance to the element when triggering the animation (default is 0)
		mobile:       false       // trigger animations on mobile devices (true is default)
	  }
	);
	wow.init();

	//ページ内リンク
	$('a[href^="#"]').click(function(){//不要ならNOTは外す
		var headerHight = 0; //ヘッダの高さ
		var speed = 500;
		var href= $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top-headerHight;
		$("html, body").animate({scrollTop:position}, speed, "swing");
		return false;
	});


	//pageTop アニメーション
	var pagetop = $('#gotop');
	pagetop.click(function() {
		$("html,body").animate({ scrollTop: 0 }, 500);
		return false;
	});

	//スマホの時だけtelを有効にする
	var device = navigator.userAgent;
	if((device.indexOf('iPhone') > 0 && device.indexOf('iPad') == -1) || device.indexOf('iPod') > 0 || device.indexOf('Android') > 0){
		//text
		$('.tel').each(function(){
			var tel = $(this).data("tel");
			$(".tel").wrapInner("<a></a>");
			$("a",this).attr({href:"tel:"+tel});
		});
		//image
		$('.tel_img').each(function(){
			var tel_img = $(this).data("tel");
			$(".tel_img").wrap('<a href="tel:'+tel_img+'"></a>');
		});
	}

});