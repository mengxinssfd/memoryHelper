export function formatTime(date: Date, format: string = "yyyy-MM-dd hh:mm:ss"): string {
    let obj: any = {
        "y+": date.getFullYear(),
        "M+": date.getMonth() + 1,                    //月份
        "d+": date.getDate(),                         //日
        "h+": date.getHours(),                        //小时
        "m+": date.getMinutes(),                      //分
        "s+": date.getSeconds(),                      //秒
    };
    for (let k in obj) {
        if (new RegExp("(" + k + ")").test(format)) {
            const s1 = RegExp.$1;
            let value = strPadStart(String(obj[k]), s1.length, "0");
            value = value.substr(value.length - s1.length);
            format = format.replace(s1, value);
        }
    }
    return format;
}

// 比较两个日期相差年天时分秒  用于倒计时等
export function dateDiff(start: Date, end: Date, format: string = "y年d天 h时m分s秒"): string {
    const seconds = ~~((end.getTime() - start.getTime()) / 1000);
    const obj: { [k: string]: number } = {
        "s+": seconds % 60,
        "m+": ~~(seconds / 60) % 60,
        "h+": ~~(seconds / (60 * 60)) % 24,
        "d+": (function(): number {
            const day = ~~(seconds / (60 * 60 * 24));
            // 如果要显示年，则把天余年，否则全部显示天
            // 默认一年等于365天
            return /y+/.test(format) ? day % 365 : day;
        })(),
        // "M+": 0,
        "y+": ~~(seconds / (60 * 60 * 24 * 365)),
    };

    for (let k in obj) {
        if (new RegExp("(" + k + ")").test(format)) {
            const s1 = RegExp.$1;
            const v = obj[k];
            let value = strPadStart(String(v), s1.length, "0");
            // substring(start,end) start小于0的时候为0  substr(from,len)from小于0的时候为字符串的长度+from
            value = value.substring(value.length - s1.length); //手动切割00:00 m:s "00".length - "s".length，因为strPadStart当字符串长度大于length的话不会切割
            format = format.replace(s1, value);
        }
    }
    return format;
}

/**
 * 给长度不满足要求的字符串添加前缀 strFillPrefix
 * @param target
 * @param len
 * @param fill
 */
export function strPadStart(target: string, len: number, fill: string): string {
    if (target.length >= len) return target;
    const lessLen = len - target.length;
    while (fill.length < lessLen) {
        fill += fill;
    }
    fill = fill.substr(0, lessLen);
    return fill + target;
}

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

/**
 * 生成不重复的字符串
 * @param length
 * @returns {string}
 */
export function getUUID(length: number): string {
    const uuidArr: string[] = [];
    const hexDigits = "0123456789abcdef";
    for (let i = 0; i < length; i++) {
        uuidArr[i] = hexDigits.substr(Math.random() * 0x10, 1);
    }
    uuidArr[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    uuidArr[19] = hexDigits.substr(((uuidArr[19] as any) & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01

    return uuidArr.join("");
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
    desc?: string,
    questionList: QuestionListItem[],
    createTime: string,
    updateTime: string,
    uuid: string,
}

export interface PlaySetting {
    canJump: boolean,
    canShowAnswer: boolean,
    isReverse: boolean,
    time?: number,
    totalTime?: number,
    // 忽略大小写
    ignoreUpLow: boolean,
}