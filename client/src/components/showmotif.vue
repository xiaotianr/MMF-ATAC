<template>
  <!-- <div class="card_img float-left w-[650px] h-[200px] ml-[30px]  mt-[100px]  rounded-3xl">
            <div class="h-[40px] text-2xl  flex items-center justify-center px-[20px] " :bind="bro_info">
                {{ bro_info }}
            </div>
            <div class="h-[40px] text-2xl  flex items-center justify-center px-[20px] py-[15px]">GEO number:{{ currentgse }}</div>

            <div class="h-[40px] text-2xl  flex items-center justify-center px-[20px] py-[15px]">motif number:{{ current_motif_number }}</div>
            <div class="h-[40px] text-2xl  flex items-center justify-center px-[20px] py-[15px]">motif :{{ displayedMotifs[activeMotifIndex] }}</div>
    </div> -->
  <div class="card_img float-left w-[46%] h-[100px] mx-[2%] mt-[50px] rounded-3xl">
    <div class="flex w-full">
      <div
        class="w-1/2 h-[40px] text-2xl flex items-center justify-center px-[20px]"
        :bind="bro_info"
      >
        {{ bro_info }}
      </div>
      <div class="w-1/2 h-[40px] text-2xl flex items-center justify-center">
        GEO number: {{ currentgse }}
      </div>
    </div>
    <div class="flex w-full">
      <div
        class="w-1/2 h-[40px] text-2xl flex items-center justify-center px-[20px] py-[15px]"
      >
        Motif number: {{ current_motif_number }}
      </div>
      <div class="w-1/2 h-[40px] text-2xl flex items-center justify-center py-[15px]">
        TF: {{ displayedMotifs[activeMotifIndex] }}
      </div>
    </div>
  </div>
  <div class="card_img float-left w-[46%] h-[780px] mx-[2%] mt-[30px] rounded-3xl">
    <div class="motif-navigator">
      <div class="content-container">
        <div class="motif-nav-container">
          <div
            v-for="(motif, index) in displayedMotifs"
            :key="index"
            :class="{ active: activeMotifIndex === index }"
            class="motif-nav"
            @click="onMotifClick(index)"
          >
            {{ motif }}
          </div>
        </div>
        <div class="img_table_conainier">
          <img v-if="imageData" :src="imageData" alt="motif-image" class="motif-image" />
          <div
            class="h-[40px] text-2xl flex items-center justify-center px-[20px] py-[15px]"
          >
            Position Probability Matrix (total sequence counts={{nsites}})
          </div>
          <div class="table-container">
            <table>
              <tr v-for="(row, rowIndex) in tableData" :key="rowIndex">
                <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div class="pagination">
        <div class="pagination-top">
          <div class="pagination-controls">
            <button @click="onPreviousPage" :disabled="currentPage === 0">pre</button>
            <div class="page-numbers">
              <button
                v-for="pageNumber in pageNumbers"
                :key="pageNumber"
                :class="{ active: currentPage === pageNumber - 1 }"
                class="page-number"
                @click="onPageClick(pageNumber - 1)"
              >
                {{ pageNumber }}
              </button>
            </div>
            <button @click="onNextPage" :disabled="currentPage === totalPages - 1">
              next
            </button>
            <input
              v-model.number="inputPage"
              @input="onPageInput"
              type="number"
              min="1"
              :max="totalPages"
              class="page-input"
            />
          </div>
        </div>
        <div class="pagination-bottom">
          <span>{{ inputPage }} / {{ totalPages }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  props: {
    currentgse: {
      type: String,
      default: "",
    },
    bro_info: {
      type: String,
      default: "",
    },
    current_summary: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      current_motif_number: 0,
      current_motif_list: [],
      displayedMotifs: [],
      imageData: "",
      activeMotifIndex: 0,
      currentPage: 0,
      inputPage: 1,
      alphabet: "ACGT",
      ppm: [],
      tableData: null,
      nsites:0
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.current_motif_number / 18);
    },
    pageNumbers() {
      const start = Math.max(1, this.currentPage - 4);
      const end = Math.min(this.totalPages + 1, this.currentPage + 6);
      return Array.from({ length: end - start }, (v, k) => k + start);
    },
  },
  watch: {
    currentgse: {
      handler() {
        this.fetchMotifData();
      },
      immediate: true,
    },
  },
  methods: {
    async fetchMotifData() {
      try {
        const response = await axios.post(
          "/api/loadmotif",
          qs.stringify({ gse: this.currentgse })
        );
        this.current_motif_number = response.data.motif_number;
        this.current_motif_list = response.data.motif_list;
        this.updateDisplayedMotifs();
      } catch (error) {
        console.error(error);
      }
    },
    updateDisplayedMotifs() {
      const start = this.currentPage * 18;
      const end = start + 18;
      this.displayedMotifs = this.current_motif_list.slice(start, end);
      this.activeMotifIndex = 0;
      this.fetchMotifImage();
    },
    async fetchMotifImage() {
      try {
        console.log(this.currentgse, this.displayedMotifs[this.activeMotifIndex]);
        const response = await axios.post(
          "/api/getimg",
          {
            gse: this.currentgse,
            motif: this.displayedMotifs[this.activeMotifIndex],
          },
          { responseType: "arraybuffer" }
        );
        this.imageData = URL.createObjectURL(
          new Blob([response.data], { type: "image/png" })
        );
        const res = await axios.post(
          "/api/getppm",
          qs.stringify({
            gse: this.currentgse,
            motif: this.displayedMotifs[this.activeMotifIndex],
          })
        );
        this.alphabet = res.data.alphabet;
        this.ppm = res.data.ppm;
        this.nsites=res.data.nsites;
        this.tableData = [];
        let r = [""];
        for (let i = 1; i <= this.ppm.length; ++i) {
          r.push(i);
        }
        this.tableData.push(r);
        for (let i = 0; i < 4; i++) {
          const row = [this.alphabet[i]];
          this.ppm.forEach((subList) => {
            row.push(subList[i]);
          });
          this.tableData.push(row);
        }
      } catch (error) {
        console.error(error);
      }
    },
    onMotifClick(index) {
      this.activeMotifIndex = index;
      this.fetchMotifImage();
    },
    onPageInput() {
      if (this.inputPage >= 1 && this.inputPage <= this.totalPages) {
        this.currentPage = this.inputPage - 1;
        this.updateDisplayedMotifs();
      }
    },
    onPageClick(index) {
      this.currentPage = index;
      this.inputPage = index + 1;
      this.updateDisplayedMotifs();
    },
    onPreviousPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
        this.inputPage = this.currentPage + 1;
        this.updateDisplayedMotifs();
      }
    },
    onNextPage() {
      if (this.currentPage < this.totalPages - 1) {
        this.currentPage++;
        this.inputPage = this.currentPage + 1;
        this.updateDisplayedMotifs();
      }
    },
  },
};
</script>

<style scoped>
.card_img {
  background: white;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 50px -12px inset,
    rgba(0, 0, 0, 0.3) 0px 18px 26px -18px inset;
}
.motif-navigator {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 730px;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 5px;
}

.content-container {
  display: flex;
}

.motif-nav-container {
  display: flex;
  flex-direction: column;
  height: 660px;
  overflow-y: auto;
  border-right: 1px solid #dee2e6;
  padding: 10px;
}

.motif-nav {
  cursor: pointer;
  padding: 5px;
  transition: background-color 0.3s;
}

.motif-nav:hover {
  background-color: #e9ecef;
}

.motif-nav.active {
  font-weight: bold;
  text-decoration: underline;
}
.img_table_conainier {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.motif-image {
  width: 580px;
  height: 360px;
  margin-left: auto;
  margin-bottom: 20px;
}
.table-container {
  width: 580px;
  height: 240px;
  overflow: auto;
}
.table-container table {
  width: 100%;
  border-collapse: collapse;
}
.table-container td,
th {
  border: 1px solid black;
  text-align: center;
  padding: 8px;
}
.pagination {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 70px;
  padding: 10px;
}

.pagination-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.page-input {
  width: 100%;
  text-align: center;
  margin-left: 10px;
}

.page-numbers {
  display: flex;
}

.page-number {
  cursor: pointer;
  padding: 5px;
  margin-right: 5px;
  transition: background-color 0.3s;
}

.page-number:hover {
  background-color: #e9ecef;
}

.page-number.active {
  font-weight: bold;
}

.pagination-controls {
  display: flex;
  align-items: center;
}

.pagination-bottom {
  display: flex;
  justify-content: flex-end;
}
</style>
