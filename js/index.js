
//添加banner图片
$(function(){
	$.get("json/banner.json",function(d){     //获取图片
		var arr = d;
		for(var i = 0 ; i < arr.length ; i ++){
			var obj = arr[i];
			console.log(113)
			$("<div class='content'><a href='#'></a></div>").appendTo($("#index_lb"))
			for(var j = 0; j < obj.img.length ; j ++){
				$("<div></div>").appendTo($("#index_lb>div>a"));
				console.log(111)
				$("#index_lb a div:last").css({"background":"url(" + obj.img[j] + ")",height:"90px"})
			}

		}
//      opactyChange("#index_lb")
		console.log($("#index_lb>div").size())	
	})
	

function opactyChange(obj){
	//默认显示第一张图
	$(obj + "div:first").css({opacity : '1',filter : "alpha(opacity=100)"});
	//默认第一个小图片是选中的
	$(obj + "ul li:first").css({opacity : '1',filter : "alpha(opacity=100)"});
	
	
	//自动轮播
	var i = 0; //即将显示的图片下标
	var timer = setInterval(function(){
		i++;
		move();
	}, 2000);
	
	function move(){
		if (i >= $(obj + ">div").size()) {
			i = 0;
		}
		
		for (var j=0; j<$(obj + ">div").size(); j++){
			if (i == j) {
				animate($(obj + ">div").eq(i), {opacity:100}); //显示大图
				animate($(obj + " ul li:first"), {opacity:100}); //显示小图
			}
			else { 
				animate($(obj + ">div").eq(j), {opacity:0}); //隐藏大图
				animate($(obj + " ul li").eq(j), {opacity:30}); //隐藏小图
			}
		}
	}	
	
	for (var j=0; j<$(obj + ">ul>li").size(); j++) {
		(function(j2,obj2){
			$(obj2+">ul>li").eq(j2).onmouseenter = function(){
				i = j2
				move();
			}
		})(j,obj)
	}
	
	$(obj).onmouseenter = function(){
		clearInterval(timer);
	}
	$(obj).onmouseleave = function(){
		timer = setInterval(function(){
			i++;
			move();
		}, 2000);
	}
}
})