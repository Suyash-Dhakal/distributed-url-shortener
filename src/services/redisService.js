import { getRedisClient } from "../utils/hashUtil.js";
import { redisMasters, redisSlaves } from "../config/redisClients.js";

export const saveUrl = async (shortId, url, ttl = 3600) => {
  const client = getRedisClient(redisMasters, shortId);
  try {
    await client.set(shortId, url, 'EX', ttl);
    console.log(`URL saved with shortId ${shortId}`);
  } catch (error) {
    console.error(`Error saving URL with shortId ${shortId}:`, error);
    throw error;
  }
};

export const getUrl = async (shortId) => {
  const client = getRedisClient(redisSlaves, shortId);
  try {
    const url = await client.get(shortId);
    console.log(`URL retrieved with shortId ${shortId}: ${url}`);
    return url;
  } catch (error) {
    console.error(`Error retrieving URL with shortId ${shortId}:`, error);
    throw error;
  }
};
