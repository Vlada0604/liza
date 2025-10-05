document.addEventListener('DOMContentLoaded', () => {
    // Оновлений список посилань, який відповідає назвам ваших файлів
    const navLinks = [
        { id: 'nav-wish', url: 'wish.html' },
        { id: 'nav-catalog', url: 'catalog.html' },
        { id: 'nav-cart', url: 'card.html' },
        { id: 'nav-login', url: 'exit.html' } // Використовуємо exit.html як сторінку входу
    ];

    navLinks.forEach(linkInfo => {
        // Шукаємо елемент за ID, який ми додали в HTML
        let element = document.getElementById(linkInfo.id);

        if (element) {
            
            // --- ЛОГІКА ПЕРЕНАПРАВЛЕННЯ ВИДАЛЕНА ---
            // Тепер навігація працює через стандартний атрибут href в HTML.
            // Ми не додаємо event.preventDefault(), щоб не блокувати перехід.
            
            
            // --- ЛОГІКА ПІДСВІЧУВАННЯ АКТИВНОЇ СТОРІНКИ ---
            const currentPath = window.location.pathname.split('/').pop();
            const linkHref = element.getAttribute('href').split('/').pop();
            
            // Порівнюємо поточний файл із посиланням
            if (currentPath === linkHref || (currentPath === '' && linkHref === 'index.html')) {
                 // УВАГА: Для головної сторінки (index.html) може знадобитися окрема перевірка,
                 // якщо URL закінчується на / або /#
                element.classList.add('active-nav-link');
            }
        }
    });

    // --- ДОДАТКОВА ЛОГІКА (ЛАЙКИ/КОШИК) ---
    
    document.querySelectorAll('.icon-heart').forEach(heartIcon => {
        heartIcon.addEventListener('click', () => {
            heartIcon.classList.toggle('far');
            heartIcon.classList.toggle('fas');
        });
    });

    document.querySelectorAll('.btn-card').forEach(cartButton => {
        if (!cartButton.classList.contains('btn-delete')) {
            cartButton.addEventListener('click', () => {
                alert('Товар додано до кошика!');
            });
        }
    });
});
