
$(function(){

    var mailform_dt = $('#mail_form dl dt');

    for(var i=0; i<mailform_dt.length; i++){
        if( mailform_dt.eq(i).next('dd').attr('class') == 'required' ){
            $('<span/>')
                .text('必須')
                .addClass('must')
                .prependTo($(mailform_dt.eq(i)));
            $('<span/>')
              .appendTo(mailform_dt.eq(i).next('dd'));
        }else{
            $('<span/>')
                .text('任意')
                .addClass('any')
                .prependTo($(mailform_dt.eq(i)));
        }
    }

    $('#mail_submit_button').click(required_check);

    function slice_method(dt){
        var dt_start = dt.html().indexOf('</span>');
        var dt_name = dt.html().slice(dt_start+7);
        return dt_name;
    }

    function required_check(){

        var error = 0;
        var scroll_point = 0;

        if( $('.required').length ){

            for(var i=0; i<12; i++){
                eval("var check_"+ i +"= true;");
                eval("var error_point_"+ i +"= 0;");
            }

            if( $('.required').children('input#mail_address').length ){
                element = $('.required').children('input#mail_address');
                if( element.val() == '' ){
                    element.nextAll('span').addClass('error').text('メールアドレスが入力されていません。');
                    check_0 = false;
                    error_point_0 = element.offset().top;
                }else{
                    if( !(element.val().match(/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/)) ){
                        element.nextAll('span').addClass('error').text('正しいメールアドレスの書式ではありません。');
                        check_1 = false;
                        error_point_1 = element.offset().top;
                    }else{
                        element.nextAll('span').text('');
                    }
                }
            }

            if( $('.required').children('input#tel').length ){
                element = $('.required').children('input#tel');
                if( element.val() == '' ){
                    var dt = element.parents('dd').prev('dt');
                    var dt_name = slice_method(dt);
                    element.nextAll('span').addClass('error').text('電話番号が入力されていません。');
                    check_2 = false;
                    error_point_2 = element.offset().top;
                }else{
                    if( (element.val().match(/^[ 　\r\n\t]*$/)) ){
                        element.nextAll('span').addClass('error').text('スペースだけの入力はできません。');
                        check_3 = false;
                        error_point_3 = element.offset().top;
                    }else{
                        element.nextAll('span').text('');
                    }
                }
            }

            if( $('.required').children('select#product').length ){
                element = $('.required').children('select#product');
                if( element.val() == '' ){
                    var dt = element.parents('dd').prev('dt');
                    var dt_name = slice_method(dt);
                    element.nextAll('span').addClass('error').text(dt_name +'が選択されていません。');
                    check_4 = false;
                    error_point_4 = element.offset().top;
                }else{
                    element.nextAll('span').text('');
                }
            }

        }

        for(var i=11; i>=0; i--){
            if( eval("check_"+ i +" == false") ){
                error++;
            }
            if( eval("error_point_"+ i +" !=0") ){
                eval("scroll_point = error_point_"+ i +";");
            }
        }

        if(error == 0){
            if(window.confirm('送信してもよろしいですか？')){
                return true;
            }else{
                return false;
            }
        }else{
        $('html,body').animate({
          scrollTop : scroll_point-50
        }, 500);
            return false;
        }

    }

});
