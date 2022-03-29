<template>
	<el-row class="rightContent">
		 <div class="right-pane">
		        <el-tabs class="tabs" v-model="activeTabName" @tab-remove="closeTab" type="border-card">
		            <el-tab-pane v-for="item in tabList" :key="item.name" :name="item.name" :label="item.name" :closable="item.closable">
		                <component :is="item.component"></component>
		            </el-tab-pane>
		        </el-tabs>
		    </div>
    </el-row>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
import Vue from 'vue'
	export default {
	    data(){
	      return {
	      	
	      }
	    },
	    computed: {
        activeTabName: {
            get() {
                return this.$store.state.activeTabName;
            },
            set(value) {
                this.$store.commit("setActiveTabName", value);
            }
        },
        ...mapState([
            'tabList'
        ])
    },
    methods: {
        ...mapMutations([
            'closeTab'
        ])
    }
  }
</script>

<style>
 .rightContent{
flex: 1 1 auto;
}
.right-pane{
display: flex;
flex-direction: column;
height:100%;
overflow-y:auto;
background:#f0f0f0;
}
.tabs,.el-tabs__content{
		overflow-y:auto;flex: 1;
		 display: flex ;flex-direction: column;
}
</style>