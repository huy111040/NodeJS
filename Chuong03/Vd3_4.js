function congviecsang(congviec) {
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            console.log(congviec);
        }, Math.random() * 100)
    })

}
function getall(){
    congviecsang("thuc day")
        .then(()=>congviecsang("danh rang"))
        .then(()=>congviecsang("di hoc"))
        .catch(error =>{
            console.log(error)
        });
}
getall()
