<template>
	<div>
		<ul class="shop">
			<li v-for="item in shopData">
				<div class="shopImg">
					<span>{{item.howZ}}折</span>
					<div :style="{backgroundImage:'url(' + item.img+ ')', backgroundRepeat:'no-repeat', backgroundPosition:'center center', backgroundSize: 'contain'}"></div>
				</div>
				<h3><span>￥{{item.nowPrice}}</span>(原价￥{{item.oldPrice}})</h3>
				<p v-if="item.useTime==null||item.useTime==''">
					新鲜日期
				</p>
				<p v-else>
					有效时间：{{item.useTime}}
				</p>
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				shopData:[]
			}
		},
		mounted(){
			this.$http.get('http://localhost:8080/static/json/shop.json',{}, response => {
		      	this.shopData=response.data;
		    })
		}
	}
</script>
<style>	
  .shop{flex-wrap: wrap;display:flex;justify-conten:space-between;}
  .shop li{width:12.5%;box-sizing: border-box;padding:0 10px;border:1px solid #ccc;border-left:none;margin-bottom:5px;}
  .shop li:first-child{border-left:1px solid #ccc;}
  .shopImg{position:relative;}
  .shopImg span{font-size:20px;position:absolute;top:22px;transform: rotate(-41deg);left:-11px;z-index:2;background:#fde8cd;width:80px;height:30px;line-height:30px;border-radius: 10px;text-align: center;color:#fd414f;}
  .shopImg div{display: block;height:200px;width:100%;}
  .shop li h3{color:#7f7f78;font-weight:normal;font-size:16px;}
  .shop li h3 span{color:#fd414f;padding-right:10px;font-size:20px;}
  .shop li p{color:#7f7f78;font-size:16px;margin:10px 0;}
</style>