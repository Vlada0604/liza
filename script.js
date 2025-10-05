document.addEventListener('DOMContentLoaded', () => {
    // Отримуємо посилання на всі навігаційні елементи
    const navLinks = [
        // ID тепер відповідають доданим ID в index.html та інших сторінках
        { id: 'nav-wish', url: 'wish.html' },
        { id: 'nav-catalog', url: 'catalog.html' },
        { id: 'nav-cart', url: 'card.html' },
        { id: 'nav-login', url: 'exit.html' } // Використовуємо 'exit.html' як у вашому файлі
    ];

    navLinks.forEach(linkInfo => {
        // Знаходимо елемент як за ID (якщо є), так і за класом
        let element = document.getElementById(linkInfo.id);

        // Якщо елемент не знайдено за ID, але він повинен бути, шукаємо його за href (умова для index.html, де id був відсутній)
        if (!element) {
            // Це резервна логіка, оскільки ми додали ID до index.html, але корисно для загальності
            const allLinks = document.querySelectorAll('.nav-link, .btn-login');
            allLinks.forEach(link => {
                if (link.getAttribute('href') === linkInfo.url) {
                    element = link;
                }
            });
        }
        
        if (element) {
            // Перевіряємо, чи поточна сторінка відповідає URL посилання
            const currentPath = window.location.pathname.split('/').pop();
            const linkHref = element.getAttribute('href').split('/').pop();
            
            // Якщо поточний файл такий же, як URL посилання, позначаємо його як активний
            if (currentPath === linkHref) {
                element.classList.add('active-nav-link');
            }

            // Додаємо обробник подій для перенаправлення
            element.addEventListener('click', (event) => {
                // Запобігаємо стандартній дії посилання, якщо воно не веде на index.html
                // Залишаємо його для того, щоб не ламати навігацію
                // event.preventDefault(); 
                
                // Програмний перехід більше не потрібен, якщо в HTML коректно прописані href
                // window.location.href = linkInfo.url;
            });
        }
    });
});
