/**
 * Get all databases
 */

const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');

async function main(params) {

  const authenticator = new IamAuthenticator({ apikey: params.IAM_API_KEY })
  const cloudant = CloudantV1.newInstance({
      authenticator: authenticator
  });
  cloudant.setServiceUrl(params.COUCH_URL);

  try {
    const dbList = await getDbs(cloudant);
    return { dbs: dbList };
  } catch (err) {
    console.log(err);
    return { error: err.message };
  }
}

function getDbs(cloudant) {
    return cloudant.getAllDbs()
        .then((body) => body.result);
}

