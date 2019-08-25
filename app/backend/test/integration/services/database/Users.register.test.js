const { expect } = require("chai");
const services = require("../../../../src/services");

describe("execute(\"users\", \"register\")", () => {
  beforeEach(async () => {
    await services.get("database").getKnex().seed.run();
  });

  it("registers a new inactive user", async () => {
    // Given
    const controller = "users";
    const method = "register";
    const data = {
      "email": "test4@test.com",
      "password": "mypassword"
    };

    // When
    const result = await services.get("database").execute({
      controller,
      method,
      data
    });

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
    const data = {
      "email": "test@test.com",
      "password": "mypassword"
    };

    // When
    const result = await services.get("database").execute({
      controller,
      method,
      data
    });

    const {
      success,
      service,
      errors,
      payload
    } = result;

    // Then
    expect(success).to.equal(false);
    expect(service).to.equal("database");
    expect(errors).to.deep.equal(["Email already registered!"]);
    expect(payload).to.equal(null);
  });
});