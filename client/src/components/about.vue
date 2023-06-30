<template>
  <div id="about">
    <div class="w-[100%] bg-blue-50">
      <div class="text-2xl rounded-xl card_cite w-[100%] model-overview">
        <p class="pt-[80px] pb-[50px] text-4xl ml-[-60px] font-bold">About</p>
        <p>
          The MMGraph_WS has been developed by Xiaotian Wu (School of Artificial
          Intelligence, Jilin University, Changchun, China) and Shuangquan Zhang (Nanjing
          University of Science and Technology, Wuxi, China).
        </p>
        <p>We want to thank for their help:</p>
        <p></p>
        <p></p>
        <p></p>
        <div>
          <p class="flex items-center justify-center mt-[50px]">Processor Dr. Yan Wang</p>
          <p class="flex items-center justify-center">Wenju Hou</p>
          <p class="flex items-center justify-center">Nan Sheng</p>
          <p class="flex items-center justify-center">Ziqi Zhao</p>
          <p class="flex items-center justify-center">Xuming Gu</p>
          <p class="flex items-center justify-center mb-[50px]">Qixing Yang</p>
        </div>
        <div class="about_img">
          <div class="row" v-for="(row, index) in chunkedImages" :key="index">
            <div class="column" v-for="(image, index) in row" :key="index">
              <img :src="image.src" :alt="image.alt" />
            </div>
          </div>
        </div>
        <div class="h-[100px]"></div>
      </div>
    </div>

    <!-- <div class="card0"> -->
  </div>
</template>
<style>
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
  text-indent: 2em;
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
.about_img {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.about_img .row {
  display: flex;
  justify-content: center;
}

.about_img .column {
  margin: 5px;
}
</style>
<script>
export default {
  data() {
    return {
      images: [
        { src: "/images/laborator1.jpg", alt: "Image 1" },
        { src: "/images/laborator2.jpg", alt: "Image 2" },
      ],
    };
  },
  computed: {
    chunkedImages() {
      const chunkSize = 3;
      return this.images.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / chunkSize);
        if (!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = [];
        }
        resultArray[chunkIndex].push(item);
        return resultArray;
      }, []);
    },
  },
};
</script>
