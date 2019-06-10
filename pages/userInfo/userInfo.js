// pages/userInfo/userInfo.js
const app = getApp()
const server = require('../../services/server.js')
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    hasUserInfo: false,
    nav_a: [{
      id: 1,
      name: "我创建的任务",
      url: "/pages/AddedItems/AddedItems",
      src: "added_item"
    }, {
      id: 2,
      name: "我参与过的任务",
      url: "/pages/ParticipateTask/ParticipateTask",
      src: "participate"
    }, {
      id: 3,
      name: "我收藏的任务",
      url: "/pages/CollectList/CollectList",
      src: "user_collect"
    }],

    nav_b: [{
      id: 4,
      name: "个人信息设置",
      url: "infoSettings",
      src: "user"
    }],
    // ----用于修改信息---------
    isEditInfo: false,
    avatar: "",
    bio: "",
    school: "",
    email: "",
    gender: "",
    location: "",
    nickname: "",
    phone: "",
    gender_items: [
      { val: 'man', name: '男' },
      { val: 'woman', name: "女" },
      { val: 'other', name: "保密" },
    ],
    file: {}
    //----------------------
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    app.editTabbar()
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: app.globalData.hasUserInfo
    })
    this.setFormData()
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

  },

  setFormData: function () {
    this.setData({
      avatar: app.globalData.userInfo.info.avatar,
      bio: app.globalData.userInfo.info.bio,
      email: app.globalData.userInfo.info.email,
      gender: app.globalData.userInfo.info.gender,
      school: app.globalData.userInfo.info.school,
      location: app.globalData.userInfo.info.location,
      nickname: app.globalData.userInfo.info.nickname,
      phone: app.globalData.userInfo.info.phone,
    })

  },

  setUserInfo: async function (e) {
    try {
      await server.request('PUT', 'users/info', {
        nickname: e.detail.userInfo.nickName,
        avatarUrl: e.detail.userInfo.avatarUrl,
        location: e.detail.userInfo.country
      })
      const userInfo = await app.getUserInfo()
      this.setData({
        userInfo: userInfo,
        hasUserInfo: true,
      })
    } catch (err) {
      console.log(err)
    }
  },

  closeEditPage: function (e) {
    if (this.data.isEditInfo) {
      this.setData({ isEditInfo: false });
    }
  },
  changeNickname: function (e) {
    this.setData({ nickname: e.detail.value });
    console.log("nickname:" + this.data.nickname);
  },

  changeGender: function (e) {
    this.data.gender = e.detail.value;
    if (e.detail.value == "不便透露") this.data.gender = "未知";
    console.log("gender:" + this.data.gender);
  },

  changeBio: function (e) {
    this.setData({ bio: e.detail.value });
    console.log("bio:" + this.data.bio);
  },
  changeSchool: function (e) {
    this.setData({ school: e.detail.value });
    console.log("school:" + this.data.school);
  },
  changeEmail: function (e) {
    this.setData({ email: e.detail.value });
    console.log("email:" + this.data.email);
  },
  changePhone: function (e) {
    this.setData({ phone: e.detail.value });
    console.log("phone:" + this.data.phone);
  },
  changeLocation: function (e) {
    this.setData({ location: e.detail.value });
    console.log("location:" + this.data.location);
  },
  showToast: function (str, src) {
    if (src == "") {
      wx.showToast({
        title: str,
        icon: 'success',//图标，支持"success"、"loading" 
        //image: src,//自定义图标的本地路径，image 的优先级高于 icon
        duration: 2000,//提示的延迟时间，单位毫秒，默认：1500 
        mask: false,//是否显示透明蒙层，防止触摸穿透，默认：false 
        success: function () { },
        fail: function () { },
        complete: function () { }
      });
    } else {
      wx.showToast({
        title: str,
        //icon: 'loading',//图标，支持"success"、"loading" 
        image: src,//自定义图标的本地路径，image 的优先级高于 icon
        duration: 2000,//提示的延迟时间，单位毫秒，默认：1500 
        mask: false,//是否显示透明蒙层，防止触摸穿透，默认：false 
        success: function () { },
        fail: function () { },
        complete: function () { }
      });
    }
  },
  submit: async function (e) {
    // 合法性判断
    if (!/[^\s]+/.test(this.data.nickname)) {
      this.showToast("昵称为空", '/images/icons/error.png');
      return;
    }
    if (!/[^\s]+/.test(this.data.gender)) {
      this.showToast("性别为空", '/images/icons/error.png');
      return;
    }
    if (!/[^\s]+/.test(this.data.email)) {
      this.showToast("邮箱为空", '/images/icons/error.png');
      return;
    }
    if (!/[^\s]+/.test(this.data.phone)) {
      this.showToast("手机为空", '/images/icons/error.png');
      return;
    }
    if (!/[^\s]+/.test(this.data.school)) {
      this.showToast("学校为空", '/images/icons/error.png');
      return;
    }

    if (!/[^\s]+/.test(this.data.location)) {
      this.showToast("地址为空", '/images/icons/error.png');
      return;
    }
    // 验证合法性
    var isemail = /^\w+([-\.]\w+)*@\w+([\.-]\w+)*\.\w{2,4}$/;
    if (!isemail.test(this.data.email)) {
      this.showToast("邮箱格式错误", '/images/icons/error.png');
      return;
    }

    var isPhone = /^1[3456789]\d{9}$/;
    if (!isPhone.test(this.data.phone)) {
      this.showToast("手机格式错误", '/images/icons/error.png');
      return;
    }
    file = {
      "bio": this.data.bio,
      "school": this.data.school,
      "email": this.data.email,
      "gender": this.data.gender,
      "location": this.data.location,
      "nickname": this.data.nickname,
      "phone": this.data.phone,
    };

    try {
      await server.request('PUT', 'users/info', file)
      const userInfo = await app.getUserInfo()
      this.showToast("修改成功", "");
      this.setData({
        userInfo: userInfo,
        hasUserInfo: true,
        isEditInfo: false 
      })
      this.setFormData()
    } catch (err) {
      console.log(err)
    }
  },


  // 跳转
  navigate: function (e) {
    console.log(e);
    if (e.currentTarget.dataset.item == "4") {
      this.setData({ isEditInfo: true });
    } else{
      console.log(this.data.nav_a[e.currentTarget.dataset.item - 1]);
      wx.navigateTo({
        url: this.data.nav_a[e.currentTarget.dataset.item - 1].url,
      })
    }
  }
})