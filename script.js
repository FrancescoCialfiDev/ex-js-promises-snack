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

// SECONDO ESERCIZIO

/*Crea la funzione lanciaDado() che restituisce una Promise che, dopo 3 secondi, genera un numero casuale tra 1 e 6. Tuttavia, nel 20% dei casi, il dado si "incastra" e la Promise va in reject.
🎯 Bonus: HOF con closure per memorizzare l'ultimo lancio
Modifica la funzione in creaLanciaDado(), che restituisce una closure che memorizza l'ultimo risultato. Se il numero esce due volte di fila, stampa "Incredibile!".*/

const numeroGenerato = document.getElementById("numeroGenerato")
const bottone = document.getElementById("bottone")
bottone.addEventListener("click", () => {
    news()
})

function lanciaDado() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const randomCrash = Math.floor(Math.random() * 5) + 1
            if (randomCrash != 1) {
                const randomNumber = Math.floor(Math.random() * 6) + 1
                resolve(randomNumber)
            } else {
                reject("Il dado si è incastrato")
            }
        }, 500)
    })
}

// SECONDO ESERCIZIO BONUS

function creaLanciaDado() {
    let ultimoLancio = null
    return function () {
        lanciaDado()
            .then((numero) => {
                console.log(`Il numero generato è ${numero}`)
                numeroGenerato.innerHTML = `Il numero generato è ${numero}`
                if (ultimoLancio === numero) {
                    numeroGenerato.innerHTML = `Incredibile`
                    console.log("Incredibile!");
                }
                ultimoLancio = numero;
            })
            .catch(err => { console.error(err); numeroGenerato.innerHTML = "Il dado si è incastrato"; ultimoLancio = null })
    }
}

const news = creaLanciaDado()







