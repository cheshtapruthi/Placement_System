import dotenv from 'dotenv';
dotenv.config();

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.company.createMany({
    data: [
        {
        id: 1,
        name: "Google",
        logo: "🏢",
        location: "Mountain View, CA",
        openings: 15,
        deadline: "Dec 31, 2024",
        roles: ["Software Engineer", "Product Manager", "Data Scientist"],
        package: "₹50-80 LPA",
        type: "Full Time",
        status: "Hiring",
        },
        {
        id: 2,
        name: "Microsoft",
        logo: "💻",
        location: "Redmond, WA",
        openings: 12,
        deadline: "Jan 15, 2025",
        roles: ["Software Developer", "Cloud Engineer"],
        package: "₹45-70 LPA",
        type: "Full Time",
        status: "Hiring",
        },
        {
        id: 3,
        name: "Amazon",
        logo: "📦",
        location: "Seattle, WA",
        openings: 20,
        deadline: "Dec 20, 2024",
        roles: ["SDE", "DevOps Engineer", "ML Engineer"],
        package: "₹40-65 LPA",
        type: "Full Time",
        status: "Hiring",
        },
        {
        id: 4,
        name: "Meta",
        logo: "📱",
        location: "Menlo Park, CA",
        openings: 8,
        deadline: "Jan 10, 2025",
        roles: ["Frontend Engineer", "Backend Engineer"],
        package: "₹55-85 LPA",
        type: "Full Time",
        status: "Hiring",
        },
        {
        id: 5,
        name: "Apple",
        logo: "🍎",
        location: "Cupertino, CA",
        openings: 6,
        deadline: "Dec 25, 2024",
        roles: ["iOS Developer", "Hardware Engineer"],
        package: "₹60-90 LPA",
        type: "Full Time",
        status: "Hiring",
        },
        {
        id: 6,
        name: "Netflix",
        logo: "🎬",
        location: "Los Gatos, CA",
        openings: 4,
        deadline: "Jan 5, 2025",
        roles: ["Full Stack Engineer", "Data Engineer"],
        package: "₹70-100 LPA",
        type: "Full Time",
        status: "Hiring",
        }
    ]
  });

  console.log("🌱 Seeded companies");
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
