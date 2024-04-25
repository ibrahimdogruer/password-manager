import * as SecureStore from 'expo-secure-store';

export const useSecureStore = () => {
    const save = async (key, value) => {
        await SecureStore.setItemAsync(key, value);
    }

    const getValueFor = async (key) => {
        let result = await SecureStore.getItemAsync(key, { requireAuthentication: true });
        if (result) return JSON.parse(result);
        return null;
    }

    return {
        save,
        getValueFor
    };
};
