# Participant Selector APP

demo app con i seguenti requisiti:

- Dev’essere usabile al momento della presentazione. Max 5 secondi.
- Deve permettere di escludere eventuali assenti.
- Deve permettere l'aggiunta o rimozione di uno o più partecipanti
- Deve tenere traccia delle persone escluse dalla selezione che precede gli incontri (nome del partecipante escluso e data).

Con selezionare si intende prendere a caso dalla lista un partecipante non assente.

Con tenere traccia delle persone escluse si intende tenere traccia degli assenti.

# start

L'applicazione è composta da 2 pezzi un backend scritto in spring-boot e un frontend fatto in react

per far partire l'applicativo bisogna avere installato docker e docker-compose:

[Per docker seguire queste istruzioni ](https://docs.docker.com/get-docker/)

[Per docker-compose queste](https://docs.docker.com/compose/install/)

una volta installati i due requisiti si può far partire l'applicativo con un semplice `docker-compose up --build`

se tutto va a buon fine si può aprire il browser e navigare al link [http://localhost:5000](http://localhost:5000)
