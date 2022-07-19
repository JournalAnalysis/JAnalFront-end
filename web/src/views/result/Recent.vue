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
            <label>显示最近三天内上传的数据</label>
    <el-table size="small" :data="listData" highlight-current-row border style="width: 100%;">
      <!-- <el-table-column align="center" type="index" width="60">
      </el-table-column> -->
      <el-table-column sortable prop="logid" label="日志编号" width="120" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="logname" label="日志名称" width="120" show-overflow-tooltip>
              <!-- <template slot-scope="scope">
                    <span>{{scope.row[scope.column.property]}}</span>
              </template>         -->
      </el-table-column>
      <el-table-column sortable prop="uptime" label="上传日期" width="140" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="loginf" label="日志描述" width="200" show-overflow-tooltip>
      </el-table-column>
             <el-table-column
               prop="logstate"
               label="状态"
             >
               <template slot-scope="scope">
                 <span v-if="scope.row.logstate!='finish'" style="color: orange">进行中</span>
                 <span v-else-if="scope.row.logstate==='finish'"  style="color: green">已完成</span>
               </template>
             </el-table-column>
      <el-table-column sortable prop="load" label="处理进度" width="160" show-overflow-tooltip>
        
         <template slot-scope="scope">
                <el-progress :text-inside="true" :stroke-width="16" :percentage="scope.row.progress"></el-progress>
                 </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="100">
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
      setInterval:setInterval(this.updateProgress,5000),
      listData: [{
        logid:'',
        cname:'',
        loginf:'',
        logname:'',
        uptime:'',
        load:'',
        logstate:''
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
     if(item.logstate!='finish'){
      this.$message.error('正在处理中，请稍候。')
     }else{
      this.$store.commit('uplogid',item.logid);
      console.log(this.$store.state.logid);
      if(this.$store.state.utype=="idi"){
            that.$router.push({ path: '/result/Result' }); 
          }else if(this.$store.state.utype=="staff"){
            that.$router.push({ path: '/staff/result/Result' }); 
          }else{
            that.$router.push({ path: '/admin/result/Result' }); 
          }
    }},
    updateProgress(){

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
       var j = Response.data.length;
       for(var i = 0;i<j;i++){
        if(Response.data[i].logstate!='finish'){
          this.listData[i].progress=Response.data[i].logstate;
          // switch(Response.data[i].logstate){
          //   case 'underway':this.listData[i].progress=0;break;
          //   case 'underway1':this.listData[i].progress='25.345';break;
          //   case 'underway2':this.listData[i].progress=31;break;
          //   case 'underway3':this.listData[i].progress=46;break;
          //   case 'underway4':this.listData[i].progress=61;break;
          //   case 'underway5':this.listData[i].progress=78;break;
          //   case 'underway6':this.listData[i].progress=89;break;
          // }
        }else{
          this.listData[i].progress=100;
        }
       }
       console.log(Response.data.length);
    })
    setTimeout(this.updateProgress,5000);
    this.setInterval;
  
    },
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
       var j = Response.data.length;
       for(var i = 0;i<j;i++){
        if(Response.data[i].logstate!='finish'){
         this.listData[i].progress=Response.data[i].logstate;
        }else{
          this.listData[i].progress=100;
        }
       }
       console.log(Response.data.length);
    })
    setTimeout(this.updateProgress,5000);
    this.setInterval;
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

 
 

 