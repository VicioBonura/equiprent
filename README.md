# Documentazione: Appunti, note e scelte progettuali

Di seguito sono descritti i principali aspetti di progettazione e sviluppo dell'applicazione, con note e spiegazioni sulle soluzioni adottate. L'ordine di presentazione segue la sequenza temporale in cui ogni argomento è stato affrontato durante l'evoluzione del progetto.

## Indice

- Struttura del progetto
- React Router DOM
- Context
- Auth Guard
- Toast
- Gestione immagini
- Funzioni premium

## Struttura del progetto
```
src/
├── assets/
│   └── css/
├── components/
│   ├── BookingCard/
│   │   ├── BookingList/
│   │   └── Counter/
│   ├── BookingWidget/
│   ├── EquipmentCard/
│   ├── EquipmentFeatured/
│   ├── EquipmentList/
│   ├── Header/
│   ├── Icons/
│   ├── Loader/
│   ├── LoginForm/
│   ├── NavBar/
│   ├── NotFound/
│   ├── ProtectedRoute/
│   ├── RegisterForm/
│   ├── Toast/
│   └── UserBtn/
├── contexts/
│   ├── AuthContext/
│   ├── ToastContext/
│   └── index.tsx
├── hooks/
│   └── useOptimizedImage.ts
├── layouts/
│   └── MainLayout/
├── pages/
│   ├── Bookings.tsx
│   ├── Dashboard.tsx
│   ├── Equipments.tsx
│   ├── Featured.tsx
│   ├── Home.tsx
│   ├── Login.tsx
│   └── Register.tsx
├── routes/
│   └── routes.tsx
├── services/
│   └── api.ts
├── types/
├── utils/
├── App.tsx
├── index.css
└── main.tsx
```

## React Router DOM
La navigazione è gestita attraverso la libreria `react-router-dom`, che permette di definire le rotte e le relative pagine, e di gestire la navigazione diretta (click sugli elementi `a`) e programmatica (utilizzando gli hooks `useNavigate()` e `useLocation()`). 

### Utilizzo
Il componente RouterProvider è il principale componente per la gestione delle rotte. Ottiene come parametro l'oggetto `router`, di tipo `createBrowserRouter` definito in `routes/routes.tsx`; quest'oggetto centralizza la gestione di tutte le rotte e definisce anche il layout condiviso epr le pagine dell'app, permettendo di mantenere i componenti condivisi e non ri-renderizzare ogni parte della pagina se non necessario.

#### Layout
Il componente `MainLayout` è il responsabile del layout generale delle pagine dell'app e utilizza il componente `Outlet` per renderizzare i componenti figli, come indicato nell'oggetto `router`. Questa scelta progettuale permette di mantenere i componenti condivisi e non ri-renderizzare ogni parte della pagina se non necessario.

## Context
Per la gestione degli stati globali si è scelto di utilizzare il context di React, non mediante l'uso di un unico contesto che gestisca tutti gli stati, ma creando contesti specifici. In particolare `AuthContext` per la gestione dell'autenticazione e `ToastContext` per la gestione dei toast.
Un wrapper, `AppContextWrapper`, ha la responsabilità di contenere i contesti specifici fornendo l'ambiente generico dell'applicazione.

### Separazione delle responsabilità
La gestione dei contesti prevede la realizzazione di due file differenti per separare le responsabilità:
- `Context.ts` crea il contesto e definisce i tipi di dato che il contesto gestisce; fornisce il punto d'accesso al constesto (custom hook) e le logiche di controllo dell'esistenza del contesto stesso. Definisce un contratto, dichiarando cosa sarà disponibile ma non implementando la logica.
- `Provider.tsx` contiene la logica del context, mantenendo lo stato attuale, gestendo l'inizializzazione dello stato e il suo aggiornamento. Contiene la logica di business del contesto.

## Auth Guard
La gestione delle rotte protette è implementata attraverso il componente `ProtectedRoute`, che gestisce le rotte in base al valore del parametro `accessType` definito nell'oggetto `router`. La navigazione sarà consentita o ridirezionata in base al rispetto o meno delle condizioni di accesso:
- `not-auth`: accesso consentito solo se l'utente non è autenticato
- `auth-only`: accesso consentito solo se l'utente è autenticato
- `public`: accesso consentito a tutti

### Comportamento
Il componente utilizza il context `AuthContext` per verificare lo stato di autenticazione dell'utente e gestisce i reindirizzamenti automatici: gli utenti non autenticati che tentano di accedere a rotte protette vengono reindirizzati alla pagina di login, mentre gli utenti autenticati che tentano di accedere alle pagine di login o registrazione vengono reindirizzati alla dashboard. Il sistema è integrato con il sistema di notifiche toast per fornire feedback appropriati all'utente durante i tentativi di accesso non autorizzati.

## Toast
I feedback all'utente sono gestiti tramite toast, visualizzati in basso a destra dell'area di visualizzazione. Il sistema di notifiche è implementato attraverso il `ToastContext`, che fornisce un'API per la gestione dei messaggi attraverso il custom hook `useToast`.

Il componente `MainLayout` si occupa della visualizzazione dei toast, mentre la logica di gestione è centralizzata nel provider del contesto. Questo approccio permette a qualsiasi componente dell'applicazione di generare toast in modo dichiarativo attraverso la funzione `showToast`, che accetta il messaggio, il tipo di notifica (`success`, `error`, `warning`, `info`) e una callback opzionale da eseguire alla chiusura del toast.

## Gestione immagini
Per la gestione delle immagini, non avendo controllo della risorsa lato server, si è realizzato il custom hook `useOptimizedImage`, che si occupa di creare copie di dimensioni ridotte delle immagini originali, al fine di evitare problemi in fase di scrolling dovuti al repaint di risorse eccessivamente pesanti: Il custom hook utilizza canvas per creare una nuova immagine partendo dall'originale con dimensioni, compressione e formato specificati.

### Caching
L'hook di elaborazione delle immagini si occupa anche di memorizzare in localStorage la versione ottimizata identificata dalla chiave src_width_quality_format, e ne verifica l'esistenza prima di procedere con una nuova realizzazione, se già presente.

## Funzioni Premium
Per eseguire le funzionalità di autenticazione, si è scelto di inserire due features riservate agli utenti registrati: 

- **Quick duration selector**: rende disponibili i pulsanti `+5` e `-5` per velocizzare la selezione della durata della prenotazione
- **Max duration**: permette di impostare un massimo di 20 minuti per la durata della prenotazione, aumentando i 10 minuti di default

## Ultime funzionalità aggiunte
- **Loader**: componente per la visualizzazione di un loader durante il caricamento delle pagine
- **Equipments linkabili in Bookings**: la lista delle attrezzature prenotate è cliccabile e porta alla pagina della singola attrezzatura
- **Featured**: pagina per la visualizzazione della singola attrezzatura, con la possibilità di prenotarla
- **NotFound**: pagina per la visualizzazione di una pagina non trovata, con un link per tornare alla home
- **Correzione stile**: miglioramento dello stile delle pagine
