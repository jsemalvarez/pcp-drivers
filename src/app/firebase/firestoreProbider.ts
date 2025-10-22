import { collection, getDocs, query, updateDoc, where } from "firebase/firestore";
import { FirebaseDB } from "./config";

export interface Driver {
  userId: string;
  busNumber?: string;
  position: {
    lat: number;
    lng: number;
  };
  lastUpdate: Date;
  isActive: boolean;
}

export const updateDriverData = async (userId:string, dataToUpdate: Partial<Driver> ) => {
  try {
    // 1️⃣ Consultar el documento del chofer según su userId
    const q = query(collection(FirebaseDB, "drivers"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.warn("No se encontró un chofer con ese userId");
      return;
    }

    // 2️⃣ Tomar el primer documento encontrado
    const driverDoc = querySnapshot.docs[0].ref;

    // 3️⃣ Actualizar con los nuevos datos
    await updateDoc(driverDoc, dataToUpdate);

    console.log("Datos del chofer actualizados correctamente");
  } catch (error) {
    console.error("Error actualizando el chofer:", error);
  }
};