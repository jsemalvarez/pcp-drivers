import { onAuthStateChanged, signInWithEmailAndPassword, User } from 'firebase/auth';
import { FirebaseError } from "firebase/app";
import { FirebaseAuth } from './config';

interface LoginParams { 
    email:string, 
    password: string 
}

interface LoginResponse {
  ok: boolean;
  user?: {
    uid: string;
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
  };
}

interface ErrorLoginResponse {
    ok: boolean;
    errorMessage: string;
    errorCode: string;
}

type LoginWithEmailPassword = (args: LoginParams) => Promise<LoginResponse | ErrorLoginResponse>;

export const loginWithEmailPassword: LoginWithEmailPassword = async({ email, password }) => {
    try {
        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL, displayName } = resp.user;

        return {
            ok: true,
            user:{
                uid, 
                photoURL, 
                displayName,
                email
            }
        }
    } catch (error: unknown) {
        const firebaseError = error as FirebaseError;

        return {
            ok: false,
            errorMessage: firebaseError.message,
            errorCode: firebaseError.code,
        };
    }
}

export const logout = async () => {
    try {
        await FirebaseAuth.signOut();

        return {
            ok: true,
        }
    } catch (error: unknown) {
        const firebaseError = error as FirebaseError;

        return {
            ok: false,
            errorMessage: firebaseError.message,
            errorCode: firebaseError.code, 
        };
    }
}

/**
 * Se encarga de exponer la suscripción a cambios de autenticación.
 * Retorna una función para desuscribirse.
 */
export const onCheckAuthAdapter = (
  callback: (user: User | null) => void
): (() => void) => {
  return onAuthStateChanged(FirebaseAuth, callback);
};
