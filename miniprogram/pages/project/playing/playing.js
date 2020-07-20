"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../../../utils/util");
Component({
    properties: {
        questionList: {
            type: Array,
            value: [],
        },
        setting: {
            type: Object,
            value: {},
        },
    },
    data: {
        title: "",
        qList: [],
        currentQuestion: {},
        inputValue: "",
        isShowAnswer: false,
        isRightRemove: false,
        isFocus: true,
        startTime: 0,
        formattedTime: "00:00:00",
        timer: -1,
    },
    lifetimes: {
        attached: function () {
            this.init();
        },
        detached: function () {
            this.onHided();
            this.timeEnd();
        },
    },
    pageLifetimes: {
        hide: function () {
        },
    },
    methods: {
        init: function (isSwitchQuestion) {
            var _this = this;
            if (isSwitchQuestion === void 0) { isSwitchQuestion = true; }
            var qList = this.data.questionList.filter(function (item) { return !item.isUnChecked; }).map(function (i) { return (__assign({}, i)); });
            if (!qList.length) {
                wx.showModal({
                    title: '提示',
                    content: '请至少勾选一个',
                    success: function (res) {
                        if (res.confirm) {
                            console.log('用户点击确定');
                        }
                        else if (res.cancel) {
                            console.log('用户点击取消');
                        }
                        _this.onTapMask();
                    },
                });
                return false;
            }
            this.setData({ qList: qList, startTime: Date.now(), timer: this.timeStart() }, function () {
                if (isSwitchQuestion)
                    _this.switchQuestion();
            });
            return true;
        },
        timeStart: function () {
            var _this = this;
            return setInterval(function () {
                _this.setData({ formattedTime: util_1.dateDiff(new Date(_this.data.startTime), new Date(), "hh:mm:ss") });
            }, 1000);
        },
        timeEnd: function () {
            clearInterval(this.data.timer);
        },
        onHided: function () {
            this.triggerEvent("finish", this.data.questionList);
        },
        onTapMask: function () {
            this.triggerEvent('close');
        },
        onTapConfirm: function () {
            var _this = this;
            var _a = this.data, inputValue = _a.inputValue, qList = _a.qList, currentQuestion = _a.currentQuestion, setting = _a.setting, isRightRemove = _a.isRightRemove;
            var answer = currentQuestion.answer, question = currentQuestion.question;
            var value = setting.isReverse ? question : answer;
            if (setting.ignoreUpLow) {
                value = value.toLowerCase();
                inputValue = inputValue.toLowerCase();
            }
            if (value === inputValue) {
                wx.showToast({ icon: "success", title: "回答正确", duration: 700 });
                if (isRightRemove) {
                    var questionList = this.data.questionList;
                    var index = questionList.findIndex(function (item) { return item.question === question; });
                    currentQuestion.isUnChecked = true;
                    questionList[index] = currentQuestion;
                    if (!this.init(false)) {
                        return;
                    }
                }
                if (qList.length) {
                    this.switchQuestion();
                }
                else {
                    console.log("回答完毕");
                    wx.showModal({
                        title: "提示",
                        content: "是否重来？",
                        success: function () {
                            _this.init();
                        },
                    });
                }
            }
            else {
                wx.showToast({ icon: "none", title: "回答错误" });
                this.setData({ inputValue: "" });
            }
        },
        switchQuestion: function (pushItem) {
            var qList = this.data.qList;
            var randIndex = util_1.randomNumber(qList.length - 1);
            if (!qList.length) {
                wx.showToast({ icon: "none", title: "没有可切换的问题" });
                return;
            }
            var cq = qList.splice(randIndex, 1)[0];
            if (pushItem) {
                qList.push(pushItem);
            }
            this.setData({ inputValue: "", isFocus: true, currentQuestion: cq, qList: qList, isShowAnswer: false });
        },
        onTapJump: function () {
            var currentQuestion = this.data.currentQuestion;
            this.switchQuestion(currentQuestion);
        },
        onTapShowAnswer: function () {
            this.setData({ isShowAnswer: !this.data.isShowAnswer });
        },
        bindBlur: function () {
            this.setData({ isFocus: false });
        },
        onMarkChange: function (e) {
            var value = !!e.detail.value.length;
            var _a = this.data, questionList = _a.questionList, currentQuestion = _a.currentQuestion;
            var question = currentQuestion.question;
            var index = questionList.findIndex(function (item) { return item.question === question; });
            currentQuestion.isMark = value;
            questionList[index] = currentQuestion;
            console.log(questionList);
        },
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheWluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBsYXlpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUNBLDRDQUEwRjtBQUUxRixTQUFTLENBQUM7SUFDTixVQUFVLEVBQUU7UUFDUixZQUFZLEVBQUU7WUFDVixJQUFJLEVBQUUsS0FBSztZQUNYLEtBQUssRUFBRSxFQUFFO1NBQ1o7UUFDRCxPQUFPLEVBQUU7WUFDTCxJQUFJLEVBQUUsTUFBTTtZQUNaLEtBQUssRUFBZSxFQUFFO1NBQ3pCO0tBQ0o7SUFDRCxJQUFJLEVBQUU7UUFDRixLQUFLLEVBQUUsRUFBRTtRQUNULEtBQUssRUFBc0IsRUFBRTtRQUM3QixlQUFlLEVBQW9CLEVBQUU7UUFDckMsVUFBVSxFQUFFLEVBQUU7UUFDZCxZQUFZLEVBQUUsS0FBSztRQUVuQixhQUFhLEVBQUUsS0FBSztRQUNwQixPQUFPLEVBQUUsSUFBSTtRQUNiLFNBQVMsRUFBRSxDQUFDO1FBQ1osYUFBYSxFQUFFLFVBQVU7UUFDekIsS0FBSyxFQUFFLENBQUMsQ0FBQztLQUNaO0lBQ0QsU0FBUyxFQUFFO1FBQ1AsUUFBUSxFQUFFO1lBQ04sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2hCLENBQUM7UUFDRCxRQUFRLEVBQUU7WUFFTixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDZixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDbkIsQ0FBQztLQUNKO0lBQ0QsYUFBYSxFQUFFO1FBQ1gsSUFBSSxFQUFFO1FBRU4sQ0FBQztLQUNKO0lBQ0QsT0FBTyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFVBQVMsZ0JBQXVCO1lBQWhDLGlCQXFCTDtZQXJCYyxpQ0FBQSxFQUFBLHVCQUF1QjtZQUNsQyxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxDQUFDLElBQUksQ0FBQyxXQUFXLEVB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Q0o7Q0FFSixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAdHMtaWdub3JlXHJcbmltcG9ydCB7ZGF0ZURpZmYsIFBsYXlTZXR0aW5nLCBRdWVzdGlvbkxpc3RJdGVtLCByYW5kb21OdW1iZXJ9IGZyb20gXCIuLi8uLi8uLi91dGlscy91dGlsXCI7XHJcblxyXG5Db21wb25lbnQoe1xyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHF1ZXN0aW9uTGlzdDoge1xyXG4gICAgICAgICAgICB0eXBlOiBBcnJheSxcclxuICAgICAgICAgICAgdmFsdWU6IFtdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0dGluZzoge1xyXG4gICAgICAgICAgICB0eXBlOiBPYmplY3QsXHJcbiAgICAgICAgICAgIHZhbHVlOiA8UGxheVNldHRpbmc+e30sXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgICAgdGl0bGU6IFwiXCIsXHJcbiAgICAgICAgcUxpc3Q6IDxRdWVzdGlvbkxpc3RJdGVtW10+W10sXHJcbiAgICAgICAgY3VycmVudFF1ZXN0aW9uOiA8UXVlc3Rpb25MaXN0SXRlbT57fSxcclxuICAgICAgICBpbnB1dFZhbHVlOiBcIlwiLFxyXG4gICAgICAgIGlzU2hvd0Fuc3dlcjogZmFsc2UsXHJcbiAgICAgICAgLy8g5Zue562U5q2j56Gu5pe25Y675o6J5Yu+6YCJXHJcbiAgICAgICAgaXNSaWdodFJlbW92ZTogZmFsc2UsXHJcbiAgICAgICAgaXNGb2N1czogdHJ1ZSxcclxuICAgICAgICBzdGFydFRpbWU6IDAsXHJcbiAgICAgICAgZm9ybWF0dGVkVGltZTogXCIwMDowMDowMFwiLFxyXG4gICAgICAgIHRpbWVyOiAtMSxcclxuICAgIH0sXHJcbiAgICBsaWZldGltZXM6IHtcclxuICAgICAgICBhdHRhY2hlZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGV0YWNoZWQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvLyDlnKjnu4Tku7blrp7kvovooqvku47pobXpnaLoioLngrnmoJHnp7vpmaTml7bmiafooYxcclxuICAgICAgICAgICAgdGhpcy5vbkhpZGVkKCk7XHJcbiAgICAgICAgICAgIHRoaXMudGltZUVuZCgpO1xyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgcGFnZUxpZmV0aW1lczoge1xyXG4gICAgICAgIGhpZGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvLyB0aGlzLm9uSGlkZSgpXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oaXNTd2l0Y2hRdWVzdGlvbiA9IHRydWUpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgY29uc3QgcUxpc3QgPSB0aGlzLmRhdGEucXVlc3Rpb25MaXN0LmZpbHRlcihpdGVtID0+ICFpdGVtLmlzVW5DaGVja2VkKS5tYXAoaSA9PiAoey4uLml9KSk7XHJcbiAgICAgICAgICAgIGlmICghcUxpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiAn6K+36Iez5bCR5Yu+6YCJ5LiA5LiqJyxcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+ehruWumicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vlj5bmtognKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uVGFwTWFzaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe3FMaXN0LCBzdGFydFRpbWU6IERhdGUubm93KCksIHRpbWVyOiB0aGlzLnRpbWVTdGFydCgpfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzU3dpdGNoUXVlc3Rpb24pIHRoaXMuc3dpdGNoUXVlc3Rpb24oKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8g6K6h5pe25byA5aeLXHJcbiAgICAgICAgdGltZVN0YXJ0OiBmdW5jdGlvbigpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtmb3JtYXR0ZWRUaW1lOiBkYXRlRGlmZihuZXcgRGF0ZSh0aGlzLmRhdGEuc3RhcnRUaW1lKSwgbmV3IERhdGUoKSwgXCJoaDptbTpzc1wiKX0pO1xyXG4gICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIOiuoeaXtue7k+adn1xyXG4gICAgICAgIHRpbWVFbmQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuZGF0YS50aW1lcik7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyDli77pgInnrZTlr7nnp7vpmaTmj5DkuqTkuovku7ZcclxuICAgICAgICBvbkhpZGVkKCkge1xyXG4gICAgICAgICAgICAvLyDlupTor6XliKTmlq3mmK/lkKbmnInkuI3kuIDmoLfnmoTmiY3op6blj5FmaW5pc2jkuovku7Ys6L+Z6YeM5q+P5qyh56e76Zmk5pe26YO95Lya6Kem5Y+RXHJcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlckV2ZW50KFwiZmluaXNoXCIsIHRoaXMuZGF0YS5xdWVzdGlvbkxpc3QpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25UYXBNYXNrOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoJ2Nsb3NlJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvblRhcENvbmZpcm06IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQge2lucHV0VmFsdWUsIHFMaXN0LCBjdXJyZW50UXVlc3Rpb24sIHNldHRpbmcsIGlzUmlnaHRSZW1vdmV9ID0gdGhpcy5kYXRhO1xyXG4gICAgICAgICAgICBjb25zdCB7YW5zd2VyLCBxdWVzdGlvbn0gPSBjdXJyZW50UXVlc3Rpb247XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHNldHRpbmcuaXNSZXZlcnNlID8gcXVlc3Rpb24gOiBhbnN3ZXI7XHJcbiAgICAgICAgICAgIC8vIOW/veeVpeWkp+Wwj+WGmVxyXG4gICAgICAgICAgICBpZiAoc2V0dGluZy5pZ25vcmVVcExvdykge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgaW5wdXRWYWx1ZSA9IGlucHV0VmFsdWUudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IGlucHV0VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7aWNvbjogXCJzdWNjZXNzXCIsIHRpdGxlOiBcIuWbnuetlOato+ehrlwiLCBkdXJhdGlvbjogNzAwfSk7XHJcbiAgICAgICAgICAgICAgICAvLyDlpoLmnpzli77pgInnrZTlr7nnp7vpmaTnmoTor51cclxuICAgICAgICAgICAgICAgIGlmIChpc1JpZ2h0UmVtb3ZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qge3F1ZXN0aW9uTGlzdH0gPSB0aGlzLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSBxdWVzdGlvbkxpc3QuZmluZEluZGV4KGl0ZW0gPT4gaXRlbS5xdWVzdGlvbiA9PT0gcXVlc3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRRdWVzdGlvbi5pc1VuQ2hlY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25MaXN0W2luZGV4XSA9IGN1cnJlbnRRdWVzdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAvKnRoaXMuc2V0RGF0YSh7cXVlc3Rpb25MaXN0fSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaW5pdChmYWxzZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChxTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDmnKrlhajpg6jnrZTlroxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN3aXRjaFF1ZXN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOW3suWFqOmDqOetlOWujFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5Zue562U5a6M5q+VXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIuaPkOekulwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcIuaYr+WQpumHjeadpe+8n1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIOWbnuetlOmUmeivr1xyXG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtpY29uOiBcIm5vbmVcIiwgdGl0bGU6IFwi5Zue562U6ZSZ6K+vXCJ9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7aW5wdXRWYWx1ZTogXCJcIn0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzd2l0Y2hRdWVzdGlvbjogZnVuY3Rpb24ocHVzaEl0ZW0/OiBRdWVzdGlvbkxpc3RJdGVtKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHtxTGlzdH0gPSB0aGlzLmRhdGE7XHJcbiAgICAgICAgICAgIGNvbnN0IHJhbmRJbmRleCA9IHJhbmRvbU51bWJlcihxTGlzdC5sZW5ndGggLSAxKTtcclxuICAgICAgICAgICAgaWYgKCFxTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7aWNvbjogXCJub25lXCIsIHRpdGxlOiBcIuayoeacieWPr+WIh+aNoueahOmXrumimFwifSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgY3EgPSBxTGlzdC5zcGxpY2UocmFuZEluZGV4LCAxKVswXTtcclxuICAgICAgICAgICAgLy8g6KGl5LiK5Y67XHJcbiAgICAgICAgICAgIGlmIChwdXNoSXRlbSkge1xyXG4gICAgICAgICAgICAgICAgcUxpc3QucHVzaChwdXNoSXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtpbnB1dFZhbHVlOiBcIlwiLCBpc0ZvY3VzOiB0cnVlLCBjdXJyZW50UXVlc3Rpb246IGNxLCBxTGlzdCwgaXNTaG93QW5zd2VyOiBmYWxzZX0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25UYXBKdW1wOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29uc3Qge2N1cnJlbnRRdWVzdGlvbn0gPSB0aGlzLmRhdGE7XHJcbiAgICAgICAgICAgIHRoaXMuc3dpdGNoUXVlc3Rpb24oY3VycmVudFF1ZXN0aW9uKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uVGFwU2hvd0Fuc3dlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7aXNTaG93QW5zd2VyOiAhdGhpcy5kYXRhLmlzU2hvd0Fuc3dlcn0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZEJsdXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe2lzRm9jdXM6IGZhbHNlfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbk1hcmtDaGFuZ2U6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSAhIWUuZGV0YWlsLnZhbHVlLmxlbmd0aDtcclxuICAgICAgICAgICAgY29uc3Qge3F1ZXN0aW9uTGlzdCwgY3VycmVudFF1ZXN0aW9ufSA9IHRoaXMuZGF0YTtcclxuICAgICAgICAgICAgY29uc3Qge3F1ZXN0aW9ufSA9IGN1cnJlbnRRdWVzdGlvbjtcclxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBxdWVzdGlvbkxpc3QuZmluZEluZGV4KGl0ZW0gPT4gaXRlbS5xdWVzdGlvbiA9PT0gcXVlc3Rpb24pO1xyXG4gICAgICAgICAgICBjdXJyZW50UXVlc3Rpb24uaXNNYXJrID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHF1ZXN0aW9uTGlzdFtpbmRleF0gPSBjdXJyZW50UXVlc3Rpb247XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHF1ZXN0aW9uTGlzdCk7XHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcblxyXG59KTtcclxuIl19