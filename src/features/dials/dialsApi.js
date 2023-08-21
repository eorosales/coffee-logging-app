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

const refDials = collection(db, "dials");

export const fetchDialsRequest = async () => {
  try {
    const querySnapshot = await getDocs(refDials);
    let dials = [];
    querySnapshot?.forEach((doc) => {
      dials.push({ id: doc.id, ...doc.data() });
    });
    return { dials };
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export const getDialRequest = async (dialId) => {
  const docRef = doc(db, "dials", dialId);
  const docSnap = await getDoc(docRef);
  const dialDetails = docSnap.data();
  return dialDetails;
};

export const fetchDialsByIdRequest = async (coffeeId) => {
  let dials = [];
  const q = query(collection(db, "dials"), where("coffee", "==", coffeeId));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((dial) => {
    dials.push({
      ...dial.data(),
      id: dial.id,
    });
  });
  return dials;
};

export const addDialRequest = async (newDialFormData) => {
  try {
    const newDial = await addDoc(refDials, {
      coffee: newDialFormData.coffee,
      temp: newDialFormData.temp,
      weight: newDialFormData.weight,
      grind: newDialFormData.grind,
      time: newDialFormData.time,
      yield: newDialFormData.yield,
      favorite: false,
      createdAt: Date.now(),
    });
    return newDial.id;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export const updateDialRequest = async (updateDialInfo) => {
  try {
    const response = await updateDoc(doc(db, "dials", updateDialInfo.id), {
      temp: updateDialInfo.temp,
      weight: updateDialInfo.weight,
      grind: updateDialInfo.grind,
      time: updateDialInfo.time,
      yield: updateDialInfo.yield,
      favorite: updateDialInfo.favorite,
      createdAt: Date.now(),
    });
    return response;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export const deleteDialByIdRequest = async (id) => {
  try {
    await deleteDoc(doc(db, "dials", id));
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export const deleteAllDialsByCoffeeIdRequest = async (coffeeId) => {
  const q = query(collection(db, "dials"), where("coffee", "==", coffeeId));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (dial) => {
    await deleteDoc(doc(db, "dials", dial.id));
  });
};
// TODO: toggleFavoriteDial
