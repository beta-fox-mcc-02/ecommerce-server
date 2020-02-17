const request = require('supertest')
const app = require('../app')
const Sequelize = require('sequelize')
const {Product, sequelize } = require('../models')
const { queryInterface } = sequelize


