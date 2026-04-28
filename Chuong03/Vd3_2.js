function congviecsang(congviec){
    setTimeout(()=>{
        console.log(congviec);
    }, Math.random()*100)
}
function getall(){
    congvíecsang("thuc day");
    congvíecsang("danh rang");
    congvíecsang("di hoc");
}
getall();
