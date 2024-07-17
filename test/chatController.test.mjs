import { expect } from 'chai';
import express from 'express';
import bodyParser from 'body-parser';
import routes from '../backend/src/routes/index.js';
import supertest from 'supertest';
import mysql from 'mysql2';

describe('Chat Controller', () => {
  let app, request, db;

  before(() => {
    app = express();
    app.use(bodyParser.json());

    // Configuration de la base de données de test
    db = mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE
    });

    db.connect((err) => {
      if (err) throw err;
    });

    app.use('/api', routes(db));
    request = supertest(app);
  });

  after(() => {
    db.end();
  });

  it('should save a score', async () => {
    const res = await request.post('/api/scores').send({
      score: '2-1',
      mood: 'happy',
      domicile: true,
      adversaire: 'Team B'
    });

    expect(res.status).to.equal(201);
    expect(res.body.message).to.equal('Score saved successfully.');
  });
});
