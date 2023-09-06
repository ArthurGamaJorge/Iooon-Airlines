window.onload = function(){    
    ImagemOriginal = document.getElementById('tema').getAttribute('src');
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