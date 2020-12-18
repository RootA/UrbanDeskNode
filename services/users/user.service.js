const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserModel = require('../../models/UserModel');
const { masterKey } = require('../../config/index');

async function authenticate({username, password}) {
    const user = UserModel.findOne({username});
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ sub: user.id }, masterKey, { expiresIn: '7d' });
        return {
            ...user.toJSON(),
            token
        };
    }
}
async function getAll() {
    return await UserModel.find();
}

async function findById(id) {
    return await UserModel.findById(id);
}

async function create(userParam) {
    // validate
    if (await UserModel.findOne({ user_name: userParam.user_name })) {
        throw 'Username "' + userParam.user_name + '" is already taken';
    }

    const user = new User(userParam);

    // hash the password
    if (userParam.password) {
        user.password = bcrypt.hashSync(userParam.password, 10);
    }

    // save the user
    await user.save();
}

async function update(id, userParam) {
    const user = await UserModel.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.user_name !== userParam.user_name && await User.findOne({ username: userParam.user_name })) {
        throw 'Username "' + userParam.user_name + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await UserModel.findByIdAndRemove(id);
}

module.exports = {
    authenticate,
    getAll,
    findById,

    _delete
};