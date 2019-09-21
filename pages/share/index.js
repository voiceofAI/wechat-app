// pages/video/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        checks_id: 0,
        video_path: getApp().globalData.res_url,
        // Navigation
        cloud_url: '',
        checks_id: 0,
        save_success: false,
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

    viden_again() {
        // wx.navigateBack();
        console.log('Go to index');

        wx.switchTab({
            url: '../index/index'
        })
    },

    onShareAppMessage: function(res) {
        return {
            title: '自定义转发标题',
            path: '/pages/share/index?video_path=' + this.data.video_path
        }
    },

    download_video() {
        console.log('Download video...');
        console.log('video_path:', this.data.video_path);

        let that = this
        wx.downloadFile({
            url: that.data.video_path, //仅为示例，并非真实的资源
            success(res) {
                console.log('Download video sucess!');
                wx.saveVideoToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success(res) {
                        that.setData({
                            save_success: true
                        })
                        console.log('Save video sucess!');
                    }
                })
            }
        })
    },

    share_info() {
        wx.getShareInfo({
            shareTicket: app.globalData.shareTicket,
            success: function(res) {
                _this.upload_share_Result(res, type, uid);
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log('options:', options);
        this.data_set()
        this.download_video()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {},

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