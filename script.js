function resetearWrapper() {
    const mask = document.getElementById('mask');
    const wrapper = document.getElementById('imageWrapper');
    
    if (mask && wrapper) {
        mask.style.transform = 'translateY(0)';
        mask.style.opacity = '0';
        wrapper.style.opacity = '0';
        wrapper.style.pointerEvents = 'none';
        
        gsap.set(mask, { y: 0, opacity: 0 });
        gsap.set(wrapper, { opacity: 0, pointerEvents: 'none' });
    }
    
    sessionStorage.setItem('wrapperOpen', 'false');
    window.isOpen = false;
}


function crearSplitText(elemento) {
    var texto = elemento.textContent;
    var chars = texto.split('');
    var contenedor = document.createElement('span');
    chars.forEach(function(letra) {
        var span = document.createElement('span');
        span.className = 'char';
        span.textContent = letra === ' ' ? '\u00A0' : letra;
        contenedor.appendChild(span);
    });
    elemento.innerHTML = '';
    elemento.appendChild(contenedor);
    return {
        chars: contenedor.querySelectorAll('.char'),
        elemento: elemento
    };
}

    window.addEventListener('load', function() {
    resetearWrapper();
    
    if (typeof gsap === 'undefined') {
        alert.apply('GSAP loooooowk didnt load');
        return;
    }

    if (typeof gsap === 'undefined') {
        alert.apply('GSAP loooooowk didnt load');
        return;
    }

    const intro = document.querySelector('.intro');
    gsap.set(intro, { visibility: 'visible' });

    const lines = document.querySelectorAll('.line');
    const splitLines = [];
    lines.forEach(function(line) {
        var split = crearSplitText(line);
        splitLines.push(split);
    });

    const width = window.innerWidth;
    const depth = -width / 8;
    const transformOrigin = `50% 50% ${depth}px`;

    gsap.set(lines, {
        perspective: 700,
        transformStyle: "preserve-3d"
    });

    const tl = gsap.timeline({ repeat: -1 });

    splitLines.forEach(function(split, index) {
        gsap.set(split.chars, {
            rotationX: -90,
            transformOrigin: transformOrigin
        });

        tl.to(split.chars, {
            rotationX: 90,
            stagger: 0.08,
            duration: 0.9,
            ease: "none",
            transformOrigin: transformOrigin
        }, index * 0.45);
    });

    const mask = document.getElementById('mask');
    const wrapper = document.getElementById('imageWrapper');
    let isOpen = false;

    gsap.set(mask, { y: 0, opacity: 0});
    gsap.set(wrapper, { opacity: 0, pointerEvents: 'none' });

    document.querySelector('.fixed').addEventListener('click', function(e) {
        e.stopPropagation();
        isOpen = !isOpen;

         sessionStorage.setItem('wrapperOpen', isOpen ? 'true' : 'false');

        if (isOpen) {
            gsap.set(wrapper, { opacity: 1, pointerEvents: 'auto' });
            gsap.to(mask, {
                y: '-100%',
                opacity: 1,
                duration: 1.2,
                ease: 'power3.inOut'
            });
        } else {
            gsap.to(mask, {
                y: 0,
                duration: 1.2,
                ease: 'power3.inOut',
                onComplete: function() {
                    gsap.set(wrapper, { opacity: 0, pointerEvents: 'none' });
                }
            });
        }
    });

    document.body.addEventListener('click', function() {
        if (isOpen) {
            isOpen = false;
            gsap.to(mask, {
                y: 0,
                duration: 1.2,
                ease: 'power3.inOut',
                onComplete: function() {
                    gsap.set(wrapper, { opacity: 0, pointerEvents: 'none' });
                }
            });
        }
    });

    wrapper.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    console.log('Animations work-uhnn');
});

window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        const wasOpen = sessionStorage.getItem('wrapperOpen') === 'true';
        
        const mask = document.getElementById('mask');
        const wrapper = document.getElementById('imageWrapper');
        
        if (mask && wrapper) {
            gsap.set(mask, { y: 0, opacity: 0 });
            gsap.set(wrapper, { opacity: 0, pointerEvents: 'none' });
            
            if (wasOpen) {
                sessionStorage.setItem('wrapperOpen', 'false');
            }
        }
    }
});