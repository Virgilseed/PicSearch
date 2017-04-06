//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    pictureUrl: "",
    // ../../image/test.jpg
    userInfo: {},
    chooseIcon: "../../image/choose.png",
    tips: "上传照片搜索"
  },
  //事件处理函数
  bindViewTap: function() {
    var page = this;
    page.searchPicture("美女");
    // wx.chooseImage({
    //   count: 1, // 最多可以选择的图片张数，默认9
    //   sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
    //   sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
    //   success: function(res){
    //     // success
    //     page.setData({
    //       pictureUrl: res.tempFilePaths[0]
    //     }),
    //     page.uploadPicture(res.tempFilePaths[0]),
    //     console.log(res.tempFilePaths)
    //   },
    //   fail: function(res) {
    //     // fail
    //     console.log(res)
    //   },
    //   complete: function(res) {
    //     // complete
    //     console.log(res)
    //   }
    // })
  },

  uploadPicture: function(path){
    wx.showLoading();
    wx.uploadFile({
      url: "https://baidu.com",
      filePath: path,
      name:'pic',
      // header: {}, // 设置请求的 header
      // formData: {}, // HTTP 请求中其他额外的 form data
      success: function(res){
        // success
        wx.navigateTo({
              url: '../results/results'
            })
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
        wx.hideLoading();
      }
    })
  },
  

  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
