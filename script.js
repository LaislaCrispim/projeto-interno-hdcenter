/* MENU SUSPENSO */


/* CLIQUE NA LOGO PARA VOLTAR AO MENU */
document.addEventListener("DOMContentLoaded", function () {
    const logo = document.getElementById("logo");

    if (logo) {
        logo.addEventListener("click", function () {
            window.location.href = "index.html";
        });
    }
});