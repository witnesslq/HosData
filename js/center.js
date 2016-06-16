$(function () {
    //个人中心，左侧边栏主菜单点击事件
    $('.leftside').on('click', 'dt', function () {
        $(this).parent().toggleClass('my-open');
    });
    //个人中心，左侧边栏子菜单点击事件
    $('.leftside').on('click', 'dd', function () {
        var con_id = $(this).data('con');
        $(this).addClass('active').siblings('dd').removeClass('active');
        $(this).parent().addClass('active').siblings('dl').removeClass('active').find('dd').removeClass('active');
        $('.center').removeClass('active');
        $('#' + con_id).addClass('active');
        //数据概述数据初始化
        if (con_id == 'data_summary_con') {
            var $sexper_chart = $('#data_summary_con_chart02box');
            $sexper_chart.removeClass('hide');
            var dept_name = $(this).attr('dept_name');//科室名字
            var $part_01 = $('#data_summary_con .numsul');//数量数据集体化对象
            if (dept_name == '妇科') {
                $sexper_chart.addClass('hide');
            }
            //第一部分数据初始化
            var ajaxdata = new Object();
            ajaxdata.dept_name = dept_name;
            var ajaxdata_json = JSON.stringify(ajaxdata);
            $.getJSON("../json/data_summary_con01.json", function (res) {
                if (res.header.status == '300') {
                    var res = res.body;
                    $part_01.find('.patients').text(res.patients);//患者数量
                    $part_01.find('.mrecords').text(res.mrecords);//病例数量
                    $part_01.find('.operations').text(res.operations);//手术例数
                    $part_01.find('.outpatient').text(res.outpatient);//门诊记录
                    $part_01.find('.checks').text(res.checks);//检查记录
                    $part_01.find('.tests').text(res.tests);//检验记录
                    $part_01.find('.inhospital_per').text(res.inhospital_per);//住院比例
                    $part_01.find('.inhospitals').text(res.inhospitals);//住院记录
                    $part_01.find('.prescrib').text(res.prescrib);//医嘱数量
                    $part_01.find('.deads').text(res.deads);//死亡数量
                }
            });
            //第一部分数据初始化
            //$.ajax({
            //    type: 'POST',
            //    url: '',
            //    cache: false,
            //    data: { "dept_name": dept_name},
            //    dataType: 'json',
            //    success: function (res) {
            //        if (res.header.status == '300') {
            //            var res = res.body;
            //            $part_01.find('.patients').text(res.patients);//患者数量
            //            $part_01.find('.mrecords').text(res.mrecords);//病例数量
            //            $part_01.find('.operations').text(res.operations);//手术例数
            //            $part_01.find('.outpatient').text(res.outpatient);//门诊记录
            //            $part_01.find('.checks').text(res.checks);//检查记录
            //            $part_01.find('.tests').text(res.tests);//检验记录
            //            $part_01.find('.inhospital_per').text(res.inhospital_per);//住院比例
            //            $part_01.find('.inhospitals').text(res.inhospitals);//住院记录
            //            $part_01.find('.prescrib').text(res.prescrib);//医嘱数量
            //            $part_01.find('.patients').text(res.deads);//死亡数量
            //        }
            //    }
            //});
            //患者年龄数据初始化
            $.getJSON("../json/data_summary_con02.json", function (res) {
                if (res.header.status == '300') {
                    var res = res.body;
                    for (var i = 0, len = res.length; i < len; i++) {
                        switch (res[i].city) {
                            case 4301:
                                res[i].city = '长沙市';
                                break;
                            case 4302:
                                res[i].city = '株洲市';
                                break;
                            case 4303:
                                res[i].city = '湘潭市';
                                break;
                            case 4304:
                                res[i].city = '衡阳市';
                                break;
                            case 4305:
                                res[i].city = '邵阳市';
                                break;
                            case 4306:
                                res[i].city = '岳阳市';
                                break;
                            case 4307:
                                res[i].city = '常德市';
                                break;
                            case 4308:
                                res[i].city = '张家界市';
                                break;
                            case 4309:
                                res[i].city = '益阳市';
                                break;
                            case 4310:
                                res[i].city = '郴州市';
                                break;
                            case 4311:
                                res[i].city = '永州市';
                                break;
                            case 4312:
                                res[i].city = '怀化市';
                                break;
                            case 4313:
                                res[i].city = '娄底市';
                                break;
                            case 4331:
                                res[i].city = '湘西自治州';
                                break;
                            default:
                                res[i].city = '长沙市';
                        }
                    };
                    //患者年龄图表初始化
                    var legend_data = [];//市数组
                    var series_data = [];//市及年龄数据数组
                    for (var i = 0, len = res.length; i < len; i++) {
                        legend_data.push(res[i].city);
                        var item = {
                            name: res[i].city,
                            type: 'scatter',
                            data: res[i].data
                        };
                        series_data.push(item);
                    };
                    echarts.init(document.getElementById('data_summary_con_chart01')).setOption({
                        grid: {
                            left: '7%',
                            right: '16%',
                            bottom: '3%',
                            containLabel: true
                        },
                        tooltip: {
                            trigger: 'axis',
                            showDelay: 0,
                            formatter: function (params) {
                                if (params.value.length > 1) {
                                    return params.seriesName + ' :<br/>'
                                + params.value[0] + '周岁<br/>'
                                   + '患病人数为' + params.value[1] + '个';
                                }
                                else {
                                    return params.seriesName + ' :<br/>'
                                       + params.name + ' : '
                                       + params.value + '个';
                                }
                            },
                            axisPointer: {
                                show: true,
                                type: 'cross',
                                lineStyle: {
                                    type: 'dashed',
                                    width: 1
                                }
                            }
                        },
                        legend: {
                            data: legend_data,
                            itemGap: 11,
                            top: '55px',
                            right: 'right',
                            orient: 'vertical'
                        },
                        xAxis: [
                        {
                            type: 'value',
                            name: '患者年龄',
                            nameGap: 5,
                            nameTextStyle: {
                                fontSize: 14
                            },
                            scale: true,
                            axisLabel: {
                                formatter: '{value}'
                            },
                            splitLine: {
                                lineStyle: {
                                    type: 'dashed'
                                }
                            }
                        }
                        ],
                        yAxis: [
            {
                type: 'value',
                name: '患者数量（单位：个）',
                nameGap: 25,
                nameTextStyle: {
                    fontSize: 14
                },
                scale: true,
                axisLabel: {
                    formatter: '{value}'
                },
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                }
            }
                        ],
                        series: series_data
                    });
                }
            });
            //患者年龄数据初始化
            //$.ajax({
            //    type: 'POST',
            //    url: '../json/data_summary_con02.json',
            //    cache: false,
            //    data: { 'dept_name': dept_name },
            //    dataType: 'json',
            //    success: function (res) {
            //        if (res.header.status == '300') {
            //            var res = res.body;
            //            for (var i = 0, len = res.length; i < len; i++) {
            //                switch (res[i].city) {
            //                    case 4301:
            //                        res[i].city = '长沙市';
            //                        break;
            //                    case 4302:
            //                        res[i].city = '株洲市';
            //                        break;
            //                    case 4303:
            //                        res[i].city = '湘潭市';
            //                        break;
            //                    case 4304:
            //                        res[i].city = '衡阳市';
            //                        break;
            //                    case 4305:
            //                        res[i].city = '邵阳市';
            //                        break;
            //                    case 4306:
            //                        res[i].city = '岳阳市';
            //                        break;
            //                    case 4307:
            //                        res[i].city = '常德市';
            //                        break;
            //                    case 4308:
            //                        res[i].city = '张家界市';
            //                        break;
            //                    case 4309:
            //                        res[i].city = '益阳市';
            //                        break;
            //                    case 4310:
            //                        res[i].city = '郴州市';
            //                        break;
            //                    case 4311:
            //                        res[i].city = '永州市';
            //                        break;
            //                    case 4312:
            //                        res[i].city = '怀化市';
            //                        break;
            //                    case 4313:
            //                        res[i].city = '娄底市';
            //                        break;
            //                    case 4331:
            //                        res[i].city = '湘西自治州';
            //                        break;
            //                    default:
            //                        res[i].city = '长沙市';
            //                }
            //            };
            //            //患者年龄图表初始化
            //            var legend_data = [];//市数组
            //            var series_data = [];//市及年龄数据数组
            //            for (var i = 0, len = res.length; i < len; i++) {
            //                legend_data.push(res.city);
            //                var item = {
            //                    name: res.city,
            //                    type: 'scatter',
            //                    data: res.data
            //                };
            //                series_data.push(item);
            //            };
            //            echarts.init(document.getElementById('data_summary_con_chart01')).setOption({
            //                grid: {
            //                    left: '7%',
            //                    right: '10%',
            //                    bottom: '3%',
            //                    containLabel: true
            //                },
            //                tooltip: {
            //                    trigger: 'axis',
            //                    showDelay: 0,
            //                    formatter: function (params) {
            //                        if (params.value.length > 1) {
            //                            return params.seriesName + ' :<br/>'
            //                               + params.value[0] + '周岁<br/>'
            //                               + '患病人数为' + params.value[1] + '个';
            //                        }
            //                        else {
            //                            return params.seriesName + ' :<br/>'
            //                               + params.name + ' : '
            //                               + params.value + '个';
            //                        }
            //                    },
            //                    axisPointer: {
            //                        show: true,
            //                        type: 'cross',
            //                        lineStyle: {
            //                            type: 'dashed',
            //                            width: 1
            //                        }
            //                    }
            //                },
            //                legend: {
            //                    data: legend_data,
            //                    itemGap: 11,
            //                    top:'55px',
            //                    right: 'right',
            //                    orient:'vertical'
            //                },
            //                xAxis: [
            //                    {
            //                        type: 'value',
            //                        name: '患者年龄',
            //                        nameGap: 5,
            //                        nameTextStyle: {
            //                            fontSize: 14
            //                        },
            //                        scale: true,
            //                        axisLabel: {
            //                            formatter: '{value}'
            //                        },
            //                        splitLine: {
            //                            lineStyle: {
            //                                type: 'dashed'
            //                            }
            //                        }
            //                    }
            //                ],
            //                yAxis: [
            //                    {
            //                        type: 'value',
            //                        name: '患者数量（单位：个）',
            //                        nameGap: 25,
            //                        nameTextStyle: {
            //                            fontSize: 14
            //                        },
            //                        scale: true,
            //                        axisLabel: {
            //                            formatter: '{value}'
            //                        },
            //                        splitLine: {
            //                            lineStyle: {
            //                                type: 'dashed'
            //                            }
            //                        }
            //                    }
            //                ],
            //                series: series_data
            //            });
            //        }
            //    }
            //});
            //性别比例图表初始化
            $.getJSON("../json/data_summary_con03.json", function (res) {
                if (res.header.status == '300') {
                    var res = res.body;
                    echarts.init(document.getElementById('data_summary_con_chart02')).setOption({
                        tooltip: {
                            trigger: 'item',
                            formatter: "{d}%"
                        },
                        series: [
                            {
                                name: '男女比例',
                                type: 'pie',
                                radius: '80%',
                                center: ['50%', '50%'],
                                data: [
                                    {
                                        value: res.man, name: '男士', itemStyle: {
                                            normal: {
                                                color: '#79b3ed'
                                            },
                                            emphasis: {
                                                shadowBlur: 10,
                                                shadowOffsetX: 0,
                                                shadowColor: 'rgba(121, 179, 237, 0.5)'
                                            }
                                        }
                                    },
                                    {
                                        value: res.woman, name: '女士', itemStyle: {
                                            normal: {
                                                color: '#fc9595'
                                            },
                                            emphasis: {
                                                shadowBlur: 10,
                                                shadowOffsetX: 0,
                                                shadowColor: 'rgba(252, 149, 149, 0.5)'
                                            }
                                        }
                                    },
                                ],
                                itemStyle: {
                                    normal: {
                                        label: {
                                            show: true,
                                        },
                                        labelLine: {
                                            show: false
                                        }
                                    }
                                }
                            }
                        ]
                    });
                }
            });
            //性别比例图表初始化
            //$.ajax({
            //    type: 'POST',
            //    url: '../json/data_summary_con03.json',
            //    cache: false,
            //    data: { 'dept_name': dept_name },
            //    dataType: 'json',
            //    success: function (res) {
            //        if (res.header.status == '300') {
            //            var res = res.body;
            //            echarts.init(document.getElementById('data_summary_con_chart02')).setOption({
            //                tooltip: {
            //                    trigger: 'item',
            //                    formatter: "{d}%"
            //                },
            //                series: [
            //                    {
            //                        name: '男女比例',
            //                        type: 'pie',
            //                        radius: '80%',
            //                        center: ['50%', '50%'],
            //                        data: [
            //                            {
            //                                value: res.man, name: '男士', itemStyle: {
            //                                    normal: {
            //                                        color: '#79b3ed'
            //                                    },
            //                                    emphasis: {
            //                                        shadowBlur: 10,
            //                                        shadowOffsetX: 0,
            //                                        shadowColor: 'rgba(121, 179, 237, 0.5)'
            //                                    }
            //                                }
            //                            },
            //                            {
            //                                value: res.woman, name: '女士', itemStyle: {
            //                                    normal: {
            //                                        color: '#fc9595'
            //                                    },
            //                                    emphasis: {
            //                                        shadowBlur: 10,
            //                                        shadowOffsetX: 0,
            //                                        shadowColor: 'rgba(252, 149, 149, 0.5)'
            //                                    }
            //                                }
            //                            },
            //                        ],
            //                        label: {
            //                            normal: {
            //                                textStyle: {
            //                                    color: '#fff'
            //                                }
            //                            }
            //                        },
            //                        labelLine: {
            //                            normal: {
            //                                lineStyle: {
            //                                    color: '#fff'
            //                                }
            //                            }
            //                        }
            //                    }
            //                ]
            //            });
            //        }
            //    }
            //});
            //地域图表初始化
            $.getJSON("../json/test.json", function (res) {
                if (res.header.status == '300') {
                    var res = res.body;
                    var lastres = [{ 'name': '长沙市', value: 0 }, { 'name': '株洲市', value: 0 }, { 'name': '湘潭市', value: 0 }, { 'name': '衡阳市', value: 0 }, { 'name': '邵阳市', value: 0 }, { 'name': '岳阳市', value: 0 }, { 'name': '常德市', value: 0 }, { 'name': '张家界市', value: 0 }, { 'name': '益阳市', value: 0 }, { 'name': '郴州市', value: 0 }, { 'name': '永州市', value: 0 }, { 'name': '怀化市', value: 0 }, { 'name': '娄底市', value: 0 }, { 'name': '湘西土家族苗族自治州', value: 0 }];
                    for (var i = 0, len = res.length; i < len; i++) {
                        switch (res[i].name) {
                            case 4301:
                                res[i].name = '长沙市';
                                break;
                            case 4302:
                                res[i].name = '株洲市';
                                break;
                            case 4303:
                                res[i].name = '湘潭市';
                                break;
                            case 4304:
                                res[i].name = '衡阳市';
                                break;
                            case 4305:
                                res[i].name = '邵阳市';
                                break;
                            case 4306:
                                res[i].name = '岳阳市';
                                break;
                            case 4307:
                                res[i].name = '常德市';
                                break;
                            case 4308:
                                res[i].name = '张家界市';
                                break;
                            case 4309:
                                res[i].name = '益阳市';
                                break;
                            case 4310:
                                res[i].name = '郴州市';
                                break;
                            case 4311:
                                res[i].name = '永州市';
                                break;
                            case 4312:
                                res[i].name = '怀化市';
                                break;
                            case 4313:
                                res[i].name = '娄底市';
                                break;
                            case 4331:
                                res[i].name = '湘西自治州';
                                break;
                            default:
                                res[i].name = '长沙市';
                        }
                    };
                    for (var j = 0, lenj = res.length; j < lenj; j++) {
                        for (var k = 0, lenk = lastres.length; k < lenk; k++) {
                            if (lastres[k].name == res[j].name) {
                                lastres[k].value = res[j].value;
                            }
                        }
                    };
                    $.getJSON('../json/hunan.json', function (hunanJson) {
                        echarts.registerMap('hunan', hunanJson);
                        var chart = echarts.init(document.getElementById('data_summary_con_chart03'));
                        chart.setOption({
                            tooltip: {
                                trigger: 'item',
                                formatter: '{b}<br/>{a}<br/>患者占比{c}%'
                            },
                            series: [{
                                type: 'map',
                                map: 'hunan',
                                name: dept_name,
                                roam: false,
                                label: {
                                    normal: {
                                        show: true
                                    },
                                    emphasis: {
                                        show: true,
                                    }
                                },
                                data: lastres
                            }],
                            visualMap: {
                                min: 0,
                                max: 100,
                                right: 'right',
                                top: 'top',
                                text: ['多', '少'],           // 文本，默认为数值文本
                                calculable: false,
                                orient: 'horizontal',
                                inRange: {
                                    color: ['#e5f0fa', '#acd1f5', '#79b3ed']
                                },
                                top: 40,
                                right: 20
                            },
                        });
                    });
                }
            });
            //地域图表初始化
            //$.ajax({
            //    type: 'POST',
            //    url: '../json/data_summary_con04.json',
            //    cache: false,
            //    data: { 'dept_name': dept_name },
            //    dataType: 'json',
            //    success: function (res) {
            //        if (res.header.status == '300') {
            //            var res = res.body;
            //            for (var i = 0, len = res.length; i < len; i++) {
            //                switch (res[i].name) {
            //                    case 4301:
            //                        res[i].name = '长沙市';
            //                        break;
            //                    case 4302:
            //                        res[i].name = '株洲市';
            //                        break;
            //                    case 4303:
            //                        res[i].name = '湘潭市';
            //                        break;
            //                    case 4304:
            //                        res[i].name = '衡阳市';
            //                        break;
            //                    case 4305:
            //                        res[i].name = '邵阳市';
            //                        break;
            //                    case 4306:
            //                        res[i].name = '岳阳市';
            //                        break;
            //                    case 4307:
            //                        res[i].name = '常德市';
            //                        break;
            //                    case 4308:
            //                        res[i].name = '张家界市';
            //                        break;
            //                    case 4309:
            //                        res[i].name = '益阳市';
            //                        break;
            //                    case 4310:
            //                        res[i].name = '郴州市';
            //                        break;
            //                    case 4311:
            //                        res[i].name = '永州市';
            //                        break;
            //                    case 4312:
            //                        res[i].name = '怀化市';
            //                        break;
            //                    case 4313:
            //                        res[i].name = '娄底市';
            //                        break;
            //                    case 4331:
            //                        res[i].name = '湘西土家族苗族自治州';
            //                        break;
            //                    default:
            //                        res[i].name = '长沙市'
            //                }
            //            };
            //            $.getJSON('../json/hunan.json', function (hunanJson) {
            //                echarts.registerMap('hunan', hunanJson);
            //                var chart = echarts.init(document.getElementById('data_summary_con_chart03'));
            //                chart.setOption({
            //                    tooltip: {
            //                        trigger: 'item',
            //                        formatter: '{b}<br/>{a}<br/>患者占比{c}%'
            //                    },
            //                    series: [{
            //                        type: 'map',
            //                        map: 'hunan',
            //                        name: dept_name,
            //                        roam: false,
            //                        label: {
            //                            normal: {
            //                                show: true
            //                            },
            //                            emphasis: {
            //                                show: true,
            //                            }
            //                        },
            //                        data: res
            //                    }],
            //                    visualMap: {
            //                        min: 0,
            //                        max: 100,
            //                        right: 'right',
            //                        top: 'top',
            //                        text: ['多', '少'],           // 文本，默认为数值文本
            //                        calculable: false,
            //                        orient: 'horizontal',
            //                        inRange: {
            //                            color: ['#e5f0fa', '#acd1f5', '#79b3ed']
            //                        },
            //                        top: 40,
            //                        right: 20
            //                    },
            //                });
            //            });
            //        }
            //    }
            //});
        }
    });
    //个人中心，数据探索右侧推荐tab切换效果
    $('.data-discover-con .tabul li').hover(function () {
        var _this = this;
        $(_this).addClass('active').siblings().removeClass('active');
        var con_id = $(_this).data('con');
        $('.data-discover-con .tabcon>li').removeClass('active');
        $('#' + con_id).addClass('active');
    });
    var add_data_dis_html = '<div class="search-box pl-60">\
                    <input class="oneinput" readonly type="text" />\
                    <span class="del"></span>\
                </div>';
    //个人中心，数据探索普通搜索，搜索按钮事件
    $('#data_discover_con').on('click', '.btn-searchpt', function () {
        discover_pt_event(1, 10);
    });
    //个人中心，数据探索添加类目
    $('#data_discover_con').on('click', '.search-gj .add-btn', function () {
        $('#data_discover_con .search-gj .bar-group').before(add_data_dis_html);
    });
    //个人中心，数据探索类目删除
    $('#data_discover_con').on('click', '.search-gj .del', function () {
        $(this).parent().remove();
    });
    //个人中心，数据探索，高级搜索返回
    $('#data_discover_con').on('click', '.search-gj .back-pt', function () {
        $('#data_discover_con .search-pt').removeClass('hide');
        $('#data_discover_con .search-gj').addClass('hide');
    });
    //个人中心，数据探索，高级搜索里探索按钮
    $('#data_discover_con').on('click', '.search-gj .search-btn', function () {
        discover_gj_event(1, 10);
    });
    //个人中心，数据探索分页点击事件
    $('#data_discover_con').on('click', '.pagination li:not(.disabled)', function () {
        var current_page = $(this).attr('pagenum');
        if ($('#data_discover_con').find('.search-pt').hasClass('hide')) {
            discover_gj_event(current_page, 10);
        } else {
            discover_pt_event(current_page, 10);
        }
    });
    //个人中心，数据探索分页确定按钮点击事件
    $('#data_discover_con').on('click', 'nav .inputbox a', function () {
        var current_page = parseInt($.trim($('#data_discover_con nav .inputbox input').val()));
        var total_page = parseInt($.trim($('#data_discover_con .pagination .last').attr('pagenum')));
        if (!current_page || current_page == 0) {
            current_page = 1;
        }
        if (current_page > total_page) {
            current_page = total_page;
        }
        if ($('#data_discover_con').find('.search-pt').hasClass('hide')) {
            discover_gj_event(current_page, 10);
        } else {
            discover_pt_event(current_page, 10);
        }
    });
    //个人中心，数据探索，高级搜索查询数据事件
    function discover_gj_event(current_page, page_size) {
        var switch_val = $('#data_discover_gjconf').val();
        var param = {
            "paramlist": [
            {
                "pageinfo": {
                    "switch": switch_val,
                    "currentpage": current_page,
                    "pagesize": page_size
                }
            },
            {
                "org_patient_info": []
            },
            {
                "outp_mr": []
            },
            {
                "outp_diag_info": []
            },
            {
                "inp_rec_inp_mr_page": []
            },
            {
                "inp_mr_diag": []
            },
            {
                "exam_info": []
            },
            {
                "lab_info": []
            },
            {
                "general_operation_record": []
            }
            ]
        };
        $('#data_discover_con .search-gj .search-box').each(function (index, item) {
            var $f_input = $(item).find('.oneinput')
            var f_val = $f_input.val();
            var $twosel = $(item).find('.twosel');
            if (!f_val) {
                return true;
            }
            if ($twosel.length > 0) {
                if ($twosel.hasClass('noswitch')) {
                    var tablename = $f_input.data('tablename');
                    var colname = $f_input.data('colname');
                    for (var i = 0, len = param.paramlist.length; i < len; i++) {
                        for (var item in param.paramlist[i]) {
                            if (item == tablename) {
                                var jsonp = {};
                                jsonp["conf_scope"] = "1";
                                jsonp[colname] = $twosel.val();
                                param.paramlist[i][item].push(jsonp);
                            }
                        }
                    }
                } else {
                    var t_val = $.trim($(item).find('.twoinput').val());
                    if (!t_val) {
                        return true;
                    } else {
                        var tablename = $f_input.data('tablename');
                        var colname = $f_input.data('colname');
                        for (var i = 0, len = param.paramlist.length; i < len; i++) {
                            for (var item in param.paramlist[i]) {
                                if (item == tablename) {
                                    var jsonp = {};
                                    jsonp["conf_scope"] = $twosel.val();
                                    jsonp[colname] = t_val;
                                    param.paramlist[i][item].push(jsonp);
                                }
                            }
                        }
                    }
                }
            } else {
                var start_val = $.trim($(item).find('.m_starttime').val());
                var end_val = $.trim($(item).find('.m_endtime').val());
                if (!start_val || !end_val) {
                    return true;
                }
                var tablename = $f_input.data('tablename');
                var colname = $f_input.data('colname');
                for (var i = 0, len = param.paramlist.length; i < len; i++) {
                    for (var item in param.paramlist[i]) {
                        if (item == tablename) {
                            var jsonp = {};
                            jsonp["conf_scope"] = "3";
                            jsonp[colname] = start_val + ',' + end_val;
                            param.paramlist[i][item].push(jsonp);
                        }
                    }
                }
            }
        });
        //ajax提交获取查询结果
        var ajax_data = JSON.stringify(param);
        $.ajax({
            type: 'POST',
            cache: false,
            data: { "param": ajax_data },
            url: '',
            dataType: 'json',
            success: function (res) {
                if (res.header.status == '300') {
                    $('#discover_peos').text(res.header.total);
                    var res_box = $('#data_discover_con').find('.searchres .leftside').empty();
                    var res_array = res.body;
                    for (var i = 0, len = res_array.length; i < len; i++) {
                        var item = res_array[i];
                        var org_name = '湘雅附一';
                        if (item.org_id == '000001') {
                            org_name = '湘雅附一';
                        } else if (item.org_id == '000002') {
                            org_name = '湘雅附二';
                        } else if (item.org_id == '000003') {
                            org_name = '湘雅附三';
                        }
                        var $a = $('<a>').attr({ 'href': 'discover/detail.html?patient_id=' + item.patient_id, 'target': '_blank' });
                        var $ul = $('<ul class="list-inline titul">\
                            <li>' + item.patient_name + '</li>\
                            <li>' + item.sex_name + '</li>\
                            <li>出生年月：<span>' + item.birth_date + '</span></li>\
                            <li>所属医院：<span>' + org_name + '</span></li>\
                            <li>该患者共<span>' + item.case + '</span>份病历</li>\
                        </ul>');
                        $a.append($ul);
                        res_box.append($a);
                    }
                    var total_page = Math.ceil(parseInt(res.header.total) / parseInt(res.header.pagesize));
                    if (total_page > 1000) {
                        total_page = 1000;
                    }
                    generatePagination($('#data_discover_con nav'), total_page, res.header.pagesize, res.header.currentpage);
                }
            }
        });
    }
    //个人中心，数据探索，普通搜索查询数据事件
    function discover_pt_event(current_page, page_size) {
        var _val = $.trim($('#data_discover_con .btn-searchpt').siblings('input').val());
        if (_val) {
            var paramstr = JSON.stringify({
                "currentpage": current_page, "pagesize": page_size, "searchtxt": _val
            });
            //ajax提交获取查询结果
            $.ajax({
                type: 'POST',
                cache: false,
                data: {
                    'param': paramstr
                },
                url: '/men/getPatientList',
                dataType: 'json',
                success: function (res) {
                    if (res.header.status == '300') {
                        $('#discover_peos').text(res.header.total);
                        var res_box = $('#data_discover_con').find('.searchres .leftside').empty();
                        var res_array = res.body;
                        for (var i = 0, len = res_array.length; i < len; i++) {
                            var item = res_array[i];
                            var org_name = '湘雅附一';
                            if (item.org_id == '000001') {
                                org_name = '湘雅附一';
                            } else if (item.org_id == '000002') {
                                org_name = '湘雅附二';
                            } else if (item.org_id == '000003') {
                                org_name = '湘雅附三';
                            }
                            var $a = $('<a>').attr({
                                'href': 'index/detail.html?patient_id=' + item.patient_id, 'target': '_blank'
                            });
                            var $ul = $('<ul class="list-inline titul">\
                            <li>' + item.patient_name + '</li>\
                            <li>' + item.sex_name + '</li>\
                            <li>出生年月：<span>' + item.birth_date + '</span></li>\
                            <li>所属医院：<span>' + org_name + '</span></li>\
                            <li>该患者共<span>' + item.case + '</span>份病历</li>\
                        </ul>');
                            $a.append($ul);
                            if (item.menzhen) {
                                var menzhenobj = item.menzhen;
                                var $p = $('<p class="conp" >门诊时间：<span class="vtime"></span></p>');
                                for (var item in menzhenobj) {
                                    if (item == 'visit_datetime') {
                                        $p.find('.vtime').text(menzhenobj[item]);
                                    } else {
                                        $p.append(item + '&nbsp;&nbsp;' + menzhenobj[item]);
                                    }
                                }
                                $a.append($p);
                            }
                            if (item.zhuyuan) {
                                var zhuyuanobj = item.zhuyuan;
                                var $p = $('<p class="conp" >住院时间：<span class="vtime"></span></p>');
                                for (var item in zhuyuanobj) {
                                    if (item == 'inp_date') {
                                        $p.find('.vtime').text(zhuyuanobj[item]);
                                    } else {
                                        $p.append(item + '&nbsp;&nbsp;' + zhuyuanobj[item]);
                                    }
                                }
                                $a.append($p);
                            }
                            res_box.append($a);
                        }
                        var total_page = Math.ceil(parseInt(res.header.total) / parseInt(res.header.pagesize));
                        if (total_page > 1000) {
                            total_page = 1000;
                        }
                        generatePagination($('#data_discover_con nav'), total_page, res.header.pagesize, res.header.currentpage);
                    }
                }
            });
        }
    }
    //个人中心，数据探索，普通搜索里高级按钮事件
    $('#data_discover_con').on('click', '.search-pt .btn-searchgj', function () {
        $('#data_discover_con .search-gj').removeClass('hide');
        $('#data_discover_con .search-pt').addClass('hide');
    });
    var bd_search_timer = null;//类似百度搜索条件弹出框定时器
    //个人中心，数据探索，全部条件组中第二个输入框获得焦点弹出选择层事件
    $('#data_discover_con').on('focus', '.search-gj .search-box .twoinput', function () {
        if (bd_search_timer) {
            clearTimeout(bd_search_timer);
            bd_search_timer = null;
        }
        var $this = $(this);
        $('#data_discover_con .search-item-box').addClass('hide');
        var $search_item = $('#data_discover_con .bd-search-box');
        var top = $this.offset().top + 29;
        var left = $this.offset().left;
        $search_item.css({ 'top': top, 'left': left }).data('target', this);
        var _val = $.trim($this.val());
        if (_val) {
            bd_ajax_handle(_val);
        } else {
            $search_item.addClass('hide');
        }
    });
    //个人中心，数据探索，全部条件组中第二个输入框失去焦点隐藏选择层事件
    $('#data_discover_con').on('blur', '.search-gj .search-box .twoinput', function () {
        var $search_item = $('#data_discover_con .bd-search-box');
        bd_search_timer = setTimeout(function () {
            $search_item.addClass('hide');
        }, 100);
    });
    //个人中心，数据探索，全部条件组中第二个输入框键盘输入模糊匹配事件
    $('#data_discover_con').on('keyup', '.search-gj .search-box .twoinput', function () {
        var $this = $(this);
        var val = $.trim($this.val());
        if (!val) {
            $('#data_discover_con .bd-search-box').addClass('hide');
            return false;
        }
        var table_name = $this.siblings('.oneinput').data('tablename');
        var colume_name = $this.siblings('.oneinput').data('colname');
        bd_ajax_handle(table_name, colume_name, val);
    });
    function bd_ajax_handle(table_name, colume_name, _val) {
        var paramstr = JSON.stringify({ 'table_name': table_name, 'colume_name': colume_name, 'search_value': _val });
        $.ajax({
            type: 'POST',
            cache: false,
            data: { 'param': paramstr },
            url: '/men/getSearchList',
            dataType: 'json',
            success: function (res) {
                if (res.header.status == '300') {
                    var $ul = $('#data_discover_con .bd-search-box');
                    $ul.empty();
                    var items = res.body;
                    for (var i = 0, len = items.length; i < len; i++) {
                        $li = $('<li>' + items[i].bd_res + '</li>');
                        $ul.append($li);
                    }
                    $ul.removeClass('hide');
                }
            }
        });
    }
    //个人中心，数据探索，添加条件第一个输入框获得焦点弹出选择层事件
    $('#data_discover_con').on('focus', '.search-gj .search-box .oneinput', function () {
        var $search_item = $('#data_discover_con .search-item-box');
        $search_item.find('input').val('');
        $search_item.find('li').removeClass('hide');
        $search_item.find('dl').removeClass('active');
        $search_item.find('dd').removeClass('hide');
        var top = $(this).offset().top + 33;
        var left = $(this).offset().left;
        $search_item.css({ 'top': top, 'left': left }).removeClass('hide').data('target', this);
    });
    //个人中心，数据探索，条件弹出选择层选择条件收缩效果
    $('#data_discover_con').on('click', '.search-item-box dt', function () {
        $(this).parent().toggleClass('active');
    });
    //个人中心，数据探索，条件弹出选择层关闭按钮事件
    $('#data_discover_con').on('click', '.search-item-box .my-close', function () {
        $('#data_discover_con .search-item-box').addClass('hide');
    });
    //个人中心，数据探索，条件弹出选择层选择后事件
    $('#data_discover_con').on('click', '.search-item-box li', function () {
        data_discover_con_pop_sel.call(this);
    });
    $('#data_discover_con').on('click', '.search-item-box dd', function () {
        data_discover_con_pop_sel.call(this);
    });
    //个人中心，数据探索，条件弹出选择层选择事件公共方法
    function data_discover_con_pop_sel() {
        var $this = $(this);
        var $search_item = $('#data_discover_con .search-item-box');
        var $target = $($search_item.data('target'));
        var _val = $this.text();
        var tablename = $(this).data('tablename');
        var colname = $(this).data('colname');
        var $parent = $target.parent();
        var has_sameitem = false;
        $parent.siblings('.search-box').find('.oneinput').each(function (index, item) {
            if ($(item).val() == _val) {
                has_sameitem = true;
                return false;
            }
        });
        if (has_sameitem) {
            alert('不要选择重复的选项,请重新选择！');
            $('#data_discover_con .search-item-box').addClass('hide');
            return;
        }
        $target.val(_val).attr({
            'data-tablename': tablename, 'data-colname': colname
        });
        $parent.find('.twosel').remove();
        $parent.find('.twoinput').remove();
        $parent.find('.agebox').remove();
        $parent.find('.datebox').remove();
        if (_val == '年龄') {
            $target.after('<div class="agebox"><input class="agestart m_starttime" type="text" /> 至 <input class="ageend m_endtime" type="text" /></div>');
        } else if (_val == '性别') {
            $target.after('<select class="twosel noswitch"><option value="全部">全部</option><option value="男">男</option><option value="女">女</option></select>');
        } else if (_val == '医院' || _val == '门诊医院' || _val == '住院医院') {
            $target.after('<select class="twosel noswitch"><option value="全部">全部</option><option value="000001">湘雅附一</option><option value="000002">湘雅附二</option><option value="000003">湘雅附三</option></select>');
        } else if (_val == '科室名称' || _val == '住院科室') {
            $target.after('<select class="twosel noswitch"><option value="全部">全部</option><option value="心血管内科">心血管内科</option><option value="神经内科">神经内科</option><option value="内分秘科">内分秘科</option><option value="肾内科">肾内科</option><option value="呼吸内科">呼吸内科</option>\
<option value="呼吸内科">呼吸内科</option><option value="消化内科">消化内科</option><option value="血液内科">血液内科</option><option value="神经内科">神经内科</option><option value="风湿免疫内科">风湿免疫内科</option><option value="骨科">骨科</option><option value="神经内科">神经内科</option></select>');
        } else if (_val == '民族名称') {
            $target.after('<select class="twosel noswitch"><option value="全部">全部</option><option value="汉族">汉族</option><option value="壮族">壮族</option><option value="满族">满族</option><option value="回族">回族</option><option value="苗族">苗族</option><option value="维吾尔族">维吾尔族</option><option value="土家族">土家族</option>\
                <option value="土家族">土家族</option><option value="蒙古族">蒙古族</option></select>');
        }
        else if (_val == '出生年月' || _val == '就诊日期' || _val == '诊断时间') {
            $target.after('<div class="datebox"><input class="datestart m_starttime" readonly type="text" /> 至 <input class="dateend m_endtime" readonly type="text" /></div>');
            var $start_input = $target.siblings('.datebox').find('input:eq(0)');
            var $end_input = $target.siblings('.datebox').find('input:eq(1)');
            $target.siblings('.datebox').find('input').datetimepicker({
                language: 'zh-CN',
                format: 'yyyy-mm-dd',
                autoclose: true,
                minView: 'month'
            }).on('changeDate', function (ev) {
                if ($start_input.val() == '') {
                    alert('请选择开始时间!');
                    $end_input.val('');
                    return false;
                }
                if ($end_input.val() != '') {
                    var starttimes = new Date($start_input.val()).getTime();
                    var endtimes = new Date($end_input.val()).getTime();
                    if (parseInt(starttimes) > parseInt(endtimes)) {
                        alert('开始时间不能大于结束时间，请重新选择')
                        $end_input.val('');
                        return false;
                    }
                }
            });;
        } else {
            $target.after('<select class="twosel"><option value="1">包含</option><option value="2">不包含</option></select>\
            <input class="twoinput" type="text" />');
        }
        $('#data_discover_con .search-item-box').addClass('hide');
    }
    //个人中心，数据探索，模拟百度条件弹出层选择后事件
    $('#data_discover_con').on('click', '.bd-search-box li', function () {
        var _this = this;
        var $search_item = $('#data_discover_con .bd-search-box');
        var target = $search_item.data('target');
        $(target).val($(_this).text());
    });
    //个人中心，数据探索，第一个条件弹出选择层中输入框内容变化事件
    $('#data_discover_con').on('keyup', '.search-item-box input', function () {
        var item_text = $.trim($(this).val());
        $('#data_discover_con .search-item-box li').addClass('hide');
        $('#data_discover_con .search-item-box dl').removeClass('active');
        $('#data_discover_con .search-item-box dd').addClass('hide');
        $('#data_discover_con .search-item-box li:contains("' + item_text + '")').removeClass('hide');
        $('#data_discover_con .search-item-box dd:contains("' + item_text + '")').removeClass('hide').parent().addClass('active');
        if (item_text == '') {
            $('#data_discover_con .search-item-box li').removeClass('hide');
            $('#data_discover_con .search-item-box dl').removeClass('active');
            $('#data_discover_con .search-item-box dd').removeClass('hide');
        }
    });
});