document.addEventListener("DOMContentLoaded", function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalAmount = document.querySelector('.total-amount');
    const cartQuantityElements = document.querySelectorAll('.cart-quantity');
    const cartIcon = document.querySelector('.cart-icon');
    const cartContainer = document.querySelector('.cart-container');
    const closeIcon = document.querySelector('.close-icon');
    let cartTotal = 0;
    let cartQuantity = 0;

    // Lấy tất cả các thẻ img và đặt thuộc tính loading thành "lazy"
    const lazyImages = document.querySelectorAll('img');
    lazyImages.forEach(img => {
        img.setAttribute('loading', 'lazy');
    });
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    function addToCart(event) {
        const productContainer = event.target.closest('.laptop');
        const productName = productContainer.querySelector('.description-for-laptop').innerText;
        const productPrice = parseFloat(productContainer.querySelector('.price-of-the-laptop a').innerText.replace(/\./g, '').replace(' đ', ''));
        const productImageSrc = productContainer.querySelector('.laptop-picture img').getAttribute('src');

        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng hay chưa
        const existingCartItem = Array.from(cartItemsContainer.children).find(item => item.dataset.name === productName);

        if (existingCartItem) {
            // Nếu sản phẩm đã tồn tại, tăng số lượng lên 1 và cập nhật tổng tiền
            const quantityElement = existingCartItem.querySelector('.quantity');
            const quantity = parseInt(quantityElement.value);
            quantityElement.value = quantity + 1;
            updateCartItem(existingCartItem);
        } else {
            // Nếu sản phẩm chưa tồn tại, thêm sản phẩm mới vào giỏ hàng và cập nhật tổng tiền
            const product = {
                name: productName,
                price: productPrice,
                image: productImageSrc,
                quantity: 1
            };
            addToCartFunction(product);
            updateCartUI(product);
        }

        // Cập nhật số lượng sản phẩm trong giỏ hàng
        cartQuantity++;
        updateCartQuantity();
    }

    function addToCartFunction(product) {
        console.log("Đã thêm sản phẩm vào giỏ hàng:", product);
        alert("Đã thêm " + product.name + " vào giỏ hàng!");
        cartTotal += product.price;
        cartTotalAmount.textContent = formatCurrency(cartTotal);
    }

    function updateCartUI(product) {
        const cartItemHTML = `
            <li class="cart-item" data-name="${product.name}" data-price="${product.price}">
                <img src="${product.image}" alt="${product.name}">
                <span class="name">${product.name}</span>
                <input type="number" class="quantity" value="${product.quantity}" min="1" max="99">
                <button class="remove-item">Xóa</button>
            </li>
        `;
        cartItemsContainer.insertAdjacentHTML('beforeend', cartItemHTML);
    }

    function updateCartItem(item) {
        const quantity = parseInt(item.querySelector('.quantity').value);
        const price = parseFloat(item.dataset.price);
        const totalPrice = quantity * price;
        item.dataset.price = price; // Cập nhật giá của mỗi mục giỏ hàng
        updateCartTotal();
    }

    function updateCartTotal() {
        cartTotal = Array.from(cartItemsContainer.children).reduce((total, item) => {
            const quantity = parseInt(item.querySelector('.quantity').value);
            const price = parseFloat(item.dataset.price);
            return total + (quantity * price);
        }, 0);
        cartTotalAmount.textContent = formatCurrency(cartTotal);
    }

    function formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    }

    // Bắt sự kiện input cho các ô input số lượng sản phẩm
    // Bắt sự kiện click cho các nút xóa
cartItemsContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-item')) {
        const item = event.target.closest('.cart-item');
        const itemPrice = parseFloat(item.dataset.price);
        const itemQuantity = parseInt(item.querySelector('.quantity').value);
        cartTotal -= itemPrice * itemQuantity;
        cartTotalAmount.textContent = formatCurrency(cartTotal);
        item.remove();
        updateCartQuantity(); // Cập nhật số lượng sản phẩm
    }
});


    function updateCartQuantity() {
        let totalQuantity = 0;
        cartItemsContainer.querySelectorAll('.quantity').forEach(element => {
            totalQuantity += parseInt(element.value);
        });
        cartQuantityElements.forEach(element => {
            element.textContent = totalQuantity;
        });
    }

    // Bắt sự kiện input cho các ô input số lượng sản phẩm
cartItemsContainer.addEventListener('input', function(event) {
    if (event.target.classList.contains('quantity')) {
        const input = event.target;
        const currentValue = parseInt(input.value);
        const maxValue = parseInt(input.getAttribute('max')); // Lấy giá trị max từ thuộc tính max của input
        if (currentValue > maxValue) {
            input.value = maxValue; // Nếu giá trị nhập vào lớn hơn max, đặt giá trị của input về max
        }
        updateCartItem(input.closest('.cart-item'));
        updateCartQuantity(); // Cập nhật số lượng sản phẩm
    }
});

    
    // Ẩn phần giỏ hàng ban đầu
    cartContainer.style.display = 'none';
    
    // Bắt sự kiện nhấn nút cart-icon để hiển thị/phản hồi phần giỏ hàng
    cartIcon.addEventListener('click', toggleCart);
    
    // Bắt sự kiện nhấn biểu tượng "x" để ẩn phần giỏ hàng
    closeIcon.addEventListener('click', toggleCart);
    
    function toggleCart() {
        // Kiểm tra xem phần giỏ hàng đang ẩn hay hiển thị
        if (cartContainer.style.display === 'none') {
            // Nếu đang ẩn, hiển thị phần giỏ hàng
            cartContainer.style.display = 'block';
        } else {
            // Nếu đang hiển thị, ẩn phần giỏ hàng
            cartContainer.style.display = 'none';
        }
    }
    // Bắt sự kiện nhấn nút cart-icon để hiển thị/phản hồi phần giỏ hàng và lớp mờ
cartIcon.addEventListener('click', toggleCart);

// Bắt sự kiện nhấn biểu tượng "x" để ẩn phần giỏ hàng và lớp mờ
closeIcon.addEventListener('click', toggleCart);

function toggleCart() {
    const overlay = document.querySelector('.overlay');
    // Kiểm tra xem phần giỏ hàng đang ẩn hay hiển thị
    if (cartContainer.style.display === 'none') {
        // Nếu đang ẩn, hiển thị phần giỏ hàng và lớp mờ
        cartContainer.style.display = 'block';
        overlay.style.display = 'block';
    } else {
        // Nếu đang hiển thị, ẩn phần giỏ hàng và lớp mờ
        cartContainer.style.display = 'none';
        overlay.style.display = 'none';
    }
}
});


