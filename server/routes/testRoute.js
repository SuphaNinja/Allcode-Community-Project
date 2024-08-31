import express from "express";

import { test } from "../Controllers/testController.js";

const testRoutes = express.Router();

testRoutes.post('/test', test);

export default testRoutes;