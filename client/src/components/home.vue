<template>
  <div id="home">
    <div class="w-[100%] bg-blue-50">
      <div class="text-2xl rounded-xl card_cite w-[100%] model-overview">
        <p>
          Assay for Transposase-Accessible Chromatin using sequencing (ATAC-seq) 
          is used for investigating the chromatin accessibility of the entire genome, 
          generating DNA fragments suitable for sequencing by inserting the Tn5 transposase into open 
          chromatin regions. When a TF binds to DNA, it prevents the Tn5 transposase from cutting the 
          DNA sequence in that specific region, resulting in a protected area known as an ATAC-seq footprint. 
          By detecting these footprints, multiple regions of TFs binding to the genome 
          can be found from a single ATAC-seq dataset.
        </p>
        <p>
          We have developed a public web server called MMF-ATAC, 
          by inputting the ATAC-seq peak bed file and corresponding bam file, 
          MMF-ATAC will find motifs of various lengths and return them in multiple formats.
          Results can be downloaded directly from the web page or sent to users' email. 
          Upon registration and login, users can access their submission records 
          and download historical submission results.
        </p>
        <p>
        MMF-ATAC visualizes the results of motif finding on 459 ATAC-seq datasets 
        in the form of motif logos and position probability matrices (PPMs).
        </p>
        <!-- <p>If you use the system, please cite:</p>
        <p>
          Shuangquan Zhang, Lili Yang, Xiaotian Wu, Nan Sheng, Yuan Fu, Anjun Ma, Yan
          Wang.
          <span class="text-2xl font-600">
            MMGraph: a multiple motif predictor based on graph neural network and
            coexisting probability for ATAC-seq data. </span
          ><span class="italic"> Bioinformatics</span>, Volume 38, Issue 19, 1 October
          2022, Pages 4636–4638.
        </p> -->
        <!-- <el-link type="primary" @click="org" class="text-2xl"
          >doi.org:10.1093/bioinformatics/btac572
        </el-link> -->
      </div>
    </div>
    <div class="h-[450px] w-[100%] flex items-center justify-center py-[30px] bg-sky-50">
      <img src="../images/ATAC-seq0.png" alt="" />
    </div>

    <el-row class="h-[400px] w-[100%] bg-blue-50 card_cite">
      <el-col :span="6" class="flex items-center justify-center">
        <div class="homo_set h-[150px] w-[320px] flex items-center justify-center">
          <router-link :to="{ name: tobro, query: { species: 'homo', classify: '' } }">
            <span class="text-2xl">369 Homo ATAC-seq datasets</span>
          </router-link>
        </div>
      </el-col>
      <el-col :span="8" class="flex items-center justify-center">
        <div class="homo_card w-[450px] h-[300px]">
          <div class="w-[450px] h-[220px] flex items-center justify-center">
            <router-link :to="{ name: tobro, query: { species: 'homo', classify: '' } }">
              <img src="../images/homo-img.png" alt="" />
            </router-link>
          </div>
          <div class="w-[450px] h-[50px] flex items-center justify-center">
            <router-link :to="{ name: tobro, query: { species: 'homo', classify: '' } }">
              <span class="text-5xl">Homo sapiens</span>
            </router-link>
          </div>
        </div>
      </el-col>
      <el-col :span="10" class="flex items-center justify-center">
        <div id="Homo" class="w-[800px] h-[400px]"></div>
      </el-col>
    </el-row>

    <el-row class="h-[400px] bg-blue-50">
      <el-col :span="6" class="flex items-center justify-center">
        <div class="mus_set h-[150px] w-[320px] flex items-center justify-center">
          <router-link :to="{ name: tobro, query: { species: 'mus', classify: '' } }">
            <span class="text-2xl">90 Mus ATAC-seq datasets</span>
          </router-link>
        </div>
      </el-col>
      <el-col :span="8" class="flex items-center justify-center">
        <div class="homo_card w-[450px] h-[300px]">
          <div class="w-[450px] h-[220px] flex items-center justify-center">
            <router-link :to="{ name: tobro, query: { species: 'mus', classify: '' } }">
              <img src="../images/mus-img.png" alt="" />
            </router-link>
          </div>
          <div class="w-[450px] h-[50px] flex items-center justify-center">
            <router-link :to="{ name: tobro, query: { species: 'mus', classify: '' } }">
              <span class="text-5xl">Mus musculus</span>
            </router-link>
          </div>
        </div>
      </el-col>
      <el-col :span="10" class="flex items-center justify-center">
        <div id="Mus" class="w-[800px] h-[400px]"></div>
      </el-col>
    </el-row>
  </div>
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
<style>
#Homo {
  font-family: "Times New Roman", Times, serif;
}

.homo_set {
  border-radius: 50%;
  background: #e5ecf0;
  box-shadow: inset 30px 30px 60px #e6edf0, inset -30px -30px 60px #b4baba;
}

.homo_card {
  /* border-radius: 7px;
    box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff; */
  border-radius: 16px;
  background: #f3f5f6;
  box-shadow: inset 30px 30px 60px #e6edf0, inset -30px -30px 60px #f7ffff;
  /* box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px); */
}
.model-overview h2 {
  border-bottom: 2px solid #333;
  padding-bottom: 0.5em;
}

.model-overview p {
  text-align: justify;
  text-indent: 2em;
  /* margin-bottom: 1em; */
}

.model-overview ul {
  padding-left: 1em;
  list-style-type: disc;
}

.model-overview li {
  margin-bottom: 0.5em;
}
.mus_set {
  border-radius: 50%;
  background: #e5ecf0;
  box-shadow: inset 30px 30px 60px #e6edf0, inset -30px -30px 60px #b4baba;
}
.card_about {
  border-radius: 7px;
  box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
}
.card_cite {
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}
</style>
<script>
import router from "../router";
export default {
  methods: {
    org() {
      window.location.href = "https://doi.org/10.1093/bioinformatics/btac572";
    },
  },
  data() {
    return {
      tobro: "",
    };
  },
  mounted() {
    let tobro = "";
    if (this.$route.name === "indexhome") {
      this.tobro = "indexbro";
      tobro = "indexbro";
    } else {
      this.tobro = "userbro";
      tobro = "userbro";
    }
    var myChart1 = this.$echarts.init(document.getElementById("Homo"));
    var myChart2 = this.$echarts.init(document.getElementById("Mus"));
    // 绘制图表
    myChart1.on("click", function (param) {
      router.push({ name: tobro, query: { species: "homo", classify: param.data.url } });
    });
    myChart2.on("click", function (param) {
      router.push({ name: tobro, query: { species: "mus", classify: param.data.url } });
    });
    myChart1.setOption({
      tooltip: {
        show: true,
        alwaysShowContent: false,
        trigger: "item",
        position: function (pt) {
          return [pt[0], 130];
        },
        formatter: "{b}:{c}({d}%)",
        textStyle: {
          fontSize: 22,
          fontFamily: "Times New Roman",
        },
      },
      title: {
        text: "Homo",
        left: "center",
        top: "center",
        textStyle: {
          fontSize: 32,
          fontFamily: "Times New Roman",
        },
      },

      series: [
        {
          type: "pie",
          color: ["#2563eb", "#60a5fa", "#bfdbfe", "#eff6ff"],
          label: {
            normal: {
              show: true,
              textStyle: {
                fontSize: 22,
                fontFamily: "Times New Roman",
              },
            },
          },
          data: [
            {
              value: 157,
              name: "tissue",
              url: "tissue",
            },
            {
              value: 121,
              name: "cell line",
              url: "cell line",
            },
            {
              value: 57,
              name: "primary cell",
              url: "primary cell",
            },
            {
              value: 34,
              name: "in vitro differentiated cells",
              url: "in vitro differentiated cells",
            },
          ],
          radius: ["30%", "60%"],
        },
      ],
    });

    myChart2.setOption({
      tooltip: {
        show: true,
        alwaysShowContent: false,
        trigger: "item",
        position: function (pt) {
          return [pt[0], 130];
        },
        formatter: "{b}:{c}({d}%)",
        textStyle: {
          fontSize: 22,
          fontFamily: "Times New Roman",
        },
      },
      title: {
        text: "Mus",
        left: "center",
        top: "center",
        textStyle: {
          fontSize: 32,
          fontFamily: "Times New Roman",
        },
      },

      series: [
        {
          type: "pie",
          color: ["#2563eb", "#60a5fa", "#bfdbfe", "#eff6ff"],
          label: {
            normal: {
              show: true,
              textStyle: {
                fontSize: 24,
                fontFamily: "Times New Roman",
              },
            },
          },
          data: [
            {
              value: 68,
              name: "tissue",
              url: "tissue",
            },
            {
              value: 2,
              name: "cell line",
              url: "cell line",
            },
            {
              value: 14,
              name: "primary cell",
              url: "primary cell",
            },
            {
              value: 6,
              name: "in vitro differentiated cells",
              url: "in vitro differentiated cells",
            },
          ],
          radius: ["30%", "60%"],
        },
      ],
    });
  },
};
</script>
