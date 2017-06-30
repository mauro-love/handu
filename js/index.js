

$(function(){
//	二级导航栏显示隐藏
	$(".yMenuIndex").on('mouseenter',".fright",function(){
		$('.zix_x').show();
		console.log(this)
		$(this).css("border-bottom","1px solid red")
	})
	$(".yMenuIndex").on('mouseleave',".fright",function(){
		$('.zix_x').hide();
	})
	//添加banner图片
	$.get("../json/banner.json",function(d){     //获取图片
		var arr = d;
		for(var i = 0 ; i < arr.length ; i ++){
			var obj = arr[i];
//			console.log(i)
			var str = "<div class='content'><a href='#'>";
//			$("<div class='content'><a href='#'></a></div>").appendTo($("#index_lb"))
			for(var j = 0; j < obj.img.length ; j ++){
				str += `<div style='background: url("${obj.img[j]}") center; height: 90px'></div>`;
//				$("<div></div>").appendTo($("#index_lb>div>a:last"));
//				$("#index_lb a div:last").css({"background":"url(" + obj.img[j] + ") center",height:"90px"})
			}
			str += "</a></div>" 
//			var jImg = obj.img.pop()
//			console.log(jImg)
//			console.log(str)
			$(str).appendTo($('#index_lb'))

		}
        opactyChange();
//		console.log($("#index_lb>div").size())	
	})
	
//	透明度轮播
	function opactyChange(){
		var oBox = $("#index_lb");
		var aLi = $(".content");
		
		var oList2 = $(".tab");
		var aLi2 = $(".tab li");
		
		//默认显示第一张图
		$(aLi).eq(0).css("opacity","1");
		$(aLi).eq(0).css("filter","alpha(opacity=100)");

		//默认第一个小图片是选中的
		$(aLi2).eq(0).addClass("active");
		
		
		//自动轮播
		var i = 0; //即将显示的图片下标
		var timer = setInterval(function(){
			i++;
			move();
		}, 2000);
		
		function move(){
			if (i >= aLi.length) {
				i = 0;
			}
			
			for (var j=0; j<aLi.length; j++){
				if (i == j) {
					animate(aLi[i], {opacity:100}); //显示大图
					$(aLi2).eq(i).addClass("active").siblings().removeClass("active"); //显示小图
				}
				else { 
					animate(aLi[j], {opacity:0}); //隐藏大图
//					$("aLi[ " + j + "]").removeClass("active");//换小图
				}
			}
		}
		
		
		for (var j=0; j<aLi2.length; j++) {
			aLi2[j].index = j;
			aLi2[j].onmouseenter = function(){
				i = this.index;
				move();
			}
		}
		
		oBox.onmouseenter = function(){
			clearInterval(timer);
		}
		oBox.onmouseleave = function(){
			timer = setInterval(function(){
				i++;
				move();
			}, 2000);
		}
	}
//	滚动事件触发显示/隐藏
	$(window).on("scroll",function(){
		if($(this).scrollTop() > 650){
			$(".float_box").show(500);
			$("#xf_search").show(500);
		}
		else{
			$(".float_box").hide(500);
			$("#xf_search").hide(500);
		}
	})
//	tab效果
		$("#brand_list2").find("div").first().show().siblings().hide();
		$("#brand_list li").eq(0).find("a").addClass("mouseon");
		$(`#brand_list li a`).mouseenter(function(){
			$(this).addClass("mouseon").parent().siblings().find("a").removeClass("mouseon");
			var index = $(this).parent().index();
			$(`#brand_list2 div`).eq( index ).show().siblings().hide();
		})

//	手风琴效果
//		初始默认状态
		$(".main_hStyle_range>ul>li").eq(0).css("height","130px");
		$(".main_hStyle_range>ul>li:first>a>div").css("display","none");
		$(".main_hStyle_range>ul>li:first>a>ul").css("display","block");

		$(".main_hStyle_range>ul>li").mouseenter(function(){
			//$(this).addClass("active").siblings().removeClass("active");
			//改变li的高度
			$(this).stop().animate({height:130},300)
			.siblings().stop().animate({height:36},300);
			$(this).find("div").css("display","none");
			$(this).find("ul").css("display","block");
			$(this).siblings().find("div").css("display","block");
			$(this).siblings().find("ul").css("display","none");
			
			
		})
//韩风时尚女装添加图片
		
		$.get("../json/goods.json",function(d){
			let arr = d;
			let obj1 = arr[0];
			let obj2 = arr[1];
			let str = "<ul class='list'>";
			for(let i = 0; i < obj1.img280.length ; i ++){
				str += `<li><a href="#" style="background:url(${obj1.img280[i]}) no-repeat"></a><span>￥</span><span>${obj1.promotionalPrice}</span><span>￥${obj1.price}</span><div>立即购买</div></li>`
			}
			str+="</ul><ul class='list'>";
			for(let j = 0; j < obj2.img280.length ; j ++){
				str += `<li><a href="#" style="background:url(${obj2.img280[j]}) no-repeat"></a><span>￥</span><span>${obj2.promotionalPrice}</span><span>￥${obj2.price}</span><div>立即购买</div></li>`
			}
			str+="</ul>";
			$(str).appendTo($(".main_hStyle"));
		})
//韩风时尚妈妈添加图片		
		$.get("../json/goods.json",function(d){
			let arr = d;
			let obj1 = arr[2];
			let str = "<ul class='list'>";
			for(let i = 0; i < obj1.img280.length ; i ++){
				str += `<li><a href="#" style="background:url(${obj1.img280[i]}) no-repeat"></a><span>￥</span><span>${obj1.promotionalPrice}</span><span>￥${obj1.price}</span><div>立即购买</div></li>`
			}
			str+="</ul>";
			$(str).appendTo($(".main_hStyleMother"));
		})
//韩风时尚少女	添加图片	
		$.get("../json/goods.json",function(d){
			let arr = d;
			let obj1 = arr[3];
			let str = "<ul class='list'>";
			for(let i = 0; i < obj1.img280.length ; i ++){
				str += `<li><a href="#" style="background:url(${obj1.img280[i]}) no-repeat"></a><span>￥</span><span>${obj1.promotionalPrice}</span><span>￥${obj1.price}</span><div>立即购买</div></li>`
			}
			str+="</ul>";
			$(str).appendTo($(".main_hStyleGirl"));
		})
//	韩风时尚男童添加图片		
		$.get("../json/goods.json",function(d){
			let arr = d;
			let obj1 = arr[4];
			let str = "<ul class='list'>";
			for(let i = 0; i < obj1.img280.length ; i ++){
				str += `<li><a href="#" style="background:url(${obj1.img280[i]}) no-repeat"></a><span>￥</span><span>${obj1.promotionalPrice}</span><span>￥${obj1.price}</span><div>立即购买</div></li>`
			}
			str+="</ul>";
			$(str).appendTo($(".main_hStyleBoy"));
		})
//		欧美时尚添加图片	
		$.get("../json/goods.json",function(d){
			let arr = d;
			let obj1 = arr[0];
			let str = "<ul class='list'>";
			for(let i = 0; i < obj1.img280.length ; i ++){
				str += `<li><a href="#" style="background:url(${obj1.img280[i]}) no-repeat"></a><span>￥</span><span>${obj1.promotionalPrice}</span><span>￥${obj1.price}</span><div>立即购买</div></li>`
			}
			str+="</ul>";
			$(str).appendTo($(".main_eStyle"));
		})
		
		
		
		
//返回顶部
		$(".float_box").eq(3).click(function(e){
			e.preventDefault();
			$("html,body").scrollTop();
			$("html,body").animate({"scrollTop":0},1000);
		})
//关闭广告
		$(".ads_btn").on("click",function(){
			$("#ads").css("display","none");
		})

})


//改变品牌模块