export type ServiceSection = {
  title: string;
  body?: string;
  bullets?: string[];
  facts?: { label: string; value: string }[];
};

export type Service = {
  slug: string;
  name: string;
  icon:
    | "compass"
    | "book"
    | "search"
    | "file"
    | "wallet"
    | "stamp";
  cardBlurb: string;
  intro: string;
  sections?: ServiceSection[];
};

export const services: Service[] = [
  {
    slug: "admission-counseling",
    name: "Admission Counseling",
    icon: "compass",
    cardBlurb:
      "Personalised guidance that matches your profile, interests and career goals to the right course and country.",
    intro:
      "Admission Counseling is a personalized guidance process that helps students plan and secure admission to universities and colleges, especially for studying abroad. It involves assessing the student’s academic profile, interests, and career goals, then recommending suitable courses, countries, and institutions. Our counselors assist with every step — from preparing application documents like the Statement of Purpose (SOP) and Letters of Recommendation (LOR) to guiding on entrance tests such as IELTS, TOEFL, GRE, or GMAT. They also provide advice on scholarships, financial aid, and visa applications, ensuring the process is smooth and stress-free. With our expert support, students can maximize their chances of admission to top universities and make informed decisions for a successful academic journey.",
    sections: [
      {
        title: "What’s included",
        bullets: [
          "Academic profile evaluation and career goal mapping",
          "Course, country and institution recommendations",
          "Statement of Purpose (SOP) preparation and review",
          "Letters of Recommendation (LOR) guidance",
          "Entrance test planning — IELTS, TOEFL, GRE, GMAT",
          "Scholarship and financial aid advice",
          "Visa application guidance",
        ],
      },
    ],
  },
  {
    slug: "test-preparation",
    name: "Test Preparation",
    icon: "book",
    cardBlurb:
      "Structured coaching for IELTS, TOEFL, PTE, GRE and GMAT — the scores that unlock your admission and visa.",
    intro:
      "Your English proficiency and aptitude test scores decide which universities you can apply to and, in several countries, whether your student visa is approved. We help you pick the right test for your destination and prepare for it with a clear, score-focused plan.",
    sections: [
      {
        title: "IELTS",
        body: "The IELTS (International English Language Testing System) is one of the world’s most popular English language proficiency tests for study, work, and migration. It is accepted by over 11,000 institutions in more than 140 countries, including universities, employers, immigration authorities, and professional bodies. IELTS is a key requirement for many universities and colleges in English-speaking countries such as the UK, USA, Canada, Australia, Ireland, and New Zealand. It assesses a student’s ability to communicate effectively in English through four skills — Listening, Reading, Writing, and Speaking — ensuring they can manage academic and social life in an English-speaking environment. For study purposes, students usually take the IELTS Academic test, which focuses on the language skills needed for higher education. Achieving a good IELTS score not only helps secure university admission but can also be a requirement for student visas in countries like the UK, Australia, and Canada.",
        facts: [
          { label: "Skills tested", value: "Listening, Reading, Writing, Speaking" },
          { label: "Typical requirement", value: "Overall band 6.0 – 7.5" },
          { label: "Section minimum", value: "Often no band below 5.5 or 6.0" },
          { label: "Accepted by", value: "11,000+ institutions in 140+ countries" },
        ],
      },
      {
        title: "TOEFL",
        body: "TOEFL for study abroad is one of the most widely accepted English proficiency tests for students aiming to study in English-speaking countries such as the USA, Canada, UK, Australia, and New Zealand. TOEFL (Test of English as a Foreign Language) evaluates a student’s ability to use and understand English in an academic setting, measuring four skills — Reading, Listening, Speaking, and Writing. For higher education, students usually take the TOEFL iBT (Internet-Based Test). The test is designed to reflect real academic tasks, such as listening to lectures, reading scholarly texts, participating in discussions, and writing essays. A strong TOEFL score not only increases your chances of admission to top universities but can also be a requirement for student visa applications in certain countries.",
        facts: [
          { label: "Format", value: "TOEFL iBT (Internet-Based Test)" },
          { label: "Skills tested", value: "Reading, Listening, Speaking, Writing" },
          { label: "Typical requirement", value: "70 – 100 out of 120" },
          { label: "Accepted by", value: "12,000+ institutions in 160+ countries" },
        ],
      },
      {
        title: "PTE",
        body: "PTE (Pearson Test of English) Academic is a widely accepted English proficiency test designed to assess the readiness of non-native English speakers for academic life in universities and colleges overseas. Accepted by thousands of institutions in countries such as Australia, New Zealand, the UK, Canada, and the USA, PTE Academic evaluates four core skills — Speaking, Writing, Reading, and Listening — in a single computer-based test. The PTE is popular among study abroad aspirants because it offers fast results, flexible test dates, and AI-based scoring that ensures fairness and accuracy. It is also recognized for student visa applications in several countries, making it a strong alternative to IELTS and TOEFL.",
        facts: [
          { label: "Format", value: "Single computer-based test, AI-scored" },
          { label: "Results", value: "Usually in 2 – 3 days" },
          { label: "Typical requirement", value: "50 – 65; top institutions 65 – 79" },
          { label: "Skills tested", value: "Speaking, Writing, Reading, Listening" },
        ],
      },
      {
        title: "GRE — Graduate Record Examination",
        body: "The GRE is required for admission to Master’s, PhD, and sometimes MBA programs in various fields. It is best suited to students aiming for a wide range of disciplines like engineering, sciences, humanities, and social sciences.",
        bullets: [
          "Verbal Reasoning — vocabulary, comprehension, critical reasoning (130–170)",
          "Quantitative Reasoning — mathematics, data interpretation, problem-solving (130–170)",
          "Analytical Writing — essays assessing critical thinking and argument development (0–6)",
        ],
        facts: [
          { label: "Purpose", value: "Master’s, PhD and some MBA programs" },
          { label: "Accepted in", value: "USA, Canada, UK, Europe, Australia and more" },
        ],
      },
      {
        title: "GMAT — Graduate Management Admission Test",
        body: "The GMAT is specifically designed for MBA and other business-related master’s programs. It is best suited to students focused on business, finance, management, and leadership careers.",
        bullets: [
          "Analytical Writing — one essay evaluating critical thinking",
          "Integrated Reasoning — data analysis and interpretation",
          "Quantitative Reasoning — problem-solving, data sufficiency",
          "Verbal Reasoning — reading comprehension, critical reasoning, sentence correction",
        ],
        facts: [
          { label: "Score range", value: "200 – 800, plus separate section scores" },
          {
            label: "Accepted in",
            value: "Top business schools in USA, Canada, UK, Australia, Europe and Asia",
          },
        ],
      },
    ],
  },
  {
    slug: "university-selection",
    name: "University Selection",
    icon: "search",
    cardBlurb:
      "A tailored shortlist built around your profile, budget and the real odds of an offer.",
    intro:
      "University Selection is a carefully guided process where we match each student’s academic profile, career aspirations, and financial plan with the best-fit institutions worldwide. We analyze factors such as global rankings, course structure, faculty expertise, location advantages, tuition costs, and scholarship opportunities to create a tailored list of universities. Our goal is to ensure that students apply to institutions where they have the highest chances of admission and success, both academically and professionally. With our expertise and up-to-date knowledge of global education trends, we help students make confident, well-informed choices that set the foundation for a bright future.",
    sections: [
      {
        title: "What we weigh up",
        bullets: [
          "Global and subject-specific rankings",
          "Course structure and specialisations",
          "Faculty expertise and research output",
          "Location, climate and cost of living",
          "Tuition costs against your financial plan",
          "Scholarship and assistantship opportunities",
          "Realistic admission probability for your profile",
        ],
      },
    ],
  },
  {
    slug: "application-assistance",
    name: "Application Assistance",
    icon: "file",
    cardBlurb:
      "End-to-end support on documents, forms and deadlines so nothing slips through the cracks.",
    intro:
      "Application Assistance is a comprehensive support service where we guide students through every step of the university application process to ensure accuracy, completeness, and timely submission. We help prepare and review essential documents such as the Statement of Purpose (SOP), Letters of Recommendation (LOR), academic transcripts, and resumes, ensuring they meet each university’s specific requirements. Our team also assists with filling out application forms, tracking deadlines, and managing multiple submissions to different institutions. By providing personalized guidance and meticulous attention to detail, we maximize our students’ chances of receiving admission offers from their preferred universities.",
    sections: [
      {
        title: "What we handle with you",
        bullets: [
          "Statement of Purpose (SOP) drafting and review",
          "Letters of Recommendation (LOR) coordination",
          "Academic transcripts and document formatting",
          "Resume and CV preparation",
          "Application form completion",
          "Deadline tracking across multiple universities",
          "Managing parallel submissions and offer comparisons",
        ],
      },
    ],
  },
  {
    slug: "education-loan-assistance",
    name: "Education Loan Assistance",
    icon: "wallet",
    cardBlurb:
      "Help identifying the right lender, preparing documents and getting your loan sanctioned.",
    intro:
      "Education Loan Assistance is designed to help students secure the necessary funding for their study abroad journey with ease and confidence. We guide students in identifying the most suitable loan options from trusted banks and financial institutions, considering factors such as interest rates, repayment terms, and eligibility criteria. Our team assists in preparing and organizing the required documentation, filling out loan applications, and coordinating with lenders to ensure a smooth approval process. By providing transparent advice and end-to-end support, we help students and their families access affordable financing solutions that make pursuing an international education financially feasible.",
    sections: [
      {
        title: "How we support you",
        bullets: [
          "Comparing lenders on interest rates and repayment terms",
          "Checking eligibility criteria before you apply",
          "Preparing and organising the required documentation",
          "Completing loan application forms accurately",
          "Coordinating directly with banks and lenders",
          "Guidance on collateral and non-collateral options",
        ],
      },
    ],
  },
  {
    slug: "visa-guidance",
    name: "Visa Guidance",
    icon: "stamp",
    cardBlurb:
      "Country-specific visa support, document checks and mock interviews to get you approved.",
    intro:
      "Visa Guidance is a step-by-step support service that ensures students successfully secure their study visas without unnecessary stress or delays. We assist in understanding country-specific visa requirements, preparing and organizing all necessary documents, and completing application forms accurately. Our team provides guidance on financial proofs, health checks, and other compliance requirements, along with conducting mock interviews to build confidence for visa interviews. With our expertise and up-to-date knowledge of immigration regulations, we streamline the entire visa process, helping students obtain approvals smoothly and focus on preparing for their academic journey abroad.",
    sections: [
      {
        title: "What’s covered",
        bullets: [
          "Country-specific visa requirement briefings",
          "Document preparation and verification",
          "Accurate completion of application forms",
          "Guidance on financial proofs and funds documentation",
          "Health checks and compliance requirements",
          "Mock visa interviews and confidence coaching",
          "Updates on changing immigration regulations",
        ],
      },
    ],
  },
];

export const serviceBySlug = (slug: string) =>
  services.find((s) => s.slug === slug);

export const serviceSlugs = services.map((s) => s.slug);

/** The student journey shown on the home page and the About page. */
export const processSteps = [
  {
    step: "01",
    title: "Profile Evaluation",
    body: "We assess your academics, test scores, budget and career goals to understand what is realistically achievable.",
  },
  {
    step: "02",
    title: "Course & Country Selection",
    body: "Together we choose the destination and programme that fit your profile, finances and long-term plans.",
  },
  {
    step: "03",
    title: "University Shortlisting",
    body: "You receive a tailored list of ambitious, target and safe universities with honest admission odds.",
  },
  {
    step: "04",
    title: "Application & Documentation",
    body: "We prepare your SOP, LORs, transcripts and resume, then submit and track every application.",
  },
  {
    step: "05",
    title: "Offer & Loan Support",
    body: "We help you compare offers, accept the right one and arrange education loan funding.",
  },
  {
    step: "06",
    title: "Visa & Departure",
    body: "Visa filing, mock interviews, accommodation and pre-departure briefing — right up to your flight.",
  },
] as const;
