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
    dateCurrent(){
        const now = new Date();
        const day = addZero(now.getDate());
        const month = addZero(now.getMonth());
        const year = now.getFullYear();
        return `${year}-${month}-${day}`;
    },
    date_hashexpired(){
        const now = new Date();
        const day = addZero(now.getDate());
        const month = addZero(now.getMonth());
        const year = now.getFullYear() + 1;
        return `${year}-${month}-${day}`;
    },
    yearCurrent(){
        const now = new Date();
        const year = now.getFullYear();
        return year;
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