/**
 * Created by 赖孟良 on 2017/7/2.
 */
$(function(){

    $.get("../json/goods.json",function(d){     //获取图片
        var arr = d;
        var str = "";   //存放添加放大镜节点
        var goodsImg = "";  //存放商品详情图片节点
        var goodsTitle = ""   //存放商品标题节点
        var goodsSize =""    //存放商品规格节点
        var goodsColor = "" //存放商品颜色节点
        var url = location.href; //获取到整个地址
        var id = url.split("?")[1].split("=")[1];
        var obj={};
        for(var i = 0 ; i < arr.length; i ++){
            obj = arr[i];
            if(id == obj.id){

                //存放添加放大镜节点
                str = `<div class="smallImg">
									<img src="${obj.img280[0]}"/>
									<div class="smallScale">
									</div>
								</div>
								<div class="bigScale">
									<img src="${obj.img800[0]}" class="bigImg"/>
								</div>
								<ul>
									<li><img src="${obj.img280[0]}"/></li>
									<li><img src="${obj.img280[1]}"/></li>
									<li><img src="${obj.img280[2]}"/></li>
									<li><img src="${obj.img280[3]}"/></li>
									<li><img src="${obj.img280[4]}"/></li>
								</ul>`;

                //存放商品详情图片节点
                for(var j = 0 ; j < obj.img800.length ; j++){
                    goodsImg += `<img src="${obj.img800[j]}" alt="快来买吧哈哈哈">`
                }

                //存放商品标题节点
                goodsTitle = `								<h4>
									${obj.name}
								</h4>
								<ul>
									<li>商品货号：<span>${obj.number}</span></li>
									<li>售价：<span>${obj.price}</span></li>
									<li>促销价：<span>${obj.promotionalPrice}</span></li>
									<li>销量：<span>${obj.salesCount}</span>件</li>
									<li>用户评分：
										<span></span>(共有${obj.comment}条评论)</li>
								</ul>
`

                //存放商品规格节点
                for (var k = 0 ; k < obj.size.length ; k ++){
                    goodsSize += `<li>${obj.size[k]}</li>`
                }
                //存放商品颜色节点
                for (var k = 0 ; k < obj.color.length ; k ++){
                    goodsColor += `<li>${obj.color[k]}</li>`
                }



            }
        }

        $(str).appendTo($(".glass"));   //添加放大镜
        $(goodsTitle).appendTo($(".gdtr_title"));     //添加商品标题部分
        $(goodsSize).appendTo($(".gdtr_scale_size>ul"))//存放商品规格节点
        $(".gdtr_scale_size>ul>li").eq(0).addClass("size_color_on").siblings().removeClass("size_color_on");  //默认选中
        $(".gdtr_scale_choice span").eq(0).html( $(".gdtr_scale_size>ul>li").eq(0).html());
         $(goodsColor).appendTo($(".gdtr_scale_color>ul"))//存放商品y颜色节点
        $(".gdtr_scale_color>ul>li").eq(0).addClass("size_color_on").siblings().removeClass("size_color_on");//默认选中
        $(".gdtr_scale_choice span").eq(1).html( $(".gdtr_scale_color>ul>li").eq(0).html());

        $(goodsImg).appendTo($(".goodsDetail_tabList_img"));  //添加商品详情图片
        glass();
        tabImg(id,arr);
    })

    //点击尺寸
    $(".gdtr_scale_size>ul").on("click","li",function(){
        $(this).addClass("size_color_on").siblings().removeClass("size_color_on");
        $(".gdtr_scale_choice span").eq(0).html($(this).html());
    })
    //点击尺寸
    $(".gdtr_scale_color>ul").on("click","li",function(){
        $(this).addClass("size_color_on").siblings().removeClass("size_color_on");
        $(".gdtr_scale_choice span").eq(1).html($(this).html());
    })
    //点击减少数量

    $(".changeNumber").eq(0).on("click",function(e){
        e.preventDefault();
        var i = $(".gdtr_scale_num input").val();
        if(i <=1){
            i=1;
        }
        else {
            i--;
        }
        $(".gdtr_scale_num input").val(i);
    })
    ////点击增加数量
    $(".changeNumber").eq(1).on("click",function(e){
        e.preventDefault();
        var i = $(".gdtr_scale_num input").val();
        if(i >= 100){
            i=100;
        }
        else {
            i++;
        }
        $(".gdtr_scale_num input").val(i);
    })


    //放大镜方法
    function glass(){
        //小图width/大图width == 小区域width/大区域width
        $(".smallScale").width( $(".smallImg").width() * $(".bigScale").width() / $(".bigImg").width() );
        $(".smallScale").height( $(".smallImg").height() * $(".bigScale").height() / $(".bigImg").height() );

        //放大系数
        var scale = $(".bigImg").width() / $(".smallImg").width();

        //在小图中移动
        $(".smallImg").mousemove(function(e){
            $(".smallScale").show(); //显示小区域
            $(".bigScale").show(); //显示大区域


            var x = e.pageX - $(".smallImg").offset().left - $(".smallScale").width()/2;
            var y = e.pageY - $(".smallImg").offset().top - $(".smallScale").height()/2;

            //控制不超出左右边界
            if (x < 0){
                x = 0;
            }
            else if (x > $(".smallImg").width()-$(".smallScale").width()){
                x = $(".smallImg").width()-$(".smallScale").width();
            }
            //控制不超出上下边界
            if (y < 0){
                y = 0
            }
            else if (y > $(".smallImg").height()-$(".smallScale").height()) {
                y = $(".smallImg").height()-$(".smallScale").height();
            }

            //小区域移动
            $(".smallScale").css({left:x, top:y});
            //大图移动
            $(".bigImg").css({left: -scale*x,top: -scale*y});
        })

        //移除小图
        $(".smallImg").mouseleave(function(){
            $(".smallScale").hide(); //隐藏小区域
            $(".bigScale").hide(); //隐藏大区域
        })
    }
    //点击小图片切换大图片
    function tabImg(id,arr){
        //获取当前商品对象
        var obj1 = {};
        for(var i = 0 ;i < arr.length;i ++ ){
            var obj = arr[i];
            if(id == obj.id){
                obj1 = JSON.parse(JSON.stringify(obj));
            }
        }
        //设置初始值
        $(".glass>ul>li").eq(0).addClass("clickOn");

        $(".glass>ul").on("click","li",function (){
            $(this).addClass("clickOn").siblings().removeClass("clickOn");
            var index = $(this).index();
            $(".smallImg>img").attr("src",$(this).find("img")[0].src);
            $(".bigImg").attr("src",obj1.img800[index]);

        })
    }
    //切换商品详情评价常见问题
    //设置初始值
    $(".goodsDetail_bottom_tab>ul>li").eq(0).addClass("gd_tabList_on");
    $(".goodsDetail_tabList>li").eq(0).show();
    $(".goodsDetail_bottom_tab>ul").on("click","li",function (){
        $(this).addClass("gd_tabList_on").siblings().removeClass("gd_tabList_on");
        var index = $(this).index();
        $(".goodsDetail_tabList>li").eq(index).show().siblings().hide();

    })

    //关闭广告
    $(".ads_btn").on("click",function(){
        $("#ads").css("display","none");
    })

})