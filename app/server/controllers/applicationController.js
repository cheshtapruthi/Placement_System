import prisma from '../prisma/prismaclient.js';

export const createApplication = async (req, res) => {
  const { studentId, companyId, status } = req.body;

  if (!studentId || !companyId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const application = await prisma.application.create({
      data: {
        studentId,
        companyId,
        status: 'pending',
      },
    });
    res.status(201).json(application);
  } catch (error) {
    if (error.code === 'P2002') {
      // Prisma unique constraint violation
      res.status(400).json({ error: 'Student has already applied to this company.' });
    } else {
      console.error("Error submitting application:", error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }  
};
