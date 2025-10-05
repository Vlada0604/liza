document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------------
    // I. Навігація та Логотип (Виправлено)
    // --------------------------------------------------------

    // 1. Підсвічування активної сторінки
    const navLinks = [
        { id: 'nav-wish', url: 'wish.html' },
        { id: 'nav-catalog', url: 'catalog.html' },
        { id: 'nav-cart', url: 'card.html' },
        { id: 'nav-login', url: 'exit.html' } 
    ];

    navLinks.forEach(linkInfo => {
        let element = document.getElementById(linkInfo.id);
        if (element) {
            const currentPath = window.location.pathname.split('/').pop();
            const linkHref = element.getAttribute('href').split('/').pop();
            
            if (currentPath === linkHref || (currentPath === '' && linkHref === 'index.html')) {
                element.classList.add('active-nav-link');
            }
        }
    });

    // 2. Перехід на головну по ЛОГОТИПУ
    document.querySelectorAll('.logo').forEach(logo => {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    });

    // --------------------------------------------------------
    // II. КОРЕКТНА ІНТЕРАКТИВНІСТЬ (Кошик та Бажання)
    // --------------------------------------------------------

    // 1. Додавання/Видалення зі списку бажань (Лайки)
    document.querySelectorAll('.icon-heart').forEach(heartIcon => {
        heartIcon.addEventListener('click', (event) => {
            event.preventDefault();
            
            const productTitle = heartIcon.closest('.product-card').querySelector('.product-title').textContent;

            // Перемикаємо клас: fas - заповнене (у списку), far - порожнє (немає в списку)
            if (heartIcon.classList.contains('far')) {
                // Додаємо в список бажань
                heartIcon.classList.remove('far');
                heartIcon.classList.add('fas');
                alert(`"${productTitle}" додано до списку бажань! ❤️`);
            } else {
                // Видаляємо зі списку бажань
                heartIcon.classList.remove('fas');
                heartIcon.classList.add('far');
                alert(`"${productTitle}" видалено зі списку бажань. 💔`);
                
                // Якщо ми на сторінці wish.html, видаляємо картку
                if (window.location.pathname.includes('wish.html')) {
                    const productCard = heartIcon.closest('.product-card');
                    productCard.style.opacity = '0';
                    setTimeout(() => productCard.remove(), 300);
                }
            }
        });
    });

    // 2. Додавання товару до кошика
    // Використовуємо селектор, який вибирає лише кнопки з класом .btn-add-to-cart,
    // щоб не плутати їх із кнопками видалення.
    document.querySelectorAll('.btn-add-to-cart').forEach(cartButton => {
        cartButton.addEventListener('click', () => {
            const productTitle = cartButton.closest('.product-card').querySelector('.product-title').textContent;
            alert(`"${productTitle}" додано до кошика! 🛒`);
        });
    });

    // 3. Видалення товару з кошика (ТЕПЕР ПРАЦЮЄ!)
    document.querySelectorAll('.btn-delete-cart').forEach(deleteButton => {
        deleteButton.addEventListener('click', () => {
            const productCard = deleteButton.closest('.product-card');
            const productTitle = productCard.querySelector('.product-title').textContent;
            
            if (confirm(`Ви впевнені, що хочете видалити "${productTitle}" з кошика?`)) {
                // Візуальне видалення картки
                productCard.style.opacity = '0';
                setTimeout(() => productCard.remove(), 300);
                alert(`"${productTitle}" видалено з кошика. 🗑️`);
            }
        });
    });

    // 4. Оформлення замовлення (імітація)
    document.querySelectorAll('.btn-pay').forEach(payButton => {
        payButton.addEventListener('click', () => {
            alert('✅ Замовлення успішно оформлено! Дякуємо за покупку.');
        });
    });
});
