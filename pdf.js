document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('CV-typa-shi');
    
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const pdfUrl = 'Salma-Mebarak-Resume.pdf';
        window.open(pdfUrl, '_blank');
    });
});