import React, { ReactNode } from 'react';
import { useAppSelector } from '../redux/hooks';
import LoadingDialog from '../components/loaders/LoadingDialog';

interface SettingsProviderProps {
  children: ReactNode;
}

const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const { rootLoader, rootLoaderTitle } = useAppSelector(state => state.ui);

  return (
    <>
      {children}
      <LoadingDialog isVisible={rootLoader} title={rootLoaderTitle} />
    </>
  );
};

export default SettingsProvider;
