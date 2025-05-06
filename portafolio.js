document.addEventListener('DOMContentLoaded', function() {
    // Selecciona todos los enlaces de navegaci\u00f3n en la columna izquierda
    const navLinks = document.querySelectorAll('.left-column .nav-link');
    // Selecciona todas las secciones de contenido
    const sections = document.querySelectorAll('.sec-section');

    // Funci\u00f3n para remover la clase 'active' de todos los enlaces
    function removeActiveClass() {
        navLinks.forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('aria-current'); // Buena pr\u00e1ctica de accesibilidad
        });
    }

    // Funci\u00f3n para a\u00f1adir la clase 'active' al enlace correcto
    function setActiveLink(id) {
        removeActiveClass(); // Primero removemos de todos
        const activeLink = document.querySelector(`.left-column .nav-link[href="#${id}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
            activeLink.setAttribute('aria-current', 'page'); // Buena pr\u00e1ctica de accesibilidad
        }
    }

    // A\u00f1ade un 'click' listener a cada enlace de navegaci\u00f3n
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Previene el comportamiento por defecto del enlace (navegar a otra p\u00e1gina)
            // e.preventDefault(); // Descomentar si no quieres que la p\u00e1gina se desplace autom\u00e1ticamente con el click

            const targetId = this.getAttribute('href').substring(1); // Obtiene el ID de la secci\u00f3n desde el href
            setActiveLink(targetId); // Llama a la funci\u00f3n para establecer el enlace activo visualmente

            // Desplazamiento suave a la secci\u00f3n
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                 // El comportamiento por defecto del enlace con href="#id" ya suele manejar el desplazamiento.
                 // Si necesitas un desplazamiento suave m\u00e1s controlado, puedes usar scrollIntoView:
                 // targetSection.scrollIntoView({ behavior: 'smooth' });
            }

        });
    });

    // Funci\u00f3n para manejar el evento de scroll
    function handleScroll() {
        let currentSectionId = '';
        const rightColumn = document.querySelector('.right-column'); // El contenedor con scroll

        sections.forEach(section => {
            const sectionTop = section.offsetTop - rightColumn.offsetTop; // Posici\u00f3n de la secci\u00f3n relativa al contenedor con scroll
            const sectionHeight = section.offsetHeight;
            const scrollTop = rightColumn.scrollTop; // Posici\u00f3n actual del scroll
            const offset = 150; // Un offset para activar la secci\u00f3n un poco antes de que llegue justo al borde superior

            // Determina si la secci\u00f3n actual est\u00e1 visible en el viewport
            if (scrollTop >= sectionTop - offset && scrollTop < sectionTop + sectionHeight - offset) {
                currentSectionId = section.id;
            }
        });

        // Si encontramos una secci\u00f3n visible, actualizamos el enlace activo
        if (currentSectionId) {
            setActiveLink(currentSectionId);
        } else {
            // Si no hay una secci\u00f3n activa (ej. al principio antes de la primera secci\u00f3n)
            // Puedes decidir si quieres que ning\u00fan enlace est\u00e9 activo o que 'inicio' lo est\u00e9
            // removeActiveClass(); // Opci\u00f3n: ning\u00fan enlace activo
            // Si quieres que 'inicio' est\u00e9 activo por defecto al cargar o al estar arriba del todo:
            // if (rightColumn.scrollTop < sections[0].offsetTop - rightColumn.offsetTop - offset) {
            //     setActiveLink('inicio');
            // }
        }
    }

    // A\u00f1ade el 'scroll' listener al contenedor principal que tiene el desbordamiento
    // Es importante a\u00f1adirlo al elemento que realmente tiene la barra de scroll, que en tu caso es .right-column
    const rightColumn = document.querySelector('.right-column');
    if (rightColumn) {
        rightColumn.addEventListener('scroll', handleScroll);
    }


    // Llama a handleScroll una vez al cargar la p\u00e1gina para establecer el estado inicial
    handleScroll();
});