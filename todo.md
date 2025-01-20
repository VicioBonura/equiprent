- [x] Crea un hook per la gestione del login/logout dell'utente, spostando la logica da utils/auth
- [x] Crea un hook per centralizzare i Toast in qualsiasi componente, spostando la logica da utils/toast
- [x] Crea un Context per gestire toast e auth
- [x] Aggiorna la documentazione per descrivere il comportamento dei Contexts
- [x] Decodifica il token JWT per ottenere le informazioni dell'utente
- [ ] Crea un componente per la gestione delle notifiche multiple
- [x] Crea un componente Card per unificare il layout delle card (attrezzature, form)
- [x] Crea una utility per il calcolo del prezzo delle attrezzature per minuto
- [ ] Crea cta per funzionalità premium
- [x] Premium: pulsante quick booking e maxDuration 20min
- [x] Crea un widget per la prenotazione delle attrezzature
- [ ] Crea useEquipments per la logica di presentazione delle attrezzature
- [ ] Restyling grafico completo

## Domande
- [x] Come gestire il ridimensionamento delle immagini? => (ho usato useOptimizedImage)
- [x] Come gestire il ridimensionamento delle icone SVG? => (ho usato formatSVG)
- [x] Come renderizzare il codice delle icone SVG senza usare dangerouslySetInnerHTML? -> approfondire custom hook per le icone
- [ ] Come ottimizzare la doppia chiamata API in Bookings, mancando getEquipmentById?

## Deploy su Netlify
- [ ] Aggiungere in `/public` il file `_redirects` per indicare al webserver di reindirizzare tutte le richieste a https:
```_redirects
/*  /index.html 200
```
- [ ] Aggiungere `robots.txt`
- [ ] Aggiungere `manifest.json`
     