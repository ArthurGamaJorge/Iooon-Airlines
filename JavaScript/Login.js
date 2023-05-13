var form = document.getElementById("formulario");
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);

function Direcionar() {
    const logins = localStorage.getItem("listaUser")

    var nomeLogin = document.getElementById("nome").value
    var senhaLogin = document.getElementById("Senha").value
    
    let listaUser = []

    userValid = {
        nome: '', 
        senha: ''
    }

    listaUser = JSON.parse(localStorage.getItem('listaUser'))

    listaUser.forEach((item) => {
        if(nomeLogin == item.nomeCad && senhaLogin ==item.senhaCad){
            userValid = {
                nome: item.nomeCad,
                senha: item.senhaCad
            }
        }
    })

    if(nomeLogin == userValid.nome && senhaLogin == userValid.senha && nomeLogin != ''){
        window.location.href ="site.html"
    } else {
        document.getElementById("error").innerHTML = "erro no login"
    }
}