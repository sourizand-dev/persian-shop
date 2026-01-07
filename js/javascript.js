// ✅ متغیرهای اصلی برای پردازش سبد خرید
let isPrinting = false;

// 🎯 افزودن محصول به سبد خرید
$('.add-to-cart').on('click', function (e) {
    e.preventDefault();

    // دریافت اطلاعات محصول
    var name = $(this).data('name');
    var price = $(this).data('price');
    var description = $(this).data('description');
    var image = $(this).data('image');

    // ساخت شیء محصول
    var product = {
        name: name,
        price: price,
        description: description,
        image: image,
        quantity: 1
    };

    // دریافت سبد خرید از localStorage
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    var productIndex = cart.findIndex(p => p.name === name);

    // بررسی و به‌روزرسانی سبد خرید
    if (productIndex !== -1) {
        cart[productIndex].quantity += 1; // افزایش تعداد محصول
    } else {
        cart.push(product); // افزودن محصول جدید
    }

    // ذخیره در localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // به‌روزرسانی تعداد محصولات در آیکون چرخ خرید
    updateCartCount();
});

// 🎯 به‌روزرسانی تعداد محصولات در آیکون چرخ خرید
function updateCartCount() {
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    var totalCount = cart.reduce((sum, product) => sum + product.quantity, 0);
    $('#cart-count').text(totalCount);
}

// 🎯 به‌روزرسانی سبد خرید + محاسبه قیمت‌ها
function updateCart() {
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    var cartItems = $('#cart-items');
    var totalPrice = 0;
    var shippingCost = 0;
    var tax = 0;
    var finalPrice = 0;

    cartItems.empty(); // پاک کردن آیتم‌های قبلی سبد خرید

    cart.forEach(function (product, index) {
        var totalItemPrice = product.price * product.quantity;
        totalPrice += totalItemPrice;

        // ✅ محاسبه هزینه ارسال: فقط برای محصولات زیر 100,000 تومان
        if (product.price < 100000) {
            shippingCost += 5000 * product.quantity;
        }

        // ایجاد ردیف جدید برای هر محصول
        var row = `
            <tr class="text-center">
                <td class="product-remove">
                    <a href="#" class="remove-item" data-index="${index}">
                        <span class="icon-close"></span>
                    </a>
                </td>
                <td class="image-prod">
                    <img src="${product.image}" alt="${product.name}">
                </td>
                <td class="product-name">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                </td>
                <td class="price">${product.price.toLocaleString()} تومان</td>
                <td class="quantity">
                    <div class="quantity-wrapper">
                        <input type="number" class="quantity-value" value="${product.quantity}" min="1" max="100" data-index="${index}">
                    </div>
                </td>
                <td class="total">${totalItemPrice.toLocaleString()} تومان</td>
            </tr>
        `;
        cartItems.append(row);
    });

    // ✅ محاسبه مالیات (10٪ از جمع کل)
    tax = totalPrice * 0.1;

    // ✅ محاسبه مجموع کل: جمع کل + هزینه ارسال + مالیات
    finalPrice = totalPrice + shippingCost + tax;

    // نمایش مقدارهای صحیح در صفحه cart.html
    $('#total-price').text(totalPrice.toLocaleString() + ' تومان'); 
    $('#shipping-cost').text(shippingCost > 0 ? shippingCost.toLocaleString() + ' تومان' : 'رایگان'); 
    $('#tax').text(tax.toLocaleString() + ' تومان');
    $('#final-price').text(finalPrice.toLocaleString() + ' تومان');

    // ذخیره مقادیر جدید در localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// 🎯 تغییر تعداد محصول در سبد خرید
$(document).on('change', '.quantity-value', function () {
    var index = $(this).data('index');
    var newQuantity = parseInt($(this).val());
    var cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (newQuantity > 0) {
        cart[index].quantity = newQuantity;
    } else {
        cart[index].quantity = 1;
    }

    // ذخیره تغییرات در localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
});

// 🎯 حذف آیتم از سبد خرید
$(document).on('click', '.remove-item', function (e) {
    e.preventDefault();
    var index = $(this).data('index');
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);

    // ذخیره تغییرات جدید در localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    updateCart();
    updateCartCount();
});

// 🎯 به‌روزرسانی تعداد محصولات هنگام بارگذاری صفحه
$(document).ready(function () {
    updateCartCount();
    updateCart();
});





// 🎯 نمایش اطلاعات آخرین سفارش
document.addEventListener("DOMContentLoaded", function () {
    let lastOrder = JSON.parse(localStorage.getItem("lastOrder"));
    if (lastOrder) {
        document.querySelector("input[type='text']").value = lastOrder.name;
        document.querySelector("input[type='tel']").value = lastOrder.phone;
        document.querySelector("textarea").value = lastOrder.address;
    }
});

// 🎯 نمایش و بستن مودال سفارش
function showModal() {
    document.getElementById("orderModal").style.display = "block";
}
function closeModal() {
    document.getElementById("orderModal").style.display = "none";
}
