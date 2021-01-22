(function () {
    var pie = {
        init() {
            this.getData();
            this.option = {
                title: {
                    text: '',
                    subtext: '纯属虚构',
                    left:'center',
                },
                legend: {
                    orient:'vertical',
                    left:'left',
                    data: [],
                },
                series: {
                    name: '',
                    type: 'pie',
                    radius:'55%',
                    center:['50%','60%'],
                    data: [],
                }
            }
        },
        getData() {
            var This = this;
            $.ajax({
                url: 'http://api.duyiedu.com/api/student/findAll?appkey=kaivon_1574822824764',
                success: function (data) {
                    // console.log(data);

                    var list = JSON.parse(data).data;
                    // console.log(list);

                    if (list.length > 0) {
                        This.areaChart(list);
                        This.sexChart(list);
                    }
                }
            });
        },
        areaChart(data) {
            var myChart = echarts.init($('.areaChart')[0]);
            //{"address":"上海","appkey":"kaivon_1574822824764","birth":1999,"ctime":1586302925,"email":"311121294@qq.com","id":51489,"name":"叶晨","phone":"15200000000","sNo":"000313546","sex":1,"utime":1586399673}

            //legend => ['北京', '上海', '广州']
            //series => [{name:'北京', value:5},{name:'上海', value:4}]



            var legendData = [];
            var seriesData = [];
            var newData = {}; //{北京:5, 山东：6,...}

            data.forEach(function (item) {
                if (!newData[item.address]) {
                    newData[item.address] = 1;
                    legendData.push(item.address);
                } else {
                    newData[item.address]++;
                }
            });

            // console.log(newData);
            console.log(legendData);

            for (var prop in newData) {
                seriesData.push({
                    name: prop,
                    value: newData[prop],
                });
            }

            console.log(seriesData);

            this.option.title.text='渡一教育学生地区分布统计';
            this.option.legend.data=legendData;
            this.option.series.name='地区分布';
            this.option.series.data=seriesData;
            myChart.setOption(this.option);

            /* myChart.setOption({
           
                       }); */
        },
        sexChart(data) {
            var myChart = echarts.init($('.sexChart')[0]);

            var legendData = ['男','女'];
            /* var seriesData = []; */
            var newData = {}; //{北京:5, 山东：6,...}

            data.forEach(function (item) {
                if (!newData[item.sex]) {
                    newData[item.sex] = 1;
                } else {
                    newData[item.sex]++;
                }
            });

            var seriesData = [
                {name:'男', value:newData[0]},
                {name:'女', value:newData[1]},
            ]


            this.option.title.text='渡一教育学生性别统计';
            this.option.legend.data=legendData;
            this.option.series.name='性别分布';
            this.option.series.data=seriesData;
            myChart.setOption(this.option);
        }
    }

    pie.init();
})()