declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REDIS_URI: string;
      DATABASE_URL: string;
      TEBI_ACCESS_KEY: string;
      TEBI_ACCESS_SECRET: string;
      NODE_ENV: "development" | "production";
      PORT?: string;
      PWD: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
