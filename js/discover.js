$(function () {
    //获取详情左侧菜单数据
    var patient_id = getUrlParam('patient_id');//病人标识
    var l_paramstr = JSON.stringify({ 'patient_id': patient_id });
    $.ajax({
        type: 'POST',
        cache: false,
        data: { 'param': l_paramstr },
        url: '',
        dataType: 'json',
        success: function (res) {
            if (res.header.status == '300') {
                var res = res.body[0];
                var $left_menu = $('#discover_detail_leftmenu');//左侧菜单对象
                var $ul = $left_menu.find('ul');
                $left_menu.find('.name').text(res.patient_name);//患者姓名
                $left_menu.find('.sex').text(res.sex_name);//性别
                $left_menu.find('.age').text(res.age);//年龄
                $left_menu.find('.birthday').text(res.birth_date);//出生年月
                $left_menu.find('.addr').text(res.current_address);//地址
                var mz_data = res.mengzhen;//门诊病例数据
                var zy_data = res.zhuyuan;//住院病例数据
                for (var i = 0, len = mz_data.length; i < len; i++) {
                    var $li = $('<li>');
                    var $a = $('<a>');
                    $a.text(mz_data[i].visit_datetime + ' ' + '门诊病例' + (i + 1));
                    $li.append($a).attr({ 'data-health_event_id': mz_data[i].health_event_id, 'data-binglitype': 'mengzhen' });
                    $ul.append($li);
                }
                for (var j = 0, len = zy_data.length; j < len; i++) {
                    var $li = $('<li>');
                    var $a = $('<a>');
                    $a.text(zy_data[j].inp_date + ' ' + '住院病例' + (j + 1));
                    $li.append($a).attr({ 'data-health_event_id': mz_data[i].health_event_id, 'data-binglitype': 'zhuyuan' });
                    $ul.append($li);
                }
                var $firstli = $ul.find('li:first');
                $firstli.addClass('active').find('a').addClass('first');
                var health_event_id = $firstli.data('health_event_id');
                var binglitype = $firstli.data('binglitype');
                get_discover_detail_data(health_event_id, get_discover_detail_data);
            }
        }
    });
    //左侧菜单点击切换右侧数据
    $('.discover-box .nav-box').on('click', 'li', function () {
        var $this = $(this);
        $this.addClass('active').siblings().removeClass('active');
        var health_event_id = $this.data('health_event_id');
        var binglitype = $this.data('binglitype');
        get_discover_detail_data(health_event_id, binglitype);
    });
    //获取详情右侧具体数据
    function get_discover_detail_data(health_event_id, binglitype) {
        var paramstr = JSON.stringify({ "health_event_id": health_event_id, "binglitype": binglitype });
        $.ajax({
            type: 'POST',
            cache: false,
            data: { 'param': paramstr },
            url: '',
            dataType: 'json',
            success: function (res) {
                if (res.header.status == '300') {
                    res = res.body[0];
                    var $box = $('#discover_detail_right');//右侧数据区域
                    $box.find('p').remove();
                    if (binglitype == 'zhuyuan') {
                        for (var item in res) {
                            switch (item) {
                                case 'org_id':
                                    if (res[item] == '000001') {
                                        $box.find('h2').text('湘雅附一医院');
                                    } else if (res[item] == '000002') {
                                        $box.find('h2').text('湘雅附二医院');
                                    } else if (res[item] == '000003') {
                                        $box.find('h2').text('湘雅附三医院');
                                    } else {
                                        $box.find('h2').text('其它医院');
                                    }
                                    break;
                                case 'physician_doctor_sign':
                                    $box.append('<p><span class="tit">医生姓名</span>' + res[item] + '</p>');
                                    break;
                                case 'inp_date':
                                    $box.append('<p><span class="tit">住院时间</span>' + res[item] + '</p>');
                                    break;
                                case 'inp_dept_name':
                                    $box.append('<p><span class="tit">科室名称</span>' + res[item] + '</p>');
                                    break;
                                case 'dishospital_date':
                                    $box.append('<p><span class="tit">出院时间</span>' + res[item] + '</p>');
                                    break;
                                case 'diag_name':
                                    $box.append('<p><span class="tit">诊断名称</span>' + res[item] + '</p>');
                                    break;
                                case 'advice_item_content':
                                    $box.append('<p><span class="tit">医嘱</span>' + res[item] + '</p>');
                                    break;
                                default:
                                    $box.append('<p><span class="tit">其它</span>' + res[item] + '</p>');
                            }
                        }
                    } else {
                        for (var item in res) {
                            switch (item) {
                                case 'org_id':
                                    if (res[item] == '000001') {
                                        $box.find('h2').text('湘雅附一医院');
                                    } else if (res[item] == '000002') {
                                        $box.find('h2').text('湘雅附二医院');
                                    } else if (res[item] == '000003') {
                                        $box.find('h2').text('湘雅附三医院');
                                    } else {
                                        $box.find('h2').text('其它医院');
                                    }
                                    break;
                                case 'visit_datetime':
                                    $box.append('<p><span class="tit">门诊时间</span>' + res[item] + '</p>');
                                    break;
                                case 'dept_name':
                                    $box.append('<p><span class="tit">科室名称</span>' + res[item] + '</p>');
                                    break;
                                case 'diag_name':
                                    $box.append('<p><span class="tit">诊断名称</span>' + res[item] + '</p>');
                                    break;
                                case 'doctor_sign':
                                    $box.append('<p><span class="tit">医生姓名</span>' + res[item] + '</p>');
                                    break;
                                default:
                                    $box.append('<p><span class="tit">其它</span>' + res[item] + '</p>');
                            }
                        }
                    }
                }
            }
        });
    }
});