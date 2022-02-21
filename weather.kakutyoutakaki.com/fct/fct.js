function getMapXY(ken){
    switch (ken){
        case '宗谷地方':
          ret =  [45,141.6];
          break;
        case '上川・留萌地方':
          ret =  [44,141.6];
          break;
        case '網走・北見・紋別地方':
          ret =  [43.7,143.6];
          break;
        case '釧路・根室・十勝地方':
          ret =  [43.1,143.8];
          break;
        case '胆振・日高地方':
          ret =  [42.9,142.5];
          break;
        case '石狩・空知・後志地方':
          ret =  [43.17,141.3];
          break;
        case '渡島・檜山地方':
          ret =  [41.8,140.2];
          break;
        case '青森県':
          ret =  [40.7,140.8];
          break;
        case '岩手県':
          ret =  [39.4,141.1];
          break;
        case '宮城県':
          ret =  [38.3,140.85];
          break;
        case '秋田県':
          ret =  [39.7,140.1];
          break;
        case '山形県':
          ret =  [38.5,140.1];
          break;
        case '福島県':
          ret =  [37.38,139.96];
          break;
        case '茨城県':
          ret =  [36.23,140.18];
          break;
        case '栃木県':
          ret =  [36.7,139.7];
          break;
        case '群馬県':
          ret =  [36.5,138.9];
          break;
        case '埼玉県':
          ret =  [35.96,139.4];
          break;
        case '千葉県':
          ret =  [35.53,140.23];
          break;
        case '東京都':
          ret =  [35.68,139.65];
          break;
        case '神奈川県':
            ret =  [35.38,139.22];
            break;
        case '新潟県':
          ret =  [37.8,138.96];
          break;
        case '富山県':
          ret =  [36.6,137.22];
          break;
        case '石川県':
          ret =  [36.4,136.5];
          break;
        case '福井県':
          ret =  [35.65,136.05];
          break;
        case '山梨県':
          ret =  [35.64,138.5];
          break;
        case '長野県':
          ret =  [36.16,138];
          break;
        case '岐阜県':
          ret =  [35.8,137.22];
          break;
        case '静岡県':
          ret =  [35,138];
          break;
        case '愛知県':
          ret =  [35.19,136.9];
          break;
        case '三重県':
          ret =  [34.4,136.4];
          break;
        case '滋賀県':
          ret =  [35.13,136.1];
          break;
        case '京都府':
          ret =  [35.1,135.7];
          break;
        case '大阪府':
          ret =  [34.7,135.5];
          break;
        case '兵庫県':
          ret =  [34.9,134.9];
          break;
        case '奈良県':
          ret =  [34.67,135.8];
          break;
        case '和歌山県':
          ret =  [33.82,135.44];
          break;
        case '鳥取県':
          ret =  [35.46,133.82];
          break;
        case '島根県':
          ret =  [35.06,132.5];
          break;
        case '岡山県':
          ret =  [34.64,133.92];
          break;
        case '広島県':
          ret =  [34.4,132.85];
          break;
        case '山口県':
          ret =  [34.1,131.4];
          break;
        case '徳島県':
          ret =  [33.65,134.1];
          break;
        case '香川県':
          ret =  [34.1,134];
          break;
        case '愛媛県':
          ret =  [33.6,132.7];
          break;
        case '高知県':
          ret =  [33.47,133.38];
          break;
        case '福岡県':
          ret =  [33.53,130.44];
          break;
        case '佐賀県':
          ret =  [33.2,130.1];
          break;
        case '長崎県':
          ret =  [32.7,129.88];
          break;
        case '熊本県':
          ret =  [32.8,130.7];
          break;
        case '大分県':
          ret =  [33.25,131.6];
          break;
        case '宮崎県':
          ret =  [32.2,131.4];
          break;
        case '鹿児島県':
          ret =  [31.6,130.54];
          break;
        case '沖縄本島地方':
          ret =  [26.5,127.9];
          break;
        case '大東島地方':
          ret =  [25.87,131.16];
          break;
        case '宮古島地方':
          ret =  [24.64,124.62];
          break;
        case '八重山地方':
          ret =  [24.3,123.8];
          break;
  

        default:
          ret =  [0,-20];
          break;  
      }

    return ret;
}


function changeCity(){
    var ken = document.getElementById("ken_select").value;
    var city = document.getElementById("city_select").value;
    window.location.href ="./index.php?ken=" + ken+"&city="+city;
    $("#ken_select").val(ken);
    $("#city_select").val(city);
    if(city === "23区西部"){
       city = "東京地方_中野区";
    }
    $('[name="ken"] option[value='+ken).prop('selected',true);
    $('[name="city"] option[value='+city).prop('selected',true);
    //本当は、市→県が選べる関数が必要。

     //cookie 保存
    $.cookie("jmaweth_ken_index",  "<?php  echo $ken  ?>", { expires: 7 });
    $.cookie("jmaweth_city_index", "<?php  echo $city ?>", { expires: 7 });

}
function drow_chart(ctx,i){
    const aryMax = function (a, b) {return Math.max(a, b);}
    const aryMin = function (a, b) {return Math.min(a, b);}
    var myLineChart = new Chart(ctx, {
      type: 'line',
      data: {
            labels: t_time,//〇〇時
        datasets: [
          {
            label: '気温(度）',
            data:t_ji[t_name[i]],
            borderColor: "rgba(50,100,50,1)",
            backgroundColor: "rgba(0,0,0,0)"
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: t_name[i]+'の予想気温',
          fontSize: 22
        },
        scales: {
          yAxes: [{
            ticks: {
              //suggestedMax: 35,
              fontSize: 15,
              suggestedMax: 1 + t_ji[t_name[i]].reduce(aryMax),
              suggestedMin: -1 + t_ji[t_name[i]].reduce(aryMin),
              stepSize: 2,
              callback: function(value, index, values){
                return  value +  '℃'
              }
            }
          }],
          xAxes: [{
            ticks: {
              fontSize: 15
            }
          }]
        },
        legend: {
              display: false
        },
        maintainAspectRatio: false
      }
    });
  }