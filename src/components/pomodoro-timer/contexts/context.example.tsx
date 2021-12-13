/**
 * EXAMPLE FILE. COPY AND PASTE IN TO OTHER FILES THEN MODIFY AS REQUIRED.
 * DO NOT REMOVE FROM PROJECT OR INCLUDE IN PRODUCTION BUILD
 */
import React, {
  createContext,
  FunctionComponent,
  useContext,
  useMemo
} from 'react';

type FooContextValues = {
  foo: string
}

const FooContext = createContext<FooContextValues | undefined>(undefined);

export const useFooContext = () => {
  const context = useContext(FooContext);
  if (context === undefined) {
    throw new Error('useFooContext must be inside a FooProvider');
  }

  return context;
};

export const FooProvider: FunctionComponent = ({children}) => {
  const values = useMemo(() => ({foo: 'bar'}), []);

  return (
    <FooContext.Provider value={values}>
      {children}
    </FooContext.Provider>
  );
};
