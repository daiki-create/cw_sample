
function getCity(){
    var ken = "";
    var city =  "";
    setcitycode();//citycode.jsは読み込んでおく

    //位置情報取得
   navigator.geolocation.getCurrentPosition(success,fail);

    //位置取得成功時
    function success(pos){
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        const accuracy = pos.coords.accuracy;
        var sendurl = "https://mreversegeocoder.gsi.go.jp/reverse-geocoder/LonLatToAddress?lat="+lat+"&lon="+lon;
        $.ajax({
            url:sendurl,
            type: 'GET',
            dataType: 'json',
            timeout: 5000,
        })
        .done(function(data) {
          // 通信成功時の処理を記述
          if("results" in data){//存在確認
            var citycode = Number(data.results.muniCd);
            //citycode =$("#damy").val();
            var taioucode =  MUNI_ARRAY;//最初に別ファイルで読み込んだ市町村対応表読み込み
            var ken_city = taioucode[citycode];
            //挿入
            ken_no = ken_city.split(",")[0];
            ken = ken_city.split(",")[1];
            city = ken_city.split(",")[3];
            $("#ken_select").val(ken);
            selectKenCity(ken,city);
          }
          })
        .fail(function() {
            console.log("fale");
            // 通信失敗時の処理を記述
        });

    }
    function fail(pos){
        alert('位置情報の取得に失敗しました。エラーコード：');
    }
    //位置取得が成功した場合に県と市を選択状態とする。その後予報取得
    function selectKenCity(ken,city){
        if(ken=="北海道"){
            //北海道の人ごめんなさい。

            str = "稚内市_猿払村_豊富町_幌延町_浜頓別町_中頓別町_枝幸町_礼文町_利尻町_利尻富士町"; 
            if(str.indexOf(city) != -1) ken = "宗谷地方";

            str = "士別市_名寄市_和寒町_剣淵町_下川町_美深町_音威子府村_中川町_幌加内町_旭川市_鷹栖町_東神楽町_当麻町_比布町_愛別町_上川町_東川町_美瑛町_富良野市_上富良野町_中富良野町_南富良野町_占冠村"; 
            str +="遠別町_天塩町_苫前町_羽幌町_天売焼尻_初山別村_留萌市_増毛町_小平町"; 
            if(str.indexOf(city) != -1) ken = "上川・留萌地方";

            str = "斜里町_清里町_小清水町_北見市常呂_網走市_佐呂間町_大空町_美幌町_津別町_北見市北見_訓子府町_置戸町_紋別市_滝上町_興部町_西興部村_雄武町_遠軽町_湧別町";
            if(str.indexOf(city) != -1) ken = "網走・北見・紋別地方";

            str = "弟子屈町_釧路市阿寒_標茶町_鶴居村_厚岸町_浜中町_釧路市釧路_釧路市音別_釧路町_白糠町_中標津町_標津町_羅臼町_別海町_根室市";            
            str += "上士幌町_鹿追町_新得町_足寄町_陸別町_帯広市_音更町_士幌町_清水町_芽室町_幕別町_池田町_豊頃町_本別町_浦幌町_中札内村_更別村_大樹町_広尾町";
            if(str.indexOf(city) != -1) ken = "釧路・根室・十勝地方";

            str = "伊達市伊達_伊達市大滝_豊浦町_壮瞥町_洞爺湖町_室蘭市_苫小牧市_登別市_白老町_厚真町_安平町_むかわ町";
            str +="日高町日高_日高町門別_平取町_新冠町_新ひだか町_浦河町_様似町_えりも町";
            if(str.indexOf(city) != -1) ken = "胆振・日高地方";

            str = "石狩市_当別町_新篠津村_札幌市_江別市_千歳市_恵庭市_北広島市_深川市_妹背牛町_秩父別町_北竜町_沼田町_芦別市_赤平市_滝川市_砂川市_歌志内市_奈井江町_上砂川町_浦臼町_新十津川町_雨竜町_夕張市_岩見沢市_美唄市_三笠市_南幌町_由仁町_長沼町_栗山町_月形町";
            str +="小樽市_積丹町_古平町_仁木町_余市町_赤井川村_ニセコ町_真狩村_留寿都村_喜茂別町_京極町_倶知安町_島牧村_寿都町_黒松内町_蘭越町_共和町_岩内町_泊村_神恵内村";
            if(str.indexOf(city) != -1) ken = "石狩・空知・後志地方";    

            str = "八雲町八雲_長万部町_函館市_北斗市_七飯町_鹿部町_森町_松前町_福島町_知内町_木古内町_八雲町熊石_今金町_せたな町_江差町_上ノ国町_厚沢部町_乙部町_奥尻町";
            if(str.indexOf(city) != -1) ken = "渡島・檜山地方";    

        }
        $('[name="ken"] option[value='+ken+']').prop('selected',true);//県名選択
        make_select_city();//市町村の要素
        $(`[name="city"] option:contains(${city})`).prop('selected',true);//value =北部_A市 のような形式なので、市町村名が含まれているものを選択
       
                //予報取得
        changeCity();
    }
}

