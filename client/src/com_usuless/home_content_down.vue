<template>
    <!-- <div class="h-[460px] ">
        <div class="w-[40%] inline-block">
            <el-carousel height="420px" class="my-[5px] w-[95%] ml-[5%]" indicator-position="outside" arrow="always"
                :autoplay="false">
                <el-carousel-item class="flex items-center justify-center">
                    <img src="../images/ATAC-seq1.png">
                </el-carousel-item>
                <el-carousel-item class="flex items-center justify-center">
                    <img src="../images/ATAC-seq2.png">
                </el-carousel-item>
                <el-carousel-item class="flex items-center justify-center">
                    <img src="../images/ATAC-seq3.png">
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="w-[56%] h-[420px] inline-block bg-[#ffedd5] mx-[2%] mt-[5px] mb-[35px] rounded-xl">
            
        </div>

    </div> -->
    <!-- <div class="h-[380px] bg-[#efefef]">
        <div class="h-[300px] flex items-center justify-center mb-[50px]" >
            <el-carousel type="card" height="300px" class="w-[90%] mt-[100px]" :autoplay="false">
                <el-carousel-item class="flex items-center justify-center">
                    <img src="../images/ATAC-seq1.png" width="480">
                </el-carousel-item>
                <el-carousel-item class="flex items-center justify-center">
                    <img src="../images/ATAC-seq2.png" width="450">
                </el-carousel-item>
                <el-carousel-item class="flex items-center justify-center">
                    <img src="../images/ATAC-seq3.png" width="600">
                </el-carousel-item>
            </el-carousel>

        </div>
    </div> -->
    <div class="h-[560px]">
        <img src="../images/ATAC-seq0.png" alt="">
    </div>


    <el-row class="h-[500px] bg-[#e5e7eb]">
        <el-col :span="8" class="flex items-center justify-center">
            <router-link :to="{ name: tobro, query: { species: 'homo', classify: '' } }"><img
                    src="../images/homo-set.png" alt="">
            </router-link>
        </el-col>
        <el-col :span="8" class="flex items-center justify-center">
            <router-link :to="{ name: tobro, query: { species: 'homo', classify: '' } }">
                <img src="../images/homo.png" alt="">
            </router-link>
        </el-col>
        <el-col :span="8" class="flex items-center justify-center">
            <div id="Homo" class="w-[600px] h-[400px]"></div>
        </el-col>
    </el-row>

    <el-row class="h-[500px] bg-[#e2e8f0]">
        <el-col :span="8" class="flex items-center justify-center">
            <router-link :to="{ name: tobro, query: { species: 'mus', classify: '' } }"><img src="../images/mus-set.png"
                    alt="">
            </router-link>
        </el-col>
        <el-col :span="8" class="flex items-center justify-center">
            <router-link :to="{ name: tobro, query: { species: 'mus', classify: '' } }">
                <img src="../images/mus.png" alt="">
            </router-link>
        </el-col>
        <el-col :span="8" class="flex items-center justify-center">
            <div id="Mus" class="w-[600px] h-[400px]"></div>
        </el-col>
    </el-row>

    <!-- <div class="h-[500px] bg-[#e5e7eb] mb-[1px] ">
        <router-link :to="{ name: tobro, query: { species: 'homo', classify: '' } }"><img src="../images/homo-set.png"
                alt="" class="float-left ml-[150px] my-[60px]"> </router-link>
        <router-link :to="{ name: tobro, query: { species: 'homo', classify: '' } }">
            <img src="../images/homo.png" alt="" class="float-left ml-[200px] my-[90px]">
            
        </router-link>
        
        <div id="Homo" class="float-left w-[600px] h-[400px] my-[50px] "></div>
    </div> -->
    <!-- <div class="h-[500px] bg-[#e2e8f0]">
        <router-link :to="{ name: tobro, query: { species: 'mus', classify: '' } }"><img src="../images/mus-set.png"
                alt="" class="float-left ml-[150px] my-[60px]"> </router-link>
        <router-link :to="{ name: tobro, query: { species: 'mus', classify: '' } }">
            <img src="../images/mus.png" alt="" class="float-left ml-[200px] my-[90px]">
        </router-link>
        <div id="Mus" class="float-left w-[600px] h-[400px] my-[50px]"></div>
    </div> -->

</template>

<style scoped>
/* .el-carousel__item:nth-child(3n) {
    background-color: #e2e8f0;
}

.el-carousel__item:nth-child(3n + 1) {
    background-color: #e5e7eb;
}

.el-carousel__item:nth-child(3n + 2) {
    background-color: #f5f5f4;
} */

/* .dna {
    background-image: url(../images/dna_left.png);
} */

</style>

<script>
import router from '../router';
export default {
    data() {
        return {
            tobro: ''
        }
    },
    mounted() {
        let tobro = ''
        if (this.$route.name === 'indexhome') {
            this.tobro = "indexbro"
            tobro = "indexbro"
        }
        else {
            this.tobro = 'userbro'
            tobro = 'userbro'
        }
        var myChart1 = this.$echarts.init(document.getElementById('Homo'));
        var myChart2 = this.$echarts.init(document.getElementById('Mus'));
        // 绘制图表
        myChart1.on('click', function (param) {
            router.push({ name: tobro, query: { species: 'homo', classify: param.data.url } })
        });
        myChart2.on('click', function (param) {
            router.push({ name: tobro, query: { species: 'mus', classify: param.data.url } })
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