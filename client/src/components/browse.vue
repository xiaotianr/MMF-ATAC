<template>
  <div class="h-[1000px]" id="bro">
    <el-tabs
      type="card"
      v-model="activeName"
      class="w-[50%] h-[850px] my-[50px] float-left"
    >
      <el-tab-pane label="Homo" name="Homo">
        <div class="mx-[5%] w-[100%]">
          <div class="flex items-center justify-center h-[200px]">
            <img src="../images/homo-img.png" alt="" />
          </div>
          <div :class="homotable">
            <el-table
              ref="filterTablehomo"
              :data="tableData1"
              height="610"
              border
              style="width: 95%"
              class="rounded-2xl text-xl"
            >
              <el-table-column label="GEO Number" header-align="center" align="center">
                <template #default="scope">
                  <a
                    :href="scope.row.url"
                    target="_blank"
                    class="buttonText"
                    @mouseover="
                      mouseon(
                        scope.row.img,
                        scope.row.GEO_number,
                        scope.row.Biosample_Summary
                      )
                    "
                    @mouseout="showHover = false"
                  >
                    {{ scope.row.GEO_number }}
                  </a>
                </template>
              </el-table-column>
              <!-- <el-table-column prop="motif" label="Motif" width="120" header-align="center"
                                align="center">
                            </el-table-column> -->
              <el-table-column
                prop="Biosample_Type"
                label="Biosample Type"
                header-align="center"
                align="center"
                :filters="[
                  { text: 'tissue', value: 'tissue' },
                  { text: 'cell line', value: 'cell line' },
                  { text: 'primary cell', value: 'primary cell' },
                  {
                    text: 'in vitro differentiated cells',
                    value: 'in vitro differentiated cells',
                  },
                ]"
                :filter-method="filterclass"
                :filtered-value="homofilter"
              >
              </el-table-column>
              <el-table-column
                prop="Biosample_Summary"
                label="Biosample Summary"
                header-align="center"
                align="center"
              >
              </el-table-column>
              <!-- <el-table-column prop="" label="Experimental result"
                                header-align="center" align="center">
                            </el-table-column> -->
            </el-table>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Mus" name="Mus">
        <div class="mx-[5%] w-[100%]">
          <div class="flex items-center justify-center h-[200px]">
            <img src="../images/mus-img.png" alt="" />
          </div>
          <!-- <div :class=musfont>
                    Mus
                </div> -->
          <div :class="mustable">
            <el-table
              ref="filterTablemus"
              :data="tableData2"
              height="610"
              border
              style="width: 95%"
              class="rounded-xl text-xl"
            >
              <!-- <el-table-column label="Experiment ID" width="200" header-align="center"
                                align="center">
                                <template #default="scope">
                                    <a :href="scope.row.url" target="_blank" class="buttonText"
                                        @mouseover="mouseon(scope.row.img, scope.row.GEO_number,scope.row.Biosample_Summary)"
                                        @mouseout="showHover = false">
                                        {{scope.row.Experiment_ID}}
                                    </a>
                                </template>
                            </el-table-column> -->
              <el-table-column
                label="GEO number"
                width="170"
                header-align="center"
                align="center"
              >
                <template #default="scope">
                  <a
                    :href="scope.row.url"
                    target="_blank"
                    class="buttonText"
                    @mouseover="
                      mouseon(
                        scope.row.img,
                        scope.row.GEO_number,
                        scope.row.Biosample_Summary
                      )
                    "
                    @mouseout="showHover = false"
                  >
                    {{ scope.row.GEO_number }}
                  </a>
                </template>
              </el-table-column>
              <el-table-column
                prop="Biosample_Type"
                label="Biosample Type"
                width="210"
                header-align="center"
                align="center"
                :filters="[
                  { text: 'tissue', value: 'tissue' },
                  { text: 'cell line', value: 'cell line' },
                  { text: 'primary cell', value: 'primary cell' },
                  {
                    text: 'in vitro differentiated cells',
                    value: 'in vitro differentiated cells',
                  },
                ]"
                :filter-method="filterclass"
                :filtered-value="musfilter"
              >
              </el-table-column>
              <el-table-column
                prop="Biosample_Summary"
                label="Biosample Summary"
                header-align="center"
                align="center"
              >
              </el-table-column>
              <!-- <el-table-column prop="gse" label="GSE number" width="165" header-align="center"
                                align="center">
                                <template #default="scope">
                                    <a :href="scope.row.url" target="_blank" class="buttonText"
                                        @mouseover="mouseon(scope.row.img, scope.row.gse)"
                                        @mouseout="showHover = false">
                                        {{scope.row.gse}}
                                    </a>
                                </template>
                            </el-table-column> -->
              <!-- <el-table-column prop="motif" width="120" label="motif" header-align="center"
                                align="center">
                            </el-table-column> -->
              <!-- <el-table-column prop="classification" width="150" label="Biosample classification"
                                header-align="center" align="center"
                                :filters="[{ text: 'tissue', value: 'tissue' }, { text: 'cell line', value: 'cell line' }, { text: 'primary cell', value: 'primary cell' }, { text: 'in vitro differentiated cells', value: 'in vitro differentiated cells' }]"
                                :filter-method="filterclass" :filtered-value=musfilter>
                            </el-table-column>
                            <el-table-column prop="cell type" width="120" label="cell type" header-align="center"
                                align="center">
                            </el-table-column>
                            <el-table-column prop="result" label="experimental result"
                                header-align="center" align="center">
                            </el-table-column> -->
            </el-table>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- <div
            class="float-left w-[600px] h-[400px]  mt-[350px] border-2 border-solid rounded-3xl border-yellow-200 flex items-center justify-center">
            <img class="hover_container px-[20px] py-[30px]" v-if="showHover" :src="currentimg">
        </div> -->

    <!-- <div class="card_img float-left w-[650px] h-[480px] ml-[30px]  mt-[30px]  rounded-3xl"> -->
    <!-- <motif-page :currentgse="currentgse"></motif-page> -->
    <Motif
      :currentgse="currentgse"
      :bro_info="bro_info"
      :current_summary="currentsummary"
    ></Motif>
    <!-- <div class="motif_image flex items-center justify-center rounded-3xl"><img class="hover_container"
                    v-if="showHover" :src="currentimg">
            </div> -->
    <!-- <div class="motif_gse text-2xl mb-[-10px]"> {{ currentgse }} </div>
            <div class="motif_gse text-2xl "> {{ currentsummary }} </div>
            <div class="motif_log text-2xl"> Motif Log -->
    <!-- </div> -->
    <!-- </div> -->
  </div>
</template>

<style>
/* .snowflake_bro {
    color: #fff;
    position: absolute;
    top: -20px;
    animation: fall_bro linear forwards;
}

@keyframes fall_bro {
    from {
        transform: translateX(0vw) translateY(320px);
    }

    to {
        transform: translateX(0vw) translateY(1300px);
    }
} */

#tab-Homo {
  font-size: 32px;
  width: 450px;
  text-align: center;
}

#tab-Mus {
  font-size: 32px;
  width: 450px;
  text-align: center;
}

.card_tag {
  border-radius: 30px;
  /* background: lightgrey; */
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 50px -12px inset,
    rgba(0, 0, 0, 0.3) 0px 18px 26px -18px inset;
  /* box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); */
}

.motif_image {
  /* background-color: rgb(236, 236, 236); */
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);

  width: 100%;
  height: 70%;
  border-radius: 6px 6px 0 0;
}

.motif_gse {
  text-transform: uppercase;
  /* font-size: 0.7em; */
  font-weight: 600;
  /* color: rgb(63, 121, 230); */
  padding: 10px 7px 0;
  margin-top: 0.4em;
  background: linear-gradient(120deg, rgba(0, 194, 255, 1) 0%, rgba(0, 86, 255, 1) 100%);
  background-clip: border-box;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.motif_log {
  font-weight: 600;
  color: rgb(88, 87, 87);
  padding: 7px;
}
</style>

<script>
import axios from "axios";
import Motif from "./showmotif.vue";
export default {
  components: {
    Motif,
  },
  data() {
    return {
      tableData1: [
        {
          Experiment_ID: null,
          GEO_number: null,
          Biosample_Type: null,
          Biosample_Summary: null,
          url: null,
        },
      ],
      tableData2: [
        {
          Experiment_ID: null,
          GEO_number: null,
          Biosample_Type: null,
          Biosample_Summary: null,
          url: null,
        },
      ],
      inputspecies: "",
      inputclassify: "",
      // homofont: "flex items-center justify-center text-3xl text-stone-700 pt-[20px] bg-stone-200 ",
      // musfont: "flex items-center justify-center text-3xl text-stone-700 pt-[20px] bg-stone-200 ",
      homotable: "h-[650px] w-[95%] flex items-center justify-center card_tag",
      mustable: "h-[650px] w-[95%] flex items-center justify-center card_tag",
      homofilter: [],
      musfilter: [],
      activeName: "Homo",
      showHover: false,
      currentimg: "",
      currentgse: "GSE172962",
      currentsummary: "GM19043",
      bro_info: "Homo ATAC-seq data",
    };
  },

  methods: {
    filterclass(value, row) {
      return row.Biosample_Type === value;
    },
    mouseon(img, gse, summary) {
      this.showHover = true;
      this.currentimg = img;
      // console.log(img)
      this.currentgse = gse;
      this.currentsummary = summary;
    },
  },
  watch: {
    activeName: {
      handler(newval, oldval) {
        if (newval === "Homo") {
          this.bro_info = "Homo ATAC-seq data";
          this.currentgse = "GSE172962";
        } else {
          this.bro_info = "Mus ATAC-seq data";
          this.currentgse = "GSE173036";
        }
      },
    },
  },

  mounted() {
    // console.log(this.$refs.filterTablehomo)
    axios.get("/data/homo.json").then((response) => (this.tableData1 = response.data));
    // console.log(this.tableData1)
    axios.get("/data/mus_90.json").then((response) => (this.tableData2 = response.data));
    if (this.inputspecies === "homo") {
      this.activeName = "Homo";
      this.bro_info = "Homo ATAC-seq data";
      // this.homofont = 'flex items-center justify-center text-3xl text-stone-900 pt-[20px] bg-stone-500 ';
      // this.musfont = 'flex items-center justify-center text-3xl text-stone-200 pt-[20px] bg-stone-50 ';
      // this.homotable = 'bg-stone-500 h-[520px] w-[650px] flex items-center justify-center';
      // this.mustable = 'bg-stone-50 h-[520px] w-[650px] flex items-center justify-center';
      if (this.inputclassify === "tissue") {
        this.homofilter[0] = "tissue";
        // this.$refs.filterTablehomo.
      } else if (this.inputclassify === "cell line") {
        this.homofilter[0] = "cell line";
      } else if (this.inputclassify === "primary cell") {
        this.homofilter[0] = "primary cell";
      } else if (this.inputclassify === "in vitro differentiated cells") {
        this.homofilter[0] = "in vitro differentiated cells";
      }
    } else if (this.inputspecies === "mus") {
      this.activeName = "Mus";
      this.bro_info = "Mus ATAC-seq data";
      // this.homofont = 'flex items-center justify-center text-3xl text-stone-200 pt-[20px] bg-stone-50 ';
      // this.musfont = 'flex items-center justify-center text-3xl text-stone-900 pt-[20px] bg-stone-500 ';
      // this.homotable = 'bg-stone-50 h-[520px] w-[650px] flex items-center justify-center';
      // this.mustable = 'bg-stone-500 h-[520px] w-[650px] flex items-center justify-center'
      if (this.inputclassify === "tissue") {
        this.musfilter[0] = "tissue";
      } else if (this.inputclassify === "cell line") {
        this.musfilter[0] = "cell line";
      } else if (this.inputclassify === "primary cell") {
        this.musfilter[0] = "primary cell";
      } else if (this.inputclassify === "in vitro differentiated cells") {
        this.musfilter[0] = "in vitro differentiated cells";
      }
    }
  },
  async created() {
    try {
      this.inputspecies = this.$route.query.species;
      this.inputclassify = this.$route.query.classify;
    } catch (e) {
      console.log(e);
    }
  },
};
</script>
