# Web application per la gestione delle prenotazioni di attrezzature sportive all’interno di una palestra.

## API Rest

https://d3660g9kardf5b.cloudfront.net/

API Docs

https://d3660g9kardf5b.cloudfront.net/api/docs

## Deploy dell'app

L'app dovrà essere pubblicata online. Si potrà scegliere tra due servizi:
- Netlify Drop (è sufficiente eseguire il comando build e caricare la cartella risultante su https://app.netlify.com/drop, la piattaforma vi consentirà di registrarvi per mantenere l'applicativo online)
- Firebase Hosting (è sufficiente seguire questa guida)

## Modalità e materiali di consegna
Entro il giorno precedente alla verifica (30/01/2025) consegnare sulla piattaforma i seguenti file:

- Zip contenente il codice sorgente (rimuovere la cartella node_modules prima di creare l'archivio compresso)
- PDF contenente una breve relazione su alcune scelte implementative che l'allievo reputa degne di nota e la progettazione della UI
- Il link al deploy dell'app

## Descrizione
Gli allievi dovranno sviluppare un'applicazione web per la gestione delle prenotazioni e del noleggio dell'attrezzatura di una palestra. L'applicazione dovrà essere realizzata utilizzando ReactJS o NextJS, a discrezione dello studente, ed essere sviluppata in linguaggio TypeScript.

L’applicazione potrà fornire la possibilità di visualizzare le attrezzature disponibili e consentirà la prenotazione delle stesse, specificando una durata (es. prenotazione dei manubri per 20 minuti).

L’applicazione dovrà inoltre consentire la consultazione della lista delle prenotazioni attive da parte degli utenti della palestra.

La UI dovrà essere responsive e piacevole, studiata per essere visivamente accattivante e giovanile.

L’utente potrà registrarsi indicando uno username univoco e una password per poi effettuare un login. L’API di autenticazione fornirà un token di tipo JWT, che dovrà essere utilizzato per autorizzare la prenotazione delle API in scrittura. Il suddetto token dovrà essere inserito come authorization bearer.

## Requisiti

### Requisiti Tecnici

- Framework: ReactJS o NextJS (a scelta dello studente)
- Linguaggio: TypeScript
- UI: Responsive con supporto per smartphone e desktop, studiata per essere visivamente accattivante e giovanile

### Funzionalità richieste per utente NON autenticato

- Visualizzazione dell'Attrezzatura:
    - All'apertura, l'applicazione deve mostrare una lista dell'attrezzatura disponibile scaricata dall'API;
    - Devono essere visibili tutti i seguenti parametri:
        - name (il nome dell’attrezzatura);
        - claim (una breve frase ad effetto);
        - image (una foto che rappresenta l’attività);
        - icon (l’icona in SVG da utilizzare ad esempio di fianco al nome o nel pulsante di prenotazione);
        - pricePerMinute (il prezzo in euro per minuto di utilizzo).
    - L’API lista attrezzature /api/equipment non richiede autenticazione.
- Prenotazione dell'Attrezzatura:
    - Gli utenti devono poter prenotare l'attrezzatura necessaria tramite un pulsante "Noleggia" presente affianco all’attrezzo stesso;
    - Il pulsante “Noleggia” dovrà aprire una sezione o un modale in cui l’utente potrà:
        - indicare in modo intuitivo durata (duration) in minuti per specificare il periodo di noleggio, mentre il backend calcolerà in autonomia la fine (endDate) dello stesso;
        - visualizzare in anteprima il prezzo (pricePerMinute) ipotizzato per il noleggio (es. se il prezzo di un noleggio è di €0.2, il prezzo di 10 minuti sarà €2).
    - Nell’API per prenotare l'attrezzatura /api/equipment/{id}/book, il parametro id è l’identificativo dell’attrezzatura scelta (es. 1, Yoga Mat);
    - Se la chiamata viene fatta senza token utente, la prenotazione viene associata ad un utente anonimo.
- Gestione Prenotazioni Attrezzatura:
    - Gli utenti devono poter visualizzare le prenotazioni dell'attrezzatura all’interno di una pagina secondaria;
    - L’API per visualizzare le prenotazioni è /api/equipment-bookings;
    - Se la chiamata viene fatta senza token utente, vengono visualizzate le ultime prenotazioni effettuate.

### Funzionalità richieste per utente autenticato

- Prenotazione dell'Attrezzatura con autenticazione:
    - L’API per prenotare l'attrezzatura /api/equipment/{id}/book vista sopra, ha anche una modalità autenticata;
    - Se la chiamata viene fatta con token utente nell’header, la prenotazione viene associata all’utente loggato;
    - Se esiste già una prenotazione nello stesso periodo e per lo stesso utente, l’API ritornerà un errore.

- Registrazione: 
    - Gli utenti devono potersi registrare all'applicazione utilizzando le API di autenticazione fornite;
    - Se l’username è già esistente, l’API ritornerà un errore;
    - L’API di registrazione POST /api/register richiede nel body della richiesta username e password e non richiede autenticazione.

- Login: 
    - Gli utenti devono poter accedere all'applicazione utilizzando le API di autenticazione fornite;
    - Se username e password non sono corrette, l’API ritornerà un errore;
    
** Nota:** L’API di registrazione POST /api/register richiede nel body della richiesta username e password e non richiede autenticazione.

## Documentazione API
La documentazione in formato Swagger OpenAPI è disponibile all’endpoint /api/docs.

### Gestione Attrezzatura e Prenotazioni
#### Ottenere Lista Attrezzatura
Endpoint    /api/equipment
Metodo      GET
Descrizione Restituisce la lista dell'attrezzatura disponibile.
Richiesta   Nessuna
Risposte    200 OK: Ritorna la lista dell'attrezzatura.

#### Prenotare Attrezzatura
Endpoint    /api/equipment/:id/book
Metodo      POST
Descrizione Prenota l'attrezzatura specificata.
Richiesta   Headers:
            Authorization: Bearer <token> (opzionale)
            Body:
            duration (number)
Risposte    200 OK: Attrezzatura prenotata con successo.
            400 Bad Request: Richiesta non valida.
            401 Unauthorized: Utente non autorizzato.
            403 Forbidden: Attrezzatura non disponibile.
            404 Not Found: Attrezzatura non trovata.
            409 Conflict: Attrezzatura già prenotata.

#### Ottenere Lista Prenotazioni
Endpoint    /api/equipment-bookings
Metodo      GET
Descrizione Restituisce la lista delle prenotazioni dell'attrezzatura.
Richiesta   Headers:
            Authorization: Bearer <token> (opzionale)
Risposte    200 OK: Ritorna la lista delle prenotazioni.
            401 Unauthorized: Utente non autorizzato.

### Gestione Autenticazione

#### Registrazione Utente
Endpoint    /api/register
Metodo      POST
Descrizione Registra un nuovo utente.
Richiesta   Body:
            username (string)
            password (string)
Risposte    200 OK: Utente registrato con successo.
            400 Bad Request: Utente già esistente.

#### Login Utente
Endpoint    /api/login
Metodo      POST
Descrizione Effettua il login di un utente e restituisce un token JWT.
Richiesta   Body:
            username (string)
            password (string)
Risposte    200 OK: Login effettuato con successo, ritorna un token JWT.
            401 Unauthorized: Credenziali non valide.

### Gestione del Token di autenticazione
L’API di login ritorna un oggetto contenente un token JWT. Non è necessario decodificarlo, ai fini della prova.
È importante tuttavia utilizzare il token per le chiamate che richiedono autenticazione. È sufficiente includerlo come header con la seguente forma:
`Authorization: Bearer <token>`

#### Salvare il token
Seppur non sia un approccio sicuro e adeguato ad un ambiente di produzione, ai fini della prova è sufficiente salvare il token del localstorage del browser con il seguente codice. Qualora si volesse, è accettabile salvare il token nel cookie storage.

`localStorage.setItem('authToken', response.token);`

e recuperarlo quando necessario con il seguente codice

`const token = localStorage.getItem('authToken');`

#### Utilizzare il token nelle chiamate HTTP
Esempio Fetch
```typescript
const response = await fetch(`${apiBaseUrl}/api/equipment-bookings`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
});
if (!response.ok) {
  throw new Error('Failed to fetch equipment');
}
return response.json();
```

### Gestione delle Date
Ai fini della prova, si utilizzerà il formato semplificato ISO 8601. Questo formato è facilmente gestibile da JavaScript senza l’utilizzo di librerie.

#### Il formato ISO 8601
Il formato ISO 8601 consente di combinare data e ora in una singola stringa, in modo da rappresentare un momento specifico nel tempo. La combinazione di data e ora è rappresentata come YYYY-MM-DDThh:mm:ss, dove T è un separatore tra la data e l'ora.

- YYYY è l'anno a quattro cifre;
- MM è il mese a due cifre (01 per gennaio, 02 per febbraio, ecc.);
- DD è il giorno a due cifre (01-31);
- hh è l'ora a due cifre (00-23);
- mm sono i minuti a due cifre (00-59);
- ss sono i secondi a due cifre (00-59).

La stringa ISO 8601 può essere seguita da altre lettere e cifre che, ai fini della prova, possiamo ignorare.

#### Da stringa ad oggetto Data in JavaScript
Il server non è in grado di ritornare oggetti di tipo Date, ma li converte in stringa ISO 8601.  
Questo esempio dimostra come una stringa di data ISO 8601 possa essere convertita in un oggetto Date.
```typescript
const isoDateString: string = "2024-01-01T13:00:00Z";
const dateObject: Date = new Date(isoDateString);
console.log(dateObject); // Output: Mon Jan 01 2024 13:00:00 GMT+0000 (UTC)
```

#### Da oggetto Data a stringa in JavaScript
Prima di inviare una data al server, è necessario trasformarla in stringa.
Questo esempio dimostra come un oggetto JavaScript di tipo Date possa essere convertito in stringa ISO 8601.
```typescript
const dateObject: Date = new Date();
const isoDateString: string = dateObject.toISOString();
console.log(isoDateString); // Output: 2023-11-10T08:37:00.123Z
```

### Tipizzazione delle entità

#### Equipment List Element
```typescript
interface Equipment {
	id: number;
	name: string;
	claim: string;
	icon: string; // L'icona è rappresentata come una stringa SVG
	image: string; // URL
	pricePerMinute: number;
}
```

#### Equipment Booking Request
```typescript
export interface EquipmentBookingRequest {
	duration: number;
}
```

#### Equipment Booking List Element
```typescript
interface EquipmentBooking {
	id: number;
	equipment_id: number;
	user_id: string;
	start_date: string; // ISO 8601 format
	end_date: string; // ISO 8601 format
}
```

#### Login Request / Register Request
```typescript
export interface RegisterAndLoginRequest {
	username: string;
	password: string;
}
```

#### Login Response
```typescript
export interface LoginResponse {
	token: string;
}
```