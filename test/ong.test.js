const assert = require('chai').assert;
const chai = require('chai');
const http = require('chai-http');
const { describe, it, beforeEach, afterEach } = require('mocha');
const { expect } = require('chai');
const db = require('../models/index');
const Organization = db.Organization;
const server = require('../app');
const { generateAccessToken } = require('../helpers/jwt.js')

chai.use(http);

const placeholder = {
    name: 'name-test',
    content: 'content-test',
    image: 'image-test.png',
    categoryId: 1
}

describe('Organizations Tests', () => {

    let id, adminToken, userToken;
    beforeEach(async () => {
        const organization = await Organization.create(placeholder);
        id = organization.dataValues.id;
        adminToken = await generateAccessToken(1);
        userToken = await generateAccessToken(11);
    });

    afterEach(async () => {
        await Organization.destroy({ where: { id }, force: true });
        await Organization.destroy({ where: { id: id + 1 }, force: true });
    });

    // Get method tests
    describe('Get Method', () => {

        it('Should return all the Organizations',(done) => {
            chai.request(server)
                .get('/organization/public')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });

    });

    // Put method tests
    describe('Put Method', () => {

        it("Should update a organization", (done) => {
            chai.request(server)
                .put(`/organization/public`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send(placeholder)
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    done();
                })
        })

        it("Request without admin permissions", (done) => {
            chai.request(server)
                .put(`/news/${id}`)
                .set('Authorization', `Bearer ${userToken}`)
                .send(placeholder)
                .end((err, res) => {
                    expect(res).to.have.status(401)
                    done();
                })
        })

        it("Request without token", (done) => {
            chai.request(server)
                .put(`/news/${id}`)
                .send(placeholder)
                .end((err, res) => {
                    expect(res).to.have.status(403)
                    done();
                })
        })

    });

})