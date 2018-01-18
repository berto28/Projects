var imgFB = '';
var fbname = '';
var desktop ='';
var mobile ='';
var dekotopVideoComment ='';
var mobileVideoComment ='';
var desktopReply ='';
var mobileReply = '';
var desktopReplyForum = '';
var mobileReplyForum = '';
window.fbAsyncInit = function() {
	FB.init({
		appId      : '128713244469029',
		xfbml      : true,
		version    : 'v2.11'
	});

	FB.getLoginStatus(function(response) {

		if (response.status === 'connected') {
			console.log('Logged in.');
			FB.api('/me', checkFB);
		}
		else {
			console.log(response);
			FB.login();
			getVideoLikes();
		}
	}); 
	
};

(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

$('#forumBtnSend').click(function(){
	
	FB.getLoginStatus(function(response) {
		if (response.status === 'connected') {
			console.log('Logged in.');
			FB.api('/me', getNameFromFB);
		}
		else {
			console.log(response);
			FB.login();
			$('#txtForum').val("");
		}
	}); 

});

$('#btnCommentVideo01').click(function(){
	FB.getLoginStatus(function(response) {
		if (response.status === 'connected') {
			console.log('Logged in.');
			FB.api('/me', commentVideo);
		}
		else {
			console.log(response);
			FB.login();
			$('#txtCommentVideo01').val("");
		}
	}); 
});

$('#videoLike').click(function(){
	FB.getLoginStatus(function(response) {
		if (response.status === 'connected') {
			console.log('Logged in.');
			FB.api('/me', addLikeVideo);
		}
		else {
			console.log(response);
			FB.login(function(response){
				FB.getLoginStatus(function(response) {

					if (response.status === 'connected') {
						console.log('Logged in.');
						FB.api('/me', checkFB);
					}
					else {
						console.log(response);
						FB.login();
						getVideoLikes();
					}
				}); 
			});
			$('#txtCommentVideo01').val("");
		}
	}); 
});

$('#btnSend').click(function(){
	sendEmail();
});

$('.video-box').click(function(){
	playVideo();
	$('.video01 .collapsible').removeClass('hide');
	$('.collapsible').collapsible('open', 0);
	$('.video01 .video-comment').removeClass('m12').addClass('m8');
});

function playVideo(){
	var symbol = $(".video-box iframe")[0].src.indexOf("?") > -1 ? "&" : "?";
	$(".video-box iframe")[0].src +=symbol + 'autoplay=1';
	$(".video-box iframe").css('z-index', '1');
}

function sendEmail(){
	console.log('aseasd')
	$.ajax({
		type: 'POST',
//		url: 'https://mandrillapp.com/api/1.0/messages/send.json',
		url: 'http://mandrill.com',
		data: {
		'key': '_k8ExgOVBF67XfVj9UVUhg',
		'message': {
		'from_email': 'cjvillanueva1528@gmail.com',
		'to': [
				{
				'email': 'christian-john.villanueva@transcosmos.com.ph',
				'name': 'wew',
				'type': 'to'
				}
//			,
//			   {
//				'email': 'RECIPIENT_NO_2@EMAIL.HERE',
//				'name': 'ANOTHER RECIPIENT NAME (OPTIONAL)',
//				'type': 'to'
//				}
		],
	   'autotext': 'true',
	   'subject': 'YOUR SUBJECT HERE!',
	   'html': 'YOUR EMAIL CONTENT HERE! YOU CAN USE HTML!',
		'text': 'example text',
		'track_opens': true,
		'track_clicks': true,
   		}
		}
   }).done(function(response) {
				console.log(response); // if you're into that sorta thing
		});
}

function checkFB(response){
	console.log(response.name);
	imgFB = 'http://graph.facebook.com/' + response.id + '/picture?type=normal';
	fbname = response.name;
	getVideoLikes();
}

function getNameFromFB(response){
	
	$('.loading').removeClass('hide');
	
	console.log(response.name);
	var name = response.name;
	var message = $.trim($('#txtForum').val().replace(/[\t\n]+/g,' '));
	var topic = $('#selectTopic').val();
	imgFB = 'http://graph.facebook.com/' + response.id + '/picture?type=normal';
	
	$.ajax({
		type: 'post',
		url: 'php/handler.php',
		data: {forum:"forum", name:name, message:message, imgFB:imgFB, topic:topic},
		success: function(e){
			console.log(e);
			if(e.match("true")){
				$('.loading').addClass('hide');
				$('#txtForum').val('');
				if($(window).width() <= 600){
					var newForum = '<div class="row">\
										<div class="col s12 m12">\
										<div class="card-panel grey lighten-4">\
										<div class="row">\
										<div class="col s12 center-align">\
										<img  src="'+imgFB+'" alt="" class="circle responsive-img">\
										</div>\
										</div>\
										<div class="row">\
										<div class="col s12">\
										<h5><blockquote>'+name+'</blockquote></h5>\
										<span>\
										'+message+'\
										</span>\
										<div>\
										<div class="container">\
										<a>\
										<span class="number-comments<?php echo $json->json[$c1][0]?> right grey-text text-darken-1"></span>\
										<i class="material-icons prefix right collapsible-header grey-text text-darken-2">comment</i>\
										</a>\
										</div>\
										</div>\
										</div>\
										</div>\
										</div>\
										</div>\
										</div>';
					
					newForum+= mobile;
					mobile+=newForum;

					$('.prevComment-forum-mobile').html(newForum);
				}
				else{
					
					var newForum = '<div class="row">\
							<div class="col s12 m11">\
							<div class="card-panel grey lighten-4">\
							<div class="row valign-wrapper">\
							<div class="col s12 m2 img-forum">\
							<img id="imgForum" src="'+imgFB+'" alt="" class="circle responsive-img">\
							</div>\
							<div class="col s12 m10">\
							<h5><blockquote>'+name+'</blockquote></h5>\
							<span>\
							'+message+'\
							</span>\
							<div>\
							<div class="container">\
							<a>\
							<span class="number-comments<?php echo $json->json[$c1][0]?> right grey-text text-darken-1"></span>\
							<i class="material-icons prefix right collapsible-header grey-text text-darken-2">comment</i>\
							</a>\
							</div>\
							</div>\
							</div>\
							</div>\
							</div>\
							</div>\
							</div>';
					
					newForum+= desktop;
					desktop+=newForum;
					
					$('.prevComment-forum-desktop').html(newForum);
				}
				
			}
		}
	});
	
	
}

function getAllForum(){
	var topic = $('#selectTopic').val();
	var screen;
	
	if($(window).width() <= 600){
		screen = "mobile"
	}
	else{
		screen = "desktop"
	}
	
	$('.loading').removeClass('hide');
	$.ajax({
		type: 'post',
		url: 'php/handler.php',
		data: {getForum:'get', topic:topic, screen:screen},
		success: function(e){
			if(e == "" || e == null || e == 0){
				$('.loading').addClass('hide');
				$('.prevComment-forum-mobile').html('<h2 class="center-align">No comment for this topic</h2>');
				$('.prevComment-forum-desktop').html('<h2 class="center-align">No comment for this topic</h2>');
			}
			else{
				$('.loading').addClass('hide');
				desktop='';
				mobile='';
				if($(window).width() <= 600){
					$('.prevComment-forum-mobile').html(e);
					mobile=e;
				}
				else{
					desktop=e;
					$('.prevComment-forum-desktop').html(e);
				}	
			}
			
		}
	});
	
}

function commentVideo(response){
	var name = response.name;
	imgFB = 'http://graph.facebook.com/' + response.id + '/picture?type=normal';
	var comment = $('#txtCommentVideo01').val();
	var video = $('#titleVideo').text();
	$('.loading').removeClass('hide');
	$.ajax({
		type: 'post',
		url: '../php/handler.php',
		data: {
			videoComment:'videoComment',
			comment:comment,
			video:video,
			name:name,
			imgFB:imgFB
		},
		success: function(e){
			if(e.match("true")){
				$('#txtCommentVideo01').val('');
				if($(window).width() <= 600){
					console.log("pasok sa videocomment mobile");
					var newVideoComment ='<div class="row">\
					<div class="col s12 m12">\
						<div class="card-panel grey lighten-4">\
							<div class="row">\
								<div class="col s12 center-align">\
										<img  src="'+ imgFB +'" alt="" class="circle responsive-img"> \
										</div>\
										</div>\
										<div class="row">\
											<div class="col s12">\
													<h5><blockquote>'+ name +'</blockquote></h5>\
													<span>\
														'+ comment +'\
														</span>\
														<div>\
														<div class="container">\
														<a class=""><i class="material-icons prefix right collapsible-header grey-text text-darken-2">thumb_up</i></a>\
														<a class=""><i class="material-icons prefix right collapsible-header grey-text text-darken-2">comment</i></a>\
														</div>\
														</div>\
														</div>\
														</div>\
														</div>\
														</div>\
														</div>';
					newVideoComment+= mobileVideoComment;
					mobileVideoComment=newVideoComment;
					
					$('.prevComment-video-mobile').html(newVideoComment);
				}else{
					
					var newVideoComment = '<div class="row">\
						<div class="col s12 m12">\
						<div class="card-panel grey lighten-4">\
						<div class="row valign-wrapper">\
						<div class="col s12 m2 img-forum">\
						<img id="imgForum" src="'+ imgFB +'" alt="" class="circle responsive-img">\
						</div>\
						<div class="col s12 m10">\
						<h5><blockquote>'+ name +'</blockquote></h5>\
						<span>\
						'+ comment +'\
						</span>\
						<div>\
						<div class="container">\
						<a class=""><i class="material-icons prefix right collapsible-header grey-text text-darken-2">thumb_up</i></a>\
						<a class=""><i class="material-icons prefix right collapsible-header grey-text text-darken-2">comment</i></a>\
						</div>\
						</div>\
						</div>\
						</div>\
						</div>\
						</div>\
						</div>';	
					
					newVideoComment+= dekotopVideoComment;
					dekotopVideoComment=newVideoComment;
					
					$('.prevComment-video-desktop').html(newVideoComment);
					
				}
				
				$('.loading').addClass('hide');
				
			}
		}
	});
}

function getAllCommentVideo(){
	var video = $('#titleVideo').text();
	console.log(video);
	var screen;
	if($(window).width() <= 600){
		screen = "mobile"
	}
	else{
		screen = "desktop"
	}
	
	$('.loading').removeClass('hide');
	$.ajax({
		type:'post',
		url: '../php/handler.php',
		data: {getAllCommentVideo:'getAllCommentVideo', video:video, screen:screen},
		success: function(e){
			if(e == "" || e == null || e == 0){
				$('.prevComment-video-mobile').html('<h2 class="center-align">No comment for this video<h2>');
				$('.prevComment-video-desktop').html('<h2 class="center-align">No comment for this video<h2>');
			}
			else{
				if($(window).width() <= 600){
					$('.prevComment-video-mobile').html(e);
					mobileVideoComment = e;
				}
				else{
					$('.prevComment-video-desktop').html(e);
					dekotopVideoComment = e;
				}
			}
			
			$('.loading').addClass('hide');
		}
	})
}

function wew(id, likes){
	$.ajax({
		type: 'post',
		url: '../php/handler.php',
		data: {like:'like', id:id},
		success: function(e){
//			if(e.match('true')){
				console.log(e);
			$('#'+id).find('.likes').text(parseInt($('#'+id).find('.likes').text())+1);
//			}
			
		}
	});
	
	
	
}

function scroll(){
	$('#btnScrollDown').click(function(){
		$('html, body').animate({
			scrollTop: $(".content-area").offset().top
		}, 1000);
	});
}

function materialize(){
	$('.parallax').parallax();
	$('.slider').slider();
	$('.carousel').carousel();
	$('.button-collapse').sideNav();
	$('select').material_select();
	$('.collapsible').collapsible();
	$('.tooltipped').tooltip();
	$('.modal').modal({
		complete: function() { 
			$('#btnReplyComment').unbind( "click" );
			$('#btnReplyForum').unbind( "click" );
		} 
	});
	var options = [
		{
			selector: '#straggeredNews', 
			offset: 200, 
			callback: function(el) {
				Materialize.showStaggeredList($(el));
			} 
		},
		{
			selector: '.titleBox', 
			offset: 50, 
			callback: function(el) {
				Materialize.fadeInImage($(el));
			} 
		},
		{
			selector: '.video-month', 
			offset: 200, 
			callback: function(el) {
				Materialize.fadeInImage($(el));
			} 
		},
		{
			selector: '#newsLetter',
			offset: 200,
			callback: function(el){
				Materialize.showStaggeredList($(el));
			}
		},
		{
			selector: '.section08 ul',
			offset: 200,
			callback: function(el){
				Materialize.showStaggeredList($(el));
			}
		},
		{
			selector: '#videoList',
			offset: 200,
			callback: function(el){
				Materialize.showStaggeredList($(el));
			}
		}


	];
	Materialize.scrollFire(options);
}

function responsive(){
	var windowWidth = $(window).width();

	if(windowWidth <= 600){
		$('.index .section01 .row').removeClass('valign-wrapper');
		$('.index .section03 .row').removeClass('valign-wrapper');
	}
	$(window).resize(function(){

		var windowWidth = $(window).width();

		if(windowWidth <= 600){
			$('.index .section01 .row').removeClass('valign-wrapper');
			$('.index .section03 .row').removeClass('valign-wrapper');
		}
	});
}

function responsiveHomeCards(){
	var height=0;
	$('.index .cards').find('.col').each(function(){
		if(height < $(this).find('.card-content').find('p').height()){
			height = $(this).find('.card-content').find('p').height();
			console.log(height);
		}
	});
	
	$('.index .cards').find('.col').each(function(){
		$(this).find('.card-content').find('p').css('height', height+'px');
	});
	
	$(window).resize(function(){
		var height=0;
		$('.index .cards').find('.col').each(function(){
			if(height < $(this).find('.card-content').find('p').height()){
				height = $(this).find('.card-content').find('p').height();
				console.log(height);
			}
		});

		$('.index .cards').find('.col').each(function(){
			$(this).find('.card-content').find('p').css('height', height+'px');
		});
	});
}

function addLikeVideo(response){
	
	var video = $('#titleVideo').text();
	var name = response.name;
	
	$.ajax({
		type: 'post',
		url: '../php/handler.php',
		data: {addLikeVideo:'addLikeVideo', video:video, name:name},
		success: function(e){
			console.log(e);
			$('#videoLike').find('.videoLike').text(parseInt($('#videoLike').find('.videoLike').text())+1);
			$('#videoLike').find('i').removeClass('grey-text').addClass('blue-text');
			$('#videoLike').unbind('click');
		}
	});
	
}

function getVideoLikes(){
	
	console.log('Logged in.');

	var video = $('#titleVideo').text();
	var name = fbname;

	$.ajax({
		type: 'post',
		url: '../php/handler.php',
		data: {getVideoLikes:'getVideoLikes', video:video, name:name},
		success: function(e){
			console.log(e);
			var jsonArray = JSON.parse(e);
			$('#videoLike').find('.videoLike').text(jsonArray['json'][0]);
			if(jsonArray['json'][1] == null || jsonArray['json'][1] == 0){
				console.log("pasok sa wala")
			}
			else{
				if(jsonArray['json'][1] == 1){
					$('#videoLike').find('i').removeClass('grey-text').addClass('blue-text');
					 Materialize.toast('you already liked this video', 4000);
					$('#videoLike').unbind('click');
				}
			}
		}
	});
	
}

function modalComment(id, name, img, comment){
	$('#imgComment').attr('src',img);
	$('#commentName').find('blockquote').text(name);
	$('#comment').text(comment);
	
	getAllReplies(id);
	
	$('#btnReplyComment').click(function(){
		var reply = $('#txtReplyComment').val();

		FB.getLoginStatus(function(response) {
			if (response.status === 'connected') {
				console.log('Logged in.');
				FB.api('/me', function(response){
					replyComment(id, reply, response.name, response.id);
				});
			}
			else {
				console.log(response);
				FB.login();
				$('#txtCommentVideo01').val("");
			}
		}); 

	});
	
}

function replyComment (id, reply, name, img){
	console.log("pumasok sa replyComment");
	imgFB = 'http://graph.facebook.com/' + img + '/picture?type=normal';
	$('.loading').removeClass('hide');
	
	$.ajax({
		type: 'post',
		url: '../php/handler.php',
		data: {replyComment:'replyComment', id:id, name:name, imgFB:imgFB, reply:reply},
		success: function(e){
			console.log(e);
			if(e.match("true")){
				$('#txtReplyComment').val('');
				$('.number-comments'+id).text(parseInt($('.number-comments'+id).text())+1);
//				$('.number-comments'+id).text()
				if($(window).width() <= 600){
					var replyRenderMobile = '<div class="row">\
					<div class="col s12 m12">\
						<div class="card-panel grey lighten-4">\
							<div class="row">\
								<div class="col s12 center-align">\
								<img  src="'+ imgFB +'" alt="" class="circle responsive-img"> \
										</div>\
										</div>\
										<div class="row">\
											<div class="col s12">\
											<h5><blockquote>'+ name +'</blockquote></h5>\
													<span class="reply">\
														'+ reply +'\
														</span>\
														</div>\
														</div>\
														</div>\
														</div>\
														</div>';
					
					replyRenderMobile+=mobileReply;
					mobileReply=replyRenderMobile
					$('.reply-mobile').html(replyRenderMobile);
					$('.loading').addClass('hide');
				}
				else{
					var replyRenderDesktop = '<div class="row">\
											<div class="col s12 m12">\
											<div class="card-panel grey lighten-4">\
											<div class="row valign-wrapper">\
											<div class="col s12 m2 img-forum">\
											<img id="imgForum" src="'+ imgFB +'" alt="" class="circle responsive-img">\
											</div>\
											<div class="col s12 m10">\
											<h5><blockquote>'+ name +'</blockquote></h5>\
											<span class="reply">\
											'+ reply +'\
											</span>\
											</div>\
											</div>\
											</div>\
											</div>\
											</div>';
					
					replyRenderDesktop+=desktopReply;
					desktopReply=replyRenderDesktop;
					$('.reply-desktop').html(replyRenderDesktop);
					$('.loading').addClass('hide');
				}
				
			}
			
		}
	})
	
}

function getAllReplies(id){
	console.log("pumasok sa getAllReplies");
	var screen='';
	if($(window).width() <= 600){
		screen = "mobile";
	}
	else{
		screen = "desktop";
	}
	
	$('.loading').removeClass('hide');
	
	$.ajax({
		type: 'post',
		url: '../php/handler.php',
		data:{getAllReplies: 'getAllReplies', screen:screen, id:id},
		success: function(e){
			
			if(e == ""){
				$('.reply-mobile').html('<h3 class="center-align">No reply for this comment</h3>');
				$('.reply-desktop').html('<h3 class="center-align">No reply for this comment</h3>');
				$('.loading').addClass('hide');
			}
			else{ 
				if($(window).width() <= 600){
					$('.reply-mobile').html(e);
					mobileReply = e;
					$('.loading').addClass('hide');
				}
				else{
					$('.reply-desktop').html(e);
					desktopReply = e;
					$('.loading').addClass('hide');
				}
			}
			
			
		}
	});
	
}

function getAllRepliesForum(id){
	var screen='';
	if($(window).width() <= 600){
		screen = "mobile";
	}
	else{
		screen = "desktop";
	}
	$('.loading').removeClass('hide');
	$.ajax({
		type: 'post',
		url: 'php/handler.php',
		data: {getAllRepliesForum:'getAllRepliesForum', id:id, screen:screen},
		success: function(e){
			console.log(e+" asdasd");
			if(e == "" || e == null || e == 0){
				$('.reply-mobile').html('<h3 class="center-align">No reply for this comment</h3>');
				$('.reply-desktop').html('<h3 class="center-align">No reply for this comment</h3>');
				$('.loading').addClass('hide');
			}
			else{
				if($(window).width() <= 600){
					$('.reply-mobile').html(e);
					mobileReplyForum = e;
					$('.loading').addClass('hide');
				}
				else{
					$('.reply-desktop').html(e);
					desktopReplyForum = e;
					$('.loading').addClass('hide');
				}
			}
		}
	})
}

function replyForum(id, reply, name, img){
	
	$('.loading').removeClass('hide');
	
	console.log(id+"\n"+reply+"\n"+name+"\n"+img);
	imgFB = 'http://graph.facebook.com/' + img + '/picture?type=normal';

	$.ajax({
		type: 'post',
		url: 'php/handler.php',
		data: {replyForum:'replyForun', id:id, name:name, imgFB:imgFB, reply:reply,},
		success: function(e){
			
			if(e.match('true')){
				$('#txtReplyForum').val('');
				$('.number-comments'+id).text(parseInt($('.number-comments'+id).text())+1);
				if($(window).width() <= 600){
					var replyForumMobile = '<div class="row">\
					<div class="col s12 m12">\
						<div class="card-panel grey lighten-4">\
							<div class="row">\
								<div class="col s12 center-align">\
								<img  src="'+ imgFB +'" alt="" class="circle responsive-img"> \
										</div>\
										</div>\
										<div class="row">\
											<div class="col s12">\
												<h5><blockquote>'+ name +'</blockquote></h5>\
													<span>\
													'+ reply +'\
														</span>\
														</div>\
														</div>\
														</div>\
														</div>\
														</div>';
					replyForumMobile += mobileReplyForum;
					mobileReplyForum = replyForumMobile;
					$('.reply-mobile').html(replyForumMobile);
					$('.loading').addClass('hide');
				}
				else{
					var replyForumDesktop = '<div class="row">\
											<div class="col s12 m12">\
											<div class="card-panel grey lighten-4">\
											<div class="row valign-wrapper">\
											<div class="col s12 m2 img-forum">\
											<img id="imgForum" src="'+ imgFB +'" alt="" class="circle responsive-img"> \
											</div>\
											<div class="col s12 m10">\
											<h5><blockquote>'+ name +'</blockquote></h5>\
											<span class="reply">\
											'+ reply +'\
											</span>\
											</div>\
											</div>\
											</div>\
											</div>\
											</div>';
					replyForumDesktop += desktopReplyForum;
					desktopReplyForum = replyForumDesktop;
					
					$('.reply-desktop').html(replyForumDesktop);
					
					$('.loading').addClass('hide');
				}
				
				
			}else{
				console.log('something happened in backend');
			}
			
		}
	})
}

function modalForum(id, name, img, comment){
	console.log(id+"\n"+name+"\n"+img+"\n"+comment);
	$('#imgModalForum').attr('src', img);
	$('#modalForumName').find('blockquote').text(name);
	$('#modalForumComment').text(comment);
	
	getAllRepliesForum(id);
	
	$('#btnReplyForum').click(function(){
		
		var reply = $('#txtReplyForum').val();
		
		FB.getLoginStatus(function(response) {
			
			if (response.status === 'connected') {
				console.log('Logged in.');
				FB.api('/me', function(response){
					replyForum(id, reply, response.name, response.id);
				});
			}
			else {
				console.log(response);
				FB.login();
				$('#txtCommentVideo01').val("");
			}
		}); 
	});
	
}

$(document).ready(function(){
	
	materialize();
	scroll();
	$('#selectTopic').change(function(){
		getAllForum();
	});
	
	Materialize.updateTextFields();
	responsive();
	responsiveHomeCards();
	
	getAllForum();
	getAllCommentVideo();
	
	
});

//	var fbpopup = window.open("https://www.youtube.com/embed/e-dFcMLA4nE", "pop", "width=600, height=400, scrollbars=no");