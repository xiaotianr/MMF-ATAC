<template>
  <el-row class="h-[500px] flex items-center justify-center" id="login">
    <el-col :lg="6"></el-col>
    <el-col :lg="12" class="flex items-center justify-center flex-col">
      <h2 class="font-bold text-5xl text-gray-800 my-[50px]">Welcome to MMF-ATAC</h2>
      <!-- <div class="flex items-center justify-center my-5 text-stone-500 space-x-2">
        <span class="h-[1px] w-16 bg-gray-200"></span>
        <span>Account Password Login</span>
        <span class="h-[1px] w-16 bg-gray-200"></span>
      </div> -->
      <el-form :model="form" class="w-[400px]">
        <el-form-item>
          <div class="login_input text-2xl">
            <input type="text" v-model="form.username" required="" autocomplete="off" />
            <label>
              <span style="transition-delay: 0ms">U</span
              ><span style="transition-delay: 50ms">s</span
              ><span style="transition-delay: 100ms">e</span
              ><span style="transition-delay: 150ms">r</span
              ><span style="transition-delay: 200ms">n</span
              ><span style="transition-delay: 250ms">a</span
              ><span style="transition-delay: 300ms">m</span
              ><span style="transition-delay: 350ms">e</span>
            </label>
          </div>
          <!-- <el-input v-model="form.username" placeholder="Enter your Email or username" /> -->
        </el-form-item>
        <el-form-item>
          <!-- <el-input type="password" v-model="form.password" placeholder="Enter your password" /> -->
          <div class="login_input text-2xl">
            <input
              type="password"
              v-model="form.password"
              required=""
              autocomplete="off"
            />
            <label>
              <span style="transition-delay: 0ms">P</span
              ><span style="transition-delay: 50ms">a</span
              ><span style="transition-delay: 100ms">s</span
              ><span style="transition-delay: 150ms">s</span
              ><span style="transition-delay: 200ms">w</span
              ><span style="transition-delay: 250ms">o</span
              ><span style="transition-delay: 300ms">r</span
              ><span style="transition-delay: 350ms">d</span>
            </label>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button round class="w-[400px] button_login text-2xl" @click="login"
            >Sign in</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button round class="w-[400px] button_login text-2xl" @click="signup"
            >Sign up</el-button
          >
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :lg="6"></el-col>
  </el-row>
  <!-- <div class="h-[500px] flex items-center justify-center">
    <div class="card_log ">
      <h4 class="title">Welcome to MMGraph</h4>
      <form :model="form">
        <div class="field">
          <svg class="input-icon" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M207.8 20.73c-93.45 18.32-168.7 93.66-187 187.1c-27.64 140.9 68.65 266.2 199.1 285.1c19.01 2.888 36.17-12.26 36.17-31.49l.0001-.6631c0-15.74-11.44-28.88-26.84-31.24c-84.35-12.98-149.2-86.13-149.2-174.2c0-102.9 88.61-185.5 193.4-175.4c91.54 8.869 158.6 91.25 158.6 183.2l0 16.16c0 22.09-17.94 40.05-40 40.05s-40.01-17.96-40.01-40.05v-120.1c0-8.847-7.161-16.02-16.01-16.02l-31.98 .0036c-7.299 0-13.2 4.992-15.12 11.68c-24.85-12.15-54.24-16.38-86.06-5.106c-38.75 13.73-68.12 48.91-73.72 89.64c-9.483 69.01 43.81 128 110.9 128c26.44 0 50.43-9.544 69.59-24.88c24 31.3 65.23 48.69 109.4 37.49C465.2 369.3 496 324.1 495.1 277.2V256.3C495.1 107.1 361.2-9.332 207.8 20.73zM239.1 304.3c-26.47 0-48-21.56-48-48.05s21.53-48.05 48-48.05s48 21.56 48 48.05S266.5 304.3 239.1 304.3z">
            </path>
          </svg>
          <input autocomplete="off" v-model="form.username" id="logemail" placeholder="Email or Username"
            class="input-field" name="logemail" type="email">
        </div>
        <div class="field">
          <svg class="input-icon" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M80 192V144C80 64.47 144.5 0 224 0C303.5 0 368 64.47 368 144V192H384C419.3 192 448 220.7 448 256V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V256C0 220.7 28.65 192 64 192H80zM144 192H304V144C304 99.82 268.2 64 224 64C179.8 64 144 99.82 144 144V192z">
            </path>
          </svg>
          <input autocomplete="off" v-model="form.password" id="logpass" placeholder="Password" class="input-field"
            name="logpass" type="password">
        </div>
        <button class="btn" type="submit" @click="login">Log in</button>
        <button class="btn" type="submit" @click="signup">Sign up</button>
      </form>
    </div>
  </div> -->
</template>

<style>
/* .snowflake_login {
  color: #fff;
  position: absolute;
  top: -20px;
  animation: fall_login linear forwards;
}

@keyframes fall_login {
  from {
    transform: translateX(0vw) translateY(0px);
  }

  to {
    transform: translateX(0vw) translateY(480px);
  }
} */

.login_input {
  position: relative;
  /* margin: 20px 0 40px; */
  width: 400px;
}

.login_input input {
  background-color: transparent;
  border: 0;
  border-bottom: 2px rgb(208, 201, 201) solid;
  display: block;
  width: 100%;
  padding: 15px 0;
  /* font-size: 18px; */
  color: #000;
}

.login_input input:focus,
.login_input input:valid {
  outline: 0;
  border-bottom-color: rgb(32, 185, 237);
}

.login_input label {
  position: absolute;
  top: 15px;
  left: 0;
  pointer-events: none;
}

.login_input label span {
  display: inline-block;
  /* font-size: 18px; */
  min-width: 5px;
  color: rgb(208, 201, 201);
  transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.login_input input:focus + label span,
.login_input input:valid + label span {
  color: rgb(32, 185, 237);
  transform: translateY(-30px);
}

.button_login {
  height: 2.5em;
  border-radius: 30em;
  font-size: 24px;
  font-family: inherit;
  border: none;
  position: relative;
  overflow: hidden;
  z-index: 1;
  box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;
}

.button_login::before {
  content: "";
  width: 0;
  height: 2.5em;
  border-radius: 30em;
  position: absolute;
  top: 0;
  left: 0;
  background-image: linear-gradient(to right, #0fd850 0%, #f9f047 100%);
  transition: 0.5s ease;
  display: block;
  z-index: -1;
}

.button_login:hover::before {
  width: 400px;
}
</style>

<script>
import router from "../router";
import { Login } from "../services";

export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      // console.log(this.form)
      try {
        let { errorNo, data } = await Login(this.form.username, this.form.password);
        if (errorNo === 404) {
          alert("Please enter the correct user name and password");
        } else {
          alert("Login success!!");
          router.push({
            name: "userhome",
            params: {
              username: data[0].username,
            },
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    signup() {
      router.push("/signup");
    },
  },
};
</script>
