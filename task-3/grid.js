document.addEventListener('DOMContentLoaded', function() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-image');
    const closeBtn = document.querySelector('.close-btn');
    

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            lightboxImg.src = this.dataset.fullsize;
            lightboxImg.alt = this.alt;
            lightbox.classList.add('show');
        });
    });
    
    closeBtn.addEventListener('click', function() {
        lightbox.classList.remove('show');
    });

});