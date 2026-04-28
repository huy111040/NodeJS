const mongoose = require('mongoose');

// Kết nối MongoDB (phiên bản mới không cần useNewUrlParser)
mongoose.connect('mongodb://localhost:27017/Vd6_5')
    .then(() => console.log('Kết nối MongoDB thành công!'))
    .catch(err => console.error('Lỗi kết nối:', err));

// Định nghĩa Schema cho collection 'users'
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,  // tránh trùng email
    },
    age: {
        type: Number,
        required: true,
        min: 0,
    },
}, {
    collection: 'users'  // chỉ định rõ tên collection
});

// Tạo Model
const UserModel = mongoose.model('users', UserSchema);

// Hàm thêm dữ liệu mẫu (chạy 1 lần để insert)
const insertSampleUsers = async () => {
    try {
        // Optional: Xóa dữ liệu cũ nếu muốn reset (comment nếu không cần)
        // await UserModel.deleteMany({});

        const usersData = [
            { name: 'Khương', email: 'khuongdx@gmail.com', age: 41 },
            { name: 'Nayma', email: 'nayma@example.com', age: 25 },
            { name: 'Lan', email: 'lan.nguyen@gmail.com', age: 28 },
            { name: 'Minh', email: 'minh.dev@yahoo.com', age: 32 },
        ];

        // Insert nhiều cùng lúc (hiệu quả hơn save từng cái)
        const inserted = await UserModel.insertMany(usersData);

        console.log('Đã thêm thành công', inserted.length, 'người dùng:');
        inserted.forEach(user => {
            console.log(`- ${user.name} (${user.email}, ${user.age} tuổi)`);
        });

    } catch (err) {
        if (err.code === 11000) {
            console.log('Một số email đã tồn tại (duplicate), bỏ qua insert lặp.');
        } else {
            console.error('Lỗi khi thêm dữ liệu:', err);
        }
    }
};

// Chạy hàm insert (chỉ cần chạy 1 lần, sau comment lại nếu không muốn thêm nữa)
// insertSampleUsers();

// Export Model để dùng ở các file query khác
module.exports = UserModel;

// Nếu muốn test ngay trong file này, uncomment dòng dưới
insertSampleUsers();
