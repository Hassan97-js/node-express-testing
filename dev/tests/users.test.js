const app = require("../../app");
const request = require("supertest")(app);

// Imports
const { getUsers, getUser, getUsersLogins, deleteUser, resetDatabase } = require("../db/db");
const { generateUniqueId } = require("../utilities/generic/generators");

beforeEach(() => resetDatabase());
afterEach(() => resetDatabase());

// Global constants
const users = getUsers();
const logins = getUsersLogins();

describe("Users API endpoints tests", () => {
  it("GET/ Get Users", async () => {
    try {
      const response = await request.get("/api/users").expect("Content-Type", /json/).expect(200);
      expect(users.length).toBe(3);
      expect(response.body.users).toStrictEqual(users);
    } catch (error) {
      console.error(error);
    }
  });

  it("GET/ Get User", async () => {
    const user = getUser(logins[2]);
    const response = await request.get(`/api/users/${logins[2]}`).expect("Content-Type", /json/).expect(200);

    expect(users.length).toBe(3);
    expect(response.body.user).toStrictEqual(user);
  });

  it("POST/ Create User", async () => {
    const newUser = {
      name: "Agneta Forsberg",
      login: generateUniqueId(3)
    };
    await request.post("/api/users").send(newUser).expect("Content-Type", /json/).expect(201);
    const response = await request.get("/api/users");

    expect(users.length).toBe(4);
    expect(response.body.users).toStrictEqual(users);
  });

  it("DELETE/ Delete User", () => {});
});
