const admin = require('firebase-admin');
const fs = require('fs');
const {Storage} = require('@google-cloud/storage');

// Initialize the Firebase app
function initializeFirebase() {
    const serviceAccount = require('./DRS.json');

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: 'disasterrecoverysystem-f11ea.appspot.com'
    });
}

async function downloadFile(blobName, destinationFileName) {
    const storage = new Storage();
    const bucket = storage.bucket('disasterrecoverysystem-f11ea.appspot.com');
    const file = bucket.file(blobName);
    await file.download({destination: destinationFileName});
    console.log(`Blob ${blobName} downloaded to ${destinationFileName}.`);
}

async function main() {
    // Initialize Firebase
    initializeFirebase();

    // Replace 'your_blob_name' with the path to the file in Firebase Storage
    const blobName = 'gs://disasterrecoverysystem-f11ea.appspot.com/files'; // e.g., 'files/data.json'
    // Replace 'your_local_file_path' with the local path where you want to save the file
    const destinationFileName = 'https://drive.google.com/drive/folders/1a22HA6kWeQOAkTmmcMSbOGpSrBo5AfMg'; // e.g., './local_data/data.json'

    // Ensure the local directory exists
    fs.mkdirSync('./local_data', { recursive: true });

    // Download the file
    await downloadFile(blobName, destinationFileName);
}

main().catch(console.error);