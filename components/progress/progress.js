Component({
    properties: {
        bar: {
            // bar: {
            //   height: 30,
            //   color: ["#fecb24", "#ffff00"],
            //   value: 100,
            //   radius: 10,
            //   fill: "red"
            // }
            type: Object,
            observer: "_change"
        }
    },
    data: {
        begin: 0, //进度条起始值
        height: 0, //进度条高度
        from: "green", //默认颜色
        to: "green", //默认颜色
        interVal: null, //清除周期函数使用
        width: "", //进度百分比
        fill: "black", //精度条填充颜色
        radius: 0 //圆角边框值

    },
    detached() {
        //摧毁倒计时
        if (this.data.interVal !== null) clearInterval(this.data.interVal);
    },
    methods: {
        _change(bar, oldVal) {
            let from = "green";
            let to = "green";
            if (bar.color !== undefined) {
                if (bar.color.length == 2) {
                    from = bar.color[0];
                    to = bar.color[1];
                } else if (bar.color.length == 1) {
                    from = to = bar.color[0];
                }
            }
            let radius = 0;
            if (bar.radius !== undefined) {
                radius = bar.radius;
            }
            let fill = "black";
            if (bar.fill !== undefined) {
                fill = bar.fill;
            }

            this.setData({
                height: bar.height,
                from: from,
                to: to,
                radius: radius,
                fill: fill
            });
            //实现进度条动画效果
            let interVal = setInterval(() => {
                let begin = this.data.begin;
                let max = bar.value;
                if (max == 0) {
                    this.setData({
                        width: "0%"
                    });
                }
                if (begin < max) {
                    let increment = 1;
                    if (max > 20 && max <= 40) {
                        increment = 2;
                    } else if (max > 40 && max <= 60) {
                        increment = 3;
                    } else if (max > 60 && max <= 100) {
                        increment = 4;
                    }

                    let now = begin + increment;

                    this.setData({
                        begin: now,
                        width: (now > max ? max : now) + "%",
                        interVal: interVal
                    });
                } else {
                    clearInterval(this.data.interVal);
                }
            }, 30);
        }
    }
});