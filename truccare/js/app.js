$(document).ready(function(){
	$(".dropdown-button").dropdown();
	$('.parallax').parallax();
	$('.modal').modal();
	
	$('#home').click(function(){
		$('html, body').animate({
			scrollTop: $(".header-area").offset().top
		}, 700);
	});
	
	$('#about').click(function(){
		$('html, body').animate({
			scrollTop: $(".content-area").offset().top
		}, 700);
	});
	
	$('#makeUp').click(function(){
		$('html, body').animate({
			scrollTop: $(".section02").offset().top
		}, 700);
	});
	
	
	$('#media').click(function(){
		$('html, body').animate({
			scrollTop: $(".section03").offset().top
		}, 700);
	});
	
	$('#contributors').click(function(){
		$('html, body').animate({
			scrollTop: $(".section04").offset().top
		}, 700);
	});
		
	var imgSize=0;
	var textSize=0;
	$('.section02').find('.col').each(function(){
		
		if(imgSize < $(this).find('img').height()){
			imgSize = $(this).find('img').height();
		}
		if(textSize < $(this).find('.card-content').find('p').height()){
			textSize = $(this).find('.card-content').find('p').height();
		}
		
	})
	
	if($(window).width() >= 600){
		
		$(window).scroll(function(){
			var scrollTop = $(window).scrollTop();
			var about = $('.content-area').offset().top;
			if(about < scrollTop && scrollCheck ==0){
				scrollCheck=1;
				$('.nav').css('position','fixed');
				$('.nav').css('bottom','auto');
				$('.nav').css('background','rgba(0,0,0,0.7)');
			}
			else if(about > scrollTop && scrollCheck == 1){
				scrollCheck=0;
				$('.nav').css('position','absolute');
				$('.nav').css('bottom','0');
				$('.nav').css('background','rgba(0,0,0,0)');
			}
		});
	}
	
	var $grid = $('.grid').masonry({
		itemSelector: '.grid-item',
		percentPosition: true,
		columnWidth: '.grid-sizer'
	});
	
	var scrollCheck = 0;
	
	$('.section02').find('.col').each(function(){
		$(this).find('img').css('height', imgSize+'px');
		$(this).find('.card-content').find('p').css('height', textSize);
	});
	
	var imgSizeSec04 = 0;
	var textSizeSec04 = 0;
	
	$('.section04').find('.col').each(function(){

		if(imgSizeSec04 < $(this).find('img').height()){
			imgSizeSec04 = $(this).find('img').height();
		}
		if(textSizeSec04 < $(this).find('.card-content').find('p').height()){
			textSizeSec04 = $(this).find('.card-content').find('p').height();
		}

	})

	$('.section04').find('.col').each(function(){
		$(this).find('img').css('height', imgSizeSec04+'px');
		$(this).find('.card-content').find('p').css('height', textSizeSec04);
	});
	
	$(window).on('resize',function(){
		$('.section02').find('.col').each(function(){

			if(imgSize < $(this).find('img').height()){
				imgSize = $(this).find('img').height();
			}
			if(textSize < $(this).find('.card-content').find('p').height()){
				textSize = $(this).find('.card-content').find('p').height();
			}

		})

		$('.section02').find('.col').each(function(){
			$(this).find('img').css('height', imgSize+'px');
			$(this).find('.card-content').find('p').css('height', textSize);
		});
		
		$('.section04').find('.col').each(function(){

			if(imgSizeSec04 < $(this).find('img').height()){
				imgSizeSec04 = $(this).find('img').height();
			}
			if(textSizeSec04 < $(this).find('.card-content').find('p').height()){
				textSizeSec04 = $(this).find('.card-content').find('p').height();
			}

		})

		$('.section04').find('.col').each(function(){
			$(this).find('img').css('height', imgSizeSec04+'px');
			$(this).find('.card-content').find('p').css('height', textSizeSec04);
		});
		
		if($(window).width() >= 600){

			$(window).scroll(function(){
				var scrollTop = $(window).scrollTop();
				var about = $('.content-area').offset().top;
				if(about < scrollTop && scrollCheck ==0){
					scrollCheck=1;
					$('.nav').css('position','fixed');
					$('.nav').css('bottom','auto');
					$('.nav').css('background','rgba(0,0,0,0.7)');
				}
				else if(about > scrollTop && scrollCheck == 1){
					scrollCheck=0;
					$('.nav').css('position','absolute');
					$('.nav').css('bottom','0');
					$('.nav').css('background','rgba(0,0,0,0)');
				}
			});
		}
		else{
			$('.nav').css('position','absolute');
			$('.nav').css('bottom','0');
			$('.nav').css('background','rgba(0,0,0,0)');
		}
	});
	
	$('.cruelty').click(function(){
		$('.crueltyList li').css('opacity','1');
	});
	
	$('.nonCruelty').click(function(){
		$('.nonCrueltyList li').css('opacity','1');
	});
	
	var options = [
		{
			selector: '.header-area .row', offset: 200, callback: function(el) {
				Materialize.fadeInImage($(el));
			} 
		},
		{
			selector: '.section01 img', offset: 450, callback: function(el) {
				Materialize.fadeInImage($(el));
			} 
		},
		{
			selector: '.section02 .img-01', offset: 300, callback: function(el) {
				Materialize.fadeInImage($(el));
			} 
		},
		{
			selector: '.section02 .img-02', offset: 300, callback: function(el) {
				Materialize.fadeInImage($(el));
			} 
		},
		{
			selector: '.section02 .img-03', offset: 300, callback: function(el) {
				Materialize.fadeInImage($(el));
			} 
		},
		{
			selector: '.section04 .img-01', offset: 300, callback: function(el) {
				Materialize.fadeInImage($(el));
			} 
		},
		{
			selector: '.section04 .img-02', offset: 300, callback: function(el) {
				Materialize.fadeInImage($(el));
			} 
		},
		{
			selector: '.section04 .img-03', offset: 300, callback: function(el) {
				Materialize.fadeInImage($(el));
			} 
		},
		{
			selector: '.section04 .img-04', offset: 300, callback: function(el) {
				Materialize.fadeInImage($(el));
			} 
		},
		{
			selector: '.section04 .img-05', offset: 300, callback: function(el) {
				Materialize.fadeInImage($(el));
			} 
		},
		{
			selector: '.text-section01', offset: 300, callback: function(el) {
				Materialize.showStaggeredList($(el));
			} 
		},
		{
			selector: '.text-section02', offset: 300, callback: function(el) {
				Materialize.showStaggeredList($(el));
			} 
		},
		{
			selector: '.img-section03', offset: 300, callback: function(el) {
				Materialize.showStaggeredList($(el));
			} 
		},
		{
			selector: '.text-section04', offset: 300, callback: function(el) {
				Materialize.showStaggeredList($(el));
			} 
		}
		
	];
	Materialize.scrollFire(options);
});