function Cadastrar() {
    var Nome = document.getElementById('nome').value
    var Email = document.getElementById('Email').value
    var Data = document.getElementById('Data').value
    var Senha = document.getElementById('Senha').value

    var Genero =  document.getElementsByName("Genero");
    for (var i=0; i< Genero.length; i++) {
        if (Genero[i].checked) {
            Escolhido = Genero[i].value
        }
    }
        let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]')

        listaUser.push(
            {
                nomeCad: Nome,
                emailCad: Email,
                dataCad: Data,
                senhaCad: Senha
            }
        )

        localStorage.setItem('listaUser', JSON.stringify(listaUser))

window.location.href="login.html"
}

function Listagem() {
    window.location.href = "Listagem.html"
}

function MudarTema() {
      var body = document.body;
           
      body.classList.toggle("TemaClaro");
      let button = document.getElementById('button');
      
      if (button.innerHTML == "Tema Claro") {
         button.innerHTML = "Tema Escuro";
         
      } else {
         button.innerHTML = "Tema Claro"
      }
   }
  
function irHome() {
    window.location.href = "index.html";
}