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
        userToken = await generateAccessToken(11)
    });

    afterEach(async () => {
        await User.destroy({ where: { id }, force: true });
        await User.destroy({ where: { id: id + 1 }, force: true });
    });

    // Post  register method tests
    describe('Post register Method', () => {

        it("Should register a user", (done) => {
            chai.request(server)
                .post('/auth/register')
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

        it("Request without 'firstName' property ", (done) => {
            chai.request(server)
                .post('/auth/register')
                .send({ lastName: 'lastNameTest', email: 'test@test.test', password: 'passwordTest' })
                .end((err, res) => {
                    const error = res.body.errors[0].msg
                    expect(error).to.equal('El nombre es obligatorio y debe ser un string.')
                    done();
                })
        })

        it("Request with 'firstName' property empty", (done) => {
            chai.request(server)
                .post('/auth/register')
                .send({ firstName: '', lastName: 'lastNameTest', email: 'test@test.test', password: 'passwordTest' })
                .end((err, res) => {
                    const error = res.body.errors[0].msg
                    expect(error).to.equal('El nombre es obligatorio y debe ser un string.')
                    done();
                })
        })

        it("Request with 'firstName' property value equal to number", (done) => {
            chai.request(server)
                .post('/auth/register')
                .send({ firstName: 123, lastName: 'lastNameTest', email: 'test@test.test', password: 'passwordTest' })
                .end((err, res) => {
                    const error = res.body.errors[0].msg
                    expect(error).to.equal('El nombre es obligatorio y debe ser un string.')
                    done();
                })
        })

        it("Request with 'firstName' property value equal to booblean", (done) => {
            chai.request(server)
                .post('/auth/register')
                .send({ firstName: true, lastName: 'lastNameTest', email: 'test@test.test', password: 'passwordTest' })
                .end((err, res) => {
                    const error = res.body.errors[0].msg
                    expect(error).to.equal('El nombre es obligatorio y debe ser un string.')
                    done();
                })
        })

        it("Request with 'firstName' property value equal to null", (done) => {
            chai.request(server)
                .post('/auth/register')
                .send({ firstName: null, lastName: 'lastNameTest', email: 'test@test.test', password: 'passwordTest' })
                .end((err, res) => {
                    const error = res.body.errors[0].msg
                    expect(error).to.equal('El nombre es obligatorio y debe ser un string.')
                    done();
                })
        })

        it("Request without 'lastName' property", (done) => {
            chai.request(server)
                .post('/auth/register')
                .send({ firstName: 'firstNameTest', email: 'test@test.test', password: 'passwordTest' })
                .end((err, res) => {
                    const error = res.body.errors[0].msg
                    expect(error).to.equal('El apellido es obligatorio.')
                    done();
                })
        })

        it("Request with 'lastName' property empty", (done) => {
            chai.request(server)
                .post('/auth/register')
                .send({ firstName: 'firstNameTest', lastName: '', email: 'test@test.test', password: 'passwordTest' })
                .end((err, res) => {
                    const error = res.body.errors[0].msg
                    expect(error).to.equal('El apellido es obligatorio.')
                    done();
                })
        }) 
        
        
        it("Request with 'email' property match with email format", (done) => {
            chai.request(server)
            .post('/auth/register')
            .send({ firstName: 'firstNameTest', lastName: 'lastNameTest', email: 'testtest.test', password: 'passwordTest' })
            .end((err, res) => {
                const error = res.body.errors[0].msg
                expect(error).to.equal('El correo no es valido.')
                done();
            })
        })  
        
        it("Request with 'property' exist value", (done) => {
            chai.request(server)
                .post('/auth/register')
                .send({ firstName: 'firstNameTest', lastName: 'lastNameTest', email: 'validvalues@test.test', password: 'passwordTest' })
                .end((err, res) => {
                    const error = res.body.errors[0].msg
                    expect(error).to.equal('El email: validvalues@test.test ya esta registrado.')
                    done();
                })
        })

        it("Request with 'email' property match with email format", (done) => {
            chai.request(server)
            .post('/auth/register')
            .send({ firstName: 'firstNameTest', lastName: 'lastNameTest', email: 'testtest.test', password: 'passwordTest' })
            .end((err, res) => {
                const error = res.body.errors[0].msg
                expect(error).to.equal('El correo no es valido.')
                done();
            })
        })  
        
        it("Request with 'password' value shorter than 6 characters", (done) => {
            chai.request(server)
                .post('/auth/register')
                .send({ firstName: 'firstNameTest', lastName: 'lastNameTest', email: 'test@test.test', password: '1234' })
                .end((err, res) => {
                    const error = res.body.errors[0].msg
                    expect(error).to.equal('El password debe ser de mas de 6 caracteres.')
                    done();
                })
        })
    })

    // Post login method tests
    describe('Post login Method', () => {

        it("Should login a user", (done) => {
            chai.request(server)
                .post('/auth/login')
                .send({
                    email: 'juan@gmail.com',
                    password: 'Juan1234'
                })
                .end((err, res) => {
                    const msg = res.body.msg
                    expect(msg).to.equal('Login Ok')
                    done();
                })
        })

        it("Request with user not found", (done) => {
            chai.request(server)
                .post('/auth/login')
                .send({
                    email: 'invalidemail@test.test',
                    password: validValues.password
                })
                .end((err, res) => {
                    expect(res).to.have.status(400)
                    done();
                })
        })

        it("Request with invalid password", (done) => {
            chai.request(server)
                .post('/auth/login')
                .send({
                    email: validValues.email,
                    password: '1234'
                })
                .end((err, res) => {
                    expect(res).to.have.status(409)
                    done();
                })
        })

    })

    // Get method tests
    describe('Get authenticated Method', () => {

        it('Request with user authenticated',(done) => {
            chai.request(server)
                .get('/auth/me')
                .set('Authorization', `Bearer ${userToken}`)
                .end((err, res) => {
                    console.log(res)
                    expect(res).to.have.status(200);
                    done();
                })
        })

        it('Request without user authenticated',(done) => {
            chai.request(server)
                .get('/auth/me')
                .end((err, res) => {
                    expect(res).to.have.status(403);
                    done();
                })
        })

    })

})