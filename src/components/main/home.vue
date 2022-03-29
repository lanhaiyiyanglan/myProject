<template>
	<el-container>
		<el-row class="menuBar" :style="{'background-color':this.$store.state.primaryColor}">
			  <el-col :span="24">
				    <el-menu 
				    	:default-active="$route.path"
				    	:style="{'background-color':this.$store.state.primaryColor}" text-color="#8e95a9" @select="addTab">
			          <NavMenu :navMenus="menuData"></NavMenu>
			        </el-menu>
			  </el-col>
		</el-row>
		<div class="main">
			<headerTop></headerTop>
			<rightContent></rightContent>
		</div>
	</el-container>
</template>

<script>
import NavMenu from '@/components/main/NavMenu'
import headerTop from '@/components/main/headerTop'
import rightContent from '@/components/main/rightContent'
import {mapMutations} from 'vuex'
export default{
	data(){
		return{
			menuData:[],
			data:''
		}
	},
	created(){
		this.$http.get('http://localhost:8080/static/json/menuData.json',{}, response => {
      	this.menuData=response.data;
        console.log(response);
      })
   },
	components: {
      NavMenu: NavMenu,
      headerTop:headerTop,
      rightContent:rightContent
      
   },
   methods: {
      ...mapMutations([
	      'addTab'
	    ])
   }
}
</script>
<style>
.el-container {
  height: 100%;
}
.menuBar{
  display: block;
  position: absolute;
  left: 0;
  bottom: 0;
  width:200px;
}
.el-menu{
	border-right:none;
}
.main{flex:1;}
</style>