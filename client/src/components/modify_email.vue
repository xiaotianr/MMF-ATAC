<template>
    <el-row class="h-[500px] flex items-center justify-center" id="modify_email">
        <el-col :lg="6"></el-col>
        <el-col :lg="12" class="flex items-center justify-center flex-col ">
            <h2 class="font-bold text-5xl text-gray-800 my-[50px]">Modify Email</h2>
            <el-form :model="form" class="w-[400px]">
                <el-form-item>
                    <div class="modify_input text-2xl">
                        <input type="text" v-model="form.oldemail" required="" autocomplete="off">
                        <label>
                            <span style="transition-delay:0ms">O</span><span style="transition-delay:50ms">l</span><span
                                style="transition-delay:100ms">d</span><span style="transition-delay:100ms">
                            </span><span style="transition-delay:150ms">E</span><span
                                style="transition-delay:200ms">m</span><span
                                style="transition-delay:250ms">a</span><span
                                style="transition-delay:300ms">i</span><span style="transition-delay:350ms">l</span>
                        </label>
                    </div>
                    <!-- <el-input v-model="form.username" placeholder="Enter your Email or username" /> -->
                </el-form-item>
                <el-form-item>
                    <!-- <el-input type="password" v-model="form.password" placeholder="Enter your password" /> -->
                    <div class="modify_input text-2xl">
                        <input type="password" v-model="form.newemail" required="" autocomplete="off">
                        <label>
                            <span style="transition-delay:0ms">N</span><span style="transition-delay:50ms">e</span><span
                                style="transition-delay:100ms">w</span><span style="transition-delay:100ms">
                            </span><span style="transition-delay:150ms">E</span><span
                                style="transition-delay:200ms">m</span><span
                                style="transition-delay:250ms">a</span><span
                                style="transition-delay:300ms">i</span><span style="transition-delay:350ms">l</span>
                        </label>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button round class="w-[400px] button_modify" @click="modify">Modify</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :lg="6"></el-col>
    </el-row>
</template>
  
<style>



.modify_input {
    position: relative;
    /* margin: 20px 0 40px; */
    width: 400px;
}

.modify_input input {
    background-color: transparent;
    border: 0;
    border-bottom: 2px rgb(208, 201, 201) solid;
    display: block;
    width: 100%;
    padding: 15px 0;
    /* font-size: 18px; */
    color: rgb(0, 0, 0);
}

.modify_input input:focus,
.modify_input input:valid {
    outline: 0;
    border-bottom-color: rgb(32, 185, 237);
}

.modify_input label {
    position: absolute;
    top: 15px;
    left: 0;
    pointer-events: none;
}

.modify_input label span {
    display: inline-block;
    /* font-size: 18px; */
    min-width: 5px;
    color: rgb(208, 201, 201);
    transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.modify_input input:focus+label span,
.modify_input input:valid+label span {
    color: rgb(32, 185, 237);
    transform: translateY(-30px);
}

.button_modify {
    height: 2.5em;
    border-radius: 30em;
    font-size: 24px;
    font-family: inherit;
    border: none;
    position: relative;
    overflow: hidden;
    z-index: 1;
    box-shadow: 6px 6px 12px #c5c5c5,
        -6px -6px 12px #ffffff;
}

.button_modify::before {
    content: '';
    width: 0;
    height: 2.5em;
    border-radius: 30em;
    position: absolute;
    top: 0;
    left: 0;
    background-image: linear-gradient(to right, #0fd850 0%, #f9f047 100%);
    transition: .5s ease;
    display: block;
    z-index: -1;
}

.button_modify:hover::before {
    width: 400px;
}
</style>
  
<script>
import router from '../router';
import { Modify } from '../services';

export default {
    data() {
        return {
            form: {
                oldemail: '',
                newemail: '',
            },
        };
    },
    methods: {
        async modify() {
            let reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            let isok = reg.test(this.form.newemail);
            // console.log(isok)
            if (!isok) {
                alert("Please enter a new valid email address");
                return;
            }
            try {
                let username = this.$route.params.username;
                let { errorNo, data } = await Modify(username, this.form.oldemail, this.form.newemail);
                if (errorNo === 401) {
                    alert('The new email is bound, please select another email address')
                } else if(errorNo === 402) {
                    alert('Please enter the correct current email address')
                }
                else {
                    alert('modify successful!!')
                    router.push({
                        name: 'userhome',
                        params: {
                            username: username
                        }
                    })
                }
            } catch (e) {
                console.log(e)
            }
        },
        signup() {
            router.push('/signup')
        }
    },
}
</script>