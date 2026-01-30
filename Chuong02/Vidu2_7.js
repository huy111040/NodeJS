const http = require('http');
const os = require('os');
const { writeFileSync, existsSync, mkdirSync } = require('fs');
const events = require('events');
const eventEmitter = new events.EventEmitter();

const hostname = '127.0.0.1';
const port = 3000;

// 1. CHUẨN BỊ DỮ LIỆU (Bổ sung CPU và tính toán RAM)
const cpuModel = os.cpus()[0].model;
const totalMem = os.totalmem();
const freeMem = os.freemem();
const usedMem = totalMem - freeMem;

// Hàm hỗ trợ đổi Byte sang GB cho dễ đọc
const toGB = (bytes) => (bytes / (1024 ** 3)).toFixed(2) + " GB";

const noidung = `
- Hệ điều hành: ${os.type()} (${os.platform()})
- Cấu hình CPU: ${cpuModel}
- Tổng dung lượng RAM: ${toGB(totalMem)}
- RAM đã sử dụng (USED RAM): ${toGB(usedMem)}
- RAM còn trống: ${toGB(freeMem)}
`;

// 2. TẠO SERVER ĐỂ IN RA TRÌNH DUYỆT
const server = http.createServer((req, res) => {
    // Thêm charset=utf-8 để trình duyệt hiển thị được tiếng Việt có dấu
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.write('--- THÔNG TIN CẤU HÌNH MÁY TÍNH ---');
    res.end(noidung);
});

// 3. GHI FILE VÀ EMIT EVENT
const folderPath = 'D:\\CNTT';
const filePath = 'D:\\CNTT\\NodeJS\\Chuong02\\file2_7.txt';

try {
    // Kiểm tra nếu thư mục D:\Homework chưa tồn tại thì tạo mới để tránh lỗi
    if (!existsSync(folderPath)) {
        mkdirSync(folderPath, { recursive: true });
    }

    // Ghi file
    writeFileSync(filePath, 'Dữ liệu hệ thống:\n' + noidung);

    // Thiết lập sự kiện (nên đăng ký listener TRƯỚC khi emit)
    eventEmitter.on('taskFinished', () => {
        console.log('Completed task!');
    });

    // Phát sự kiện
    eventEmitter.emit('taskFinished');

} catch (err) {
    console.error("Lỗi trong quá trình xử lý file: ", err.message);
}

// 4. LẮNG NGHE SERVER
server.listen(port, hostname, () => {
    console.log(`Server đang chạy tại http://${hostname}:${port}/`);
});
