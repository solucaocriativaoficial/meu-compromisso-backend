module.exports = {
    timestampCurrent(){
        const now = new Date();
        const day = addZero(now.getDate());
        const month = addZero(now.getMonth());
        const year = now.getFullYear();
        const min = addZero(now.getMinutes());
        const seg = addZero(now.getSeconds());
        const hours = addZero(now.getHours());
        return `${year}-${month}-${day} ${hours}:${min}:${seg}`;
    },
    patternBr(date_us){
        const date = new Date(date_us);
        return `${date.getDate()}-${mountMonth(date.getMonth())}-${date.getFullYear()}`;
    },
    patternUS(date_br){
        const date = new Date(date_br);
        return `${date.getFullYear()}-${mountMonth(date.getMonth())}-${date.getDate()}`;
    }
}

function addZero(value)
{
    value ++;
    return value < 10 ? `0${value}` : value;
}