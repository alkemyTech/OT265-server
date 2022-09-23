const assert = require('chai').assert;
const chai = require('chai');
const http = require('chai-http');
const { describe, it, beforeEach, afterEach } = require('mocha');
const { expect } = require('chai');
const db = require('../models/index');
const User = db.User;
const server = require('../app');

const { generateAccessToken } = require('../helpers/jwt.js');

chai.use(http);

const placeholder = {
    firstName: 'Testing',
    lastName: 'User',
    email: 'user@test.com',
    password: '123456',
}


describe('User Tests', () => {

    let id, adminToken, userToken, ownerToken;

    beforeEach(async () => {
        const user = await User.create(placeholder);
        id = user.dataValues.id

        adminToken = await generateAccessToken(1);
        userToken = await generateAccessToken(11);
        ownerToken = await generateAccessToken(id);
    })

    afterEach(async () => {
        await User.destroy({ where: { id }, force: true });
    })

    // Get Methods Tests
    describe('Get Methods', () => {

        it('Request with admin permissions', (done) => {
            chai.request(server)
                .get('/users')
                .set('Authorization', `Bearer ${adminToken}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                })
        })

        it('Request without admin permissions', (done) => {
            chai.request(server)
                .get('/users')
                .set('Authorization', `Bearer ${userToken}`)
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    done();
                })
        })

        it('Request without token', (done) => {
            chai.request(server)
                .get('/users')
                .end((err, res) => {
                    expect(res).to.have.status(403);
                    done();
                })
        })

        it('Request without token', (done) => {
            chai.request(server)
                .get('/users')
                .end((err, res) => {
                    expect(res).to.have.status(403);
                    done();
                })
        })

    })

    // Put Methods Tests
    describe('Put Methods', () => {

        it('Request with owner ID (should update an user)', (done) => {
            chai.request(server)
                .put(`/users/${id}`)
                .set('Authorization', `Bearer ${ownerToken}`)
                .send({ password: '123456' })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                })
        })

        it('Request with ID different from the owner', (done) => {
            chai.request(server)
                .put(`/users/${id}`)
                .set('Authorization', `Bearer ${userToken}`)
                .end((err, res) => {
                    expect(res).to.have.status(403);
                    done();
                })
        })

        it('Request with admin permissions', (done) => {
            chai.request(server)
                .put(`/users/${id}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .end((err, res) => {
                    expect(res).to.have.status(403);
                    done();
                })
        })

        it('Request with property "firstName" value as a number', (done) => {
            chai.request(server)
                .put(`/users/${id}`)
                .set('Authorization', `Bearer ${ownerToken}`)
                .send({ firstName: 1 })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                })
        })

        it('Request with property "lastName" value as a number', (done) => {
            chai.request(server)
                .put(`/users/${id}`)
                .set('Authorization', `Bearer ${ownerToken}`)
                .send({ lastName: 1 })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                })
        })

        it('Request with property "password" value with length less than 6', (done) => {
            chai.request(server)
                .put(`/users/${id}`)
                .set('Authorization', `Bearer ${ownerToken}`)
                .send({ password: 123 })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                })
        })

    })

    // Delete Methods Tests
    describe('Delete Methods', () => {

        it('Request with owner ID (should delete an user)', (done) => {
            chai.request(server)
                .delete(`/users/${id}`)
                .set('Authorization', `Bearer ${ownerToken}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                })
        })

        it('Request with ID different from the owner', (done) => {
            chai.request(server)
                .delete(`/users/${id}`)
                .set('Authorization', `Bearer ${userToken}`)
                .end((err, res) => {
                    expect(res).to.have.status(403);
                    done();
                })
        })

        it('Request with admin permissions', (done) => {
            chai.request(server)
                .delete(`/users/${id}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .end((err, res) => {
                    expect(res).to.have.status(403);
                    done();
                })
        })

    })

})