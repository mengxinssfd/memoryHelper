// index.ts
// 获取应用实例
const app = getApp<IAppOption>();

Page({
    data: {
        motto: '欢迎使用记忆助手小程序',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        memory: [],
    },
    // 事件处理函数
    bindViewTap() {
        wx.navigateTo({
            url: '../logs/logs',
        });
    },
    onLoad() {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true,
            });
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                // 已经授权过的时调用
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true,
                });
            };
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo;
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true,
                    });
                },
            });
        }
    },

    onShow() {
        this.getMemory();
    },

    // 手动获取用户授权时调用
    getUserInfo(e: any) {
        console.log(e);
        app.globalData.userInfo = e.detail.userInfo;
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true,
        });
    },
    getMemory() {
        try {
            const memory = wx.getStorageSync("memory") || [];
            console.log("mmmmmm", memory);
            this.setData({memory});
            if (!memory) return;

        } catch (e) {
            console.log(e);
        }
    },
    toCreatePage() {
        wx.navigateTo({url: "/pages/project/create/create"});
    },
    tapItem(e: any) {
        console.log(e);
        app.globalData.currentMemoryIndex = parseInt(e.target.dataset.index);
        wx.navigateTo({url: "/pages/project/manage/manage"});
    },
});
