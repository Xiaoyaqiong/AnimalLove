<script>
	import {
		reqInterceptor
	} from '@/api/message.js'
	export default {
		onLaunch: function() {
			reqInterceptor()
			if (uni.getStorageSync('token') == null || uni.getStorageSync('token') == "") {
				uni.redirectTo({
					url: '/pages/login/login'
				})
			} else {
				uni.switchTab({
					// url:'/pages/sameCity/sameCity'
				});
			} 
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style>
	
	@import "colorui/main.css";
	
</style>