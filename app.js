//app.js
App({
    onLaunch: function() {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
                success: res => {
                    // 发送 res.code 到后台换取 openId, sessionKey, unionId
                }
            })
            // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    },

    showloadingMask: function(obj) {
        var that = this
        if (obj) {
            var showloadingMask;
            var showloadingTitle = '';
            var pathImg_xsw = '/component/img/loading_one.gif';
            var path = '';
            var duration = null;
            if (obj.showloadingMask)
                showloadingMask = obj.showloadingMask
            if (obj.showloadingTitle)
                showloadingTitle = obj.showloadingTitle
            if (obj.success)
                var success = obj.success
            if (obj.path)
                path = obj.path
            if (obj.pathImg_xsw)
                pathImg_xsw = obj.pathImg_xsw
            if (obj.duration)
                duration = obj.duration
                // console.log(showloadingMask)
            var pages = getCurrentPages();
            if (path == '') {
                var thisPage = pages[pages.length - 1]
            } else {
                thisPage = path
            }
            if (thisPage) {
                thisPage.setData({
                    showloadingMask: showloadingMask,
                    showloadingTitle: showloadingTitle,
                    pathImg_xsw: pathImg_xsw
                })
                if (duration != null) {
                    setTimeout(function() {
                        thisPage.setData({
                            showloadingMask: 'false'
                        })
                        if (success) {
                            return success({ path: thisPage, showloadingMask: 'OK' })
                        }
                    }, duration)
                } else {
                    if (success) {
                        return success({ path: thisPage, showloadingMask: 'OK' })
                    }
                }
            }
        }
    },

    callback: function(res) {
        return successObj(res)
    },
    globalData: {
        userInfo: null
    }
})