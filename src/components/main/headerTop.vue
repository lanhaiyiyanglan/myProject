<template>
	<div>
	  <div class="headerTop" :style="{ 'background-color': primaryColor }">
	    <img src="http://test.m-tu.com/Content/Mtbook/images/logo.jpg">
	    <div class="topRight">
	    	<span @click="showThemeDialog">{{getUserName}}换肤</span>
	    	<el-dropdown>
			  <span class="el-dropdown-link">
			    {{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
			  </span>
			  <el-dropdown-menu slot="dropdown">
			    <el-dropdown-item><router-link :to="{path:'/'}">帮助</router-link></el-dropdown-item>
			    <el-dropdown-item><span @click="logOut">退出</span></el-dropdown-item>
			  </el-dropdown-menu>
			</el-dropdown>    
	    </div>
	  </div>
	  <el-dialog :visible.sync="themeDialogVisible" title="切换主题色">
	      <el-form
	        :model="colors"
	        :rules="rules"
	        ref="form"
	        label-position="top"
	        label-width="70px">
	        <el-form-item>
	          <el-input type="color" v-model="colors.primary" class="color-input"></el-input>
	        </el-form-item>
	        <el-form-item class="color-buttons">
	          <el-button type="primary" @click="submitForm">切换</el-button>
	          <el-button @click="resetForm">重置</el-button>
	        </el-form-item>
	      </el-form>
	   </el-dialog>
	</div>
</template>

<script>
import  generateColors from '@/utils/color'
import objectAssign from 'object-assign'
import {mapState,mapMutations,mapGetters} from 'vuex'
export default {
	name: 'headerTop',
	data() {
		 const colorValidator = (rule, value, callback) => {
	        if (!value) {
	          return callback('换肤失败’');
	        } else if (!/^#[\dabcdef]{6}$/i.test(value)) {
	          return callback('换肤成功');
	        } else {
	          callback();
	        }
	      };
	      return {
	      	originalStylesheetCount: -1,//记录当前已引入style数量
            originalStyle: "",//获取拿到的.css的字符串
            cssUrl: [
                "//unpkg.com/element-ui/lib/theme-chalk/index.css",
                "./static/css/index.css"
            ],
	        rules: {
	          primary: [
	            { validator: colorValidator, trigger: 'blur' }
	          ]
	        }, 
           themeDialogVisible: false//颜色弹框
	      }
	},
	computed:{
		...mapState({
			userName:'token'
		}),
		...mapGetters({
			getUserName:'getUserName'
		}),
		colors:  {
		  get: function () {
		    return this.$store.state.colors
		  },
		  set: function (newValue) {
		    this.$store.state.colors = newValue
		  }
		},
		primaryColor:  {
		  get: function () {
		    return this.$store.state.primaryColor
		  },
		  set: function (newValue) {
		    this.$store.state.primaryColor = newValue
		  }
		}
	},
	methods:{
	  logOut(){
	  	 this.$store.commit('LogOut');
	  	 this.$router.push({path: '/'});
	  },
	   showThemeDialog() {
        this.themeDialogVisible = true;
      },
      submitForm() {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.themeDialogVisible = false;
            this.primaryColor = this.colors.primary;
            this.colors = objectAssign({}, this.colors, generateColors(this.colors.primary));
            this.$store.commit('ChangeColor',this.colors.primary)
            this.writeNewStyle();
          } else {
            return false;
          }
        });
      },
      resetForm() {
        this.$refs.form.resetFields();
      },
      writeNewStyle() {
            let cssText = this.originalStyle;
            Object.keys(this.colors).forEach(key => {
                cssText = cssText.replace(
                    new RegExp("(:|\\s+)" + key, "g"),
                    "$1" + this.colors[key]
                );
            });
            if (this.originalStylesheetCount === document.styleSheets.length) {
                // 如果之前没有插入就插入
                const style = document.createElement("style");
                style.innerText =
                    ".primaryColor{background-color:" + this.colors.primary + "}" + cssText;
                document.head.appendChild(style);
            } else {
                // 如果之前没有插入就修改
                document.head.lastChild.innerText =
                    ".primaryColor{background-color:" +
                    this.colors.primary +
                    "} " +
                    cssText;
            }
      },
      getIndexStyle(url) {
            let that = this;
            var request = new XMLHttpRequest();
            request.open("GET", url);
            request.onreadystatechange = function() {
                if (
                    request.readyState === 4 &&
                    (request.status == 200 || request.status == 304)
                ) {
                    // 调用本地的如果拿不到会得到html,html是不行的
                    if (request.response && !/DOCTYPE/gi.test(request.response)) {
                        that.originalStyle = that.getStyleTemplate(request.response);
                        that.writeNewStyle()
                    } else {
                        that.originalStyle = "";
                    }
                } else {
                    that.originalStyle = "";
                }
            };
            request.send(null);
        },
        getStyleTemplate(data) {
            const colorMap = {
                "#3a8ee6": "shade-1",
                "#409eff": "primary",
                "#53a8ff": "light-1",
                "#66b1ff": "light-2",
                "#79bbff": "light-3",
                "#8cc5ff": "light-4",
                "#a0cfff": "light-5",
                "#b3d8ff": "light-6",
                "#c6e2ff": "light-7",
                "#d9ecff": "light-8",
                "#ecf5ff": "light-9"
            };
            Object.keys(colorMap).forEach(key => {
                const value = colorMap[key];
                data = data.replace(new RegExp(key, "ig"), value);
            });
            return data;
        }
	},
	mounted() {
        // 默认从线上官方拉取最新css,2秒钟后做一个检查没有拉到就从本地在拉下
        let that = this;
        // 如果是记住用户的状态就需要，在主题切换的时候记录颜色值，在下次打开的时候从新赋值
        this.primaryColor=localStorage.getItem('primaryColor');
        this.colors.primary = localStorage.getItem('color');//例如
        this.getIndexStyle(this.cssUrl[0]);
        setTimeout(function() {
            if (that.originalStyle) {
                return;
            } else {
                that.getIndexStyle(that.cssUrl[1]);
            }
        }, 2000);
        this.$nextTick(() => {
            // 获取页面一共引入了多少个style 文件
            this.originalStylesheetCount = document.styleSheets.length;
        });
    }
}
</script>
<style >
.headerTop{clear:both;padding:0 20px;width:100%;height:60px;box-sizing:border-box;color:#CCCCCC;}
.headerTop img{display: inline-flex;align-items: center;}
.topRight{float:right;display:inline-block;}
.el-dropdown{color:#fff;cursor:pointer;}
</style>