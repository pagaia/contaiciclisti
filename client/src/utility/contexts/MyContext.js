import React from 'react';

export const myContext = {
    single: true,
};

const SingleContext = React.createContext(myContext.light);

export { SingleContext };
