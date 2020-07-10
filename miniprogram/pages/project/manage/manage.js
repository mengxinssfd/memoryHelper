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
        },
    },
    onLoad: function (options) {
        console.log(options);
        var memory = (wx.getStorageSync("memory") || [])[app.globalData.currentMemoryIndex];
        this.setData(memory);
        wx.setNavigationBarTitle({ title: memory.title });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFuYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFjLENBQUM7QUFFakMsSUFBSyxRQU9KO0FBUEQsV0FBSyxRQUFRO0lBRVQseUJBQWEsQ0FBQTtJQUViLDZCQUFpQixDQUFBO0lBRWpCLDZCQUFpQixDQUFBO0FBQ3JCLENBQUMsRUFQSSxRQUFRLEtBQVIsUUFBUSxRQU9aO0FBRUQsSUFBTSxZQUFZLEdBQXVDO0lBQ3JELEVBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQztJQUNqQyxFQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUM7SUFDbkMsRUFBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDO0NBQ3ZDLENBQUM7QUFDRixJQUFJLENBQUM7SUFDRCxJQUFJLEVBQUU7UUFDRixLQUFLLEVBQUUsRUFBRTtRQUNULFlBQVksRUFBc0IsRUFBRTtRQUNwQyxRQUFRLEVBQUUsS0FBSztRQUNmLFVBQVUsRUFBRSxJQUFJO1FBQ2hCLFVBQVUsRUFBRSxLQUFLO1FBQ2pCLFlBQVksY0FBQTtRQUNaLHVCQUF1QixFQUFFLENBQUM7UUFDMUIsT0FBTyxFQUFlO1lBQ2xCLE9BQU8sRUFBRSxJQUFJO1lBQ2IsYUFBYSxFQUFFLElBQUk7WUFDbkIsU0FBUyxFQUFFLEtBQUs7U0FHbkI7S0FDSjtJQUNELE1BQU0sRUFBRSxVQUFTLE9BQU87UUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyQixJQUFNLE1BQU0sR0FBVyxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxD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LElBQUksQ0FBQyxPQUFPLENBQUMsRUFBQyxPQUFPLFNBQUEsRUFBQyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNELGNBQWMsRUFBRSxVQUFTLENBQU07UUFDcEIsSUFBQSwyQkFBTyxDQUFjO1FBQzVCLElBQU0sR0FBRyxHQUFzQixDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7UUFDM0QsSUFBTSxLQUFLLEdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUMsT0FBTyxTQUFBLEVBQUMsQ0FBQyxDQUFDO0lBQzVCLENBQUM7Q0FDSixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge01lbW9yeSwgUGxheVNldHRpbmcsIFF1ZXN0aW9uTGlzdEl0ZW19IGZyb20gXCIuLi8uLi8uLi91dGlscy91dGlsXCI7XHJcblxyXG5jb25zdCBhcHAgPSBnZXRBcHA8SUFwcE9wdGlvbj4oKTtcclxuXHJcbmVudW0gUGxheU1vZGUge1xyXG4gICAgLy8g5a655piTXHJcbiAgICBlYXN5ID0gXCJlYXN5XCIsXHJcbiAgICAvLyDmma7pgJpcclxuICAgIGNvbW1vbiA9IFwiY29tbW9uXCIsXHJcbiAgICAvLyDoh6rlrprkuYlcclxuICAgIGN1c3RvbSA9IFwiY3VzdG9tXCJcclxufVxyXG5cclxuY29uc3QgcGxheU1vZGVMaXN0OiB7IGtleTogUGxheU1vZGUsIHZhbHVlOiBzdHJpbmcgfVtdID0gW1xyXG4gICAge2tleTogUGxheU1vZGUuZWFzeSwgdmFsdWU6IFwi5a655piTXCJ9LFxyXG4gICAge2tleTogUGxheU1vZGUuY29tbW9uLCB2YWx1ZTogXCLmma7pgJpcIn0sXHJcbiAgICB7a2V5OiBQbGF5TW9kZS5jdXN0b20sIHZhbHVlOiBcIuiHquWumuS5iVwifSxcclxuXTtcclxuUGFnZSh7XHJcbiAgICBkYXRhOiB7XHJcbiAgICAgICAgdGl0bGU6IFwiXCIsXHJcbiAgICAgICAgcXVlc3Rpb25MaXN0OiA8UXVlc3Rpb25MaXN0SXRlbVtdPltdLFxyXG4gICAgICAgIHNob3dQbGF5OiBmYWxzZSxcclxuICAgICAgICBzaG93Q3VzdG9tOiB0cnVlLFxyXG4gICAgICAgIHNob3dTZWxlY3Q6IGZhbHNlLFxyXG4gICAgICAgIHBsYXlNb2RlTGlzdCxcclxuICAgICAgICBwaWNrZWRQbGF5TW9kZUxpc3RJbmRleDogMCxcclxuICAgICAgICBzZXR0aW5nOiA8UGxheVNldHRpbmc+e1xyXG4gICAgICAgICAgICBjYW5KdW1wOiB0cnVlLFxyXG4gICAgICAgICAgICBjYW5TaG93QW5zd2VyOiB0cnVlLFxyXG4gICAgICAgICAgICBpc1JldmVyc2U6IGZhbHNlLFxyXG4gICAgICAgICAgICAvLyB0aW1lOiAxMCxcclxuICAgICAgICAgICAgLy8gdG90YWxUaW1lOiA2MCxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIG9uTG9hZDogZnVuY3Rpb24ob3B0aW9ucykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKG9wdGlvbnMpO1xyXG4gICAgICAgIGNvbnN0IG1lbW9yeTogTWVtb3J5ID0gKHd4LmdldFN0b3JhZ2VTeW5jKFwibWVtb3J5XCIpIHx8IFtdKVthcHAuZ2xvYmFsRGF0YS5jdXJyZW50TWVtb3J5SW5kZXhdO1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YShtZW1vcnkpO1xyXG4gICAgICAgIHd4LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7dGl0bGU6IG1lbW9yeS50aXRsZX0pO1xyXG4gICAgfSxcclxuICAgIG9uVGFwVXBkYXRlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB3eC5uYXZpZ2F0ZVRvKHt1cmw6IFwiL3BhZ2VzL3Byb2plY3QvY3JlYXRlL2NyZWF0ZT90eXBlPXVwZGF0ZVwifSk7XHJcbiAgICB9LFxyXG4gICAgb25UYXBEZWxldGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbnN0IGtleSA9IFwibWVtb3J5XCI7XHJcbiAgICAgICAgY29uc3QgbWVtb3J5OiBhbnlbXSA9IHd4LmdldFN0b3JhZ2VTeW5jKGtleSk7XHJcbiAgICAgICAgbWVtb3J5LnNwbGljZShhcHAuZ2xvYmFsRGF0YS5jdXJyZW50TWVtb3J5SW5kZXgsIDEpO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKGtleSwgbWVtb3J5KTtcclxuICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgIGljb246IFwibm9uZVwiLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwi5Yig6Zmk5oiQ5YqfIVwiLFxyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDE1MDAsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KHd4Lm5hdmlnYXRlQmFjaywgMTUwMCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICB3eC5zaG93VG9hc3Qoe2ljb246IFwibm9uZVwiLCB0aXRsZTogXCLliKDpmaTlpLHotKUhXCJ9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgb25UYXBTdGFydDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtzaG93UGxheTogIXRoaXMuZGF0YS5zaG93UGxheX0pO1xyXG4gICAgfSxcclxuICAgIGJpbmRQaWNrZXJDaGFuZ2U6IGZ1bmN0aW9uKHtkZXRhaWx9OiB7IGRldGFpbDogeyB2YWx1ZTogc3RyaW5nIH0gfSkge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gcGFyc2VJbnQoZGV0YWlsLnZhbHVlKTtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBwaWNrZWRQbGF5TW9kZUxpc3RJbmRleDogdmFsdWUsXHJcbiAgICAgICAgICAgIHNob3dDdXN0b206IHZhbHVlID09PSBwbGF5TW9kZUxpc3QuZmluZEluZGV4KGl0ZW0gPT4gaXRlbS5rZXkgPT09IFBsYXlNb2RlLmN1c3RvbSksXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgc2VsZWN0b3JTd2l0Y2g6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIHNob3dTZWxlY3Q6ICF0aGlzLmRhdGEuc2hvd1NlbGVjdCxcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgb25TZWxlY3RvckZpbmlzaDogZnVuY3Rpb24oZTogYW55KSB7XHJcbiAgICAgICAgY29uc3QgcXVlc3Rpb25MaXN0ID0gZS5kZXRhaWw7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgcXVlc3Rpb25MaXN0LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IGtleSA9IFwibWVtb3J5XCI7XHJcbiAgICAgICAgY29uc3QgbWVtb3J5OiBNZW1vcnlbXSA9IHd4LmdldFN0b3JhZ2VTeW5jKGtleSkgfHwgW107XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSBhcHAuZ2xvYmFsRGF0YS5jdXJyZW50TWVtb3J5SW5kZXg7XHJcbiAgICAgICAgbWVtb3J5W2luZGV4XS5xdWVzdGlvbkxpc3QgPSBxdWVzdGlvbkxpc3Q7XHJcbiAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoa2V5LCBtZW1vcnkpO1xyXG4gICAgfSxcclxuICAgIG9uVGFwU2V0dGluZzogZnVuY3Rpb24oZTogYW55KSB7XHJcbiAgICAgICAgY29uc3Qge3NldHRpbmd9ID0gdGhpcy5kYXRhO1xyXG4gICAgICAgIGNvbnN0IGtleToga2V5b2YgUGxheVNldHRpbmcgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5rZXk7XHJcbiAgICAgICAgc2V0dGluZ1trZXldID0gIXNldHRpbmdba2V5XTtcclxuICAgICAgICB0aGlzLnNldERhdGEoe3NldHRpbmd9KTtcclxuICAgIH0sXHJcbiAgICBvbklucHV0U2V0dGluZzogZnVuY3Rpb24oZTogYW55KSB7XHJcbiAgICAgICAgY29uc3Qge3NldHRpbmd9ID0gdGhpcy5kYXRhO1xyXG4gICAgICAgIGNvbnN0IGtleToga2V5b2YgUGxheVNldHRpbmcgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5rZXk7XHJcbiAgICAgICAgY29uc3QgdmFsdWU6IHN0cmluZyA9IGUuZGV0YWlsLnZhbHVlO1xyXG4gICAgICAgIHNldHRpbmdba2V5XSA9IHBhcnNlSW50KHZhbHVlKTtcclxuICAgICAgICB0aGlzLnNldERhdGEoe3NldHRpbmd9KTtcclxuICAgIH0sXHJcbn0pOyJdfQ==