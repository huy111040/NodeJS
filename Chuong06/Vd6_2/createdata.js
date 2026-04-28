const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Vd6_2')

const UserSchema = mongoose.Schema({
    email: String,
    password: String,
    fullName: String,
    gender: {
        type: String,
        enum: ['male', 'female', 'other']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    note: String
});

const UserModel = mongoose.model('User', UserSchema);

const createUser =  () => {
    const newUser = new UserModel({
        email: "abc@gmail.com",
        password: "123456",
        fullname: "Abc",
        gender: "male"
    });
    try {
        newUser.save()
        console.log('Tạo người dùng thành công');
    }catch (err) {
        console.error('Lỗi tạo người dùng:', err);
    }
}
createUser();
