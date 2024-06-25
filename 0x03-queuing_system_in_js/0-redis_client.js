#!/usr/bin/env node
import { createClient } from 'redis';

const client = createClient({
	host: '127.0.0.1',
	port: '6379',
});

client.on('error', (err) => {
  console.log('Redis client not connected to the server:', err.toString());
});

client.on('connect', () => {
  console.log('Redis client connected to the server');
});
