//获取应用实例
const app = getApp();
//调用方法组
var query = require('../../../utils/query.js');

Component({
  options: {
    addGlobalClass: true,
  },
  data: {

  },
  //组件创建时，获取数据
  created(){
    let that = this;
    
  },

  methods: {
    onShareAppMessage() {
      return {
        title: 'ColorUI-高颜值的小程序UI组件库',
        imageUrl: 'https://image.weilanwl.com/color2.0/share2215.jpg',
        path: '/pages/basics/home/home'
      }
    },
  },
})
