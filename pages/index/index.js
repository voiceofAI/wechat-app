const app = getApp();
var innerAudioContext = wx.createInnerAudioContext();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        sourceType: [],
        maxDuration: 0,
        camera: '',
        video_path: 'lalalalal',
        // loding
        tips: '请稍后',
        show: true,
        animated: true,
        cloud_url: 'https://jupyter-uaitrain-bj2.ucloud.cn:443/infer-530f71ca-635b-4041-aca5-af5861f25ce7',
        cloud_url_s: 'https://jupyter-uaitrain-bj2.ucloud.cn:443//infer-530f71ca-635b-4041-aca5-af5861f25ce7',
        showLoading_title: '上传中',

        musicList: [
            { img_url: 'https://jupyter-uaitrain-bj2.ucloud.cn:443//infer-530f71ca-635b-4041-aca5-af5861f25ce7/static/img/1.png', musci_url: 'cloud://ai-voice-neg5t.6169-ai-voice-neg5t/music_example/21.mp3', info1: '赵秋秋', info2: '游乐场', isPlayAudio: false, audioTime: 0 },
            { img_url: 'https://jupyter-uaitrain-bj2.ucloud.cn:443//infer-530f71ca-635b-4041-aca5-af5861f25ce7/static/img/2.png', musci_url: 'cloud://ai-voice-neg5t.6169-ai-voice-neg5t/music_example/2.mp3', info1: '赵公子', info2: '天空', isPlayAudio: false, audioTime: 0 },
            { img_url: 'https://jupyter-uaitrain-bj2.ucloud.cn:443//infer-530f71ca-635b-4041-aca5-af5861f25ce7/static/img/3.png', musci_url: 'cloud://ai-voice-neg5t.6169-ai-voice-neg5t/music_example/3.mp3', info1: '林俊杰', info2: '美食', isPlayAudio: false, audioTime: 0 },
            { img_url: 'https://jupyter-uaitrain-bj2.ucloud.cn:443//infer-530f71ca-635b-4041-aca5-af5861f25ce7/static/img/4.png', musci_url: 'cloud://ai-voice-neg5t.6169-ai-voice-neg5t/music_example/4.mp3', info1: '周冬雨', info2: '宠物', isPlayAudio: false, audioTime: 0 },
            { img_url: 'https://jupyter-uaitrain-bj2.ucloud.cn:443//infer-530f71ca-635b-4041-aca5-af5861f25ce7/static/img/5.png', musci_url: 'cloud://ai-voice-neg5t.6169-ai-voice-neg5t/music_example/5.mp3', info1: '张子枫', info2: '沙滩', isPlayAudio: false, audioTime: 0 }
        ],
        preIndex: -1,
        setInter: 0,
        dialogShow: false,
        buttons: [{ text: '取消' }, { text: '确定' }],
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        signature: '',
    },

    globalData: { //全局变量
        video_path: '',
        style_label: [],
        cloud_url: 'https://jupyter-uaitrain-bj2.ucloud.cn:443/infer-530f71ca-635b-4041-aca5-af5861f25ce7',
        cloud_url_s: 'https://jupyter-uaitrain-bj2.ucloud.cn:443//infer-530f71ca-635b-4041-aca5-af5861f25ce7',
        video_url: '',
        selected: 0,
        res_url: '',
        share_video_index: 0
    },


    uploadfile: function(res) {
        let that = this
        wx.cloud.uploadFile({
            cloudPath: 'video-data/' + that.data.signature + '/' + Date.parse(new Date()) + '.mp4',
            filePath: res.tempFilePath, // 文件路径
            env: 'ai-voice-neg5t',
            success: res => {
                // get resource ID
                console.log('fileID:', res.fileID)
                console.log('cloudPath:', res.statusCode);
                console.log('Date:', Date.parse(new Date()));

                Date.parse(new Date())
                app.globalData.video_path = res.fileID

                wx.cloud.getTempFileURL({
                    fileList: [res.fileID],
                    success: res => {
                        console.log("local_file:", res)
                        let video_url = res.fileList[0].tempFileURL
                        app.globalData.video_url = video_url
                        that.to_request(video_url)
                    }
                })
            },
            fail: err => {
                wx.hideLoading()
                console.log('fileID_error')
                app.showloadingMask({
                    showloadingMask: 'true',
                    showloadingTitle: '上传失败',
                    pathImg_xsw: '../../image/loading_one.gif',
                    duration: 2000, //自动关闭
                })
                console.errMsg
            },
            complete: err => {
                that.onShow()
            },
        })
    },

    showLoading() {
        app.showloadingMask({
            showloadingMask: 'true',
            showloadingTitle: '努力上传中...',
            pathImg_xsw: '../../image/loading_one.gif',
            // duration: 1000, //自动关闭
        })
    },

    cloud_init() {
        wx.cloud.init({
            env: 'ai-voice-neg5t',
            traceUser: true
        })
        console.log('cloud_init')
    },

    getVideo(e) {
        let that = this
        console.log('lalalala')
        this.getUserInfo(e)
        wx.chooseVideo({
            sourceType: ['album', 'camera'],
            maxDuration: 20,
            camera: 'back',
            compressed: false,
            success(res) {
                if (res.duration > 20) {
                    console.log('duration:', res.duration);
                    that.error_20s()
                } else {
                    that.showLoading()
                    that.setData({
                        video_path: res.tempFilePath,
                    })
                    that.uploadfile(res)
                }
            }
        })
    },

    getUserInfo: function(e) {
        console.log('e:', e)
        console.log('signature:', e.detail.signature);

        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true,
            signature: e.detail.signature
        })
        console.log('userInfo:', this.data.userInfo)
    },

    jump_index(style_label) {
        app.showloadingMask({
            showloadingMask: 'false' //隐藏
        })
        wx.navigateTo({
            url: '../video/index'
        })
    },

    jump_share_video(e) {
        app.globalData.share_video_index = e.currentTarget.dataset.index;
        wx.navigateTo({
            url: '../share_video/index'
        })
    },

    error_20s() {
        wx.showModal({
            title: '错误',
            content: '视频时长需小于20秒',
            success(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },

    to_request(video_url) {
        let that = this
        let cloud_url = this.data.cloud_url
        console.log('cloud_url', cloud_url)
        wx.request({
            url: cloud_url + '/video2label', //仅为示例，并非真实的接口地址
            data: {
                test: JSON.stringify("lalalalalal"),
                video_url: JSON.stringify(video_url),
                user_id: JSON.stringify("101")
            },
            method: 'POST',
            header: {
                'content-type': 'application/json', // 默认值
                'chartset': 'utf-8'
            },
            success(res) {
                console.log('success POST')
                console.log(res.data.style_label)
                app.globalData.style_label = res.data.style_label
                that.jump_index(res.data.style_label)
            }
        })
    },

    data_set() {
        app.globalData.cloud_url = this.data.cloud_url
        app.globalData.cloud_url_s = this.data.cloud_url_s
    },


    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    play: function(e) {
        var that = this;
        //获取下一个播放的音频index
        var index = Number(e.currentTarget.dataset.index)
            //正在播放的音频
        var preIndex = that.data.preIndex;
        if (index != preIndex) {
            console.log('index', index)
            console.log('preIndex', preIndex)
            clearInterval(that.data.setInter)
            that.setData({
                preIndex: index
            })
            this.data.musicList[index].isPlayAudio = true
            if (preIndex > -1) {
                this.data.musicList[preIndex].isPlayAudio = false
            }
            // setInterval(this.progress_bar(index), 100)

            that.data.setInter = setInterval(
                function(index) {
                    var duration = innerAudioContext.duration
                    var current = innerAudioContext.currentTime
                    var audioTime_str = 'musicList[' + index + '].audioTime'
                    that.setData({
                        [audioTime_str]: parseInt(100 * (current / duration))
                    })
                }, 1000, index);

            innerAudioContext.destroy();
            innerAudioContext = wx.createInnerAudioContext();
            innerAudioContext.src = this.data.musicList[index].musci_url;
            innerAudioContext.onCanplay(function() {
                innerAudioContext.play();
            })
        } else {
            this.data.musicList[index].isPlayAudio = true
            console.log('play')
            innerAudioContext.play();
        }
    },
    //暂停
    pause: function(index) {
        var that = this;
        innerAudioContext.pause();
        var preIndex_str = 'this.data.musicList[' + this.data.preIndex + '].isPlayAudio'
        that.setData({
            preIndex: index,
            [preIndex_str]: false
        })
    },

    play_music(e) {
        var index = e.currentTarget.dataset.index;

        console.log('index', index, this.data.musicList[index].isPlayAudio)
        if (this.data.musicList[index].isPlayAudio) {
            this.data.musicList[index].isPlayAudio = false
            this.pause(index)
        } else {
            this.data.musicList[index].isPlayAudio = true
            this.play(e)
        }
    },


    progress_bar(index) {
        var duration = innerAudioContext.duration
        var current = innerAudioContext.currentTime
        var audioTime_str = 'musicList[' + index + '].audioTime'
        this.setData({
            [audioTime_str]: parseInt(100 * (current / duration))
        })
    },

    music_select(e) {
        console.log('music_select', e.currentTarget.dataset.index)
        innerAudioContext.destroy();
        wx.navigateTo({
            url: '../video_gen/index'
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.cloud_init();
        this.data_set()
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
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
        this.getTabBar().setData({
            selected: 0
        })
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