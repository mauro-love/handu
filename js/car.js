/**
 * Created by 赖孟良 on 2017/7/3.
 */

$(function(){

    //1，先获取cookie中的数据， 并动态创建节点
    refresh();

    function refresh() {
        var arr = $.cookie("cart");
        var goodslist = "";
        if (arr) {
            arr = JSON.parse(arr); //JSON解析

            //先清空ul中的所有li
            $(".main_goodslist").empty();

            //遍历arr, 创建li节点
            var total = 0; //总价
            var totalCount = 0;  //总商品数量
            for (var i=0; i<arr.length; i++){
                console.log(arr.length);
                var obj = arr[i]; //每个商品数据
                goodslist = "";
            goodslist += `<h2 class="brand">
                    品牌：${obj.brand}
                </h2>
                <ul class="goods_list">
                    <li>
                    <ul class="goods_inventory">
                    <li class="gi_title"> <!--商品图片-->
                    <a href="#">
                        <img src="${obj.img280[0]}" alt="主图">
                    </a>
                    <a href="#">
                    ${obj.name}
                    </a><br />
                    <span>颜色：<span>${obj.color}</span></span>
                <span>尺码：<span>${obj.size}</span></span>
                </li>
                <li class="gi_price">  <!--参考价格-->
                    <span>￥${obj.price}</span><br />
                <span>￥${obj.promotionalPrice}</span>
                </li>
                <li class="gi_number"> <!--数量-->
                    <span class="sub">-</span>
                    <input type="text" name="" id="" value="${obj.num}" />
                    <span class="add">+</span>
                    </li>
                    <li class="gi_subTotal">  <!--实际价格-->
                    <span>￥${parseInt(obj.promotionalPrice)*obj.num}</span>
                </li>
                <li class="gi_dele">  <!-- 选中或者删除-->
                    <input type="checkbox" class="check" >
                    <a href="#" class="del">删除</a>
                    </li>
                    <li class="gi_remarks">  <!--活动信息-->
                    <a href="#">
						${obj.remarks}
            </a>
                </li>
                </ul>
                </li>
                </ul>`;


                //求总价
                if (obj.checked) {
                    total += obj.promotionalPrice * obj.num;
                    totalCount += obj.num;
                }
                $(goodslist).appendTo(".main_goodslist");//添加节点

                if (obj.checked) {
                    $(".check:last").prop("checked",true);
                }else {
                    $(".check:last").prop("checked",false);
                }
            }

            console.log("total: " + total);
            $(".goods_total li").eq(0).find("span").eq(0).html(totalCount);
            $(".goods_total li").eq(0).find("span").eq(2).html(total);
            $(".shopping_total span").html("￥" + total  );
        }
    }

    //删除
    $(".main_goodslist").on("click", ".del", function(e){
        e.stopPropagation();
        console.log(1);
        var index = $(this).index(".del");
        //console.log(index);

        //获取cookie，删掉第index个商品
        var arr = JSON.parse($.cookie("cart"));
        arr.splice(index, 1); //删除数组arr的第index个元素
        $.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});

        isAllChecked(); //判断是否全部选择了商品
        refresh(); //刷新页面
    })

    //+
    $(".main_goodslist").on("click", ".add", function(){
        var index = $(this).index(".add");

        var arr = JSON.parse($.cookie("cart"));
        arr[index].num++;
        $.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});

        refresh(); //刷新页面
    })

    ////-
    $(".main_goodslist").on("click", ".sub", function(){
        var index = $(this).index(".sub");
        console.log(222);
        var arr = JSON.parse($.cookie("cart"));
        arr[index].num--;
        console.log(arr[index].num);
        if (arr[index].num < 1) {
            arr[index].num = 1;
        }
        $.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});

        refresh(); //刷新页面
    })

    //勾选/取消勾选
    $(".main_goodslist").on("click", ".check", function(e){
        e.stopPropagation();
        var index = $(this).index(".check");

        var arr = JSON.parse($.cookie("cart"));
        arr[index].checked = !arr[index].checked;
        $.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});

        isAllChecked();
        refresh();
    })


    //判断是否全选了
    isAllChecked();
    function isAllChecked(){
        var arr = JSON.parse($.cookie("cart"));

        var sum = 0;
        for (var i=0; i<arr.length; i++) {
            sum += arr[i].checked;
        }

        //如果商品全部选中了
        if (sum == arr.length) {
            $(".allCheck").prop("checked", true); //全选
        }
        else {
            $(".allCheck").prop("checked", false); //不全选
        }

    }

    //全选
    $(".allCheck").click(function(){
        var arr = JSON.parse($.cookie("cart"));
        //console.log($(".allCheck").prop("checked"));

        for (var i=0; i<arr.length; i++) {
            if ( $(".allCheck").prop("checked") ){
                arr[i].checked = true;
            }
            else {
                arr[i].checked = false;
            }
        }
        $.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});

        refresh();
    })

    //删除选中
    $(".delSelect").click(function(){
        var arr = JSON.parse($.cookie("cart"));

        /*
         for (var i=0; i<arr.length; i++) {
         if (arr[i].checked) {
         arr.splice(i, 1);
         i--;
         }
         }
         */

        var newArr = [];
        for (var i=0; i<arr.length; i++) {
            if (!arr[i].checked) {
                newArr.push(arr[i]);
            }
        }

        $.cookie("cart", JSON.stringify(newArr), {expires:30, path:"/"});
        refresh();
        window.location.reload();
    })




})

