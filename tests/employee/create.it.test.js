const {expect}  			  = require('chai');
const request   		    = require('supertest');
const mongoose          = require('mongoose');
const {startHttpServer} = require('../../server');
const Employee          = require('../../models/Employee');

let app, startingPort = 10000;

function buildDefaultCreateEmployeeInput({managerId, username}) {
    return {
        username: username,
        password: 'test',
        email_address: 'test@test.com',
        manager_id: managerId,
    };
}

async function createDefaultEmployee() {
	const employee = new Employee({
        username: 'test',
        password: 'test',
        email_address: 'test@test.com',
        salt: 'asd',
    });
    await employee.save();
	return employee
}

const CREATE_EMPLOYEE_MUTATION = `
    mutation ($createEmployeeInput: CreateEmployeeInput!) {
        createEmployee(createEmployeeInput: $createEmployeeInput) {
            _id
        }
    }
`;

async function reloadServer() {
    process.env.PORT = startingPort;
	app = await startHttpServer();
}

function closeServer(finished) {
	app.close(() => {
		finished();
	});
}

function dropDatabase (finished) {
  	mongoose.connection.dropDatabase(() => { finished(); })
}

function loadHooks(context) {
	context.timeout(5000);
	context.afterEach(dropDatabase);
	before(async () => { await reloadServer(); })
	after(closeServer)
}

describe("Create Employee Tests", function () {

	loadHooks(this)

	it('Should throw validation error if duplicate employee username', async function () {
		const test_username = 'test';
		const employee = await createDefaultEmployee();
		employee.username  = test_username;
		await employee.save();

		const response = await request(app)
			.post('/graphql')
			.set('Authorization', employee._id)
			.send({
				query: CREATE_EMPLOYEE_MUTATION,
				variables: {
					createEmployeeInput: {
						...buildDefaultCreateEmployeeInput({managerId: employee._id}),
						username: test_username,
					},
				}
			})
			.set('Content-Type', 'application/json');

		console.log(response.body)
		expect(response.status).to.equal(200);
		expect(response.body.errors[0].message).to.equal('Username exists');
	});

})