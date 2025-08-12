import express from 'express';
import { getPointsTable, updatePoints } from '../controllers/pointsController.js';
import { getSuper4Points,updateSuper4Points } from '../controllers/super4pointscontroller.js';

const router = express.Router();
router.get("/super4", getSuper4Points);
router.post("/super4/update", updateSuper4Points);
router.get('/', getPointsTable);
router.post('/update', updatePoints);

export default router;
