window.onload = function(){    
    menu = document.querySelector("#IconeMenu");
    lista = document.querySelector(".lista");
    ImagemOriginal = document.getElementById('tema').getAttribute('src');

    menu.onclick = () => {
        menu.classList.toggle("bx-x");
        lista.classList.toggle("open");
};
};

function MudarTema() {
    var body = document.body;
         
    body.classList.toggle("Dark-theme");
    let button = document.getElementById('tema');


    if (button.getAttribute('src') == ImagemOriginal) {
       button.src = "./Images/Light theme.png"
       
    } else {
        button.src = ImagemOriginal
    }
 }
