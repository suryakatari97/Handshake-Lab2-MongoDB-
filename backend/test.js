//var app = require('../index');
var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;
const should = chai.should();

var agent = require('chai').request.agent("http://localhost:3001");

describe('Handshake App', function () {

    it(" TEST 1 SignUp Post", (done) => {

        const companySignupData = {
            "company_name": 'Tesla11',
            "email": 'tesla1@gmail.com',
            "password": '12345',
            "location": 'San Jose'
        }

        chai.request('http://localhost:3001')
            .post('/user/signUpCompany')
            .send(companySignupData)
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(200);
                done();
            });
    })

    it("Test 2 -  SignIn Post", (done) => {

        const companySignInData = {
            "email": 'tesla1@gmail.com',
            "password": '12345',
            "userType": 'company'
        }

        chai.request('http://localhost:3001')
            .post('/user/signIn')
            .send(companySignInData)
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(200);
                done();
            });
    })
    // Post an event: company
    it(" TEST 3 Event Post", (done) => {

        const eventDetails = {
            "company_id": 5,
            "event_name": 'Python Conference',
            "location": 'Eng - 337',
            "date_of_event": '05-15-2000',
            "event_description": 'To learn python',
            "time": '04:00 PM',
            "eligibility": 'Software Engineering'
        }

        chai.request('http://localhost:3001')
            .post('/events/addEventPost')
            .send(eventDetails)
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(200);
                done();
            });
    })


    it("Test 4 - Get Details of an existing student profile ", (done) => {
        chai.request('http://localhost:3001')
            .get(`/student/studentdetails`)
            .query({ "id": 16 })
            .end((err, res) => {
                expect(err).to.be.null;
                res.body.should.be.a('object');
                res.status.should.be.equal(200);
                // expect(res.body[0].email).to.equal("shivangi.nagpal@sjsu.edu");
                // expect(res.body[0].school).to.equal("SJSU");
                done();
            });
    })

    it(" Test 5 Get Details of an existing event ", (done) => {
        chai.request('http://localhost:3001')
            .get(`/events/getEventDetails`)
            .query({
                "user_id": 5,
                // "user_type": 'company'
            })
            .end((err, res) => {
                expect(err).to.be.null;
                res.body.should.be.a('object');
                res.status.should.be.equal(200);
                done();
            });
    })

})

