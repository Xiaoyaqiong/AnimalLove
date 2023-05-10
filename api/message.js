// 请求拦截
export function reqInterceptor() {
uni.addInterceptor('request',{
	// 拦截前触发
	invoke(args) {
		// request触发前添加token
		args.header = {
			'token': uni.getStorageSync('token')
		}
		data: args.data || {}
		// console.log(args)
		console.log(args)
	},
  returnValue(args) {
	  // console.log(args,'args2');
    // 只返回 data 字段
    return args.data
  },
  

})
}