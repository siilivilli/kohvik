document.addEventListener('DOMContentLoaded', function() {
    // 1. Находим все картинки в галерее. 
    // Убедитесь, что у вашего блока с картинками есть класс "gallery"
    const images = Array.from(document.querySelectorAll('#gallery img'));
    const modal = document.getElementById('photo-modal');
    const fullImg = document.getElementById('full-img');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentIndex = 0;

    // Открытие окна при клике на любое фото
    images.forEach((img, index) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            currentIndex = index;
            updateModal();
            modal.style.display = "flex";
        });
    });

    // Функция обновления картинки в модалке
    function updateModal() {
    // Берем путь к качественному фото из атрибута data-full
    const highResSrc = images[currentIndex].getAttribute('data-full');
    
    // Если атрибут есть, ставим его, если нет — оставляем обычный src
    fullImg.src = highResSrc ? highResSrc : images[currentIndex].src;
    }

    // Листание вперед
    function showNext() {
        currentIndex = (currentIndex + 1) % images.length;
        updateModal();
    }

    // Листание назад
    function showPrev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateModal();
    }

    // События кликов
    nextBtn.onclick = (e) => { e.stopPropagation(); showNext(); };
    prevBtn.onclick = (e) => { e.stopPropagation(); showPrev(); };
    closeBtn.onclick = () => modal.style.display = "none";

    // Закрытие при клике на темный фон
    modal.onclick = (e) => {
        if (e.target === modal) modal.style.display = "none";
    };

    // Управление стрелками клавиатуры
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === "flex") {
            if (e.key === "ArrowRight") showNext();
            if (e.key === "ArrowLeft") showPrev();
            if (e.key === "Escape") modal.style.display = "none";
        }
    });
});