import Redis from "ioredis";

const kv = new Redis(
  process.env.REDIS_URI
);

export default kv;