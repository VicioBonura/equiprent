# Appunti

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

#### ProtectedRoute
Il componente `ProtectedRoute` ha la responsabilità di gestire le rotte in base allo stato di autenticazione dell'utente.

##### Comportamento e feedback
Se l'utente non è autenticato e tenta di accedere a una rotta protetta, viene rediretto alla pagina di login con il parametro `redirect=true` nell'url, in modo che il login venga effettuato e l'utente venga reindirizzato alla rotta originale, tracciata con il parametro `from` nell'url.
L'utente viene informato con un messaggio di avviso che lo invita a effettuare il login prima di proseguire verso la rotta protetta.

Se l'utente è autenticato e tenta di accedere alla pagina di login, viene rediretto alla dashboard.