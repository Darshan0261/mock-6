

const UserAuth = (req, res, next) => {
    const {token} = req.body;
    if(!token) {
        return res.status(404).send({message: 'Login to Continue'})
    }
    if(token.role == 'user') {
        next()
    } else {
        return res.status(401).send({message: 'Access Denied'});
    }
}

const AdminAuth = (req, res, next) => {
    const {token} = req.body;
    if(!token) {
        return res.status(404).send({message: 'Login to Continue'})
    }
    if(token.role == 'admin') {
        next()
    } else {
        return res.status(401).send({message: 'Access Denied'});
    }
}

module.exports = {
    UserAuth, AdminAuth
}