const assert = require('chai').assert;
const chai = require('chai');
const http = require('chai-http');
const { describe, it, beforeEach, afterEach } = require('mocha');
const { expect } = require('chai');
const db = require('../models/index');
const Contacts = db.Contacts;
const server = require('../app');

const { generateAccessToken } = require('../helpers/jwt.js')

chai.use(http);

const validValues = {
    name: 'Test Name',
    email: 'test@test.test',
    phone: '0000000000',
    message: 'Test Message'
}

describe('Contacts Tests', () => {

    let id;
    beforeEach(async () => {
        const contacts = await Contacts.create(validValues);
        id = contacts.id;
        adminToken = await generateAccessToken(1);
    });

    afterEach(async () => {
        await Contacts.destroy({ where: { id }, force: true });
        await Contacts.destroy({ where: { id: id + 1 }, force: true });
    });

    // Post method tests
    describe('Post new contact Method', () => {

        it("Request with 'name' property empty", (done) => {
            chai.request(server)
                .post('/contacts')
                .send({ name: '', email: 'test@test.test', phone: '00000000000', message: 'test message' })
                .end((err, res) => {
                    const error = res.body.errors[0].msg
                    expect(error).to.equal('El nombre es obligatorio y debe ser un string.')
                    done();
                })
        })

        it("Request with 'name' property value equal to number", (done) => {
            chai.request(server)
                .post('/contacts')
                .send({ name: 123, email: 'test@test.test', phone: '00000000000', message: 'test message' })
                .end((err, res) => {
                    const error = res.body.errors[0].msg
                    expect(error).to.equal('El nombre es obligatorio y debe ser un string.')
                    done();
                })
        })

        it("Request with 'name' property value equal to booblean", (done) => {
            chai.request(server)
                .post('/contacts')
                .send({ name: true, email: 'test@test.test', phone: '00000000000', message: 'test message' })
                .end((err, res) => {
                    const error = res.body.errors[0].msg
                    expect(error).to.equal('El nombre es obligatorio y debe ser un string.')
                    done();
                })
        })

        it("Request with 'name' property value equal to null", (done) => {
            chai.request(server)
                .post('/contacts')
                .send({ name: null, email: 'test@test.test', phone: '00000000000', message: 'test message' })
                .end((err, res) => {
                    const error = res.body.errors[0].msg
                    expect(error).to.equal('El nombre es obligatorio y debe ser un string.')
                    done();
                })
        })

        it("Request with 'email' property empty", (done) => {
            chai.request(server)
                .post('/contacts')
                .send({ name: 'Test Name', email: '', phone: '00000000000', message: 'test message' })
                .end((err, res) => {
                    const error = res.body.errors[0].msg
                    expect(error).to.equal('El email es obligatorio.')
                    done();
                })
        })

        it("Request with 'email' property value equal to number", (done) => {
            chai.request(server)
                .post('/contacts')
                .send({ name: 'Test Name', email: 123, phone: '00000000000', message: 'test message' })
                .end((err, res) => {
                    const error = res.body.errors[0].msg
                    expect(error).to.equal('El email es obligatorio.')
                    done();
                })
        })

        it("Request with 'email' property value equal to booblean", (done) => {
            chai.request(server)
                .post('/contacts')
                .send({ name: 'Test Name', email: true, phone: '00000000000', message: 'test message' })
                .end((err, res) => {
                    const error = res.body.errors[0].msg
                    expect(error).to.equal('El email es obligatorio.')
                    done();
                })
        })

        it("Request with 'email' property value equal to null", (done) => {
            chai.request(server)
                .post('/contacts')
                .send({ name: 'Test Name', email: null, phone: '00000000000', message: 'test message' })
                .end((err, res) => {
                    const error = res.body.errors[0].msg
                    expect(error).to.equal('El email es obligatorio.')
                    done();
                })
        })

        it("Request with 'phone' property value equal to number", (done) => {
            chai.request(server)
                .post('/contacts')
                .send({ name: 'Test Name', email: 'test@test.test', phone: 00000000000, message: 'test message' })
                .end((err, res) => {
                    const error = res.body.errors[0].msg
                    expect(error).to.equal('El teléfono debe ser un string.')
                    done();
                })
        })

        it("Request with 'phone' property value equal to booblean", (done) => {
            chai.request(server)
                .post('/contacts')
                .send({ name: 'Test Name', email: 'test@test.test', phone: true, message: 'test message' })
                .end((err, res) => {
                    const error = res.body.errors[0].msg
                    expect(error).to.equal('El teléfono debe ser un string.')
                    done();
                })
        })

        it("Request with 'phone' property value equal to null", (done) => {
            chai.request(server)
                .post('/contacts')
                .send({ name: 'Test Name', email: 'test@test.test', phone: null, message: 'test message' })
                .end((err, res) => {
                    const error = res.body.errors[0].msg
                    expect(error).to.equal('El teléfono debe ser un string.')
                    done();
                })
        })

        it("Request with 'message' property value equal to number", (done) => {
            chai.request(server)
                .post('/contacts')
                .send({ name: 'Test Name', email: 'test@test.test', phone: '00000000000', message: 123 })
                .end((err, res) => {
                    const error = res.body.errors[0].msg
                    expect(error).to.equal('El mensaje debe ser un string.')
                    done();
                })
        })

        it("Request with 'message' property value equal to booblean", (done) => {
            chai.request(server)
                .post('/contacts')
                .send({ name: 'Test Name', email: 'test@test.test', phone: '00000000000', message: true })
                .end((err, res) => {
                    const error = res.body.errors[0].msg
                    expect(error).to.equal('El mensaje debe ser un string.')
                    done();
                })
        })

        it("Request with 'message' property value equal to null", (done) => {
            chai.request(server)
                .post('/contacts')
                .send({ name: 'Test Name', email: 'test@test.test', phone: '00000000000', message: null })
                .end((err, res) => {
                    const error = res.body.errors[0].msg
                    expect(error).to.equal('El mensaje debe ser un string.')
                    done();
                })
        })

    })


    // Get method tests
    describe('Get Method', () => {

        it('Should return all the contacts',(done) => {
            chai.request(server)
                .get('/contacts')
                .set('Authorization', `Bearer ${adminToken}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                })
        })

    })

})