document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------------
    // I. Навігація та Логотип (Якщо вже працює, цей блок можна залишити як є)
    // --------------------------------------------------------
    const navMapping = [
        { id: 'nav-wish', url: 'wish.html' },
        { id: 'nav-catalog', url: 'catalog.html' },
        { id: 'nav-cart', url: 'card.html' },
        { id: 'nav-login', url: 'exit.html' }
    ];

    navMapping.forEach(linkInfo => {
        let element = document.getElementById(linkInfo.id);
        if (element) {
            const currentPath = window.location.pathname.split('/').pop();
            const linkHref = element.getAttribute('href').split('/').pop();
            
            // Логіка підсвічування
            if (currentPath === linkHref || (currentPath === '' && linkHref === 'index.html')) {
                element.classList.add('active-nav-link');
            }
        }
    });

    document.querySelectorAll('.logo').forEach(logo => {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    });

    // --------------------------------------------------------
    // II. КОРЕКТНА ЛОГІКА ТОВАРІВ
    // --------------------------------------------------------
    
    // Функція візуального видалення картки
    const removeCard = (productCard, message) => {
        productCard.style.opacity = '0';
        setTimeout(() => productCard.remove(), 300);
        alert(message);
    };

    // 1. Додавання/Видалення зі списку бажань (Лайки)
    // Шукаємо всі іконки-сердечка
    document.querySelectorAll('.icon-heart').forEach(heartIcon => {
        heartIcon.addEventListener('click', (event) => {
            event.preventDefault();
            
            const productCard = heartIcon.closest('.product-card');
            const productTitle = productCard.querySelector('.product-title').textContent;

            // Перевіряємо поточний стан: 'far' - порожнє (додати), 'fas' - заповнене (видалити)
            if (heartIcon.classList.contains('far')) {
                // ДОДАВАННЯ ДО СПИСКУ БАЖАНЬ
                heartIcon.classList.remove('far');
                heartIcon.classList.add('fas');
                alert(`"${productTitle}" додано до списку бажань! ❤️`);
            } else {
                // ВИДАЛЕННЯ ЗІ СПИСКУ БАЖАНЬ
                heartIcon.classList.remove('fas');
                heartIcon.classList.add('far');
                
                // Якщо ми на сторінці СПИСКУ БАЖАНЬ ('wish.html'), видаляємо картку
                if (window.location.pathname.includes('wish.html')) {
                    removeCard(productCard, `"${productTitle}" видалено зі списку бажань. 💔`);
                } else {
                    alert(`"${productTitle}" видалено зі списку бажань. 💔`);
                }
            }
        });
    });

    // 2. Додавання товару до кошика (КНОПКА "до кошику")
    // Селектор: .btn-card, який НЕ має класу .btn-delete-cart
    document.querySelectorAll('.btn-card:not(.btn-delete-cart)').forEach(cartButton => {
        cartButton.addEventListener('click', () => {
            const productTitle = cartButton.closest('.product-card').querySelector('.product-title').textContent;
            alert(`"${productTitle}" додано до кошика! 🛒`);
            // Тут також можна змінити текст кнопки, якщо товар уже в кошику
            // cartButton.textContent = "В КОШИКУ"; 
            // cartButton.disabled = true;
        });
    });

    // 3. Видалення товару з кошика (КНОПКА "видалити" на card.html)
    // Селектор: .btn-card, який МАЄ клас .btn-delete-cart
    document.querySelectorAll('.btn-delete-cart').forEach(deleteButton => {
        deleteButton.addEventListener('click', () => {
            const productCard = deleteButton.closest('.product-card');
            const productTitle = productCard.querySelector('.product-title').textContent;
            
            if (confirm(`Ви впевнені, що хочете видалити "${productTitle}" з кошика?`)) {
                removeCard(productCard, `"${productTitle}" видалено з кошика. 🗑️`);
            }
        });
    });

    // 4. Оформлення замовлення (імітація)
    document.querySelectorAll('.btn-pay').forEach(payButton => {
        payButton.addEventListener('click', () => {
            alert('✅ Замовлення успішно оформлено! Дякуємо за покупку.');
            // Можна тут додати перенаправлення на index.html
        });
    });
});
