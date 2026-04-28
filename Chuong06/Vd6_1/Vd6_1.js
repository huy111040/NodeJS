let mongoose = require('mongoose');

const mongodb_url = 'mongodb://localhost:27017/test';

mongoose.connect(mongodb_url)
    .then(() => {
        console.log('Kết nối thành công');
    })
    .catch((err) => {
        console.error('Lỗi kết nối:', err);
    })
