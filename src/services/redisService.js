import { getRedisClient } from "../utils/hashUtil.js";

export const saveUrl = async (shortId, url, ttl=3600)=>{
    const client = getRedisClient(shortId);
    try {
        await client.set(shortId, url, 'EX', ttl); // Save the URL with an expiration time
        console.log(`URL saved with shortId ${shortId}`);
    } catch (error) {
        console.error(`Error saving URL with shortId ${shortId}:`, error);
        throw error; // Re-throw the error for further handling
    }
}

export const getUrl = (shortId, callback)=>{
    const client = getRedisClient(shortId);
    try {
        client.get(shortId, callback); // Retrieve the URL using the shortId
        console.log(`URL retrieved with shortId ${shortId}`);
    } catch (error) {
        console.error(`Error retrieving URL with shortId ${shortId}:`, error);
        throw error; // Re-throw the error for further handling
    }
}