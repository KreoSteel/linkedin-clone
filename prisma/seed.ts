import "dotenv/config";
import { prisma } from "@/app/shared/api/prisma";

// 300+ Popular Skills organized by category
const skillsData = {
  // PROGRAMMING LANGUAGES (45)
  programmingLanguages: [
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "C++",
    "C#",
    "Go",
    "Rust",
    "PHP",
    "Ruby",
    "Swift",
    "Kotlin",
    "Scala",
    "R",
    "Dart",
    "Elixir",
    "Haskell",
    "Perl",
    "Lua",
    "MATLAB",
    "Objective-C",
    "Visual Basic",
    "Assembly",
    "Bash",
    "PowerShell",
    "SQL",
    "PL/SQL",
    "T-SQL",
    "Solidity",
    "Julia",
    "Groovy",
    "F#",
    "Clojure",
    "Erlang",
    "COBOL",
    "Fortran",
    "ActionScript",
    "VBA",
    "CoffeeScript",
    "Lisp",
    "Prolog",
    "Ada",
    "Scheme",
    "OCaml",
    "Crystal"
  ],

  // FRONTEND DEVELOPMENT (40)
  frontendDevelopment: [
    "HTML",
    "CSS",
    "React",
    "Next.js",
    "Vue.js",
    "Angular",
    "Svelte",
    "jQuery",
    "Bootstrap",
    "Tailwind CSS",
    "Material-UI",
    "Sass",
    "LESS",
    "Webpack",
    "Vite",
    "Redux",
    "MobX",
    "Zustand",
    "React Query",
    "SWR",
    "Nuxt.js",
    "Gatsby",
    "Remix",
    "Astro",
    "Ember.js",
    "Backbone.js",
    "Alpine.js",
    "Styled Components",
    "Emotion",
    "CSS Modules",
    "PostCSS",
    "Figma to Code",
    "Responsive Design",
    "Progressive Web Apps",
    "Web Components",
    "Accessibility (A11y)",
    "Cross-Browser Compatibility",
    "Performance Optimization",
    "SEO Optimization",
    "Web Animations"
  ],

  // BACKEND DEVELOPMENT (35)
  backendDevelopment: [
    "Node.js",
    "Express.js",
    "Nest.js",
    "Django",
    "Flask",
    "FastAPI",
    "Spring Boot",
    "ASP.NET Core",
    "Ruby on Rails",
    "Laravel",
    "Symfony",
    "Phoenix",
    "Gin",
    "Echo",
    "Fiber",
    "Actix",
    "Rocket",
    "GraphQL",
    "REST API",
    "gRPC",
    "WebSockets",
    "Socket.io",
    "Microservices",
    "Serverless",
    "API Design",
    "Authentication",
    "Authorization",
    "OAuth",
    "JWT",
    "Session Management",
    "Rate Limiting",
    "Caching",
    "Message Queues",
    "Event-Driven Architecture",
    "CQRS"
  ],

  // DATABASES (30)
  databases: [
    "PostgreSQL",
    "MySQL",
    "MongoDB",
    "Redis",
    "SQLite",
    "Microsoft SQL Server",
    "Oracle Database",
    "MariaDB",
    "Cassandra",
    "DynamoDB",
    "CouchDB",
    "Neo4j",
    "Elasticsearch",
    "InfluxDB",
    "TimescaleDB",
    "Firebase Firestore",
    "Supabase",
    "PlanetScale",
    "Prisma",
    "TypeORM",
    "Sequelize",
    "Mongoose",
    "Drizzle ORM",
    "Knex.js",
    "Database Design",
    "Query Optimization",
    "Database Administration",
    "Data Modeling",
    "Indexing",
    "Replication"
  ],

  // CLOUD & DEVOPS (40)
  cloudDevOps: [
    "AWS",
    "Azure",
    "Google Cloud Platform",
    "Docker",
    "Kubernetes",
    "Jenkins",
    "GitHub Actions",
    "GitLab CI/CD",
    "CircleCI",
    "Travis CI",
    "Terraform",
    "Ansible",
    "Chef",
    "Puppet",
    "Vagrant",
    "CloudFormation",
    "Pulumi",
    "ArgoCD",
    "Helm",
    "Istio",
    "Prometheus",
    "Grafana",
    "Datadog",
    "New Relic",
    "ELK Stack",
    "Nginx",
    "Apache",
    "Load Balancing",
    "CDN",
    "EC2",
    "S3",
    "Lambda",
    "ECS",
    "EKS",
    "Cloud Functions",
    "App Engine",
    "Cloud Run",
    "Heroku",
    "Vercel",
    "Netlify"
  ],

  // AI & MACHINE LEARNING (35)
  aiMachineLearning: [
    "Machine Learning",
    "Deep Learning",
    "Artificial Intelligence",
    "Natural Language Processing",
    "Computer Vision",
    "TensorFlow",
    "PyTorch",
    "Keras",
    "Scikit-learn",
    "Pandas",
    "NumPy",
    "OpenCV",
    "Hugging Face",
    "LangChain",
    "OpenAI API",
    "Stable Diffusion",
    "DALL-E",
    "GPT",
    "Neural Networks",
    "Convolutional Neural Networks",
    "Recurrent Neural Networks",
    "Transformers",
    "Reinforcement Learning",
    "Transfer Learning",
    "Model Training",
    "Model Deployment",
    "MLOps",
    "Data Preprocessing",
    "Feature Engineering",
    "Hyperparameter Tuning",
    "A/B Testing",
    "Experiment Tracking",
    "Model Evaluation",
    "Model Optimization",
    "AI Ethics"
  ],

  // DATA SCIENCE & ANALYTICS (25)
  dataScienceAnalytics: [
    "Data Science",
    "Data Analysis",
    "Data Visualization",
    "Statistics",
    "Probability",
    "Jupyter Notebooks",
    "R Studio",
    "Tableau",
    "Power BI",
    "Looker",
    "Apache Spark",
    "Hadoop",
    "Apache Kafka",
    "ETL",
    "Data Warehousing",
    "Data Lakes",
    "Snowflake",
    "BigQuery",
    "Redshift",
    "Databricks",
    "Data Mining",
    "Predictive Analytics",
    "Business Intelligence",
    "Data Governance",
    "Data Quality"
  ],

  // MOBILE DEVELOPMENT (20)
  mobileDevelopment: [
    "React Native",
    "Flutter",
    "iOS Development",
    "Android Development",
    "Swift UI",
    "Jetpack Compose",
    "Xamarin",
    "Ionic",
    "Cordova",
    "Capacitor",
    "Mobile UI/UX",
    "App Store Optimization",
    "Mobile Testing",
    "Push Notifications",
    "Mobile Security",
    "Offline First",
    "Mobile Performance",
    "Cross-Platform Development",
    "Native Development",
    "Hybrid Apps"
  ],

  // CYBERSECURITY (25)
  cybersecurity: [
    "Cybersecurity",
    "Information Security",
    "Network Security",
    "Application Security",
    "Penetration Testing",
    "Ethical Hacking",
    "Security Auditing",
    "Vulnerability Assessment",
    "Incident Response",
    "Threat Intelligence",
    "SIEM",
    "SOC",
    "Firewall",
    "IDS/IPS",
    "Encryption",
    "PKI",
    "Zero Trust",
    "IAM",
    "OWASP",
    "Security Compliance",
    "ISO 27001",
    "SOC 2",
    "GDPR",
    "HIPAA",
    "Security Best Practices"
  ],

  // UI/UX DESIGN (30)
  uiUxDesign: [
    "UI Design",
    "UX Design",
    "User Research",
    "Wireframing",
    "Prototyping",
    "Figma",
    "Sketch",
    "Adobe XD",
    "InVision",
    "Framer",
    "Zeplin",
    "Design Systems",
    "Information Architecture",
    "Interaction Design",
    "Visual Design",
    "Typography",
    "Color Theory",
    "Usability Testing",
    "A/B Testing",
    "User Flows",
    "Journey Mapping",
    "Persona Development",
    "Design Thinking",
    "Accessibility Design",
    "Mobile Design",
    "Web Design",
    "Responsive Design",
    "Animation Design",
    "Micro-interactions",
    "Design Handoff"
  ],

  // TESTING & QA (20)
  testingQA: [
    "Unit Testing",
    "Integration Testing",
    "End-to-End Testing",
    "Test-Driven Development",
    "Behavior-Driven Development",
    "Jest",
    "Mocha",
    "Cypress",
    "Playwright",
    "Selenium",
    "Puppeteer",
    "JUnit",
    "PyTest",
    "Test Automation",
    "Manual Testing",
    "Regression Testing",
    "Performance Testing",
    "Load Testing",
    "Security Testing",
    "Quality Assurance"
  ],

  // BUSINESS & SOFT SKILLS (40)
  businessSoftSkills: [
    "Project Management",
    "Agile",
    "Scrum",
    "Kanban",
    "Leadership",
    "Team Management",
    "Communication",
    "Public Speaking",
    "Technical Writing",
    "Documentation",
    "Problem Solving",
    "Critical Thinking",
    "Analytical Skills",
    "Decision Making",
    "Time Management",
    "Prioritization",
    "Negotiation",
    "Conflict Resolution",
    "Mentoring",
    "Coaching",
    "Stakeholder Management",
    "Business Analysis",
    "Requirements Gathering",
    "Strategic Planning",
    "Budget Management",
    "Risk Management",
    "Change Management",
    "Process Improvement",
    "Lean Six Sigma",
    "Product Management",
    "Product Strategy",
    "Roadmap Planning",
    "Customer Success",
    "Client Relations",
    "Collaboration",
    "Teamwork",
    "Adaptability",
    "Creativity",
    "Innovation",
    "Entrepreneurship"
  ],

  // MARKETING & SALES (25)
  marketingSales: [
    "Digital Marketing",
    "Content Marketing",
    "Social Media Marketing",
    "Email Marketing",
    "SEO",
    "SEM",
    "PPC",
    "Google Ads",
    "Facebook Ads",
    "Marketing Analytics",
    "Growth Hacking",
    "Conversion Optimization",
    "A/B Testing",
    "Marketing Automation",
    "CRM",
    "Salesforce",
    "HubSpot",
    "Sales Strategy",
    "Lead Generation",
    "Customer Acquisition",
    "Brand Management",
    "Market Research",
    "Competitive Analysis",
    "Copywriting",
    "Content Strategy"
  ],

  // TOOLS & PLATFORMS (25)
  toolsPlatforms: [
    "Git",
    "GitHub",
    "GitLab",
    "Bitbucket",
    "Jira",
    "Confluence",
    "Slack",
    "Microsoft Teams",
    "Notion",
    "Linear",
    "Trello",
    "Asana",
    "Monday.com",
    "VS Code",
    "IntelliJ IDEA",
    "PyCharm",
    "WebStorm",
    "Postman",
    "Insomnia",
    "Swagger",
    "npm",
    "yarn",
    "pnpm",
    "Maven",
    "Gradle"
  ]
};

async function main() {
  console.log("🌱 Starting seed...");

  // Flatten all skills into a single array
  const allSkills: string[] = Object.values(skillsData).flat();
  
  console.log(`📊 Total skills to seed: ${allSkills.length}`);

  let created = 0;
  let existing = 0;

  for (const skillName of allSkills) {
    try {
      // Check if skill already exists
      const existingSkill = await prisma.skill.findUnique({
        where: { name: skillName },
      });

      if (existingSkill) {
        existing++;
      } else {
        // Create new skill
        await prisma.skill.create({
          data: { name: skillName },
        });
        created++;
        console.log(`✨ Created skill: "${skillName}"`);
      }
    } catch (error) {
      console.log(`⚠️  Error with skill "${skillName}":`, error);
    }
  }

  console.log(`✅ Seeding completed!`);
  console.log(`📈 Created: ${created} skills`);
  console.log(`📦 Existing: ${existing} skills`);
  console.log(`🎯 Total in database: ${created + existing} skills`);
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
