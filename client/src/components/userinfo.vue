<template>
    <div id="userinfo" class="h-[700px]">
        <div class="h-[100px] text-5xl flex items-center justify-center font-600 text-stone-600 info_text">
            User information
        </div>
        <el-row class="h-[600px]" :gutter="20">
            <el-col :span="8" class="flex items-center justify-center">
                <!-- <div class="h-[350px] w-[330px] ml-[150px] bg-gray-200 rounded-3xl">
                <img src="../images/user200.png" alt="" class="mx-[65px] py-[20px] ">
                <p class="flex items-center justify-center text-3xl font-500 text-stone-500 mb-[20px]">{{ username }}
                </p>
                <p class="flex items-center justify-center text-2xl font-500 text-stone-500"> {{ email }}</p>
            </div> -->
                <div class="card_userinfo h-[450px] w-[330px] ml-[150px]">
                    <div class="img flex items-center justify-center"><img src="../images/user200.png" alt=""> </div>
                    <div class="info_text text-2xl">
                        <span class="text-2xl">{{ username }}</span>
                        <p> {{ email }}</p>
                    </div>
                    <router-link :to="{ name: 'usermodify', }">
                        <button class='tutor'>
                            <span class="text-2xl">Modify Email</span>
                            <svg width="34" height="34" viewBox="0 0 74 74" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <circle cx="37" cy="37" r="35.5" stroke="black" stroke-width="3"></circle>
                                <path
                                    d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
                                    fill="black"></path>
                            </svg>
                        </button>
                    </router-link>
                </div>
            </el-col>
            <el-col :span="16">
                <div class="h-[500px] w-[850px] rounded-3xl pt-[20px] card_userinfo">
                    <div class="text-3xl flex items-center justify-center font-500 text-stone-500 info_text">
                        Historical Submission Information
                    </div>
                    <el-table :data="tableData" border
                        class="mx-[20px] h-[440ox] w-[810px] rounded-xl my-[20px] text-2xl">
                        <el-table-column prop="hash" label="Task ID" width="180" header-align="center" align="center">
                        </el-table-column>
                        <el-table-column prop="tool" label="Tool" width="130" header-align="center" align="center">
                        </el-table-column>
                        <el-table-column prop="species" label="Species" width="100" header-align="center"
                            align="center">
                        </el-table-column>
                        <el-table-column prop="task_content" label="Task content" width="180" header-align="center"
                            align="center">
                        </el-table-column>
                        <el-table-column label="Results Download" header-align="center" align="center">
                            <template #default="scope">
                                <!-- <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button> -->
                                <!-- <el-button size="large" type="primary" @click="downlaod(scope.row.hash)">Download
                            </el-button> -->
                                <el-button @click="downlaod(scope.row.hash)"
                                    class="buttonDownload rounded-xl">Download</el-button>
                            </template>
                            <!-- <el-button type="primary" size="large" class="w-[150px]" @click="downlaod(tableData.hash)">Download
                        </el-button> -->
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<style>


/* .snowflake_userinfo {
    color: #fff;
    position: absolute;
    top: -20px;
    animation: fall_userinfo linear forwards;
}

@keyframes fall_userinfo {
    from {
        transform: translateX(0vw) translateY(320px);
    }

    to {
        transform: translateX(0vw) translateY(1000px);
    }
} */

.card_userinfo {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #f2f2f3;
    border-radius: 12px;
    box-shadow: inset 5px 5px 10px #a9a9aa77,
        inset -5px -5px 10px #ffffff7e;
}

.card_userinfo .img {
    height: 225px;
    margin-top: 1.6em;
    aspect-ratio: 1;
    border-radius: 100%;
    background: #f2f2f3;
    margin-bottom: 0.4em;
    box-shadow: -5px -5px 8px #ffffff7a,
        5px 5px 8px #a9a9aa7a;
}

.info_text {
    text-align: center;
    margin-top: 0.4em;
    background: linear-gradient(120deg, rgba(0, 194, 255, 1) 0%, rgba(0, 86, 255, 1) 100%);
    background-clip: border-box;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.card_userinfo .info_text>span {
    font-weight: bold;
    font-size: 1.5rem;
    line-height: 2rem;
}

.buttonDownload {
    display: inline-block;
    position: relative;
    padding: 10px 25px;
    background-color: #4CC713;
    color: white;
    font-family: sans-serif;
    text-decoration: none;
    font-size: 0.9em;
    text-align: center;
    text-indent: 15px;
    border: none;
}

.buttonDownload:hover {
    background-color: #45a21a;
    color: white;
}

.buttonDownload:before,
.buttonDownload:after {
    content: ' ';
    display: block;
    position: absolute;
    left: 15px;
    top: 52%;
}

.buttonDownload:before {
    width: 10px;
    height: 2px;
    border-style: solid;
    border-width: 0 2px 2px;
}

.buttonDownload:after {
    width: 0;
    height: 0;
    margin-left: 3px;
    margin-top: -7px;
    border-style: solid;
    border-width: 4px 4px 0 4px;
    border-color: transparent;
    border-top-color: inherit;
    animation: downloadArrow 1s linear infinite;
    animation-play-state: paused;
}

.buttonDownload:hover:before {
    border-color: #cdefbd;
}

.buttonDownload:hover:after {
    border-top-color: #cdefbd;
    animation-play-state: running;
}

@keyframes downloadArrow {
    0% {
        margin-top: -7px;
        opacity: 1;
    }

    0.001% {
        margin-top: -15px;
        opacity: 0.4;
    }

    50% {
        opacity: 1;
    }

    100% {
        margin-top: 0;
        opacity: 0.4;
    }
}
</style>
<script>
import { queryuser, queryuserinfo } from '../services'
import axios from "axios";
import qs from "qs";

export default {
    data() {
        return {
            username: '',
            email: '',
            tasknum: '',
            tableData: [{
                hash: '',
                tool: '',
                species: '',
                task_content: '',
            }],
        }
    },
    methods: {
        downlaod(hash) {
            // console.log(hash)
            return new Promise((resolve, reject) => {
                axios
                    .post("/api/download", qs.stringify({ name: hash }), {
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
                        alert('File to expire')
                        reject(error);
                    });
            });
        },
    },
    async mounted() {
        // console.log(this.$route.params.username)
        try {
            this.username = this.$route.params.username;
            let { errorNo, data } = await queryuser(this.username);
            // console.log(data)
            this.email = data[0].email;
            this.tasknum = data[0].tasknum;
            ({ errorNo, data } = await queryuserinfo(this.username));
            this.tableData = data
            // console.log(data)
        } catch (e) {
            console.log(e);
        }
        // const createSnowFlake = () => {
        //     const snowflake_userinfo = document.createElement("span");
        //     snowflake_userinfo.classList.add("material-symbols-outlined");
        //     snowflake_userinfo.textContent = "ac_unit";
        //     snowflake_userinfo.classList.add(`snowflake_userinfo`);
        //     // let pre = document.getElementsByClassName('predict')
        //     // document.body.appendChild(snowflake_login);
        //     if (document.getElementById('userinfo')) {
        //         document.getElementById("userinfo").appendChild(snowflake_userinfo);
        //     }
        //     // document.getElementById("login").appendChild(snowflake_login);
        //     const winWidth = window.innerWidth;

        //     let randomLeft = getRandomNumber(0, winWidth-50);
        //     let randomOpacity = getRandomNumber(0, 1);
        //     let randomSize = getRandomNumber(0.6, 2);

        //     snowflake_userinfo.style.left = randomLeft + "px";
        //     snowflake_userinfo.style.animationDuration = Math.random() * 3 + 2 + "s";
        //     snowflake_userinfo.style.opacity = randomOpacity;
        //     snowflake_userinfo.style.fontSize = randomSize + "rem";

        //     setTimeout(() => {
        //         // remove snowflake after 5s
        //         snowflake_userinfo.remove();
        //     }, 5000);
        // };

        // const getRandomNumber = (min, max) => {
        //     return Math.random() * (max - min) + min;
        // };

        // setInterval(createSnowFlake, 40); // Create snowflake every 50ms (lower interval more snowflakes)
    },

}
</script>