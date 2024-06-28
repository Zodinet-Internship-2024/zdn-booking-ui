import { useEffect, useState } from 'react';

const useDocumentLoaded = () => {
  const [isDocumentLoaded, setIsDocumentLoaded] = useState(false);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      setIsDocumentLoaded(true);
    }
  }, []);
  return isDocumentLoaded;
};
export default useDocumentLoaded;
