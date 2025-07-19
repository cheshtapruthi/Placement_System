import prisma from '../prisma/prismaclient.js';

export const getAllCompanies = async (req, res) => {
  try {
    const companies = await prisma.company.findMany();
    res.json(companies);
  } catch (err) {
    console.error("Error fetching companies:", err);
    res.status(500).json({ error: "Failed to fetch companies" });
  }
};
