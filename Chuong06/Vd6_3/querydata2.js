const mongoose = require('mongoose');

// Kết nối MongoDB (không cần useNewUrlParser nữa ở phiên bản mới)
mongoose.connect('mongodb://localhost:27017/Vd6_2')
    .then(() => console.log('Kết nối MongoDB thành công!'))
    .catch(err => console.error('Lỗi kết nối:', err));

// Định nghĩa Schema cho collection 'users'
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    fullname: String,
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    note: String,
});

// Tạo Model (collection tên 'users')
const UserModel = mongoose.model('users', UserSchema);

// Hàm tìm user nữ có email cụ thể (dùng $or như code gốc)
const findUser2 = async () => {
    try {
        const userFind = await UserModel.find({
            $or: [
                { gender: 'female' },
                { email: 'khuongdx@gmail.com' }
            ]
        });

        console.log('Find user 2 (nữ hoặc email khuongdx@gmail.com):', userFind);

        // Nếu muốn hiển thị đẹp hơn:
        if (userFind.length === 0) {
            console.log('Không tìm thấy user nào thỏa mãn điều kiện.');
        } else {
            userFind.forEach((user, index) => {
                console.log(`User ${index + 1}:`);
                console.log('  - Email:', user.email);
                console.log('  - Gender:', user.gender);
                console.log('  - Fullname:', user.fullname || 'Không có');
                console.log('---');
            });
        }
    } catch (err) {
        console.error('Lỗi khi tìm kiếm:', err);
    }
};

// Gọi hàm để chạy
findUser2();
