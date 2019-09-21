const app = getApp()
var innerAudioContext = wx.createInnerAudioContext();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        voiceList: [{
            src: 'cloud://ai-voice-neg5t.6169-ai-voice-neg5t/1.mp3',
            name: '沙滩风格',
            isPlayAudio: false,
            audioTime: 0,
        }, {
            src: 'cloud://ai-voice-neg5t.6169-ai-voice-neg5t/2.mp3',
            name: '沙滩风格',
            isPlayAudio: false,
            audioTime: 0,
        }, {
            src: 'cloud://ai-voice-neg5t.6169-ai-voice-neg5t/3.mp3',
            name: '沙滩风格',
            isPlayAudio: false,
            audioTime: 0,
        }],

        name_list: [
            '歌曲1',
            '歌曲2',
            '歌曲3',
        ],
        preIndex: -1,
        setInter: 0,
        cloud_url: '',
        cloud_url_s: '',
    },

    globalData: { //全局变量
        video_url: '',
        mp3_url: ''
    },

    //播放
    play: function(e) {
        let cloud_url = getApp().globalData.cloud_url
        let cloud_url_s = getApp().globalData.cloud_url_s
        var that = this;
        //获取下一个播放的音频index
        var index = e.currentTarget.dataset.index;
        //正在播放的音频
        var preIndex = that.data.preIndex;
        if (index != preIndex) {
            console.log('index', index)
            console.log('preIndex', preIndex)
            clearInterval(that.data.setInter)
            var isPlayAudio_str = 'voiceList[' + index + '].isPlayAudio'
            that.setData({
                    preIndex: index,
                    [isPlayAudio_str]: true
                })
                // this.data.voiceList[index].isPlayAudio = true
            if (preIndex > -1) {
                var isPlayAudio_preIndex_str = 'voiceList[' + preIndex + '].isPlayAudio'
                that.setData({
                        [isPlayAudio_preIndex_str]: false
                    })
                    // this.data.voiceList[preIndex].isPlayAudio = false
            }
            // setInterval(this.progress_bar(index), 100)

            that.data.setInter = setInterval(
                function(index) {
                    var duration = innerAudioContext.duration
                    var current = innerAudioContext.currentTime
                    var audioTime_str = 'voiceList[' + index + '].audioTime'
                    that.setData({
                        [audioTime_str]: parseInt(100 * (current / duration)),
                    })
                }, 50, index);

            innerAudioContext.destroy();
            innerAudioContext = wx.createInnerAudioContext();
            innerAudioContext.src = cloud_url_s + '/' + this.data.voiceList[index].src;
            console.log('cloud_url_s', cloud_url_s);
            console.log('voiceList[index]', this.data.voiceList[index].src);
            console.log('voiceList', cloud_url_s + '/' + this.data.voiceList[index].src)
            innerAudioContext.onCanplay(function() {
                innerAudioContext.play();
            })
        } else {
            var isPlayAudio_str = 'voiceList[' + index + '].isPlayAudio'
            that.setData({
                    [isPlayAudio_str]: true
                })
                // this.data.voiceList[index].isPlayAudio = true
            console.log('play')
            innerAudioContext.play();
        }
    },
    //暂停
    pause: function(index) {
        var that = this;
        innerAudioContext.pause();
        that.setData({
            preIndex: index
        })
    },

    play_music(e) {
        var index = e.currentTarget.dataset.index;
        let that = this

        console.log('index', index, this.data.voiceList[index].isPlayAudio)
        if (this.data.voiceList[index].isPlayAudio) {
            var isPlayAudio_str = 'voiceList[' + index + '].isPlayAudio'
            that.setData({
                    [isPlayAudio_str]: false
                })
                // this.data.voiceList[index].isPlayAudio = false
            this.pause(index)
        } else {
            var isPlayAudio_str = 'voiceList[' + index + '].isPlayAudio'
            that.setData({
                    [isPlayAudio_str]: true
                })
                // this.data.voiceList[index].isPlayAudio = true
            this.play(e)
        }
    },


    progress_bar(index) {
        var duration = innerAudioContext.duration
        var current = innerAudioContext.currentTime
        var audioTime_str = 'voiceList[' + index + '].audioTime'
        that.setData({
            [audioTime_str]: parseInt(100 * (current / duration))
        })
    },

    music_select(e) {
        this.showLoading('努力合成中...')
        let index = e.currentTarget.dataset.index
        console.log('music_select', index)
        innerAudioContext.destroy();
        getApp().globalData.mp3_url = this.data.voiceList[index].src
        this.to_request(index)
    },

    to_request(index) {
        let that = this
        let cloud_url = getApp().globalData.cloud_url
        console.log('index :', index)
        wx.request({
            url: cloud_url + '/wav2mp4', //仅为示例，并非真实的接口地址
            data: {
                retention: JSON.stringify(0),
                mp3_url: JSON.stringify(that.data.voiceList[index].src),
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

    again_to_request(checks_tables) {
        let that = this
        let cloud_url = this.data.cloud_url
        console.log('checks_tables:', checks_tables)
        console.log('cloud_url:', cloud_url)
        wx.request({
            url: cloud_url + '/label2mp3', //仅为示例，并非真实的接口地址
            data: {
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
                that.setData({
                    voiceList: res.data.voiceList
                })
                console.log();

                app.showloadingMask({
                    showloadingMask: 'false' //隐藏
                })
            },
            fail(res) {
                app.showloadingMask({
                    showloadingMask: 'false' //隐藏
                })
                app.showloadingMask({
                    showloadingMask: 'true',
                    showloadingTitle: '生成失败了 =_= 请稍后再试',
                    pathImg_xsw: '../../image/loading_one.gif',
                    duration: 2000, //自动关闭
                })
            }
        })
    },

    music_again() {
        this.showLoading('努力生成中...')
        this.setData({
            preIndex: -1
        })
        wx.clearStorage()
        let checks_tables = app.globalData.checks_tables
        this.again_to_request(checks_tables)

    },

    showLoading(Title) {
        app.showloadingMask({
            showloadingMask: 'true',
            showloadingTitle: Title,
            pathImg_xsw: '../../image/loading_one.gif',
            // duration: 1000, //自动关闭
        })
    },

    jump_index() {
        app.showloadingMask({
            showloadingMask: 'false' //隐藏
        })
        wx.navigateTo({
            url: '../video_gen/index'
        })
    },

    data_set() {
        let voiceList = getApp().globalData.voiceList
        console.log('voiceList:', voiceList)
        this.setData({
            voiceList: voiceList,
            cloud_url: getApp().globalData.cloud_url,
            cloud_url_s: getApp().globalData.cloud_url_s,
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