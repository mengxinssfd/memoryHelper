"use strict";
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
    },
    lifetimes: {
        attached: function () {
            this.init();
        },
        detached: function () {
            this.onHide();
        },
    },
    pageLifetimes: {
        hide: function () {
        },
    },
    methods: {
        init: function () {
            var _this = this;
            var qList = this.data.questionList.filter(function (item) { return !item.isUnChecked; });
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
                _this.switchQuestion();
            });
            return true;
        },
        onHide: function () {
            this.triggerEvent("finish", this.data.questionList);
        },
        onTapMask: function () {
            this.triggerEvent('close');
        },
        onInputAnswer: function (_a) {
            var detail = _a.detail;
            this.setData({ inputValue: detail.value });
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
                    if (!this.init()) {
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
                            _this.setData({ qList: _this.data.questionList }, function () {
                                console.log("ssssssss", _this.data.qList, _this.data.questionList);
                                _this.switchQuestion();
                            });
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
            this.setData({ inputValue: "", currentQuestion: cq, qList: qList, isShowAnswer: false });
        },
        onTapJump: function () {
            var currentQuestion = this.data.currentQuestion;
            this.switchQuestion(currentQuestion);
        },
        onTapShowAnswer: function () {
            this.setData({ isShowAnswer: !this.data.isShowAnswer });
        },
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheWluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBsYXlpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw0Q0FBZ0Y7QUFFaEYsU0FBUyxDQUFDO0lBQ04sVUFBVSxFQUFFO1FBQ1IsWUFBWSxFQUFFO1lBQ1YsSUFBSSxFQUFFLEtBQUs7WUFDWCxLQUFLLEVBQUUsRUFBRTtTQUNaO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsSUFBSSxFQUFFLE1BQU07WUFDWixLQUFLLEVBQWUsRUFBRTtTQUN6QjtLQUNKO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsS0FBSyxFQUFFLEVBQUU7UUFDVCxLQUFLLEVBQXNCLEVBQUU7UUFDN0IsZUFBZSxFQUFvQixFQUFFO1FBQ3JDLFVBQVUsRUFBRSxFQUFFO1FBQ2QsWUFBWSxFQUFFLEtBQUs7UUFFbkIsYUFBYSxFQUFFLEtBQUs7S0FDdkI7SUFDRCxTQUFTLEVBQUU7UUFDUCxRQUFRLEVBQUU7WUFDTixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEIsQ0FBQztRQUNELFFBQVEsRUFBRTtZQUVOLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNsQixDQUFDO0tBQ0o7SUFDRCxhQUFhLEVBQUU7UUFDWCxJQUFJLEVBQUU7UUFFTixDQUFDO0tBQ0o7SUFDRCxPQUFPLEVBQUU7UUFDTCxJQUFJLEVBQUU7WUFBQSxpQkFxQkw7WUFwQkcsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFqQixDQUFpQixDQUFDLENBQUM7WUFDdkUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7Z0JBQ2YsRUFBRSxDQUFDLFNBQVMsQ0FBQztvQkFDVCxLQUFLLEVBQUUsSUFBSTtvQkFDWCxPQUFPLEVBQUUsU0FBUztvQkFDbEIsT0FBTyxFQUFFLFVBQUMsR0FBRzt3QkFDVCxJQUFJLEdB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LEVBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUMsQ0FBQyxDQUFDO1FBQzFELENBQUM7S0FDSjtDQUVKLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEB0cy1pZ25vcmVcclxuaW1wb3J0IHtQbGF5U2V0dGluZywgUXVlc3Rpb25MaXN0SXRlbSwgcmFuZG9tTnVtYmVyfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdXRpbFwiO1xyXG5cclxuQ29tcG9uZW50KHtcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBxdWVzdGlvbkxpc3Q6IHtcclxuICAgICAgICAgICAgdHlwZTogQXJyYXksXHJcbiAgICAgICAgICAgIHZhbHVlOiBbXSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldHRpbmc6IHtcclxuICAgICAgICAgICAgdHlwZTogT2JqZWN0LFxyXG4gICAgICAgICAgICB2YWx1ZTogPFBsYXlTZXR0aW5nPnt9LFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgZGF0YToge1xyXG4gICAgICAgIHRpdGxlOiBcIlwiLFxyXG4gICAgICAgIHFMaXN0OiA8UXVlc3Rpb25MaXN0SXRlbVtdPltdLFxyXG4gICAgICAgIGN1cnJlbnRRdWVzdGlvbjogPFF1ZXN0aW9uTGlzdEl0ZW0+e30sXHJcbiAgICAgICAgaW5wdXRWYWx1ZTogXCJcIixcclxuICAgICAgICBpc1Nob3dBbnN3ZXI6IGZhbHNlLFxyXG4gICAgICAgIC8vIOWbnuetlOato+ehruaXtuWOu+aOieWLvumAiVxyXG4gICAgICAgIGlzUmlnaHRSZW1vdmU6IGZhbHNlLFxyXG4gICAgfSxcclxuICAgIGxpZmV0aW1lczoge1xyXG4gICAgICAgIGF0dGFjaGVkOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZXRhY2hlZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vIOWcqOe7hOS7tuWunuS+i+iiq+S7jumhtemdouiKgueCueagkeenu+mZpOaXtuaJp+ihjFxyXG4gICAgICAgICAgICB0aGlzLm9uSGlkZSgpO1xyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgcGFnZUxpZmV0aW1lczoge1xyXG4gICAgICAgIGhpZGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvLyB0aGlzLm9uSGlkZSgpXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHFMaXN0ID0gdGhpcy5kYXRhLnF1ZXN0aW9uTGlzdC5maWx0ZXIoaXRlbSA9PiAhaXRlbS5pc1VuQ2hlY2tlZCk7XHJcbiAgICAgICAgICAgIGlmICghcUxpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiAn6K+36Iez5bCR5Yu+6YCJ5LiA5LiqJyxcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+ehruWumicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vlj5bmtognKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uVGFwTWFzaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe3FMaXN0fSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zd2l0Y2hRdWVzdGlvbigpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyDli77pgInnrZTlr7nnp7vpmaTmj5DkuqTkuovku7ZcclxuICAgICAgICBvbkhpZGUoKSB7XHJcbiAgICAgICAgICAgIC8vIOW6lOivpeWIpOaWreaYr+WQpuacieS4jeS4gOagt+eahOaJjeinpuWPkWZpbmlzaOS6i+S7tizov5nph4zmr4/mrKHnp7vpmaTml7bpg73kvJrop6blj5FcclxuICAgICAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoXCJmaW5pc2hcIiwgdGhpcy5kYXRhLnF1ZXN0aW9uTGlzdCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvblRhcE1hc2s6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0aGlzLnRyaWdnZXJFdmVudCgnY2xvc2UnKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uSW5wdXRBbnN3ZXI6IGZ1bmN0aW9uKHtkZXRhaWx9KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7aW5wdXRWYWx1ZTogZGV0YWlsLnZhbHVlfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvblRhcENvbmZpcm06IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQge2lucHV0VmFsdWUsIHFMaXN0LCBjdXJyZW50UXVlc3Rpb24sIHNldHRpbmcsIGlzUmlnaHRSZW1vdmV9ID0gdGhpcy5kYXRhO1xyXG4gICAgICAgICAgICBjb25zdCB7YW5zd2VyLCBxdWVzdGlvbn0gPSBjdXJyZW50UXVlc3Rpb247XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHNldHRpbmcuaXNSZXZlcnNlID8gcXVlc3Rpb24gOiBhbnN3ZXI7XHJcbiAgICAgICAgICAgIC8vIOW/veeVpeWkp+Wwj+WGmVxyXG4gICAgICAgICAgICBpZiAoc2V0dGluZy5pZ25vcmVVcExvdykge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgaW5wdXRWYWx1ZSA9IGlucHV0VmFsdWUudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IGlucHV0VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7aWNvbjogXCJzdWNjZXNzXCIsIHRpdGxlOiBcIuWbnuetlOato+ehrlwiLCBkdXJhdGlvbjogNzAwfSk7XHJcbiAgICAgICAgICAgICAgICAvLyDlpoLmnpzli77pgInnrZTlr7nnp7vpmaTnmoTor51cclxuICAgICAgICAgICAgICAgIGlmIChpc1JpZ2h0UmVtb3ZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qge3F1ZXN0aW9uTGlzdH0gPSB0aGlzLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSBxdWVzdGlvbkxpc3QuZmluZEluZGV4KGl0ZW0gPT4gaXRlbS5xdWVzdGlvbiA9PT0gcXVlc3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRRdWVzdGlvbi5pc1VuQ2hlY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25MaXN0W2luZGV4XSA9IGN1cnJlbnRRdWVzdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAvKnRoaXMuc2V0RGF0YSh7cXVlc3Rpb25MaXN0fSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaW5pdCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAocUxpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zd2l0Y2hRdWVzdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWbnuetlOWujOavlVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCLmj5DnpLpcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCLmmK/lkKbph43mnaXvvJ9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtxTGlzdDogdGhpcy5kYXRhLnF1ZXN0aW9uTGlzdH0sICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInNzc3Nzc3NzXCIsIHRoaXMuZGF0YS5xTGlzdCwgdGhpcy5kYXRhLnF1ZXN0aW9uTGlzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zd2l0Y2hRdWVzdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe2ljb246IFwibm9uZVwiLCB0aXRsZTogXCLlm57nrZTplJnor69cIn0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtpbnB1dFZhbHVlOiBcIlwifSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHN3aXRjaFF1ZXN0aW9uOiBmdW5jdGlvbihwdXNoSXRlbT86IFF1ZXN0aW9uTGlzdEl0ZW0pIHtcclxuICAgICAgICAgICAgY29uc3Qge3FMaXN0fSA9IHRoaXMuZGF0YTtcclxuICAgICAgICAgICAgY29uc3QgcmFuZEluZGV4ID0gcmFuZG9tTnVtYmVyKHFMaXN0Lmxlbmd0aCAtIDEpO1xyXG4gICAgICAgICAgICBpZiAoIXFMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtpY29uOiBcIm5vbmVcIiwgdGl0bGU6IFwi5rKh5pyJ5Y+v5YiH5o2i55qE6Zeu6aKYXCJ9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBjcSA9IHFMaXN0LnNwbGljZShyYW5kSW5kZXgsIDEpWzBdO1xyXG4gICAgICAgICAgICAvLyDooaXkuIrljrtcclxuICAgICAgICAgICAgaWYgKHB1c2hJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBxTGlzdC5wdXNoKHB1c2hJdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe2lucHV0VmFsdWU6IFwiXCIsIGN1cnJlbnRRdWVzdGlvbjogY3EsIHFMaXN0LCBpc1Nob3dBbnN3ZXI6IGZhbHNlfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvblRhcEp1bXA6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb25zdCB7Y3VycmVudFF1ZXN0aW9ufSA9IHRoaXMuZGF0YTtcclxuICAgICAgICAgICAgdGhpcy5zd2l0Y2hRdWVzdGlvbihjdXJyZW50UXVlc3Rpb24pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25UYXBTaG93QW5zd2VyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtpc1Nob3dBbnN3ZXI6ICF0aGlzLmRhdGEuaXNTaG93QW5zd2VyfSk7XHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcblxyXG59KTtcclxuIl19