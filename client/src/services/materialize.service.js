import M from 'materialize-css'

export const toast = (message) => {
    return M?.toast({html: message})
}
export const modalInit = (ref, options = {}) => {
    return M?.Modal?.init(ref, options)
}
export const selectInit = (ref) => {
    return M?.FormSelect?.init(ref)
}
export const updateFields = () => {
    return M?.updateTextFields()
}