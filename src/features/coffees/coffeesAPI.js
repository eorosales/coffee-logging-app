import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { capitalize } from "../../utils/formatting";

const refCoffees = collection(db, "coffees");

export const getCoffees = async () => {
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

export const addCoffee = async (newCoffeeFormData) => {
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

export const updateCoffee = async (updateCoffeeInfo) => {
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

export const deleteCoffee = async (id) => {
  try {
    const coffeeToDelete = await deleteDoc(doc(db, "coffees", id));
    return coffeeToDelete;
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
