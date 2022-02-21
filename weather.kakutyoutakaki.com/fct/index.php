
<!DOCTYPE html>
<html lang="ja">
<head>
<title>sample</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="Keywords" content="" />
<meta name="Description" content="" />
<link rel="icon" href="https://weather.kakutyoutakaki.com/images/favicon.ico" type="image/x-icon" />
<link rel="shortcut icon" type="img/x-icon" href="https://weather.kakutyoutakaki.com/images/favicon.ico" />
<link rel = "stylesheet" href = "radcss.css" />
<link rel = "stylesheet" href = "fct.css" />
<link rel = "stylesheet" href = "../kotei.css" />
<link rel = "stylesheet" href = "https://unpkg.com/leaflet@1.4.0/dist/leaflet.css" />
<link href="../css/selmodal.css" rel="stylesheet">

<script src="../js/jquery.min.js"></script>
<script src="../js/jquery.cookie.js"></script>
<script src="./cityfunction.js"></script>
<script src = "https://unpkg.com/leaflet@1.4.0/dist/leaflet.js"></script>
<script src="obs_util.js"></script>
<script src="showrad.js"></script>
<script src="show_koutan.js"></script>
<!--共通部分-->
<link href="../css/base.css" rel="stylesheet">
<script src="../js/topmenu.js"></script>
<script src="fct.js"></script>
<script src="./json/citycode.js"></script><!--市町村対応コード-->
<script src="getcity.js"></script><!--市町村読み込み用スクリプト-->

<!-- Google Maps API -->
<script src="https://maps.googleapis.com/maps/api/js?key=" async defer></script>
<!-- Leaflet Google Maps Plugin -->
<script src='https://unpkg.com/leaflet.gridlayer.googlemutant@latest/Leaflet.GoogleMutant.js'></script>

<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-126384684-4"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-126384684-4');
</script>

</head>
<body>
<div class="dropdown"></div>
<script>
  addTopMenu();
</script>
<div id="karatop"></div>
<a href="../index.html">ホーム</a>
<div class="blead">
>>sample >> sample
</div>
<script>
    //cookie 保存
    $.cookie("jmaweth_ken_index",  "東京都", { expires: 30 ,samesite:true,path: '/' ,secure: true});
    $.cookie("jmaweth_city_index", "東京地方_墨田区", { expires: 30 ,samesite:true,path: '/' ,secure: true});
</script>

<form id="myform" action = "./index_1m.php" method = "get">
<div class="selectcontena">
    <select name= "ken" id="ken_select" onchange="make_select_city()">
     <option value="宗谷地方">北海道(宗谷地方)</option>
     <option value="上川・留萌地方">北海道(上川・留萌地方)</option>
     <option value="網走・北見・紋別地方">北海道(網走・北見・紋別地方)</option>
     <option value="釧路・根室・十勝地方">北海道(釧路・根室・十勝地方)</option>
     <option value="胆振・日高地方">北海道(胆振・日高地方)</option>
     <option value="石狩・空知・後志地方">北海道(石狩・空知・後志地方)</option>
     <option value="渡島・檜山地方">北海道(渡島・檜山地方)</option>
     <option value="青森県">青森県</option>
     <option value="岩手県">岩手県</option>
     <option value="宮城県">宮城県</option>
     <option value="秋田県">秋田県</option>
     <option value="山形県">山形県</option>
     <option value="福島県">福島県</option>
     <option value="茨城県">茨城県</option>
     <option value="栃木県">栃木県</option>
     <option value="群馬県">群馬県</option>
     <option value="埼玉県">埼玉県</option>
     <option value="千葉県">千葉県</option>
     <option value="東京都" selected>東京都</option>
     <option value="神奈川県">神奈川県</option>
     <option value="新潟県">新潟県</option>
     <option value="富山県">富山県</option>
     <option value="石川県">石川県</option>
     <option value="福井県">福井県</option>
     <option value="山梨県">山梨県</option>
     <option value="長野県">長野県</option>
     <option value="岐阜県">岐阜県</option>
     <option value="静岡県">静岡県</option>
     <option value="愛知県">愛知県</option>
     <option value="三重県">三重県</option>
     <option value="滋賀県">滋賀県</option>
     <option value="京都府">京都府</option>
     <option value="大阪府">大阪府</option>
     <option value="兵庫県">兵庫県</option>
     <option value="奈良県">奈良県</option>
     <option value="和歌山県">和歌山県</option>
     <option value="鳥取県">鳥取県</option>
     <option value="島根県">島根県</option>
     <option value="岡山県">岡山県</option>
     <option value="広島県">広島県</option>
     <option value="山口県">山口県</option>
     <option value="徳島県">徳島県</option>
     <option value="香川県">香川県</option>
     <option value="愛媛県">愛媛県</option>
     <option value="高知県">高知県</option>
     <option value="福岡県">福岡県</option>
     <option value="佐賀県">佐賀県</option>
     <option value="長崎県">長崎県</option>
     <option value="熊本県">熊本県</option>
     <option value="大分県">大分県</option>
     <option value="宮崎県">宮崎県</option>
     <option value="鹿児島県">鹿児島県</option>
     <option value="沖縄本島地方">沖縄県(沖縄本島地方)</option>
     <option value="大東島地方">沖縄県(大東島地方)</option>
     <option value="宮古島地方">沖縄県(宮古島地方)</option>
     <option value="八重山地方">沖縄県(八重山地方)</option>
    </select>

    <select name="city" id="city_select" onchange="changeCity()">
         <option value="台東区" selected >23区</option>

    </select>
</div>
    <input type="button" value="位置取得" onclick="getCity()"/>
    <input type="button" value="決定" onclick="changeCity()"/>
</form>
<script src="../js/Jquery.selmodal.js"></script>
<script>
     var ken = "東京都";
     var city = "東京地方_墨田区";
     $('[name="ken"] option[value='+ken+']').prop('selected',true);
     make_select_city();//市町村の要素
     $('[name="city"] option[value='+city+']').prop('selected',true);
     $('#ken_select').selModal();

</script>

<p class='nowrap'>天気予報：02月21日17時 週間天気予報：21日17時発表</p><h1 class='title'>墨田区(東京都東京地方)　の天気予報 </h1><div id="maps_contena">
     <!--レーダー部分-->
     <div id="map_contena">
     <div id="time_contena">
         観測データ<br>
        <input id="rad_back" type="button" value="<<"/>
        <input id="rad_stop" type="button" value="停止"/>
        <input id="rad_start" type="button" value="動画"/>
        <input id="rad_next" type="button" value=">>"/>
        <input id="rad_new" type="button" value="最新"/>
            <div id="time"></div>
     </div>

        <div id="map_id"></div>
        <img src="./img/rad_exam.PNG" class="rad_ex">
    </div>
    <!--凡例-->
     <!--予想部分-->
    <div id="map_contena_fct">
    <div id="time_contena_fct">
        予想データ<br>
        <input id="koutan_back" type="button" value="<<">
        <input id="koutan_stop" type="button" value="停止">
        <input id="koutan_start" type="button" value="動画">
        <input id="koutan_next" type="button" value=">>">
        <input id="koutan_new" type="button" value="現在">
        <div id="time_fct"></div>
     </div>

        <div id="map_id_fct" ></div>
        <img src="./img/rad_exam.PNG" class="rad_ex">
    </div>
</div>
    <script>
        var mapXY = getMapXY("東京都");
        showmap(mapXY[0],mapXY[1],6);//選択されている県からy x を抽出
        showmap_fct(mapXY[0],mapXY[1],6,"map_id_fct");

    </script>


<div id='fct'><div class='aera_tile'><div class='fct_timedif'><h2 class='fct_day'>今夜　2月21日(月)</h2><div class='nowrap'><div class='fct'><span class='main_fct'> <img src='./img/hare_min.png' alt='晴れ'> </span><p class='text_min'></p></div><div class='tem_maxmin'></div></div><table class='plob'><tr><td>時間</td><td>１８-００</td></tr><tr><td>降水確率</td><td>0%</td></tr></table></div>               </div>
               <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
               <!-- 横長ディスプレイ横長　再登録 -->
               <ins class="adsbygoogle"
                    style="display:block"
                    data-ad-client="ca-pub-3302838728141341"
                    data-ad-slot="6578640628"
                    data-ad-format="auto"
                    data-full-width-responsive="true"></ins>
               <script>
                    (adsbygoogle = window.adsbygoogle || []).push({});
               </script>
               <div class='aera_tile'>
               <table class='tenki_table'><caption>3時間ごとの天気</caption><tbody><tr><th colspan='5' class='tenkitable_day'>今日</th><th colspan='16'>明日</th></tr><th colspan='2'>18時</th><th colspan='2'>21時</th><th colspan='2'>00時</th><th colspan='2'>03時</th><th colspan='2'>06時</th><th colspan='2'>09時</th><th colspan='2'>12時</th><th colspan='2'>15時</th><th colspan='2'>18時</th><th colspan='2'>21時</th><th colspan='2'>00時</th><th></th></tr><tr><td></td><td colspan='2'><img src='./img/hare_min.png' alt='晴れ'><br></td><td colspan='2'><img src='./img/hare_min.png' alt='晴れ'><br></td><td colspan='2'><img src='./img/hare_min.png' alt='晴れ'><br></td><td colspan='2'><img src='./img/hare_min.png' alt='晴れ'><br></td><td colspan='2'><img src='./img/hare_min.png' alt='晴れ'><br></td><td colspan='2'><img src='./img/kumori_min.png' alt='曇り'><br></td><td colspan='2'><img src='./img/hare_min.png' alt='晴れ'><br></td><td colspan='2'><img src='./img/kumori_min.png' alt='曇り'><br></td><td colspan='2'><img src='./img/hare_min.png' alt='晴れ'><br></td><td colspan='2'><img src='./img/hare_min.png' alt='晴れ'><br></td></tr></tbody></table><div class='canvas-container'><canvas id='tem_char_0' class='tem_char'></canvas></div><div class='fct_timedif'><h2 class='fct_day'>明日　2月22日(火)</h2><div class='nowrap'><div class='fct'><span class='main_fct'> <img src='./img/hare_min.png' alt='晴れ'> 　昼前　から　時々　<img src='./img/kumori_min.png' alt='曇り'> </span><p class='text_min'></p></div><div class='tem_maxmin'><p class='min'>朝の最低気温</p><div class='min_tem'>-1℃</div><p class='max'>日中の最高気温</p><div class='max_tem'>9℃</div></div></div><table class='plob'><tr><td>時間</td><td>００-０６</td><td>０６-１２</td><td>１２-１８</td><td>１８-２４</td></tr><tr><td>降水確率</td><td>0%</td><td>10%</td><td>10%</td><td>0%</td></tr></table></div><div class='fct_timedif'><h2 class='fct_day'>明後日　2月23日(水)</h2><div class='nowrap'><div class='fct'><span class='main_fct'> <img src='./img/hare_min.png' alt='晴れ'> 　時々　<img src='./img/kumori_min.png' alt='曇り'> </span><p class='text_min'></p></div><div class='tem_maxmin'><p class='min'>最低気温</p><div class='min_tem'>0℃</div><p class='max'>最高気温</p><div class='max_tem'>9℃</div></div></div><table class='plob'><tr><td>時間</td><td>00-24</td></tr><tr><td>降水確率</td><td>10%</td></tr></table></div></div></div></div><script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<ins class="adsbygoogle"
     style="display:block"
     data-ad-format="autorelaxed"
     data-ad-client="ca-pub-3302838728141341"
     data-ad-slot="7498622004"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
<table class='week_table'><tr><th class='week_title'>日付</th><th>24日(木)</th><th>25日(金)</th><th>26日(土)</th><th>27日(日)</th><th>28日(月)</th></tr><tr><th class='week_title'>天気</th><td class='w_td'><span class='main_fct'> <img src='./img/hare_min.png' alt='晴れ'> 時々<img src='./img/kumori_min.png' alt='曇り'> </span><p class='text_min'></p></td><td class='w_td'><span class='main_fct'> <img src='./img/hare_min.png' alt='晴れ'> 時々<img src='./img/kumori_min.png' alt='曇り'> </span><p class='text_min'></p></td><td class='w_td'><span class='main_fct'> <img src='./img/hare_min.png' alt='晴れ'> 時々<img src='./img/kumori_min.png' alt='曇り'> </span><p class='text_min'></p></td><td class='w_td'><span class='main_fct'> <img src='./img/kumori_min.png' alt='曇り'> 時々<img src='./img/hare_min.png' alt='晴れ'> </span><p class='text_min'></p></td><td class='w_td'><span class='main_fct'> <img src='./img/hare_min.png' alt='晴れ'> 時々<img src='./img/kumori_min.png' alt='曇り'> </span><p class='text_min'></p></td></tr><tr><th class='week_title'>降水確率</th><td>10%</td><td>10%</td><td>20%</td><td>30%</td><td>10%</td></tr><tr><th class='week_title'>最高気温</th><td class='w_max'>9℃</td><td class='w_max'>12℃</td><td class='w_max'>15℃</td><td class='w_max'>16℃</td><td class='w_max'>16℃</td></tr><tr><th class='week_title'>最低気温</th><td class='w_min'>1℃</td><td class='w_min'>0℃</td><td class='w_min'>1℃</td><td class='w_min'>3℃</td><td class='w_min'>2℃</td></tr><tr></tr></table><!--iframe id="windy" src="https://embed.windy.com/embed2.html?lat=34.841&lon=140.262&detailLat=35.245&detailLon=140.262&width=650&height=500&zoom=6&level=surface&overlay=wind&product=ecmwf&menu=&message=true&marker=true&calendar=now&pressure=true&type=map&location=coordinates&detail=true&metricWind=m%2Fs&metricTemp=%C2%B0C&radarRange=-1" frameborder="0"></iframe-->
<div class="windy_tile">
     <h2 class="fct_day">世界１当たるWCMWFの東京都の天気予報</h2>
     <iframe id="windy" frameborder="0"></iframe>
</div>
<script>
//mapXY[0]を使用してレーダーの中心と合わせる;
var windsrc = "https://embed.windy.com/embed2.html?lat="+mapXY[0]+"&lon="+mapXY[1]+"&detailLat="+mapXY[0]+"&detailLon="+mapXY[1]+"&width=650&height=500&zoom=6&level=surface&overlay=rain&product=ecmwf&menu=&message=true&marker=true&calendar=now&pressure=true&type=map&location=coordinates&detail=true&metricWind=m%2Fs&metricTemp=%C2%B0C&radarRange=-1";
var iframe = $("iframe#windy");
iframe.attr("src",windsrc);
</script>
<div class='aera_tile'><h2 class='fct_day'>東京都の１か月予報</h2>関東甲信地方１か月予報1ヶ月予報予報<br>2月17日発表<br>　期間のはじめは気温が低く、その後は高くなり、期間の前半は気温の変動が大きいでしょう。<br><h3 class='fct_h3'>関東甲信地方週ごとの気温</h3><div class='nobr'><span class='expl'>2/19～2/25</span><span class='mf_contena'><span class='mf_bar low wd70'>70</span><span class='mf_bar nomal wd20' >20</span><span class='mf_bar hight wd10' >10</span></span></div><div class='nobr'><span class='expl'>2/26～3/04</span><span class='mf_contena'><span class='mf_bar low wd10'>10</span><span class='mf_bar nomal wd30' >30</span><span class='mf_bar hight wd60' >60</span></span></div><div class='nobr'><span class='expl'>3/05～3/18</span><span class='mf_contena'><span class='mf_bar low wd20'>20</span><span class='mf_bar nomal wd40' >40</span><span class='mf_bar hight wd40' >40</span></span></div><h3 class='fct_h3'>2/19からの１ヶ月の予想</h3><h4>気温</h4><div class='nobr'><span class='expl'>関東甲信地方</span><br><span class='mf_contena'><span class='mf_bar low wd30'>30</span><span class='mf_bar nomal wd30' >30</span><span class='mf_bar hight wd40' >40</span></span></div><h4>降水量</h4><div class='nobr'><span class='expl'>関東甲信地方</span><br><span class='mf_contena'><span class='mf_bar low wd20'>20</span><span class='mf_bar nomal wd40' >40</span><span class='mf_bar hight wd40' >40</span></span></div><h4>日照時間</h4><div class='nobr'><span class='expl'>関東甲信地方</span><br><span class='mf_contena'><span class='mf_bar low wd40'>40</span><span class='mf_bar nomal wd40' >40</span><span class='mf_bar hight wd20' >20</span></span></div>     <p class="nobr">
　     <span class="mf_contena">
          <span class="wd10">例</span>
          <span class="mf_bar low wd30">低い(少ない)</span>
          <span class="mf_bar nomal wd30">平年並み</span>
          <span class="mf_bar hight wd30">高い(多い)</span>
       </span>
      </p>     
     </div>
<!--チャート-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.js"></script>
<script>

//地域名でループ使用
//var t_name = ["\u6771\u4eac","\u5927\u5cf6","\u516b\u4e08\u5cf6","\u7236\u5cf6"];
var t_name = ["\u6771\u4eac","\u5927\u5cf6","\u516b\u4e08\u5cf6","\u7236\u5cf6"];
var t_time = ["21\u65e518\u6642","21\u6642","22\u65e500\u6642","03\u6642","06\u6642","09\u6642","12\u6642","15\u6642","18\u6642","21\u6642","23\u65e500\u6642"];
var t_ji = {"\u6771\u4eac":["5","4","2","1","0","4","8","8","6","4","3"],"\u5927\u5cf6":["6","5","4","4","4","7","9","9","7","5","4"],"\u516b\u4e08\u5cf6":["7","7","6","6","6","8","9","10","9","7","7"],"\u7236\u5cf6":["16","15","15","14","14","16","17","17","16","16","16"]};


//チャートchart.js　で時系列気温のグラフ描画
for(var i=0;i<t_name.length;i++){
     //気温を描くboxのidがある場合のみ実行
     if(document.getElementById("tem_char_"+i) != null){
          var ctx = document.getElementById("tem_char_"+i);
          drow_chart(ctx,i);
     }
}

  </script>
  samplesamplesamplesamplesamplesample
</body>
</html>