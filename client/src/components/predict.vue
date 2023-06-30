<template>
  <div class="h-[850px]" id="pre">
    <div
      class="h-[80px] bg-[#fff0e8] my-[30px] mx-[50px] .rounded-md flex items-center justify-center text-4xl font-bold"
    >
      MMGraph-WS : a web server for TFBSs prediction and multiple motifs finding
    </div>
    <el-row class="h-[60px]">
      <el-col :span="2"></el-col>
      <el-col :span="6" class="flex items-center justify-start text-2xl">
        <!-- <el-link type="primary" href="/public/pages/help.html#tutorial"
          class="flex items-center justify-start text-2xl">Tutorial</el-link> -->
        <router-link :to="{ name: tohelp, query: { goto: '#instructions' } }">
          <button class="tutor">
            <span class="text-2xl">Instructions</span>
            <svg
              width="34"
              height="34"
              viewBox="0 0 74 74"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="37" cy="37" r="35.5" stroke="black" stroke-width="3"></circle>
              <path
                d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
                fill="black"
              ></path>
            </svg>
          </button>
        </router-link>
      </el-col>
    </el-row>
    <el-row class="h-[50px]">
      <el-col :span="2"></el-col>
      <el-col :span="6" class="flex items-center justify-start text-2xl">Tool</el-col>
      <el-col :span="4" class="flex items-center justify-start text-2xl">
        <el-radio v-model="radio1" label="1" :disabled="radio_fixed">
          <p class="text-2xl">MMGraph</p>
        </el-radio>
      </el-col>
      <el-col :span="4" class="flex items-center justify-start text-2xl">
        <el-radio v-model="radio1" label="2" :disabled="radio_fixed">
          <p class="text-2xl">HINT-ATAC</p>
        </el-radio>
      </el-col>
      <el-col :span="4" class="flex items-center justify-start text-2xl">
        <el-radio v-model="radio1" label="3" :disabled="radio_fixed">
          <p class="text-2xl">TOBIAS</p>
        </el-radio>
      </el-col>
      <el-col :span="4"></el-col>
    </el-row>
    <el-row class="h-[50px]">
      <el-col :span="2"></el-col>
      <el-col :span="6" class="flex items-center justify-start text-2xl"
        >Species assembly</el-col
      >
      <el-col :span="4" class="flex items-center justify-start text-2xl">
        <el-radio v-model="radio2" label="homo" :disabled="radio_fixed">
          <p class="text-2xl">Homo sapiens</p>
        </el-radio>
      </el-col>
      <el-col :span="4" class="flex items-center justify-start text-2xl">
        <el-radio v-model="radio2" label="mus" :disabled="radio_fixed">
          <p class="text-2xl">Mus musclus</p>
        </el-radio>
      </el-col>
      <el-col :span="4"></el-col>
    </el-row>
    <el-row class="h-[80px]">
      <el-col :span="2"></el-col>
      <el-col :span="10" class="flex items-center justify-start text-2xl"
        >Upload .bed file (bed format)</el-col
      >
      <el-col :span="8" class="flex items-center">
        <!-- action代表上传地址 -->
        <el-upload
          class="upload-demo flex items-center"
          action="action"
          :http-request="bedupload"
          accept=".bed"
          show-file-list
          :on-preview="handlePreview1"
          :on-remove="handleRemove1"
          :before-remove="beforeRemove1"
          :limit="1"
          :on-exceed="handleExceed1"
          :file-list="fileList1"
        >
          <!-- <el-button size="large" type="primary" :disabled="radio_fixed">Click Upload</el-button> -->
          <button class="upload" :disabled="radio_fixed">Click Upload</button>
          <!-- <div slot="tip" class="el-upload__tip flex" >只能上传bed文件</div> -->
        </el-upload>
      </el-col>
      <el-col :span="4"></el-col>
    </el-row>
    <el-row class="h-[80px]">
      <el-col :span="2"></el-col>
      <el-col :span="10" class="flex items-center justify-start text-2xl"
        >Upload corresponding .bam file (bam format)
      </el-col>
      <el-col :span="8" class="flex items-center">
        <el-upload
          class="upload-demo flex items-center"
          action="active"
          :http-request="bamupload"
          accept=".bam"
          show-file-list
          :on-preview="handlePreview2"
          :on-remove="handleRemove2"
          :before-remove="beforeRemove2"
          :limit="1"
          :on-exceed="handleExceed2"
          :file-list="fileList2"
        >
          <button class="upload" :disabled="radio_fixed">Click Upload</button>
        </el-upload>
      </el-col>
      <el-col :span="4"></el-col>
    </el-row>
    <el-row class="h-[100px]">
      <el-col :span="2"> </el-col>
      <el-col :span="1" class="flex items-center justify-start text-2xl">Task:</el-col>
      <el-col :span="8" class="flex items-center justify-start text-2xl">
        <p class="italic underline">{{ task }}</p>
      </el-col>
      <el-col :span="4"> </el-col>
    </el-row>
    <el-row class="h-[50px]">
      <el-col :span="2"></el-col>
      <el-col :span="6" class="flex items-center justify-start text-2xl"
        >Motif database comparison</el-col
      >
      <el-col :span="4" class="flex items-center justify-start text-2xl">
        <el-radio v-model="radio3" label="hocomoco" :disabled="motifcom">
          <p class="text-2xl">HOCOMOCO</p>
        </el-radio>
      </el-col>
      <el-col :span="4" class="flex items-center justify-start text-2xl">
        <el-radio v-model="radio3" label="JASPAR" :disabled="motifcom">
          <p class="text-2xl">JASPAR</p>
        </el-radio>
      </el-col>
      <el-col :span="4"></el-col>
    </el-row>
    <el-row class="h-[80px]">
      <el-col :span="2"> </el-col>
      <el-col :span="12" class="flex items-center justify-start text-2xl h-[80px]">
        <div class="pre_input w-[100%]">
          <input
            type="text"
            v-model="email"
            required=""
            autocomplete="off"
            :disabled="radio_fixed"
          />
          <label>
            <span style="transition-delay: 0ms">x</span
            ><span style="transition-delay: 50ms">x</span>
            <span style="transition-delay: 100ms">@</span
            ><span style="transition-delay: 150ms">x</span
            ><span style="transition-delay: 200ms">x</span>
            <span style="transition-delay: 250ms">.</span
            ><span style="transition-delay: 300ms">c</span
            ><span style="transition-delay: 350ms">o</span
            ><span style="transition-delay: 400ms">m</span>
          </label>
        </div>
      </el-col>
    </el-row>
    <el-row class="h-[60px]">
      <el-col :span="2"> </el-col>
      <el-col :span="3" class="h-[60px] flex items-center">
        <el-button
          :disabled="isrun"
          v-model="run"
          @click="runtoruning()"
          class="w-[150px] btn_run text-2xl"
        >
          {{ run }}</el-button
        >
      </el-col>
      <el-col :span="9" class="h-[60px] py-[15px]">
        <el-progress
          :text-inside="true"
          :stroke-width="30"
          :percentage="per"
          :status="perstatus"
        ></el-progress>
      </el-col>
    </el-row>
    <el-row class="h-[60px]">
      <el-col :span="2"></el-col>
      <el-col :span="3" class="h-[60px] flex items-center">
        <el-button
          :disabled="runok"
          size="large"
          class="w-[150px] btn_run text-2xl"
          @click="downlaod()"
          >Download
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<style>
/* @import url("https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900"); */

/* .snowflake_pre {
  color: #fff;
  position: absolute;
  top: -20px;
  animation: fall_pre linear forwards;
}

@keyframes fall_pre {
  from {
    transform: translateX(0vw) translateY(320px);
  }

  to {
    transform: translateX(0vw) translateY(1150px);
  }
} */

.pre_input {
  position: relative;
  /* margin: 20px 0 40px; */
  width: 100%;
}

.pre_input input {
  background-color: transparent;
  border: 0;
  border-bottom: 2px rgb(208, 201, 201) solid;
  display: block;
  width: 100%;
  padding: 15px 0;
  /* font-size: 18px; */
  color: #000;
}

.pre_input input:focus,
.pre_input input:valid {
  outline: 0;
  border-bottom-color: rgb(32, 185, 237);
}

.pre_input label {
  position: absolute;
  top: 15px;
  left: 0;
  pointer-events: none;
}

.pre_input label span {
  display: inline-block;
  /* font-size: 18px; */
  min-width: 5px;
  color: rgb(208, 201, 201);
  transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.pre_input input:focus + label span,
.pre_input input:valid + label span {
  color: rgb(32, 185, 237);
  transform: translateY(-30px);
}

.el-upload-list {
  width: 300px;
}

.tutor {
  cursor: pointer;
  font-weight: 700;
  font-family: Helvetica, "sans-serif";
  transition: all 0.2s;
  padding: 10px 20px;
  border-radius: 100px;
  background: #80d1c6;
  border: 1px solid transparent;
  display: flex;
  align-items: center;
  font-size: 15px;
}

.tutor:hover {
  background: #a4abd6;
}

.tutor > svg {
  width: 34px;
  margin-left: 10px;
  transition: transform 0.3s ease-in-out;
}

.tutor:hover svg {
  transform: translateX(5px);
}

.tutor:active {
  transform: scale(0.95);
}

.upload {
  padding: 15px 25px;
  border: unset;
  border-radius: 15px;
  color: #212121;
  z-index: 1;
  background: #e8e8e8;
  position: relative;
  font-weight: 1000;
  font-size: 17px;
  -webkit-box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
  box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
  transition: all 250ms;
  overflow: hidden;
}

.upload::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 0;
  border-radius: 15px;
  background-color: #212121;
  z-index: -1;
  -webkit-box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
  box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
  transition: all 250ms;
}

.upload:hover {
  color: #e8e8e8;
}

.upload:hover::before {
  width: 100%;
}

.btn_run {
  --clr-font-main: hsla(0 0% 100% / 100);
  --btn-bg-1: hsla(194 100% 69% / 1);
  --btn-bg-2: hsla(217 100% 56% / 1);
  --btn-bg-color: hsla(360 100% 100% / 1);
  --radii: 0.5em;
  cursor: pointer;
  padding: 0.9em 1.4em;
  min-width: 120px;
  min-height: 44px;
  font-size: var(--size, 1rem);
  font-family: "Segoe UI", system-ui, sans-serif;
  font-weight: 500;
  transition: 0.8s;
  background-size: 280% auto;
  background-image: linear-gradient(
    325deg,
    var(--btn-bg-2) 0%,
    var(--btn-bg-1) 20%,
    var(--btn-bg-2) 40%
  );
  border: none;
  border-radius: var(--radii);
  color: var(--btn-bg-color);
  box-shadow: 0px 0px 20px rgba(71, 184, 255, 0.5),
    0px 5px 5px -1px rgba(58, 125, 233, 0.25), inset 4px 4px 8px rgba(175, 230, 255, 0.5),
    inset -4px -4px 8px rgba(19, 95, 216, 0.35);
}

.btn_run:hover {
  background-position: right top;
}

.btn_run:is(:focus, :focus-within, :active) {
  outline: none;
  box-shadow: 0 0 0 3px var(--btn-bg-color), 0 0 0 6px var(--btn-bg-2);
}

@media (prefers-reduced-motion: reduce) {
  .btn_run {
    transition: linear;
  }
}
</style>

<script>
import axios from "axios";
import qs from "qs";
import SparkMD5 from "spark-md5";
import { v4 as uuidv4 } from "uuid";
import router from "../router";
export default {
  data() {
    return {
      radio1: "1", //单选框绑定
      radio2: "homo",
      radio3: "",
      email: "", //email绑定
      fileList1: [], //bed文件名及url
      fileList2: [], //bam文件名及url
      file1: {},
      file2: {},
      run: "Run", //run按钮的显示
      isrun: false, //run按钮是否按下
      per: 0, //进度条百分比
      runok: true, //dowlaod是否不能按下
      perstatus: "", //进度条状态
      task: "TFBSs prediction & Multiple motifs finding",
      pertime: "", //
      motifcom: true,
      radio_fixed: false,
      pollingTime: null, //轮询计时器
      hash: "",
      tohelp: "indexhelp",
      // runflag: 1,
    };
  },
  watch: {
    per: {
      handler(newval, oldval) {
        if (newval >= 100) {
          this.run = "Runned";
          this.perstatus = "success";
          this.runok = false;
          clearTimeout(this.pollingTime);
        } else if (newval > 90) {
          setTimeout(() => {
            // this.perstate2();
            this.per += 1;
          }, 200);
        }
      },
    },
    radio1: {
      handler(newval, oldval) {
        if (newval === "1") {
          this.task = "TFBSs prediction & Multiple motifs finding";
          this.motifcom = true;
          this.radio3 = "";
        } else {
          this.task = "TFBSs prediction & Motif database comparison";
          this.motifcom = false;
          this.radio3 = "hocomoco";
        }
      },
    },
  },
  methods: {
    mmgraph_polling() {
      let name = this.hash;
      axios
        .post(
          "/api/mmgraph_already",
          qs.stringify({
            name: name,
          })
        )
        .then((res) => {
          let schedule = res.data.schedule;
          // console.log(schedule);
          if (schedule === 0) {
            if (this.per < 70) this.per += 1;
            this.pollingTime = setTimeout(() => {
              clearTimeout(this.pollingTime);
              this.mmgraph_polling();
            }, 60000);
          } else if (schedule === 1) {
            if (this.per < 70) this.per = 70;
            else if (this.per < 75) this.per += 1;
            this.pollingTime = setTimeout(() => {
              clearTimeout(this.pollingTime);
              this.mmgraph_polling();
            }, 1000);
          } else if (schedule === 2) {
            if (this.per < 75) this.per = 75;
            else if (this.per < 85) this.per += 1;
            this.pollingTime = setTimeout(() => {
              clearTimeout(this.pollingTime);
              this.mmgraph_polling();
            }, 1000);
          } else if (schedule === 3) {
            if (this.per < 85) this.per = 85;
            else if (this.per < 90) this.per += 1;
            this.pollingTime = setTimeout(() => {
              clearTimeout(this.pollingTime);
              this.mmgraph_polling();
            }, 1000);
          } else if (schedule === 4) {
            clearTimeout(this.pollingTime);
            this.per = 91;
            return;
          } else {
            clearTimeout(this.pollingTime);
            this.per = 0;
            alert("err!");
            return;
          }
        });
    },
    hint_polling() {
      let name = this.hash;
      axios
        .post(
          "/api/hint_already",
          qs.stringify({
            name: name,
          })
        )
        .then((res) => {
          let schedule = res.data.schedule;
          // console.log(schedule);
          if (schedule === 0) {
            if (this.per < 70) this.per += 1;
            this.pollingTime = setTimeout(() => {
              clearTimeout(this.pollingTime);
              this.hint_polling();
            }, 60000);
          } else if (schedule === 1) {
            if (this.per < 70) this.per = 70;
            else if (this.per < 90) this.per += 1;
            this.pollingTime = setTimeout(() => {
              clearTimeout(this.pollingTime);
              this.hint_polling();
            }, 10000);
          } else if (schedule === 2) {
            clearTimeout(this.pollingTime);
            this.per = 91;
            return;
          } else {
            clearTimeout(this.pollingTime);
            this.per = 0;
            alert("err!");
            return;
          }
        });
    },
    tobias_polling() {
      let name = this.hash;
      axios
        .post(
          "/api/tobias_already",
          qs.stringify({
            name: name,
          })
        )
        .then((res) => {
          let schedule = res.data.schedule;
          if (schedule === 0) {
            if (this.per < 70) this.per += 1;
            this.pollingTime = setTimeout(() => {
              clearTimeout(this.pollingTime);
              this.tobias_polling();
            }, 60000);
          } else if (schedule === 1) {
            if (this.per < 70) this.per = 70;
            else if (this.per < 90) this.per += 1;
            this.pollingTime = setTimeout(() => {
              clearTimeout(this.pollingTime);
              this.tobias_polling();
            }, 10000);
          } else if (schedule === 2) {
            clearTimeout(this.pollingTime);
            this.per = 91;
            return;
          } else {
            clearTimeout(this.pollingTime);
            this.per = 0;
            alert("err!");
            return;
          }
        });
    },
    async runstart(mail_flag) {
      this.radio_fixed = true;
      this.motifcom = true;
      let file = this.file2;
      if (!file) return;
      // 获取文件的HASH
      let already = [],
        data = null,
        HASH = this.hash,
        suffix = "bam";
      // 获取已经上传的切片信息

      try {
        await axios
          .get("/api/upload_already", {
            params: {
              HASH,
            },
          })
          .then((response) => {
            if (response.data.code === 0) {
              already = response.data.fileList;
            }
          });
      } catch (err) {
        console.log(err);
      }

      // 实现文件切片处理 「固定数量 & 固定大小」
      let max = 1024 * 100,
        count = Math.ceil(file.size / max),
        index = 0,
        chunks = [];
      if (count > 100) {
        max = file.size / 100;
        count = 100;
      }
      while (index < count) {
        chunks.push({
          file: file.slice(index * max, (index + 1) * max),
          filename: `${HASH}_${index + 1}.${suffix}`,
        });
        index++;
      }

      // 上传成功的处理
      index = 0;
      const complate = async () => {
        index++;
        // 当所有切片都上传成功，我们合并切片
        if (index < count) return;
        this.per = 5;
        try {
          axios
            .post("/api/upload_merge", {
              HASH,
              count,
            })
            .then((response) => {
              if (response.data.code === 0) {
                this.per = 10;
                let fd = new FormData();
                fd.append("file", this.file1);
                fd.append("filename", `${HASH}_0.bed`);
                axios
                  .post("/api/uploadbed", fd)
                  .then((response) => {
                    // console.log(response.data);
                    this.per = 20;
                    if (this.radio1 === "1") {
                      if (!mail_flag) {
                        axios
                          .post(
                            "/api/mmgraph",
                            qs.stringify({
                              name: HASH,
                              species: this.radio2,
                              username: this.$route.params.username,
                            })
                            // axios.post("/api/mmgraph", qs.stringify({ name: HASH, species: this.radio2, task: this.task_value })
                          )
                          .then((response) => {})
                          .catch((reason) => {
                            return Promise.reject(reason);
                          });
                      } else {
                        axios
                          .post(
                            "/api/mmgraph_mail",
                            qs.stringify({
                              name: HASH,
                              species: this.radio2,
                              mail: this.email,
                              username: this.$route.params.username,
                            })
                          )
                          .catch((reason) => {
                            return Promise.reject(reason);
                          });
                      }
                      this.mmgraph_polling();
                    } else if (this.radio1 === "2") {
                      if (!mail_flag) {
                        axios
                          .post(
                            "/api/hint",
                            qs.stringify({
                              name: HASH,
                              species: this.radio2,
                              username: this.$route.params.username,
                              database: this.radio3,
                            })
                          )
                          .then((response) => {
                            this.per = 40;
                          })
                          .catch((reason) => {
                            return Promise.reject(reason);
                          });
                      } else {
                        axios
                          .post(
                            "/api/hint_mail",
                            qs.stringify({
                              name: HASH,
                              species: this.radio2,
                              mail: this.email,
                              username: this.$route.params.username,
                              database: this.radio3,
                            })
                          )
                          .catch((reason) => {
                            return Promise.reject(reason);
                          });
                      }
                      this.hint_polling();
                    } else if (this.radio1 === "3") {
                      if (!mail_flag) {
                        axios
                          .post(
                            "/api/tobias",
                            qs.stringify({
                              name: HASH,
                              species: this.radio2,
                              username: this.$route.params.username,
                              database: this.radio3,
                            })
                          )
                          .then((response) => {
                            // console.log(response.data);
                            this.per = 40;
                          })
                          .catch((reason) => {
                            return Promise.reject(reason);
                          });
                      } else {
                        axios
                          .post(
                            "/api/tobias_mail",
                            qs.stringify({
                              name: HASH,
                              species: this.radio2,
                              mail: this.email,
                              username: this.$route.params.username,
                              database: this.radio3,
                            })
                          )
                          .catch((reason) => {
                            return Promise.reject(reason);
                          });
                      }
                      this.tobias_polling();
                    }
                  })
                  .catch((reason) => {
                    return Promise.reject(reason);
                  });
              } else throw data.codeText;
            });
        } catch (err) {
          alert("切片合并失败，请您稍后再试~~");
        }
      };
      chunks.forEach((chunk) => {
        // 已经上传的无需在上传
        if (already.length > 0 && already.includes(chunk.filename)) {
          complate();
          return;
        }
        let fm = new FormData();
        fm.append("file", chunk.file);
        fm.append("filename", chunk.filename);
        axios
          .post("/api/upload_chunk", fm)
          .then((response) => {
            if (response.data.code === 0) {
              complate();
              return;
            }
            return Promise.reject(response.data.codeText);
          })
          .catch((error) => {
            console.log(error);
            if (axios.isCancel(error)) {
              // 请求被取消，可以进行相应的处理
        
                axios.post("/api/upload_chunk", fm).then((response) => {
                  if (response.data.code === 0) {
                    complate();
                    return;
                  }
                  return Promise.reject(response.data.codeText);
                }).catch((error) => {
                  axios.post("/api/upload_chunk", fm).then((response) => {
                  if (response.data.code === 0) {
                    complate();
                    return;
                  }
                  return Promise.reject(response.data.codeText);})
                }); 
              
            } else if (error.code === 'ECONNABORTED') {
              // 请求超时，可以进行重传或者其他处理
              // console.log('请求超时，进行重传');
              
                axios.post("/api/upload_chunk", fm).then((response) => {
                  if (response.data.code === 0) {
                    complate();
                    return;
                  }
                  return Promise.reject(response.data.codeText);
                }).catch((error) => {
                  axios.post("/api/upload_chunk", fm).then((response) => {
                  if (response.data.code === 0) {
                    complate();
                    return;
                  }
                  return Promise.reject(response.data.codeText);})
                }); 
              
            } else {
              // 其他错误，可以进行相应的处理
              // console.log('发生其他错误', error);
              
                axios.post("/api/upload_chunk", fm).then((response) => {
                  if (response.data.code === 0) {
                    complate();
                    return;
                  }
                  return Promise.reject(response.data.codeText);
                }).catch((error) => {
                  axios.post("/api/upload_chunk", fm).then((response) => {
                  if (response.data.code === 0) {
                    complate();
                    return;
                  }
                  return Promise.reject(response.data.codeText);})
                }); 
              
            }
            // alert('当前切片上传失败，请您稍后再试~~');
          });
      });
    },
    runtoruning() {
      // console.log(Object.prototype.isPrototypeOf(this.file1) && Object.keys(this.file1).length === 0)
      if (
        Object.prototype.isPrototypeOf(this.file1) &&
        Object.keys(this.file1).length === 0
      ) {
        alert("Please upload the bed file");
        return;
      }
      if (
        Object.prototype.isPrototypeOf(this.file2) &&
        Object.keys(this.file2).length === 0
      ) {
        alert("Please upload the bam file");
        return;
      }
      this.hash = uuidv4().split("-")[0] + uuidv4().split("-")[1];
      // this.hash='87cc24d536f247518e0c3c9b53eeb026'
      console.log(this.hash);
      if (this.email != "") {
        let reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        let isok = reg.test(this.email);
        // console.log(isok)
        if (!isok) {
          alert("Please enter a valid email address");
          return;
        } else {
          this.run = "Runing";
          this.isrun = true;
          this.runstart(true).catch((reason) => {
            return Promise.reject(reason);
          });
          // axios.post("/api/email", qs.stringify({ name: this.hash, mail: this.email }));
          alert(
            "The result will be returned to your mailbox, please make sure that the mailbox is filled in correctly and pay attention to check, now you can exit the page"
          );
          return;
        }
      } else {
        alert(
          "Since you do not provide a valid email address, please do not close the web page after confirmation, and click the download button to download the results after operation"
        );
      }
      this.run = "Runing";
      this.isrun = true;

      this.runstart(false).catch((reason) => {
        return Promise.reject(reason);
      });
    },
    bedupload(item) {
      // console.log(item.file)
      this.file1 = item.file;
      // console.log(this.fileList1)
    },
    bamupload(item) {
      // console.log(item.file)
      this.file2 = item.file;
    },
    handleRemove1(file, fileList1) {
      // console.log(file, fileList1);
      this.file1 = null;
    },
    handlePreview1(file) {
      console.log(file);
    },
    handleExceed1(files, fileList1) {
      this.$message.warning(
        `当前限制选择 1个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList1.length
        } 个文件`
      );
    },
    beforeRemove1(file, fileList1) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleRemove2(file, fileList2) {
      // console.log(file, fileList2);
      this.file2 = null;
    },
    handlePreview2(file) {
      console.log(file);
    },
    handleExceed2(files, fileLis2) {
      this.$message.warning(
        `当前限制选择 1个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList2.length
        } 个文件`
      );
    },
    beforeRemove2(file, fileList2) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    downlaod() {
      return new Promise((resolve, reject) => {
        axios
          .post("/api/download", qs.stringify({ name: this.hash }), {
            responseType: "blob",
          })
          .then((res) => {
            if (!res) return;
            const fileName = res.headers["content-disposition"].split("filename=")[1];
            const response = res.data;
            // 兼容ie11
            if (window.navigator.msSaveOrOpenBlob) {
              try {
                const blobObject = new Blob([response]);
                window.navigator.msSaveOrOpenBlob(blobObject, fileName);
              } catch (e) {
                console.log(e);
                reject(e);
              }
              return;
            }
            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement("a");
            link.style.display = "none";
            link.href = url;
            link.setAttribute("download", fileName.replace(new RegExp('"', "g"), ""));
            console.log(link);
            document.body.appendChild(link);
            link.click();
            link.remove();
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },
  },
  destroyed() {
    clearTimeout(this.pollingTime);
  },
  mounted() {
    if (this.$route.name === "userpre") {
      this.tohelp = "userhelp";
    }
  },
};
</script>
