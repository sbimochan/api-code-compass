import { expect } from 'chai';
import request from 'supertest';
import { hashSync } from 'bcryptjs';

import app from '../../../src/index';
import bookshelf from '../../../src/db';

/**
 * Tests for '/api/users'.
 */
describe('Users Controller Test', () => {
  let accessToken = '';
  const TEMP_USERNAME = 'admin';
  const TEMP_PASSWORD = 'hashedPassword';

  before((done) => {
    bookshelf.knex
      .raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE')
      .then(() => bookshelf.knex.raw('TRUNCATE TABLE roles_to_users RESTART IDENTITY CASCADE'))
      .then(() => bookshelf.knex.raw('TRUNCATE TABLE roles RESTART IDENTITY CASCADE'))
      .then(() => {
        // Insert the admin user
        return bookshelf.knex('users').insert({
          username: TEMP_USERNAME,
          password: hashSync(TEMP_PASSWORD, 8),
          is_admin: true,
          full_name: 'Test Administrator',
          email: 'admin@example.com'
        });
      })
      .then(() => {
        // Insert roles
        return bookshelf.knex('roles').insert([
          { id: 1, name: 'admin', description: 'User with admin role.' },
          { id: 2, name: 'customer', description: 'User with customer role.' }
        ]);
      })
      .then(() => {
        // Associate the admin user with the admin role
        return bookshelf.knex('roles_to_users').insert({
          role_id: 1, // 'admin' role ID
          user_id: 1 // admin user ID
        });
      })
      .then(() => done())
      .catch((err) => done(err));
  });

  it('should login user', (done) => {
    request(app)
      .post('/api/auth/login')
      .send({
        username: TEMP_USERNAME,
        password: TEMP_PASSWORD
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.property('accessToken');
        expect(res.body.data).to.have.property('refreshToken');
        accessToken = res.body.data.accessToken;
        done();
      });
  });

  it('should return list of users', (done) => {
    request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body.data).to.be.an('array');
        expect(res.body.data).to.have.lengthOf(1);

        done();
      });
  });

  it('should not create a new user if username is not provided', (done) => {
    const user = {
      noname: 'Jane Doe'
    };
    const expectedErrors = [
      { message: '"Username" is required', param: 'username' },
      { message: '"Email" is required', param: 'email' },
      { message: '"Password" is required', param: 'password' },
      { message: '"noname" is not allowed', param: 'noname' }
    ];

    request(app)
      .post('/api/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(user)
      .end((err, res) => {
        const { code, message, details } = res.body.error;

        expect(res.status).to.be.equal(400);
        expect(code).to.be.equal(400);
        expect(message).to.be.equal('Bad Request');
        expect(details).to.be.an('array');
        expect(details[0]).to.have.property('message');
        expectedErrors.forEach((expectedError) => {
          const error = details.find((detail) => detail.param === expectedError.param);

          expect(error).to.deep.equal(expectedError);
        });

        expect(details).to.have.lengthOf(expectedErrors.length);
        done();
      });
  });

  it('should create a new user with valid data', (done) => {
    const user = {
      username: 'jane_doe',
      fullName: 'Jane Doe',
      email: 'jane@doe.com',
      password: 'mySecretPassword'
    };

    request(app)
      .post('/api/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(user)
      .end((err, res) => {
        const { data } = res.body;

        expect(res.status).to.be.equal(201);
        expect(data).to.be.an('object');
        expect(data).to.have.property('id');
        expect(data).to.have.property('username');
        expect(data).to.have.property('fullName');
        expect(data).to.have.property('email');
        expect(data).to.have.property('createdAt');
        expect(data).to.have.property('updatedAt');
        expect(data.username).to.be.equal(user.username);
        expect(data.isAdmin).to.be.equal(false);

        done();
      });
  });

  it('should get information of user', (done) => {
    request(app)
      .get('/api/users/2')
      .set('Authorization', `Bearer ${accessToken}`)
      .end((err, res) => {
        const { data } = res.body;

        expect(res.status).to.be.equal(200);
        expect(data).to.be.an('object');
        expect(data).to.have.property('id');
        expect(data).to.have.property('username');
        expect(data).to.have.property('fullName');
        expect(data).to.have.property('email');
        expect(data).to.have.property('createdAt');
        expect(data).to.have.property('updatedAt');

        done();
      });
  });

  it('should respond with not found error if random user id is provided', (done) => {
    request(app)
      .get('/api/users/1991')
      .set('Authorization', `Bearer ${accessToken}`)
      .end((err, res) => {
        const { code, message } = res.body.error;

        expect(res.status).to.be.equal(404);
        expect(code).to.be.equal(404);
        expect(message).to.be.equal('User not found');

        done();
      });
  });

  it('should update a user if user info provided', (done) => {
    const user = {
      username: 'edited_doe',
      fullName: 'Edited John',
      email: 'jane@doe.com',
      password: 'mySecretPassword'
    };

    request(app)
      .put('/api/users/2')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(user)
      .end((err, res) => {
        const { data } = res.body;

        expect(res.status).to.be.equal(200);
        expect(data).to.be.an('object');
        expect(data).to.have.property('id');
        expect(data).to.have.property('fullName');
        expect(data).to.have.property('updatedAt');
        expect(data.fullName).to.be.equal(user.fullName);

        done();
      });
  });

  it('should not update a user if name is not provided', (done) => {
    const user = {
      noname: 'John Doe'
    };

    request(app)
      .put('/api/users/2')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(user)
      .end((err, res) => {
        const { code, message, details } = res.body.error;

        expect(res.status).to.be.equal(400);
        expect(code).to.be.equal(400);
        expect(message).to.be.equal('Bad Request');
        expect(details).to.be.an('array');
        expect(details[0]).to.have.property('message');
        expect(details[0]).to.have.property('param', 'username');

        done();
      });
  });

  it('should delete a user if valid id is provided', (done) => {
    request(app)
      .delete('/api/users/2')
      .set('Authorization', `Bearer ${accessToken}`)
      .end((err, res) => {
        expect(res.status).to.be.equal(204);

        done();
      });
  });

  it('should respond with not found error if random user id is provided for deletion', (done) => {
    request(app)
      .delete('/api/users/1991')
      .set('Authorization', `Bearer ${accessToken}`)
      .end((err, res) => {
        const { code, message } = res.body.error;

        expect(res.status).to.be.equal(404);
        expect(code).to.be.equal(404);
        expect(message).to.be.equal('User not found');

        done();
      });
  });

  it('should respond with bad request for empty JSON in request body', (done) => {
    const user = {};

    request(app)
      .post('/api/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(user)
      .end((err, res) => {
        const { code, message } = res.body.error;

        expect(res.status).to.be.equal(400);
        expect(code).to.be.equal(400);
        expect(message).to.be.equal('Empty JSON');

        done();
      });
  });
});
