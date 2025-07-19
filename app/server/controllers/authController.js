import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const register = async (req, res) => {
    const { name, email, password, address, qualifications, branch, skills } = req.body;

  try {
    const existing = await prisma.student.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.student.create({
    data: {
        name,
        email,
        password: hashedPassword,
        address,
        qualifications,
        branch,
        skills
    },
    });

    res.status(201).json({ message: 'Registered successfully', user });
  } catch (err) {
    console.error('❌ Error in Register:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.student.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    console.error('❌ Error in Login:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
