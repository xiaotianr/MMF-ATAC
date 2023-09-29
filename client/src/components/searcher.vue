<template>
    <div class="h-[1000px] " id="search">
        <div class="h-[910px] w-[45%] float-left  ml-[30px] my-[50px] flex items-center justify-center card_tag ">

            <el-table :data="tableData" height="870" border style="width: 95%" class="rounded-2xl text-2xl">
                <el-table-column label="GSE number" width="170" header-align="center" align="center">
                    <template #default="scope">
                        <a :href="scope.row.url" target="_blank" class="buttonText"
                            @mouseover="mouseon(scope.row.img, scope.row.GEO_number,scope.row.Biosample_Summary)"
                            @mouseout="showHover = false">
                            {{scope.row.GEO_number}}
                        </a>
                    </template>
                    <!-- <template #default="scope">
                        <a :href="scope.row.url" target="_blank" class="buttonText"
                            {{scope.row.GEO_number}}
                        </a>
                    </template> -->
                    <!-- <template #default="scope">
                            <a :href="scope.row.url" target="_blank" class="buttonText">   {{ scope.row.GEO_number }} </a>
                        </template> -->
                </el-table-column>
                <el-table-column prop="Biosample_Type" width="210" label="Biosample Type"
                    header-align="center" align="center"
                    :filters="[{ text: 'tissue', value: 'tissue' }, { text: 'cell line', value: 'cell line' }, { text: 'primary cell', value: 'primary cell' }, { text: 'in vitro differentiated cells', value: 'in vitro differentiated cells' }]"
                    :filter-method="filterclass">
                </el-table-column>
                <!-- <el-table-column prop="Experiment_ID" width="200" label="Experiment ID" header-align="center" align="center">
                </el-table-column> -->
                <el-table-column prop="Biosample_Summary" label="Biosample Summary" header-align="center" align="center">
                </el-table-column>
            </el-table>
            
        </div>
        <Motif :currentgse="currentgse" :bro_info="bro_info" :current_summary="currentsummary"></Motif>
    </div>
</template>
<style>

</style>
<script>
import router from '../router';
import axios from 'axios';
import Motif from './showmotif.vue'
import { getHomoGse, tosearch } from '../services';
export default {
    components: {
        Motif
  },
    data() {
        return {
            tableData: [{
                Experiment_ID:null,
                GEO_number: null,
                Biosample_Type:null,
                Biosample_Summary: null,
                url: null,
            }],
            showHover: false,
            currentimg: '',
            currentgse: "GSE172962",
            currentsummary:'Homo sapiens GM19043',
            bro_info: 'Homo ATAC-seq data',
        };
    },
    watch: {
        '$route.query.input': async function () {
            this.tableData = [{
                Experiment_ID:null,
                GEO_number: null,
                Biosample_Type:null,
                Biosample_Summary: null,
                url: null,
            }];
            const id = this.$route.query.input;
            if (id) {
                const idarr = id.split(",");
                if (idarr.length > 0) {
                    let { errorNo, data } = await getHomoGse(idarr[0]);
                    this.tableData = data;
                    for (let i = 1; i < idarr.length; ++i) {
                        let { errorNo, data } = await getHomoGse(idarr[i]);
                        this.tableData.push.apply(this.tableData, data);
                    }
                }
                this.currentgse=this.tableData[0].GEO_number
                this.currentsummary=this.tableData[0].Biosample_Summary
                if(this.currentsummary.includes("Homo")) {
                    this.bro_info="Homo ATAC-seq data"
                } else {
                    this.bro_info="Mus ATAC-seq data"
                }
            }
        }
    },
    methods: {
        filterclass(value, row) {
            return row.classification === value;
        },
        mouseon(img, gse,summary) {
            this.showHover = true
            this.currentimg = img
            // console.log(img)
            this.currentgse = gse
            this.currentsummary=summary
            
        }
    },
    async created() {
        try {
            const id = this.$route.query.input;
            const idarr = id.split(",");
            if (idarr.length > 0) {
                let { errorNo, data } = await getHomoGse(idarr[0]);
                this.tableData = data;
                for (let i = 1; i < idarr.length; ++i) {
                    let { errorNo, data } = await getHomoGse(idarr[i]);
                    this.tableData.push.apply(this.tableData, data);
                }
            }
            this.currentgse=this.tableData[0].GEO_number
            this.currentsummary=this.tableData[0].Biosample_Summary
            if(this.currentsummary.includes("Homo")) {
                this.bro_info="Homo ATAC-seq data"
            } else {
                this.bro_info="Mus ATAC-seq data"
            }
            // console.log(this.currentgse,this.currentsummary,this.tableData[0])
        } catch (e) {
            console.log(e);
        }
    }
}
</script>
