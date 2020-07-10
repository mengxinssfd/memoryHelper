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
        originList: [],
        qList: [],
        currentQuestion: {},
        inputValue: "",
        isShowAnswer: false,
    },
    lifetimes: {
        attached: function () {
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
                return;
            }
            this.setData({ qList: qList });
            this.switchQuestion();
        },
        detached: function () {
        },
    },
    methods: {
        onTapMask: function () {
            this.triggerEvent('close');
        },
        onInputAnswer: function (_a) {
            var detail = _a.detail;
            this.setData({ inputValue: detail.value });
        },
        onTapConfirm: function () {
            var _a = this.data, inputValue = _a.inputValue, qList = _a.qList, currentQuestion = _a.currentQuestion, setting = _a.setting;
            var answer = currentQuestion.answer, question = currentQuestion.question;
            var value = setting.isReverse ? question : answer;
            if (value === inputValue) {
                wx.showToast({ icon: "success", title: "回答正确", duration: 700 });
                if (qList.length) {
                    this.switchQuestion();
                }
                else {
                    console.log("回答完毕");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheWluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBsYXlpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw0Q0FBbUU7QUFFbkUsU0FBUyxDQUFDO0lBQ04sVUFBVSxFQUFFO1FBQ1IsWUFBWSxFQUFFO1lBQ1YsSUFBSSxFQUFFLEtBQUs7WUFDWCxLQUFLLEVBQUUsRUFBRTtTQUNaO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsSUFBSSxFQUFFLE1BQU07WUFDWixLQUFLLEVBQUUsRUFBRTtTQUNaO0tBQ0o7SUFDRCxJQUFJLEVBQUU7UUFDRixLQUFLLEVBQUUsRUFBRTtRQUNULFVBQVUsRUFBc0IsRUFBRTtRQUNsQyxLQUFLLEVBQXNCLEVBQUU7UUFDN0IsZUFBZSxFQUFvQixFQUFFO1FBQ3JDLFVBQVUsRUFBRSxFQUFFO1FBQ2QsWUFBWSxFQUFFLEtBQUs7S0FDdEI7SUFDRCxTQUFTLEVBQUU7UUFDUCxRQUFRLEVBQUU7WUFBQSxpQkFtQlQ7WUFsQkcsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFqQixDQUFpQixDQUFDLENBQUM7WUFDdkUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7Z0JBQ2YsRUFBRSxDQUFDLFNBQVMsQ0FBQztvQkFDVCxLQUFLLEVBQUUsSUFBSTtvQkFDWCxPQUFPLEVBQUUsU0FBUztvQkFDbEIsT0FBTyxFQUFFLFVBQUMsR0FBRzt3QkFDVCxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUU7NEJBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQzt5QkFDekI7NkJBQU0sSUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFOzRCQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO3lCQUN6Qjt3QkFDRCxLQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7b0JBQ3JCLENBQUM7aUJBQ0osQ0FBQyxDQUFDO2dCQUNILE9BQU87YUFDVjtZQUNELElBQUksQ0FBQyxPQUFPLENBQUMsRUFBQyxLQUFLLE9BQUEsRUFBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzFCLENBQUM7UUFDRCxRQUFRO1FBRVIsQ0FBQztLQUNKO0lBQ0QsT0FBTyxFQUFFO1FBQ0wsU0FBUyxFQUFFO1lBQ1AsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvQixDQUFDO1FBQ0QsYUFBYSxFQUFFLFVBQVMsRUFBUTtnQkFBUCxrQkFBTTtZQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDO1FBQzdDLENBQUM7UUFDRCxZQUFZLEVBQUU7WUFDSixJQUFBLGNBQXlELEVBQXhELDBCQUFVLEVBQUUsZ0JBQUssRUFBRSxvQ0FBZSxFQUFFLG9CQUFvQixDQUFDO1lBQ3pELElBQUEsK0JBQU0sRUFBRSxtQ0FBUSxDQUFvQjtZQUMzQyxJQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUNwRCxJQUFJLEtBQUssS0FBSyxVQUFVLEVBQUU7Z0JBQ3RCLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBQyxDQUFDLENBQUM7Z0JBQzlELElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRTtvQkFDZCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7aUJBQ3pCO3FCQUFNO29CQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQ3ZCO2FBQ0o7aUJBQU07Z0JBQ0gsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUM7Z0JBQzVDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBQyxVQUFVLEVBQUUsRUFBRSxFQUFDLENBQUMsQ0FBQzthQUNsQztRQUNMLENBQUM7UUFDRCxjQUFjLEVBQUUsVUFBUyxRQUEyQjtZQUN6QyxJQUFBLHVCQUFLLENBQWM7WUFDMUIsSUFBTSxTQUFTLEdBQUcsbUJBQVksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2pELElBQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLElBQUksUUFBUSxFQUFFO2dCQUNWLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDeEI7WUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUMsVUFBVSxFQUFFLEVBQUUsRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLEtBQUssT0FBQSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO1FBQ3BGLENBQUM7UUFDRCxTQUFTLEVBQUU7WUFDQSxJQUFBLDJDQUFlLENBQWM7WUFDcEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN6QyxDQUFDO1FBQ0QsZUFBZSxFQUFFO1lBQ2IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFDLENBQUMsQ0FBQztRQUMxRCxDQUFDO0tBQ0o7Q0FFSixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAdHMtaWdub3JlXHJcbmltcG9ydCB7UXVlc3Rpb25MaXN0SXRlbSwgcmFuZG9tTnVtYmVyfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdXRpbFwiO1xyXG5cclxuQ29tcG9uZW50KHtcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBxdWVzdGlvbkxpc3Q6IHtcclxuICAgICAgICAgICAgdHlwZTogQXJyYXksXHJcbiAgICAgICAgICAgIHZhbHVlOiBbXSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldHRpbmc6IHtcclxuICAgICAgICAgICAgdHlwZTogT2JqZWN0LFxyXG4gICAgICAgICAgICB2YWx1ZToge30sXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgICAgdGl0bGU6IFwiXCIsXHJcbiAgICAgICAgb3JpZ2luTGlzdDogPFF1ZXN0aW9uTGlzdEl0ZW1bXT5bXSxcclxuICAgICAgICBxTGlzdDogPFF1ZXN0aW9uTGlzdEl0ZW1bXT5bXSxcclxuICAgICAgICBjdXJyZW50UXVlc3Rpb246IDxRdWVzdGlvbkxpc3RJdGVtPnt9LFxyXG4gICAgICAgIGlucHV0VmFsdWU6IFwiXCIsXHJcbiAgICAgICAgaXNTaG93QW5zd2VyOiBmYWxzZSxcclxuICAgIH0sXHJcbiAgICBsaWZldGltZXM6IHtcclxuICAgICAgICBhdHRhY2hlZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHFMaXN0ID0gdGhpcy5kYXRhLnF1ZXN0aW9uTGlzdC5maWx0ZXIoaXRlbSA9PiAhaXRlbS5pc1VuQ2hlY2tlZCk7XHJcbiAgICAgICAgICAgIGlmICghcUxpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiAn6K+36Iez5bCR5Yu+6YCJ5LiA5LiqJyxcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+ehruWumicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vlj5bmtognKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uVGFwTWFzaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe3FMaXN0fSk7XHJcbiAgICAgICAgICAgIHRoaXMuc3dpdGNoUXVlc3Rpb24oKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRldGFjaGVkKCkge1xyXG4gICAgICAgICAgICAvLyDlnKjnu4Tku7blrp7kvovooqvku47pobXpnaLoioLngrnmoJHnp7vpmaTml7bmiafooYxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIG1ldGhvZHM6IHtcclxuICAgICAgICBvblRhcE1hc2s6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0aGlzLnRyaWdnZXJFdmVudCgnY2xvc2UnKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uSW5wdXRBbnN3ZXI6IGZ1bmN0aW9uKHtkZXRhaWx9KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7aW5wdXRWYWx1ZTogZGV0YWlsLnZhbHVlfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvblRhcENvbmZpcm06IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb25zdCB7aW5wdXRWYWx1ZSwgcUxpc3QsIGN1cnJlbnRRdWVzdGlvbiwgc2V0dGluZ30gPSB0aGlzLmRhdGE7XHJcbiAgICAgICAgICAgIGNvbnN0IHthbnN3ZXIsIHF1ZXN0aW9ufSA9IGN1cnJlbnRRdWVzdGlvbjtcclxuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBzZXR0aW5nLmlzUmV2ZXJzZSA/IHF1ZXN0aW9uIDogYW5zd2VyO1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IGlucHV0VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7aWNvbjogXCJzdWNjZXNzXCIsIHRpdGxlOiBcIuWbnuetlOato+ehrlwiLCBkdXJhdGlvbjogNzAwfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAocUxpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zd2l0Y2hRdWVzdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWbnuetlOWujOavlVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7aWNvbjogXCJub25lXCIsIHRpdGxlOiBcIuWbnuetlOmUmeivr1wifSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe2lucHV0VmFsdWU6IFwiXCJ9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3dpdGNoUXVlc3Rpb246IGZ1bmN0aW9uKHB1c2hJdGVtPzogUXVlc3Rpb25MaXN0SXRlbSkge1xyXG4gICAgICAgICAgICBjb25zdCB7cUxpc3R9ID0gdGhpcy5kYXRhO1xyXG4gICAgICAgICAgICBjb25zdCByYW5kSW5kZXggPSByYW5kb21OdW1iZXIocUxpc3QubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNxID0gcUxpc3Quc3BsaWNlKHJhbmRJbmRleCwgMSlbMF07XHJcbiAgICAgICAgICAgIGlmIChwdXNoSXRlbSkge1xyXG4gICAgICAgICAgICAgICAgcUxpc3QucHVzaChwdXNoSXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtpbnB1dFZhbHVlOiBcIlwiLCBjdXJyZW50UXVlc3Rpb246IGNxLCBxTGlzdCwgaXNTaG93QW5zd2VyOiBmYWxzZX0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25UYXBKdW1wOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29uc3Qge2N1cnJlbnRRdWVzdGlvbn0gPSB0aGlzLmRhdGE7XHJcbiAgICAgICAgICAgIHRoaXMuc3dpdGNoUXVlc3Rpb24oY3VycmVudFF1ZXN0aW9uKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uVGFwU2hvd0Fuc3dlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7aXNTaG93QW5zd2VyOiAhdGhpcy5kYXRhLmlzU2hvd0Fuc3dlcn0pO1xyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG5cclxufSk7XHJcbiJdfQ==