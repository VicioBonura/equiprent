# Documentazione: Appunti, note e scelte progettuali

Di seguito sono descritti i principali aspetti di progettazione e sviluppo dell'applicazione, con note e spiegazioni sulle soluzioni adottate. L'ordine di presentazione segue la sequenza temporale in cui ogni argomento è stato affrontato durante l'evoluzione del progetto.

## Indice

- Scaffolding
- React Router DOM
- Auth Guard
- Toast
- Context
- Gestione immagini

## Scaffolding
In `src/` sono state create le cartelle:
- components
- hooks
- layouts //contiene i layout condivisi per le pagine dell'app
- pages   //contiene le pagine dell'app
- routes  //conteiene il file con le rotte
- services
- types
- utils   //contiene funzioni di utilità riutilizzate in tutta l'app

## React Router DOM
Questa è la libreria per la gestione delle rotte.
Il suo funzionamento consiste nel gestire la navigazione diretta (click sugli elementi `a`) e programmatica (utilizzando gli hooks `useNavigate()` e `useLocation()`). 

### Utilizzo
Il componente RouterProvider è il principale componente per la gestione delle rotte. Ottiene come parametro l'oggetto `router`, di tipo `createBrowserRouter` definito in `routes/routes.tsx`; quest'oggetto centralizza la gestione di tutte le rotte e definisce anche il layout condiviso epr le pagine dell'app, permettendo di mantenere i componenti condivisi e non ri-renderizzare ogni parte della pagina se non necessario.

#### Layout
Il componente `MainLayout` è il responsabile del layout delle pagine dell'app e utilizza il componente `Outlet` per renderizzare i componenti figli, come indicato nell'oggetto `router`.

##### Comportamento e feedback
Se l'utente non è autenticato e tenta di accedere a una rotta protetta, viene rediretto alla pagina di login con il parametro `redirect=true` nell'url, in modo che il login venga effettuato e l'utente venga reindirizzato alla rotta originale, tracciata con il parametro `from` nell'url.
L'utente viene informato con un messaggio di avviso che lo invita a effettuare il login prima di proseguire verso la rotta protetta.

Se l'utente è autenticato e tenta di accedere alla pagina di login, viene rediretto alla dashboard.

## Auth Guard
La gestione delle rotte protette è implementata attraverso il componente `ProtectedRoute`, che gestisce le rotte in base al valore del parametro `accessType` definito nell'oggetto `router`. La navigazione sarà consentita o ridirezionata in base al rispetto o meno delle condizioni di accesso:
- `not-auth`: accesso consentito solo se l'utente non è autenticato
- `auth-only`: accesso consentito solo se l'utente è autenticato
- `public`: accesso consentito a tutti

## Toast
I feedback all'utente sono gestiti tramite toast, visualizzati in basso a destra dell'area di visualizzazione. Il sistema di notifiche è implementato attraverso eventi custom `show-toast` che vengono intercettati a livello di `window`. Questo approccio permette a qualsiasi componente dell'applicazione di generare toast senza vincoli di gerarchia.

Il componente `MainLayout` si occupa della visualizzazione dei toast, mentre la gestione degli eventi è implementata con un pattern di retry che garantisce la corretta ricezione del messaggio anche in scenari di race condition o quando il componente Toast non è ancora stato completamente inizializzato.

## Context
Per la gestione degli stati globali si è scelto di utilizzare il context di React, non mediante l'uso di un unico contesto che gascista tutti gli stati, ma creando contesti specifici. In particolare `AuthContext` per la gestione dell'autenticazione e `ToastContext` per la gestione dei toast.
Un wrapper, `AppContextWrapper`, ha la responsabilità di contenere i contesti specifici fornendo l'ambiente generico dell'applicazione.

### Separazione delle responsabilità
La gestione dei contesti prevede la realizzazione di due file differenti per separare le responsabilità:
- `Context.ts` crea il contesto e definisce i tipi di dato che il contesto gestisce; fornisce il punto d'accesso al consteso (custom hook) e le logiche di controllo dell'esistenza del contesto stesso. Definisce un contratto, dichiarando cosa sarà disponibile ma non implementando la logica.
- `Provider.tsx` contiene la logica del context, mantenendo lo stato attuale, gestendo l'inizializzazione dello stato e il suo aggiornamento. Contiene la logica di business del contesto.

## Gestione immagini
Per la gestione delle immagini, non avendo controllo della risorsa lato server, si è realizzato il custom hook `useOptimizedImage`, che si occupa di creare copie di dimensioni ridotte delle immagini originali, al fine di evitare problemi in fase di scrolling dovuti al repaint di risorse eccessivamente pesanti: Il custom hook utilizza canvas per creare una nuova immagine partendo dall'originale con dimensioni, compressione e formato specificati.

### Caching
L'hook di elaborazione delle immagini si occupa anche di memorizzare in localStorage la versione ottimizata identificata dalla chiave src_width_quality_format, e ne verifica l'esistenza prima di procedere con una nuova realizzazione, se già presente.

## Funzioni Premium
Per eseguire le funzionalità di autenticazione, si è scelto di inserire due features riservate agli utenti registrati: 

- **Quick duration selector**: rende disponibili i pulsanti `+5` e `-5` per velocizzare la selezione della durata della prenotazione
- **Max duration**: permette di impostare un massimo di 20 minuti per la durata della prenotazione, aumentando i 10 minuti di default

