(function (){
    emailjs.init('o23_DVPKG7YSIDNbF');
})();

const formulario = document.getElementById('formulario');
const modal = document.getElementById('modal');
const cerrar = document.getElementById('cerrar');

cerrar.addEventListener('click', function() {
    modal.style.display = 'none';
});

formulario.addEventListener('submit', function(e) {
    e.preventDefault(); // Evita el envío del formulario por defecto

    emailjs.sendForm('service_5xl2yss', 'template_ce4c1tc', this)
        .then(() => {
            this.reset();
            modal.style.display = "block"; // Muestra el modal al enviar el formulario

        }, (err) => {
            alert("Error al enviar el formulario " + JSON.stringify(err));
        });

});