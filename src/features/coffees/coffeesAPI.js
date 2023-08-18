import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  query,
  getDocs,
  updateDoc,
  where,
  getDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { capitalize } from "../../utils/formatting";

const refCoffees = collection(db, "coffees");

export const getCoffeesRequest = async () => {
  try {
    const querySnapshot = await getDocs(refCoffees);
    let coffees = [];
    querySnapshot?.forEach((doc) => {
      coffees.push({ id: doc.id, ...doc.data() });
    });
    return { coffees };
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export const getCoffeeRequest = async (coffeeId) => {
  const docRef = doc(db, "coffees", coffeeId);
  const docSnap = await getDoc(docRef);
  const coffeeDetails = docSnap.data();
  return coffeeDetails;
};

export const fetchDials = async ({ params }) => {
  let dials = [];
  const q = query(
    collection(db, "dials"),
    where("coffee", "==", params.coffeeId)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((dial) =>
    dials.push({
      ...dial.data(),
      id: dial.id,
    })
  );
  return dials;
};

export const addCoffeeRequest = async (newCoffeeFormData) => {
  try {
    await addDoc(refCoffees, {
      roaster: capitalize(newCoffeeFormData.roaster),
      name: capitalize(newCoffeeFormData.name),
      origin: capitalize(newCoffeeFormData.origin),
      process: capitalize(newCoffeeFormData.process),
      flavorNotes: capitalize(newCoffeeFormData.flavorNotes).split(","),
      favorite: false,
      createdAt: Date.now(),
    });
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export const updateCoffeeRequest = async (updateCoffeeInfo) => {
  try {
    const response = await updateDoc(doc(db, "coffees", updateCoffeeInfo.id), {
      roaster: capitalize(updateCoffeeInfo.roaster),
      name: capitalize(updateCoffeeInfo.name),
      origin: capitalize(updateCoffeeInfo.origin),
      process: capitalize(updateCoffeeInfo.process),
      flavorNotes: capitalize(`${updateCoffeeInfo.flavorNotes}`).split(","),
      favorite: updateCoffeeInfo.favorite,
      createdAt: Date.now(),
    });
    return response;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export const deleteCoffeeById = async (id) => {
  try {
    await deleteDoc(doc(db, "coffees", id));
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export const toggleFavoriteCoffee = async ({ id, fav }) => {
  const coffeeDocRef = doc(db, "coffees", id);
  try {
    const response = await updateDoc(coffeeDocRef, {
      favorite: !fav,
    });
    return response;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};
