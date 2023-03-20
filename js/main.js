var windowWidth = $(window).width(),
	windowHeight = $(window).height();
if (windowWidth > 640) {
	$('body,.page,.layer').height(windowHeight).width(windowHeight * 320 / 504);
} else {
	$('body,.page,.layer').height(windowHeight);
}

$("input,select,textarea").blur(function(){
    var _tinput = setTimeout(function(){
    	window.scrollTo({'top':0});
    	clearTimeout(_tinput);
    });
});

function loading(imgArr, callback) {
	if (imgArr.constructor === Array && imgArr.length > 0) {
		var imgAmount = imgArr.length,
			loadAmount = 0,
			percent;
		for (var i = 0; i < imgAmount; i++) {
			var img = new Image();
			img.src = imgArr[i];
			if (img.complete) {
				_update();
				continue;
			}
			img.onload = function() {
				_update();
			}
		}
	} else {
		alert("载入图片资源出错喽");
	}
	function _update() {
		loadAmount++;
		percent = Math.round(loadAmount * 100 / imgAmount);
		$("#load-progress").text(percent);
		if (percent == 100 && callback) {
			$(".loading").remove();
			callback();
		}
	}
}

var t;
function dialogueTips(txt){
	var _html = '<div class="dialogue-tips" id="J_error">'+txt+'</div>';
	if($('.dialogue-tips').size()>0){
		$('.dialogue-tips').remove();
		clearTimeout(t);
	}
	$('body').append(_html);
	t = setTimeout(function(){
		$('#J_error').remove();
		clearTimeout(t);
	},1500);
}

var audio_con = [];
[imgURL+'music.mp3'].forEach(function(v,i){
    var mUsic = new Audio(v);
    mUsic.loop = true;
    audio_con.push(mUsic);
    mUsic = null;
});
document.addEventListener("WeixinJSBridgeReady", function () {
    audio_con.forEach(function(v,i){
        v.load();
        v.play();
        v.pause();
    });
    audio_con[0].play();
}, false);
function playClicked(){
    if(audio_con[0].paused) {
        audio_con[0].play();
        $(".music").removeClass("off").addClass("on")
    }else{
        audio_con[0].pause();
        $(".music").removeClass("on").addClass("off")
    }
}
playClicked();

var windowWidth = $(window).width(),windowHeight = $(window).height(),_re = 480/856;
checkSize();
function checkSize(){
	if(_re>windowWidth/windowHeight){
		$('#L_video .content').css({'height':windowHeight,'width':windowHeight*_re})
	}else{
		$('#L_video .content').css({'width':windowWidth,'height':windowWidth/_re});
	}
}
window.onresize = function(){
	checkSize();
}

var _run = true;
var barrageList = [],_barrageHTML = '';
function loadPage(next) {
	var $page = $('#'+next),
		_checkQuizPage = $page.hasClass('quiz') && next!='quiz1';
	if(_checkQuizPage){
		$page.find('.quiz-result-wrap,.quiz-pro-wrap').addClass('hide');
	}
	if(next=='quiz1'){
		$page.find('.btn-1.btn-poster,.btn-2.btn-share').addClass('hide');
	}
    $('.page-bg-'+next).removeClass("hide").siblings('.page-bg').addClass('hide');

    $('#'+next).removeClass("hide").addClass("animate").siblings('.page').addClass('hide').removeClass('animate');

	if(_checkQuizPage){
		// var _t1 = setTimeout(function(){
		$page.find('.quiz-result-wrap').removeClass('hide');
		// clearTimeout(_t1);
	// },1000);
	}
	if(next=='quiz1'){
		console.log('程序，获取所有弹幕');
		var json = {
			'msg':['一条老街，一个青春。','纵横交错的小路，兜兜转转心里烟火','这里是我们的秘密花园，我闭着眼就能走完所有街头小巷','早起一碗馄饨，是人们的笑脸，老地方的感觉，从来不会改变']
			// 'msg':[]
		}
		barrageList = json.msg;
		for(var i=0;i<8;i++){
			var _data = barrageList[i] || '';
			_barrageHTML += '<p class="barrage-item barrage-item-'+i+' animate">' + _data + '</p>';
		}
		$('#J_barrage').addClass('animate').html(_barrageHTML);
	}
	if(next == 'introduce'){
		$('#J_barrage').removeClass('animate').html('');
	}
	if(next == 'poster'){
		var $swiper = $('#swiper'),_posterID = 1;
		var mySwiper = new Swiper ('#swiper', {
			loop:true,
			slidesPerView:'auto',
			centeredSlides:true,
			// slidesPerView:'-20%',
			onSlideChangeEnd: function(swiper){
		  	}
		});
		dialogueTips('可左右切换查看所有海报。选择您喜欢的保存哦~');
	}
}
$('.link-load').on('click',function(){
	var _this = $(this),
		_next = _this.attr('nextHash'),
		$page = _this.parents('.page');
	if($page.hasClass('quiz')){
		dialogueTips('正在合成……');
		drawImg($page.attr('posterID'),false,function(){
			$('#J_error').remove();
			clearTimeout(t);
			loadPage(_next);
		});
	}else{
		loadPage(_next);
	}
});

$('#J_barrage').on('webkitAnimationEnd animationend','.barrage-item', function () {
	var _this = $(this);
	_this.removeClass('animate');
	console.log('程序，获取新的留言，如果没有，随机更新一条其他的');
	var json = {
		'msg':'6666'
	}
	_this.html(json.msg);
	var _t2 = setTimeout(function(){
		_this.addClass('animate');
		clearInterval(_t2);
	});
});
$('#L_msg').on('click','.texteara-btn',function(){
	$('textarea').blur();
	var _val = $('#L_msg').find('.msg').val();
	if(_val == ''){
		dialogueTips('请输入您想说的话');
	}else{
		if(_run){
			_run = false;
			console.log('程序，提交弹幕');
			console.log(_val)
			$('#L_msg').addClass('hide');
			dialogueTips('提交成功！');
			_run = true;
		}else{
			dialogueTips('正在提交……');
		}
	}
});
// function getRandomArray(Array){
//     var originalArray = Array;
//     originalArray.sort(function(){ return 0.5 - Math.random();});
//     return originalArray;
// }
function RandomNumBoth(Min,Max){
      var Range = Max - Min;
      var Rand = Math.random();
      var num = Min + Math.round(Rand * Range);
      return num;
}

$('#quiz1').on('click','.img03',function(){
	$(this).addClass('hide');
	$('#quiz1').find('.rabbit').addClass('animate').end()
		.find('.btn-1.btn-poster,.btn-2.btn-share').removeClass('hide');
	var _t1 = setTimeout(function(){
		$('#quiz1').find('.quiz-result-wrap').removeClass('hide');
		clearTimeout(_t1);
	},1000);
});

$('.quiz').on('click','.btn-msg',function(){
	$('#L_msg').removeClass('hide').find('textarea').val();
}).on('click','.btn-share',function(){
	var _this = $(this);
	$('#L_share1').removeClass('hide').find('.txt').html('<span>我获得了“' + _this.parents('.page').attr('title') + '”数字藏品，你也来试试</span>');
}).on('click','.quiz-result-wrap .btn3',function(){
	var _this = $(this),
		$page = _this.parents('.quiz');
	$page.find('.quiz-pro-wrap,img.pop-up').removeClass('hide').end()
		.find('.quiz-result-wrap').addClass('hide');
}).on('click','.btn-poster',function(){
	var _this = $(this),
		$page = _this.parents('.quiz');
	$('#L_poster').removeClass('hide')
				.find('.content-2').removeClass('hide').end()
				.find('.content-1').addClass('hide');
	drawImg($page.attr('posterID'),true);
});

$('#L_share1').on('click','.btn-2',function(){
	$('#L_share').removeClass('hide');
	dialogueTips('快来和好友一起认养数字兔~');
});
$('#L_share').on('click',function(){
	$('#L_share').addClass('hide');
});

$('.layer').on('click','.close-layer',function(){
	$(this).parents('.layer').addClass('hide');
});
function drawImg(posterID,showPoster,func){
	var _posterID = parseInt(posterID),
		_no = 123, 	// 需要返回
		_date = new Date();
	var canvas = document.createElement('canvas');
    canvas.width = 1242;
    canvas.height = 2208;
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle="#fff";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    var coverImg = new Image();
    coverImg.src = 'img/p'+(_posterID+2)+'.jpg';
    coverImg.onload = function(){
        ctx.drawImage(coverImg,0,0,canvas.width,canvas.height);
	    var img1 = new Image();
	    img1.src = 'img/p8-1.png';
	    img1.onload = function(){
	        ctx.drawImage(img1,112,342,668,1140);
		    var img2 = new Image();
		    img2.src = 'img/p3-3.png';
		    img2.onload = function(){
		        ctx.drawImage(img2,385,192,1112,1978);
			    var img3 = new Image();
			    img3.src = 'img/p' + (_posterID+2) + '-2.png';
			    img3.onload = function(){
			        ctx.drawImage(img3,385,192,1112,1978);
				    var img4 = new Image();
				    img4.src = 'img/p8-3.png';
				    img4.onload = function(){
				        ctx.drawImage(img4,0,0,1242,2208);
				        ctx.font='55px Microsoft YaHei';
				        ctx.fillStyle = '#794613';
				        ctx.textAlign = 'center';
				        ctx.fillText($('#quiz'+posterID).attr('title') + '数字藏品',450,830);
				        ctx.fillText('NO.'+_no,450,920);
				        // ctx.fillText(['小兔','产权兔','文艺兔','国际兔','数据兔'][_posterID-1],450,1010);
				        ctx.fillText(_date.getFullYear() + '-' + (_date.getMonth()+1) + '-' + _date.getDate(),450,1100);
				        var _posterImg = canvas.toDataURL("image/jpeg");
				        if(showPoster){
					        $('#L_poster').find('.poster-img').attr('src',_posterImg);
					        var _t1 = setTimeout(function(){
						        $('#L_poster').find('.content-1').removeClass('hide').end()
											.find('.content-2').addClass('hide');
						        dialogueTips('请长按屏幕并保存您的数字藏品海报',5000);
						        clearTimeout(_t1);
					        },1000);
				        }else{
				        	$('#poster').find('.swiper-wrapper').append('<div class="swiper-slide"><img src="' + _posterImg + '" /></div>');
				        	func();
				        }
				    }
				}
			}
	    }
    }
}

$('#introduce').on('click','.btn-play-video',function(){
	var _this = $(this);
	startVideo(_this.attr('videoID'));
});
/*.on('click','.img06',function(){
	$('#L_share').removeClass('hide');
});*/
$('.end-video').on('click',function(){
	endVideo();
});

var videoList,currVideo;
function startVideo(videoID){
	var _html = '<video src="' + imgURL + 'video' + videoID + '.mp4?v=3.1" poster="img/poster' + videoID + '.png?v=3.1" preload="auto" x-webkit-airplay="allow" x5-playsinline="" webkit-playsinline="" playsinline="true"></video>';
	$('#L_video .content,#introduce .video-content').html('');
	if(videoID ==1){
		$('#introduce').find('.video-content').removeClass('hide').html(_html).end()
						.find('.btn-video').addClass('hide').end()
						.find('.end-video').removeClass('hide');
		videoList = [$("#introduce video")[0]];
		currVideo = videoList[0];
	}else{
		$('#L_video').removeClass('hide').find('.content').html(_html);
		videoList = [$("#L_video video")[0]];
		currVideo = videoList[0];
	}
	videoList.forEach(function(v,i){
		v.load();
		v.play();
		v.pause();
	});
	$('.music').addClass('hide');
	audio_con[0].pause();
	// currVideo.currentTime = 0;
	currVideo.play();
}

function endVideo(){
	$('#introduce').find('.btn-video').removeClass('hide').end()
					.find('.end-video').addClass('hide');
	currVideo.pause();
	$('.music').removeClass('hide');
	$('#L_video').addClass('hide');
	if($('.music').hasClass('on')){
		audio_con[0].play();
	}	
}

var loadRES = ['img/p1-1.png','img/p1-2.png','img/p1-3.png','img/p1-4.png','img/p1-5.png','img/p2-1.png','img/p2-2.png','img/p2-3.png','img/p2-4.png','img/p2-5.png','img/p2-6.png','img/p2-7.png','img/p2-8.png','img/p3-1.png','img/p3-2.png','img/p3-3.png','img/p3-4.png','img/p3-5.png','img/p3-6.png','img/p3-7.png','img/p3-8.png','img/p5-2.png','img/p5-3.png','img/p1.jpg','img/p2.jpg','img/p3.jpg','img/p4.jpg','img/p5.jpg','img/p6.jpg','img/p7.jpg','img/p2-9.png','img/p3-9.png','img/units-icons.png','img/p4-2.png','img/p4-3.png','img/p4-4.png','img/p4-5.png','img/p4-6.png','img/p4-7.png','img/p4-8.png','img/p5-2.png','img/p5-3.png','img/p6-2.png','img/p6-3.png','img/p7-2.png','img/p7-3.png'];
loading(loadRES,function(){
	loadPage('welcome');
});