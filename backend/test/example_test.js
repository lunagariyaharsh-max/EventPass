const chai = require('chai');
const chaiHttp = require('chai-http');
const http = require('http');
const app = require('../server'); 
const connectDB = require('../config/db');
const mongoose = require('mongoose');
const sinon = require('sinon');
const EventPass = require('../models/EventPass');
const { createEventPass, getEventPasses, updateEventPass, deleteEventPass } = require('../controllers/eventPassController');
const { expect } = chai;

chai.use(chaiHttp);

describe('CreateEventPass Function Test', () => {
  before(async () => {
    await connectDB();
    mongoose.set('strictQuery', false);
  });

  afterEach(() => {
    sinon.restore(); // Restore all stubs after each test
  });

  it('should return 400 if required fields are missing', async () => {
    const req = { user: { id: new mongoose.Types.ObjectId() }, body: { eventName: "New Event" } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
    await createEventPass(req, res);
    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledWithMatch({ message: 'Missing required fields' })).to.be.true;
  });

  it('should return 500 if an error occurs', async () => {
    const createStub = sinon.stub(EventPass, 'create').throws(new Error('DB Error'));
    const req = { user: { id: new mongoose.Types.ObjectId() }, body: { eventName: "New Event", eventDate: "2025-12-31", userId: new mongoose.Types.ObjectId() } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
    await createEventPass(req, res);
    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWithMatch({ message: 'Failed to save event pass' })).to.be.true;
  });
});

describe('UpdateEventPass Function Test', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should update event pass successfully', async () => {
    const eventPassId = new mongoose.Types.ObjectId();
    const existingEventPass = {
      _id: eventPassId,
      eventName: "Old Event",
      eventDate: new Date(),
      isValidated: false,
      attendanceLogged: false,
      save: sinon.stub().resolvesThis(),
    };
    const findByIdStub = sinon.stub(EventPass, 'findById').resolves(existingEventPass);
    const req = { params: { id: eventPassId }, body: { isValidated: true, attendanceLogged: true } };
    const res = { json: sinon.spy(), status: sinon.stub().returnsThis() };
    await updateEventPass(req, res);
    expect(existingEventPass.isValidated).to.equal(true);
    expect(existingEventPass.attendanceLogged).to.equal(true);
    expect(res.status.called).to.be.false;
    expect(res.json.calledOnce).to.be.true;
  });

  it('should return 404 if event pass is not found', async () => {
    const findByIdStub = sinon.stub(EventPass, 'findById').resolves(null);
    const req = { params: { id: new mongoose.Types.ObjectId() }, body: {} };
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
    await updateEventPass(req, res);
    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWith({ message: 'Event pass not found' })).to.be.true;
  });

  it('should return 500 on error', async () => {
    const findByIdStub = sinon.stub(EventPass, 'findById').throws(new Error('DB Error'));
    const req = { params: { id: new mongoose.Types.ObjectId() }, body: {} };
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
    await updateEventPass(req, res);
    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.called).to.be.true;
  });
});

describe('GetEventPasses Function Test', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should return event passes for the given user', async () => {
    const userId = new mongoose.Types.ObjectId();
    const eventPasses = [
      { _id: new mongoose.Types.ObjectId(), eventName: "Event 1", userId, eventDate: new Date(), qrCode: "mock-qr", isValidated: false, attendanceLogged: false },
      { _id: new mongoose.Types.ObjectId(), eventName: "Event 2", userId, eventDate: new Date(), qrCode: "mock-qr", isValidated: false, attendanceLogged: false }
    ];
    const findStub = sinon.stub(EventPass, 'find').resolves(eventPasses);
    const req = { user: { id: userId } };
    const res = { json: sinon.spy(), status: sinon.stub().returnsThis() };
    await getEventPasses(req, res);
    expect(findStub.calledOnceWith({ userId })).to.be.true;
    expect(res.json.calledWith(eventPasses)).to.be.true;
    expect(res.status.calledWith(200)).to.be.true;
  });

  it('should return 500 on error', async () => {
    const findStub = sinon.stub(EventPass, 'find').throws(new Error('DB Error'));
    const req = { user: { id: new mongoose.Types.ObjectId() } };
    const res = { json: sinon.spy(), status: sinon.stub().returnsThis() };
    await getEventPasses(req, res);
    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWithMatch({ message: 'DB Error' })).to.be.true;
  });
});

describe('DeleteEventPass Function Test', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should delete an event pass successfully', async () => {
    const req = { params: { id: new mongoose.Types.ObjectId().toString() } };
    const eventPass = { remove: sinon.stub().resolves() };
    const findByIdStub = sinon.stub(EventPass, 'findById').resolves(eventPass);
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
    await deleteEventPass(req, res);
    expect(findByIdStub.calledOnceWith(req.params.id)).to.be.true;
    expect(eventPass.remove.calledOnce).to.be.true;
    expect(res.json.calledWith({ message: 'Event pass deleted' })).to.be.true;
  });

  it('should return 404 if event pass is not found', async () => {
    const findByIdStub = sinon.stub(EventPass, 'findById').resolves(null);
    const req = { params: { id: new mongoose.Types.ObjectId().toString() } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
    await deleteEventPass(req, res);
    expect(findByIdStub.calledOnceWith(req.params.id)).to.be.true;
    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWith({ message: 'Event pass not found' })).to.be.true;
  });

  it('should return 500 if an error occurs', async () => {
    const findByIdStub = sinon.stub(EventPass, 'findById').throws(new Error('DB Error'));
    const req = { params: { id: new mongoose.Types.ObjectId().toString() } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
    await deleteEventPass(req, res);
    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWithMatch({ message: 'DB Error' })).to.be.true;
  });
});

after(() => {
  mongoose.connection.close(); // Close DB connection after all tests
});