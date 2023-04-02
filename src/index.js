const {google} = require('googleapis');
var compute = google.compute('v1')

authorize(async function(authClient) {
	var request = {
		project: 'project_id',
		zone: 'us-central1-a',
		instance: 'instance_name',
		auth: authClient
	};
	
	await compute.instances.get(request, function(err, response) {
		if (err) {
			console.error('Eror - ', err);
		}
		metadata = JSON.stringify(response["data"]["metadata"]);
		console.log('Info - compute instance metadata: ', metadata);
	});
});

async function authorize(callback) {
	google.auth.getClient({
		scopes: ['https://www.googleapis.com/auth/cloud-platform']
	}).then(client => {
		callback(client);
	}).catch(err => {
		console.error('Error - gcp authentication failed: ', err);
	});
}

await authorize();