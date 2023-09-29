<template>
  <el-row class="h-[650px]" id="signup">
    <el-col :lg="6"></el-col>
    <el-col :lg="12" class="flex items-center justify-center flex-col">
      <h2 class="font-bold text-5xl text-gray-800 my-[50px]">Welcome to MMF-ATAC</h2>
      <el-form :model="form" class="w-[400px]" status-icon :rules="rules" ref="formref">
        <el-form-item prop="username">
          <div class="signup_input text-2xl">
            <input type="text" required="" autocomplete="off" v-model="form.username" />
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
        </el-form-item>
        <el-form-item prop="email">
          <div class="signup_input text-2xl">
            <input type="text" required="" autocomplete="off" v-model="form.email" />
            <label>
              <span style="transition-delay: 0ms">E</span
              ><span style="transition-delay: 50ms">m</span
              ><span style="transition-delay: 100ms">a</span
              ><span style="transition-delay: 150ms">i</span
              ><span style="transition-delay: 200ms">l</span>
            </label>
          </div>
        </el-form-item>
        <el-form-item prop="password">
          <div class="signup_input text-2xl">
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
        <el-form-item prop="checkpass">
          <div class="signup_input text-2xl">
            <input
              type="password"
              v-model="form.checkpass"
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
              <span style="transition-delay: 50ms"> </span
              ><span style="transition-delay: 100ms">A</span
              ><span style="transition-delay: 150ms">g</span
              ><span style="transition-delay: 200ms">a</span
              ><span style="transition-delay: 250ms">i</span
              ><span style="transition-delay: 300ms">n</span>
            </label>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button round class="w-[400px] button_login" @click="submitForm('formref')"
            >Sign up
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button round class="w-[400px] button_login" @click="resetForm('formref')"
            >Reset
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :lg="6"></el-col>
  </el-row>
</template>

<style>
.signup_input {
  position: relative;
  width: 400px;
}

.signup_input input {
  background-color: transparent;
  border: 0;
  border-bottom: 2px rgb(208, 201, 201) solid;
  display: block;
  width: 100%;
  padding: 15px 0;
  font-size: 18px;
  color: #000;
}

.signup_input input:focus,
.signup_input input:valid {
  outline: 0;
  border-bottom-color: rgb(32, 185, 237);
}

.signup_input label {
  position: absolute;
  top: 15px;
  left: 0;
  pointer-events: none;
}

.signup_input label span {
  display: inline-block;
  font-size: 24px;
  min-width: 5px;
  color: rgb(208, 201, 201);
  transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.signup_input input:focus + label span,
.signup_input input:valid + label span {
  color: rgb(32, 185, 237);
  transform: translateY(-30px);
}
</style>

<script>
import router from "../router";
import { Signup } from "../services";

export default {
  data() {
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter a user name"));
      } else {
        callback();
      }
    };
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter your email"));
      } else {
        var reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        var isok = reg.test(this.form.email);
        if (!isok) {
          callback(new Error("Please enter a valid email address"));
        }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter your password"));
      } else if (value.length < 6) {
        callback(new Error("Passwords should be longer than 6 characters"));
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.formref.validateField("checkpass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter your password again"));
      } else if (value !== this.form.password) {
        callback(new Error("The two input passwords are inconsistent!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        username: "",
        password: "",
        email: "",
        checkpass: "",
      },
      rules: {
        username: [{ validator: validateName, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkpass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let { errorNo, data } = await Signup(
            this.form.username,
            this.form.password,
            this.form.email
          );
          if (errorNo === 0) {
            alert("Register success!");
            router.push({
              name: "userhome",
              params: {
                username: this.form.username,
              },
            });
          } else if (errorNo === 401) {
            alert("The username has been registered!!");
            return false;
          } else if (errorNo === 402) {
            alert("The email has been registered!!");
            return false;
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
    },
  },
};
</script>
