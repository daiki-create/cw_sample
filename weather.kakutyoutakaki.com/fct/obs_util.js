//入電迄のタイムラグ(分)、更新間隔、何枚目が欲しいか
function getobstime(timelag,interbal,back_index){
    var time = new Date();
    //タイムラグの分戻す
    time.setMinutes(time.getMinutes()-timelag);
    //〇分間隔に
    var mod = time.getMinutes() % interbal;
    time.setMinutes(time.getMinutes()-mod);
    return time;
}
function geturl(baseURL,timelag,interbal,back_index){
    var time = new Date();
    //タイムラグの分戻す
    time.setMinutes(time.getMinutes()-timelag);
    //〇分間隔に
    var mod = time.getMinutes() % interbal;
    time.setMinutes(time.getMinutes()-mod);
    //要求された枚数だけ戻す
    time.setMinutes(time.getMinutes()-back_index*interbal);

    //この時点でタイムは要求された時刻になっている

    
    //置換文字作成
    var YYYY = time.getFullYear();
    var MM = ("0"+(time.getMonth()+1)).slice(-2);
    var DD = ("0"+time.getDate()).slice(-2);
    var HH = ("0"+time.getHours()).slice(-2);
    var mm = ("0"+time.getMinutes()).slice(-2);
    baseURL = baseURL.replace(/{YYYY}/g, YYYY);
    baseURL = baseURL.replace(/{MM}/g, MM);
    baseURL = baseURL.replace(/{DD}/g, DD);
    baseURL = baseURL.replace(/{HH}/g, HH);
    baseURL = baseURL.replace(/{mm}/g, mm);

    //utc処理
    YYYY = time.getUTCFullYear();
    MM = ("0"+(time.getUTCMonth()+1)).slice(-2);
    DD = ("0"+time.getUTCDate()).slice(-2);
    HH = ("0"+time.getUTCHours()).slice(-2);
    mm = ("0"+time.getUTCMinutes()).slice(-2);
    baseURL = baseURL.replace(/{YYYY_UTC}/g, YYYY);
    baseURL = baseURL.replace(/{MM_UTC}/g, MM);
    baseURL = baseURL.replace(/{DD_UTC}/g, DD);
    baseURL = baseURL.replace(/{HH_UTC}/g, HH);
    baseURL = baseURL.replace(/{mm_UTC}/g, mm);

    return baseURL;
}