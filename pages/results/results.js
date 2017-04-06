//results.js
//获取应用实例
var app = getApp()
Page({
  data: {
    pictrueList: [],
    offset: 0,
    pageNumber: 30,
    currentPage: 0,
    loadText: "正在加载...",
    searchText: '微信表情'
  },
  onLoad: function (word) {
      console.log(word)
      var that = this
      //调用应用实例的方法获取全局数据
      app.getUserInfo(function(userInfo){
        //更新数据
        that.setData({
          userInfo:userInfo,
          searchText: word.word
        })
      }),
      this.searchPicture(word.word, false, 0);
  },
  //搜索确认事件
  bindViewSearchTap: function(e){
      console.log(e.detail.value);
      this.searchPicture(e.detail.value, false, 0);
  },
  //图片点击事件
  bindViewClickImageTap: function(e){
      console.log(e.target.dataset.url)

      wx.previewImage({
        urls: [e.target.dataset.url]
      })
  },
  
  bindImageLongTap: function(e){
    console.log(e.target.dataset.url)
    wx.showActionSheet({
        itemList: ['保存到手机', '预览', '取消'],
        success: function(res) {
          console.log(res.tapIndex)
          if(res.tapIndex == 0){
            wx.getImageInfo({
              src: 'e.target.dataset.url',
              success: function (res) {
                console.log("测试");
                console.log(res.path)
              },
              fail: function (res){
                console.log(res)
              }
            })
            // wx.downloadFile({
            //   url: 'e.target.dataset.url', //仅为示例，并非真实的资源
            //   success: function(res) {
            //     wx.saveFile({
            //       tempFilePath: res.tempFilePath,
            //       success: function(res){
            //         // success
            //         wx.showToast({
            //           title: '成功',
            //           icon: 'success',
            //           duration: 2000
            //         })
            //       },
            //       fail: function(res) {
            //         // fail
            //         wx.showToast({
            //           title: '保存失败，请检查网络',
            //           icon: 'success',
            //           duration: 2000
            //         })
            //       }
            //     })
            //   }
            // })
          }else if(res.tapIndex == 1){
            wx.previewImage({
              urls: [e.target.dataset.url]
            })
          }else{
            
          }
        },
        fail: function(res) {
          console.log(res.errMsg)
        }
      })
  },

  loadMore: function(e){
      console.log(this.data.offset) ;   
    this.searchPicture(e.detail.value, true, this.data.offset + 30);
    console.log(e)
  },

  savePicture: function(){
    wx.saveFile({
      tempFilePath: 'String',
      success: function(res){
        // success
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  },


   //查找图片
  searchPicture: function(word, isLoadMore, offset){
    var page = this;
    console.log(word);
    wx.request({
      url: 'https://image.baidu.com/search/acjson?tn=resultjson_com&ipn=rj&ct=201326592&is=&fp=result&queryWord=%E6%88%91&cl=2&lm=-1&ie=utf-8&oe=utf-8&adpicid=&st=-1&z=&ic=0&word=' + word + '&s=&se=&tab=&width=&height=&face=0&istype=2&qc=&nc=1&fr=&pn=' + offset + '&rn=30&gsm=1fe&1490947450218=',
      
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res);
        page.parseJsonData(res, isLoadMore);
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
        console.log("clear");
      this.setData({
            pictrueList: []
        })
    }
    if(data.statusCode == 200){
      if(data.data != null && data.data.data.length > 0)
      {
        var offs = this.data.offset;
        var list = data.data.data;
        console.log(list.length);
        list.splice(list.length - 1, 1);
        var datas = this.data.pictrueList;
        datas = datas.concat(list);
        console.log(datas);
        this.setData({
            //待完成
            pictrueList: datas,
            offset: offs + list.length
        })
      }
    }
  }
})

