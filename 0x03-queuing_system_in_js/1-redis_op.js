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
                                               
function setNewSchool(schoolName, value) {
	client.set(schoolName, value, (err, reply) => {
		if (err) {
			console.error(`Failed to set ${schoolName}: ${err}`);
		} else {
			console.log(`${schoolName} set successfully.`);
		}
	});
}

function displaySchoolValue(schoolName) {
	client.get(schoolName, (err, reply) => {
		if (err) {
			console.error(`Failed to get value for ${schoolName}: ${err}`);
		} else {
			console.log(`Value for ${schoolName}: ${reply}`);
		}
	});
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
