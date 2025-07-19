import express from 'express';
import { updateStudentDetailsIfExists, getAllStudents } from '../controllers/studentcontroller.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // ensure this folder exists
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  }
});

const upload = multer({ storage });

// 💡 Ensure 'resume' is used here
router.post('/update-or-create', upload.single('resume'), updateStudentDetailsIfExists);
router.get('/', getAllStudents);

export default router;
