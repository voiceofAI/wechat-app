// pages/video/index.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        checks_id: 0,
        video_path: getApp().globalData.res_url,
        // Navigation
        cloud_url: '',
        video_gen_tables: [
            { name: '原声静音', icon_url_on: '../../image/volumex_on.png', icon_url_off: '../../image/volumex_off.png' },
            { name: '原声增强', icon_url_on: '../../image/volume+_on.png', icon_url_off: '../../image/volume+_off.png' },
            { name: '原声减弱', icon_url_on: '../../image/volume-_on.png', icon_url_off: '../../image/volume-_off.png' },
        ],
        checks_id: 0,
    },

    globalData: { //全局变量
        voiceList: [],
    },

    data_set() {
        let cloud_url = getApp().globalData.cloud_url
        this.setData({
            cloud_url: cloud_url,
            video_path: getApp().globalData.cloud_url_s + '/' + getApp().globalData.res_url
        })
    },


    generate_video: function() {
        this.showLoading()
        let retention = 0
        if (this.data.checks_id == 0) {
            retention = 0
        } else if (this.data.checks_id == 1) {
            retention = 0.75
        } else if (this.data.checks_id == 2) {
            retention = 0.35
        }
        this.to_request(retention)
    },

    clicks: function(e) {
        let index = e.currentTarget.dataset.index;

        this.setData({
            checks_id: index
        })
        console.log(index)
    },

    to_request(retention) {
        let that = this
        let cloud_url = getApp().globalData.cloud_url
        console.log('retention:', retention)
        wx.request({
            url: cloud_url + '/wav2mp4', //仅为示例，并非真实的接口地址
            data: {
                test: JSON.stringify("lalalalalal"),
                retention: JSON.stringify(retention),
                mp3_url: JSON.stringify(getApp().globalData.mp3_url),
                video_url: JSON.stringify(getApp().globalData.video_url),
                user_id: JSON.stringify("101")
            },
            method: 'POST',
            header: {
                'content-type': 'application/json', // 默认值
                'chartset': 'utf-8'
            },
            success(res) {
                console.log('success POST')
                console.log(res)
                getApp().globalData.res_url = res.data.res_url
                getApp().globalData.error_message = res.data.error_message
                that.jump_index()
            }
        })
    },

    jump_index() {
        app.showloadingMask({
            showloadingMask: 'false' //隐藏
        })
        wx.navigateTo({
            url: '../share/index'
        })
    },

    showLoading() {
        app.showloadingMask({
            showloadingMask: 'true',
            showloadingTitle: '努力合成中...',
            pathImg_xsw: '../../image/loading_one.gif',
            // duration: 1000, //自动关闭
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.data_set()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})