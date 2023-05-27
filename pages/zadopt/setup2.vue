<template>
	<view class="content">
		<view class="button">
			<button @click="choose" value="请选择文件">请选择文件</button>
		</view>
		<view class="img" v-for="imgPath in imgPaths">
			<image class="img_img" :src="imgPath"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				imgPaths:[],
				imgFile:[],
			}
		},
		onLoad() {

		},
		methods: {
			choose(e){
				var me = this;
				uni.chooseImage({
				    count: 6, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: function (res) {
						me.imgPaths = res.tempFilePaths;
						me.imgFile=res.tempFiles
						console.log(me.imgFile);
						// me.imgFile=JSON.stringify(me.imgFile)
						
						uni.uploadFile({
						            url: 'http://10.23.83.140:8080/file/uploads', //仅为示例，非真实的接口地址
						            filePath: me.imgPaths[0],
						            name: 'file',
						            // formData: {
						            //     'file': me.imgFile
						            // },
						            success: (uploadFileRes) => {
						                console.log(uploadFileRes,'uploadFileRes');
						            }
						        });
				    }
				});
			}
		}
	}
</script>


