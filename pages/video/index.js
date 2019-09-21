// pages/video/index.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        video_gen_tables: [],
        checks_id: 0,
        video_path: getApp().globalData.video_path,
        // Navigation
        loading: false,
        color: '#000',
        background: '#fff',
        show: true,
        animated: false,
        style_label: getApp().globalData.style_label,
        cloud_url: '',
        cloud_url_s: '',
        str_dict_on: {
            'sg': '../../image/sg_on.png',
            'kl': '../../image/kl_on.png',
            'aj': '../../image/aj_on.png',
            'ja': '../../image/ja_on.png',
            'zy': '../../image/zy_on.png',
            'sn': '../../image/sn_on.png',
            'tm': '../../image/tm_on.png',
            'jm': '../../image/jm_on.png',
            'xx': '../../image/xx_on.png',
            'qt': '../../image/qt_on.png'
        },
        str_dict_off: {
            'sg': '../../image/sg_off.png',
            'kl': '../../image/kl_off.png',
            'aj': '../../image/aj_off.png',
            'ja': '../../image/ja_off.png',
            'zy': '../../image/zy_off.png',
            'sn': '../../image/sn_off.png',
            'tm': '../../image/tm_off.png',
            'jm': '../../image/jm_off.png',
            'xx': '../../image/xx_off.png',
            'qt': '../../image/qt_off.png'
        }
    },

    globalData: { //全局变量
        voiceList: [],
        checks_tables: ''
    },

    data_set() {
        let list = getApp().globalData.style_label
        console.log('test:', list)
        for (let index = 0; index < list.length; index++) {
            var map = {}
            map['value'] = list[index]
            list[index] = map
        }
        this.setData({
            video_gen_tables: list,
            video_path: app.globalData.video_path,
            cloud_url: app.globalData.cloud_url,
            cloud_url_s: app.globalData.cloud_url_s,
        })
        console.log('list:', list)
    },


    video_gen_checkboxs: function(e) {
        console.log(e.checked)
    },

    clicks: function(e) {
        let index = e.currentTarget.dataset.index;

        this.setData({
            checks_id: index
        })
        console.log(index)
    },

    generate_music() {
        this.showLoading()
        let checks_id = Number(this.data.checks_id)
        let checks_tables = this.data.video_gen_tables[checks_id].value
        app.globalData.checks_tables = checks_tables
        this.to_request(checks_tables)
    },

    to_request(checks_tables) {
        let that = this
        let cloud_url = this.data.cloud_url
        console.log('checks_tables:', checks_tables)
        console.log('cloud_url:', cloud_url)
        wx.request({
            url: cloud_url + '/label2mp3', //仅为示例，并非真实的接口地址
            data: {
                test: JSON.stringify("lalalalalal"),
                checks_tables: JSON.stringify(checks_tables),
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
                getApp().globalData.voiceList = res.data.voiceList
                that.jump_index()
            }
        })
    },

    showLoading() {
        app.showloadingMask({
            showloadingMask: 'true',
            showloadingTitle: '努力生成中...',
            pathImg_xsw: '../../image/loading_one.gif',
            // duration: 1000, //自动关闭
        })
    },

    jump_index() {
        app.showloadingMask({
            showloadingMask: 'false' //隐藏
        })
        wx.navigateTo({
            url: '../music/index'
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