import {Memory, PlaySetting, QuestionListItem} from "../../../utils/util";

const app = getApp<IAppOption>();

enum PlayMode {
    // 容易
    easy = "easy",
    // 普通
    common = "common",
    // 自定义
    custom = "custom"
}

const playModeList: { key: PlayMode, value: string }[] = [
    {key: PlayMode.easy, value: "容易"},
    {key: PlayMode.common, value: "普通"},
    {key: PlayMode.custom, value: "自定义"},
];
Page({
    data: {
        title: "",
        questionList: <QuestionListItem[]>[],
        showPlay: false,
        showCustom: true,
        showSelect: false,
        playModeList,
        pickedPlayModeListIndex: 0,
        setting: <PlaySetting>{
            canJump: true,
            canShowAnswer: true,
            isReverse: false,
            ignoreUpLow: false,
            // time: 10,
            // totalTime: 60,
        },
    },
    onLoad: function(options) {
        console.log("manage onload", options);
    },
    onShow: function(): void {
        console.log("on show start");
        const index = app.globalData.currentMemoryIndex;
        const store = wx.getStorageSync("memory");
        const memory: Memory = (store || [])[index];
        console.log("index", index);
        console.log("store", store);
        this.setData(memory);
        wx.setNavigationBarTitle({title: memory.title});
        console.log("on show end");
    },
    onTapUpdate: function() {
        wx.navigateTo({url: "/pages/project/create/create?type=update"});
    },
    onTapDelete: function() {
        const key = "memory";
        const memory: any[] = wx.getStorageSync(key);
        memory.splice(app.globalData.currentMemoryIndex, 1);
        try {
            wx.setStorageSync(key, memory);
            wx.showToast({
                icon: "none",
                title: "删除成功!",
                duration: 1500,
            });
            setTimeout(wx.navigateBack, 1500);
        } catch (e) {
            wx.showToast({icon: "none", title: "删除失败!"});
        }
    },
    onTapStart: function() {
        this.setData({showPlay: !this.data.showPlay});
    },
    bindPickerChange: function({detail}: { detail: { value: string } }) {
        const value = parseInt(detail.value);
        this.setData({
            pickedPlayModeListIndex: value,
            showCustom: value === playModeList.findIndex(item => item.key === PlayMode.custom),
        });
    },
    selectorSwitch: function() {
        this.setData({
            showSelect: !this.data.showSelect,
        });
    },

    onSelectorFinish: function(e: any) {
        const questionList = e.detail;
        this.setData({
            questionList,
        });
        const key = "memory";
        const memory: Memory[] = wx.getStorageSync(key) || [];
        const index = app.globalData.currentMemoryIndex;
        memory[index].questionList = questionList;
        wx.setStorageSync(key, memory);
    },
    onTapSetting: function(e: any) {
        const {setting} = this.data;
        const key: keyof PlaySetting = e.currentTarget.dataset.key;
        setting[key] = !setting[key];
        this.setData({setting});
    },
    onInputSetting: function(e: any) {
        const {setting} = this.data;
        const key: keyof PlaySetting = e.currentTarget.dataset.key;
        const value: string = e.detail.value;
        setting[key] = parseInt(value);
        this.setData({setting});
    },
});