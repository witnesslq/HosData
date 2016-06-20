//获取地址栏参数
//比如地址为:http://www.xxx.loc/admin/write-post.php?cid=79
//获取方法：getUrlParam('cid')结果为：79
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
};
//生成分页代码
//$dom:分页节点
//total_page：总页数
//page_size：一页数量
//current_page：当前页数
function generatePagination($dom, total_page, page_size, current_page) {
    if (total_page <= 1) {
        $dom.addClass('hide');
        return false;
    }
    $dom.removeClass('hide');
    $dom.find('input').val(current_page);
    $dom.find('.creatli').remove();
    var $first = $dom.find('.first');
    var $prev = $dom.find('.prev');
    var $next = $dom.find('.next');
    var $last = $dom.find('.last');
    $first.removeClass('disabled');
    $prev.removeClass('disabled');
    $next.removeClass('disabled');
    $last.removeClass('disabled');
    if (total_page <= 5) {
        for (var i = 1; i <= total_page; i++) {
            addliPagination($next, i, current_page);
        }
    } else {
        if (current_page <= 3) {
            for (var i = 1; i <= 5; i++) {
                addliPagination($next, i, current_page);
            }
        } else if (current_page >= (total_page - 2)) {
            for (var i = (total_page - 4) ; i <= total_page; i++) {
                addliPagination($next, i, current_page);
            }
        } else {
            for (var i = (current_page - 2) ; i <= (current_page + 2) ; i++) {
                addliPagination($next, i, current_page);
            }
        }
    }
    $prev.attr('pagenum', current_page - 1);
    $next.attr('pagenum', current_page + 1);
    $last.attr('pagenum', total_page);
    if (current_page == 1) {
        $first.addClass('disabled');
        $prev.addClass('disabled');
    }
    if (current_page == total_page) {
        $last.addClass('disabled');
        $next.addClass('disabled');
    }
};
//分页生成li方法
function addliPagination($dom, index, current_page) {
    var $li = $('<li>');
    $li.addClass('creatli').attr('pagenum', index);
    if (current_page == index) {
        $li.addClass('active');
    }
    var $a = $('<a>');
    $a.text(index);
    $li.append($a);
    $dom.before($li);
}
//提示遮罩弹出层弹出
function tipsMask_pop(message) {
    var $mask = $('<div class="tipsmask"><div class="mask"></div><div class="text">' + message + '</div></div>');
    $('body').append($mask);
}
//提示遮罩弹出层删除
function tipsMask_del() {
    $('.tipsmask').remove();
}
