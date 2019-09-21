Component({
    data: {
        selected: 0,
        selected_url: [
            '/pages/index/index',
            '/pages/me/index'
        ],
        bool: [true, false]
    },
    // globalData: { //全局变量
    //     selected: 0
    // },
    attached() {},
    methods: {
        // switchTab(e) {
        //     var pages = getCurrentPages() //获取加载的页面
        //     var currentPage = pages[pages.length - 1] //获取当前页面的对象
        //     var url = currentPage.route

        //     let index = e.currentTarget.dataset.index
        //     console.log('e.index:', index)
        //     if (index == 0) {
        //         // wx.reLanch({
        //         //     url: '/pages/index/index'
        //         // })
        //         console.log(currentPage);

        //         this.jump_index('/pages/index/index')
        //             // console.log('globalData.index:', getApp().globalData.selected)
        //         getApp().globalData.selected = index
        //         this.setData({
        //             selected: index
        //         })
        //     } else {
        //         this.jump_index('/pages/me/index')
        //             // console.log('globalData.index:', getApp().globalData.selected)
        //         getApp().globalData.selected = index
        //         this.setData({
        //             selected: index
        //         })
        //     }
        // },

        switchTab(e) {
            const data = e.currentTarget.dataset
            const url = this.data.selected_url[data.index]
            const selected = data.index
            wx.switchTab({ url })
            this.setData({
                selected: selected
            })
            console.log('selected', this.data.selected);

        },

        jump_index(url) {
            wx.redirectTo({
                url: url
            })
        }
    },
})

// Component({
//     // pageLifetimes: {
//     //   show() {
//     //     if (typeof this.getTabBar === 'function' &&
//     //       this.getTabBar()) {
//     //       this.getTabBar().setData({
//     //         selected: 1
//     //       })
//     //     }
//     //   }
//     // }
// })