const assert = require('chai').assert;
const chai = require('chai');
const http = require('chai-http');
const { describe, it, beforeEach, afterEach } = require('mocha');
const { expect } = require('chai');
const db = require('../models/index');
const Member = db.Member;
const server = require('../app');
const { generateAccessToken } = require('../helpers/jwt.js')

chai.use(http);

const memberTest = {
    name: 'Test Name',
    facebookUrl: 'www.facebook.com/test',
    instagramUrl: 'www.instagram.com/test',
    linkedinUrl: 'www.linkedin.com/test',
    image: 'test.png',
    description: 'description test'
}

describe('Members Tests', () => {

    let id, adminToken, userToken;
    beforeEach(async () => {
        const member = await Member.create(memberTest);
        id = member.dataValues.id;
        adminToken = await generateAccessToken(1);
        userToken = await generateAccessToken(11);
    });


    afterEach(async () => {
        await Member.destroy({ where: { id }, force: true });
        await Member.destroy({ where: { id: id + 1 }, force: true });
    });

    // Get method test
    describe('Get Method', () => {

        it('Should return all members', (done) => {
            chai.request(server)
                .get('/members')
                .set('Authorization', `Bearer ${adminToken}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                })
        })

        it('Should return the first page of members', (done) => {
            chai.request(server)
                .get('/members/?page=1')
                .set('Authorization', `Bearer ${adminToken}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                })
        })

        it('Request without admin permissions', (done) => {
            chai.request(server)
                .get(`/members/${id}`)
                .set('Authorization', `Bearer ${userToken}`)
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    done();
                })
        })

        it('Request without token', (done) => {
            chai.request(server)
                .get(`/members/${id}`)
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    done();
                })
        })

    })

    // Post method test
    describe('Post Method', () => {

        it("Request without admin permissions", (done) => {
            chai.request(server)
                .post('/members')
                .set('Authorization', `Bearer ${userToken}`)
                .send(memberTest)
                .end((err, res) => {
                    expect(res).to.have.status(401)
                    done();
                })
        })

        it("Request without token", (done) => {
            chai.request(server)
                .post('/members')
                .send(memberTest)
                .end((err, res) => {
                    expect(res).to.have.status(403)
                    done();
                })
        })

        it('Request without name property', (done) => {
            chai.request(server)
                .post('/members')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    facebookUrl: 'www.facebook.com/test',
                    instagramUrl: 'www.instagram.com/test',
                    linkedinUrl: 'www.linkedin.com/test',
                    image: 'test.png',
                    description: 'description test'
                })
                .end((err, res) => {
                    const error = res.body.errors[0].msg
                    expect(error).to.equal('The name must not be empty.')
                    done();
                })
        })

        it('Request with property name different from string', (done) => {
            chai.request(server)
                .post('/members')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    name: 123,
                    facebookUrl: 'www.facebook.com/test',
                    instagramUrl: 'www.instagram.com/test',
                    linkedinUrl: 'www.linkedin.com/test',
                    image: 'test.png',
                    description: 'description test'
                })
                .end((err, res) => {
                    const error = res.body.errors[0].msg
                    expect(error).to.equal('The name must be type string.')
                    done();
                })
        })

    })

    // Put method test
    describe('Put Method', () => {

        it("Should update a member", (done) => {
            chai.request(server)
                .put(`/members/${id}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send(memberTest)
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    done();
                })
        })

        it("Request without admin permissions", (done) => {
            chai.request(server)
                .put(`/members/${id}`)
                .set('Authorization', `Bearer ${userToken}`)
                .send(memberTest)
                .end((err, res) => {
                    expect(res).to.have.status(401)
                    done();
                })
        })

        it("Request without token", (done) => {
            chai.request(server)
                .put(`/members/${id}`)
                .send(memberTest)
                .end((err, res) => {
                    expect(res).to.have.status(403)
                    done();
                })
        })

        it("Request with inexistent ID", (done) => {
            chai.request(server)
                .put(`/members/${id + 1}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send(memberTest)
                .end((err, res) => {
                    const error = res.body.message;
                    expect(error).to.equal(`The member id: ${id + 1} doesn't exist`)
                    done();
                })
        })

    })

    // Delete method tests
    describe('Delete Method', () => {

        it("Should delete a member", (done) => {
            chai.request(server)
                .delete(`/members/${id}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    done();
                })
        })

        it("Request without admin permissions", (done) => {
            chai.request(server)
                .delete(`/members/${id}`)
                .set('Authorization', `Bearer ${userToken}`)
                .end((err, res) => {
                    expect(res).to.have.status(401)
                    done();
                })
        })

        it("Request without token", (done) => {
            chai.request(server)
                .delete(`/members/${id}`)
                .end((err, res) => {
                    expect(res).to.have.status(403)
                    done();
                })
        })

        it("Request with inexistent ID", (done) => {
            chai.request(server)
                .delete(`/members/${id + 1}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send(memberTest)
                .end((err, res) => {
                    const error = res.body.msg;
                    expect(error).to.equal('Member not found.')
                    done();
                })
        })

    })

})