"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app = getApp();
var PlayMode;
(function (PlayMode) {
    PlayMode["easy"] = "easy";
    PlayMode["common"] = "common";
    PlayMode["custom"] = "custom";
})(PlayMode || (PlayMode = {}));
var playModeList = [
    { key: PlayMode.easy, value: "容易" },
    { key: PlayMode.common, value: "普通" },
    { key: PlayMode.custom, value: "自定义" },
];
Page({
    data: {
        title: "",
        questionList: [],
        showPlay: false,
        showCustom: true,
        showSelect: false,
        playModeList: playModeList,
        pickedPlayModeListIndex: 0,
        setting: {
            canJump: true,
            canShowAnswer: true,
            isReverse: false,
            ignoreUpLow: false,
        },
    },
    onLoad: function (options) {
        console.log("manage onload", options);
    },
    onShow: function () {
        console.log("on show start");
        var index = app.globalData.currentMemoryIndex;
        var store = wx.getStorageSync("memory");
        var memory = (store || [])[index];
        console.log("index", index);
        console.log("store", store);
        this.setData(memory);
        wx.setNavigationBarTitle({ title: memory.title });
        console.log("on show end");
    },
    onTapUpdate: function () {
        wx.navigateTo({ url: "/pages/project/create/create?type=update" });
    },
    onTapDelete: function () {
        var key = "memory";
        var memory = wx.getStorageSync(key);
        memory.splice(app.globalData.currentMemoryIndex, 1);
        try {
            wx.setStorageSync(key, memory);
            wx.showToast({
                icon: "none",
                title: "删除成功!",
                duration: 1500,
            });
            setTimeout(wx.navigateBack, 1500);
        }
        catch (e) {
            wx.showToast({ icon: "none", title: "删除失败!" });
        }
    },
    onTapStart: function () {
        this.setData({ showPlay: !this.data.showPlay });
    },
    bindPickerChange: function (_a) {
        var detail = _a.detail;
        var value = parseInt(detail.value);
        this.setData({
            pickedPlayModeListIndex: value,
            showCustom: value === playModeList.findIndex(function (item) { return item.key === PlayMode.custom; }),
        });
    },
    selectorSwitch: function () {
        this.setData({
            showSelect: !this.data.showSelect,
        });
    },
    onSelectorFinish: function (e) {
        var questionList = e.detail;
        this.setData({
            questionList: questionList,
        });
        var key = "memory";
        var memory = wx.getStorageSync(key) || [];
        var index = app.globalData.currentMemoryIndex;
        memory[index].questionList = questionList;
        wx.setStorageSync(key, memory);
    },
    onTapSetting: function (e) {
        var setting = this.data.setting;
        var key = e.currentTarget.dataset.key;
        setting[key] = !setting[key];
        this.setData({ setting: setting });
    },
    onInputSetting: function (e) {
        var setting = this.data.setting;
        var key = e.currentTarget.dataset.key;
        var value = e.detail.value;
        setting[key] = parseInt(value);
        this.setData({ setting: setting });
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFuYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFjLENBQUM7QUFFakMsSUFBSyxRQU9KO0FBUEQsV0FBSyxRQUFRO0lBRVQseUJBQWEsQ0FBQTtJQUViLDZCQUFpQixDQUFBO0lBRWpCLDZCQUFpQixDQUFBO0FBQ3JCLENBQUMsRUFQSSxRQUFRLEtBQVIsUUFBUSxRQU9aO0FBRUQsSUFBTSxZQUFZLEdBQXVDO0lBQ3JELEVBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQztJQUNqQyxFQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUM7SUFDbkMsRUFBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDO0NBQ3ZDLENBQUM7QUFDRixJQUFJLENBQUM7SUFDRCxJQUFJLEVBQUU7UUFDRixLQUFLLEVBQUUsRUFBRTtRQUNULFlBQVksRUFBc0IsRUFBRTtRQUNwQyxRQUFRLEVBQUUsS0FBSztRQUNmLFVBQVUsRUFBRSxJQUFJO1FBQ2hCLFVBQVUsRUFBRSxLQUFLO1FBQ2pCLFlBQVksY0FBQTtRQUNaLHVCQUF1QixFQUFFLENBQUM7UUFDMUIsT0FBTyxFQUFlO1lBQ2xCLE9BQU8sRUFBRSxJQUFJO1lBQ2IsYUFBYSxFQUFFLElBQUk7WUFDbkIsU0FBUyxFQUFFLEtBQUs7WUFDaEIsV0FBVyxFQUFFLEtBQUs7U0FHckI7S0FDSjtJQUNELE1BQU0sRUFBRSxVQUFTLE9BQU87UUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUNELE1BQU0sRUFBRTtRQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDN0IsSUFBTSxL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QyxrQkFBa0IsQ0FBQztRQUNoRCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUMxQyxFQUFFLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBQ0QsWUFBWSxFQUFFLFVBQVMsQ0FBTTtRQUNsQixJQUFBLDJCQUFPLENBQWM7UUFDNUIsSUFBTSxHQUFHLEdBQXNCLENBQUMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUMzRCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFDLE9BQU8sU0FBQSxFQUFDLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0QsY0FBYyxFQUFFLFVBQVMsQ0FBTTtRQUNwQixJQUFBLDJCQUFPLENBQWM7UUFDNUIsSUFBTSxHQUFHLEdBQXNCLENBQUMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUMzRCxJQUFNLEtBQUssR0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBQyxPQUFPLFNBQUEsRUFBQyxDQUFDLENBQUM7SUFDNUIsQ0FBQztDQUNKLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TWVtb3J5LCBQbGF5U2V0dGluZywgUXVlc3Rpb25MaXN0SXRlbX0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3V0aWxcIjtcclxuXHJcbmNvbnN0IGFwcCA9IGdldEFwcDxJQXBwT3B0aW9uPigpO1xyXG5cclxuZW51bSBQbGF5TW9kZSB7XHJcbiAgICAvLyDlrrnmmJNcclxuICAgIGVhc3kgPSBcImVhc3lcIixcclxuICAgIC8vIOaZrumAmlxyXG4gICAgY29tbW9uID0gXCJjb21tb25cIixcclxuICAgIC8vIOiHquWumuS5iVxyXG4gICAgY3VzdG9tID0gXCJjdXN0b21cIlxyXG59XHJcblxyXG5jb25zdCBwbGF5TW9kZUxpc3Q6IHsga2V5OiBQbGF5TW9kZSwgdmFsdWU6IHN0cmluZyB9W10gPSBbXHJcbiAgICB7a2V5OiBQbGF5TW9kZS5lYXN5LCB2YWx1ZTogXCLlrrnmmJNcIn0sXHJcbiAgICB7a2V5OiBQbGF5TW9kZS5jb21tb24sIHZhbHVlOiBcIuaZrumAmlwifSxcclxuICAgIHtrZXk6IFBsYXlNb2RlLmN1c3RvbSwgdmFsdWU6IFwi6Ieq5a6a5LmJXCJ9LFxyXG5dO1xyXG5QYWdlKHtcclxuICAgIGRhdGE6IHtcclxuICAgICAgICB0aXRsZTogXCJcIixcclxuICAgICAgICBxdWVzdGlvbkxpc3Q6IDxRdWVzdGlvbkxpc3RJdGVtW10+W10sXHJcbiAgICAgICAgc2hvd1BsYXk6IGZhbHNlLFxyXG4gICAgICAgIHNob3dDdXN0b206IHRydWUsXHJcbiAgICAgICAgc2hvd1NlbGVjdDogZmFsc2UsXHJcbiAgICAgICAgcGxheU1vZGVMaXN0LFxyXG4gICAgICAgIHBpY2tlZFBsYXlNb2RlTGlzdEluZGV4OiAwLFxyXG4gICAgICAgIHNldHRpbmc6IDxQbGF5U2V0dGluZz57XHJcbiAgICAgICAgICAgIGNhbkp1bXA6IHRydWUsXHJcbiAgICAgICAgICAgIGNhblNob3dBbnN3ZXI6IHRydWUsXHJcbiAgICAgICAgICAgIGlzUmV2ZXJzZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGlnbm9yZVVwTG93OiBmYWxzZSxcclxuICAgICAgICAgICAgLy8gdGltZTogMTAsXHJcbiAgICAgICAgICAgIC8vIHRvdGFsVGltZTogNjAsXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBvbkxvYWQ6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm1hbmFnZSBvbmxvYWRcIiwgb3B0aW9ucyk7XHJcbiAgICB9LFxyXG4gICAgb25TaG93OiBmdW5jdGlvbigpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm9uIHNob3cgc3RhcnRcIik7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSBhcHAuZ2xvYmFsRGF0YS5jdXJyZW50TWVtb3J5SW5kZXg7XHJcbiAgICAgICAgY29uc3Qgc3RvcmUgPSB3eC5nZXRTdG9yYWdlU3luYyhcIm1lbW9yeVwiKTtcclxuICAgICAgICBjb25zdCBtZW1vcnk6IE1lbW9yeSA9IChzdG9yZSB8fCBbXSlbaW5kZXhdO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiaW5kZXhcIiwgaW5kZXgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic3RvcmVcIiwgc3RvcmUpO1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YShtZW1vcnkpO1xyXG4gICAgICAgIHd4LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7dGl0bGU6IG1lbW9yeS50aXRsZX0pO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwib24gc2hvdyBlbmRcIik7XHJcbiAgICB9LFxyXG4gICAgb25UYXBVcGRhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHd4Lm5hdmlnYXRlVG8oe3VybDogXCIvcGFnZXMvcHJvamVjdC9jcmVhdGUvY3JlYXRlP3R5cGU9dXBkYXRlXCJ9KTtcclxuICAgIH0sXHJcbiAgICBvblRhcERlbGV0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY29uc3Qga2V5ID0gXCJtZW1vcnlcIjtcclxuICAgICAgICBjb25zdCBtZW1vcnk6IGFueVtdID0gd3guZ2V0U3RvcmFnZVN5bmMoa2V5KTtcclxuICAgICAgICBtZW1vcnkuc3BsaWNlKGFwcC5nbG9iYWxEYXRhLmN1cnJlbnRNZW1vcnlJbmRleCwgMSk7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoa2V5LCBtZW1vcnkpO1xyXG4gICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgaWNvbjogXCJub25lXCIsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCLliKDpmaTmiJDlip8hXCIsXHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTUwMCxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQod3gubmF2aWdhdGVCYWNrLCAxNTAwKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7aWNvbjogXCJub25lXCIsIHRpdGxlOiBcIuWIoOmZpOWksei0pSFcIn0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBvblRhcFN0YXJ0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLnNldERhdGEoe3Nob3dQbGF5OiAhdGhpcy5kYXRhLnNob3dQbGF5fSk7XHJcbiAgICB9LFxyXG4gICAgYmluZFBpY2tlckNoYW5nZTogZnVuY3Rpb24oe2RldGFpbH06IHsgZGV0YWlsOiB7IHZhbHVlOiBzdHJpbmcgfSB9KSB7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSBwYXJzZUludChkZXRhaWwudmFsdWUpO1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIHBpY2tlZFBsYXlNb2RlTGlzdEluZGV4OiB2YWx1ZSxcclxuICAgICAgICAgICAgc2hvd0N1c3RvbTogdmFsdWUgPT09IHBsYXlNb2RlTGlzdC5maW5kSW5kZXgoaXRlbSA9PiBpdGVtLmtleSA9PT0gUGxheU1vZGUuY3VzdG9tKSxcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBzZWxlY3RvclN3aXRjaDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgc2hvd1NlbGVjdDogIXRoaXMuZGF0YS5zaG93U2VsZWN0LFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBvblNlbGVjdG9yRmluaXNoOiBmdW5jdGlvbihlOiBhbnkpIHtcclxuICAgICAgICBjb25zdCBxdWVzdGlvbkxpc3QgPSBlLmRldGFpbDtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBxdWVzdGlvbkxpc3QsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3Qga2V5ID0gXCJtZW1vcnlcIjtcclxuICAgICAgICBjb25zdCBtZW1vcnk6IE1lbW9yeVtdID0gd3guZ2V0U3RvcmFnZVN5bmMoa2V5KSB8fCBbXTtcclxuICAgICAgICBjb25zdCBpbmRleCA9IGFwcC5nbG9iYWxEYXRhLmN1cnJlbnRNZW1vcnlJbmRleDtcclxuICAgICAgICBtZW1vcnlbaW5kZXhdLnF1ZXN0aW9uTGlzdCA9IHF1ZXN0aW9uTGlzdDtcclxuICAgICAgICB3eC5zZXRTdG9yYWdlU3luYyhrZXksIG1lbW9yeSk7XHJcbiAgICB9LFxyXG4gICAgb25UYXBTZXR0aW5nOiBmdW5jdGlvbihlOiBhbnkpIHtcclxuICAgICAgICBjb25zdCB7c2V0dGluZ30gPSB0aGlzLmRhdGE7XHJcbiAgICAgICAgY29uc3Qga2V5OiBrZXlvZiBQbGF5U2V0dGluZyA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmtleTtcclxuICAgICAgICBzZXR0aW5nW2tleV0gPSAhc2V0dGluZ1trZXldO1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7c2V0dGluZ30pO1xyXG4gICAgfSxcclxuICAgIG9uSW5wdXRTZXR0aW5nOiBmdW5jdGlvbihlOiBhbnkpIHtcclxuICAgICAgICBjb25zdCB7c2V0dGluZ30gPSB0aGlzLmRhdGE7XHJcbiAgICAgICAgY29uc3Qga2V5OiBrZXlvZiBQbGF5U2V0dGluZyA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmtleTtcclxuICAgICAgICBjb25zdCB2YWx1ZTogc3RyaW5nID0gZS5kZXRhaWwudmFsdWU7XHJcbiAgICAgICAgc2V0dGluZ1trZXldID0gcGFyc2VJbnQodmFsdWUpO1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7c2V0dGluZ30pO1xyXG4gICAgfSxcclxufSk7Il19