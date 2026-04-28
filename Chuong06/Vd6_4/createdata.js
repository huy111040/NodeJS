const mongoose = require('mongoose');

// Kết nối MongoDB (không cần useNewUrlParser ở phiên bản mới)
mongoose.connect('mongodb://localhost:27017/Vd6_4')
    .then(() => console.log('Kết nối MongoDB thành công!'))
    .catch(err => console.error('Lỗi kết nối:', err));

// Định nghĩa Schema cho collection 'players'
const PlayerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
}, {
    collection: 'users'  // chỉ định rõ tên collection
});

// Tạo Model
const PlayerModel = mongoose.model('players', PlayerSchema);

// Hàm thêm dữ liệu mẫu (chạy 1 lần để insert)
const insertSamplePlayers = async () => {
    try {
        // Xóa dữ liệu cũ nếu muốn (tùy chọn, comment nếu không cần)
        // await PlayerModel.deleteMany({});

        const playersData = [
            { name: 'Khương', country: 'Việt Nam', age: 41 },          // bạn tự thêm
            { name: 'Neymar', country: 'Brazil', age: 33 },
            { name: 'Mbappé', country: 'France', age: 26 },
            { name: 'Hazard', country: 'Belgium', age: 34 },
            { name: 'Modrić', country: 'Croatia', age: 40 },
            { name: 'Messi', country: 'Argentina', age: 37 },
            { name: 'Icardi', country: 'Argentina', age: 32 },
            { name: 'Griezmann', country: 'France', age: 34 },
        ];

        // Insert nhiều document cùng lúc (hiệu quả hơn save từng cái)
        const inserted = await PlayerModel.insertMany(playersData);

        console.log('Đã thêm thành công', inserted.length, 'cầu thủ:');
        inserted.forEach(p => {
            console.log(`- ${p.name} (${p.country}, ${p.age} tuổi)`);
        });

    } catch (err) {
        console.error('Lỗi khi thêm dữ liệu:', err);
    }
};

// Chạy hàm thêm dữ liệu (chỉ cần chạy 1 lần, sau đó comment lại nếu không muốn thêm nữa)
insertSamplePlayers();

// Export Model để dùng ở các file khác
module.exports = PlayerModel;

// Nếu bạn muốn test ngay trong file này, uncomment dòng dưới
// insertSamplePlayers();
