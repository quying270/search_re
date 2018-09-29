// pages/home/list.js

const ults = require("../../ults/ults.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    word: "猫", //搜索的内容
    page: 1, //加载第几页
    row: 30, //每页加载的条目
    list: 3, //按多少列显示
    org: [], //图片的原始数据
    //存放图片的img对象
    imgs: [],
    //存放图片高度的对象
    height: []
  },
  //生成数据容器
  creatcontainer(){
    this.data.height = new Array(this.data.list).fill(0);
    this.data.imgs = new Array(this.data.list).fill(0).map(()=>[]);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.creatcontainer();
    this.data.word = options.q || this.data.word;
    this.showPage();
    //显示标题
    wx.setNavigationBarTitle({ title: this.data.word });
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
    //保存原始数据
    this.data.org.push(...data);
    //便利分配
    data.forEach((img)=>{
      //从数组中找到最小数的索引
      let min = Math.min(...this.data.height);
      //根据最小索引找到图片数组push添加图片
      let index = this.data.height.findIndex(item => min === item);
      this.data.imgs[index].push(img);
      //更新高度数组
      this.data.height[index] += img.height;
    })
    console.log(this.data);
    //数据更新
    this.setData({
      imgs: this.data.imgs
    });
    //关闭加载动画
    wx.hideNavigationBarLoading();
  },
  //查询数据
  query(){
    //显示加载动画
    wx.showNavigationBarLoading();
    let queryUrl = ults.imgQueryUrl(this.data.word, this.data.page, this.data.row);
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
          obj: ults.imgUrlEncode(img.objURL) //大图
        }, ults.zoom(img)));
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
    let src2 = e.currentTarget.dataset.src2;
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
      },
      fail(res){
        wx.downloadFile({
          url: src2,
          success(res) {
            if (res.statusCode === 200) {
              console.log(res.tempFilePath);
              wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success(res) {
                  console.log(res);
                }
              });
            }
          }
        });
      }
    })
  },
  //点击显示图片
  showImage(e){
    let src = e.currentTarget.dataset.src;
    let urls = this.data.org.map(item=>item.middle);
    console.log(urls);
    wx.previewImage({
      current: src,
      urls: urls
    });
  }
})