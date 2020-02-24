module.exports = {
    timestampCurrent(){
        const now = new Date();
        const day = now.getDate();
        const month = now.getMonth() < 10 ? `0${now.getMonth()}` : now.getMonth();
        const year = now.getFullYear();
        const min = now.getMinutes();
        const seg = now.getSeconds();
        const hours = now.getHours()
        //return `${year}-${month}-${day} ${hours}:${min}:${seg}`;
        return '2020-02-23 18:40:00';
    }
}