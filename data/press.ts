export const pressArticles = [
  {
    id: 1,
    publication: "The Guardian",
    publicationAbbr: "TG",
    category: "article" as const,
    headline: "London Restaurateur Speaks Out on Business Pressures and Legal Rights",
    date: "April 2024",
    description:
      "Harman Singh Kapoor discusses the challenges faced by minority-owned businesses in London and the importance of legal recourse for all citizens.",
    url: "#",
    featured: true,
  },
  {
    id: 2,
    publication: "BBC News",
    publicationAbbr: "BBC",
    category: "video" as const,
    headline: "Interview: An Entrepreneur's Fight for Fairness",
    date: "March 2024",
    description:
      "A television interview in which Harman outlines his experiences as a British businessman navigating public controversy.",
    url: "#",
    featured: true,
  },
  {
    id: 3,
    publication: "Evening Standard",
    publicationAbbr: "ES",
    category: "article" as const,
    headline: "Rangrez Founder Becomes a Voice for Business Owners",
    date: "February 2024",
    description:
      "How one restaurant owner's personal journey became a rallying point for entrepreneurs demanding fair treatment under British law.",
    url: "#",
    featured: false,
  },
  {
    id: 4,
    publication: "ITV News",
    publicationAbbr: "ITV",
    category: "video" as const,
    headline: "Community Leader Addresses Crowd at London Forum",
    date: "January 2024",
    description:
      "Footage and analysis from Harman Singh Kapoor's widely-watched address on democratic participation.",
    url: "#",
    featured: false,
  },
  {
    id: 5,
    publication: "The Independent",
    publicationAbbr: "IND",
    category: "statement" as const,
    headline: "Public Statement: My Commitment to Democratic Values",
    date: "December 2023",
    description:
      "A formal public statement released by Harman Singh Kapoor clarifying his position on recent media coverage.",
    url: "#",
    featured: false,
  },
  {
    id: 6,
    publication: "Asian Voice",
    publicationAbbr: "AV",
    category: "article" as const,
    headline: "Profile: The Man Behind Rangrez Restaurant",
    date: "October 2023",
    description:
      "An in-depth profile of Harman Singh Kapoor's journey from arrival in Britain to becoming one of London's most-discussed restaurateurs.",
    url: "#",
    featured: false,
  },
];

export const legalEvents = [
  {
    year: "2020",
    title: "Business Challenges Begin",
    description:
      "Like many hospitality businesses, Rangrez faced unprecedented pressures during this period. Harman navigated complex operational decisions in an uncertain environment.",
    type: "business" as const,
  },
  {
    year: "2021",
    title: "Public Controversy Emerges",
    description:
      "Harman became the subject of public discourse following certain incidents. He maintained that every citizen has the right to fair representation and due process.",
    type: "public" as const,
  },
  {
    year: "2022",
    title: "Engaging Legal Process",
    description:
      "Trusting in the British legal system, Harman engaged properly with relevant processes, consistently advocating for fairness and transparency throughout.",
    type: "legal" as const,
  },
  {
    year: "2023",
    title: "Speaking Out",
    description:
      "Harman chose to enter the public arena, speaking about his experiences and advocating for equal treatment under the law for all British citizens.",
    type: "public" as const,
  },
  {
    year: "2024",
    title: "Continuing the Journey",
    description:
      "Committed to transparency and democratic engagement, Harman continues to participate in public discourse while pursuing his business and community commitments.",
    type: "future" as const,
  },
];
