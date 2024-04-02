import "next-auth";

declare module "next-auth" {
  interface User {
    jwt: string;
    user: {
      token: string;
      rol: string;
      email: string;
    };
  }

  interface Session {
    jwt: string;
    user: {
      token: string;
      rol: string;
      email: string;
    };
  }
}
