export type CountrySection = {
  title: string;
  body?: string;
  bullets?: string[];
  steps?: { title: string; body: string }[];
};

export type Country = {
  slug: string;
  name: string;
  navLabel: string;
  /**
   * Kept for reference only. Flags are rendered from real images via
   * `src/components/Flag.tsx` — Windows ships no glyphs for emoji flags, so
   * these showed up as a blank gap for a large share of visitors.
   */
  flag: string;
  region: "Americas" | "Europe" | "Oceania" | "Middle East";
  cardBlurb: string;
  intro: string;
  highlights: { title: string; points: string[] }[];
  sections?: CountrySection[];
};

export const countries: Country[] = [
  {
    slug: "usa",
    name: "USA",
    navLabel: "Study in USA",
    flag: "🇺🇸",
    region: "Americas",
    cardBlurb:
      "World-class universities, unmatched research funding and OPT/CPT work pathways.",
    intro:
      "Studying in the USA offers students access to world-class universities, diverse academic programs, and a flexible education system that encourages innovation and practical learning. With globally recognized degrees, students can choose from a wide range of courses, from STEM fields to business, arts, and humanities. The USA provides opportunities for research, internships, and post-study work through programs like OPT and CPT, helping students gain valuable international experience. The multicultural environment, advanced facilities, and strong career prospects make the USA a top destination for higher education, attracting ambitious learners from all over the world.",
    highlights: [
      {
        title: "World-Class Education",
        points: [
          "Home to prestigious universities",
          "Cutting-edge research facilities and globally recognized degrees",
        ],
      },
      {
        title: "Wide Range of Courses",
        points: [
          "Flexibility to choose majors, minors, and electives",
          "Strong programs in STEM, business, arts, and humanities",
        ],
      },
      {
        title: "Research & Innovation Opportunities",
        points: [
          "Access to state-of-the-art labs and funded research projects",
          "Collaboration with industry leaders and startups",
        ],
      },
      {
        title: "Career Opportunities",
        points: [
          "Internship programs like CPT and post-study work through OPT",
          "Strong job market for skilled graduates, especially in STEM fields",
        ],
      },
      {
        title: "Multicultural Environment",
        points: [
          "Diverse student community from all over the world",
          "Exposure to global perspectives and networking opportunities",
        ],
      },
      {
        title: "Personal & Professional Growth",
        points: [
          "Develop independence, adaptability, and leadership skills",
          "Opportunities to join clubs, sports, and extracurricular activities",
        ],
      },
      {
        title: "Scholarship & Funding Options",
        points: [
          "Merit-based and need-based scholarships from universities and organizations",
          "Graduate assistantships and research grants",
        ],
      },
    ],
  },
  {
    slug: "uk",
    name: "UK",
    navLabel: "Study in UK",
    flag: "🇬🇧",
    region: "Europe",
    cardBlurb:
      "One-year master’s degrees, historic institutions and the Graduate Route work visa.",
    intro:
      "Studying in the UK offers students access to some of the world’s most prestigious universities, a rich academic heritage, and a globally respected education system. With diverse programs in science, business, technology, arts, and humanities, UK institutions focus on developing critical thinking, research skills, and practical knowledge. Courses are often shorter in duration — three years for undergraduate and one year for master’s — making them more time and cost-efficient. Students benefit from a multicultural environment, opportunities for internships and part-time work, and the Graduate Route visa, which allows them to work in the UK after graduation. This combination of academic excellence and career opportunities makes the UK a leading destination for international education.",
    highlights: [
      {
        title: "Globally Recognized Degrees",
        points: [
          "UK universities like Oxford, Cambridge, and Imperial College London rank among the best in the world.",
        ],
      },
      {
        title: "Shorter Course Duration",
        points: [
          "Undergraduate degrees usually take 3 years, and master’s degrees often just 1 year, saving time and cost.",
        ],
      },
      {
        title: "High-Quality Education",
        points: [
          "Emphasis on research, critical thinking, and practical skills that employers value.",
        ],
      },
      {
        title: "Multicultural Environment",
        points: [
          "Students from all over the world, creating a diverse and inclusive learning atmosphere.",
        ],
      },
      {
        title: "Work Opportunities",
        points: [
          "Part-time work allowed during studies and the Graduate Route visa offers up to 2 years (3 for PhD) post-study work.",
        ],
      },
      {
        title: "Strong Industry Links",
        points: [
          "Internship and placement opportunities with leading global companies.",
        ],
      },
      {
        title: "Rich Cultural Experience",
        points: [
          "History, art, literature, and vibrant cities provide unique cultural exposure alongside academic learning.",
        ],
      },
    ],
  },
  {
    slug: "canada",
    name: "Canada",
    navLabel: "Study in Canada",
    flag: "🇨🇦",
    region: "Americas",
    cardBlurb:
      "Affordable tuition, a 3-year post-graduation work permit and a clear PR pathway.",
    intro:
      "Studying in Canada offers students a world-class education, affordable tuition fees, and an excellent quality of life. Home to top-ranked universities and colleges, Canada provides a wide range of programs in fields like engineering, business, healthcare, technology, and the arts. The country is known for its safe, multicultural environment and welcoming immigration policies, making it a popular choice for international students. With opportunities for part-time work during studies and post-graduation work permits, Canada allows students to gain valuable work experience while building a pathway to permanent residency. Its stunning natural landscapes and vibrant cities add to the overall experience, making Canada an ideal destination for higher education.",
    highlights: [
      {
        title: "High-Quality Education",
        points: [
          "Home to globally ranked universities like the University of Toronto, Algoma, and UNBC.",
          "Recognized degrees that are respected worldwide.",
        ],
      },
      {
        title: "Affordable Tuition & Living Costs",
        points: [
          "Lower tuition compared to the USA, UK, and Australia.",
          "Reasonable living expenses without compromising quality of life.",
        ],
      },
      {
        title: "Post-Graduation Work Opportunities",
        points: [
          "Post-Graduation Work Permit (PGWP) allows up to 3 years of work after studies.",
        ],
      },
      {
        title: "Pathway to Permanent Residency",
        points: [
          "Friendly immigration policies make it easier to settle after graduation.",
        ],
      },
      {
        title: "Safe & Multicultural Environment",
        points: [
          "Ranked among the safest countries in the world.",
          "Welcoming to students from diverse backgrounds.",
        ],
      },
      {
        title: "Work While You Study",
        points: [
          "Eligible to work up to 20 hours/week during semesters and full-time in breaks.",
        ],
      },
      {
        title: "Stunning Natural Beauty & Quality of Life",
        points: [
          "Access to breathtaking landscapes, outdoor activities, and clean, green cities.",
        ],
      },
    ],
  },
  {
    slug: "australia",
    name: "Australia",
    navLabel: "Study in Australia",
    flag: "🇦🇺",
    region: "Oceania",
    cardBlurb:
      "Top-ranked universities, a 2–4 year graduate visa and an outstanding lifestyle.",
    intro:
      "Studying in Australia offers students a globally recognized education, vibrant campus life, and access to some of the world’s top universities such as the University of Melbourne, Australian National University, and the University of Sydney. Known for its high academic standards and innovative teaching methods, Australia provides diverse programs in fields like engineering, business, health sciences, and technology. International students benefit from part-time work opportunities during studies, post-study work visas, and a safe, multicultural environment. With its beautiful landscapes, sunny climate, and high quality of life, Australia combines academic excellence with an exceptional lifestyle, making it a top choice for higher education abroad.",
    highlights: [
      {
        title: "World-Class Education",
        points: [
          "Home to top-ranked universities like the University of Melbourne, ANU, and University of Sydney.",
          "Globally recognized degrees valued by employers worldwide.",
        ],
      },
      {
        title: "Diverse Course Options",
        points: [
          "Wide range of programs in engineering, business, health sciences, arts, and technology.",
        ],
      },
      {
        title: "Post-Study Work Opportunities",
        points: [
          "Temporary Graduate Visa (Subclass 485) allows graduates to work for 2–4 years after completing studies.",
        ],
      },
      {
        title: "Work While You Study",
        points: [
          "Eligible to work up to 48 hours every two weeks during semesters and full-time during breaks.",
        ],
      },
      {
        title: "Multicultural & Safe Environment",
        points: [
          "Welcoming to students from around the globe, with vibrant cultural diversity.",
        ],
      },
      {
        title: "High Quality of Life",
        points: [
          "Clean cities, modern infrastructure, and excellent healthcare systems.",
        ],
      },
      {
        title: "Stunning Natural Beauty",
        points: [
          "Access to beaches, rainforests, and iconic landmarks like the Great Barrier Reef.",
        ],
      },
    ],
  },
  {
    slug: "new-zealand",
    name: "New Zealand",
    navLabel: "Study in New Zealand",
    flag: "🇳🇿",
    region: "Oceania",
    cardBlurb:
      "Practical, career-focused learning and globally recognised qualifications.",
    intro:
      "New Zealand is an attractive destination for international students seeking high-quality education, practical learning, globally recognised qualifications and an excellent student lifestyle. Its education system offers options ranging from universities and postgraduate study to vocational and applied education. With a welcoming multicultural environment and strong emphasis on developing practical skills, New Zealand can provide students with valuable academic, personal and professional experiences.",
    highlights: [
      {
        title: "High-Quality Education",
        points: [
          "New Zealand offers internationally recognised education with programmes designed to develop academic knowledge, practical skills and career readiness.",
        ],
      },
      {
        title: "Globally Recognised Qualifications",
        points: [
          "New Zealand qualifications are valued internationally and can help students build a strong foundation for further study and professional careers.",
        ],
      },
      {
        title: "Career-Focused Learning",
        points: [
          "Many programmes emphasise practical, real-world learning and skills that can help students prepare for the workplace.",
        ],
      },
      {
        title: "Outstanding Lifestyle",
        points: [
          "Students can enjoy a combination of modern cities, beautiful natural surroundings, outdoor activities and a multicultural environment.",
        ],
      },
    ],
    sections: [
      {
        title: "Wide Range of Courses",
        body: "Students can choose from many areas, including:",
        bullets: [
          "Information Technology & Computer Science",
          "Engineering & Technology",
          "Business & Management",
          "Accounting & Finance",
          "Health & Medicine",
          "Data Science",
          "Hospitality & Tourism",
          "Creative Arts & Design",
          "Applied Sciences",
          "English Language Studies",
        ],
      },
      {
        title: "Study Options in New Zealand",
        body: "Students can choose from different types of education providers, including:",
        bullets: [
          "Universities — Undergraduate, postgraduate and PhD programmes with a strong focus on academic and research excellence.",
          "Institutes of Technology & Polytechnics — Practical and career-focused programmes with hands-on learning.",
          "Private Training Establishments — Specialised programmes designed around particular industries and career areas.",
        ],
      },
      {
        title: "Popular Study Destinations",
        body: "Each destination offers a different student experience, lifestyle and range of study opportunities.",
        bullets: [
          "Auckland",
          "Wellington",
          "Christchurch",
          "Hamilton",
          "Dunedin",
          "Palmerston North",
        ],
      },
      {
        title: "New Zealand Student Visa",
        body: "For students planning to study for more than three months, a student visa is generally required. The Fee Paying Student Visa is the most common option for international students and can allow full-time study at an approved education provider for up to four years, subject to the visa conditions. Students generally need to meet requirements relating to:",
        bullets: [
          "Offer of place from an approved education provider",
          "Tuition fee payment or acceptable funding",
          "Living expenses",
          "Health and travel insurance",
          "Genuine intention to study",
          "Other applicable immigration requirements",
        ],
      },
      {
        title: "Work While Studying",
        body: "Eligible students may be able to work while studying, depending on their course and the conditions attached to their student visa. Students should check their individual visa conditions before beginning employment.",
      },
      {
        title: "Scholarships",
        body: "Many New Zealand education providers offer scholarships and other financial support opportunities for international students. Eligibility, value and application deadlines vary by institution and programme.",
      },
    ],
  },
  {
    slug: "ireland",
    name: "Ireland",
    navLabel: "Study in Ireland",
    flag: "🇮🇪",
    region: "Europe",
    cardBlurb:
      "An English-speaking tech and pharma hub with a 2-year post-study work visa.",
    intro:
      "Studying in Ireland offers students a high-quality education, internationally recognized degrees, and the chance to live in a friendly, safe, and culturally rich environment. Home to top institutions like Trinity College Dublin, University College Dublin, and the National University of Ireland, Ireland is known for its strong programs in technology, business, healthcare, and literature. The country has a rapidly growing economy, especially in sectors like IT, pharmaceuticals, and finance, providing excellent career prospects. International students can work part-time during their studies and benefit from post-study work visas, making Ireland an attractive choice for building both academic and professional futures in the heart of Europe.",
    highlights: [
      {
        title: "Globally Recognized Education",
        points: [
          "Home to prestigious universities like Trinity College Dublin and University College Dublin.",
          "Strong academic reputation, especially in technology, business, medicine, and literature.",
        ],
      },
      {
        title: "Thriving Career Opportunities",
        points: [
          "Hub for multinational companies in IT, pharmaceuticals, and finance.",
          "Great job prospects through the Third Level Graduate Scheme.",
        ],
      },
      {
        title: "Post-Study Work Visa",
        points: [
          "Master’s graduates can stay up to 2 years after studies to work in Ireland.",
        ],
      },
      {
        title: "English-Speaking Country",
        points: [
          "No language barrier for English-speaking students, making communication and learning easier.",
        ],
      },
      {
        title: "Friendly & Safe Environment",
        points: [
          "Known for its welcoming culture, safety, and vibrant student life.",
        ],
      },
      {
        title: "Gateway to Europe",
        points: [
          "Easy travel to other European countries for study, work, or leisure.",
        ],
      },
      {
        title: "Rich Cultural Heritage",
        points: ["Unique mix of history, music, literature, and scenic beauty."],
      },
    ],
  },
  {
    slug: "germany",
    name: "Germany",
    navLabel: "Study in Germany",
    flag: "🇩🇪",
    region: "Europe",
    cardBlurb:
      "Low or no tuition at public universities, plus Europe’s strongest engineering sector.",
    intro:
      "Germany is one of Europe’s most attractive destinations for international students, offering high-quality education, internationally recognised qualifications, strong research opportunities and comparatively affordable study options. With a wide range of programmes taught in English and German, students can choose courses that match their academic background and career goals. Germany also has a strong economy and is home to leading industries in areas such as engineering, automotive, technology, healthcare, business and manufacturing.",
    highlights: [
      {
        title: "High-Quality Education",
        points: [
          "German universities are recognised for their academic standards, research facilities and practical approach to education.",
        ],
      },
      {
        title: "Affordable Education",
        points: [
          "Many public universities generally do not charge tuition fees for Bachelor’s programmes and many Master’s programmes.",
          "Students normally have to pay a semester contribution, and certain universities, programmes and states may charge tuition fees for international students.",
        ],
      },
      {
        title: "English-Taught Programmes",
        points: [
          "A growing number of international programmes are taught in English, particularly at postgraduate level.",
          "Programmes taught in German generally require proof of German-language proficiency, with requirements varying by institution and course.",
        ],
      },
      {
        title: "Strong Career Opportunities",
        points: [
          "Germany’s strong industrial and technology sectors provide opportunities for graduates in fields such as engineering, IT, data science, business, healthcare and other specialised areas.",
        ],
      },
      {
        title: "Research & Innovation",
        points: [
          "Germany is internationally recognised for research and innovation, making it an attractive destination for students interested in advanced technology and academic research.",
        ],
      },
      {
        title: "European Experience",
        points: [
          "Studying in Germany gives international students the opportunity to experience German culture while being based in the heart of Europe.",
        ],
      },
    ],
    sections: [
      {
        title: "Popular Courses to Study in Germany",
        body: "Students can explore a wide range of programmes, including:",
        bullets: [
          "Computer Science & Information Technology",
          "Artificial Intelligence & Data Science",
          "Mechanical Engineering",
          "Electrical & Electronics Engineering",
          "Civil Engineering",
          "Automotive Engineering",
          "Business & Management",
          "Finance & Accounting",
          "Biotechnology",
          "Renewable Energy",
          "Environmental Sciences",
          "Healthcare & Life Sciences",
          "Architecture & Design",
          "Supply Chain & Logistics",
        ],
      },
      {
        title: "Study Options in Germany",
        steps: [
          {
            title: "Bachelor’s Degree",
            body: "A Bachelor’s degree provides a strong academic foundation and can prepare students for professional careers or further postgraduate study.",
          },
          {
            title: "Master’s Degree",
            body: "Germany is particularly popular among international students pursuing Master’s programmes, including many English-taught options.",
          },
          {
            title: "PhD & Research",
            body: "Students interested in research can explore doctoral opportunities at German universities and research institutions.",
          },
        ],
      },
      {
        title: "Cost of Studying in Germany",
        body: "One of Germany’s major attractions is its comparatively affordable public higher-education system. Most public universities generally have no tuition fees for Bachelor’s programmes and many Master’s programmes, although exceptions exist. For example, Baden-Württemberg charges non-EU students tuition fees of €1,500 per semester for many degree programmes, and some institutions in Bavaria may also charge tuition fees to international students. Students should also budget for a semester contribution, which varies by university and location — DAAD currently gives a typical range of approximately €70–€430 per semester. Living expenses depend heavily on the city and lifestyle; DAAD estimates students may need around €900–€1,200 per month for living costs.",
      },
      {
        title: "Germany Student Visa",
        body: "International students from countries that require a visa generally need to obtain a German student visa before travelling to Germany. Typical requirements may include:",
        bullets: [
          "University admission letter",
          "Valid passport",
          "Academic documents",
          "Proof of language proficiency, where required",
          "Health insurance",
          "Proof of sufficient financial resources",
          "Visa application documents",
          "Other documents requested by the German authorities",
        ],
      },
      {
        title: "Proof of Financial Resources",
        body: "For 2026, Germany’s official Make it in Germany portal states that students can demonstrate financial resources through a blocked account with at least €11,904 for one year, or through other accepted forms such as a scholarship or declaration of commitment. Requirements can change, so students should verify the latest requirements with the German embassy or consulate responsible for their application.",
      },
      {
        title: "Language Requirements",
        body: "The language requirement depends on the programme. German-taught programmes commonly require German-language proficiency around B2 or higher, although the exact requirement depends on the university and course. For English-taught programmes, students generally need to demonstrate English proficiency according to the university’s requirements — IELTS, TOEFL or other accepted tests may be required depending on the programme.",
      },
      {
        title: "Popular Study Destinations in Germany",
        bullets: [
          "Berlin — A vibrant international city with opportunities in technology, business and creative industries.",
          "Munich — A major centre for engineering, technology, business and automotive industries.",
          "Frankfurt — An important international financial and business hub.",
          "Hamburg — A major European city with strong business, logistics and maritime industries.",
          "Cologne — A popular student city with diverse academic and cultural opportunities.",
          "Stuttgart — Particularly well known for engineering, automotive and technology industries.",
        ],
      },
      {
        title: "Scholarships in Germany",
        body: "International students can explore scholarships offered by organisations such as the DAAD, universities and other funding organisations. Scholarship eligibility, benefits and deadlines vary depending on the programme and applicant profile.",
      },
    ],
  },
  {
    slug: "france",
    name: "France",
    navLabel: "Study in France",
    flag: "🇫🇷",
    region: "Europe",
    cardBlurb:
      "World-leading business schools, affordable public universities and Campus France support.",
    intro:
      "France is one of Europe’s most popular study destinations for international students, offering internationally recognised education, innovative academic programs and excellent opportunities for personal and professional growth. Students can choose from a wide range of programs in business, management, engineering, technology, fashion, hospitality, science and other fields. At Vikas Overseas, we help students choose the right course and institution and guide them through the application, documentation, Campus France and student visa process.",
    highlights: [
      {
        title: "Globally Recognised Institutions",
        points: [
          "Globally recognised universities and higher-education institutions",
          "Wide range of Bachelor’s, Master’s and specialised programs",
        ],
      },
      {
        title: "English-Taught Programs",
        points: [
          "Many English-taught programs, especially at postgraduate level",
          "Opportunity to learn French and develop international communication skills",
        ],
      },
      {
        title: "Affordable Study Options",
        points: [
          "Affordable study options at many public institutions",
          "Scholarship and tuition-fee support opportunities",
        ],
      },
      {
        title: "Research & Industry",
        points: [
          "Excellent research and innovation environment",
          "Strong links between education and industry",
        ],
      },
      {
        title: "International Environment",
        points: [
          "Multicultural environment with students from around the world",
          "Access to the wider European academic and professional environment",
        ],
      },
    ],
    sections: [
      {
        title: "Popular Courses in France",
        body: "France offers programs across a wide range of disciplines, including:",
        bullets: [
          "Business & Management",
          "Finance & Accounting",
          "International Business",
          "Data Science & Artificial Intelligence",
          "Computer Science & Information Technology",
          "Engineering",
          "Cybersecurity",
          "Biotechnology",
          "Renewable Energy",
          "Supply Chain Management",
          "Fashion & Luxury Management",
          "Hospitality & Tourism",
          "Architecture & Design",
          "International Relations",
        ],
      },
      {
        title: "Study Options",
        steps: [
          {
            title: "Bachelor’s Programs",
            body: "Students can explore undergraduate programs across business, engineering, technology, science, arts and other disciplines.",
          },
          {
            title: "Master’s Programs",
            body: "France is particularly popular for postgraduate study, with a wide range of specialised Master’s, MSc and management programs.",
          },
          {
            title: "MBA & Business Programs",
            body: "French business schools offer internationally focused programs in management, finance, marketing, luxury management, entrepreneurship and related fields.",
          },
          {
            title: "Doctoral Programs",
            body: "Students interested in research can explore PhD and doctoral opportunities at French universities and research institutions.",
          },
        ],
      },
      {
        title: "English-Taught Programs & Language",
        body: "Students who do not speak French can find a variety of programs taught in English, particularly at Master’s level and in areas such as business, management, engineering and technology. English-language requirements depend on the university and course — students may be asked to provide IELTS, TOEFL, PTE or another accepted qualification, while some institutions may have alternative requirements. For French-taught programs, students may need to demonstrate an appropriate level of French proficiency.",
      },
      {
        title: "Admission Requirements",
        body: "Admission requirements vary according to the university, course and level of study. Common requirements may include:",
        bullets: [
          "Academic certificates and transcripts",
          "Valid passport",
          "Curriculum Vitae / Resume",
          "Statement of Purpose or Motivation Letter",
          "Letters of Recommendation, where required",
          "English-language test score, where required",
          "French-language qualification for French-taught programs",
          "Portfolio for selected creative programs",
          "Work experience for selected postgraduate programs",
        ],
      },
      {
        title: "Application Process",
        body: "The typical study-abroad journey includes: Course Selection → University Selection → Eligibility Check → Document Preparation → Application → Admission → Études en France / Campus France Procedure, where applicable → Student Visa → Accommodation → Departure. Our counselling team can assist students throughout the process.",
      },
      {
        title: "Campus France / Études en France",
        body: "For students from countries covered by the Études en France procedure, the required Campus France process is an important part of the application journey. Students may need assistance with:",
        bullets: [
          "Creating and completing the application",
          "Selecting suitable programs",
          "Uploading academic documents",
          "Application tracking",
          "Preparing for interviews, where applicable",
          "Understanding the next steps after admission",
        ],
      },
      {
        title: "Tuition Fees & Cost of Living",
        body: "The cost of studying in France depends on the type of institution, course and city. Public institutions may offer more affordable options, while private universities and specialised business schools can have significantly higher fees. Paris and some major cities generally have higher living costs than smaller cities. Students should budget for:",
        bullets: [
          "Tuition fees",
          "Accommodation",
          "Food and daily expenses",
          "Local transportation",
          "Health/insurance-related expenses",
          "Books and study materials",
          "Personal expenses",
        ],
      },
      {
        title: "Scholarships in France",
        body: "International students may find scholarship and financial-support opportunities through:",
        bullets: [
          "French government scholarship programs",
          "University scholarships",
          "Excellence scholarships",
          "Tuition-fee reductions or waivers",
          "Erasmus+ opportunities",
          "Institution-specific scholarships",
        ],
      },
      {
        title: "Student Visa for France",
        body: "Students planning to undertake long-duration studies in France generally need to apply for the appropriate long-stay student visa. The visa process may involve:",
        bullets: [
          "France-Visas application",
          "Admission/enrolment documents",
          "Campus France / Études en France formalities, where applicable",
          "Proof of financial resources",
          "Accommodation information",
          "Supporting academic documents",
          "Visa appointment and biometrics",
        ],
      },
      {
        title: "Accommodation",
        body: "Early accommodation planning is recommended, particularly for popular cities. Students can choose from several options:",
        bullets: [
          "Student residences",
          "CROUS residences",
          "Private student accommodation",
          "Shared apartments",
          "Private rental properties",
          "Homestay arrangements",
        ],
      },
      {
        title: "Career Opportunities",
        body: "Eligible international students may be permitted to work part-time while studying, subject to French regulations. Student employment should be considered supplementary income and not the primary source of funding for studies. France has strong industries across areas such as:",
        bullets: [
          "Information Technology",
          "Engineering",
          "Finance",
          "Business & Management",
          "Automotive",
          "Aerospace",
          "Luxury & Fashion",
          "Hospitality",
          "Renewable Energy",
          "Artificial Intelligence and Data",
        ],
      },
    ],
  },
  {
    slug: "italy",
    name: "Italy",
    navLabel: "Study in Italy",
    flag: "🇮🇹",
    region: "Europe",
    cardBlurb:
      "Historic universities, world-leading design schools and affordable tuition.",
    intro:
      "Studying in Italy offers students a unique blend of high-quality education, rich cultural heritage, and an inspiring lifestyle. Home to some of the world’s oldest and most prestigious universities, such as the University of Bologna and Sapienza University of Rome, Italy is renowned for its excellence in fields like art, design, architecture, fashion, and humanities, as well as science and technology. Many programs are available in English, and tuition fees are relatively affordable compared to other European countries. Students can enjoy a vibrant social life, breathtaking landscapes, world-famous cuisine, and easy travel across Europe. With its academic excellence and cultural richness, Italy is an ideal destination for an unforgettable study abroad experience.",
    highlights: [
      {
        title: "Prestigious Universities",
        points: [
          "Home to historic institutions like the University of Bologna, Sapienza University of Rome, and Politecnico di Milano.",
          "Strong programs in art, architecture, design, fashion, history, and engineering.",
        ],
      },
      {
        title: "Free Education & Accommodation*",
        points: [
          "Free education and accommodation* for eligible international students.",
          "Availability of scholarships for international students.",
          "*Subject to eligibility, regional scholarship schemes and annual criteria — speak to our counsellors for current details.",
        ],
      },
      {
        title: "Programs in English",
        points: [
          "Many bachelor’s and master’s degrees offered entirely in English.",
        ],
      },
      {
        title: "Rich Cultural & Historical Experience",
        points: ["Study in the heart of Europe’s art, architecture, and heritage."],
      },
      {
        title: "World-Class Cuisine & Lifestyle",
        points: ["Famous for its food, festivals, and laid-back Mediterranean lifestyle."],
      },
      {
        title: "Strategic Location for Travel",
        points: ["Easy access to other European countries for study trips or vacations."],
      },
      {
        title: "Warm & Welcoming Environment",
        points: ["Friendly locals and vibrant student communities."],
      },
    ],
  },
  {
    slug: "uae",
    name: "UAE",
    navLabel: "Study in UAE",
    flag: "🇦🇪",
    region: "Middle East",
    cardBlurb:
      "Modern campuses in Dubai and Abu Dhabi, close to home with global exposure.",
    intro:
      "The United Arab Emirates is an increasingly popular destination for international students looking for quality education, modern infrastructure and excellent global exposure. With internationally oriented universities, diverse study programmes and a multicultural environment, the UAE offers students an opportunity to gain valuable academic and professional experience. From Dubai and Abu Dhabi to Sharjah and other major cities, students can choose from a wide range of programmes designed to support their academic and career goals.",
    highlights: [
      {
        title: "Quality Education",
        points: [
          "Study at recognised universities and institutions offering a wide range of programmes.",
        ],
      },
      {
        title: "Global Exposure",
        points: [
          "Experience a multicultural environment with students from around the world.",
        ],
      },
      {
        title: "Modern Infrastructure",
        points: [
          "Benefit from advanced campuses, technology and excellent student facilities.",
        ],
      },
      {
        title: "Wide Range of Courses",
        points: [
          "Choose programmes in Business, Engineering, IT, Artificial Intelligence, Data Science, Healthcare, Finance, Hospitality and more.",
        ],
      },
      {
        title: "English-Taught Programmes",
        points: ["Many universities offer programmes delivered in English."],
      },
      {
        title: "Scholarship Opportunities",
        points: [
          "Eligible students may have access to university scholarships and tuition-fee discounts.",
        ],
      },
      {
        title: "Career Opportunities",
        points: [
          "The UAE is a major international centre for business, technology, finance and innovation.",
        ],
      },
      {
        title: "Strategic Location & Lifestyle",
        points: [
          "Excellent international connectivity between Asia, Europe and other global destinations.",
          "A safe, modern and internationally connected environment.",
        ],
      },
    ],
    sections: [
      {
        title: "Popular Study Destinations in UAE",
        steps: [
          {
            title: "Dubai",
            body: "Dubai is a global business and tourism hub with modern universities, international institutions and a vibrant student environment.",
          },
          {
            title: "Abu Dhabi",
            body: "Abu Dhabi offers high-quality education, modern infrastructure and opportunities to study in a leading centre for research, technology and innovation.",
          },
          {
            title: "Sharjah",
            body: "Sharjah is known for its strong academic environment and offers a variety of universities and educational institutions.",
          },
        ],
      },
      {
        title: "Popular Courses to Study in UAE",
        body: "Students can explore a wide range of programmes, including:",
        bullets: [
          "Business & Management",
          "Engineering",
          "Computer Science & Information Technology",
          "Artificial Intelligence & Data Science",
          "Finance & Accounting",
          "Healthcare & Life Sciences",
          "Architecture",
          "Hospitality & Tourism",
          "Media & Communication",
          "Logistics & Supply Chain Management",
        ],
      },
      {
        title: "Admission Requirements",
        body: "Admission requirements vary depending on the university and programme. Generally, international students may need:",
        bullets: [
          "Academic certificates and transcripts",
          "Valid passport",
          "Passport-size photographs",
          "English-language proficiency, where required",
          "Statement of Purpose, where applicable",
          "CV/Resume for selected postgraduate programmes",
          "Additional documents requested by the university",
        ],
      },
      {
        title: "English Language Requirements",
        body: "Many UAE universities offer programmes in English. Depending on the university and course, students may need to demonstrate English-language proficiency through an accepted test such as IELTS, TOEFL or PTE Academic. Minimum scores and exemptions vary between institutions and programmes.",
      },
      {
        title: "Tuition Fees & Scholarships",
        body: "Tuition fees in the UAE depend on the university, programme and level of study. Students should consider tuition fees together with accommodation, transportation and other living expenses when planning their education budget. Many universities offer merit-based scholarships, tuition discounts and other financial support for eligible students.",
      },
      {
        title: "Student Visa",
        body: "International students generally need the appropriate UAE student residence arrangements to study in the country. The university or relevant sponsor may assist eligible students with the applicable visa and residence procedures. Students should verify the latest visa requirements before making travel arrangements.",
      },
      {
        title: "Application Process",
        steps: [
          {
            title: "Choose Your Course",
            body: "Select a programme that matches your academic background and career goals.",
          },
          {
            title: "Select Your University",
            body: "Compare universities, courses, fees, scholarships and location.",
          },
          {
            title: "Check Eligibility",
            body: "Review academic and English-language requirements.",
          },
          {
            title: "Prepare Documents",
            body: "Arrange your certificates, transcripts, passport and other required documents.",
          },
          {
            title: "Submit Your Application",
            body: "Apply to your selected university before the relevant deadline.",
          },
          {
            title: "Receive Your Offer Letter",
            body: "Once approved, receive your admission or offer letter.",
          },
          {
            title: "Complete Visa Formalities",
            body: "Proceed with the applicable student visa and residence requirements.",
          },
          {
            title: "Prepare for Your Journey",
            body: "Arrange accommodation, travel and pre-departure requirements.",
          },
        ],
      },
    ],
  },
  {
    slug: "europe",
    name: "Europe",
    navLabel: "Study in Europe",
    flag: "🇪🇺",
    region: "Europe",
    cardBlurb:
      "Low-cost or tuition-free study across the continent, with thousands of English programs.",
    intro:
      "Studying in Europe offers students access to world-class education, diverse cultures, and a wide range of academic programs across multiple countries. With prestigious universities in nations like Germany, France, the Netherlands, and Sweden, Europe provides affordable or even tuition-free education in many cases, especially for EU and sometimes international students. Students benefit from the ability to travel easily between countries, gaining exposure to different languages, traditions, and professional networks. Many programs are offered in English, and graduates enjoy strong career prospects both in Europe and globally. The combination of high-quality education, cultural richness, and international opportunities makes Europe a highly attractive study destination.",
    highlights: [
      {
        title: "World-Class Education",
        points: [
          "Home to prestigious universities like Oxford, ETH Zurich, Sorbonne, and Heidelberg.",
          "Strong academic and research standards across diverse fields.",
        ],
      },
      {
        title: "Affordable or Free Tuition",
        points: [
          "Many countries (e.g., Germany, Norway, France) offer low-cost or tuition-free education, even for international students.",
        ],
      },
      {
        title: "Wide Range of Programs in English",
        points: [
          "Thousands of bachelor’s and master’s programs taught entirely in English.",
        ],
      },
      {
        title: "Cultural Diversity & Travel Opportunities",
        points: [
          "Experience different cultures, cuisines, and languages.",
          "Easy and affordable travel across Europe with student discounts.",
        ],
      },
      {
        title: "Strong Career Prospects",
        points: [
          "Access to internships, part-time jobs, and high-demand industries like tech, engineering, and business.",
        ],
      },
      {
        title: "Scholarships & Funding",
        points: [
          "EU and country-specific scholarships like Erasmus+ reduce costs further.",
        ],
      },
      {
        title: "Rich History & Lifestyle",
        points: [
          "Blend of modern living with centuries-old history, architecture, and traditions.",
        ],
      },
    ],
  },
];

export const countryBySlug = (slug: string) =>
  countries.find((c) => c.slug === slug);

export const countrySlugs = countries.map((c) => c.slug);
