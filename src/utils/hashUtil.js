import crc from 'crc';

export const getRedisClient = (clients, key)=>{
    const hash = crc.crc32(key); // Calculate the CRC32 hash of the key 
    console.log('index is', hash % clients.length);
    
    console.log('client name is', clients[hash % clients.length].name);
    
    return clients[hash % clients.length]; // Use the hash to select a Redis client
}