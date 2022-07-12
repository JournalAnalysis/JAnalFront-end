/**
 * 提交日志-上传文件
 */
<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
    <el-upload
    :limit="1"
    class="upload-demo"
    ref="upload"
    drag
    action=""
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :file-list="fileList"
    :auto-upload="true"
    :http-request="UploadSubmit"
    multiple
    >
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    <div class="el-upload__tip" slot="tip">只能上传log/csv文件</div>
    </el-upload>

        <el-col span="15">  
        <el-input v-model="form.logname" placeholder="请输入日志名称"></el-input>
        </el-col>
        <el-col span="15">  
        <el-input
          type="textarea"
          v-model="form.loginf"
          maxlength="30"
          placeholder="请输入描述"
          show-word-limit>
          </el-input></el-col>
    <el-form-item></el-form-item>
    <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form>
  </div>
</template>

<script>
import { Form } from 'element-ui';

  export default {
    data() {
      return {
        file:{
          uname:'',
        },
        fileList:[],
        form:{
          loginf:'',
          logname:'',
          uname:'',
          cname:'',
          logauth:'',
          uptime:'',
          logid:''
        }
        }
    },
    computed:{

  },
    methods: {
      
      UploadSubmit(param){
        var that = this;
      this.file = param.file;
      console.log(param.file);
      var file_form = new FormData(); //获取上传表单（文件）
      for(let key in this.form){
        file_form.append(key,this.form[key]);
      }
      file_form.append("file", this.file);
      this.$axios({
        url: "http://localhost:8081/user/upload/file",
        method: "POST",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: file_form,
      })
        .then((res) => {
          that.form.logid = res.data.fileName;
          console.log(res);
          // console.log(that.logname);
        })
        .catch((err) => {
          console.log(err);
        });
      },
      onSubmit(){
        var that = this;
        this.form.uname = this.$store.state.uname;
        this.form.cname = this.$store.state.cname;
        this.form.logauth = this.$store.state.uauth;
        let year = new Date().getFullYear();
        let month = new Date().getMonth() +1;
        let day = new Date().getDate();
        let hour = new Date().getHours();
        let minute = new Date().getMinutes();
        let second = new Date().getSeconds();
        let time = year + '-' + month + '-' + day + ' ' + hour +':'+ minute +':'+ second;
        this.form.uptime = time;
        console.log(this.form);
         this.$axios.post("http://localhost:8081/user/upload/log",this.form).then(function(response){
          console.log(response);
          // that.$message.info(response.data);
          // location.reload();
          that.form.loginf = '';
          that.form.logname = '';
          that.fileList = [];
          that.$message.success(response.data);

        })
      },
      handleRemove(file, fileList) {
      console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
    },
    created(){
    }
  }
</script>

<style scoped>
.user-search {
  margin-top: 20px;
}
.userRole {
  width: 100%;
}
</style>