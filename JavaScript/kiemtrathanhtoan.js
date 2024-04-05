
function KiemTraThongTin() {
    var tendangnhap=document.getElementById("username");
        if(tendangnhap.value==""){
            alert("Vui lòng điền Họ và tên!");
            tendangnhap.focus();
            return false;
        }
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
        var input_str = document.getElementById('number').value;
        var re = /^[0-9]{10}$/;
        if (!re.test(input_str)) {
          alert('Số điện thoại phải là 10 chữ số. Vui lòng nhập lại.');
          return false;
        }
        else{
            alert('Đặt hàng thành công');
        }
        return true;
        
}
