var showmap = function(startY,startX,startZoom) {
    //範囲指定
    var timrag = 7;
    var timinterbal = 5;
    var max_back = 4;
    var map_all = [[50, 120], [10, 150]];//左上、右下　緯度経度だから…ｙxの順
    var Basic_Map = new Array();
    Basic_Map[ 0 ] = L.tileLayer('https://www.jma.go.jp/tile/gsi/pale/{z}/{x}/{y}.png ', {//色付きの大陸など
        zoom: 3,
        minZoom: 2,
        maxZoom: 9,
        maxBounds: map_all,
        zoomControl: true
    });
    //layer(レーダ)
    var Layer_Map = new Array();
    var time = new Array();
    var showtime = "{MM}月{DD}日{HH}時{mm}分";//時刻部分
    document.getElementById("time").innerText = geturl(showtime,timrag,timinterbal,0);
    var baseurl="https://www.jma.go.jp/bosai/jmatile/data/nowc/{YYYY_UTC}{MM_UTC}{DD_UTC}{HH_UTC}{mm_UTC}00/none/{YYYY_UTC}{MM_UTC}{DD_UTC}{HH_UTC}{mm_UTC}00/surf/hrpns/";
    for(var i=0;i<=4;i++){
        baseurl_0 = geturl(baseurl,timrag,timinterbal,i);//URL,タイムラグ,更新間隔,戻る枚数
            Layer_Map[ i ] = L.tileLayer(baseurl_0+'{z}/{x}/{y}.png', {
            minZoom: 4,
            minNativeZoom: 6,
            maxNativeZoom: 6,        
            maxZoom: 9,       
            opacity:0.7,
            className: "hogehogehoge"+i,
            maxBounds: map_all,
            interactive: false
        });
        time[ i ] = geturl(showtime,timrag,timinterbal,i);
    }
    //layer(輪郭)
    Layer_Map[ "coast" ] = L.tileLayer('https://www.jma.go.jp/bosai/jmatile/data/map/none/none/none/surf/mask/{z}/{x}/{y}.png', {//輪郭
        minZoom: 4,
        minNativeZoom: 2,
        maxNativeZoom: 9,        
        maxZoom: 9,       
        //attribution: 'Tiles by <a href="http://www.esrij.com/"> Esri Japan </a>',
        opacity:0.8,
        maxBounds: map_all
    }); 
    //layer(市町村)
    /*
    Layer_Map[ "city" ] = L.tileLayer('https://www.jma.go.jp/jp/commonmesh/map_tile/MUNICIPALITY/none/none/zoom{z}/{x}_{y}.png', {//市町村別（7から表示）
        minZoom: 7,
        minNativeZoom: 7,
        maxNativeZoom: 8,        
        maxZoom: 9,       
        //attribution: 'Tiles by <a href="http://www.esrij.com/"> Esri Japan </a>',
        opacity:1,
        maxBounds: map_all
    });
    */
    var map_id = L.map('map_id',{
        center: [startY,startX],
        zoom: startZoom,
        maxBounds: map_all,
        zoomControl: true,
        fadeAnimation: false,
        layers: [Basic_Map[ 0 ]]
    });
    map_id.zoomControl.setPosition('bottomright');
    map_id.addLayer( Layer_Map["coast"]);
    //map_id.addLayer( Layer_Map["city"]);

    var baseMap = {"OpenStreetMap": Basic_Map[ 0 ]};
	//L.Util.setOptions(Layer_Map[0], { opacity: 0.5 });
	
    var back = max_back;
    var oldindex = 0;
    /*
    var rad_mv = setInterval(function(){change(1)},1000);
    $("#rad_start").toggle();//最初は動画なので、開始ボタンは非表示
    $("#rad_next").toggle();
    $("#rad_back").toggle();
    */
   $("#rad_stop").toggle();//最初は動画停止状態→stop非表示
   change(max_back);
    //停止
    $("#rad_stop").on("click",function(){
        clearInterval(rad_mv);
        $("#rad_start").toggle();
        $("#rad_stop").toggle();
        $("#rad_next").toggle();
        $("#rad_back").toggle();
        $("#rad_new").toggle();
    });
    //動画再開
    $("#rad_start").on("click",function(){
        rad_mv = setInterval(function(){change(1)},1000);
        $("#rad_stop").toggle();
        $("#rad_start").toggle();
        $("#rad_next").toggle();
        $("#rad_back").toggle();
        $("#rad_new").toggle();
    });
    //
    $("#rad_next").on("click",function(){
        change(1);
    });
    $("#rad_back").on("click",function(){
        change(-1);
    });
    $("#rad_new").on("click",function(){
        if(back !=0)  change(back);
    });


    function change(index){
        var showtime = "{MM}月{DD}日{HH}時{mm}分";
        oldindex = back;
        back -=index;
        //正の値＝進む
        if(index < 0){
            if(back >= max_back){
                back = 0;
            }
        }else{
            //戻る時
            if(back < 0){
                back = max_back;
            }
        }        
        //新しいor古い　レイヤー追加
        map_id.addLayer(Layer_Map[back]);
        //document.getElementById("time").innerText = geturl(showtime,5,5,back);
        document.getElementById("time").innerText = time[back];
        for(i=0;i<=max_back;i++){
            if((i == back) || (i == oldindex)){
                //何もしない
            }else{
                map_id.removeLayer( Layer_Map[i]);
            }
        }
        setTimeout(rm_old, 1);
    }
    function rm_old(){
        map_id.removeLayer(Layer_Map[oldindex]);
    }

}