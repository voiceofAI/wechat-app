// pages/share_video/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        video_list: [
            'cloud://ai-voice-neg5t.6169-ai-voice-neg5t/video_example/1.mp4',
            'cloud://ai-voice-neg5t.6169-ai-voice-neg5t/video_example/2.mp4',
            'cloud://ai-voice-neg5t.6169-ai-voice-neg5t/video_example/3.mp4',
            'cloud://ai-voice-neg5t.6169-ai-voice-neg5t/video_example/4.mp4',
            'cloud://ai-voice-neg5t.6169-ai-voice-neg5t/video_example/5.mp4',
        ],
        share_video_index: 0,

    },

    set_data() {
        this.setData({
            share_video_index: getApp().globalData.share_video_index
        })
        console.log('share_video_index:', this.data.share_video_index);
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.set_data()

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