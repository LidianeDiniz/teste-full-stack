import { faker } from "@faker-js/faker";
import { Factory, Model, createServer } from "miragejs";

type User = {
  name: string;
  email: string;
  create_at: string;
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
      server.create("user");
    },

    routes() {
      this.namespace = "api";
      this.timing = 750;

      this.post("/", (schema, request) => {
        const { email, password } = JSON.parse(request.requestBody);

        const user = schema.db.users.findBy({ email });

        if (!user || user.password !== password) {
          return {
            errors: ["Credenciais inválidas"]
          };
        }

        return {
          token: "token-de-autenticacao",
          user: {
            id: user.id,
            email: user.email
          }
        };
      });
    }
  });

  return server;
}
