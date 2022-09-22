const assert = require('chai').assert;
const chai = require('chai');
const http = require('chai-http');
const { describe, it, beforeEach, afterEach } = require('mocha');
const { expect } = require('chai');
const db = require('../models/index');
const Testimonial = db.Testimonials;
const server = require('../app');
const { generateAccessToken } = require('../helpers/jwt.js')

chai.use(http);

const placeholder = {
    name: 'name-test',
    content: 'content-test',
    image: 'image-test.png',
    categoryId: 1
}

describe('Testimonials Tests', () => {

    let id, adminToken, userToken;
    beforeEach(async () => {
        const testimonial = await Testimonial.create(placeholder);
        id = testimonial.dataValues.id;
        adminToken = await generateAccessToken(1);
        userToken = await generateAccessToken(11);
    });

    afterEach(async () => {
        await Testimonial.destroy({ where: { id }, force: true });
        await Testimonial.destroy({ where: { id: id + 1 }, force: true });
    });

    // Get method tests
    describe('Get Method', () => {

        it('Should return all the testimonials',(done) => {
            chai.request(server)
                .get('/testimonials')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                })
        })

        it('Should return the first page of testimonials',(done) => {
            chai.request(server)
                .get('/testimonials/?page=1')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                })
        })

    })

    // Post method tests
    describe('Post Method', () => {

        it("Request without admin permissions", (done) => {
            chai.request(server)
                .post('/testimonials')
                .set('Authorization', `Bearer ${userToken}`)
                .send(placeholder)
                .end((err, res) => {
                    expect(res).to.have.status(401)
                    done();
                })
        })

        it("Request without token", (done) => {
            chai.request(server)
                .post('/testimonials')
                .send(placeholder)
                .end((err, res) => {
                    expect(res).to.have.status(403)
                    done();
                })
        })

    })

    // Put method tests
    describe('Put Method', () => {

        it("Should update a testimonial", (done) => {
            chai.request(server)
                .put(`/testimonials/${id}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send(placeholder)
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    done();
                })
        })

        it("Request without admin permissions", (done) => {
            chai.request(server)
                .put(`/testimonials/${id}`)
                .set('Authorization', `Bearer ${userToken}`)
                .send(placeholder)
                .end((err, res) => {
                    expect(res).to.have.status(401)
                    done();
                })
        })

        it("Request without token", (done) => {
            chai.request(server)
                .put(`/testimonials/${id}`)
                .send(placeholder)
                .end((err, res) => {
                    expect(res).to.have.status(403)
                    done();
                })
        })

        it("Request with inexistent ID", (done) => {
            chai.request(server)
                .put(`/testimonials/${id + 1}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send(placeholder)
                .end((err, res) => {
                    expect(res).to.have.status(400)
                    done();
                })
        })

    })

    // Delete method tests
    describe('Delete Method', () => {

        it("Should delete a news", (done) => {
            chai.request(server)
                .delete(`/testimonials/${id}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    done();
                })
        })

        it("Request without admin permissions", (done) => {
            chai.request(server)
                .delete(`/testimonials/${id}`)
                .set('Authorization', `Bearer ${userToken}`)
                .end((err, res) => {
                    expect(res).to.have.status(401)
                    done();
                })
        })

        it("Request without token", (done) => {
            chai.request(server)
                .delete(`/testimonials/${id}`)
                .end((err, res) => {
                    expect(res).to.have.status(403)
                    done();
                })
        })

        it("Request with inexistent ID", (done) => {
            chai.request(server)
                .delete(`/testimonials/${id + 1}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send(placeholder)
                .end((err, res) => {
                    expect(res).to.have.status(400)
                    done();
                })
        })

    })

})