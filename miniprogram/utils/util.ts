export const formatTime = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return (
        [year, month, day].map(formatNumber).join('/') +
        ' ' +
        [hour, minute, second].map(formatNumber).join(':')
    );
};

const formatNumber = (n: number) => {
    const s = n.toString();
    return s[1] ? s : '0' + s;
};

export function debounce(callback: (...args: any[]) => void, delay: number) {
    let timer: any = null;
    return function(this: any, ...args: any[]) {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(() => {
            timer = null;
            callback.apply(this, args);
        }, delay);
    };
}

// 代替for循环
export function forEachByLen(len: number, callback: (index: number) => any | false) {
    for (let i = 0; i < len; i++) {
        if (callback(i) !== false) continue;
        break;
    }
}

// start end都不传  return Math.random()
export function randomNumber(): number
// start = 0 生成0-end之间的随机数
export function randomNumber(end: number): number
// 生成start到end之间的随机数 包含start与end
export function randomNumber(start: number, end: number): number
// 生成start到end之间的随机数组 包含start与end length：数组长度
export function randomNumber(start: number, end: number, length: number): number[]
export function randomNumber(start?: any, end?: any, length?: any) {
    // randomNumber()
    if (!arguments.length) return Math.random();
    // randomNumber(end)
    if (arguments.length === 1) {
        end = start;
        start = 0;
    }

    // randomNumber(start, end)
    if (length === undefined) {
        const len = (end as number) - (start as number) + 1;
        return ~~(Math.random() * len) + (start as number);
    } else {
        // randomNumber(start, end, length)
        const arr: number[] = [];
        forEachByLen(length, () => arr.push(randomNumber(start, end)));
        return arr;
    }
}

export interface QuestionListItem {
    question: string,
    answer: string,
    desc?: string,
    isUnChecked?: boolean,
    isMark?: boolean
}

export interface Memory {
    title: string,
    desc: string,
    questionList: QuestionListItem[]
}

export interface PlaySetting {
    canJump: boolean,
    canShowAnswer: boolean,
    isReverse: boolean,
    time?: number,
    totalTime?: number,
}