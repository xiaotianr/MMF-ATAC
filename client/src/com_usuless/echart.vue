<template>
    <div id="Homo"></div>
    <div id="Mus"></div>
</template>

<style>
/* * {
    font-family: 'Times New Roman', Times, serif;
} */

#Homo {
    display: inline-block;
    margin-left: 250px;
    width: 600px;
    height: 400px;
    border: 1px;

}

#Mus {
    display: inline-block;
    margin-left: -150px;
    width: 600px;
    height: 400px;
    border: 1px;
}
</style>

<script>
import router from '../router';
export default {
    mounted() {
        let tobro=''
        if(this.$route.name==='indexhome') {
            tobro="indexbro"
        }
        else {
            tobro='userbro'
        }
        var myChart1 = this.$echarts.init(document.getElementById('Homo'));
        var myChart2 = this.$echarts.init(document.getElementById('Mus'));
        // 绘制图表
        myChart1.on('click', function (param) {
            
            router.push({name:tobro,query:{species:'homo',classify:param.data.url}})
        });
        myChart2.on('click', function (param) {
            router.push({name:tobro,query:{species:'mus',classify:param.data.url}})
        });
        myChart1.setOption(
            {
                tooltip: {
                    show: true,
                    alwaysShowContent: false,
                    trigger: 'item',
                    position: function (pt) {
                        return [pt[0], 130];
                    },
                    formatter: '{b}:{c}({d}%)'
                },
                title: {
                    text: 'Homo',
                    left: 'center',
                    top: 'center'
                },
                series: [
                    {
                        type: 'pie',
                        color: [
                            '#246FF4',
                            '#92B7F4',
                            '#CAD8FF',
                            '#EEF0FF'
                        ],
                        data: [
                            {
                                value: 157,
                                name: 'tissue',
                                url: 'tissue'
                            },
                            {
                                value: 122,
                                name: 'cell line',
                                url: 'cell line'
                            },
                            {
                                value: 57,
                                name: 'primary cell',
                                url: 'primary cell'
                            },
                            {
                                value: 34,
                                name: 'in vitro differentiated cells',
                                url: 'in vitro differentiated cells'
                            }
                        ],
                        radius: ['30%', '60%']
                    }
                ]
            }
        );

        myChart2.setOption({
            tooltip: {
                show: true,
                alwaysShowContent: false,
                trigger: 'item',
                position: function (pt) {
                    return [pt[0], 130];
                },
                formatter: '{b}:{c}({d}%)'
            },
            title: {
                text: 'Mus',
                left: 'center',
                top: 'center'
            },

            series: [
                {
                    type: 'pie',
                    color: [
                        '#246FF4',
                        '#92B7F4',
                        '#CAD8FF',
                        '#EEF0FF'
                    ],
                    data: [
                        {
                            value: 68,
                            name: 'tissue',
                            url: 'tissue'
                        },
                        {
                            value: 2,
                            name: 'cell line',
                            url: 'cell line'
                        },
                        {
                            value: 14,
                            name: 'primary cell',
                            url: 'primary cell'
                        },
                        {
                            value: 6,
                            name: 'in vitro differentiated cells',
                            url: 'in vitro differentiated cells'
                        },
                    ],
                    radius: ['30%', '60%']
                }
            ]
        });
    }

}
</script>