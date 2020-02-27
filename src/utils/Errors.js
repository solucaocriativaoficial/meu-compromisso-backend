module.exports = {
    errors(name_error)
    {
        if(name_error === "SequelizeUniqueConstraintError")
        {
            return { message: "Este CPF já está cadastrado!"}
        }
        else{
            return { message: "Não foi possível cadastrar!" , erro: name_error}
        }
    }
}