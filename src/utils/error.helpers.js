class CustomError extends Error{
    constructor(error){
        super()
        this.name = error.name,
        this.status = error.status,
        this.message = error.message,
        this.code = error.code,
        this.field = error.field
    }
}

module.exports = CustomError