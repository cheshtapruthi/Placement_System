import express from 'express';
import studentRoutes from './routes/studentroutes.js';
import dotenv from 'dotenv';
import cors from 'cors'
import prisma from './prisma/prismaclient.js';
import authRoutes from './routes/authRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors())

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.get('/api/students/:email', async (req, res) => {
    const { email } = req.params;
    try {
      const student = await prisma.student.findUnique({
        where: { email },
        include: { applications: true, offers: true },
      });
  
      if (!student) {
        console.log("App.js")
        return res.status(404).json({ message: "Student not found" });
      }
  
      res.json(student);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
app.use('/uploads', express.static('uploads'));
app.use('/api/companies', companyRoutes);
app.use('/api/applications', applicationRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
