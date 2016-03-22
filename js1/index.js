//数据绑定
function bindData() {
    var leftTop = document.getElementById("left_top");
    var str = "";
    for (var i = 0; i < dataAry.length; i++) {
        var cur = dataAry[i];
        str += "<div class='menu_box'>";
        str += "<div class='menu_box_title'>";
        str += "<h2>" + cur['title'] + "<span></span></h2>";
        for (var j = 0; j < cur['items'].length; j++) {
            var curA = cur['items'][j];
            str += "<a href='javascript:;'>" + curA + "</a>";
        }
        str += "</div>";
        str += "<div class='menu_box_list'>";
        for(var m=0;m<cur['pushes'].length;m++){
            var curM=cur['pushes'][m];
            str += "<dl>";
            str += "<dt>";
            str += "<a href='javascript:;'>" + curM['pushTitle'] + "</a>";
            str += "</dt>";
            str += "<dd>";
            for (var n = 0; n < curM['pushItems'].length; n++) {
                var curP=curM['pushItems'][n];
                str += "<a href='javascript:;'>" +  curP+ "</a>";
            }
            str += "</dd>";
            str += "</dl>";
        }

        str += "</div>";
        str += "</div>";
    }
    leftTop.innerHTML = str;
}
//左侧导航
(function () {
    bindData();
    var leftTop = document.getElementById("left_top");
    var menuBox = utils.getElementsByClass("menu_box", leftTop);
    var menuBoxTitle = utils.getElementsByClass("menu_box_title", leftTop);
    var menuBoxList = utils.getElementsByClass("menu_box_list", leftTop);
    //console.log(menuBox,menuBoxList);
    for (var i = 0; i < menuBoxTitle.length; i++) {
        ~function (i) {
            var curBox=menuBoxTitle[i];
            curBox.onmouseover = function () {
                menuBoxList[i].style.display = "block";
                menuBoxList[i].style.top = -i*5+"px";
                menuBoxTitle[i].style.background = "#fff";
                menuBoxTitle[i].style.border = "2px solid #c9cbce";
                menuBoxTitle[i].style.borderRight = "2px solid transparent";
                //menuBoxList[i].style.zIndex=9;
                menuBoxTitle[i].style.zIndex=103;
            };
            curBox.onmouseout = function () {
                menuBoxList[i].style.display = "none";
                menuBoxTitle[i].style.background = "#fafafa";
                menuBoxTitle[i].style.border = "2px solid #fafafa";
                menuBoxTitle[i].style.zIndex=101;
            };
        }(i);
    }
})();
//轮播图
(function () {
    //->数据源
    //->定义几个初始的变量
    var autoTimer = null, step = 0, count = 3;

    var topBannerL = document.getElementById("top_banner_l"), imgList1 = topBannerL.getElementsByTagName("img");
    var bannerControl = document.getElementById("banner_control"), oLis = bannerControl.getElementsByTagName("li");
    var imgList2 = bannerControl.getElementsByTagName("img");
    var oEm = document.getElementById("em1");
    //->数据绑定
    //->图片延迟加载
    window.setTimeout(lazyImg, 500);
    function lazyImg() {
        for (var i = 0; i < imgList1.length; i++) {
            ~function (i) {
                var curImg = imgList1[i];
                var oImg = new Image;
                oImg.src = curImg.getAttribute("trueImg");
                oImg.onload = function () {
                    curImg.src = this.src;
                    curImg.style.display = "block";
                    animate(curImg, {opacity: 1}, 500);
                }
            }(i);
        }
    }

    //->实现图片控制样式的选中
    function selectTip() {
        var tempStep = step;
        tempStep >= oLis.length ? tempStep = 0 : null;
        for (var i = 0; i < oLis.length; i++) {
            oEm.style.top = 55 * (tempStep) + "px";
            imgList2[i].className = i === tempStep ? "bg" : null;

        }
    }

    //->实现右侧小图片的划过控制切换轮播图
    tipMove();
    function tipMove() {
        for (var i = 0; i < oLis.length; i++) {
            var curTip = oLis[i];
            curTip.index = i;
            curTip.onmouseover = function () {
                window.clearInterval(autoTimer);
                step = this.index;
                animate(topBannerL, {top: -step * 160}, 300);
                selectTip();
                autoTimer = window.setInterval(autoMove, 2000);
            }
        }
    }

    //->实现自动轮播
    function autoMove() {
        step++;
        if (step > count) {
            step = 1;
            topBannerL.style.top = 0;
        }
        animate(topBannerL, {top: -step * 160}, 300);
        selectTip();
    }

    autoTimer = window.setInterval(autoMove, 2000);
})();
//鼠标滑过
(function () {
    var allMove = document.getElementById("all_move"), oLis = allMove.getElementsByTagName("li"), imgList = allMove.getElementsByTagName("img");
    var oDivs = allMove.getElementsByTagName("div");

    for (var i = 0; i < oLis.length; i++) {
        var cur = oLis[i];
        ~function (i) {
            cur.onmouseenter = function (e) {
                e = e || window.event;
                //console.log(this);
                e.target = e.target || e.srcElement;
                var left = utils.offset(imgList[i]).left;
                var top = utils.offset(imgList[i]).top;
                var liLeft = imgList[i].offsetWidth;
                var liTop = imgList[i].offsetHeight;
                if (e.pageX < liLeft || e.pageY < liTop || e.pageX > (liLeft + imgList[i].offsetWidth) || e.pageY > (liTop + oLis[i].offsetHeight)) {
                    e.target.style.display = "block";
                    e.target.style.left = 0;
                    e.target.style.top = 0;
                }

            };
            cur.onmousemove = function (e) {
                e = e || window.event;
                if (oDivs[i]) {
                    oDivs[i].style.left = 0;
                    oDivs[i].style.top = 0;
                }
            };
            cur.onmouseleave = function (e) {
                e = e || window.event;
                oDivs[i].style.display = "block";

                var left = utils.offset(oDivs[i]).left;
                var top = utils.offset(oDivs[i]).top;
                var liLeft = utils.offset(imgList[i]).left;
                var liTop = utils.offset(imgList[i]).top;

                if (e.pageX < liLeft && (e.pageY - top) > 0 && (e.pageY - top) < 112) {
                    oDivs[i].style.left = "-100%";
                    oDivs[i].style.top = 0;

                } else if (e.pageY < liTop && e.pageX - liLeft > 0 && e.pageX - liLeft < 112) {
                    oDivs[i].style.left = 0;
                    oDivs[i].style.top = "-100%";

                } else if (e.pageX > (liLeft + imgList[i].offsetWidth) && e.pageY - top > 0 && e.pageY - top < 112) {
                    oDivs[i].style.left = "100%";
                    oDivs[i].style.top = 0;

                } else
                //if (e.pageY > (liTop + oLis[i].offsetHeight) && e.pageX - left > 0 && e.pageX - left < 112)
                {
                    oDivs[i].style.left = 0;
                    oDivs[i].style.top = "100%";

                }
            }
        }(i);
    }
})();
//回到顶部
(function () {
    var scrollObj = new scrollModel({
        selector: "backtop",
        duration: 500
    });
    scrollObj.init();
})();
//职位选项卡
(function(){
    var jobTab=document.getElementById("job_tab");
    jobTab.onclick = function (e) {
        //->e:事件对象
        e = e || window.event;
        var tar = e.target || e.srcElement;
        //->如果tar是我们点击的这个页卡的li
        if (tar.tagName="li") {
            changeTab.call(tar);
        }
    };
})();
//选项卡方法
function changeTab() {
    utils.addClass(this, "job_tab_select");
    var siblingLi = utils.siblings(this);
    for (var i = 0; i < siblingLi.length; i++) {
        utils.removeClass(siblingLi[i], "job_tab_select");
    }

    var divList = utils.nextAll(this.parentNode), index = utils.getIndex(this);
    for (i = 0; i < 2; i++) {
        var curDiv = divList[i];
        i === index ? utils.addClass(curDiv, "tab_select") : utils.removeClass(curDiv, "tab_select");
    }
}
(function(){
    function openNew(){
        //获取页面的高度和宽度
        var sWidth=document.body.scrollWidth;
        var sHeight=document.body.scrollHeight;
        //获取页面的可视区域高度和宽度
        var wHeight=document.documentElement.clientHeight;
        var oMask=document.createElement("div");
        oMask.id="mask";
        oMask.style.height=sHeight+"px";
        oMask.style.width=sWidth+"px";
        document.body.appendChild(oMask);
        var oCity=document.createElement("div");
        oCity.id="city";
        oCity.innerHTML="<div class='changeCity'><div id='close'>点击关闭</div></div>";
        document.body.appendChild(oCity);
        //获取城市切换框的宽和高
        var dHeight=oCity.offsetHeight;
        var dWidth=oCity.offsetWidth;
        //设置城市切换框的left和top
        oCity.style.left=sWidth/2-dWidth/2+"px";
        oCity.style.top=wHeight/2-dHeight/2+"px";
        //点击关闭按钮
        var oClose=document.getElementById("close");

        //点击城市切换框以外的区域也可以关闭登陆框
        oClose.onclick=oMask.onclick=function(){
            document.body.removeChild(oCity);
            document.body.removeChild(oMask);
        };
    }
    window.onload=function(){
            var oBtn=document.getElementById("changeCity_btn");
            //点击登录按钮
            oBtn.onclick=function(){
                openNew();
                return false;
            }
        }
})();



















































/*     var left = utils.offset(imgList[i]).left;
 var top = utils.offset(imgList[i]).top;
 var liLeft = imgList[i].offsetWidth;
 var liTop = imgList[i].offsetHeight;

 this["mouseX"] = e.pageX-left;
 this["mouseY"] = e.pageY-top;

 if (this.mouseX<=this.mouseY&&this.mouseX+this.mouseY<liTop) {
 utils.setCss(e.target, "left", "-100%");
 utils.setCss(e.target, "top", 0);
 animate(e.target,{left:0,top:0});
 }
 if (this.mouseX<=this.mouseY&&this.mouseX+this.mouseY>liTop) {
 utils.setCss(e.target, "left", 0);
 utils. setCss(e.target, "top", "100%");
 animate(e.target,{left:0,top:0});
 }
 if (this.mouseX>=this.mouseY&&this.mouseX+this.mouseY<liTop) {
 utils.setCss(e.target, "left", 0);
 utils.setCss(e.target, "top", "-100%");
 animate(e.target,{left:0,top:0});
 }
 if (this.mouseX>=this.mouseY&&this.mouseX+this.mouseY>liTop) {
 utils.setCss(e.target, "left", "100%");
 utils. setCss(e.target, "top", 0);
 animate(e.target,{left:0,top:0});
 }
 */





































