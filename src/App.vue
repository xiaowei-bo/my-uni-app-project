<script>
	import { mapGetters } from 'vuex';
	export default {
		computed: {
			...mapGetters(['userInfo', 'paramInfo'])
		},
		onLaunch: async function(options) {
			await this.$store.dispatch('setJsCode');
			await this.$store.dispatch('setUserInfo')
			console.log('userInfo', this.userInfo);
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
@import './common/scss/base.scss';
@import './common/scss/function.scss';
	/*每个页面公共css */
</style>
