<template>
    <div class="motif-gallery" style="width: 550px; height: 300px;">
      <div class="nav">
        <button @click="prevPage" :disabled="currentPage === 1">pre</button>
        <button @click="nextPage" :disabled="currentPage === totalPages">next</button>
        <div class="page-numbers">
          <button v-for="page in totalPages" :key="page" @click="goToPage(page)"
                  :class="{'active': currentPage === page}">
            {{ page }}
          </button>
        </div>
      </div>
      <div class="content">
        <div class="sidebar">
          <button v-for="(motif, index) in currentMotifList" :key="index" @click="loadImage(motif)">
            {{ motif }}
          </button>
        </div>
        <div class="main">
          <img v-if="currentImage" :src="currentImage" />
          <div v-else>
            暂无图片
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { reactive, onMounted } from 'vue'
  import axios from "axios";
  import qs from "qs";
  
  export default {
    props: {
      currentgse: {
        type: String,
        required: true
      }
    },
    setup(props) {
      const state = reactive({
        currentMotifNumber: 0,
        currentMotifList: [],
        currentImage: '',
        currentPage: 1,
        motifsPerPage: 10
      })
  
      const loadData = async () => {
        // 通过一个函数向后端发起一次查询
        console.log('start load')
        const response = await axios.post("/api/loadmotif", qs.stringify({ gse: `${props.currentgse}`}));
        const data = await response.data
        console.log(data)
        state.currentMotifNumber = data.motif_number
        state.currentMotifList = data.motif_list
        state.currentImage = data.default_image 
      }
  
      const loadImage = async (motif) => {
        // 通过点击每个不同的导航，向后端发起一次查询
        const result = await fetch(`/api/query?currentgse=${props.currentgse}&motif=${motif}`)
        const data = await result.json()
        state.currentImage = data.image
      }
  
      const goToPage = (page) => {
        state.currentPage = page
      }
  
      const nextPage = () => {
        if (state.currentPage < state.totalPages) {
          state.currentPage++
        }
      }
  
      const prevPage = () => {
        if (state.currentPage > 1) {
          state.currentPage--
        }
      }
  
      onMounted(async () => {
        await loadData()
      })
  
      return {
        state,
        loadImage,
        goToPage,
        nextPage,
        prevPage
      }
    },
    computed: {
      totalPages() {
        return Math.ceil(this.state.currentMotifNumber / this.state.motifsPerPage)
      },
      displayedMotifs() {
        const start = (this.state.currentPage - 1) * this.state.motifsPerPage
        const end = start + this.state.motifsPerPage
        return this.state.currentMotifList.slice(start, end)
      }
    }
  }
  </script>
  