The solution involves using Firebase's offline capabilities and proper error handling.  Here's an example using the JavaScript SDK:

```javascript
// bugSolution.js
import { initializeApp } from "firebase/app";
import { getFirestore, onSnapshot, doc, setDoc, getDoc } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  // ...
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function writeData(data) {
  try {
    const docRef = doc(db, 'collections', 'docID');
    await setDoc(docRef, data);
    console.log('Data written successfully!');
  } catch (error) {
    if (error.code === 'failed-precondition') {
      console.error('The request is likely malformed.');
    } else if (error.code === 'unavailable') {
      console.error('The service is unavailable.');
    } else {
      console.error('Error writing data:', error);
    }
  }
}

// Check for online/offline state
const checkOnlineStatus = () => {
  window.addEventListener('online', () => {console.log('Online')})
  window.addEventListener('offline', () => {console.log('Offline')})
}

async function readData() {
  const docRef = doc(db, 'collections', 'docID');
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
    } else {
      console.log('Document does not exist.');
    }
  } catch (error) {
    console.error('Error reading data:', error);
  }
}


checkOnlineStatus()
writeData({ name: 'Example Data' });
readData();
```