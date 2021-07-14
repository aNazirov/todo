module.exports = (res, error, status = 500)=>{
    res.status(status).json({
        status: 'error',
        message: error.message ? error.message : error
    })
}