const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const { cacheMiddleware } = require("../utils/cache");

/**
 * @swagger
 * /api/summary:
 *   get:
 *     summary: Get summary statistics
 *     description: Returns aggregated statistics for gender, brands, locations, and interests
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 gender:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       count:
 *                         type: number
 *                 brands:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/StatItem'
 *                 locations:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/StatItem'
 *                 interests:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/StatItem'
 */
router.get("/summary", cacheMiddleware(300), customerController.getSummary);

/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Get paginated customers
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Items per page
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Field to sort by
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort order
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 customers:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Customer'
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *                 totalItems:
 *                   type: integer
 */
router.get(
  "/customers",
  cacheMiddleware(300),
  customerController.getCustomers
);

module.exports = router;
