const models = require('../models');

const { Account } = models;

const getInfo = (request, response)=> {
    const req = request;
    const res = response;

    return Account.AccountModel.findByUsername(req.session.account.username, (err, doc) => {
        if (err || !doc) {
            return res.status(401).json({ error: 'Username not found' });
        }
        return res.json(doc);
        
    });
};


const updateUser = (request, response)=> {
    const req = request;
    const res = response;

    return Account.AccountModel.updateUser(req.body._id, req.body, (res) => {
        if (res.error) {
            res.status(400).json({error: `Could Not Update User ${req.body.username}`});
        }
        return res.status(204).json({res});
    });
};

module.exports = {
    getInfo,
    updateUser
};