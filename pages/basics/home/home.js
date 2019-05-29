Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    iconList: [{
      icon: 'list',
      color: 'white',
      badge: 120,
      name: '进行中'
    }, {
      icon: 'check',
        color: 'white',
      badge: 1,
      name: '已完成'
    }, {
      icon: 'notice',
        color: 'white',
      badge: 0,
      name: '提醒'
    }, {
      icon: 'comment',
        color: 'white',
      badge: 22,
      name: '通知'
    },],
    dayStyle: [
      { month: 'current', day: '22', color: 'white', background: '#AAD4F5' },
      { month: 'current', day: new Date().getDate()+1, color: 'white', background: '#030' }
    ],
  },
	//组件创建时，获取数据
	created() {
		let that = this;
		// 获取消息信息
		wx.request({
			url: 'http://localhost:3000/martisClock/' + app.globalData.user.userID, //真实的接口地址
			//url: 'http://localhost:3000/message/admin' , //真实的接口地址
			data: {},
			header: { 'Content-Type': 'application/x-www-form-urlencoded' },
			success: function (res) {
				//console.log(res);
				if (res.data == 'No Session') {
					wx.navigateTo({
						url: '/pages/welcome/home/home',
					})
				}
				else {
					console.log(res.data);
					

				}
			},
			fail: function (err) {
				console.log(err)
			}
		})
	},
  methods: {
    //给点击的日期设置一个背景颜色
    // dayClick: function (event) {
    //   let clickDay = event.detail.day;
    //   let changeDay = `dayStyle[1].day`;
    //   let changeBg = `dayStyle[1].background`;
    //   this.setData({
    //     [changeDay]: clickDay,
    //     [changeBg]: "#84e7d0"
    //   })
    // },
  }
})