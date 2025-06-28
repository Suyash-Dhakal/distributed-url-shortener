import redis from 'redis';
import dotenv from 'dotenv';
dotenv.config();

const createNamedClient = (name, host, port) => {
  const client = redis.createClient({ url: `redis://${host}:${port}` });
  client.name = name;
  client.on('error', (err) => console.error(`${name} Redis Client Error:`, err));
  return client;
};

export const redisMasters = [
  createNamedClient('master-1', process.env.REDIS_HOST_1, process.env.REDIS_PORT_1),
  createNamedClient('master-2', process.env.REDIS_HOST_2, process.env.REDIS_PORT_2),
  createNamedClient('master-3', process.env.REDIS_HOST_3, process.env.REDIS_PORT_3),
];

export const redisSlaves = [
  createNamedClient('slave-1', process.env.REDIS_SLAVE_HOST_1, process.env.REDIS_SLAVE_PORT_1),
  createNamedClient('slave-2', process.env.REDIS_SLAVE_HOST_2, process.env.REDIS_SLAVE_PORT_2),
  createNamedClient('slave-3', process.env.REDIS_SLAVE_HOST_3, process.env.REDIS_SLAVE_PORT_3),
];

// Connect all clients and log when ready
await Promise.all([...redisMasters, ...redisSlaves].map(async (client) => {
  await client.connect();
  console.log(`✅ Connected Redis client: ${client.name} (${client.options.url})`);
}));
