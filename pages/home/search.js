// pages/home/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    like:[
      "人物",
      "哥哥",
      "金毛",
      "猫",
      "狗",
      "植物",
      "风景",
      "花",
      "汽车",
      "摩托车",
      "自行车",
      "手推车"
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  query(e){
    let q = e.detail.value.q;
    wx.navigateTo({
      url: '/pages/home/list?q=' + q,
    })
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