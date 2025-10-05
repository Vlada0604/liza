document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------------
    // I. ФУНКЦІЇ РОБОТИ З LOCALSTORAGE
    // --------------------------------------------------------

    // Функція отримання збереженого стану (повертає об'єкт з масивами ID)
    const getSavedState = () => {
        // Використовуємо коректні ключі для кошика та бажань
        const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
        const wish = JSON.parse(localStorage.getItem('wishItems')) || [];
        return { cart, wish };
    };

    // Функція збереження стану (оновлює LocalStorage)
    const saveState = ({ cart, wish }) => {
        if (cart !== undefined) localStorage.setItem('cartItems', JSON.stringify(cart));
        if (wish !== undefined) localStorage.setItem('wishItems', JSON.stringify(wish));
    };

    // --------------------------------------------------------
    // II. Навігація та Логотип
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
    // III. ЛОГІКА ТОВАРІВ ЗІ ЗБЕРІГАННЯМ СТАНУ
    // --------------------------------------------------------
    
    // Функція візуального видалення картки
    const removeCard = (productCard, message) => {
        productCard.style.opacity = '0';
        setTimeout(() => productCard.remove(), 300);
        if (message) alert(message);
    };
    
    // 1. Додавання/Видалення зі списку бажань (Лайки)
    document.querySelectorAll('.icon-heart').forEach(heartIcon => {
        heartIcon.addEventListener('click', (event) => {
            event.preventDefault();
            
            const productCard = heartIcon.closest('.product-card');
            const productTitle = productCard.querySelector('.product-title').textContent.trim();
            const productID = productTitle; // Використовуємо title як унікальний ID
            
            let { wish } = getSavedState();

            if (heartIcon.classList.contains('far')) {
                // ДОДАВАННЯ:
                heartIcon.classList.remove('far');
                heartIcon.classList.add('fas');
                if (!wish.includes(productID)) wish.push(productID);
                alert(`"${productTitle}" додано до списку бажань! ❤️`);
            } else {
                // ВИДАЛЕННЯ:
                heartIcon.classList.remove('fas');
                heartIcon.classList.add('far');
                wish = wish.filter(id => id !== productID); // Видаляємо зі сховища
                
                // Якщо ми на сторінці 'wish.html', видаляємо картку візуально
                if (window.location.pathname.includes('wish.html')) {
                    removeCard(productCard, `"${productTitle}" видалено зі списку бажань. 💔`);
                } else {
                    alert(`"${productTitle}" видалено зі списку бажань. 💔`);
                }
            }
            saveState({ wish }); // Зберігаємо оновлений список бажань
        });
    });

    // 2. Додавання товару до кошика (КНОПКА "до кошику")
    document.querySelectorAll('.btn-card:not(.btn-delete-cart)').forEach(cartButton => {
        cartButton.addEventListener('click', () => {
            const productTitle = cartButton.closest('.product-card').querySelector('.product-title').textContent.trim();
            const productID = productTitle;

            let { cart } = getSavedState();
            if (!cart.includes(productID)) {
                cart.push(productID);
                saveState({ cart }); // Зберігаємо оновлений кошик
                alert(`"${productTitle}" додано до кошика! 🛒`);
            } else {
                alert(`"${productTitle}" ВЖЕ у кошику!`);
            }
        });
    });

    // 3. Видалення товару з кошика (КНОПКА "видалити" на card.html)
    document.querySelectorAll('.btn-delete-cart').forEach(deleteButton => {
        deleteButton.addEventListener('click', () => {
            const productCard = deleteButton.closest('.product-card');
            const productTitle = productCard.querySelector('.product-title').textContent.trim();
            const productID = productTitle;
            
            let { cart } = getSavedState();
            cart = cart.filter(id => id !== productID);
            saveState({ cart }); // Зберігаємо оновлений кошик

            if (confirm(`Ви впевнені, що хочете видалити "${productTitle}" з кошика?`)) {
                removeCard(productCard, `"${productTitle}" видалено з кошика. 🗑️`);
            }
        });
    });

    // 4. Оформлення замовлення (імітація)
    document.querySelectorAll('.btn-pay').forEach(payButton => {
        payButton.addEventListener('click', () => {
            alert('✅ Замовлення успішно оформлено! Кошик очищено.');
            // Очищаємо кошик після успішного оформлення
            saveState({ cart: [] }); 
            // Візуально видаляємо всі картки на сторінці кошика
            if (window.location.pathname.includes('card.html')) {
                document.querySelectorAll('.product-card').forEach(card => removeCard(card, null));
            }
        });
    });

    // --------------------------------------------------------
    // IV. ЗАВАНТАЖЕННЯ ТА ФІЛЬТРАЦІЯ СТАНУ ПРИ ЗАПУСКУ СТОРІНКИ
    // --------------------------------------------------------
    
    const loadState = () => {
        const { cart, wish } = getSavedState();
        const currentPage = window.location.pathname.split('/').pop();
        
        document.querySelectorAll('.product-card').forEach(card => {
            // Використовуємо .trim() для надійності
            const productTitle = card.querySelector('.product-title').textContent.trim();
            const heartIcon = card.querySelector('.icon-heart');
            
            // 1. Оновлення стану лайків на всіх сторінках
            if (wish.includes(productTitle)) {
                heartIcon.classList.remove('far');
                heartIcon.classList.add('fas');
            } else {
                heartIcon.classList.remove('fas');
                heartIcon.classList.add('far');
            }

            // 2. КРИТИЧНИЙ БЛОК: Видалення hardcoded карток, яких немає у LocalStorage
            if (currentPage.includes('card.html') && !cart.includes(productTitle)) {
                // Видаляємо картку, якщо ми в кошику, а товару НЕМАЄ у збереженому стані
                card.remove();
            } else if (currentPage.includes('wish.html') && !wish.includes(productTitle)) {
                 // Видаляємо картку, якщо ми у списку бажань, а товару НЕМАЄ у збереженому стані
                card.remove();
            }
        });
    };

    // Запускаємо завантаження стану
    loadState();
});
