<template>
    <div class="page" style="width: 550px; height: 300px;">
      <div class="nav">
        <div class="nav-item" v-for="(item, index) in navList" :key="index" @click="selectNav(index)">
          {{ item }}
        </div>
      </div>
      <div class="content">
        <img :src="currentImgUrl" style="width: 400px; height: 300px;">
      </div>
      <div class="pagination">
        <div class="page-item" @click="prevPage">上一页</div>
        <div class="page-item" v-for="(item, index) in pageCount" :key="index" :class="{ active: currentPage === index }" @click="goPage(index)">
          {{ index + 1 }}
        </div>
        <div class="page-item" @click="nextPage">下一页</div>
      </div>
    </div>
  </template>
  
  <script>
  import { reactive, toRefs,watch } from 'vue'
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
        motifNumber: 0,
        motifList: [],
        currentMotifNumber: 0,
        currentMotifList: [],
        currentImgUrl: '',
        currentPage: 0,
        navList: [],
        pageSize: 10
      })
  
      const getPageCount = () => {
        return Math.ceil(state.currentMotifNumber / state.pageSize)
      }
  
      const updateNavList = () => {
        const start = state.currentPage * state.pageSize
        const end = Math.min(start + state.pageSize, state.currentMotifNumber)
        state.navList = state.currentMotifList.slice(start, end)
      }
  
      const selectNav = async (index) => {
        const motif = state.navList[index]
        const imgUrl = await fetchImgUrl(props.currentgse, motif)
        state.currentImgUrl = imgUrl
      }
  
      const goPage = async (page) => {
        state.currentPage = page
        const start = state.currentPage * state.pageSize
        const end = Math.min(start + state.pageSize, state.currentMotifNumber)
        state.navList = state.currentMotifList.slice(start, end)
        const imgUrl = await fetchImgUrl(props.currentgse, state.navList[0])
        state.currentImgUrl = imgUrl
      }
  
      const prevPage = () => {
        if (state.currentPage > 0) {
          goPage(state.currentPage - 1)
        }
      }
  
      const nextPage = () => {
        if (state.currentPage < state.pageCount - 1) {
          goPage(state.currentPage + 1)
        }
      }
  
      const fetchMotif = async (currentgse) => {
        // 发起查询
        console.log('start load')
        const response = await axios.post("/api/loadmotif", qs.stringify({ gse: currentgse}));
        const data = await response.data
        console.log(data)
        
        state.motifNumber = data.motif_number
        state.motifList = data.motif_list
        state.currentMotifNumber = state.motifNumber
        state.currentMotifList = state.motifList
        state.pageCount = getPageCount()
        updateNavList()
        const imgUrl = await fetchImgUrl(props.currentgse, state.navList[0])
        state.currentImgUrl = imgUrl
        }

        const fetchImgUrl = async (gse, motif) => {
        // 发起查询
          try{
            const response = await axios.post('/api/getimg',  { gse: gse, motif: motif }, { responseType: 'arraybuffer' })
            const imgUrl = URL.createObjectURL(new Blob([response.data], { type: 'image/png' }))
            // 处理返回的图片链接
            return imgUrl
          } catch(err)
          {
            console.error(error)
          }
        }

        // 监听 currentgse 的变化
        watch(() => props.currentgse, async (newValue, oldValue) => {
        if (newValue !== oldValue) {
            await fetchMotif(newValue)
        }
        })

        return {
        ...toRefs(state),
        selectNav,
        goPage,
        prevPage,
        nextPage
        }
    }
}
</script>

<style>
.page {
  display: flex;
}

.nav {
  width: 100px;
  height: 300px;
  background-color: #f5f5f5;
  overflow: auto;
}

.nav-item {
  height: 30px;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
}

.nav-item:hover {
  background-color: #e5e5e5;
}
.nav-item.active {
  background-color: #d3d3d3;
}

.content {
  width: 400px;
  height: 300px;
  background-color: #eee;
}

.pagination {
  width: 50px;
  height: 300px;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.page-item {
  height: 30px;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
}

.page-item:hover {
  background-color: #e5e5e5;
}

.page-item.active {
  background-color: #d3d3d3;
}
</style>
