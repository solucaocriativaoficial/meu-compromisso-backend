module.exports = {
    date_of_birth(content){
        const regexp = /[0-9]{4}-\[0-9]{2}-\[0-9]{2}/
        return regexp.test(content)
    },
    cpf(content){
        const regexp = /[0-9]{11}/
        return regexp.test(content)
    },
    mail(content){
        const regexp = /d*@\d*/
        return regexp.test(content)
    },
}