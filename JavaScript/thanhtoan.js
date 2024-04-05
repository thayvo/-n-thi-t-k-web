$(document).ready(function() {
    // Dữ liệu tĩnh cho tỉnh/thành phố, quận/huyện và xã/thị trấn
    var provinces = ["Hà Nội", "Hồ Chí Minh", "Bình Dương"];
    var districts = {
      "Hà Nội": {
        "Ba Đình": ["Phường Cống Vị", "Phường Điện Biên", "Phường Đội Cấn", "Phường Giảng Võ", "Phường Kim Mã", "Phường Liễu Giai", "Phường Ngọc Hà", "Phường Ngọc Khánh", "Phường Nguyễn Trung Trực", "Phường Phúc Xá", "Phường Quán Thánh", "Phường Thành Công", "Phường Trúc Bạch", "Phường Vĩnh Phúc"],
        "Hoàn Kiếm": ["Phường Chương Dương Độ", "Phường Cửa Đông", "Phường Cửa Nam", "Phường Đồng Xuân", "Phường Hàng Bạc", "Phường Hàng Bài", "Phường Hàng Bồ", "Phường Hàng Bông", "Phường Hàng Buồm", "Phường Hàng Đào", "Phường Hàng Gai", "Phường Hàng Mã", "Phường Hàng Trống", "Phường Lý Thái Tổ", "Phường Phan Chu Trinh", "Phường Phúc Tân", "Phường Trần Hưng Đạo", "Phường Tràng Tiền"],
        "Đống Đa": ["Phường Cát Linh", "Phường Hàng Bột", "Phường Khâm Thiên", "Phường Khương Thượng", "Phường Kim Liên", "Phường Láng Hạ", "Phường Láng Thượng", "Phường Nam Đồng", "Phường Ngã Tư Sở", "Phường Ô Chợ Dừa", "Phường Phương Liên", "Phường Phương Mai", "Phường Quang Trung", "Phường Quốc Tử Giám", "Phường Thịnh Quang", "Phường Thổ Quan", "Phường Trung Liệt", "Phường Trung Phụng", "Phường Trung Tự", "Phường Văn Chương", "Phường Văn Miếu"],
        // ... thêm các quận huyện khác theo cùng định dạng
      },
      "Hồ Chí Minh": {
        "Quận 1": ["Phường Bến Nghé", "Phường Bến Thành", "Phường Cầu Ông Lãnh", "Phường Cô Giang", "Phường Đa Kao", "Phường Nguyễn Cư Trinh", "Phường Nguyễn Thái Bình", "Phường Phạm Ngũ Lão", "Phường Tân Định"],
        "Quận 3": ["Phường 1", "Phường 3", "Phường 4", "Phường 5", "Phường 7", "Phường 8", "Phường 9", "Phường 10", "Phường 11", "Phường 12", "Phường 13", "Phường 14"],
        "Quận 4": ["Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 6", "Phường 8", "Phường 9", "Phường 10", "Phường 12", "Phường 13", "Phường 14", "Phường 15", "Phường 16", "Phường 18"],
        "Quận 5": ["Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5", "Phường 6", "Phường 7", "Phường 8", "Phường 9", "Phường 10", "Phường 11", "Phường 12", "Phường 13", "Phường 14"],
        "Quận 6": ["Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5", "Phường 6", "Phường 7", "Phường 8", "Phường 9", "Phường 10", "Phường 11", "Phường 12", "Phường 13", "Phường 14"],
        // ... thêm các quận huyện khác theo cùng định dạng
        "Thành phố Thủ Đức": ["Phường An Khánh", "Phường Bình Chiểu", "Phường Bình Thọ", "Phường Cát Lái", "Phường Hiệp Bình Chánh", "Phường Hiệp Bình Phước", "Phường Linh Chiểu", "Phường Linh Đông", "Phường Linh Tây", "Phường Linh Trung", "Phường Linh Xuân", "Phường Long Bình", "Phường Long Phước", "Phường Long Thạnh Mỹ", "Phường Long Trường", "Phường Phú Hữu", "Phường Phước Bình", "Phường Phước Long A", "Phường Phước Long B", "Phường Tam Bình", "Phường Tam Phú", "Phường Tăng Nhơn Phú A", "Phường Tăng Nhơn Phú B", "Phường Thảo Điền", "Phường Thủ Thiêm", "Phường Trường Thạnh"],
        "Huyện Bình Chánh": ["Xã An Phú Tây", "Xã Bình Chánh", "Xã Bình Hưng", "Xã Bình Lợi", "Xã Đa Phước", "Xã Hưng Long", "Xã Lê Minh Xuân", "Xã Phạm Văn Hai", "Xã Phong Phú", "Xã Quy Đức", "Xã Tân Kiên", "Xã Tân Nhựt", "Xã Tân Quý Tây", "Xã Tân Túc", "Xã Vĩnh Lộc A", "Xã Vĩnh Lộc B"],
        // ... thêm các huyện khác theo cùng định dạng
      },
      "Bình Dương": {
        "Thành phố Thủ Dầu Một": ["Phường Chánh Mỹ", "Phường Chánh Nghĩa", "Phường Định Hòa", "Phường Hiệp An", "Phường Hiệp Thành", "Phường Hòa Phú", "Phường Phú Cường", "Phường Phú Hòa", "Phường Phú Lợi", "Phường Phú Mỹ", "Phường Phú Tân", "Phường Phú Thọ", "Phường Tân An", "Phường Tương Bình Hiệp"],
        "Thành phố Dĩ An": ["Phường An Bình", "Phường Bình An", "Phường Bình Thắng", "Phường Dĩ An", "Phường Đông Hòa", "Phường Tân Bình", "Phường Tân Đông Hiệp"],
        "Thành phố Thuận An": ["Phường An Phú", "Phường An Thạnh", "Phường Bình Chuẩn", "Phường Bình Hòa", "Phường Bình Nhâm", "Phường Hưng Định", "Phường Lái Thiêu", "Phường Thuận Giao", "Phường Vĩnh Phú", "Xã An Sơn"],
        "Thành phố Tân Uyên": ["Phường Hội Nghĩa", "Phường Khánh Bình", "Phường Phú Chánh", "Phường Tân Hiệp", "Phường Tân Phước Khánh", "Phường Tân Vĩnh Hiệp", "Phường Thái Hòa", "Phường Thạnh Phước", "Phường Uyên Hưng", "Phường Vĩnh Tân", "Xã Bạch Đằng", "Xã Thạnh Hội"],
        "Thành phố Bến Cát": ["Phường Mỹ Phước", "Phường Chánh Phú Hòa", "Phường Thới Hòa", "Phường Hòa Lợi", "Phường Tân Định", "Xã An Điền", "Xã An Tây"],
        "Huyện Bắc Tân Uyên": ["Xã Tân Định", "Xã Bình Mỹ", "Xã Tân Bình", "Xã Tân Lập", "Xã Thanh Hòa", "Xã Hội Nghĩa", "Xã Phú Chánh"],
        "Huyện Bàu Bàng": ["Thị trấn Lai Uyên", "Xã Long Nguyên", "Xã Bàu Bàng", "Xã Trừ Văn Thố", "Xã Cây Trường II"],
        "Huyện Dầu Tiếng": ["Thị trấn Dầu Tiếng", "Xã Minh Hòa", "Xã Định An", "Xã Định Thành", "Xã Định Hiệp", "Xã Long Hòa", "Xã Long Tân"],
        "Huyện Phú Giáo": ["Thị trấn Phước Vĩnh", "Xã An Bình", "Xã An Linh", "Xã An Long", "Xã An Thái", "Xã Phước Sang", "Xã Tam Lập", "Xã Tân Hiệp"]
      }
    };
  
    // Tạo tùy chọn cho tỉnh/thành phố
    var provinceSelect = $('select[name="calc_shipping_provinces"]');
    $.each(provinces, function(index, value) {
      provinceSelect.append('<option value="' + value + '">' + value + '</option>');
    });
  
    // Sự kiện thay đổi cho tỉnh/thành phố
    provinceSelect.on('change', function() {
      var selectedProvince = $(this).val();
      var districtSelect = $('select[name="calc_shipping_district"]');
      var wardSelect = $('select[name="calc_shipping_ward"]');
      districtSelect.empty();
      wardSelect.empty();
      districtSelect.append('<option value="">Quận / Huyện</option>');
      wardSelect.append('<option value="">Xã / Thị Trấn</option>');
      $.each(districts[selectedProvince], function(district, wards) {
        districtSelect.append('<option value="' + district + '">' + district + '</option>');
      });
    });
  
    // Sự kiện thay đổi cho quận/huyện
    $('select[name="calc_shipping_district"]').on('change', function() {
      var selectedDistrict = $(this).val();
      var selectedProvince = $('select[name="calc_shipping_provinces"]').val();
      var wardSelect = $('select[name="calc_shipping_ward"]');
      wardSelect.empty();
      wardSelect.append('<option value="">Xã / Thị Trấn</option>');
      $.each(districts[selectedProvince][selectedDistrict], function(index, value) {
        wardSelect.append('<option value="' + value + '">' + value + '</option>');
      });
    });
  
    // Hiển thị các giá trị đã lưu nếu có
    var address_1_saved = localStorage.getItem('address_1_saved');
    if (address_1_saved) {
      $('select[name="calc_shipping_provinces"]').val(address_1_saved).trigger('change');
    }
  
    var address_2_saved = localStorage.getItem('address_2_saved');
    if (address_2_saved) {
      $('select[name="calc_shipping_district"]').val(address_2_saved).trigger('change');
    }
  
    var address_3_saved = localStorage.getItem('address_3_saved');
    if (address_3_saved) {
      $('select[name="calc_shipping_ward"]').val(address_3_saved);
    }
  });