document.addEventListener('DOMContentLoaded', () => {
    // --- Навігація та підсвічування активної сторінки ---
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
            
            // Логіка підсвічування активної сторінки (включно з кореневою index.html)
            if (currentPath === linkHref || (currentPath === '' && linkHref === 'index.html')) {
                element.classList.add('active-nav-link');
            }
        }
    });

    // --- ЛОГІКА ІНТЕРАКТИВНОСТІ (Кошик та Бажання) ---

    // 1. Додавання/Видалення зі списку бажань (Лайки)
    document.querySelectorAll('.icon-heart').forEach(heartIcon => {
        heartIcon.addEventListener('click', (event) => {
            event.preventDefault(); // Запобігаємо переходу, якщо це посилання
            
            const productTitle = heartIcon.closest('.product-card').querySelector('.product-title').textContent;

            // Перемикаємо клас 'fas' (заповнене серце) та 'far' (пусте серце)
            if (heartIcon.classList.contains('far')) {
                heartIcon.classList.remove('far');
                heartIcon.classList.add('fas');
                alert(`"${productTitle}" додано до списку бажань! ❤️`);
            } else {
                heartIcon.classList.remove('fas');
                heartIcon.classList.add('far');
                alert(`"${productTitle}" видалено зі списку бажань. 💔`);
            }
        });
    });

    // 2. Додавання товару до кошика
    document.querySelectorAll('.btn-card:not(.btn-delete)').forEach(cartButton => {
        cartButton.addEventListener('click', () => {
            const productTitle = cartButton.closest('.product-card').querySelector('.product-title').textContent;
            alert(`"${productTitle}" додано до кошика! 🛒`);
            // Можна змінити текст кнопки після додавання
            // cartButton.textContent = 'У КОШИКУ'; 
        });
    });

    // 3. Видалення товару з кошика
    document.querySelectorAll('.btn-delete').forEach(deleteButton => {
        deleteButton.addEventListener('click', () => {
            const productCard = deleteButton.closest('.product-card');
            const productTitle = productCard.querySelector('.product-title').textContent;
            
            if (confirm(`Ви впевнені, що хочете видалити "${productTitle}" з кошика?`)) {
                // Візуальне видалення картки
                productCard.style.opacity = '0';
                setTimeout(() => productCard.remove(), 300); // Приховуємо після анімації
                alert(`"${productTitle}" видалено. 🗑️`);
            }
        });
    });

    // 4. Оформлення замовлення (імітація)
    document.querySelectorAll('.btn-pay').forEach(payButton => {
        payButton.addEventListener('click', () => {
            // Тут має бути логіка перевірки форми та перенаправлення на сторінку оплати
            alert('✅ Замовлення успішно оформлено! Дякуємо за покупку.');
            // Можна перенаправити на головну сторінку
            // window.location.href = 'index.html'; 
        });
    });

    // 5. Перехід на головну сторінку при натисканні на ЛОГОТИП
    document.querySelectorAll('.logo').forEach(logo => {
        logo.style.cursor = 'pointer'; // Додаємо курсор для підказки
        logo.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    });
});
