import {useEffect, useRef} from 'react';
import Clipboard from '@react-native-clipboard/clipboard';

const useClipboardListener = (callback: (text: string) => void) => {
  const latestContent = useRef<string | null>(null);
  useEffect(() => {
    const intervalId = setInterval(() => {
      Clipboard.getString().then(text => {
        if (text && text !== latestContent.current) {
          latestContent.current = text;
          callback(text);
        }
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
};

export default useClipboardListener;
