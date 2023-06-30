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
      <el-col :span="14">
        <el-row class="h-1/2">
          <el-col :span="16"></el-col>
          <el-col :span="2" class="flex items-end justify-center ml-[-10px]">
            <button @click="toinfo">
              <img src="../images/user-filling.png" alt="" />
            </button>
          </el-col>
          <el-col :span="6" class="flex items-end justify-center ml-[-10px]">
            <!-- <el-button type="info" @click="signup">Sign up</el-button> -->
            <button class="logout" @click="logout">Log out</button>
          </el-col>
        </el-row>

        <!-- <el-button type="warning" @click="login">Log in</el-button> -->

        <div
          class="text-stone-50 flex items-end justify-end text-4xl mr-[20px] mt-[80px]"
        >
          Multiple motif predictor for ATAC-seq data
        </div>
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
        </div>
      </el-col>
    </el-row>
  </div>
  <router-view></router-view>
  <!--  -->
  <Footer></Footer>
</template>

<style>
.bg_image {
  background-image: url(../images/dna_img2.png);
}

.logout {
  position: relative;
  font-size: 17px;
  text-transform: uppercase;
  text-decoration: none;
  padding: 1em 2.5em;
  display: inline-block;
  border-radius: 6em;
  transition: all 0.2s;
  border: none;
  font-family: inherit;
  font-weight: 500;
  color: black;
  background-color: white;
}

.logout:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.logout:active {
  transform: translateY(-1px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

.logout::after {
  content: "";
  display: inline-block;
  height: 100%;
  width: 100%;
  border-radius: 100px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  transition: all 0.4s;
}

.logout::after {
  background-color: #fff;
}

.logout:hover::after {
  transform: scaleX(1.4) scaleY(1.6);
  opacity: 0;
}

/* 
.example {
    position: relative;
    background-color: #efefef;
    float: left;
    width: 150px;
}

.example p {
    display: block;
    height: 58px;
    font-size: 20px;
    text-align: center;

    line-height: 58px;
    color: #88abda;
}

.example ul {
    display: none;
    position: absolute;
}

.example ul li button {
    display: inline-block;
    color: #efefef;
    height: 35px;
    width: 150px;
    padding-top: 8px;
}

.example:hover {
    background-color: #efefef;
}

.example:hover p {
    color: #003153;
    border-bottom: #003153 2px solid;
}

.example:hover ul {
    display: block;
    top: 58px;
    background-color: #efefef;
}


.example:hover ul li:hover {
    background-color: #bfbfbf;
    color: #003153;
} */
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
import Userinfo from "../components/userinfo.vue";
import { tousersearch } from "../services";
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
    Userinfo,
  },
  watch: {
    "$route.name": {
      handler(newval, oldval) {
        switch (newval) {
          case "userhome":
            this.activeIndex = "Home";
            break;
          case "userpre":
            this.activeIndex = "Predict";
            break;
          case "userhelp":
            this.activeIndex = "Help";
            break;
          case "userbro":
            this.activeIndex = "Browse";
            break;
          case "userabout":
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
      activeIndex: "Home",
      gses: [],
      state: "",
      username: "",
      email: "",
      tasknum: "",
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
        router.push("/user/" + this.username);
      } else router.push("/user/" + this.username + "/" + item);
      // }
    },
    toinfo() {
      router.push({
        name: "userinfo",
        query: {
          username: this.username,
        },
      });
      this.activeIndex = "";
    },
    logout() {
      router.push("/");
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
      tousersearch(item.value);
      this.activeIndex = "";
    },
    Search(state) {
      tousersearch(state);
      this.activeIndex = "";
    },
    handleSelect4() {
      tousersearch("GSE170214");
      this.activeIndex = "";
    },
    handleSelect5() {
      tousersearch("GSE170378");
      this.activeIndex = "";
    },
    handleSelect6() {
      tousersearch("GSE169955");
      this.activeIndex = "";
    },
  },
  mounted() {
    axios.get("/data/loadall_460.json").then((response) => (this.gses = response.data));
    this.username = this.$route.params.username;
    const routername = this.$route.name;
    switch (routername) {
      case "userhome":
        this.activeIndex = "Home";
        break;
      case "userpre":
        this.activeIndex = "Predict";
        break;
      case "userhelp":
        this.activeIndex = "Help";
        break;
      case "userbro":
        this.activeIndex = "Browse";
        break;
      case "userabout":
        this.activeIndex = "About";
        break;
      default:
        this.activeIndex = "";
    }
  },
};
</script>
