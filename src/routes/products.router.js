import { Router } from 'express';
// import { uploader } from '../utils.js';
import uploadMiddleware from '../middelware/multer.js';
const router = Router();

// router.post('/', uploader.array('files'), (req, res) => {
router.post('/', uploadMiddleware, (req, res) => {
  console.log(req.files);
});
export default router;
