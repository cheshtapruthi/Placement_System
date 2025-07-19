import prisma from '../prisma/prismaclient.js';

export const getAllStudents = async (req, res) => {
  const { email } = req.params;
  
  try {
    const student = await prisma.student.findUnique({
      where: { email },
      include: {
        applications: {
          include: {
            company: true  
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        offers: true
      }
    });
    

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateStudentDetailsIfExists = async (req, res) => {
  try {
    const { name, email, address, qualifications, branch, skills, password } = req.body;
    const resumeUrl = req.file ? req.file.path : null;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const student = await prisma.student.findUnique({
      where: { email },
      include: {
        applications: {
          include: {
            company: true,
          },
        },
        offers: true,
      },
    });
    

    if (!student) {
      return res.status(404).json({ error: 'Student not found. Please use the email used while registering!' });
    }
    console.log(student);
    const updatedStudent = await prisma.student.update({
      where: { email },
      data: {
        name: name || student.name,
        address: address || student.address,
        qualifications: qualifications || student.qualifications,
        branch: branch || student.branch,
        skills: skills || student.skills,
        resumeUrl: resumeUrl || student.resumeUrl,
        password: password || student.password,
      },
    });

    res.status(200).json(updatedStudent);


  } catch (error) {
    console.error("UPDATE Error:", error);
    res.status(500).json({ error: 'Error updating student details' });
  }
};
