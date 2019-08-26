const {
  expect
} = require("chai");
const verror = require("verror");
const services = require("../../../../../src/services");

describe("execute(\"users\", \"authenticate\", { email, password })", () => {
  beforeEach(async () => {
    await services.get("database").getKnex().seed.run();
  });

  afterEach(async () => {});

  it("authenticates an existing user using email and password", async () => {
    // Given
    const controller = "users";
    const method = "authenticate";
    const args = {
      "email": "test@test.com",
      "password": "password"
    };

    // When
    const result = await services.get("database").execute(controller, method, args);

    // Then
    expect(result).to.deep.equal({
      "success": true,
      "errors": [],
      "service": "database",
      "payload": {
        "id": 1
      }
    });
  });

  it("returns an error if it could not find the account", async () => {
    // Given
    const controller = "users";
    const method = "authenticate";
    const args = {
      "email": "doesnotexist@test.com",
      "password": "password"
    };

    // When
    const result = await services.get("database").execute(controller, method, args);

    // Then
    const {
      success,
      errors,
      payload
    } = result;

    expect(success).to.equal(false);
    expect(errors.length).to.equal(1);
    expect(errors[0].name).to.equal("DatabaseControllerError");
    expect(errors[0].message).to.equal("The email and password combination you entered is invalid!");
    expect(verror.info(errors[0])).to.deep.equal(args);
    expect(payload).to.equal(null);
  });

  it("returns an error if the password is invalid", async () => {
    // Given
    const controller = "users";
    const method = "authenticate";
    const args = {
      "email": "test@test.com",
      "password": "somebspassword"
    };

    // When
    const result = await services.get("database").execute(controller, method, args);

    // Then
    const {
      success,
      errors,
      payload
    } = result;

    expect(success).to.equal(false);
    expect(errors.length).to.equal(1);
    expect(errors[0].name).to.equal("DatabaseControllerError");
    expect(errors[0].message).to.equal("The email and password combination you entered is invalid!");
    expect(verror.info(errors[0])).to.deep.equal(args);
    expect(payload).to.equal(null);
  });

  it("returns an error if the account is inactive", async () => {
    // Given
    const controller = "users";
    const method = "authenticate";
    const args = {
      "email": "test2@test.com",
      "password": "password"
    };

    // When
    const result = await services.get("database").execute(controller, method, args);

    // Then
    const {
      success,
      errors,
      payload
    } = result;

    expect(success).to.equal(false);
    expect(errors.length).to.equal(1);
    expect(errors[0].name).to.equal("DatabaseControllerError");
    expect(errors[0].message).to.equal("This account is inactive!");
    expect(verror.info(errors[0])).to.deep.equal(args);
    expect(payload).to.equal(null);
  });

  it("returns an error if the account is suspended ", async () => {
    // Given
    const controller = "users";
    const method = "authenticate";
    const args = {
      "email": "test3@test.com",
      "password": "password"
    };

    // When
    const result = await services.get("database").execute(controller, method, args);

    // Then
    const {
      success,
      errors,
      payload
    } = result;

    expect(success).to.equal(false);
    expect(errors.length).to.equal(1);
    expect(errors[0].name).to.equal("DatabaseControllerError");
    expect(errors[0].message).to.equal("This account is suspended!");
    expect(verror.info(errors[0])).to.deep.equal(args);
    expect(payload).to.equal(null);
  });
});