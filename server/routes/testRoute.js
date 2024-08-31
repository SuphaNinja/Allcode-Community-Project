import express from "express";

import { test } from "../Controllers/testController.js";

const testRoutes = express.Router();

testRoutes.get('/test', test);

export default testRoutes;