function congviecsang(congviec, callback) {
    setTimeout(() => {
        console.log(congviec);
        callback();
    }, Math.random() * 100)
}

function getall() {
    congviecsang("thuc day", () => {
        congviecsang("danh rang", () => {
            congviecsang("di hoc", () => {
            });
        });
    });
}

getall();
