    //var timrag = 13;

    var showmap_fct = function(startY,startX,startZoom,id) {
        //範囲指定
        //var timrag = 13;
        //var timinterbal = 10;
        var maxft = 15;
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
        //var showtime = "{MM}月{DD}日{HH}時{mm}分";//時刻部分
        //document.getElementById("time_fct").innerText = geturl(showtime,timrag,timinterbal,0);
    
        //時計
        //time[ 0 ] = geturl(showtime,timrag,timinterbal,0);
    
        //レイヤー（降短）
        var baseurl="https://www.jma.go.jp/bosai/jmatile/data/rasrf/{YYYY_UTC}{MM_UTC}{DD_UTC}{HH_UTC}{mm_UTC}00";
        //           https://www.jma.go.jp/bosai/jmatile/data/rasrf/20210225080000/immed/20210225080000/surf/rasrf/5/27/12.png
        //         ng:https://www.jma.go.jp/bosai/jmatile/data/rasrf/20210225075000/none/20210225075000/surf/rasrf/6/55/25.png
        //https://www.jma.go.jp/bosai/jmatile/data/rasrf/20210225080000/immed/20210225180000/surf/rasrf/6/56/26.png
        //https://www.jma.go.jp/bosai/jmatile/data/rasrf/targetTimes.json?_=1614240573126
        /////////////json////////////////////////////////
        $(function() {
            var jsonurl = "https://www.jma.go.jp/bosai/jmatile/data/rasrf/targetTimes.json?_=1614240573126";
            var urlbase = "https://www.jma.go.jp/bosai/jmatile/data/rasrf/";
            $.getJSON(jsonurl , function(data) {
                //layer作成
                maxft = data.length-1;
                for(i=0;i<data.length;i++){
                    var imgurl =  urlbase + data[i].basetime+"/"+ data[i].member + "/" +data[i].validtime +"/surf/rasrf/{z}/{x}/{y}.png";
                    Layer_Map[ i ] = L.tileLayer(imgurl, {
                        minZoom: 2,
                        minNativeZoom: 6,
                        maxNativeZoom: 6,        
                        maxZoom: 9,       
                        opacity:0.7,
                        className: "hogehogehoge0",
                        maxBounds: map_all,
                        interactive: false
                    });
                    time[ i]=getjst(data[i].validtime);                
                }
                document.getElementById("time_fct").innerText =time[ maxft];//
                change(-1);
    
            });
        });
        function getjst(valid){
            //yyyymmddhhiiss （utc） からjst ddhhmmに変換
            var jst_ddhhmm="";
            //console.log(valid.substring(0,4)+" "+(Number(valid.substring(4,6))-1)+" "+valid.substring(6,8)+" "+valid.substring(8,10)+" "+valid.substring(10,12));
            var date = new Date(valid.substring(0,4),(Number(valid.substring(4,6))-1),valid.substring(6,8),valid.substring(8,10),valid.substring(10,12));
            date.setHours(date.getHours()+9);//jstに
            return (date.getMonth()+1)+"月"+date.getDate()+"日"+date.getHours()+"時"+date.getMinutes()+"分";
        }
        ////////////////////////////////////////////////////////////////  
        /*
        var inibase = geturl(baseurl,timrag,timinterbal,0);//URL,タイムラグ,更新間隔,戻る枚数
        var forcast_base = "{YYYY_UTC}{MM_UTC}{DD_UTC}{HH_UTC}{mm_UTC}00/";
        var type = "/none/";
        for(var mai=0;mai<=maxft;mai++){
            if (mai > 6) {
                forcast_base = "{YYYY_UTC}{MM_UTC}{DD_UTC}{HH_UTC}0000/";
                showtime = "{MM}月{DD}日{HH}時00分";//時刻部分
                type = "/immed/";
            }
            var ftime =  geturl(forcast_base,timrag,timinterbal,-6*mai);
            Layer_Map[ mai ] = L.tileLayer(inibase+type+ftime+'surf/rasrf/{z}/{x}/{y}.png', {
                minZoom: 2,
                minNativeZoom: 6,
                maxNativeZoom: 6,        
                maxZoom: 9,       
                opacity:0.7,
                className: "hogehogehoge0",
                maxBounds: map_all,
                interactive: false
            });
    
            time[ mai ] = geturl(showtime,timrag,timinterbal,-6*mai);
        }
        */
        //layer(輪郭)
        Layer_Map[ "coast" ] = L.tileLayer('https://www.jma.go.jp/bosai/jmatile/data/map/none/none/none/surf/mask/{z}/{x}/{y}.png', {//輪郭
            minZoom: 2,
            minNativeZoom: 2,
            maxNativeZoom: 9,        
            maxZoom: 9,       
            opacity:1,
            maxBounds: map_all
        }); 
        /*
        //layer(市町村)
        Layer_Map[ "city" ] = L.tileLayer('https://www.jma.go.jp/jp/commonmesh/map_tile/MUNICIPALITY/none/none/zoom{z}/{x}_{y}.png', {//市町村別（7から表示）
            minZoom: 7,
            minNativeZoom: 7,
            maxNativeZoom: 8,        
            maxZoom: 9,       
            opacity:1,
            maxBounds: map_all
        });
        */
        map_id_fct = L.map(id,{
            center: [startY,startX],
            zoom: startZoom,
            maxBounds: map_all,
            zoomControl: true,
            fadeAnimation: false,
            layers: [Basic_Map[ 0 ]]
        });
        map_id_fct.zoomControl.setPosition('bottomleft');
        map_id_fct.addLayer( Layer_Map["coast"]);
        //map_id_fct.addLayer( Layer_Map["city"]);
    
        var baseMap = {"OpenStreetMap": Basic_Map[ 0 ]};
        //L.Util.setOptions(Layer_Map[0], { opacity: 0.5 });
        
        var back = maxft;
        var oldindex = 0;
       //位置取得ボタン
       $("#getpoint_fct").on("click",function(){
        navigator.geolocation.getCurrentPosition(success,fail);
        function success(pos){
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            const accuracy = pos.coords.accuracy;
            map_id.setView([ lat ,  lon], 7);
            map_id_fct.setView([ lat ,  lon], 7);
          }
          function fail(pos){
            alert('位置情報の取得に失敗しました。エラーコード：');
          }
    });
    
        //動画、停止ボタン関連
        /*
        var koutan_mv = setInterval(function(){change(1)},1000);
        $("#koutan_start").toggle();//最初は動画なので、開始ボタンは非表示
        $("#koutan_next").toggle();
        $("#koutan_back").toggle();
        */
       $("#koutan_stop").toggle();//最初は動画停止状態→stop非表示
        //停止
        $("#koutan_stop").on("click",function(){
            clearInterval(koutan_mv);
            $("#koutan_start").toggle();
            $("#koutan_stop").toggle();
            $("#koutan_next").toggle();
            $("#koutan_back").toggle();
            $("#koutan_new").toggle();
    
        });
        //動画再開
        $("#koutan_start").on("click",function(){
            koutan_mv = setInterval(function(){change(-1)},1000);
            $("#koutan_stop").toggle();
            $("#koutan_start").toggle();
            $("#koutan_next").toggle();
            $("#koutan_back").toggle();
            $("#koutan_new").toggle();
    
        });
        //
        $("#koutan_next").on("click",function(){
            change(-1);
        });
        $("#koutan_back").on("click",function(){
            change(1);
        });
        $("#koutan_new").on("click",function(){
            if(back !=0)  change(-back+15);
        });
    
        function change(index){
            //var showtime = "{MM}月{DD}日{HH}時{mm}分";
            oldindex = back;
            back +=index;
            //正の値＝進む
            if(index >=0){
                if(back >= maxft){
                    back = 0;
                }
            }else{
                //戻る時
                if(back < 0){
                    back = maxft;
                }
            }
            //var baseurl="https://www.jma.go.jp/jp/kaikotan/kaikotan_tile/KAIKOTAN10M/{YYYY_UTC}{MM_UTC}{DD_UTC}{HH_UTC}{mm_UTC}/";
            //inibase = geturl(baseurl,timrag,timinterbal,0);//URL,タイムラグ,更新間隔,戻る枚数
    
            //var forcast_base = "{YYYY_UTC}{MM_UTC}{DD_UTC}{HH_UTC}{mm_UTC}/";
    
            //新しいor古い　レイヤー追加
            map_id_fct.addLayer(Layer_Map[back]);
            //document.getElementById("time").innerText = geturl(showtime,5,5,back);
            document.getElementById("time_fct").innerText = time[back];
            for(i=0;i<=maxft;i++){
                if((i == back) || (i == oldindex)){
                    //何もしない
                }else{
                    map_id_fct.removeLayer( Layer_Map[i]);
                }
            }
            setTimeout(rm_old, 1);
        }
        function rm_old(){
            map_id_fct.removeLayer(Layer_Map[oldindex]);
        }
    
    
    }