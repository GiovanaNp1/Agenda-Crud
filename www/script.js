var firebaseConfig = {
    apiKey: "AIzaSyDtwhu8GjasNeOUPTf9sdpNHmr800j0rSE",
    authDomain: "minha-lista-de-contatos.firebaseapp.com",
    databaseURL: "https://minha-lista-de-contatos-default-rtdb.firebaseio.com",
    projectId: "minha-lista-de-contatos",
    storageBucket: "minha-lista-de-contatos.appspot.com",
    messagingSenderId: "21405945168",
    appId: "1:21405945168:web:c6a47bfe831037b8f43055"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var Blog = firebase.database().ref('contato').orderByChild('createdAt');

  function criarContato() {
    document.getElementById("exampleModal").classList.remove("d-none")
    var entry = {};
    entry.nome = document.getElementById("nome").value
    entry.sobrenome = document.getElementById("sobrenome").value
    entry.createdAt = new Date().getTime();
    entry.telefone = document.getElementById("telefone").value
    entry.email = document.getElementById("email").value
    console.log(entry)
    var Entry = firebase.database().ref('contato');
    
    Entry.push(entry).then(function(data){
    document.getElementById("exampleModal").classList.add("d-none")
    document.getElementById("success-alert").classList.remove("d-none")
    setTimeout(function(){ alert( document.getElementById("success-alert").classList.add("d-none")); }, 3000);
    }).catch(function(error){
        alert(error);
        console.error(error);
    })
    
    return false;
  }

  Blog.on('value', function (r) {
    var html = '';
    r.forEach(function (item) {
        entry = item.val()
        html = '<tr>' +
                '<td scope="row">' + entry.nome + '</td>' +
                '<td>' + entry.sobrenome + '</td>' +
                '<td>' + entry.telefone + '</td>' +
                '<td>' + entry.email + '</td>' +
                '<td><button type="button" class="btn btn-info" onClick="editarContato(' +  item.getKey() + '")>Editar</button></td>' +
                '<td><button type="button" class="btn btn-danger" onClick="deletarContato(' +  item.getKey() + '")>Excluir</button></td>' +
            '</tr>' + html; // prepend the entry because we need to display it in reverse order
    });
    console.log(html)
    $('#tableRow').html(html);
});