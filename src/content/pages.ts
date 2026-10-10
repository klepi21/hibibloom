/**
 * The three search landing pages, in both languages.
 *
 * Each targets one search intent (kids yoga, teen yoga, yoga at home) with its
 * own title, H1, copy and FAQ, and reuses the home page's sections for the
 * rest. Only facts already stated on the site: no prices, credentials, or
 * areas that have not been confirmed.
 *
 * House rule: no em dashes in visitor-facing copy.
 */

import type { Lang } from "./index"

export type LandingKey = "kids" | "teens" | "atHome"

export type Landing = {
  /** Short label for menus, footer and cross links. */
  link: string
  /** One line for the cross-link cards. */
  teaser: string
  metaTitle: string
  metaDescription: string
  kicker: string
  h1: string
  lead: string
  cta: string
  ctaSecondary: { label: string; anchor: string }
  intro: { title: string; body: string[] }
  /** Heading for the reused section (programme cards or the at-home section). */
  section: { kicker: string; title: string; lead: string }
  /** Which programme cards to show, by index into programs.items. */
  programs?: number[]
  steps: { id: string; kicker: string; title: string; items: { title: string; text: string }[] }
  /** Kicker for the reused Benefits section, on pages that show it. */
  benefits?: string
  faq: { kicker: string; title: string; items: { q: string; a: string }[] }
}

type PageSet = {
  crumbs: string
  crumbLabel: string
  related: { kicker: string; title: string }
  pages: Record<LandingKey, Landing>
}

const el: PageSet = {
  crumbs: "Αρχική",
  crumbLabel: "Διαδρομή",
  related: { kicker: "Δείτε επίσης", title: "Βρείτε τι ταιριάζει στο παιδί σας" },
  pages: {
    kids: {
      link: "Yoga για παιδιά",
      teaser: "Παιχνίδι, αναπνοή και κίνηση για παιδιά από 3 έως 13 ετών.",
      metaTitle: "Yoga για παιδιά στην Αθήνα, 3 έως 13 ετών",
      metaDescription:
        "Μαθήματα yoga για παιδιά 3 έως 13 ετών στην Αθήνα, στο σπίτι σας ή σε συνεργαζόμενους χώρους. Παιχνίδι, αναπνοή και κίνηση για αυτοπεποίθηση και συγκέντρωση. Δοκιμαστικό μάθημα χωρίς δέσμευση.",
      kicker: "Yoga για παιδιά",
      h1: "Yoga για παιδιά στην Αθήνα",
      lead: "Παιχνίδι, αναπνοή και κίνηση για παιδιά από 3 έως 13 ετών. Στο σπίτι σας ή σε έναν φιλόξενο συνεργαζόμενο χώρο, με τη Ρεγγίνα Αυγουστή.",
      cta: "Κλείστε ένα δοκιμαστικό μάθημα",
      ctaSecondary: { label: "Δείτε τις ηλικίες", anchor: "programmata" },
      intro: {
        title: "Η yoga ως παιχνίδι, όχι ως άσκηση",
        body: [
          "Ένα παιδί δεν χρειάζεται να μάθει «σωστές» στάσεις. Χρειάζεται να νιώσει το σώμα του, να παίξει, να γελάσει και να ανακαλύψει ότι η αναπνοή του μπορεί να το ηρεμήσει. Αυτή είναι η καρδιά της παιδικής yoga στο Hibi Bloom.",
          "Κάθε μάθημα χτίζεται γύρω από μια ιστορία ή ένα παιχνίδι. Τα παιδιά γίνονται δέντρα, γάτες και αετοί, ισορροπούν, τεντώνονται και στο τέλος χαλαρώνουν. Χωρίς βαθμούς, χωρίς σύγκριση, με τον ρυθμό του κάθε παιδιού.",
        ],
      },
      benefits: "Τι κερδίζει το παιδί",
      section: {
        kicker: "Ανά ηλικία",
        title: "Ένα πρόγραμμα για κάθε ηλικία",
        lead: "Από το πρώτο παραμύθι κίνησης μέχρι τις πρώτες τεχνικές διαχείρισης άγχους.",
      },
      programs: [0, 1, 2],
      steps: {
        id: "pos-kylaei-ena-mathima",
        kicker: "Ένα μάθημα",
        title: "Πώς κυλάει ένα μάθημα",
        items: [
          { title: "Ζέσταμα με παιχνίδι", text: "Ξεκινάμε με κίνηση και γέλιο, ώστε το σώμα και το μυαλό να έρθουν στο μάθημα." },
          { title: "Η ιστορία της ημέρας", text: "Οι στάσεις υφαίνονται μέσα σε μια ιστορία ή ένα θέμα, προσαρμοσμένα στην ηλικία." },
          { title: "Αναπνοή και ισορροπία", text: "Απλές τεχνικές αναπνοής και παιχνίδια ισορροπίας που τα παιδιά θυμούνται και χρησιμοποιούν μόνα τους." },
          { title: "Ήρεμο κλείσιμο", text: "Λίγα λεπτά χαλάρωσης, ώστε το παιδί να φύγει πιο ήρεμο από ό,τι ήρθε." },
        ],
      },
      faq: {
        kicker: "Απορίες",
        title: "Ερωτήσεις για την παιδική yoga",
        items: [
          {
            q: "Από ποια ηλικία μπορεί να ξεκινήσει ένα παιδί yoga;",
            a: "Από τα 3. Για παιδιά 3 έως 5 ετών το μάθημα διαρκεί 45 λεπτά και βασίζεται σχεδόν εξ ολοκλήρου στο παραμύθι και στο παιχνίδι.",
          },
          {
            q: "Πόσο διαρκεί ένα μάθημα;",
            a: "45 λεπτά για παιδιά 3 έως 5 ετών, 55 λεπτά για 6 έως 9 ετών και 60 λεπτά για 10 έως 13 ετών.",
          },
          {
            q: "Ταιριάζει η yoga σε ένα πολύ ζωηρό παιδί;",
            a: "Ναι. Ξεκινάμε από την κίνηση που ήδη αγαπά το παιδί και σιγά σιγά προσθέτουμε στιγμές ηρεμίας και αναπνοής. Ο ρυθμός προσαρμόζεται πάντα στο παιδί και όχι το αντίστροφο.",
          },
          {
            q: "Χρειάζεται το παιδί προηγούμενη εμπειρία;",
            a: "Καθόλου. Τα περισσότερα παιδιά ξεκινούν χωρίς καμία επαφή με τη yoga.",
          },
          {
            q: "Γίνονται τα μαθήματα στο σπίτι;",
            a: "Ναι. Η Ρεγγίνα έρχεται στο σπίτι σας με όλα τα υλικά, σε Αθήνα και κοντινά προάστια. Υπάρχουν επίσης μικρά ομαδικά τμήματα σε συνεργαζόμενους χώρους.",
          },
        ],
      },
    },

    teens: {
      link: "Yoga για εφήβους",
      teaser: "Ένας χώρος χωρίς βαθμούς, για το άγχος, τη δύναμη και τη συγκέντρωση.",
      metaTitle: "Yoga για εφήβους στην Αθήνα, για άγχος και εξετάσεις",
      metaDescription:
        "Yoga για εφήβους 14 έως 16 ετών και προεφήβους 10 έως 13 στην Αθήνα. Αναπνοή για το άγχος των εξετάσεων, δύναμη και ένας χώρος χωρίς κριτική. Στο σπίτι σας ή σε μικρές ομάδες.",
      kicker: "Yoga για εφήβους",
      h1: "Yoga για εφήβους",
      lead: "Ένας χώρος χωρίς βαθμούς και χωρίς κριτική. Αναπνοή για το άγχος, δύναμη για το σώμα και λίγος χρόνος μόνο για τον εαυτό τους.",
      cta: "Κλείστε ένα δοκιμαστικό μάθημα",
      ctaSecondary: { label: "Τι δουλεύουμε", anchor: "ti-douleuoume" },
      intro: {
        title: "Όταν όλα αλλάζουν, ένα σταθερό σημείο",
        body: [
          "Η εφηβεία φέρνει σχολικές απαιτήσεις, εξετάσεις, κοινωνική πίεση και ένα σώμα που αλλάζει γρήγορα. Πολλοί έφηβοι δεν μιλούν εύκολα για όλα αυτά. Η yoga τους δίνει έναν τρόπο να τα διαχειριστούν χωρίς να χρειάζεται να εξηγήσουν τίποτα σε κανέναν.",
          "Τα μαθήματα για εφήβους είναι πιο δυναμικά από ό,τι φαντάζονται: ροές που χτίζουν δύναμη, τεχνικές αναπνοής που λειτουργούν και την ώρα του διαγωνίσματος, και λίγα λεπτά πραγματικής χαλάρωσης στο τέλος.",
        ],
      },
      section: {
        kicker: "Προέφηβοι και έφηβοι",
        title: "Δύο κύκλοι για τα μεγαλύτερα παιδιά",
        lead: "Από τα 10 έως τα 16, με περιεχόμενο που μιλάει στη γλώσσα της ηλικίας.",
      },
      programs: [2, 3],
      steps: {
        id: "ti-douleuoume",
        kicker: "Τι δουλεύουμε",
        title: "Εργαλεία για κάθε μέρα",
        items: [
          { title: "Αναπνοή για το άγχος", text: "Απλές τεχνικές που βοηθούν το σώμα να ηρεμήσει σε λίγα λεπτά, πριν από ένα διαγώνισμα ή μετά από μια δύσκολη μέρα." },
          { title: "Δύναμη και ευλυγισία", text: "Δυναμικές ροές που χτίζουν δύναμη και εμπιστοσύνη σε ένα σώμα που αλλάζει." },
          { title: "Συγκέντρωση", text: "Ασκήσεις προσοχής που βοηθούν στο διάβασμα και στην οργάνωση." },
          { title: "Χρόνος για τον εαυτό τους", text: "Μία ώρα την εβδομάδα χωρίς οθόνες, βαθμούς και σύγκριση." },
        ],
      },
      faq: {
        kicker: "Απορίες",
        title: "Ερωτήσεις για τη yoga στην εφηβεία",
        items: [
          {
            q: "Ο έφηβός μου δεν θέλει να δοκιμάσει. Τι κάνουμε;",
            a: "Το δοκιμαστικό μάθημα είναι χωρίς δέσμευση και χωρίς πίεση. Συχνά βοηθάει να δει ότι δεν πρόκειται για ήπιες διατάσεις, αλλά για κάτι που τον δυναμώνει και του είναι πραγματικά χρήσιμο.",
          },
          {
            q: "Βοηθάει η yoga στο άγχος των εξετάσεων;",
            a: "Οι τεχνικές αναπνοής και χαλάρωσης που μαθαίνουν οι έφηβοι στο μάθημα μπορούν να χρησιμοποιηθούν οπουδήποτε, ακόμα και λίγο πριν από ένα διαγώνισμα. Δεν αντικαθιστούν την υποστήριξη από ειδικό όταν χρειάζεται, δίνουν όμως ένα πρακτικό εργαλείο για κάθε μέρα.",
          },
          {
            q: "Μπορεί να κάνει μάθημα μαζί με έναν φίλο;",
            a: "Ναι. Στο σπίτι τα μαθήματα γίνονται ατομικά ή με αδέρφια και φίλους, και στους συνεργαζόμενους χώρους υπάρχουν μικρές ομάδες ανά ηλικία.",
          },
          {
            q: "Πρέπει να είναι παρόντες οι γονείς;",
            a: "Για τους εφήβους προτείνουμε λίγη απόσταση, ώστε το μάθημα να γίνει δικός τους χρόνος. Με εσάς μένουμε φυσικά σε επικοινωνία.",
          },
          {
            q: "Πόσο διαρκεί το μάθημα;",
            a: "60 λεπτά, τόσο για τους προεφήβους 10 έως 13 ετών όσο και για τους εφήβους 14 έως 16 ετών.",
          },
        ],
      },
    },

    atHome: {
      link: "Κατ' οίκον μαθήματα",
      teaser: "Η δασκάλα έρχεται στο σπίτι σας με όλα τα υλικά.",
      metaTitle: "Κατ' οίκον yoga για παιδιά στην Αθήνα",
      metaDescription:
        "Η δασκάλα έρχεται στο σπίτι σας με όλα τα υλικά. Μαθήματα yoga για παιδιά και εφήβους, ατομικά ή με αδέρφια και φίλους, σε Αθήνα και κοντινά προάστια. Δοκιμαστικό χωρίς δέσμευση.",
      kicker: "Κατ' οίκον μαθήματα",
      h1: "Yoga για παιδιά στο σπίτι σας",
      lead: "Η Ρεγγίνα έρχεται σε εσάς με στρώματα, μουσική και ιστορίες. Εσείς χρειάζεστε μόνο λίγο ελεύθερο χώρο.",
      cta: "Κλείστε ένα δοκιμαστικό μάθημα",
      ctaSecondary: { label: "Τι χρειάζεστε", anchor: "ti-xreiazeste" },
      intro: {
        title: "Γιατί στο σπίτι",
        body: [
          "Στο σπίτι του ένα παιδί νιώθει ήδη ασφαλές. Δεν χρειάζεται να συνηθίσει έναν καινούργιο χώρο, να γνωρίσει άγνωστα παιδιά ή να βιαστεί μέσα στην κίνηση της πόλης. Έτσι αφήνεται στο μάθημα από το πρώτο λεπτό.",
          "Για τους γονείς σημαίνει λιγότερες μετακινήσεις και ένα σταθερό ραντεβού κάθε εβδομάδα. Για παιδιά με άγχος ή αισθητηριακές ιδιαιτερότητες, το οικείο περιβάλλον κάνει συχνά τη μεγαλύτερη διαφορά.",
        ],
      },
      section: {
        kicker: "Πώς λειτουργεί",
        title: "Η yoga έρχεται σε εσάς",
        lead: "Στο σπίτι σας ή, αν προτιμάτε παρέα, σε έναν συνεργαζόμενο χώρο κοντά σας.",
      },
      steps: {
        id: "ti-xreiazeste",
        kicker: "Τι χρειάζεστε",
        title: "Σχεδόν τίποτα",
        items: [
          { title: "Λίγο ελεύθερο χώρο", text: "Ένα ήσυχο σημείο, περίπου όσο ένα χαλί, σε όποιο δωμάτιο σας βολεύει." },
          { title: "Άνετα ρούχα", text: "Ρούχα που επιτρέπουν την κίνηση. Το μάθημα γίνεται ξυπόλυτοι ή με αντιολισθητικές κάλτσες." },
          { title: "Μια σταθερή ώρα", text: "Συμφωνούμε μαζί μια μέρα και ώρα κάθε εβδομάδα, ώστε το μάθημα να γίνει συνήθεια." },
          { title: "Τα υπόλοιπα τα φέρνουμε εμείς", text: "Στρώματα, μουσική, ιστορίες και ό,τι άλλο χρειάζεται το μάθημα." },
        ],
      },
      faq: {
        kicker: "Απορίες",
        title: "Ερωτήσεις για τα μαθήματα στο σπίτι",
        items: [
          {
            q: "Σε ποιες περιοχές γίνονται τα κατ' οίκον μαθήματα;",
            a: "Σε Αθήνα και κοντινά προάστια. Στείλτε μας την περιοχή σας και θα σας πούμε άμεσα αν σας καλύπτουμε ή ποιος συνεργαζόμενος χώρος είναι πιο κοντά σας.",
          },
          {
            q: "Μπορούν να συμμετέχουν αδέρφια ή φίλοι;",
            a: "Ναι. Τα μαθήματα στο σπίτι μπορεί να είναι ατομικά ή για μια μικρή παρέα, με αδέρφια ή φίλους.",
          },
          {
            q: "Μπορώ να παρακολουθήσω το μάθημα;",
            a: "Στις μικρές ηλικίες είστε ευπρόσδεκτοι, και συχνά βοηθάει. Στα μεγαλύτερα παιδιά και στους εφήβους προτείνουμε λίγη απόσταση, ώστε το μάθημα να γίνει δικός τους χρόνος.",
          },
          {
            q: "Πώς κλείνουμε το πρώτο μάθημα;",
            a: "Συμπληρώστε τη φόρμα στο τέλος της σελίδας ή καλέστε μας στο 699 911 4031. Μιλάμε πρώτα για το παιδί σας και μετά κανονίζουμε ένα δοκιμαστικό μάθημα χωρίς δέσμευση.",
          },
        ],
      },
    },
  },
}

const en: PageSet = {
  crumbs: "Home",
  crumbLabel: "Breadcrumb",
  related: { kicker: "See also", title: "Find what suits your child" },
  pages: {
    kids: {
      link: "Yoga for children",
      teaser: "Play, breathing and movement for children aged 3 to 13.",
      metaTitle: "Kids Yoga in Athens, Ages 3 to 13",
      metaDescription:
        "Yoga classes for children aged 3 to 13 in Athens, in your home or at partner studios. Play, breathing and movement for confidence and focus. Trial lesson with no commitment.",
      kicker: "Yoga for children",
      h1: "Kids yoga in Athens",
      lead: "Play, breathing and movement for children aged 3 to 13. In your own home or at a welcoming partner studio, with Regina Avgousti.",
      cta: "Book a trial lesson",
      ctaSecondary: { label: "See the age groups", anchor: "programmes" },
      intro: {
        title: "Yoga as play, not exercise",
        body: [
          "Children don't need to learn the “right” poses. They need to feel their bodies, to play, to laugh and to discover that their own breath can calm them down. That is the heart of children's yoga at Hibi Bloom.",
          "Every lesson is built around a story or a game. Children become trees, cats and eagles; they balance, stretch and, at the end, relax. No grades, no comparisons, and always at each child's own pace.",
        ],
      },
      benefits: "What children gain",
      section: {
        kicker: "By age",
        title: "A programme for every age",
        lead: "From the very first movement story to the first real tools for handling stress.",
      },
      programs: [0, 1, 2],
      steps: {
        id: "how-a-lesson-flows",
        kicker: "A lesson",
        title: "How a lesson flows",
        items: [
          { title: "A playful warm-up", text: "We start with movement and laughter, so body and mind both arrive in the lesson." },
          { title: "The story of the day", text: "Poses are woven into a story or a theme, adapted to the child's age." },
          { title: "Breathing and balance", text: "Simple breathing techniques and balance games that children remember and use on their own." },
          { title: "A calm finish", text: "A few minutes of relaxation, so children leave calmer than they arrived." },
        ],
      },
      faq: {
        kicker: "Questions",
        title: "About yoga for children",
        items: [
          {
            q: "From what age can a child start yoga?",
            a: "From 3. For children aged 3 to 5 the lesson lasts 45 minutes and is built almost entirely on stories and play.",
          },
          {
            q: "How long is a lesson?",
            a: "45 minutes for ages 3 to 5, 55 minutes for ages 6 to 9 and 60 minutes for ages 10 to 13.",
          },
          {
            q: "Is yoga right for a very energetic child?",
            a: "Yes. We start from the movement the child already loves and gradually add moments of calm and breathing. The pace always adapts to the child, never the other way round.",
          },
          {
            q: "Does my child need any experience?",
            a: "Not at all. Most children start with no yoga experience whatsoever.",
          },
          {
            q: "Can lessons take place at home?",
            a: "Yes. Regina comes to your home with everything needed, in Athens and the nearby suburbs. There are also small group classes at partner studios.",
          },
        ],
      },
    },

    teens: {
      link: "Yoga for teens",
      teaser: "A space with no grades, for stress, strength and focus.",
      metaTitle: "Yoga for Teenagers in Athens, for Stress and Exams",
      metaDescription:
        "Yoga for teenagers aged 14 to 16 and preteens aged 10 to 13 in Athens. Breathing for exam stress, strength, and a space free of judgement. At home or in small groups.",
      kicker: "Yoga for teens",
      h1: "Yoga for teenagers",
      lead: "A space with no grades and no judgement. Breathing for stress, strength for the body and a little time that is just for them.",
      cta: "Book a trial lesson",
      ctaSecondary: { label: "What we work on", anchor: "what-we-work-on" },
      intro: {
        title: "When everything changes, something steady",
        body: [
          "The teenage years bring school pressure, exams, social pressure and a body that changes fast. Many teenagers don't find it easy to talk about any of this. Yoga gives them a way to handle it without having to explain anything to anyone.",
          "Lessons for teenagers are more dynamic than they expect: flows that build strength, breathing techniques that still work in the middle of an exam, and a few minutes of real rest at the end.",
        ],
      },
      section: {
        kicker: "Preteens and teens",
        title: "Two circles for older children",
        lead: "From 10 to 16, with content that speaks the language of their age.",
      },
      programs: [2, 3],
      steps: {
        id: "what-we-work-on",
        kicker: "What we work on",
        title: "Tools for every day",
        items: [
          { title: "Breathing for stress", text: "Simple techniques that help the body settle in a few minutes, before an exam or after a hard day." },
          { title: "Strength and flexibility", text: "Dynamic flows that build strength and trust in a body that is changing." },
          { title: "Focus", text: "Attention exercises that help with studying and getting organised." },
          { title: "Time for themselves", text: "One hour a week with no screens, no grades and no comparisons." },
        ],
      },
      faq: {
        kicker: "Questions",
        title: "About yoga for teenagers",
        items: [
          {
            q: "My teenager doesn't want to try it. What can we do?",
            a: "The trial lesson comes with no commitment and no pressure. It often helps for them to see that this isn't gentle stretching, but something that makes them stronger and is genuinely useful.",
          },
          {
            q: "Does yoga help with exam stress?",
            a: "The breathing and relaxation techniques teenagers learn in class can be used anywhere, even just before an exam. They are no substitute for professional support when it is needed, but they give a practical tool for every day.",
          },
          {
            q: "Can they take lessons with a friend?",
            a: "Yes. At home, lessons are one-to-one or with siblings and friends, and partner studios run small groups by age.",
          },
          {
            q: "Do parents need to be there?",
            a: "For teenagers we suggest a little distance, so the lesson becomes their own time. We stay in touch with you, of course.",
          },
          {
            q: "How long is a lesson?",
            a: "60 minutes, both for preteens aged 10 to 13 and for teenagers aged 14 to 16.",
          },
        ],
      },
    },

    atHome: {
      link: "Lessons at home",
      teaser: "The teacher comes to your home with everything needed.",
      metaTitle: "Kids Yoga at Home in Athens",
      metaDescription:
        "The teacher comes to your home with everything needed. Yoga lessons for children and teenagers, one-to-one or with siblings and friends, in Athens and nearby suburbs. Trial lesson with no commitment.",
      kicker: "Lessons at home",
      h1: "Kids yoga in your own home",
      lead: "Regina comes to you with mats, music and stories. All you need is a little free space.",
      cta: "Book a trial lesson",
      ctaSecondary: { label: "What you need", anchor: "what-you-need" },
      intro: {
        title: "Why at home",
        body: [
          "At home, a child already feels safe. There is no new place to get used to, no unfamiliar children to meet and no rushing through city traffic. So they can settle into the lesson from the very first minute.",
          "For parents it means fewer journeys and a fixed appointment every week. For children with anxiety or sensory differences, familiar surroundings often make the biggest difference of all.",
        ],
      },
      section: {
        kicker: "How it works",
        title: "Yoga that comes to you",
        lead: "In your home or, if your child would enjoy the company, at a partner studio near you.",
      },
      steps: {
        id: "what-you-need",
        kicker: "What you need",
        title: "Almost nothing",
        items: [
          { title: "A little free space", text: "A quiet spot about the size of a rug, in whichever room suits you." },
          { title: "Comfortable clothes", text: "Clothes that are easy to move in. Lessons are barefoot or in non-slip socks." },
          { title: "A regular time", text: "We agree on a day and time each week, so the lesson becomes a habit." },
          { title: "We bring the rest", text: "Mats, music, stories and anything else the lesson needs." },
        ],
      },
      faq: {
        kicker: "Questions",
        title: "About lessons at home",
        items: [
          {
            q: "Which areas do you cover for home lessons?",
            a: "Athens and the nearby suburbs. Send us your area and we will tell you straight away whether we cover it, or which partner studio is closest to you.",
          },
          {
            q: "Can siblings or friends join in?",
            a: "Yes. Home lessons can be one-to-one or for a small group, with siblings or friends.",
          },
          {
            q: "Can I watch the lesson?",
            a: "With younger children you are very welcome, and it often helps. For older children and teenagers we suggest a little distance, so the lesson becomes their own time.",
          },
          {
            q: "How do we book the first lesson?",
            a: "Fill in the form at the bottom of this page or call us on +30 699 911 4031. We talk about your child first, then arrange a trial lesson with no commitment.",
          },
        ],
      },
    },
  },
}

export const pageContent: Record<Lang, PageSet> = { el, en }
export const landingKeys: LandingKey[] = ["kids", "teens", "atHome"]
