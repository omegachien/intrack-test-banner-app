const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
const mongoose = require('mongoose');
const Banner = mongoose.model('Banner');
const nock = require('nock');

chai.use(chaiHttp);

describe('Banners', () => {
  before((done) => {
    nock(process.env.USER_APP_API)
      .get('/user/user-1/segment')
      .reply(200, {
        segment: [
          "segment-1",
        ],
      });
    nock(process.env.USER_APP_API)
      .get('/user/user-100x/segment')
      .reply(200, {
        segment: [
          "segment-2",
        ],
      });

    Banner.deleteMany({}, (err) => {
      if (err) {
        console.error(err);
      }
      done();
    });
  });

  describe('/POST Segment 1 banners', () => {
    it('it should respond with the newly created banner', (done) => {
      chai.request(server)
        .post('/banner')
        .send({
          "id": "banner-id-1",
          "name": "banner-1",
          "target": "segment-1",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('name');
          res.body.should.have.property('target');
          res.body.id.should.to.eql("banner-id-1");
          res.body.name.should.to.eql("banner-1");
          res.body.target.should.be.a('array');
          res.body.target.should.to.eql(['segment-1']);
          done();
        });
    });
  });

  describe('/POST Segment 2 banners', () => {
    it('it should respond with the newly created banner', (done) => {
      chai.request(server)
        .post('/banner')
        .send({
          "id": "banner-id-2",
          "name": "banner-2",
          "target": "segment-2",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('name');
          res.body.should.have.property('target');
          res.body.id.should.to.eql("banner-id-2");
          res.body.name.should.to.eql("banner-2");
          res.body.target.should.be.a('array');
          res.body.target.should.to.eql(['segment-2']);
          done();
        });
    });
  });

  describe('/GET banners', () => {
    it('it should GET all the banners', (done) => {
      chai.request(server)
        .get('/banners')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('banners');
          res.body.banners.should.be.a('array');
          res.body.banners.should.to.deep.include.members([
            {
              "id": "banner-id-1",
              "name": "banner-1",
            },
            {
              "id": "banner-id-2",
              "name": "banner-2",
            }
          ]);
          done();
        });
    });
  });

  describe('/GET Banner by User (Segment 1)', () => {
    it('it should GET Segment 1 banner', (done) => {
      chai.request(server)
        .get('/banners?user_id=user-1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('banners');
          res.body.banners.should.be.a('array');
          res.body.banners.should.to.deep.include.members([
            {
              "id": "banner-id-1",
              "name": "banner-1",
            }
          ]);
          done();
        });
    });
  });

  describe('/GET Banner by User (Segment 2)', () => {
    it('it should GET Segment 2 banner', (done) => {
      chai.request(server)
        .get('/banners?user_id=user-100x')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('banners');
          res.body.banners.should.be.a('array');
          res.body.banners.should.to.deep.include.members([
            {
              "id": "banner-id-2",
              "name": "banner-2",
            }
          ]);
          done();
        });
    });
  });

});
