import { getDatabase, ref, onValue, remove } from "firebase/database";
import firebaseApp from "./Firebase";

const database = getDatabase(firebaseApp);

export const fetchDataFromFirebase = (callback) => {
  const dataRef = ref(database, "FirebaseData");

  // Listen for changes in the data
  onValue(dataRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
};



export const deleteDataFromFirebase = (recordId) => {
  const dataRef = ref(database, `FirebaseData/${recordId}`);

  remove(dataRef)
    .then(() => {
      console.log("Record deleted successfully");
    })
    .catch((error) => {
      console.error("Error deleting record:", error);
    });
};