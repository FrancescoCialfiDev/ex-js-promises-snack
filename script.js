"use strict"

/*Ottieni il titolo di un post con una Promise.

Crea una funzione getPostTitle(id) che accetta un id e restituisce una Promise che recupera il titolo di un post dal link https://dummyjson.com/posts/{id}
🎯 Bonus: Ottieni l'intero post con l'autore
Crea una funzione getPost(id) che recupera l'intero post. Concatena una seconda chiamata che aggiunge una proprietà user che contiene i dati dell'autore, recuperati dalla chiamata https://dummyjson.com/users/{post.userId}.*/

// PRIMO ESERCIZIO
function getPostTitle(id) {

    fetch(`https://dummyjson.com/posts/${id}`)
        .then(response => response.json())
        .then((obj) => console.log(obj.title))
        .catch((error) => console.error(error))

}
getPostTitle(1)


// PRIMO ESERCIZIO BONUS
function getPost(id) {

    fetch(`https://dummyjson.com/posts/${id}`)
        .then(response => response.json())
        .then((post) => {
            let contenuto = post
            return fetch(`https://dummyjson.com/users/${post.userId}`)
                .then(response => response.json())
                .then(autore => { contenuto.autore = autore; console.log(contenuto) })
        })
        .catch((error) => console.error(error))
}
getPost(1) 