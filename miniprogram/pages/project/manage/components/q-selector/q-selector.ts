import {QuestionListItem} from "../../../../../utils/util";

Component({
    properties: {
        questionList: {
            type: Array,
            value: [],
        },
    },
    data: {
        qList: <QuestionListItem[]>[],
        selectCount: 0,
    },
    lifetimes: {
        attached: function() {
            this.setData({
                qList: this.data.questionList,
            });
            this.setSelectCount(this.data.questionList);
        },
        detached: function() {
            // 在组件实例被从页面节点树移除时执行
        },
    },
    observers: {
        "qList": function(a: QuestionListItem[]) {
            this.setSelectCount(a);
        },
    },
    methods: {
        setSelectCount: function(qList?: QuestionListItem[]) {
            if (!qList) qList = this.data.qList;
            const count = qList.filter(i => !i.isUnChecked).length;
            this.setData({selectCount: count});
        },
        bindCheckedChange: function(e: any) {
            const index = e.currentTarget.dataset.index;
            const {qList} = this.data;
            const currentQues = qList[index];
            currentQues.isUnChecked = !currentQues.isUnChecked;
            qList[index] = currentQues;
            this.setData({
                qList,
            });
        },
        // 全选或全不选
        onTapCheckAll: function(e: any) {
            const {qList} = this.data;
            const map = {all: false, clear: true};
            const type: keyof typeof map = e.currentTarget.dataset.type;
            const isUnChecked = map[type];
            const newList = qList.map(item => {
                const newItem = {...item};
                newItem.isUnChecked = isUnChecked;
                return newItem;
            });
            this.setData({
                qList: newList,
            });
        },
        // 选中取消已标记
        onTapSelectMark: function(e: any) {
            const {qList} = this.data;
            const map = {all: false, clear: true};
            const type: keyof typeof map = e.currentTarget.dataset.type;
            const isUnChecked = map[type];
            const newList = qList.map(item => {
                const newItem = {...item};
                if (item.isMark) {
                    newItem.isUnChecked = isUnChecked;
                }
                return newItem;
            });
            this.setData({
                qList: newList,
            });
        },
        onTapReverse: function() {
            const {qList} = this.data;
            const newList = qList.map(item => {
                const newItem = {...item};
                newItem.isUnChecked = !newItem.isUnChecked;
                return newItem;
            });
            this.setData({
                qList: newList,
            });
        },
        onOk: function() {
            // 第二个参数是detail
            this.triggerEvent("finish", this.data.qList);
            this.onBack();
        },
        onBack: function() {
            this.triggerEvent("close");
        },
    },
});
