// component/showloading.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        showloadingMask: { // 属性名
            type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
            value: 'false', // 属性初始值（可选），如果未指定则会根据类型选择一个
        },
        showloadingTitle: {
            type: String,
            value: '',
        },
        pathImg: {
            type: String,
            value: '/component/img/loading_one.gif'
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    ready: function() {
        // console.log(this.data.showloadingMask)
        var that = this
        var showloadingTitle = that.data.showloadingTitle
        var pathImg = that.data.pathImg
        if (pathImg == '') {
            pathImg = '/component/img/loading_one.gif'
        }
        if (showloadingTitle != '') {
            showloadingTitle = showloadingTitle.substring(0, 7)
        }
        that.setData({
            pathImg: pathImg,
            showloadingTitle: showloadingTitle
        })
    },
    methods: {
        showloading: function() {
            this.setData({
                mask: true
            })
        },
        hideloading: function() {
            this.setData({
                mask: false
            })
        },
    }
})