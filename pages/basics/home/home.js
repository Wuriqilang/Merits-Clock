//获取应用实例
const app = getApp();

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
    }, ],
    dayStyle: [{
        month: 'current',
        day: '7',
        color: 'white',
        background: '#AAD4F5'
      },
      {
        month: 'current',
        day: new Date().getDate() + 1,
        color: 'white',
        background: '#030'
      }
    ],
		dataList:[]
  },
  //组件创建时，获取数据,获取当前数据
  created() {
    let that = this;
    // 获取消息信息
    wx.request({
      url: app.globalData.BaseURL + 'martisClock/' + app.globalData.user.userID,
        //真实的接口地址
      data: {},
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        //console.log(res);
        if (res.data == 'No Session') {
          wx.navigateTo({
            url: '/pages/welcome/home/home',
          })
        } else {
          var dayData = new Array()
          for (var i = 0; i < res.data.length; i++) {
            if (new Date(res.data[i].martisClockDate).getMonth() == new Date().getMonth()) {
              //将内容数据转换为对象
              dayData.push({
                month: 'current',
                day: new Date(res.data[i].martisClockDate).getDate(),
                color: 'white',
                background: '#030'
              })
            }
          }
          that.setData({
            dayStyle: dayData,
						dataList: res.data
          })

        }
      },
      fail: function(err) {
        console.log(err)
      }
    })
  },
  methods: {
     dayClick: function (event) {
			 wx.navigateTo({
				 url: '/pages/basics/detail/detail?dataObj=' + JSON.stringify(event.detail),
			 })
    //   let clickDay = event.detail.day;
    //   let changeDay = `dayStyle[1].day`;
    //   let changeBg = `dayStyle[1].background`;
    //   this.setData({
    //     [changeDay]: clickDay,
    //     [changeBg]: "#84e7d0"
    //   })
     },
		//前一个月
		prev: function (event) {
			var tempData = this.data.dataList;
			var dayData = new Array();
			for (var i = 0; i < tempData.length; i++) {
				if (new Date(tempData[i].martisClockDate).getMonth()+1 == event.detail.currentMonth && new Date(tempData[i].martisClockDate).getFullYear() == event.detail.currentYear) {
					//将内容数据转换为对象
					dayData.push({
						month: 'current',
						day: new Date(tempData[i].martisClockDate).getDate(),
						color: 'white',
						background: '#030'
					})
				}
			}
			this.setData({
				dayStyle: dayData
			})
		},
		//下一个月
		next: function (event) {
      var tempData = this.data.dataList;
			var dayData = new Array();
			for (var i = 0; i < tempData.length; i++) {
				if (new Date(tempData[i].martisClockDate).getMonth()+1 == event.detail.currentMonth && new Date(tempData[i].martisClockDate).getFullYear() == event.detail.currentYear) {
					//将内容数据转换为对象
					dayData.push({
						month: 'current',
						day: new Date(tempData[i].martisClockDate).getDate(),
						color: 'white',
						background: '#030'
					})
				}
			}
			this.setData({
				dayStyle: dayData
			})
		},
		//选择月份
		dateChange: function (event) {
			var tempData = this.data.dataList;
			var dayData = new Array();
			for (var i = 0; i < tempData.length; i++) {
				if (new Date(tempData[i].martisClockDate).getMonth()+1 == event.detail.currentMonth && new Date(tempData[i].martisClockDate).getFullYear() == event.detail.currentYear) {
					//将内容数据转换为对象
					dayData.push({
						month: 'current',
						day: new Date(tempData[i].martisClockDate).getDate(),
						color: 'white',
						background: '#030'
					})
				}
			}
			this.setData({
				dayStyle: dayData
			})
		}
  },
})