// pages/basics/appoints/appoint.js
//获取应用实例
const app = getApp();
Page({
  data: {
    date: '2019-01-01',
    date2: '2020-01-01',
    martisClock: "",
    department: "",
    userName: "",
    scrollLeft: 0,
    People:[],
    targetPeople:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userData = app.globalData.user;
    console.log(userData.department);
    this.setData({
      department: userData.department,
      userName: userData.userName
    })
    console.log(this.data.userName);
    //获取用户列表
    var that = this
    wx.request({
      url: app.globalData.BaseURL + 'getUsers', //真实的接口地址
      data: {},
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        if (res.data == 'No Session') {
          wx.navigateTo({
            url: '/pages/welcome/home/home',
          })
        }
        else {
          let dataList = res.data; //获取到的数据
          dataList.forEach((item) => {
            item.createdAt = item.createdAt.substring(0, 10); 
          })
          that.setData({
            People: dataList //设置数据
          })
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
  },
  showModal(e) {
    console.log(e.currentTarget.dataset.target);
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  checkboxChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      targetPeople:e.detail.value
    })
  },
  formBindSubmit(e){
    //首先进行数据验证
    var formData = e.detail.value;
    if (formData.martisClockContext==""){
      wx.showToast({
        title: '请输入工作内容',
        icon: 'none',
        duration: 2000
      })
      return;
    }else if(this.data.targetPeople.length==0){
      wx.showToast({
        title: '请选择责任人',
        icon: 'none',
        duration: 2000
      })
      return;
    }else{
      var that = this;
      setTimeout(function () {
        wx.request({
          method: 'POST',
          url: app.globalData.BaseURL + 'api/martisClock/appoint', //接口地址
          data: {
            detail: e.detail.value,
            users: that.data.targetPeople
          },
          header: { 'content-type': 'application/json' },
          success: function (res) {
            console.log(res);
            if (res.statusCode == 200) {
              wx.showToast({
                title: res.data.code,
                icon: 'success',
                duration: 2000
              })
              setTimeout(function () {
                wx.navigateTo({
                  url: '/pages/index/index',
                })
              }, 2000)
            }
            else {
              wx.showToast({
                title: '失败，请注意输入格式！',
                icon: 'none',
                duration: 2000
              })
            }
          },
          fail: function (res) {
            console.log('Error' + ':' + res)
          }
        })
      }, 1000);
    }
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})