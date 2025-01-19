- [x] Crea un hook per la gestione del login/logout dell'utente, spostando la logica da utils/auth
- [x] Crea un hook per centralizzare i Toast in qualsiasi componente, spostando la logica da utils/toast
- [x] Crea un Context per gestire toast e auth
- [x] Aggiorna la documentazione per descrivere il comportamento dei Contexts
- [x] Decodifica il token JWT per ottenere le informazioni dell'utente
- [ ] Crea un componente per la gestione delle notifiche multiple
- [x] Crea un componente Card per unificare il layout delle card (attrezzature, form)
- [x] Crea una utility per il calcolo del prezzo delle attrezzature per minuto
- [ ] Crea cta per funzionalità premium
- [ ] Premium: pulsante quick booking e maxDuration 20min
- [x] Crea un widget per la prenotazione delle attrezzature

## Domande
- [ ] Come gestire il ridimensionamento delle immagini? => (ho usato UseOptimizedImage)
- [ ] Come gestire il ridimensionamento delle icone SVG? => (ho usato formatSVG)
- [ ] Come renderizzare il codice delle icone SVG senza usare dangerouslySetInnerHTML?
- [ ] Come ottimizzare la doppia chiamata API in Bookings, mancando getEquipmentById?