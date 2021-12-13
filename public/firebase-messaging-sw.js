// importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js');
 

// // importScripts('https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js');
// // importScripts('https://www.gstatic.com/firebasejs/9.5.0/firebase-messaging.js');

// // Initialize the Firebase app in the service worker by passing the generated config
// const firebaseConfig = {
//     apiKey: "AIzaSyA239olBl4lIMgULvdUr2lCsriqpPgl1yg",
//     authDomain: "treasure-hunt-29cba.firebaseapp.com",
//     projectId: "treasure-hunt-29cba",
//     storageBucket: "treasure-hunt-29cba.appspot.com",
//     messagingSenderId: "568140232935",
//     appId: "1:568140232935:web:42324db286a7c519094a42"
// };

// const firebase = initializeApp(firebaseConfig);
// // Retrieve firebase messaging
// const messaging = firebase.messaging();

// messaging.onBackgroundMessage(function(payload) {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   // Customize notification here
//   const notificationTitle = 'Background Message Title';
//   const notificationOptions = {
//     body: 'Background Message body.',
//     icon: '/firebase-logo.png'
//   };

//   self.registration.showNotification(notificationTitle,
//     notificationOptions);
// });



// onMessage(messaging, (payload) => {
//     console.log('[firebase-messaging-sw.js] Received background message ', payload)
//     // Customize notification here
//     const notificationTitle = 'Background Message Title'
//     const notificationOptions = {
//         body: 'Background Message body.',
//         icon: '/firebase-logo.png'
//     }

//     return self.registration.showNotification(notificationTitle, notificationOptions)
// })


// // Get registration token. Initially this makes a network call, once retrieved
// // subsequent calls to getToken will return from cache.
// getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY }).then((currentToken) => {
//     if (currentToken) {
//         console.log("TEst")
//         fetch('/api/saveToken', {
//             method: 'POST',
//             body: JSON.stringify({
//                 token: currentToken
//             })
//         })
//         // Send the token to your server and update the UI if necessary
//         // ...
//     } else {
//         // Show permission request UI
//         console.log('No registration token available. Request permission to generate one.');
//         // ...
//     }
// }).catch((err) => {
//     console.log('An error occurred while retrieving token. ', err);
//     // ...
// });