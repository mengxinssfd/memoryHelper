"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatTime = function (date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    return ([year, month, day].map(formatNumber).join('/') +
        ' ' +
        [hour, minute, second].map(formatNumber).join(':'));
};
var formatNumber = function (n) {
    var s = n.toString();
    return s[1] ? s : '0' + s;
};
function debounce(callback, delay) {
    var timer = null;
    return function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(function () {
            timer = null;
            callback.apply(_this, args);
        }, delay);
    };
}
exports.debounce = debounce;
function forEachByLen(len, callback) {
    for (var i = 0; i < len; i++) {
        if (callback(i) !== false)
            continue;
        break;
    }
}
exports.forEachByLen = forEachByLen;
function randomNumber(start, end, length) {
    if (!arguments.length)
        return Math.random();
    if (arguments.length === 1) {
        end = start;
        start = 0;
    }
    if (length === undefined) {
        var len = end - start + 1;
        return ~~(Math.random() * len) + start;
    }
    else {
        var arr_1 = [];
        forEachByLen(length, function () { return arr_1.push(randomNumber(start, end)); });
        return arr_1;
    }
}
exports.randomNumber = randomNumber;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBYSxRQUFBLFVBQVUsR0FBRyxVQUFDLElBQVU7SUFDakMsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2hDLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDbEMsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzNCLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM3QixJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDakMsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBRWpDLE9BQU8sQ0FDSCxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDOUMsR0FBRztRQUNILENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUNyRCxDQUFDO0FBQ04sQ0FBQyxDQUFDO0FBRUYsSUFBTSxZQUFZLEdBQUcsVUFBQyxDQUFTO0lBQzNCLElBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN2QixPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0FBQzlCLENBQUMsQ0FBQztBQUVGLFNBQWdCLFFBQVEsQ0FBQyxRQUFrQyxFQUFFLEtBQWE7SUFDdEUsSUFBSSxLQUFLLEdBQVEsSUFBSSxDQUFDO0lBQ3RCLE9BQU87UUFBQSxpQkFTTjtRQVQwQixjQUFjO2FBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztZQUFkLHlCQUFjOztRQUNyQyxJQUFJLEtBQUssRUFBRTtZQUNQLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwQixLQUFLLEdBQUcsSUFBSSxDQUFDO1NBQ2hCO1FBQ0QsS0FBSyxHQUFHLFVBQVUsQ0FBQztZQUNmLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDYixRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvQixDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDZCxDQUFDLENBQUM7QUFDTixDQUFDO0FBWkQsNEJBWUM7QUFHRCxTQUFnQixZQUFZLENBQUMsR0FBVyxFQUFFLFFBQXdDO0lBQzlFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDMUIsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSztZQUFFLFNBQVM7UUFDcEMsTUFBTTtLQUNUO0FBQ0wsQ0FBQztBQUxELG9DQUtDO0FBVUQsU0FBZ0IsWUFBWSxDQUFDLEtBQVcsRUFBRSxHQUFTLEVBQUUsTUFBWTtJQUU3RCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU07UUFBRSxPQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUU1QyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ3hCLEdBQUcsR0FBRyxLQUFLLENBQUM7UUFDWixLQUFLLEdBQUcsQ0FBQyxDQUFDO0tBQ2I7SUFHRCxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7UUFDdEIsSUFBTSxHQUFHLEdBQUksR0FBYyxHQUFJLEtBQWdCLEdBQUcsQ0FBQyxDQUFDO1FBQ3BELE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFJLEtBQWdCLENBQUM7S0FDdEQ7U0FBTTtRQUVILElBQU0sS0FBRyxHQUFhLEVBQUUsQ0FBQztRQUN6QixZQUFZLENBQUMsTUFBTSxFQUFFLGNBQU0sT0FBQSxLQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBbEMsQ0FBa0MsQ0FBQyxDQUFDO1FBQy9ELE9BQU8sS0FBRyxDQUFDO0tBQ2Q7QUFDTCxDQUFDO0FBbkJELG9DQW1CQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBmb3JtYXRUaW1lID0gKGRhdGU6IERhdGUpID0+IHtcbiAgICBjb25zdCB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgIGNvbnN0IG1vbnRoID0gZGF0ZS5nZXRNb250aCgpICsgMTtcbiAgICBjb25zdCBkYXkgPSBkYXRlLmdldERhdGUoKTtcbiAgICBjb25zdCBob3VyID0gZGF0ZS5nZXRIb3VycygpO1xuICAgIGNvbnN0IG1pbnV0ZSA9IGRhdGUuZ2V0TWludXRlcygpO1xuICAgIGNvbnN0IHNlY29uZCA9IGRhdGUuZ2V0U2Vjb25kcygpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgW3llYXIsIG1vbnRoLCBkYXldLm1hcChmb3JtYXROdW1iZXIpLmpvaW4oJy8nKSArXG4gICAgICAgICcgJyArXG4gICAgICAgIFtob3VyLCBtaW51dGUsIHNlY29uZF0ubWFwKGZvcm1hdE51bWJlcikuam9pbignOicpXG4gICAgKTtcbn07XG5cbmNvbnN0IGZvcm1hdE51bWJlciA9IChuOiBudW1iZXIpID0+IHtcbiAgICBjb25zdCBzID0gbi50b1N0cmluZygpO1xuICAgIHJldHVybiBzWzFdID8gcyA6ICcwJyArIHM7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZGVib3VuY2UoY2FsbGJhY2s6ICguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZCwgZGVsYXk6IG51bWJlcikge1xuICAgIGxldCB0aW1lcjogYW55ID0gbnVsbDtcbiAgICByZXR1cm4gZnVuY3Rpb24odGhpczogYW55LCAuLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICBpZiAodGltZXIpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICAgICAgICB0aW1lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRpbWVyID0gbnVsbDtcbiAgICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICB9LCBkZWxheSk7XG4gICAgfTtcbn1cblxuLy8g5Luj5pu/Zm9y5b6q546vXG5leHBvcnQgZnVuY3Rpb24gZm9yRWFjaEJ5TGVuKGxlbjogbnVtYmVyLCBjYWxsYmFjazogKGluZGV4OiBudW1iZXIpID0+IGFueSB8IGZhbHNlKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAoY2FsbGJhY2soaSkgIT09IGZhbHNlKSBjb250aW51ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxufVxuXG4vLyBzdGFydCBlbmTpg73kuI3kvKAgIHJldHVybiBNYXRoLnJhbmRvbSgpXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9tTnVtYmVyKCk6IG51bWJlclxuLy8gc3RhcnQgPSAwIOeUn+aIkDAtZW5k5LmL6Ze055qE6ZqP5py65pWwXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9tTnVtYmVyKGVuZDogbnVtYmVyKTogbnVtYmVyXG4vLyDnlJ/miJBzdGFydOWIsGVuZOS5i+mXtOeahOmaj+acuuaVsCDljIXlkKtzdGFydOS4jmVuZFxuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbU51bWJlcihzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlcik6IG51bWJlclxuLy8g55Sf5oiQc3RhcnTliLBlbmTkuYvpl7TnmoTpmo/mnLrmlbDnu4Qg5YyF5ZCrc3RhcnTkuI5lbmQgbGVuZ3Ro77ya5pWw57uE6ZW/5bqmXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9tTnVtYmVyKHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyLCBsZW5ndGg6IG51bWJlcik6IG51bWJlcltdXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9tTnVtYmVyKHN0YXJ0PzogYW55LCBlbmQ/OiBhbnksIGxlbmd0aD86IGFueSkge1xuICAgIC8vIHJhbmRvbU51bWJlcigpXG4gICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gTWF0aC5yYW5kb20oKTtcbiAgICAvLyByYW5kb21OdW1iZXIoZW5kKVxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGVuZCA9IHN0YXJ0O1xuICAgICAgICBzdGFydCA9IDA7XG4gICAgfVxuXG4gICAgLy8gcmFuZG9tTnVtYmVyKHN0YXJ0LCBlbmQpXG4gICAgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnN0IGxlbiA9IChlbmQgYXMgbnVtYmVyKSAtIChzdGFydCBhcyBudW1iZXIpICsgMTtcbiAgICAgICAgcmV0dXJuIH5+KE1hdGgucmFuZG9tKCkgKiBsZW4pICsgKHN0YXJ0IGFzIG51bWJlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gcmFuZG9tTnVtYmVyKHN0YXJ0LCBlbmQsIGxlbmd0aClcbiAgICAgICAgY29uc3QgYXJyOiBudW1iZXJbXSA9IFtdO1xuICAgICAgICBmb3JFYWNoQnlMZW4obGVuZ3RoLCAoKSA9PiBhcnIucHVzaChyYW5kb21OdW1iZXIoc3RhcnQsIGVuZCkpKTtcbiAgICAgICAgcmV0dXJuIGFycjtcbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUXVlc3Rpb25MaXN0SXRlbSB7XG4gICAgcXVlc3Rpb246IHN0cmluZyxcbiAgICBhbnN3ZXI6IHN0cmluZyxcbiAgICBkZXNjPzogc3RyaW5nLFxuICAgIGlzVW5DaGVja2VkPzogYm9vbGVhbixcbiAgICBpc01hcms/OiBib29sZWFuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWVtb3J5IHtcbiAgICB0aXRsZTogc3RyaW5nLFxuICAgIGRlc2M6IHN0cmluZyxcbiAgICBxdWVzdGlvbkxpc3Q6IFF1ZXN0aW9uTGlzdEl0ZW1bXVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBsYXlTZXR0aW5nIHtcbiAgICBjYW5KdW1wOiBib29sZWFuLFxuICAgIGNhblNob3dBbnN3ZXI6IGJvb2xlYW4sXG4gICAgaXNSZXZlcnNlOiBib29sZWFuLFxuICAgIHRpbWU/OiBudW1iZXIsXG4gICAgdG90YWxUaW1lPzogbnVtYmVyLFxufSJdfQ==