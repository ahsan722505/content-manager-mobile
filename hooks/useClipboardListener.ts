import {useEffect} from 'react';
import Clipboard from '@react-native-clipboard/clipboard';

const useClipboardListener = (callback: (text: string) => void) => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      Clipboard.getString().then(text => {
        callback(text);
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
};

export default useClipboardListener;
