//index.js
//获取应用实例
const app = getApp()
const server = require('../../services/server.js')
const util = require('../../utils/util.js')

Page({
  data: {
    userInfo: {},
    tabbar: {},
    hasUserInfo: false,
    currentTab: 0,
    list_a: [],
    list_b: [],
    Loading: false,
   // canIUse: wx.canIUse('button.open-type.getUserInfo')
    top_images:[
    { index: 0, url: "/images/touxiang.jpg"} ,
    { index: 1, url: '/images/index_sample.jpg' },
    { index: 2, url: '/images/index_sample.jpg' },
   ],
   top_iamges_size: 3,
   //-------------------用于显示内容-----------------------------
    testList: {
      "pagination": {
        "page": 1,
        "size": 3,
        "total": 10
      },
      "data": [
        {
          "id": "5c9ecbbba4a13f52e3195fa68",
          "publisher": {
            "id": "5c9ecbbba4a3f52e3195fa68",
            "nickname": "tp",
            "avatar": "/images/icons/user.png"
          },
          "title": "帮我洗帮我洗帮我洗帮我洗帮我洗帮我洗帮洗帮我洗帮我洗帮我洗帮我洗帮我洗帮我洗澡",
          "content": "过来至二634洗澡澡",
          "location": [
            "中山大学"
          ],
          "tags": [
            "打游戏"
          ],
          "top_time": 1244123123,
          "status": "wait",
          "type": "run",
          "attachment": [
            {
              "id": "/images/icons/user.png",
              "type": "image",
              "name": "秀秀照片",
              "description": "洗澡",
              "size": 147872,
              "time": 123214124,
              "public": false
            }
          ],
          "reward": "money",
          "reward_value": 100,
          "reward_object": "一个吻",
          "publish_date": 112312341243,
          "start_date": 121414124,
          "end_date": 121414124,
          "player_count": 12,
          "max_player": 30,
          "max_finish": 30,
          "auto_accept": true,
          "comment_count": 30,
          "view_count": 30,
          "collect_count": 30,
          "like_count": 30,
          "like": false
        },
        {
          "id": "5c9ecbbba24a3f52e3195fa68",
          "publisher": {
            "id": "5c9ecbbba4a3f52e3195fa68",
            "nickname": "vtp",
            "avatar": "/images/icons/user.png"
          },
          "title": "帮我洗帮我洗澡",
          "content": "过来至二634洗澡澡",
          "location": [
            "中山大学"
          ],
          "tags": [
            "打游戏"
          ],
          "top_time": 1244123123,
          "status": "wait",
          "type": "run",
          "attachment": [
            {
              "id": "/images/icons/user.png",
              "type": "image",
              "name": "秀秀照片",
              "description": "洗澡",
              "size": 147872,
              "time": 123214124,
              "public": false
            }
          ],
          "reward": "rmb",
          "reward_value": 100,
          "reward_object": "一个吻",
          "publish_date": 112312341243,
          "start_date": 121414124,
          "end_date": 121414124,
          "player_count": 12,
          "max_player": 30,
          "max_finish": 30,
          "auto_accept": true,
          "comment_count": 30,
          "view_count": 30,
          "collect_count": 30,
          "like_count": 30,
          "like": false
        },
        {
          "id": "5c9ecbbba4a3f52e3195fa68",
          "publisher": {
            "id": "5c9ecbbba4a3f52e3195fa68",
            "nickname": "tp",
            "avatar": "/images/icons/user.png"
          },
          "title": "帮我洗帮我洗帮我洗帮我洗帮我洗澡",
          "content": "过来至二634洗澡澡",
          "location": [
            "中山大学"
          ],
          "tags": [
            "打游戏"
          ],
          "top_time": 1244123123,
          "status": "wait",
          "type": "run",
          "attachment": [
            {
              "id": "/images/icons/user.png",
              "type": "image",
              "name": "秀秀照片",
              "description": "洗澡",
              "size": 147872,
              "time": 123214124,
              "public": false
            }
          ],
          "reward": "object",
          "reward_value": 100,
          "reward_object": "一个吻",
          "publish_date": 112312341243,
          "start_date": 121414124,
          "end_date": 121414124,
          "player_count": 12,
          "max_player": 30,
          "max_finish": 30,
          "auto_accept": true,
          "comment_count": 30,
          "view_count": 30,
          "collect_count": 30,
          "like_count": 30,
          "like": false
        }
      ]
    },
    show_list_left: [],
    show_list_right: [],
    isLoading: false,
    noMore:false,
  },
  onLoad: async function () {
    app.editTabbar();

    // 获取列表

    let res = await server.request('GET', 'tasks', {
      page: 1,
      size: 10
    })

    let isLeft = true

    for (let task of res.data.tasks) {
      if (isLeft) {
        this.data.show_list_left.push(task)
      } else {
        this.data.show_list_right.push(task)
      }
      isLeft = !isLeft
    }
    if (res.data.pagination.total <= 10) {
      this.setData({noMore: true})
    }

    this.setData({
      show_list_left: this.data.show_list_left,
      show_list_right: this.data.show_list_right  
    });
  },
  
  getTaskList: async function () {
    
  },
  // onReady: function () {
  //   var that = this;
  //   wx.getSystemInfo({
  //     success: function (res) {
  //       that.setData({
  //         winWidth: res.windowWidth,
  //         winHeight: res.windowHeight
  //       });
  //     }
  //   });
  // },
  // 点击搜索栏跳转
  navigateToResult: function(e){
    wx.navigateTo({
      url: '/pages/SearchResult/SearchResult',
    })
  },
  // 滑动切换tab
  bindChange: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  // 点击tab切换
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
 
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // }
  onReachBottom(){
    // TODO: 刷新内容
    if (this.data.noMore === false) {
      this.setData({ isLoading: true });
    }
  },
  navigateToDetail: function(e){
    //console.log(e.currentTarget.dataset.item);
    wx.navigateTo({
      url: '/pages/Detail/Detail?id=' + e.currentTarget.dataset.item,
    });
  }
})
