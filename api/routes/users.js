"use strict";

const express = require("express");
const idx = require("idx");

const router = express.Router();

const UserModel = require("../models/user");
const auth = require("../middlewares/auth");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
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
 *   name: Users
 *   description: The books managing API
 * /users:
 *   get:
 *     summary: Lists all the courses
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */



router.get("/", function (req, res, next) {
  return res.json({
    "foo": "bar"
  })
});

router.post("/", function (req, res, next) {
  const username = idx(req, (_) => _.body.fullName);
  const email = idx(req, (_) => _.body.emailAddress);
  const password = idx(req, (_) => _.body.password);

  if (username && email && password) {
    UserModel.create(
      {
        username,
        email,
        password,
      },
      function (error, user) {
        if (error) {
          console.log("Oh no", error);
          return next(error);
        } else {
          return res.status(201).send();
        }
      }
    );
  } else {
    res.status(403).json({
      error: "All fields are required",
    });
  }
});

module.exports = router;
