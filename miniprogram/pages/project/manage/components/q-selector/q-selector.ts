import {QuestionListItem} from "../../../../../utils/util";

Component({
    properties: {
        questionList: {
            type: Array,
            value: []
        }
    },
    data: {
        qList: <QuestionListItem[]>[]
    },
    lifetimes: {
        attached: function() {
            this.setData({
                qList: this.data.questionList
            });
        },
        detached: function() {
            // 在组件实例被从页面节点树移除时执行
        },
    },
    methods: {
        bindCheckedChange: function(e: any) {
            const index = e.currentTarget.dataset.index;
            const {qList} = this.data;
            const currentQues = qList[index];
            currentQues.isUnChecked = !currentQues.isUnChecked;
            this.setData({
                [`qList[${index}]`]: currentQues
            });
        },
        // 全选或全不选
        bindCheckAll: function(e: any) {
            const {qList} = this.data;
            const map = {all: false, clear: true};
            const type: keyof typeof map = e.currentTarget.dataset.type;
            const isUnChecked = map[type];
            qList.forEach(item => {
                item.isUnChecked = isUnChecked;
            });
            this.setData({
                qList
            });
        },
        onOk: function() {
            // 第二个参数是detail
            this.triggerEvent("finish", this.data.qList);
            this.onBack();
        },
        onBack: function() {
            this.triggerEvent("close");
        }
    }
});
