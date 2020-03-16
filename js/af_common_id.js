//各種タグへの冒頭の文字列
var string_list = {
    'a8':'ICMMA8',
    'ceres':'ICMMCRS',
    'netmile':'ICMMNM',
    'imobile':'ICMMMB',
    'no_af':'noAF'
}

//param用のad_code
var ad_code_list = {
    'a8':'8asys18',
    'ceres':'ptcl',
    'netmile':'ptnm',
    'imobile':'ptmb',
    'no_af':'no_af'
}


function GetQueryString()
{
  var result = {};
  if( 1 < window.location.search.length )
  {
    // 最初の1文字 (?記号) を除いた文字列を取得する
    var query = window.location.search.substring( 1 );

    // クエリの区切り記号 (&) で文字列を配列に分割する
    var parameters = query.split( '&' );

    for( var i = 0; i < parameters.length; i++ )
    {
      // パラメータ名とパラメータ値に分割する
      var element = parameters[ i ].split( '=' );

      var paramName = decodeURIComponent( element[ 0 ] );
      var paramValue = decodeURIComponent( element[ 1 ] );

      // パラメータ名をキーとして連想配列に追加する
      result[ paramName ] = paramValue;
    }
  }
  return result;
}

function addZero( num , slice_num ){
  return ('0' + num).slice( slice_num );
};

function create_c_af_id( af_type ){
    var id = "" ;
    var time = new Date();
    var now = new Date( time.getTime() + ( 9 * 60 * 60 * 1000 ) );

    var year = now.getUTCFullYear();
    var month = addZero( now.getUTCMonth() + 1 , (-2) );
    var day = addZero( now.getUTCDate() , (-2) );
    var hour =  addZero( now.getUTCHours() , (-2) );
    var minute = addZero( now.getUTCMinutes() , (-2) );
    var sec = addZero( now.getUTCSeconds() , (-2) );
    var msec = addZero( now.getUTCMilliseconds() , (-3) );
    //idのベースとなる時間の文字列を生成
    var time_string = "" + year + month + day + hour + minute + sec + msec ;
    id = string_list[ af_type ] + time_string;

    console.log( 'create_id:' + id );

    return id;
}


function set_c_af_id( id , string ){
    window.addEventListener('DOMContentLoaded',function(){
        var input = document.getElementById( id );
        input.value = string;
    })
}

function get_af_type(){
    //訪問元のaffiliateの媒体を判断
    var get_param = GetQueryString();
    //adcode
    var get_param_ad = get_param["ad"];

    for( var key in ad_code_list ){
        if( get_param_ad == ad_code_list[ key ] ){
            af_type = key;
            break;
        }else {
            af_type = "no_af";
        }
    }

    // if( get_param_ad == ad_code_list[ 'a8' ] ){
    //     af_type = "a8";
    // }else if( get_param_ad == ad_code_list[ 'ceres' ] ){
    //     af_type = "ceres";
    // }else if( get_param_ad == ad_code_list[ 'netmile' ] ){
    //     af_type = "netmile";
    // }else {
    //     af_type = "no_af";
    // };

    return af_type;
}

//starter
function create_set_c_af_id(){

    var af_type = get_af_type();

    var id = create_c_af_id( af_type );
    //外部利用用にグローバル変数に格納
    //もし使うことがあれば
    c_af_id = id;

    set_c_af_id( 'hidden_af_id' , id );

    set_c_af_id( 'hidden_af_type' , af_type );

}

create_set_c_af_id();
