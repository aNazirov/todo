module.exports = e => {
    const errors = {}
    Object.keys(e).forEach(key => errors[key] = e[key].message)
    return errors
}