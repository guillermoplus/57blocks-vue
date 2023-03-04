import Utils from "@/helpers/utils";
import {EncryptStorage} from "encrypt-storage";
import type Auth from "@/models/auth";

class Authentication {

    public static authKey: string = 'auth';
    private static encryptedStorage: EncryptStorage | null = null;
    private static encryptationKey: string = 'this-is-my-secret-key';

    static isAuthenticated(): boolean {
        const auth = Authentication.getEncryptedStorage().getItem<Auth>(Authentication.authKey);
        if (!auth) {
            return false;
        }
        const timeElapsed: number = (new Date()).getTime() - auth.logged_at.getTime();
        return timeElapsed <= auth.expiration_time;
    }

    static authenticate(username: string, password: string) {
        // Doesn't validate password matching, just create the auth info to allows user
        if (!Authentication.isAuthenticated()) {
            const auth: Auth = {
                username: username,
                password: password,
                logged_at: new Date(),
                expiration_time: Utils.getMilliseconds(60)
            };
            Authentication.getEncryptedStorage().setItem(Authentication.authKey, JSON.stringify(auth));
        }
    }

    static getEncryptedStorage(): EncryptStorage {
        if (Authentication.encryptedStorage === null) {
            Authentication.encryptedStorage = new EncryptStorage(Authentication.encryptationKey, {
                prefix: '@myApp',
                storageType: 'sessionStorage',
            });
        }
        return Authentication.encryptedStorage;
    }
}

export default Authentication;