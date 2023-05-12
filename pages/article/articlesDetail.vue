<template>
	<web-view :src="articlesUrl"></web-view>
</template>

<script>
	export default{
		onLoad(e) {
		           this.articlesUrl = e.articlesUrl
		       }
	}
	
</script>

<style>
</style>