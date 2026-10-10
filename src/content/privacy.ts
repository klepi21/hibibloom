/**
 * Privacy policy, both languages. Plain facts about what the site actually
 * does: the contact form (via Hostinger mail) and Google Analytics behind a
 * consent banner. No dashes in visitor-facing copy.
 */

import type { Lang } from "./index"

type Policy = {
  title: string
  description: string
  updatedLabel: string
  updated: string
  logoLabel: string
  back: string
  sections: { title: string; body: string[] }[]
}

const el: Policy = {
  title: "Πολιτική απορρήτου",
  description: "Πώς το Hibi Bloom χειρίζεται τα στοιχεία που μας στέλνετε και τα cookies του site.",
  updatedLabel: "Τελευταία ενημέρωση",
  updated: "Οκτώβριος 2026",
  logoLabel: "Hibi Bloom, αρχική σελίδα",
  back: "Επιστροφή στην αρχική",
  sections: [
    {
      title: "Ποιοι είμαστε",
      body: [
        "Υπεύθυνη επεξεργασίας είναι η Ρεγγίνα Αυγουστή, που λειτουργεί το Hibi Bloom. Για οτιδήποτε αφορά τα προσωπικά σας δεδομένα μπορείτε να μας γράψετε στο yoga@hibibloom.gr ή να μας καλέσετε στο 699 911 4031.",
      ],
    },
    {
      title: "Τι στοιχεία συλλέγουμε",
      body: [
        "Όταν συμπληρώνετε τη φόρμα επικοινωνίας, λαμβάνουμε το όνομά σας, το email σας και, αν τα δώσετε, το τηλέφωνό σας, την ηλικία του παιδιού, την περιοχή σας και το μήνυμά σας. Δεν ζητάμε το όνομα του παιδιού ούτε άλλα στοιχεία για αυτό.",
        "Αν επιλέξετε «Αποδοχή» στο μήνυμα για τα cookies, το Google Analytics καταγράφει ανώνυμα στοιχεία περιήγησης, όπως ποιες ενότητες διαβάστηκαν, από ποια συσκευή και από ποια χώρα. Αν επιλέξετε «Απόρριψη», δεν φορτώνεται καμία υπηρεσία μέτρησης και δεν μπαίνει κανένα cookie.",
      ],
    },
    {
      title: "Γιατί τα χρησιμοποιούμε",
      body: [
        "Τα στοιχεία της φόρμας τα χρησιμοποιούμε μόνο για να σας απαντήσουμε και να κανονίσουμε μαζί σας ένα μάθημα. Η νομική βάση είναι η συγκατάθεσή σας και τα βήματα που ζητάτε πριν από μια συνεργασία (άρθρο 6 παρ. 1 α και β του ΓΚΠΔ). Τα στατιστικά του Google Analytics μάς βοηθούν να καταλάβουμε τι είναι χρήσιμο στο site και βασίζονται αποκλειστικά στη συγκατάθεσή σας.",
        "Δεν πουλάμε, δεν νοικιάζουμε και δεν χρησιμοποιούμε τα στοιχεία σας για διαφήμιση.",
      ],
    },
    {
      title: "Ποιοι άλλοι τα επεξεργάζονται",
      body: [
        "Το site φιλοξενείται στη Vercel και τα μηνύματα της φόρμας παραδίδονται μέσω της υπηρεσίας email της Hostinger. Και οι δύο λειτουργούν ως εκτελούντες την επεξεργασία για λογαριασμό μας. Αν δώσετε συγκατάθεση, η Google επεξεργάζεται τα στατιστικά περιήγησης. Ορισμένοι από αυτούς τους παρόχους μπορεί να επεξεργάζονται δεδομένα εκτός Ευρωπαϊκής Ένωσης, με τις εγγυήσεις που προβλέπει ο ΓΚΠΔ, όπως το Πλαίσιο Προστασίας Δεδομένων ΕΕ και ΗΠΑ.",
      ],
    },
    {
      title: "Πόσο καιρό τα κρατάμε",
      body: [
        "Τα μηνύματα της φόρμας τα κρατάμε όσο χρειάζεται για να επικοινωνήσουμε μαζί σας. Αν δεν ξεκινήσει συνεργασία, τα διαγράφουμε το αργότερο μέσα σε δύο χρόνια. Τα στατιστικά του Google Analytics διατηρούνται για 14 μήνες.",
      ],
    },
    {
      title: "Τα δικαιώματά σας",
      body: [
        "Μπορείτε οποτεδήποτε να ζητήσετε πρόσβαση στα στοιχεία σας, διόρθωση, διαγραφή, περιορισμό της επεξεργασίας ή μεταφορά τους, και να ανακαλέσετε τη συγκατάθεσή σας. Για τα cookies αρκεί να πατήσετε «Ρυθμίσεις cookies» στο κάτω μέρος της σελίδας. Για όλα τα υπόλοιπα γράψτε μας στο email παραπάνω και θα σας απαντήσουμε μέσα σε έναν μήνα.",
        "Αν θεωρείτε ότι δεν σεβαστήκαμε τα δικαιώματά σας, έχετε δικαίωμα να υποβάλετε καταγγελία στην Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα (www.dpa.gr).",
      ],
    },
  ],
}

const en: Policy = {
  title: "Privacy policy",
  description: "How Hibi Bloom handles the details you send us and the cookies on this site.",
  updatedLabel: "Last updated",
  updated: "October 2026",
  logoLabel: "Hibi Bloom, home page",
  back: "Back to the home page",
  sections: [
    {
      title: "Who we are",
      body: [
        "The data controller is Regina Avgousti, who runs Hibi Bloom. For anything to do with your personal data, you can write to us at yoga@hibibloom.gr or call us on +30 699 911 4031.",
      ],
    },
    {
      title: "What we collect",
      body: [
        "When you fill in the contact form, we receive your name, your email and, if you give them, your phone number, your child's age, your area and your message. We do not ask for your child's name or any other details about them.",
        "If you choose \u201cAccept\u201d in the cookie notice, Google Analytics records anonymous browsing information, such as which sections were read, on what kind of device and from which country. If you choose \u201cDecline\u201d, no measurement service is loaded and no cookies are set.",
      ],
    },
    {
      title: "Why we use it",
      body: [
        "We use the details from the form only to reply to you and to arrange a lesson together. The legal basis is your consent and the steps you ask us to take before any agreement (Article 6(1)(a) and (b) GDPR). Google Analytics statistics help us understand what is useful on the site and rely solely on your consent.",
        "We do not sell, rent or use your details for advertising.",
      ],
    },
    {
      title: "Who else processes it",
      body: [
        "The site is hosted by Vercel and form messages are delivered through Hostinger's email service. Both act as processors on our behalf. If you give consent, Google processes the browsing statistics. Some of these providers may process data outside the European Union, under the safeguards the GDPR provides for, such as the EU and US Data Privacy Framework.",
      ],
    },
    {
      title: "How long we keep it",
      body: [
        "We keep form messages for as long as we need them to stay in touch with you. If no lessons follow, we delete them within two years at the latest. Google Analytics statistics are kept for 14 months.",
      ],
    },
    {
      title: "Your rights",
      body: [
        "You can ask at any time to access, correct, delete, restrict or transfer your data, and you can withdraw your consent. For cookies, simply press \u201cCookie settings\u201d at the bottom of the page. For everything else, email us at the address above and we will reply within one month.",
        "If you believe we have not respected your rights, you have the right to lodge a complaint with the Hellenic Data Protection Authority (www.dpa.gr).",
      ],
    },
  ],
}

export const privacy: Record<Lang, Policy> = { el, en }
