<template>
    <div class="motif-navigator"> 
     <!-- 存放导航和图片的容器 -->
      <div class="content-container">
        <!-- 存放导航元素的容器 -->
        <div class="motif-nav-container">
        <!-- 使用v-for循环遍历displayedMotifs数组，为每个元素创建一个带有motif-nav类的<div>。
        根据activeMotifIndex是否等于当前索引，动态添加active类。当用户点击该元素时，触发onMotifClick方法并传入当前索引。-->
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
        <img v-if="imageData" :src="imageData" alt="motif-image" class="motif-image"/>
      </div>
      <!-- 页码相关元素容器 -->
      <div class="pagination">
        <div class="pagination-controls">
            <button @click="onPreviousPage" :disabled="currentPage === 0">上一页</button>
            <span>{{ inputPage }} / {{ totalPages }}</span>
            <button @click="onNextPage" :disabled="currentPage === totalPages - 1">下一页</button>
            <input
            v-model.number="inputPage"
            @input="onPageInput"
            type="number"
            min="1"
            :max="totalPages"
            class="page-input"
            />
        </div>
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
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import qs from "qs";
  export default {
    props: {
      currentgse: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        current_motif_number: 0,
        current_motif_list: [],
        displayedMotifs: [],
        imageData: '',
        activeMotifIndex: 0,
        currentPage: 0,
        inputPage: 1,
      };
    },
    computed: {
      totalPages() {
        return Math.ceil(this.current_motif_number / 10);
      },
      pageNumbers() {
        const start = Math.max(1, this.currentPage - 4);
        const end = Math.min(this.totalPages, this.currentPage + 6);
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
            const response = await axios.post("/api/loadmotif", qs.stringify({ gse: this.currentgse}));
          this.current_motif_number = response.data.motif_number;
          this.current_motif_list = response.data.motif_list;
          this.updateDisplayedMotifs();
        } catch (error) {
          console.error(error);
        }
      },
      updateDisplayedMotifs() {
        const start = this.currentPage * 10;
        const end = start + 10;
        this.displayedMotifs = this.current_motif_list.slice(start, end);
        this.activeMotifIndex = 0;
        this.fetchMotifImage();
      },
      async fetchMotifImage() {
        try {
            const response = await axios.post('/api/getimg',  { 
                gse: this.currentgse,
                 motif: this.displayedMotifs[this.activeMotifIndex], 
                 }, { responseType: 'arraybuffer' })
          this.imageData = URL.createObjectURL(new Blob([response.data], { type: 'image/png' }))
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
.motif-navigator {
  display: flex;
  flex-direction: column;
  width: 520px;
  height:420px;
}
.content-container {
  display: flex;
}
.motif-nav-container {
  display: flex;
  flex-direction: column;
  height: 350px;
  overflow-y: auto;
}
.motif-nav {
  cursor: pointer;
  padding: 5px;
}
.motif-nav.active {
  font-weight: bold;
  text-decoration: underline;
}
.motif-image {
  width: 450px;
  height: 350px;
  margin-left: auto;
}
.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  width: 520px;
  height: 50px;
}
.page-input {
  width: 50px;
  text-align: center;
  margin-left: 10px;
}
.page-numbers {
  display: flex;
}
.page-number {
  cursor: pointer;
  padding: 5px;
}
.page-number.active {
  font-weight: bold;
}
.pagination-controls {
  display: inline-block;
}

</style>


  