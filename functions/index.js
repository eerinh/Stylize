/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

//  const {onRequest} = require("firebase-functions/v2/https");
//  const logger = require("firebase-functions/logger");

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.syncUserToFirestore = functions.auth.user().onCreate((user) => {
  // get user data from the auth trigger
  const { uid, email, name } = user;

  // set what data you want to store in Firestore
  const userProfile = {uid,
    email,
    name, };

  // reference to the Firestore document
  const userDoc = admin.firestore().collection("userProfile").doc(uid);

  // set the user data in Firestore
  return userProfile.set(userData);
});


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
