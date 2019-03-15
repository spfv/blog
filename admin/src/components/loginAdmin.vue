<template>
    <div class="login">
        <div class="bg"> </div>
        <div class="glass">
            <el-container class="updata">
                <el-header style="line-height:60px;text-align:center;">博客系统登录</el-header>
                <el-main>
                    <el-input v-model="account" placeholder="请输入管理员账号"></el-input>
                    <el-input v-model="password" type="password" class="mgt15" placeholder="请输入管理员密码"></el-input>
                    <!-- <el-checkbox v-model="checked" class="mgt15">记住密码</el-checkbox> -->
                </el-main>
                <el-footer style="text-align:center">
                    <el-button class="wid10" type="primary" @click="login">登录</el-button>
                </el-footer>
            </el-container>
        </div>
    </div>
</template>
<script>
// import self from '@/store/self'
// import{SET_TOKEN} from '@/store/self'
import { mapState } from "vuex";
import { mapActions } from "vuex";

export default {
  name: "login",
  data() {
    return {
      account: "",
      password: "",
      // checked: true
    };
  },

  methods: {
    ...mapActions(["SET_TOKEN", "SET_TYPE"]),
    login() {
      let _this = this;
     
      this.$http.login( {
          username: this.account,
          password: this.password
        })
        .then(function(res) {
          if (res.data.status == 200) {
            _this.SET_TYPE(1);
            _this.SET_TOKEN(res.data.token);
            _this.$router.push({
              path: "/administration"
            });
            _this.$message({
              message: "恭喜主人登录成功",
              type: "success"
            });
          } else {
            alert(res.data.msg);
          }
        })
        .catch(function(err) {
          alert(err);
        });
    }
  }
};
</script>
<style lang="less" scoped>
@import "~@/common/index.less";
.login {
  // background-color:#364b61;
  height: 100%;
}
.updata {
  background: #f2f2f2;
  width: 400px;
  height: 320px;
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 10px;
}
.bg {
  filter: blur(4px);
  background-color: #15171f;
  height: 100%;
  width: 100%;
  opacity: 0.8;
}
</style>



