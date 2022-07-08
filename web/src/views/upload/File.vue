/**
 * 提交日志-上传文件
 */
<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
    <el-upload
    class="upload-demo"
    drag
    :auto-upload="true"
    :on-success="handleSuccess"
    :on-error="handleError"
    action="https://jsonplaceholder.typicode.com/posts/"
    multiple
    >
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    <div class="el-upload__tip" slot="tip">只能上传log/csv文件</div>
    </el-upload>

        <el-col span="15">  
        <el-input v-model="form.addr" placeholder="请输入日志名称"></el-input>
        </el-col>
        <el-col span="15">  
        <el-input
          type="textarea"
          v-model="form.inf"
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
  export default {
    data() {
      return {
        file:{},
        fileList:[],
        form:{
          addr:'',
          inf:''
        }
        }
    },
    computed:{

  },
    methods: {
      getFile(item){
        console.log(item.file);
        this.file = item.file;
      },
      // onSubmit(){
      //   const fd = new FormData()
      //   fd.append('filename', this.file)
      //   const config = { headers: { 'Content-Type': 'multipart/form-data' }}
      //   this.$axios.post('http://localhost:8081/user/upload/file', fd, config
      //   ).then(response => {
      //   this.$message.success(response.retCode)
      //   })
      // }
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