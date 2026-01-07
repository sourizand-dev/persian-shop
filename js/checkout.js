document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function fillSummary() {
        const container = document.getElementById("checkout-items");
        let total = 0, shipping = 0;

        container.innerHTML = ""; // جلوگیری از نمایش دوباره محصولات

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            if (item.price < 100000) shipping += 5000 * item.quantity;

            container.innerHTML += `<tr><td>${item.name}</td><td>${item.quantity}</td><td>${itemTotal.toLocaleString()} تومان</td></tr>`;
        });

        const tax = total * 0.1;
        const final = total + tax + shipping;

        document.getElementById("checkout-total-price").textContent = total.toLocaleString() + ' تومان';
        document.getElementById("checkout-shipping-cost").textContent = shipping > 0 ? shipping.toLocaleString() + ' تومان' : 'رایگان';
        document.getElementById("checkout-tax").textContent = tax.toLocaleString() + ' تومان';
        document.getElementById("checkout-final-price").textContent = final.toLocaleString() + ' تومان';
    }

    document.getElementById("checkout-form").addEventListener("submit", function (e) {
        e.preventDefault();

        document.getElementById("success-message").innerHTML = "سفارش شما ثبت شد! در ۵ ثانیه دیگر به صفحه اصلی منتقل خواهید شد.";
        document.getElementById("success-message").style.display = "block";
        localStorage.removeItem("cart");

        setTimeout(() => {
            window.location.href = "index.html";
        }, 5000);
    });

    fillSummary();
});
