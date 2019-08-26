const {
  expect
} = require("chai");
const verror = require("verror");
const services = require("../../../../src/services");

describe("execute(\"users\", \"register\", { email, password })", () => {
  beforeEach(async () => {
    await services.get("database").getKnex().seed.run();
  });

  it("registers a new inactive user", async () => {
    // Given
    const controller = "users";
    const method = "register";
    const args = {
      "email": "test4@test.com",
      "password": "mypassword"
    };

    // When
    const result = await services.get("database").execute(controller, method, args);

    const {
      success,
      service,
      errors,
      payload: {
        id,
        email,
        status
      }
    } = result;

    // Then
    expect(success).to.equal(true);
    expect(service).to.equal("database");
    expect(errors).to.deep.equal([]);
    expect(id).to.equal(4);
    expect(email).to.equal("test4@test.com");
    expect(status).to.equal(0);
  });

  it("returns an error if user is already registered", async () => {
    // Given
    const controller = "users";
    const method = "register";
    const args = {
      "email": "test@test.com",
      "password": "mypassword"
    };

    // When
    const result = await services.get("database").execute(controller, method, args);

    const {
      success,
      service,
      errors,
      payload
    } = result;

    // Then
    expect(success).to.equal(false);
    expect(service).to.equal("database");
    expect(errors.length).to.equal(1);
    expect(errors[0].name).to.equal("DatabaseControllerError");
    expect(errors[0].message).to.equal("Email already registered!");
    expect(verror.info(errors[0])).to.deep.equal(args);
    expect(payload).to.equal(null);
  });
});