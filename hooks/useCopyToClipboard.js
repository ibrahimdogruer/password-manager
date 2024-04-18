import React, { useState } from "react";
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-toast-message'

export const useCopyToClipboard = () => {
    const [copiedText, setCopiedText] = useState('');

    const copyToClipboard = async (copiedText, messageText = '') => {
        await Clipboard.setStringAsync(copiedText);
        Toast.show({
            type: 'info',
            text1: `${messageText !== '' ? messageText : `'${copiedText}'`} copied to clipboard`
        });
    };

    const fetchCopiedText = async () => {
        const text = await Clipboard.getStringAsync();
        setCopiedText(text);
    };

    return {
        copiedText,
        copyToClipboard,
        fetchCopiedText
    };
};
