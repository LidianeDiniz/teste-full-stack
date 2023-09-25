import { faker } from "@faker-js/faker";
import { Factory, Model, createServer } from "miragejs";

type User = {
  name: string;
  email: string;
  created_at?: string;
};

export function makeServer() {
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({})
    },

    factories: {
      user: Factory.extend({
        name(i: number) {
          return `User ${i + 1}`;
        },
        email() {
          return faker.internet.email().toLocaleLowerCase();
        },
        created_at() {
          return faker.date.recent({ days: 10 });
        }
      })
    },

    seeds(server) {
      server.createList("user", 10);
    },

    routes() {
      this.namespace = "api";
      this.timing = 750;

      this.get("/users", (schema) => {
        return schema.all("user");
      });

      this.post("/users", (schema, request) => {
        const user = JSON.parse(request.requestBody);
        return schema.create("user", user);
      });

      this.namespace = "";
      this.passthrough();
    }
  });

  return server;
}
