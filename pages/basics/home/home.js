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
  methods: {
    onLoad() {
      let that = this;
      // 获取用户信息
      wx.getSetting({
        success: res => {
          if (!res.authSetting['scope.userInfo']) {
            wx.redirectTo({
              url: '/pages/auth/auth'
            })
          }
        }
      })
    },
    onShareAppMessage() {
      return {
        title: 'ColorUI-高颜值的小程序UI组件库',
        imageUrl: 'https://image.weilanwl.com/color2.0/share2215.jpg',
        path: '/pages/basics/home/home'
      }
		},
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