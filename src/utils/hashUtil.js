import { redisClients } from "../config/redisClients.js";
import crc from 'crc';

export const getRedisClient = (key)=>{
    const hash = crc.crc32(key); // Calculate the CRC32 hash of the key
    return redisClients[hash % redisClients.length]; // Use the hash to select a Redis client
}