<template>
		<view class="navbar">
			<u-navbar :fixed="true" height="7vh" :placeholder="true" bgColor="#FFB600">
				
				<view class="u-nav-slot" slot="left">
					<u-search action-text="" class="search" placeholder="布偶要多少钱?"  v-model="keyword"></u-search>
				</view>
				<view class="u-nav-slot" slot="right">
					<u-icon name="chat" space="0" size="1.5rem"></u-icon>
				</view>
			</u-navbar>
		</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: ''
			}
		},
	}
</script>

<style lang="scss" scoped>
	.navbar{
		.search{
			width: 95vw;
			// outline: 1px solid;
		}
	}
	
</style>