import redis from 'redis';

export const redisClients = [
    redis.createClient({ host:process.env.REDIS_HOST_1, port: process.env.REDIS_PORT_1 }),
    redis.createClient({ host: process.env.REDIS_HOST_2, port: process.env.REDIS_PORT_2 }),
    redis.createClient({ host: process.env.REDIS_HOST_3, port: process.env.REDIS_PORT_3 }),
]