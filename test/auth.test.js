const assert = require('chai').assert;
const chai = require('chai');
const http = require('chai-http');
const { describe, it, beforeEach, afterEach } = require('mocha');
const { expect } = require('chai');
const db = require('../models/index');
const User = db.User;
const server = require('../app');

const { generateAccessToken } = require('../helpers/jwt.js')

chai.use(http);

const validValues = {
    firstName: 'firstNameTest',
    lastName: 'lastNameTest',
    email: 'validvalues@test.test',
    password: 'passwordTest'
}

describe('Auth Tests', () => {

    let id;
    beforeEach(async () => {
        const user = await User.create(validValues);
        id = user.id;
        adminToken = await generateAccessToken(1);
        userToken = await generateAccessToken(11)
    });

    afterEach(async () => {
        await User.destroy({ where: { id }, force: true });
        await User.destroy({ where: { id: id + 1 }, force: true });
    });

    // Post method tests
    describe('Post register Method', () => {

        it("Should register a user", (done) => {
            chai.request(server)
                .post('/register')
                .send({
                    firstName: 'firstNameTest',
                    lastName: 'lastNameTest',
                    email: 'othervalidvalues@test.test',
                    password: 'passwordTest'
                })
                .end((err, res) => {
                    expect(res).to.have.status(201)
                    done();
                })
        })

        xit("Request with 'firstName' property empty", (done) => {
            chai.request(server)
                .post('/register')
                .send({ firstName: '', lastName: 'lastNameTest', email: 'test@test.test', password: 'passwordTest' })
                .end((err, res) => {
                    const error = res.body.errors[0].msg
                    expect(error).to.equal('El nombre es obligatorio y debe ser un string.')
                    done();
                })
        })

        xit("Request with 'firstName' property value equal to number", (done) => {
            chai.request(server)
                .post('/register')
                .send({ firstName: 123, lastName: 'lastNameTest', email: 'test@test.test', password: 'passwordTest' })
                .end((err, res) => {
                    const error = res.body.errors[0].msg
                    expect(error).to.equal('El nombre es obligatorio y debe ser un string.')
                    done();
                })
        })

        xit("Request with 'firstName' property value equal to booblean", (done) => {
            chai.request(server)
                .post('/register')
                .send({ firstName: true, lastName: 'lastNameTest', email: 'test@test.test', password: 'passwordTest' })
                .end((err, res) => {
                    const error = res.body.errors[0].msg
                    expect(error).to.equal('El nombre es obligatorio y debe ser un string.')
                    done();
                })
        })

        xit("Request with 'firstName' property value equal to null", (done) => {
            chai.request(server)
                .post('/register')
                .send({ firstName: null, lastName: 'lastNameTest', email: 'test@test.test', password: 'passwordTest' })
                .end((err, res) => {
                    const error = res.body.errors[0].msg
                    expect(error).to.equal('El nombre es obligatorio y debe ser un string.')
                    done();
                })
        })

        xit("Request with 'lastName' property empty", (done) => {
            chai.request(server)
                .post('/register')
                .send({ firstName: 'firstNameTest', lastName: '', email: 'test@test.test', password: 'passwordTest' })
                .end((err, res) => {
                    const error = res.body.errors[0].msg
                    expect(error).to.equal('El email es obligatorio.')
                    done();
                })
        })

        xit("Request with 'lastName' property value equal to number", (done) => {
            chai.request(server)
                .post('/register')
                .send({ firstName: 'firstNameTest', lastName: 123, email: 'test@test.test', password: 'passwordTest' })
                .end((err, res) => {
                    const error = res.body.errors[0].msg
                    expect(error).to.equal('El email es obligatorio.')
                    done();
                })
        })

        xit("Request with 'lastname' property value equal to booblean", (done) => {
            chai.request(server)
                .post('/register')
                .send({ firstName: 'firstNameTest', lastName: true, email: 'test@test.test', password: 'passwordTest' })
                .end((err, res) => {
                    const error = res.body.errors[0].msg
                    expect(error).to.equal('El email es obligatorio.')
                    done();
                })
        })

        xit("Request with 'lastName' property value equal to null", (done) => {
            chai.request(server)
                .post('/register')
                .send({ firstName: 'firstNameTest', lastName: null, email: 'test@test.test', password: 'passwordTest' })
                .end((err, res) => {
                    const error = res.body.errors[0].msg
                    expect(error).to.equal('El email es obligatorio.')
                    done();
                })
        })

        

    })


})