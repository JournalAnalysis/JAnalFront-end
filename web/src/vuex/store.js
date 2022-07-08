import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state = { //要设置的全局访问的state对象
  uname: '',
  utype: '',
  auth: '',
  logid: '',
  cname: ''
};
 
const mutations = {
      upname(state, uname) {
        state.uname = uname;
      },uptype(state, utype) {
        state.utype = utype;
    },
    upcname(state, cname) {
        state.cname = cname;
    },
    upauth(state, auth) {
        state.auth = auth;
    }
};
const actions = {
    upname(context, uname) {
          context.uname = uname;
        },
    uptype(context, utype) {
            context.utype = utype;
        },
    upcname(context, cname) {
            context.cname = cname;
    },
    upauth(context, auth) {
        context.auth = auth;
    }
};
 
export default new Vuex.Store({
    state: {
        user: false,
        uname: '',
        utype: '',
        auth: '',
        cname: ''
    },
    mutations: {
        // 登录
        login(state, user) {
            state.user = user;
            localStorage.setItem("userInfo", user);
        },
        // 退出
        logout(state, user) {
            state.user = "";
            localStorage.setItem("userInfo", "");
        },
        upname(state, uname) {
            state.uname = uname;
        },
        uptype(state, utype) {
            state.utype = utype;
        },
        upcname(state, cname) {
            state.cname = cname;
        },
        upauth(state, auth) {
            state.auth = auth;
        }
    },
    actions : {
        upname(context, uname) {
            context.uname = uname;
          },
        uptype(context, utype) {
            context.utype = utype;
        },  
        upcname(context, cname) {
            context.cname = cname;
        },
        upauth(context, auth) {
            context.auth = auth;
        }
      },
    store : new Vuex.Store({
        state,
        actions,
        mutations
      }),
}) 