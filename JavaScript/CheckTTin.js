
function KiemTraThongTin() {
    
    var email=window.document.dangky.email;
    re=/\w+@\w+\.\w+/;
    if(email.value=="") {
        alert("Bạn chưa nhập Email.");
        email.focus();
        return false;
    }
    else
        if(re.test(email.value)==false) {
            alert("Email không đúng định dạng!");
            email.focus();
            return false;
        }
    var tendangnhap=document.getElementById("username");
        if(tendangnhap.value==""){
            alert("Vui lòng điền tên đăng nhập");
            tendangnhap.focus();
            return false;
        }
    var matkhau=document.getElementById("password");
        if(matkhau.value==""){
            alert("Xin vui lòng nhập mật khẩu");
            matkhau.focus();
            return false;
        }  
        else{
            alert("Đăng ký thành công!Xin chúc mừng")
            return true;
        }
}
