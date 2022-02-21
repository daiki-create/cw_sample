(function($){
    $.fn.simpleSlider = function(options){
        var defaults = {
            next : '', //NEXTボタンになるクラス
            prev : '', //PREVボタンになるクラス
            speed: 400, //アニメーションスピード
            easing: 'swing' //アニメーションの動き
        };
        var setting = $.extend(defaults,options);
        //スライドさせる要素(li)を変数に格納
        var itemC = this.find("li");
        //要素の幅取得(margin含む)
        var itemW = this.find(itemC).outerWidth(true);
        //要素の数取得
        var itemN = this.find(itemC).length;
        //要素の親(ul)
        var itemP = this.find("ul");
        //親の幅を指定(要素の幅×要素の数)
        this.find(itemP).css({width: itemW * itemN+"px"});
        //スライド囲み
        //var slider = this.find(".sliderWrap");
        //スライドスピード
        var speed = setting.speed;
        //アニメーションイージング
        var easing = setting.easing;

        if( itemN > 3 ){
            if( setting.next == '' ){
                //指定が無いならbutton要素を追加
                var btnLeft = this.find('.slideNext');
            }else{
                var btnLeft = setting.next;
            }
            if( setting.prev == '' ){
                //指定が無いならbutton要素を追加
                var btnRight = this.find('.slidePrev');
            }else{
                var btnRight = setting.prev;
            }
        }

        //NEXTボタン処理
        $( btnLeft ).click(function(){
                itemP.not(":animated").animate({marginLeft: -itemW+"px"},speed,easing,function(){
                var firstItem = itemP.find("li").filter(":first").detach();
                itemP.css('marginLeft', '0px').append(firstItem);
            });
        });

        //PREVボタン処理
        $( btnRight ).click(function(){
                if( !(itemP.is(":animated")) ){
                    var lastItem = itemP.find("li").filter(":last").detach();
                    itemP.prepend(lastItem).css("marginLeft", -itemW+"px").animate({marginLeft: "0px"},speed,easing);
                };
        });
    };
})(jQuery);
