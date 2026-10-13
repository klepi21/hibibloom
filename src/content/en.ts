/**
 * Hibi Bloom: all English copy, in exactly the shape of el.ts.
 *
 * Written as English, not translated word for word. Same house rule as the
 * Greek: no em dashes in anything a visitor reads.
 */

import type { Content } from "./el"

export const en: Content = {
  site: {
    name: "Hibi Bloom",
    tagline: "kids & teens yoga",
    locale: "en_GB",
    url: "https://www.hibibloom.gr",
    title: "Hibi Bloom · Yoga for Children & Teens in Athens",
    ogTitle: "Hibi Bloom · Every child deserves to bloom",
    keywords: [
      "kids yoga Athens",
      "yoga for children",
      "yoga for teenagers",
      "children's yoga at home",
      "mindfulness for kids",
      "kids yoga classes Athens",
      "English speaking kids yoga Athens",
      "Hibi Bloom",
    ],
    areaServed: "Athens",
    description:
      "Yoga, mindfulness and creative play for children and teenagers, taught in English or Greek. Lessons in your own home or at partner studios in Athens, with Regina Avgousti.",
  },

  nav: {
    links: [
      { label: "Why Hibi Bloom", href: "#why" },
      { label: "Benefits", href: "#benefits" },
      { label: "Programmes", href: "#programmes" },
      { label: "At home", href: "#at-home" },
      { label: "The teacher", href: "#teacher" },
      { label: "FAQ", href: "#faq" },
    ],
    cta: "Book a lesson",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    skip: "Skip to content",
  },

  hero: {
    eyebrow: "Yoga for children & teens",
    headline: ["Every child", "deserves to bloom."],
    bullets: [
      { icon: "flower", text: "Yoga for children & teens" },
      { icon: "leaf", text: "Calm and focus, learned through play" },
      { icon: "rainbow", text: "In your home or at partner studios" },
    ],
    cta: "Book a trial lesson",
    ctaSecondary: "See the programmes",
    scroll: "Scroll to let it bloom",
  },

  why: {
    id: "why",
    kicker: "01 · Our approach",
    title: "Why Hibi Bloom",
    lead: "We don't teach poses. We give children a way to feel safe inside themselves.",
    body: "Every child arrives with their own rhythm, their own energy, their own curiosity. Our job is not to make them all the same. It is to give them space, time and a few good tools. That is how yoga becomes play, breathing becomes a safe place, and movement becomes a language.",
  },

  benefits: {
    id: "benefits",
    kicker: "02 · What grows",
    title: "What we nurture together",
    lead: "Small, everyday skills that last a lifetime.",
    items: [
      {
        title: "Confidence",
        text: "From “I can't” to “let's see”. Every try counts for more than any perfect pose.",
      },
      {
        title: "Focus",
        text: "Attention games that help at school, with homework and with friendships.",
      },
      {
        title: "Self-regulation",
        text: "Breathing techniques children can use anywhere, even when no grown-up is around.",
      },
      {
        title: "Creativity",
        text: "Stories, music and imagination turn every lesson into a journey.",
      },
      {
        title: "Flexibility",
        text: "Strength, balance and freedom of movement, with real respect for a body that is still growing.",
      },
      {
        title: "Joy",
        text: "Because a child who laughs learns more deeply. Always.",
      },
    ],
  },

  bloom: {
    kicker: "Our story in a single image",
    line: "Every lesson, one more petal.",
    aria: "A hibiscus opens as you scroll the page",
  },

  programs: {
    id: "programmes",
    kicker: "03 · Programmes",
    title: "Find the right circle",
    lead: "Every age speaks its own language. We adapt the pace, the play and the length of each lesson.",
    cta: "Ask us",
    items: [
      {
        age: "3–5",
        unit: "years",
        name: "Seedlings",
        duration: "45 minutes",
        text: "Stories, animals and movement. First steps in breathing and body awareness, through pure play.",
        highlights: ["Story yoga", "Balance games", "A calm ending"],
        accent: "melon",
      },
      {
        age: "6–9",
        unit: "years",
        name: "Sprouts",
        duration: "55 minutes",
        text: "Strength, coordination and the first self-regulation tools. This is where confidence is built, with humour and teamwork.",
        highlights: ["Poses & flows", "Breathing exercises", "Group games"],
        accent: "leaf",
      },
      {
        age: "10–13",
        unit: "years",
        name: "Buds",
        duration: "60 minutes",
        text: "At the age when everything starts to change, we offer something steady. Handling stress, body image and real mindfulness.",
        highlights: ["Managing stress", "Dynamic flows", "Meditation"],
        accent: "magenta",
      },
      {
        age: "14–16",
        unit: "years",
        name: "Blooms",
        duration: "60 minutes",
        text: "For teenagers who want a space with no grades and no judgement. Breathing for exam stress, strength, and trust in a body that is changing.",
        highlights: ["Exam stress", "Dynamic yoga", "Relaxation techniques"],
        accent: "forest",
      },
    ],
  },

  home: {
    id: "at-home",
    kicker: "04 · Where lessons happen",
    title: "Yoga that comes to you",
    lead: "Hibi Bloom is not a studio you visit. It is a teacher who comes to the place where children already feel safe.",
    places: [
      {
        key: "spiti",
        title: "In your home",
        text: "Regina brings everything with her: mats, music, stories. All you need is a little free space in one room. Ideal for one-to-one lessons, siblings or a small group of friends.",
        points: ["She brings all the equipment", "One-to-one, or with siblings & friends", "The same day and time every week"],
        image: "/images/scene-home.webp",
        alt: "Illustration: a teacher and a child doing yoga in a cosy living room",
        accent: "melon",
      },
      {
        key: "xoroi",
        title: "At partner studios",
        text: "Group classes at selected children's yoga spaces, run together with the people who look after them. The same philosophy, with more company.",
        points: ["Small groups by age", "Carefully chosen, welcoming spaces", "Ask us which one is closest"],
        image: "/images/scene-studio.webp",
        alt: "Illustration: a teacher leading a small group of children in a bright studio",
        accent: "leaf",
      },
    ],
    steps: [
      { title: "We get to know you", text: "We talk about your child, their needs and their personality." },
      { title: "We try it out", text: "A trial lesson, with no commitment at all." },
      { title: "We bloom", text: "We find our rhythm and the lesson becomes part of the week." },
    ],
  },

  instructor: {
    id: "teacher",
    kicker: "05 · The teacher",
    title: "Meet Regina",
    name: "Regina Avgousti",
    role: "Founder of Hibi Bloom · yoga teacher for children & teens",
    quote: "Every child already knows how to breathe. They just need the space to remember.",
    bio: [
      "Regina started Hibi Bloom with a simple idea: children's yoga doesn't need a studio, it needs a relationship. So she goes to the children, to the place where they feel most at ease.",
      "In her lessons, play and breathing matter equally. She works differently with every age: stories with the little ones, honest conversation and dynamic flow with teenagers.",
    ],
  },

  faq: {
    id: "faq",
    kicker: "06 · Questions",
    title: "Frequently asked questions",
    items: [
      {
        q: "Does my child need any experience?",
        a: "Not at all. Most children start with no yoga experience whatsoever. We always begin with play and move at the child's own pace.",
      },
      {
        q: "What do we need at home?",
        a: "Almost nothing. Regina brings mats and everything else. A quiet spot with a little free space, about the size of a rug, is enough. Lessons are barefoot or in non-slip socks.",
      },
      {
        q: "Which areas do you cover?",
        a: "Home lessons take place in Athens and the nearby suburbs. Send us your area and we will tell you straight away whether we cover it, or which partner studio is closest to you.",
      },
      {
        q: "Can I watch the lesson?",
        a: "With younger children you are very welcome, and it often helps. For older children and teenagers we suggest a little distance, so the lesson becomes their own time.",
      },
      {
        q: "One-to-one or group lessons?",
        a: "Both. At home, lessons are one-to-one or with siblings and friends. At partner studios there are small group classes by age.",
      },
      {
        q: "Are lessons taught in English?",
        a: "Yes. Regina teaches in English as well as Greek, so lessons suit international families in Athens, bilingual children and pupils at international schools.",
      },
      {
        q: "How does the trial lesson work?",
        a: "The first lesson is a chance to get to know each other, with no commitment. Before it, we talk with you about your child's personality and needs.",
      },
      {
        q: "Do you work with children with additional needs?",
        a: "Yes. There is experience with children with ADHD, anxiety and sensory differences. Home lessons help a great deal here, because the child is in their own familiar surroundings.",
      },
    ],
  },

  contact: {
    id: "contact",
    kicker: "07 · Come along",
    title: "Let's bloom together.",
    lead: "Give us a call, message us on Viber or drop us an email. Tell us a little about your child and your area.",
    details: {
      areasLabel: "Areas",
      areas: "Athens & nearby suburbs, at home",
      phoneLabel: "Phone",
      phone: "+30 699 911 4031",
      phoneHref: "tel:+306999114031",
      viberHref: "viber://chat?number=%2B306999114031",
      viberLabel: "Message on Viber",
      emailLabel: "Email",
      email: "yoga@hibibloom.gr",
    },
    social: [{ label: "Instagram", href: "https://www.instagram.com/hibi.bloom/" }],
  },

  footer: {
    blurb: "Yoga for children and teenagers, where they already feel safe: at home.",
    rights: "Made with love in Athens.",
    legal: [{ label: "Privacy policy", route: "privacy" }],
    navTitle: "Explore",
    programsTitle: "Lessons",
    contactTitle: "Contact",
    cookies: "Cookie settings",
  },

  loader: {
    label: "Loading",
    line: "Every child deserves to bloom.",
  },

  analytics: {
    gaId: "G-5QNB8LQ8QP",
    title: "Cookies",
    text: "With your consent we use Google Analytics cookies to count, anonymously, how many people visit the site. Without it, no cookies are set.",
    more: "Privacy policy",
    accept: "Accept",
    decline: "Decline",
  },

  ui: {
    mainNav: "Main navigation",
    menu: "Menu",
    mobileNav: "Navigation",
    footerNav: "Footer",
    langSwitch: "Change language",
    langName: "English",
    home: "Home",
    back: "Back to the home page",
    explore: "Learn more",
  },
}
