<template>
	<view class="postarticle ">
		<view class="cu-bar">
			<u-icon name="close" size="20" color="#989898" @click="goBackToorder"></u-icon>
			<view class="btn"><button class="release flex  align-center  justify-center" @tap="showModal"
					data-target="DialogModal1">发布</button></view>
		</view>
		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="action" @tap="hideModal('1')">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					是否确认发布
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-blue text-blue" @tap="hideModal('ca')">取消</button>
						<button class="cu-btn bg-blue margin-left" @tap="hideModal('yes')">确定</button>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-bar bg-white ">
			<view class="title">
				<input type="text" v-model="title">
			</view>
		</view>
		<view class="cu-form-group">
			<view class="grid col-4 grid-square flex-sub">
				<view class="bg-img" v-for="(item,index) in imagesUrl" :key="index" @tap="ViewImage"
					:data-url="imagesUrl[index]">
					<image :src="imagesUrl[index]" mode="aspectFill"></image>
					<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
						<u-icon name="close" size="10rpx" color="#fff"></u-icon>
					</view>
				</view>
				<view class="solids" @tap="ChooseImage" v-if="imagesUrl.length<6">
					<u-icon class="plus" name="plus" size="1.5rem"></u-icon>
				</view>
			</view>
		</view>
		<view class="idea">把你的想法分享给全世界</view>
		<view class="cu-form-group margin-top">
			<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaAInput" placeholder=""
				v-model="articleContent"></textarea>
		</view>
	</view>

</template>

<script>
	import myhttp from '../../api/myhttp.js'
	import config from '../../api/config.js'
	export default {
		data() {
			return {
				modalName: null,
				imagesUrl: [],
				articleContent: "",
				createTime: '',
				coverUrl: '',
				title: ''
			}
		},
		methods: {
			// //判断指定字段是否为空，若存在为空返回true
			checkNull() {
				if (this.articleContent == '' && this.title == '') {
					uni.showToast({
						title: '内容不能为空',
						icon: 'fail'
					});
					return true;
				}
				//判断到最后说明都不为空，返回false
				return false;
			},
			// 获取输入内容
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
			},
			// 选择照片上传
			ChooseImage() {
				let that=this
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (that.imagesUrl.length != 0) {
							that.imagesUrl = that.imagesUrl.concat(res.tempFilePaths)
							console.log(that.imagesUrl);
							uni.uploadFile({
								url: 'http://10.23.83.140:8080/file/uploads', //仅为示例，非真实的接口地址
								filePath: that.imagesUrl[0],
								name: 'file',
								formData: '123456@qq.com',
								success: (uploadFileRes) => {
									console.log(3333);
									console.log(uploadFileRes.data);
								}
							});
							
						} else {
							
							that.imagesUrl = res.tempFilePaths
							console.log(that.imagesUrl);
							
							uni.uploadFile({
								url: 'http://10.23.83.140:8080/file/uploads/'+'123456@qq.com', //仅为示例，非真实的接口地址
								filePath: that.imagesUrl[0],
								name: 'file',
								// header: {},
								formData: res.tempFiles[0],
								success: (result) => {
									console.log(3333);
									console.log(result.data);
								}
							});
						}
					}
				});
			},
			// 上传图片
			// uploadFile(){
			// 	let that=this
			// 	uni.uploadFile({
			// 		url: 'http://10.23.83.140:8080/file/uploads', //仅为示例，非真实的接口地址
			// 		filePath: that.imagesUrl[0],
			// 		name: 'file',
			// 		formData: '123456@qq.com',
			// 		success: (uploadFileRes) => {
			// 			console.log(3333);
			// 			console.log(uploadFileRes.data);
			// 		}
			// 	});
			// }
			// 取消图片上传
			DelImg(e) {
				uni.showModal({
					title: '召唤师',
					content: '确定要删除照片吗？',
					cancelText: '再看看',
					confirmText: '再见',
					success: res => {
						if (res.confirm) {
							this.imagesUrl.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			// 图片预览
			ViewImage(e) {
				uni.previewImage({
					urls: this.imagesUrl,
					current: e.currentTarget.dataset.url
				});
			},
			// 返回上一页
			goBackToorder() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 弹出是否发布框
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			// 发布框确认
			hideModal(str) {
				// console.log(str);
				this.modalName = null
				if (str === 'yes') this.addArticle();
				console.log(this.imagesUrl.join(", "));
				console.log(this.articleContent);
				console.log(this.title);
			},
			// 添加文本内容
			addArticle: function(e) {
				// console.log('11111'); 
				let that = this;
				if (that.checkNull()) {
					return
				}
				that.$myhttp.post('/user/article/publish', {
					context: this.articleContent,
					imageUrl: this.imagesUrl.join(", "),
					title: this.title
				}).then(res => {
					console.log(res);
				})
				// uni.request({
				// 	url: that.$baseUrl + "/users/articles/addArticle",
				// 	method: 'POST',
				// 	data: {
				// 		articleContent: that.articleContent,
				// 		coverUrl: that.coverUrl,
				// 		createTime: that.createTime,
				// 		imagesUrl: that.imagesUrl,
				// 	},
				// 	header: {
				// 		'Authorization': that.$store.state.token
				// 	},
				// 	success(res) {
				// 		console.log(res)
				// 		// 验证是否成功
				// 		if (res.data.status != '200') {
				// 			uni.showToast({
				// 				title: res.data.msg,
				// 				icon: 'fail'
				// 			});
				// 		} else {
				// 			uni.showToast({
				// 				title: res.data.msg,
				// 				icon: 'success'
				// 			});

				// 		}
				// 	},
				// 	fail: (err) => {
				// 		console.error(err);

				// 	},
				// });



			},
		}

	}
</script>

<style lang="scss">
	@import 'setup.scss';
</style>
