function congviecsang(congviec) {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log(congviec);
            resolve();
            reject("Loi ctrinh");
        },Math.random()*100)
    })
}
async function getall(){
    try {
        await congviecsang("thuc");
        await congviecsang("danh");
        await congviecsang("hoc");
    }
    catch (err){
        console.log(err);
    }
    finally {
        console.log("hoan thanh");
    }
}
getall();
