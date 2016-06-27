$(function () {
    //个人中心，左侧边栏主菜单点击事件
    $('.leftside').on('click', 'dt', function () {
        $(this).parent().toggleClass('my-open');
    });
    //个人中心，左侧边栏子菜单点击事件
    $('.leftside').on('click', 'dd', function () {
        var con_id = $(this).attr('con');
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
            $('#data_summary_con .selhospital select').val('all');//重置默认选择全部医院
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
            //疾病TOP数据初始化
            $.getJSON("../json/data_summary_con05.json", function (res) {
                if (res.header.status == '300') {
                    var res = res.body;
                    echarts.init(document.getElementById('data_summary_con_chart04')).setOption({
                        title: {
                            subtext: '疾病',
                            x: 'center',
                            subtextStyle: {
                                color:'#333'
                            }
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: "{b} : {c}%"
                        },
                        series: [
                            {
                                name: '疾病',
                                type: 'pie',
                                radius: '55%',
                                center: ['50%', '60%'],
                                data: res,
                                itemStyle: {
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                },
                                labelLine: {
                                    normal: {
                                        length: 5,
                                        length2: 3
                                    }
                                },
                            },

                        ]
                    });
                }
            });
            //用药TOP数据初始化
            $.getJSON("../json/data_summary_con06.json", function (res) {
                if (res.header.status == '300') {
                    var res = res.body;
                    echarts.init(document.getElementById('data_summary_con_chart05')).setOption({
                        title: {
                            subtext: '用药',
                            x: 'center',
                            subtextStyle: {
                                color: '#333'
                            }
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: "{b} : {c}%"
                        },
                        series: [
                            {
                                name: '用药',
                                type: 'pie',
                                radius: '55%',
                                center: ['50%', '60%'],
                                data: res,
                                itemStyle: {
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                },
                                labelLine: {
                                    normal: {
                                        length: 5,
                                        length2: 3
                                    }
                                },
                            },

                        ]
                    });
                }
            });
            //检查TOP数据初始化
            $.getJSON("../json/data_summary_con07.json", function (res) {
                if (res.header.status == '300') {
                    var res = res.body;
                    echarts.init(document.getElementById('data_summary_con_chart06')).setOption({
                        title: {
                            subtext: '检查',
                            x: 'center',
                            subtextStyle: {
                                color: '#333'
                            }
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: "{b} : {c}%"
                        },
                        series: [
                            {
                                name: '用药',
                                type: 'pie',
                                radius: '55%',
                                center: ['50%', '60%'],
                                data: res,
                                itemStyle: {
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                },
                                labelLine: {
                                    normal: {
                                        length: 5,
                                        length2: 3
                                    }
                                },
                            },

                        ]
                    });
                }
            });
            //患者年龄数据初始化
            $.getJSON("../json/data_summary_con02.json", function (res) {
                if (res.header.status == '300') {
                    var res = res.body;
                    //患者年龄图表初始化
                    echarts.init(document.getElementById('data_summary_con_chart01')).setOption({
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow'
                            },
                            formatter: '年龄：{b}<br />患者数量：{c}'
                        },
                        grid: {
                            left: '3%',
                            right: '14.5%',
                            bottom: '3%',
                            top: '10%',
                            containLabel: true
                        },
                        xAxis: {
                            type: 'category',
                            data: res.ages,
                            name: '患者年龄（岁）'
                        },
                        yAxis: {
                            type: 'value',
                            name: '患者数量（个）',
                            nameTextStyle: {
                                fontSize: 14,
                                color: '#333'
                            },
                            boundaryGap: [0, 0.01]
                        },
                        series: [
                            {
                                type: 'bar',
                                data: res.nums
                            }
                        ]
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
            $.getJSON("../json/data_summary_con04.json", function (res) {
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
                                formatter: '{b}<br/>{a}<br/>患者：{c}个'
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
        var con_id = $(_this).attr('con');
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
    //个人中心，数据探索普通搜索，搜索框回车键事件
    $('#data_discover_con').on('keyup', '.search-pt input', function (event) {
        if (event.keyCode == '13') {
            $('#data_discover_con .btn-searchpt').trigger('click');
        }
    });
    //个人中心，数据探索添加类目
    $('#data_discover_con').on('click', '.search-gj .add-btn', function () {
        $('#data_discover_con .search-gj .bar-group').before(add_data_dis_html);
        hide_search_item_box();
    });
    //个人中心，数据探索类目删除
    $('#data_discover_con').on('click', '.search-gj .del', function () {
        $(this).parent().remove();
        hide_search_item_box();
    });
    //个人中心，数据探索，高级搜索返回
    $('#data_discover_con').on('click', '.search-gj .back-pt', function () {
        $('#data_discover_con .search-pt').removeClass('hide');
        $('#data_discover_con .search-gj').addClass('hide');
        hide_search_item_box();
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
    //个人中心，数据探索分页输入框回车键事件
    $('#data_discover_con').on('keyup', 'nav .inputbox input', function (event) {
        if (event.keyCode == '13') {
            $('#data_discover_con nav .inputbox a').trigger('click');
        }
    });
    //个人中心，数据探索，高级搜索查询数据事件
    var discover_gj_loadflag = false;
    function discover_gj_event(current_page, page_size) {
        if (discover_gj_loadflag) {
            return false;
        }
        discover_gj_loadflag = true;
        tipsMask_pop('加载中…');
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
                    var tablename = $f_input.attr('tablename');
                    var colname = $f_input.attr('colname');
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
                        var tablename = $f_input.attr('tablename');
                        var colname = $f_input.attr('colname');
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
                var tablename = $f_input.attr('tablename');
                var colname = $f_input.attr('colname');
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
                    var res_box = $('#data_discover_con').find('.searchres .leftsidecon').empty();
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
                    tipsMask_del();
                    discover_gj_loadflag = false;
                }
            }
        });
    }
    //个人中心，数据探索，普通搜索查询数据事件
    var discover_pt_loadflag = false;
    function discover_pt_event(current_page, page_size) {
        var _val = $.trim($('#data_discover_con .btn-searchpt').siblings('input').val());
        if (_val) {
            if (discover_pt_loadflag) {
                return false;
            }
            discover_pt_loadflag = true;
            tipsMask_pop('加载中…');
            var load_count = 0;
            //ajax提交获取TOP查询结果
            $.ajax({
                type: 'POST',
                cache: false,
                data: {
                    'param': JSON.stringify({ 'searchtxt': _val })
                },
                url: '/men/getDrugDiseaseList',
                dataType: 'json',
                success: function (res) {
                    if (res.header.status == '300') {
                        var result = res.body;
                        var $top_box = $('#data_discover_con .rightsidecon');
                        var $jbul = $('#top_01').find('ul').empty();
                        var $yyul = $('#top_02').find('ul').empty();
                        for (var topkey in result) {
                            if (topkey == 'disease') {
                                if (result[topkey].length <= 0) {
                                    $jbul.append('<li class="nodata">暂无数据</li>');
                                } else {
                                    for (var jbi = 0, jblen = result[topkey].length; jbi < jblen; jbi++) {
                                        $jbul.append('<li><a title=' + result[topkey][jbi]["diag_name"] + '>' + (jbi + 1) + '、' + result[topkey][jbi]["diag_name"] + '</a></li>');
                                    }
                                }
                            } else if (topkey = 'durgs') {
                                if (result[topkey].length <= 0) {
                                    $yyul.append('<li class="nodata">暂无数据</li>');
                                } else {
                                    for (var yyi = 0, yylen = result[topkey].length; yyi < yylen; yyi++) {
                                        $yyul.append('<li><a title=' + result[topkey][yyi]["drug_name"] + '>' + (yyi + 1) + '、' + result[topkey][yyi]["drug_name"] + '</a></li>');
                                    }
                                }
                            }
                        }
                        $top_box.removeClass('hide');
                        load_count++;
                        if (load_count == 2) {
                            tipsMask_del();
                            discover_pt_loadflag = false;
                        }
                    }
                }
            });
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
                        var res_box = $('#data_discover_con').find('.searchres .leftsidecon').empty();
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
                            if (parseInt(item.case) > 0) {
                                var $span = $('<span class="glyphicon glyphicon-menu-down" patient_id=' + item.patient_id + ' searchtxt=' + _val + ' childdata="no" ></span>');
                                var $itemdatasbox = $('<div class="itemdatabox hide" ></div>');
                                $span.append($itemdatasbox);
                                $a.append($span);
                            }
                            res_box.append($a);
                        }
                        var total_page = Math.ceil(parseInt(res.header.total) / parseInt(res.header.pagesize));
                        if (total_page > 1000) {
                            total_page = 1000;
                        }
                        generatePagination($('#data_discover_con nav'), total_page, res.header.pagesize, res.header.currentpage);
                        load_count++;
                        if (load_count == 2) {
                            tipsMask_del();
                            discover_pt_loadflag = false;
                        }
                    }
                }
            });
        }
    }
    //个人中心，数据探索，普通搜索结果鼠标移入显示命中事件
    $('#data_discover_con').on('mouseover', '.leftsidecon .glyphicon-menu-down', function () {
        var $this = $(this);
        var childdata = $this.attr('childdata');
        var $itemdatasbox = $this.find('.itemdatabox');
        if (childdata != 'no') {
            $itemdatasbox.removeClass('hide');
            return false;
        }
        var paramobj = JSON.stringify({ 'patient_id': $this.attr('patient_id'), 'searchtxt': $this.attr('searchtxt') });
        $.ajax({
            type: 'POST',
            cache: false,
            data: {
                'param': paramobj
            },
            url: '/men/getPatientCaseList',
            dataType: 'json',
            success: function (res) {
                if (res.header.status == '300') {
                    var item = res.body;
                    if (item.menzhen && item.menzhen.length > 0) {
                        var $dl = $('<dl><dt>门诊记录</dt></dl>');
                        for (var j = 0, lenj = item.menzhen.length; j < lenj; j++) {
                            var $dd = $('<dd>门诊时间：<span class="vtime"></span></dd>');
                            var itemobj = item.menzhen[j];
                            for (var key in itemobj) {
                                if (key == 'health_event_id') {
                                    continue;
                                } else if (key == 'visit_datetime') {
                                    $dd.find('.vtime').text(itemobj[key]);
                                } else {
                                    $dd.append(key + '：' + itemobj[key] + '&nbsp;&nbsp;');
                                }
                            }
                            $dl.append($dd);
                        }
                        $itemdatasbox.append($dl);
                    }
                    if (item.zhuyuan && item.zhuyuan.length > 0) {
                        var $dl = $('<dl><dt>住院记录</dt></dl>');
                        for (var k = 0, lenk = item.zhuyuan.length; k < lenk; k++) {
                            var $dd = $('<dd>住院时间：<span class="vtime"></span></dd>');
                            var itemobj = item.zhuyuan[k];
                            for (var key in itemobj) {
                                if (key == 'health_event_id') {
                                    continue;
                                } else if (key == 'inp_date') {
                                    $dd.find('.vtime').text(itemobj[key]);
                                } else {
                                    $dd.append(key + '：' + itemobj[key] + '&nbsp;&nbsp;');
                                }
                            }
                            $dl.append($dd);
                        }
                        $itemdatasbox.append($dl);
                    }
                    $itemdatasbox.removeClass('hide');
                    $this.attr('childdata', 'yes');
                }
            }
        });
    });
    $('#data_discover_con').on('mouseout', '.leftsidecon .glyphicon-menu-down', function () {
        $(this).find('.itemdatabox').addClass('hide');
    });
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
            var table_name = $this.siblings('.oneinput').attr('tablename');
            var colume_name = $this.siblings('.oneinput').attr('colname');
            bd_ajax_handle(table_name, colume_name, _val);
        } else {
            $search_item.addClass('hide');
        }
    });
    //个人中心，数据探索，全部条件组中第二个输入框失去焦点隐藏选择层事件
    $('#data_discover_con').on('blur', '.search-gj .search-box .twoinput', function () {
        var $search_item = $('#data_discover_con .bd-search-box');
        bd_search_timer = setTimeout(function () {
            $search_item.addClass('hide');
        }, 120);
    });
    //个人中心，数据探索，全部条件组中第二个输入框键盘输入模糊匹配事件
    $('#data_discover_con').on('keyup', '.search-gj .search-box .twoinput', function (event) {
        var $this = $(this);
        var val = $.trim($this.val());
        var $ul = $('#data_discover_con .bd-search-box');
        if (!val) {
            $ul.addClass('hide');
            return false;
        }
        if (event.keyCode == '38') {
            var activeindex = $ul.find('.active').index();
            var lisize = $ul.find('li').length;
            if (activeindex >= 0) {
                activeindex--;
                activeindex = activeindex % lisize;
            } else {
                activeindex = lisize - 1;
            }
            $ul.find('li').removeClass('active');
            $ul.find('li').eq(activeindex).addClass('active');
            return false;
        } else if (event.keyCode == '40') {
            var activeindex = $ul.find('.active').index();
            var lisize = $ul.find('li').length;
            if (activeindex >= 0) {
                activeindex++;
                activeindex = activeindex % lisize;
            } else {
                activeindex = 0;
            }
            $ul.find('li').removeClass('active');
            $ul.find('li').eq(activeindex).addClass('active');
            return false;
        } else if (event.keyCode == '13') {
            $this.val($ul.find('.active').text());
            $this.blur();
            return false;
        }
        var table_name = $this.siblings('.oneinput').attr('tablename');
        var colume_name = $this.siblings('.oneinput').attr('colname');
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
        hide_search_item_box();
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
        var tablename = $(this).attr('tablename');
        var colname = $(this).attr('colname');
        var $parent = $target.parent();
        var has_sameitem = false;
        $parent.siblings('.search-box').find('.oneinput').each(function (index, item) {
            if ($(item).val() == _val) {
                has_sameitem = true;
                return false;
            }
        });
        if (has_sameitem) {
            common_alert('友情提示', '不要选择重复的选项，请重新选择！', function () {
                $target.focus();
            });
            hide_search_item_box();
            return;
        }
        $target.val(_val).attr({
            'tablename': tablename, 'colname': colname
        });
        $parent.find('.twosel').remove();
        $parent.find('.twoinput').remove();
        $parent.find('.agebox').remove();
        $parent.find('.datebox').remove();
        if (_val == '年龄') {
            $target.after('<div class="agebox"><input class="agestart m_starttime" type="text" /> 至 <input class="ageend m_endtime" type="text" /></div>');
        } else if (_val == '性别') {
            $target.after('<select class="twosel noswitch"><option value="男">男</option><option value="女">女</option></select>');
        } else if (_val == '医院' || _val == '门诊医院' || _val == '住院医院') {
            $target.after('<select class="twosel noswitch"><option value="全部">全部</option><option value="000001">湘雅附一</option><option value="000002">湘雅附二</option><option value="000003">湘雅附三</option></select>');
        } else if (_val == '科室名称' || _val == '住院科室') {
            $target.after('<select class="twosel noswitch"><option value="全部">全部</option><option value="心血管内科">心血管内科</option><option value="神经内科">神经内科</option><option value="内分秘科">内分秘科</option><option value="肾内科">肾内科</option><option value="呼吸内科">呼吸内科</option>\
<option value="呼吸内科">呼吸内科</option><option value="消化内科">消化内科</option><option value="血液内科">血液内科</option><option value="神经内科">神经内科</option><option value="风湿免疫内科">风湿免疫内科</option><option value="骨科">骨科</option><option value="神经内科">神经内科</option></select>');
        } else if (_val == '民族名称') {
            $target.after('<select class="twosel noswitch"><option value="汉族">汉族</option><option value="壮族">壮族</option><option value="满族">满族</option><option value="回族">回族</option><option value="苗族">苗族</option><option value="维吾尔族">维吾尔族</option><option value="土家族">土家族</option>\
                <option value="蒙古族">蒙古族</option><option value="藏族">藏族</option><option value="彝族">彝族</option><option value="布依族">布依族</option><option value="侗族">侗族</option><option value="瑶族">瑶族</option><option value="朝鲜族">朝鲜族</option><option value="白族">白族</option><option value="哈尼族">哈尼族</option>\
                <option value="哈萨克族">哈萨克族</option><option value="黎族">黎族</option><option value="傣族">傣族</option><option value="畲族">畲族</option><option value="傈僳族">傈僳族</option><option value="仡佬族">仡佬族</option><option value="东乡族">东乡族</option><option value="高山">高山族</option><option value="拉祜族">拉祜族</option>\
                <option value="水族">水族</option><option value="佤族">佤族</option><option value="纳西族">纳西族</option><option value="羌族">羌族</option><option value="土族">土族</option><option value="仡佬族">仡佬族</option><option value="锡伯族">锡伯族</option><option value="柯尔克孜族">柯尔克孜族</option><option value="达斡尔族">达斡尔族</option>\
                <option value="景颇族">景颇族</option><option value="毛南族">毛南族</option><option value="撒拉族">撒拉族</option><option value="塔吉克族">塔吉克族</option><option value="阿昌族">阿昌族</option><option value="普米族">普米族族</option><option value="鄂温克族">鄂温克族</option><option value="怒族">怒族族</option><option value="京族">京族</option>\
                <option value="基诺族">基诺族</option><option value="德昂族">德昂族</option><option value="保安族">保安族</option><option value="俄罗斯族">俄罗斯族</option><option value="裕固族">裕固族</option><option value="乌孜别克族">乌孜别克族</option><option value="门巴族">门巴族</option><option value="鄂伦春族">鄂伦春族</option>\
                <option value="独龙族">独龙族</option><option value="塔塔尔族">塔塔尔族</option><option value="赫赫族">赫赫族</option><option value="珞巴族">珞巴族</option><option value="布朗族">布朗族</option></select>');
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
                    common_alert('友情提示', '请选择开始时间！');
                    $end_input.val('');
                    return false;
                }
                if ($end_input.val() != '') {
                    var starttimes = new Date($start_input.val()).getTime();
                    var endtimes = new Date($end_input.val()).getTime();
                    if (parseInt(starttimes) > parseInt(endtimes)) {
                        common_alert('友情提示', '开始时间不能大于结束时间，请重新选择！');
                        $end_input.val('');
                        return false;
                    }
                }
            });
        } else {
            $target.after('<select class="twosel"><option value="1">包含</option><option value="2">不包含</option></select>\
            <input class="twoinput" type="text" />');
        }
        hide_search_item_box();
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
    //个人中心，数据探索，条件弹出选择层关闭
    function hide_search_item_box() {
        $('#data_discover_con .search-item-box').addClass('hide');
    };
});