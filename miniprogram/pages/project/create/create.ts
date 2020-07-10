import {debounce, Memory, QuestionListItem} from "../../../utils/util";

const app = getApp<IAppOption>();
Page({
    data: {
        isImport: false,
        // update: <Object | false>false,
        isUpdate: false,
        questionList: <QuestionListItem[]>[{
            question: "",
            answer: "",
            desc: "",
        }],
        title: "",
        desc: "",
        memoryObjStr: "",
    },
    // 使用原setData不会保存数据
    setState: <any>(() => 0),
    onLoad: function(options) {
        const sd = this.setData;
        this.setState = sd;
        this.setData = (...args: any[]) => {
            this.saveTempMemory();
            console.log("setData...");
            sd.apply(this, args as any);
        };

        // 判断是否编辑状态
        const type = options.type;
        if (type !== "update") {
            this.getTempMemory();
            return;
        }

        // 改标题为编辑
        wx.setNavigationBarTitle({title: "编辑"});

        const memory: Memory[] = wx.getStorageSync("memory") || [];
        const index = app.globalData.currentMemoryIndex;

        let {questionList, title} = memory[index];
        // 如果length大于5，则分批填充到data
        if (questionList.length > 5) {
            this.splitPushToData(questionList.slice(5));
            questionList = questionList.splice(0, 5);
        }
        sd.call(this, {isUpdate: true, title: title, questionList});

    },

    saveTempMemory: (function() {
        function save(this: any) {
            console.log("缓存表单...");
            const title = this.data.title;
            const questionList = this.data.questionList;
            wx.setStorage({key: "tempMemory", data: {title, questionList}});
        }

        return debounce(save, 600);
    })(),

    // 一次性填充会卡  分批填充到data的questionList
    splitPushToData: function(tempQL: QuestionListItem[]) {
        const timer = setInterval(() => {
            let questionList = this.data.questionList;
            Array.prototype.push.apply(questionList, tempQL.splice(0, 10));
            this.setState({questionList});
            if (!tempQL.length) {
                clearInterval(timer);
            }
        }, 100);
    },

    // 获取临时保存的数据
    getTempMemory: function() {
        try {
            const temp: Memory = wx.getStorageSync("tempMemory");
            if (!temp || !temp.title) return;
            let {title, questionList} = temp;
            // 如果length大于5，则分批填充到data
            if (questionList.length > 5) {
                this.splitPushToData(questionList.slice(5));
                questionList = questionList.splice(0, 5);
            }
            this.setState({title, questionList});
        } catch (e) {
            console.log("getTempMemory error", e);
        }
    },

    bindKeyInput: function(e: any) {
        const {detail, target} = e;
        const value = detail.value;
        const {index, type} = target.dataset;

        if (/item\.(\w+)/.test(type)) {
            const obj: QuestionListItem = this.data.questionList[index];
            obj[RegExp.$1 as keyof QuestionListItem] = value;
            this.setData({
                [`questionList[${index}]`]: obj,
            });
        } else {
            this.setData({[type]: value});
        }
        // this.saveTempMemory();
    },
    // 校验数据是否正确
    validate: function(title: string, questionList: QuestionListItem[]): boolean {
        // const {title, questionList} = this.data;
        if (!title) {
            wx.showToast({icon: "none", title: "标题不能为空!", duration: 3000});
            return false;
        }
        for (let i = 0; i < questionList.length; i++) {
            const item = questionList[i];
            if (!item.question) {
                wx.showToast({icon: "none", title: `问题${i + 1}不能为空!`, duration: 3000});
                return false;
            }
            if (!item.answer) {
                wx.showToast({icon: "none", title: `答案${i + 1}不能为空!`, duration: 3000});
                return false;
            }
        }
        return true;
    },
    formSubmit: function(e: any) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value);
        const {title, questionList, isUpdate} = this.data;

        if (!this.validate(title, questionList)) return;

        try {
            const key = "memory";
            const memory = wx.getStorageSync(key) || [];
            const obj = {title, questionList};
            if (isUpdate) {
                memory[app.globalData.currentMemoryIndex] = obj;
            } else {
                memory.push(obj);
            }
            wx.setStorageSync(key, memory);
            wx.showToast({icon: "success", title: `${isUpdate ? "修改" : "保存"}成功`});
            setTimeout(() => {
                wx.navigateBack();
                wx.setStorageSync("tempMemory", null);
            }, 1500);
        } catch (e) {

        }
    },

    // 重置
    formReset: function(e: any) {
        console.log('form发生了reset事件，携带数据为：', e.detail.value);
        const questionList = [{
            question: "",
            answer: "",
            desc: "",
        }];
        const title = "";
        if (this.data.isImport) {
            this.setData({
                memoryObjStr: JSON.stringify({title, questionList}),
            });
        } else {
            this.setData({
                questionList,
                title,
            });
        }
    },

    questionListAdd: function() {
        const ml = this.data.questionList;
        ml.push({
            question: "",
            answer: "",
            desc: "",
        });
        this.setData({
            questionList: ml,
        });
    },
    questionListDelete: function(e: any) {
        const {index} = e.target.dataset;
        console.log(index);

        const ml = this.data.questionList;
        ml.splice(index, 1);
        this.setData({
            questionList: ml,
        });
    },
    // 点击编辑
    memoryImport: function() {
        const {title, questionList} = this.data;
        this.setData({isImport: true, memoryObjStr: JSON.stringify({title, questionList})});
    },
    memoryExport: function() {
        const {title, questionList} = this.data;
        const fsm = wx.getFileSystemManager();

        const filePath = `${wx.env.USER_DATA_PATH}/${title}.json`;
        // 保存文档
        fsm.writeFile({
            filePath,
            data: JSON.stringify({title, questionList}),
            encoding: "utf-8",
            success() {
                wx.showToast({icon: "none", title: "保存成功"});
                // 打开文档
                wx.openDocument({filePath: filePath});
            },
            fail(res) {
                console.log(res);
                wx.showToast({icon: "none", title: "保存失败"});
            },
        });
    },

    back: function() {
        this.setData({isImport: false});
    },
    // 文件导入页的确定按钮
    confirm: function() {
        let {memoryObjStr} = this.data;
        try {
            const obj: Memory = JSON.parse(memoryObjStr);
            if (this.validate(obj.title, obj.questionList)) {
                if (obj.questionList.length > 5) {
                    this.splitPushToData(obj.questionList.slice(5));
                    obj.questionList = obj.questionList.splice(0, 5);
                }
                this.setData({isImport: false, ...obj});
            }
        } catch (e) {
            wx.showToast({icon: "none", title: "1111111"});
        }

    },
    fileImport: function() {
        // 选择文件
        wx.chooseMessageFile({
            count: 1,
            type: "file",
            extension: ["json", "txt"],
            success: (res) => {
                console.log(res.tempFiles[0]);
                // 读取文件
                wx.getFileSystemManager().readFile({
                    filePath: res.tempFiles[0].path,
                    encoding: "utf-8",
                    success: (e) => {
                        const value = e.data as string;
                        console.log("读取到文件：");
                        console.log(value);
                        try {
                            const obj: Memory = JSON.parse(value);
                            if (!value || !this.validate(obj.title, obj.questionList)) {
                                wx.showToast({icon: "none", title: "文件格式不正确"});
                                return;
                            }
                            this.setData({memoryObjStr: value});
                        } catch (e) {
                            wx.showToast({icon: "none", title: "文件格式不对"});
                        }

                    },
                });
            },
        });
    },
    onInputEdit: function(e: any) {
        const value: string = e.detail.value;
        this.setState({memoryObjStr: value});
    },
});
