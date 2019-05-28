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
		year: 0,
		month: 0,
		date: ['日', '一', '二', '三', '四', '五', '六'],
		dateArr: [],
		isToday: 0,
		isTodayWeek: false,
		todayIndex: 0
  },
	created(){
		let now = new Date();
		let year = now.getFullYear();
		let month = now.getMonth() + 1;
		this.dateInit();
		this.setData({
			year: year,
			month: month,
			isToday: '' + year + month + now.getDate()
		})
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
		dateInit: function (setYear, setMonth) {
			//全部时间的月份都是按0~11基准，显示月份才+1
			let dateArr = [];                       //需要遍历的日历数组数据
			let arrLen = 0;                         //dateArr的数组长度
			let now = setYear ? new Date() : new Date();
			let year = setYear || now.getFullYear();
			let nextYear = 0;
			let month = setMonth || now.getMonth();                 //没有+1方便后面计算当月总天数
			let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
			let startWeek = new Date().getDay();                          //目标月1号对应的星期
			let dayNums = new Date().getDate();               //获取目标月有多少天
			let obj = {};
			let num = 0;
			if (month + 1 > 11) {
				nextYear = year + 1;
				dayNums = new Date().getDate();
			}
			arrLen = startWeek + dayNums;
			for (let i = 0; i < arrLen; i++) {
				if (i >= startWeek) {
					num = i - startWeek + 1;
					obj = {
						isToday: '' + year + (month + 1) + num,
						dateNum: num,
						weight: 5
					}
				} else {
					obj = {};
				}
				dateArr[i] = obj;
			}
			this.setData({
				dateArr: dateArr
			})
			let nowDate = new Date();
			let nowYear = nowDate.getFullYear();
			let nowMonth = nowDate.getMonth() + 1;
			let nowWeek = nowDate.getDay();
			let getYear = setYear || nowYear;
			let getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth;
			if (nowYear == getYear && nowMonth == getMonth) {
				this.setData({
					isTodayWeek: true,
					todayIndex: nowWeek
				})
			} else {
				this.setData({
					isTodayWeek: false,
					todayIndex: -1
				})
			}
		},
		/**
		 * 上月切换
		 */
		lastMonth: function () {
			//全部时间的月份都是按0~11基准，显示月份才+1
			let year = this.data.month - 2 < 0 ? this.data.year - 1 : this.data.year;
			let month = this.data.month - 2 < 0 ? 11 : this.data.month - 2;
			this.setData({
				year: year,
				month: (month + 1)
			})
			this.dateInit(year, month);
		},
		/**
		 * 下月切换
		 */
		nextMonth: function () {
			//全部时间的月份都是按0~11基准，显示月份才+1
			let year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
			let month = this.data.month > 11 ? 0 : this.data.month;
			this.setData({
				year: year,
				month: (month + 1)
			})
			this.dateInit(year, month);
		}
  },
})