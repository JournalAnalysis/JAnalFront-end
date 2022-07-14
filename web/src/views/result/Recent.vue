/**
 * 查看结果-近期上传
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>交易订单</el-breadcrumb-item>
    </el-breadcrumb> -->
    <!--列表-->
    <label>显示三天内上传的数据</label>
    <el-table size="small" :data="listData" highlight-current-row border style="width: 100%;">
      <!-- <el-table-column align="center" type="index" width="60">
      </el-table-column> -->
      <el-table-column sortable prop="logid" label="编号" width="200" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="logname" label="日志名称" width="140" show-overflow-tooltip>
              <!-- <template slot-scope="scope">
                    <span>{{scope.row[scope.column.property]}}</span>
              </template>         -->
      </el-table-column>
      <el-table-column sortable prop="uptime" label="上传日期" width="140" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="loginf" label="日志描述" width="140" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="logstate" label="处理状态" width="140" show-overflow-tooltip>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="checkResult(scope.$index, scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <!-- <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination> -->
    <!-- 编辑界面 -->
  </div>
</template>

<script>
import Pagination from '../../components/Pagination'
export default {
  data() {
    return {
      listData: [{
        logid:'',
        cname:'',
        loginf:'',
        logname:'',
        uptime:''
       }
      ]
    }
  },
  // 注册组件
  components: {
  },
  methods:{
    checkResult(i, item){
     // console.log(item.logid);
     var that = this;
      this.$store.commit('uplogid',item.logid);
      console.log(this.$store.state.logid);
      if(this.$store.state.utype=="idi"){
            that.$router.push({ path: '/result/Result' }); 
          }else if(this.$store.state.utype=="staff"){
            that.$router.push({ path: '/staff/result/Result' }); 
          }else{
            that.$router.push({ path: '/admin/result/Result' }); 
          }
    }
  },
  /**
   * 创建完毕
   */
  created() {
    var that=this;
         let year = new Date().getFullYear();
        let month = new Date().getMonth() +1;
        let day = new Date().getDate();
        let hour = new Date().getHours();
        let minute = new Date().getMinutes();
        let second = new Date().getSeconds();
        let end = year + '-' + month + '-' + day + ' ' + hour +':'+ minute +':'+ second;
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
    console.log(end+start);
    this.$axios.post('http://localhost:8081/log/getRecent',{
      uname:this.$store.state.uname,
      uptime: end,
      loginf: start
    },{
          headers: {
            'Content-Type':'application/json'
          }
    }).then(Response=>{
       this.listData=Response.data;
       console.log(Response);
    })
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

 
 

 