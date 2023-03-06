class StoreServices {
    private static favoriteKeyStore: string = 'favorites';

    static storeFavorite(id: any) {
        const record = localStorage.getItem(this.favoriteKeyStore);
        const favorites: any[] = record ? JSON.parse(record) : [];
        if (favorites.find(item => item === id) === undefined) {
            favorites.push(id);
        }
        localStorage.setItem(this.favoriteKeyStore, JSON.stringify(favorites));
    }

    static removeFavorite(id: any) {
        const record = localStorage.getItem(this.favoriteKeyStore);
        if (record) {
            let favorites: any[] = JSON.parse(record);
            if (Array.isArray(favorites)) {
                favorites = favorites.filter(item => item !== id);
                localStorage.setItem(this.favoriteKeyStore, JSON.stringify(favorites));
            }
        }
    }

    static getFavorite(id: any) {
        const record = localStorage.getItem(this.favoriteKeyStore);
        const favorites: any[] = record ? JSON.parse(record) : [];
        if (!Array.isArray(favorites)) {
            return null;
        }
        const found = favorites.find(item => item === id);
        return found !== undefined ? found : null;
    }
}

export default StoreServices;