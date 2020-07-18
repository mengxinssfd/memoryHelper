// @ts-ignore
import {PlaySetting, QuestionListItem, randomNumber} from "../../../utils/util";

Component({
    properties: {
        questionList: {
            type: Array,
            value: [],
        },
        setting: {
            type: Object,
            value: <PlaySetting>{},
        },
    },
    data: {
        title: "",
        qList: <QuestionListItem[]>[],
        currentQuestion: <QuestionListItem>{},
        inputValue: "",
        isShowAnswer: false,
        // 回答正确时去掉勾选
        isRightRemove: false,
    },
    lifetimes: {
        attached: function() {
            this.init();
        },
        detached: function() {
            // 在组件实例被从页面节点树移除时执行
            this.onHide();
        },
    },
    pageLifetimes: {
        hide: function() {
            // this.onHide()
        },
    },
    methods: {
        init: function(): boolean {
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
                return false;
            }
            this.setData({qList}, () => {
                this.switchQuestion();
            });
            return true;
        },
        // 勾选答对移除提交事件
        onHide() {
            // 应该判断是否有不一样的才触发finish事件,这里每次移除时都会触发
            this.triggerEvent("finish", this.data.questionList);
        },
        onTapMask: function() {
            this.triggerEvent('close');
        },
        onTapConfirm: function() {
            let {inputValue, qList, currentQuestion, setting, isRightRemove} = this.data;
            const {answer, question} = currentQuestion;
            let value = setting.isReverse ? question : answer;
            // 忽略大小写
            if (setting.ignoreUpLow) {
                value = value.toLowerCase();
                inputValue = inputValue.toLowerCase();
            }
            if (value === inputValue) {
                wx.showToast({icon: "success", title: "回答正确", duration: 700});
                // 如果勾选答对移除的话
                if (isRightRemove) {
                    const {questionList} = this.data;
                    const index = questionList.findIndex(item => item.question === question);
                    currentQuestion.isUnChecked = true;
                    questionList[index] = currentQuestion;
                    /*this.setData({questionList}, () => {
                        this.init();
                    });
                     */
                    if (!this.init()) {
                        return;
                    }
                }
                if (qList.length) {
                    this.switchQuestion();
                } else {
                    console.log("回答完毕");
                    wx.showModal({
                        title: "提示",
                        content: "是否重来？",
                        success: () => {
                            this.init();
                        },
                    });
                }
            } else {
                wx.showToast({icon: "none", title: "回答错误"});
                this.setData({inputValue: ""});
            }
        },
        switchQuestion: function(pushItem?: QuestionListItem) {
            const {qList} = this.data;
            const randIndex = randomNumber(qList.length - 1);
            if (!qList.length) {
                wx.showToast({icon: "none", title: "没有可切换的问题"});
                return;
            }
            const cq = qList.splice(randIndex, 1)[0];
            // 补上去
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
