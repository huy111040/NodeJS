const mongoose = require('mongoose');

// Kết nối không cần options cũ nữa
mongoose.connect('mongodb://localhost:27017/Vd6_2')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Connection error:', err));

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    fullname: String,
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

const UserModel = mongoose.model('users', UserSchema);  // collection tên 'users'

// Hàm tìm user nam
const findMaleUsers = async () => {
    try {
        const users = await UserModel.find({ gender: 'male' });
        console.log('Những người dùng là Nam (male):', users);
    } catch (err) {
        console.error('Lỗi khi tìm:', err);
    }
};

// Chạy hàm
findMaleUsers();
