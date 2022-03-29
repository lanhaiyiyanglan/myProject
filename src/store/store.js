import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
const mainPage= resolve => require(['@/components/pages/mainPage'], resolve)
export default new Vuex.Store({
	state:{
		token:'',
		 colors: {
	          primary: '#1F2d45'
	    },
	    primaryColor: '#1F2d45',
	    activeTabName: "系统设置",
	    tabList: [
	        {
	            name: '系统设置',
	            disabled: false,
	            closable: false,
	            component: mainPage
	        }
	    ]
	},
	mutations:{
		Login(state,data){
			localStorage.token=data;
			state.token=data;
			console.log(data);
		},
		LogOut(state){
			localStorage.removeItem('token');
            state.token = null
		},
		ChangeColor(state,data){
            localStorage.setItem("color",data);
            localStorage.setItem("primaryColor",data);
            state.colors.primary = data;
            state.primaryColor=data;
       },
       setActiveTabName(state, name) {
          state.activeTabName = name;
	    },
	    addTab(state, index) {
	    	let cc=index.split('/');
	    	console.log(cc[0]);
	        if (state.tabList.filter(f => f.name == cc[0]) == 0) {
	           let component=resolve => require([`@/components/pages/${cc[1]}`], resolve)
	            state.tabList.push({
	                name: cc[0],
	                disabled: false,
	                closable: true,
	                component: component
	            })
	        }
	        state.activeTabName = cc[0];
	    },
	    closeTab(state, name) {
	        let tab = state.tabList.filter(f => f.name == name)[0];
	        let index = state.tabList.indexOf(tab);
	        if (index != state.tabList.length - 1) {
	            state.activeTabName = state.tabList[index + 1].name;
	        } else {
	            state.activeTabName = state.tabList[index - 1].name;
	        }
	        state.tabList = state.tabList.filter(f => f.name != name);
	    }
	},
	actions:{
		Login(context,data){
			 context.commit("Login",data);
		},
		LogOut(context){
			context.commit("LogOut");
		}
	},
	getters:{
		getUserName:(state)=>{return state.token}
	}
})