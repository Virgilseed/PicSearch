//results.js
//获取应用实例
var app = getApp()
Page({
  data: {
    pictrueList: [],
    offset: 0,
    pageNumber: 30,
    currentPage: 0
  },
  onLoad: function (word) {
      console.log(word)
      var that = this
      //调用应用实例的方法获取全局数据
      app.getUserInfo(function(userInfo){
        //更新数据
        that.setData({
          userInfo:userInfo
        })
      }),
      this.searchPicture(word.word, false);
  },
  //搜索确认事件
  bindViewSearchTap: function(e){
      console.log(e.detail.value);
      this.searchPicture(e.detail.value, false);
  },
  bindViewClickImageTap: function(e){
      console.log(e)
  },


   //查找图片
  searchPicture: function(word, isLoadMore){
    var page = this;
    console.log(word);
    wx.request({
      url: 'https://image.baidu.com/search/acjson?tn=resultjson_com&ipn=rj&ct=201326592&is=&fp=result&queryWord=%E6%88%91&cl=2&lm=-1&ie=utf-8&oe=utf-8&adpicid=&st=-1&z=&ic=0&word=' + word + '&s=&se=&tab=&width=&height=&face=0&istype=2&qc=&nc=1&fr=&pn=' + page.offset + '&rn=30&gsm=1fe&1490947450218=',
      
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res);
        page.parseJsonData(res);
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  },
  parseJsonData: function(data, isLoadMore){
    if(!isLoadMore){
      this.setData({
            pictrueList: []
        })
    }
    if(data.statusCode == 200){
      if(data.data != null && data.data.data.length > 0)
      {
        console.log(data.data.data);
        var list = data.data.data;
        console.log(list.length);
        list.splice(list.length - 1, 1);
        console.log(list.length);
        this.setData({
            //待完成
            pictrueList: data.data.data
        })
      }
    }
  }
})

