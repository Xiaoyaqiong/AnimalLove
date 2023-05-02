<script>
	export default {
		onLaunch: function() {
			if (uni.getStorageSync('token') == null || uni.getStorageSync('token') == "") {
				uni.redirectTo({
					url: '/pages/login/login'
				})
			} else {
			
				uni.switchTab({
					url:'/pages/sameCity/sameCity'
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
	/*每个页面公共css */
</style>
