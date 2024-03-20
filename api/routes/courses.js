const express = require("express");
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       required:
 *         - title
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The title of your book
 *         description:
 *           type: string
 *           description: The book author
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         description: My description
 */

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: The books managing API
 * /courses:
 *   get:
 *     summary: Lists all the courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: The list of the courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 */

const courses = [
  {
    id: 1,
    title: 'a course',
    description: 'a description'
  },
  {
    id: 2,
    title: 'a bar',
    description: 'a foo'
  }
]

router.get("/", function (req, res) {
  res.status(200).json(courses);
});

module.exports = router;
