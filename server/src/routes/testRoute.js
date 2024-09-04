import express from "express";

import { test } from "../Controllers/testController.js";

const testRoutes = express.Router();

testRoutes.get('/', test);
export default testRoutes;