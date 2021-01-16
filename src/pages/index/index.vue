<template>
	<view class="content">
		mySelf
		<div v-if="userInfo.hasLogin" class="user-info clearfix">
			<div class="img fl">
				<img :src="userInfo.avatar" alt="">
			</div>
			<div class="fr">
				<p>{{userInfo.realName || '么得名字'}}</p>
			</div>
		</div>
		<div v-else>
			点击登录
		</div>
		<div class="filter">
			<p>filter：</p>
			<p>u-price：{{price | u-price}}元</p>
			<p>u-phone：{{phone | u-phone}}</p>
		</div>
	</view>
</template>

<script>
import { mapGetters } from 'vuex';
	export default {
		data() {
			return {
				title: 'Hello',
				price: 8,
				phone: '18428283743'
			}
		},
		computed: {
			...mapGetters(['userInfo'])
		},
		onLoad() {
			console.log("$ENV：", this.$ENV);
			console.log("$apiMap：", this.$apiMap);
		},
		methods: {
			toConfirm() {
				console.log(this.userInfo);
				// uni.navigateTo({
				//     url: '/pages/confirm/index?',
				//     animationType: 'pop-in',
				//     animationDuration: 200
				// });
			}
		}
	}
</script>

<style lang="scss">
	.content{
		padding: 32rpx;
		box-sizing: border-box;
	}
	.user-info{
		width: 250rpx;
		.img{
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			background-color: #ccc;
			overflow: hidden;
			img{
				vertical-align: bottom;
				width: 100%;
			}
		}
	}
	.filter{
		margin-top: 50rpx;
		text-align: left;
	}
</style>
