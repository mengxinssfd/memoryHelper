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
    },
    lifetimes: {
        attached: function () {
            this.init();
        },
        detached: function () {
            this.onHided();
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
            this.setData({ qList: qList }, function () {
                if (isSwitchQuestion)
                    _this.switchQuestion();
            });
            return true;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheWluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBsYXlpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUNBLDRDQUFnRjtBQUVoRixTQUFTLENBQUM7SUFDTixVQUFVLEVBQUU7UUFDUixZQUFZLEVBQUU7WUFDVixJQUFJLEVBQUUsS0FBSztZQUNYLEtBQUssRUFBRSxFQUFFO1NBQ1o7UUFDRCxPQUFPLEVBQUU7WUFDTCxJQUFJLEVBQUUsTUFBTTtZQUNaLEtBQUssRUFBZSxFQUFFO1NBQ3pCO0tBQ0o7SUFDRCxJQUFJLEVBQUU7UUFDRixLQUFLLEVBQUUsRUFBRTtRQUNULEtBQUssRUFBc0IsRUFBRTtRQUM3QixlQUFlLEVBQW9CLEVBQUU7UUFDckMsVUFBVSxFQUFFLEVBQUU7UUFDZCxZQUFZLEVBQUUsS0FBSztRQUVuQixhQUFhLEVBQUUsS0FBSztRQUNwQixPQUFPLEVBQUUsSUFBSTtLQUNoQjtJQUNELFNBQVMsRUFBRTtRQUNQLFFBQVEsRUFBRTtZQUNOLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoQixDQUFDO1FBQ0QsUUFBUSxFQUFFO1lBRU4sSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ25CLENBQUM7S0FDSjtJQUNELGFBQWEsRUFBRTtRQUNYLElBQUksRUFBRTtRQUVOLENBQUM7S0FDSjtJQUNELE9BQU8sRUFBRTtRQUNMLElBQUksRUFBRSxVQUFTLGdCQUF1QjtZQUFoQyxpQkFxQkw7WUFyQmMsaUNBQUEsRUFBQSx1QkFBdUI7WUFDbEMsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFqQixDQUFpQixDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsY0FBSyxDQUFDLEVBQUUsRUFBUixDQUFRLENBQUMsQ0FBQztZQUMxRixJQUFJ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LENBQUMsQ0FBQztRQUNuQyxDQUFDO1FBQ0QsWUFBWSxFQUFFLFVBQVMsQ0FBQztZQUNwQixJQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1lBQ2hDLElBQUEsY0FBMkMsRUFBMUMsOEJBQVksRUFBRSxvQ0FBNEIsQ0FBQztZQUMzQyxJQUFBLG1DQUFRLENBQW9CO1lBQ25DLElBQU0sS0FBSyxHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsUUFBUSxLQUFLLFFBQVEsRUFBMUIsQ0FBMEIsQ0FBQyxDQUFDO1lBQ3pFLGVBQWUsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQy9CLFlBQVksQ0FBQyxLQUFLLENBQUMsR0FBRyxlQUFlLENBQUM7WUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM5QixDQUFDO0tBQ0o7Q0FFSixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAdHMtaWdub3JlXHJcbmltcG9ydCB7UGxheVNldHRpbmcsIFF1ZXN0aW9uTGlzdEl0ZW0sIHJhbmRvbU51bWJlcn0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3V0aWxcIjtcclxuXHJcbkNvbXBvbmVudCh7XHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgcXVlc3Rpb25MaXN0OiB7XHJcbiAgICAgICAgICAgIHR5cGU6IEFycmF5LFxyXG4gICAgICAgICAgICB2YWx1ZTogW10sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXR0aW5nOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IE9iamVjdCxcclxuICAgICAgICAgICAgdmFsdWU6IDxQbGF5U2V0dGluZz57fSxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIGRhdGE6IHtcclxuICAgICAgICB0aXRsZTogXCJcIixcclxuICAgICAgICBxTGlzdDogPFF1ZXN0aW9uTGlzdEl0ZW1bXT5bXSxcclxuICAgICAgICBjdXJyZW50UXVlc3Rpb246IDxRdWVzdGlvbkxpc3RJdGVtPnt9LFxyXG4gICAgICAgIGlucHV0VmFsdWU6IFwiXCIsXHJcbiAgICAgICAgaXNTaG93QW5zd2VyOiBmYWxzZSxcclxuICAgICAgICAvLyDlm57nrZTmraPnoa7ml7bljrvmjonli77pgIlcclxuICAgICAgICBpc1JpZ2h0UmVtb3ZlOiBmYWxzZSxcclxuICAgICAgICBpc0ZvY3VzOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIGxpZmV0aW1lczoge1xyXG4gICAgICAgIGF0dGFjaGVkOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZXRhY2hlZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vIOWcqOe7hOS7tuWunuS+i+iiq+S7jumhtemdouiKgueCueagkeenu+mZpOaXtuaJp+ihjFxyXG4gICAgICAgICAgICB0aGlzLm9uSGlkZWQoKTtcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIHBhZ2VMaWZldGltZXM6IHtcclxuICAgICAgICBoaWRlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gdGhpcy5vbkhpZGUoKVxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgbWV0aG9kczoge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKGlzU3dpdGNoUXVlc3Rpb24gPSB0cnVlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHFMaXN0ID0gdGhpcy5kYXRhLnF1ZXN0aW9uTGlzdC5maWx0ZXIoaXRlbSA9PiAhaXRlbS5pc1VuQ2hlY2tlZCkubWFwKGkgPT4gKHsuLi5pfSkpO1xyXG4gICAgICAgICAgICBpZiAoIXFMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogJ+ivt+iHs+WwkeWLvumAieS4gOS4qicsXHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vnoa7lrponKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblRhcE1hc2soKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtxTGlzdH0sICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChpc1N3aXRjaFF1ZXN0aW9uKSB0aGlzLnN3aXRjaFF1ZXN0aW9uKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIOWLvumAieetlOWvueenu+mZpOaPkOS6pOS6i+S7tlxyXG4gICAgICAgIG9uSGlkZWQoKSB7XHJcbiAgICAgICAgICAgIC8vIOW6lOivpeWIpOaWreaYr+WQpuacieS4jeS4gOagt+eahOaJjeinpuWPkWZpbmlzaOS6i+S7tizov5nph4zmr4/mrKHnp7vpmaTml7bpg73kvJrop6blj5FcclxuICAgICAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoXCJmaW5pc2hcIiwgdGhpcy5kYXRhLnF1ZXN0aW9uTGlzdCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvblRhcE1hc2s6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0aGlzLnRyaWdnZXJFdmVudCgnY2xvc2UnKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uVGFwQ29uZmlybTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCB7aW5wdXRWYWx1ZSwgcUxpc3QsIGN1cnJlbnRRdWVzdGlvbiwgc2V0dGluZywgaXNSaWdodFJlbW92ZX0gPSB0aGlzLmRhdGE7XHJcbiAgICAgICAgICAgIGNvbnN0IHthbnN3ZXIsIHF1ZXN0aW9ufSA9IGN1cnJlbnRRdWVzdGlvbjtcclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gc2V0dGluZy5pc1JldmVyc2UgPyBxdWVzdGlvbiA6IGFuc3dlcjtcclxuICAgICAgICAgICAgLy8g5b+955Wl5aSn5bCP5YaZXHJcbiAgICAgICAgICAgIGlmIChzZXR0aW5nLmlnbm9yZVVwTG93KSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICBpbnB1dFZhbHVlID0gaW5wdXRWYWx1ZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gaW5wdXRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtpY29uOiBcInN1Y2Nlc3NcIiwgdGl0bGU6IFwi5Zue562U5q2j56GuXCIsIGR1cmF0aW9uOiA3MDB9KTtcclxuICAgICAgICAgICAgICAgIC8vIOWmguaenOWLvumAieetlOWvueenu+mZpOeahOivnVxyXG4gICAgICAgICAgICAgICAgaWYgKGlzUmlnaHRSZW1vdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB7cXVlc3Rpb25MaXN0fSA9IHRoaXMuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHF1ZXN0aW9uTGlzdC5maW5kSW5kZXgoaXRlbSA9PiBpdGVtLnF1ZXN0aW9uID09PSBxdWVzdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFF1ZXN0aW9uLmlzVW5DaGVja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBxdWVzdGlvbkxpc3RbaW5kZXhdID0gY3VycmVudFF1ZXN0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIC8qdGhpcy5zZXREYXRhKHtxdWVzdGlvbkxpc3R9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5pbml0KGZhbHNlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHFMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOacquWFqOmDqOetlOWujFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3dpdGNoUXVlc3Rpb24oKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5bey5YWo6YOo562U5a6MXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLlm57nrZTlrozmr5VcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwi5o+Q56S6XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwi5piv5ZCm6YeN5p2l77yfXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8g5Zue562U6ZSZ6K+vXHJcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe2ljb246IFwibm9uZVwiLCB0aXRsZTogXCLlm57nrZTplJnor69cIn0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtpbnB1dFZhbHVlOiBcIlwifSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHN3aXRjaFF1ZXN0aW9uOiBmdW5jdGlvbihwdXNoSXRlbT86IFF1ZXN0aW9uTGlzdEl0ZW0pIHtcclxuICAgICAgICAgICAgY29uc3Qge3FMaXN0fSA9IHRoaXMuZGF0YTtcclxuICAgICAgICAgICAgY29uc3QgcmFuZEluZGV4ID0gcmFuZG9tTnVtYmVyKHFMaXN0Lmxlbmd0aCAtIDEpO1xyXG4gICAgICAgICAgICBpZiAoIXFMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtpY29uOiBcIm5vbmVcIiwgdGl0bGU6IFwi5rKh5pyJ5Y+v5YiH5o2i55qE6Zeu6aKYXCJ9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBjcSA9IHFMaXN0LnNwbGljZShyYW5kSW5kZXgsIDEpWzBdO1xyXG4gICAgICAgICAgICAvLyDooaXkuIrljrtcclxuICAgICAgICAgICAgaWYgKHB1c2hJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBxTGlzdC5wdXNoKHB1c2hJdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe2lucHV0VmFsdWU6IFwiXCIsIGlzRm9jdXM6IHRydWUsIGN1cnJlbnRRdWVzdGlvbjogY3EsIHFMaXN0LCBpc1Nob3dBbnN3ZXI6IGZhbHNlfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvblRhcEp1bXA6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb25zdCB7Y3VycmVudFF1ZXN0aW9ufSA9IHRoaXMuZGF0YTtcclxuICAgICAgICAgICAgdGhpcy5zd2l0Y2hRdWVzdGlvbihjdXJyZW50UXVlc3Rpb24pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25UYXBTaG93QW5zd2VyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtpc1Nob3dBbnN3ZXI6ICF0aGlzLmRhdGEuaXNTaG93QW5zd2VyfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kQmx1cjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7aXNGb2N1czogZmFsc2V9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uTWFya0NoYW5nZTogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9ICEhZS5kZXRhaWwudmFsdWUubGVuZ3RoO1xyXG4gICAgICAgICAgICBjb25zdCB7cXVlc3Rpb25MaXN0LCBjdXJyZW50UXVlc3Rpb259ID0gdGhpcy5kYXRhO1xyXG4gICAgICAgICAgICBjb25zdCB7cXVlc3Rpb259ID0gY3VycmVudFF1ZXN0aW9uO1xyXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHF1ZXN0aW9uTGlzdC5maW5kSW5kZXgoaXRlbSA9PiBpdGVtLnF1ZXN0aW9uID09PSBxdWVzdGlvbik7XHJcbiAgICAgICAgICAgIGN1cnJlbnRRdWVzdGlvbi5pc01hcmsgPSB2YWx1ZTtcclxuICAgICAgICAgICAgcXVlc3Rpb25MaXN0W2luZGV4XSA9IGN1cnJlbnRRdWVzdGlvbjtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocXVlc3Rpb25MaXN0KTtcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuXHJcbn0pO1xyXG4iXX0=