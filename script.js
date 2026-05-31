// Фильтрация галереи
const filterSelect = document.getElementById('filter-select');
const galleryCards = document.querySelectorAll('.gallery-card');
const imageCountSpan = document.getElementById('image-count');
const totalLikesSpan = document.getElementById('total-likes');
let totalLikes = 0;

function updateGallery() {
    const selectedValue = filterSelect.value;
    let visibleCount = 0;
    galleryCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (selectedValue === 'all' || category === selectedValue) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    if (imageCountSpan) imageCountSpan.textContent = visibleCount;
}
if (filterSelect) {
    filterSelect.addEventListener('change', updateGallery);
    updateGallery();
}

// Лайки
function updateTotalLikes() {
    let sum = 0;
    document.querySelectorAll('.like-count').forEach(span => {
        sum += parseInt(span.textContent);
    });
    totalLikes = sum;
    if (totalLikesSpan) totalLikesSpan.textContent = totalLikes;
}

function initLikes() {
    const likeBtns = document.querySelectorAll('.like-btn');
    likeBtns.forEach(btn => {
        btn.removeEventListener('click', likeHandler);
        btn.addEventListener('click', likeHandler);
    });
    updateTotalLikes();
}

function likeHandler(e) {
    const btn = e.currentTarget;
    const countSpan = btn.querySelector('.like-count');
    let count = parseInt(countSpan.textContent);
    count++;
    countSpan.textContent = count;
    updateTotalLikes();
    btn.style.transform = 'scale(1.2)';
    setTimeout(() => { btn.style.transform = 'scale(1)'; }, 200);
}
initLikes();

// Модальное окно для галереи (увеличение фото)
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const closeModal = document.querySelector('.close');
if (modal && modalImg) {
    document.querySelectorAll('.gallery-card img').forEach(img => {
        img.addEventListener('click', () => {
            modal.style.display = 'block';
            modalImg.src = img.src;
            modalImg.alt = img.alt;
        });
    });
    closeModal.onclick = () => { modal.style.display = 'none'; };
    window.onclick = (event) => { if (event.target === modal) modal.style.display = 'none'; };
}

// Обработка отправки формы (имитация)
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('form-status');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        formStatus.textContent = '✅ Спасибо! Ваше сообщение отправлено (демо-режим).';
        formStatus.style.color = 'green';
        contactForm.reset();
        setTimeout(() => { formStatus.textContent = ''; }, 3000);
    });
}

console.log('Скрипт загружен: галерея, лайки, модальное окно, фильтр ✅');