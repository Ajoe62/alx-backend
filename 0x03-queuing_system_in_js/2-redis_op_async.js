#!/usr/bin/env node
import { createClient } from 'redis';
import { promisify } from 'util';

const client = createClient({
        host: '127.0.0.1',
        port: '6379',
});

let getAsync;

client.on('error', (err) => {
  console.log('Redis client not connected to the server:', err.toString());
});

client.on('connect', () => {
  console.log('Redis client connected to the server');
  // promisify the get method
const getAsync = promisify(client.get);
});

function setNewSchool(schoolName, value) {
        client.set(schoolName, value, (err, reply) => {
                if (err) {
                        console.error(`Failed to set ${schoolName}: ${err}`);
                } else {
                        console.log(`${schoolName} set successfully.`);
                }
        });
}

async function displaySchoolValue(schoolName) {
	try {
		const value = await getAsync(schoolName);
		console.log(`Value for ${schoolName}: ${value}`);
	} catch (err) {
		console.error(`Failed to get value for ${schoolName}: ${err}`);
        }
}
if (client.connected) {
	displaySchoolValue('Holberton');
	setNewSchool('HolbertonSanFrancisco', '100');
	displaySchoolValue('HolbertonSanFrancisco');
} else {
	client.on('connect', () => {
		console.log('Redis client connected to the server');
		displaySchoolValue('Holberton');
		setNewSchool('HolbertonSanFrancisco', '100');
		displaySchoolValue('HolbertonSanFrancisco');
	});
}
