
const isAdmin = (s) => {
    // check the user is admin or not 
    // Here s is user role
    if (s === "ADMIN") {
        return true
    }

    return false
}

export default isAdmin