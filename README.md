# Hibi Bloom

Ιστότοπος για το **Hibi Bloom** — yoga, ενσυνειδητότητα και δημιουργικό παιχνίδι
για παιδιά και εφήβους. Next.js 16 · React 19 · TypeScript · Tailwind v4 · GSAP · Lenis.

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

---

## ⚠️ Πριν τη δημοσίευση

Το site είναι πλήρως λειτουργικό, αλλά **περιέχει προσωρινό περιεχόμενο**. Τα
παρακάτω πρέπει να αντικατασταθούν. Σχεδόν όλα βρίσκονται στο
`src/content/site.ts` και είναι σημειωμένα με `PLACEHOLDER`.

| Τι | Πού | Σημείωση |
|---|---|---|
| Τηλέφωνο, email, ώρες, περιοχές | `contact.details` | Εντελώς εικονικά |
| Σύνδεσμοι social | `contact.social` | Δείχνουν σε `#` |
| Βιογραφικό & πιστοποιήσεις Ρεγγίνας | `instructor` | Το όνομα είναι πραγματικό, τα υπόλοιπα ενδεικτικά |
| Φωτογραφία Ρεγγίνας | `sections/Instructor.tsx` | Βοτανικό μοτίβο μέχρι να μπει |
| Μαρτυρίες γονέων | `testimonials.items` | **Δεν είναι πραγματικές κριτικές** |
| Περιοχές εξυπηρέτησης | `faq`, `contact.details` | Επιβεβαιώστε τις πραγματικές |
| Domain / canonical URL | `site.url` | `https://hibibloom.gr` |
| Αποστολή φόρμας | `sections/Contact.tsx` | Δεν υπάρχει backend, βλ. παρακάτω |

Το Hibi Bloom **δεν έχει δικό του χώρο**: η Ρεγγίνα Αυγουστή κάνει μαθήματα
κατ' οίκον και σε συνεργαζόμενους χώρους. Γι' αυτό δεν υπάρχει section χώρου,
χάρτης ή διεύθυνση, και το JSON-LD δηλώνει κινητή υπηρεσία με `areaServed`.

### Οι μαρτυρίες

Οι μαρτυρίες είναι δείγματα κειμένου για να φανεί η σχεδίαση. **Η δημοσίευσή
τους ως πραγματικές κριτικές γονέων θα ήταν παραπλανητική.** Αντικαταστήστε τες
με αληθινά, επώνυμα σχόλια, ή αφαιρέστε το section.

### Εικονογραφήσεις

Οι εικονογραφήσεις (παιδάκια σε στάσεις yoga, σκηνή κατ' οίκον, σκηνή
συνεργαζόμενου χώρου) δημιουργήθηκαν με AI (Higgsfield · `nano_banana_pro`
και `image_background_remover`) σε flat ύφος με την παλέτα του brand. Είναι
εικονογράφηση, όχι φωτογραφίες πραγματικών προσώπων.

Επεξεργασία νέων εικόνων σε βελτιστοποιημένα webp:

```bash
node scripts/images.mjs                          # από τον προεπιλεγμένο φάκελο
SRC_DIR=/path/to/pngs node scripts/images.mjs
```

### Φόρμα επικοινωνίας

Η φόρμα κάνει client-side validation και **προσομοιώνει** την αποστολή. Συνδέστε
την με έναν handler (route handler, Resend, Formspree…) στο `onSubmit` του
`src/components/sections/Contact.tsx`.

---

## Ταυτότητα

Τα χρώματα είναι **ακριβώς** αυτά του `logo identity.pdf` και ορίζονται μία φορά
στο `@theme` του `src/app/globals.css`:

| | HEX | RGB | RAL |
|---|---|---|---|
| Yellow Green | `#abc952` | 171, 201, 82 | 6018 |
| Telemagenta | `#ed1589` | 237, 21, 137 | 4010 |
| Melon Yellow | `#ffb310` | 255, 179, 16 | 1028 |

### Γραμματοσειρές — σημαντικό

**Το Simple-Handwriting δεν έχει ελληνικούς χαρακτήρες.** Περιέχει 99 glyphs,
μόνο λατινικά· λείπουν επίσης τα `« » — …`. Χρησιμοποιείται **αποκλειστικά** για
το λατινικό λεκτικό σήμα και προστατεύεται με `unicode-range` στο `layout.tsx`,
ώστε ο browser να μην το επιλέξει ποτέ για ελληνικό κείμενο.

Όλο το ελληνικό κείμενο είναι **Comfortaa** (variable, 300–700, πλήρης ελληνική
κάλυψη) — όπως σημειώνει και το ίδιο το brand guide.

Και οι δύο είναι self-hosted σε woff2 (95KB συνολικά). Το Comfortaa διανέμεται
με OFL — βλ. `src/fonts/Comfortaa-OFL.txt`.

### Λογότυπο

Το kit παραδόθηκε **μόνο σε raster** (κάθε PDF περιέχει bitmap 6966×8448), οπότε
το σήμα χρησιμοποιείται ως έχει, χωρίς καμία τροποποίηση:

- `logo-full-*.webp` — πλήρες σήμα (navigation)
- `logo-green-*.webp` — λεκτικό σήμα χωρίς λουλούδι (hero, preloader, footer, OG)

Ο ιβίσκος που **κινείται** (`components/botanical/Hibiscus.tsx`) είναι
ξαναχτισμένος σε vector, με την ίδια δομή που έχει το λουλούδι του σήματος
(πέντε πέταλα, λευκές νευρώσεις, κίτρινος στύλος με ανθήρες). Αυτό επιτρέπει να
ανθίζει πέταλο-πέταλο· το ίδιο το λογότυπο δεν σχεδιάστηκε ποτέ ξανά.

---

## Δομή

```
src/
  app/            layout (fonts, metadata, JSON-LD), globals.css, icon, opengraph-image
  content/site.ts ΟΛΟ το κείμενο — εδώ γίνονται οι αλλαγές περιεχομένου
  components/
    botanical/    Hibiscus, Flora, Creatures, Flight, Pollen, ScrollBloom, KidFloat
    sections/     Hero, Why, Benefits, Programs, HomeLessons, Instructor,
                  Testimonials, Faq, Contact, Footer
    ui/           MagneticButton, Reveal, SectionHeading, Grain
    Nav, Preloader, SmoothScroll
  lib/            gsap (plugins), random (seeded jitter)
```

## Κίνηση

- **Lenis** οδηγείται από το `gsap.ticker` — ένα ρολόι για scroll και animation·
  αλλιώς τα scroll-driven animations καθυστερούν κατά ένα frame και τρεμοπαίζουν.
- Κάθε οργανική παραλλαγή είναι **seeded** (`lib/random.ts`), όχι `Math.random()`,
  ώστε server και client να παράγουν ίδιο markup (hydration).
- `prefers-reduced-motion` τηρείται παντού: το intro παρακάμπτεται, τα particles
  δεν ξεκινούν, τα reveals μένουν ορατά.
- Τα `ScrollBloom` λουλούδια στα φωτεινά sections ανοίγουν scrubbed στο scroll,
  ώστε η σελίδα να «ανθίζει» όσο κατεβαίνει ο επισκέπτης.
- Το intro παίζει μία φορά ανά session (`sessionStorage`) και κλείνει με `Escape`.
  Σε development, `?holdintro=2.4` παγώνει το άνθισμα για επιθεώρηση.

## Προσβασιμότητα

Skip link, ορατό focus ring, εστίαση παγιδευμένη στο mobile menu με επαναφορά,
`aria-expanded`/`aria-controls` στο FAQ, carousel με πλήκτρα και `aria-live`,
σφάλματα φόρμας μέσω `aria-describedby`, `lang="el"`, σημασιολογικό HTML.

Δεν έχει γίνει έλεγχος με screen reader ούτε πλήρες audit αντίθεσης.
