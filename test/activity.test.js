const assert = require('chai').assert;
const chai = require('chai');
const http = require('chai-http');
const { describe, it, beforeEach, afterEach } = require('mocha');
const { expect } = require('chai');
const db = require('../models/index');
const Activity = db.Activity;
const server = require('../app');

const { generateAccessToken } = require('../helpers/jwt.js')

chai.use(http);

const placeholder = {
    name: 'name-test',
    content: 'content-test',
    image: 'image-test.png'
}

describe('Activity Tests', () => {

    let id, adminToken, userToken;
    beforeEach(async () => {
        const activity = await Activity.create(placeholder);
        id = activity.id;
        adminToken = await generateAccessToken(1);
        userToken = await generateAccessToken(11);
    });

    afterEach(async () => {
        await Activity.destroy({ where: { id }, force: true });
        await Activity.destroy({ where: { id: id + 1 }, force: true });
    });

    // Post method testing
    describe('Post Method', () => {

        it("Request with admin permissions", (done) => {
            chai.request(server)
                .post('/activities')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(placeholder)
                .end((err, res) => {
                    const { name, content, image } = res.body.data;
                    expect(res).to.have.status(200);
                    expect(name).to.be.an('string');
                    expect(content).to.be.an('string');
                    expect(image).to.be.an('string');
                    done();
                })
        })
    
        it("Request without admin permissions", (done) => {
            chai.request(server)
                .post('/activities')
                .set('Authorization', `Bearer ${userToken}`)
                .send(placeholder)
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    done();
                })
        })

        it("Request without token", (done) => {
            chai.request(server)
                .post('/activities')
                .send(placeholder)
                .end((err, res) => {
                    expect(res).to.have.status(403);
                    done();
                })
        })

        it("Request with 'name' property empty", (done) => {
            chai.request(server)
                .post('/activities')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ name: '', content: 'test', image: 'test.png' })
                .end((err, res) => {
                    const error = res.body.errors[0].msg
                    expect(error).to.equal('The name must not be empty.')
                    done();
                })
        })

        it("Request with 'name' property value equal to number", (done) => {
            chai.request(server)
                .post('/activities')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ name: 123, content: 'test', image: 'test.png' })
                .end((err, res) => {
                    const error = res.body.errors[0].msg
                    expect(error).to.equal('The name must be type string.')
                    done();
                })
        })

        it("Request with 'content' property empty", (done) => {
            chai.request(server)
                .post('/activities')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ name: 'test', content: '', image: 'test.png' })
                .end((err, res) => {
                    const error = res.body.errors[0].msg
                    expect(error).to.equal('The content must not be empty.')
                    done();
                })
        })

        it("Request with 'content' property value equal to number", (done) => {
            chai.request(server)
                .post('/activities')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ name: 'test', content: 123, image: 'test.png' })
                .end((err, res) => {
                    const error = res.body.errors[0].msg
                    expect(error).to.equal('The content must be type string.')
                    done();
                })
        })

    })

    // Put method tests
    describe('Put Method', () => {

        it("Request with admin permissions", (done) => {
            chai.request(server)
                .put(`/activities/${id}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send(placeholder)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                })
        })
    
        it("Request without admin permissions", (done) => {
            chai.request(server)
                .put(`/activities/${id}`)
                .set('Authorization', `Bearer ${userToken}`)
                .send(placeholder)
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    done();
                })
        })
    
        it("Request without token", (done) => {
            chai.request(server)
                .put(`/activities/${id}`)
                .send(placeholder)
                .end((err, res) => {
                    expect(res).to.have.status(403);
                    done();
                })
        })

        it("Request with inexistent ID", (done) => {
            chai.request(server)
                .put(`/activities/1000000`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send(placeholder)
                .end((err, res) => {
                    const error = res.body.msg;
                    expect(error).to.equal('Activity not found.')
                    done();
                })
        })
    
    })

})

