// @ts-ignore
import {QuestionListItem, randomNumber} from "../../../utils/util";

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
        originList: <QuestionListItem[]>[],
        qList: <QuestionListItem[]>[],
        currentQuestion: <QuestionListItem>{},
        inputValue: "",
        isShowAnswer: false,
    },
    lifetimes: {
        attached: function() {
            const qList = this.data.questionList.filter(item => !item.isUnChecked);
            if (!qList.length) {
                wx.showModal({
                    title: '提示',
                    content: '请至少勾选一个',
                    success: (res) => {
                        if (res.confirm) {
                            console.log('用户点击确定');
                        } else if (res.cancel) {
                            console.log('用户点击取消');
                        }
                        this.onTapMask();
                    },
                });
                return;
            }
            this.setData({qList});
            this.switchQuestion();
        },
        detached() {
            // 在组件实例被从页面节点树移除时执行
        },
    },
    methods: {
        onTapMask: function() {
            this.triggerEvent('close');
        },
        onInputAnswer: function({detail}) {
            this.setData({inputValue: detail.value});
        },
        onTapConfirm: function() {
            const {inputValue, qList, currentQuestion, setting} = this.data;
            const {answer, question} = currentQuestion;
            const value = setting.isReverse ? question : answer;
            if (value === inputValue) {
                wx.showToast({icon: "success", title: "回答正确", duration: 700});
                if (qList.length) {
                    this.switchQuestion();
                } else {
                    console.log("回答完毕");
                }
            } else {
                wx.showToast({icon: "none", title: "回答错误"});
                this.setData({inputValue: ""});
            }
        },
        switchQuestion: function(pushItem?: QuestionListItem) {
            const {qList} = this.data;
            const randIndex = randomNumber(qList.length - 1);
            const cq = qList.splice(randIndex, 1)[0];
            if (pushItem) {
                qList.push(pushItem);
            }
            this.setData({inputValue: "", currentQuestion: cq, qList, isShowAnswer: false});
        },
        onTapJump: function() {
            const {currentQuestion} = this.data;
            this.switchQuestion(currentQuestion);
        },
        onTapShowAnswer: function() {
            this.setData({isShowAnswer: !this.data.isShowAnswer});
        },
    },

});
