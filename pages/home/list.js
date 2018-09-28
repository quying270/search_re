// pages/home/list.js

//&word=%E7%8C%AB&pn=60&rn=30
let url ="https://image.baidu.com/search/acjson?tn=resultjson_com&ipn=rj";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    word: "狗", //搜索的内容
    page: 1, //加载第几页
    row: 30, //每页加载的条目
    //存放图片的img对象
    imgs: {
      left: [],
      right: []
    },
    //存放图片高度的对象
    height: {
      left: 0,
      right: 0
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.word = options.q;
    this.showPage();
  },
  //请求页面数据
  showPage(){
    this.query().then((res) => {
      //console.log(res);
      //打包完成的数据
      let codeData = this.codeData(res.data.data);
      console.log(codeData);
      this.showData(codeData);
    });
  },
  //数据筛选
  showData(data){
    data.forEach((img)=>{
      if (this.data.height.left <= this.data.height.right){
        this.data.imgs.left.push(img);
        this.data.height.left += img.height;
      }else{
        this.data.imgs.right.push(img);
        this.data.height.right += img.height;
      }
    })
    //数据更新
    this.setData({
      imgs: this.data.imgs
    });
  },
  //查询数据
  query(){
    let queryUrl = this.codeUrl();
    return new Promise((resolve, reject)=>{
      wx.request({
        url: queryUrl,
        success: resolve,
        fail: reject
      })
    });
  },
  //数据打包
  codeData(data){
    //console.log(data);
    let codeData = []; //存放数据
    data.forEach((img)=>{ //遍历原始数组
      if(img.objURL){
        //console.log(this.zoom(img));
        codeData.push(Object.assign({
          thumb: img.thumbURL, //小图
          middle: img.middleURL, //中图
          obj: img.objURL //大图
        }, this.zoom(img)));
      }
    })
    return codeData;
  },
  //加载更多
  more(){
    console.log("加载更多");
    this.data.page++;
    this.showPage();
  },
  //下载图片
  download(e){
    let src = e.currentTarget.dataset.src;
    console.log(src);
    wx.downloadFile({
      url: src, 
      success(res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (res.statusCode === 200) {
          console.log(res.tempFilePath);
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success(res){
              console.log(res);
            }
          });
        }
      }
    })
  },
  showImage(e){
    let src = e.currentTarget.dataset.src;
    let urls = [...this.data.imgs.left, ...this.data.imgs.right].map(item=>item.middle);
    console.log(urls);
    wx.previewImage({
      current: src,
      urls: urls
    });
  },
  //宽高同比缩放
  zoom(img){
    let zoom = 100/img.width;
    return {
      width : img.width * zoom,
      height : img.height * zoom
    };
  },
  codeUrl: function () {
    let urlTmp = url + "&word=" + this.data.word
      + "&pn=" + (this.data.page * this.data.row - this.data.row)
      + "$rn=" + this.data.row;
    console.log(urlTmp);
    return urlTmp;
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})