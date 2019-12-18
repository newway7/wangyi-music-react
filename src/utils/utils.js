export function playCountConversion(playCount) {
    let calculationNum;
    calculationNum = parseInt(playCount / 10000);
    if (calculationNum < 1) {
        return playCount;
    }
    if (calculationNum > 10000) {
        return parseInt(calculationNum / 10000) + "亿";
    }
    return calculationNum + "万";
}

export function timeConversion(time) {
    let timeInteger = parseInt(time);
    let timeArr = [0, 0, 0, 0];

    timeArr[0] = parseInt(timeInteger / 60 / 10);
    timeArr[1] = (parseInt(timeInteger / 60)) % 10;
    timeArr[2] = parseInt((timeInteger % 60) / 10);
    timeArr[3] = (timeInteger % 60) % 10;

    return `${timeArr[0]}${timeArr[1]}:${timeArr[2]}${timeArr[3]}`;
    
}