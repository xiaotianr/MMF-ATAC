<template>
  <div
    class="h-[250px] bg-[#fff] bg_image bg-cover bg-no-repeat bg-center bg-blend-multiply"
  >
    <el-row class="min-h-full">
      <el-col :span="10">
        <div>
          <div
            class="text-stone-50 flex items-center justify-start font-bold text-7xl my-6 mx-10"
          >
            MMGraph-WS
          </div>
        </div>
      </el-col>
      <!-- <el-col :span="6">
                <img src="../images/motif.png" class="h-[150px]" />
            </el-col> -->
      <el-col :span="14">
        <el-row class="h-1/2">
          <el-col :span="12"></el-col>
          <el-col :span="6" class="flex items-end justify-center ml-[-10px]">
            <button @click="login" class="login">
              <svg
                height="24"
                width="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M5 13c0-5.088 2.903-9.436 7-11.182C16.097 3.564 19 7.912 19 13c0 .823-.076 1.626-.22 2.403l1.94 1.832a.5.5 0 0 1 .095.603l-2.495 4.575a.5.5 0 0 1-.793.114l-2.234-2.234a1 1 0 0 0-.707-.293H9.414a1 1 0 0 0-.707.293l-2.234 2.234a.5.5 0 0 1-.793-.114l-2.495-4.575a.5.5 0 0 1 .095-.603l1.94-1.832C5.077 14.626 5 13.823 5 13zm1.476 6.696l.817-.817A3 3 0 0 1 9.414 18h5.172a3 3 0 0 1 2.121.879l.817.817.982-1.8-1.1-1.04a2 2 0 0 1-.593-1.82c.124-.664.187-1.345.187-2.036 0-3.87-1.995-7.3-5-8.96C8.995 5.7 7 9.13 7 13c0 .691.063 1.372.187 2.037a2 2 0 0 1-.593 1.82l-1.1 1.039.982 1.8zM12 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
                  fill="currentColor"
                ></path>
              </svg>
              <span>Log in</span>
            </button>
          </el-col>
          <el-col :span="6" class="flex items-end justify-center ml-[-10px]">
            <!-- <el-button type="info" @click="signup">Sign up</el-button> -->
            <button class="signup" @click="signup">
              Sign up
              <div class="arrow-wrapper">
                <div class="arrow"></div>
              </div>
            </button>
          </el-col>
        </el-row>

        <!-- <el-button type="warning" @click="login">Log in</el-button> -->

        <div
          class="text-stone-50 flex items-end justify-end text-4xl mr-[20px] mt-[80px]"
        >
          Multiple motif predictor for ATAC-seq data
        </div>
        <!-- <button @click="login">Sign up</button> -->
      </el-col>
    </el-row>
  </div>
  <div>
    <el-row>
      <el-col :span="14">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#efefef"
          text-color="#003153"
          active-text-color="#003153"
        >
          <el-menu-item index="Home" class="text-2xl min-h-58px min-w-[18%]"
            >Home</el-menu-item
          >
          <el-menu-item index="Predict" class="text-2xl min-h-58px min-w-[18%]"
            >Predict</el-menu-item
          >
          <el-menu-item index="Browse" class="text-2xl min-h-58px min-w-[18%]"
            >Browse</el-menu-item
          >
          <el-menu-item index="Help" class="text-2xl min-h-58px min-w-[18%]"
            >Help</el-menu-item
          >
          <el-menu-item index="About" class="text-2xl min-h-58px min-w-[18%]"
            >About Us</el-menu-item
          >
        </el-menu>
      </el-col>
      <el-col :span="10" class="bg-[#efefef] h-[59px]">
        <div class="flex items-center justify-center h-[58px]">
          <el-autocomplete
            class="inline-input w-[80%]"
            v-model="state"
            :fetch-suggestions="querySearch"
            clearable
            placeholder="Enter the GSE ID of ATAC-seq data (such as GSE170214)"
            :trigger-on-focus="false"
            select-when-unmatched
            @select="Select"
          >
            <template #suffix>
              <el-tooltip
                content="Support for fuzzy search and multiple searches, where you can separate multiple keywords with commas"
                placement="bottom"
                effect="light"
              >
                <button @click="Search(state)">
                  <el-icon class="el-input__icon">
                    <Search />
                  </el-icon>
                </button>
              </el-tooltip>
            </template>
          </el-autocomplete>

          <!-- <div class="example">
                        <div class="text-2xl">Example</div>
                        <ul>
                            <li><button @click="handleSelect4">GSE170214</button></li>
                            <li><button @click="handleSelect5">GSE170378</button></li>
                            <li><button @click="handleSelect6">GSE169955</button></li>
                        </ul>
                    </div> -->
        </div>
      </el-col>
    </el-row>
  </div>
  <router-view></router-view>
  <!--  -->
  <Footer></Footer>
  <el-backtop :bottom="100">
    <div
      style="
        height: 100%;
        width: 100%;
        background-color: var(--el-bg-color-overlay);
        box-shadow: var(--el-box-shadow-lighter);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      "
    >
      Top
    </div>
  </el-backtop>
</template>

<style>
.bg_image {
  background-image: url(../images/dna_img2.png);
}

.login {
  display: flex;
  align-items: center;
  font-family: inherit;
  font-weight: 500;
  font-size: 17px;
  padding: 0.8em 1.3em 0.8em 0.9em;
  color: white;
  background: #ad5389;
  background: linear-gradient(to right, #0f0c29, #302b63, #24243e);
  border: none;
  letter-spacing: 0.05em;
  border-radius: 16px;
}

.login svg {
  margin-right: 3px;
  transform: rotate(30deg);
  transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
}

.login span {
  transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
}

.login:hover svg {
  transform: translateX(5px) rotate(90deg);
}

.login:hover span {
  transform: translateX(7px);
}

.signup {
  --primary-color: #645bff;
  --secondary-color: #fff;
  --hover-color: #111;
  --arrow-width: 10px;
  --arrow-stroke: 2px;
  box-sizing: border-box;
  border: 0;
  border-radius: 20px;
  color: var(--secondary-color);
  padding: 1em 1.8em;
  background: var(--primary-color);
  display: flex;
  transition: 0.2s background;
  align-items: center;
  gap: 0.6em;
  font-weight: bold;
}

.signup .arrow-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.signup .arrow {
  margin-top: 1px;
  width: var(--arrow-width);
  background: var(--primary-color);
  height: var(--arrow-stroke);
  position: relative;
  transition: 0.2s;
}

.signup .arrow::before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  border: solid var(--secondary-color);
  border-width: 0 var(--arrow-stroke) var(--arrow-stroke) 0;
  display: inline-block;
  top: -3px;
  right: 3px;
  transition: 0.2s;
  padding: 3px;
  transform: rotate(-45deg);
}

.signup:hover {
  background-color: var(--hover-color);
}

.signup:hover .arrow {
  background: var(--secondary-color);
}

.signup:hover .arrow:before {
  right: 0;
}
</style>

<script>
import router from "../router";
import Footer from "../components/footer.vue";
import Home from "../components/home.vue";
import Predict from "../components/predict.vue";
import Browse from "../components/browse.vue";
import About from "../components/about.vue";
import Searcher from "../components/searcher.vue";
import Login from "../components/login.vue";
import Signup from "../components/signup.vue";
import Help from "../components/help.vue";
import { tosearch } from "../services";
import axios from "axios";

export default {
  components: {
    Footer,
    Home,
    Searcher,
    Predict,
    Browse,
    About,
    Login,
    Signup,
    Help,
  },
  watch: {
    "$route.name": {
      handler(newval, oldval) {
        switch (newval) {
          case "indexhome":
            this.activeIndex = "Home";
            break;
          case "indexpre":
            this.activeIndex = "Predict";
            break;
          case "indexhelp":
            this.activeIndex = "Help";
            break;
          case "indexbro":
            this.activeIndex = "Browse";
            break;
          case "indexabout":
            this.activeIndex = "About";
            break;
          default:
            this.activeIndex = "";
        }
      },
    },
  },
  data() {
    return {
      activeIndex: "",
      gses: [],
      state: "",
    };
  },
  methods: {
    handleSelect(item) {
      // if (item === 'Help') {
      //     window.location.href = '/pages/help.html'
      // }
      // else {
      this.activeIndex = item;
      if (item === "Home") {
        router.push("/");
      } else router.push(item);
      // }
    },
    login() {
      router.push("/login");
      this.activeIndex = "";
    },
    signup() {
      router.push("/signup");
      this.activeIndex = "";
    },
    querySearch(queryString, cb) {
      var gses = this.gses;
      var results = queryString ? gses.filter(this.createFilter(queryString)) : gses;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (gse) => {
        return gse.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
      };
    },
    Select(item) {
      tosearch(item.value);
      this.activeIndex = "";
    },
    Search(state) {
      tosearch(state);
      this.activeIndex = "";
    },
    handleSelect4() {
      tosearch("GSE170214");
      this.activeIndex = "";
    },
    handleSelect5() {
      tosearch("GSE170378");
      this.activeIndex = "";
    },
    handleSelect6() {
      tosearch("GSE169955");
      this.activeIndex = "";
    },
  },
  mounted() {
    // this.gses = this.loadAll();
    axios.get("/data/loadall_460.json").then((response) => (this.gses = response.data));
    const routername = this.$route.name;
    switch (routername) {
      case "indexhome":
        this.activeIndex = "Home";
        break;
      case "indexpre":
        this.activeIndex = "Predict";
        break;
      case "indexhelp":
        this.activeIndex = "Help";
        break;
      case "indexbro":
        this.activeIndex = "Browse";
        break;
      case "indexabout":
        this.activeIndex = "About";
        break;
      default:
        this.activeIndex = "";
    }
  },
};
</script>
