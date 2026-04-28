const {error} = require('console');
const fs = require('fs');

function readFilePromise(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf-8', (err, value) => {
            if (err) {
                reject(err);
            } else {
                resolve(value);
            }
        })
    });
}

Promise.all([
    readFilePromise('./Chuong03/file1.txt'),
    readFilePromise('./Chuong03/file2.txt')
])
    .then((value) => {
        console.log(value)
    })
    .catch((error) => {
        console.log(error);
    })
