// Hook (use-auth.js)
import axios from 'axios';
import config from 'config/config';
import { ROUTES } from 'config/routing/routes';
import React, { createContext, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { logOutUser, selectUser, verifyUserLogin } from 'store/generalSlide';
import { useHash } from 'utility/utilityFunctions';
import usePrevious from './usePrevious';

const authContext = createContext();

const addAuthentication = (authorization) => {
    // Add a request interceptor
    axios.interceptors.request.use((req) => {
        console.log({ authorization });

        req.headers.authorization = authorization;
        console.log({ req });
        return req;
    });
};

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
    return useContext(authContext);
};

/*
 * Create form to request access token from Google's OAuth 2.0 server.
 */
function oauthSignIn() {
    // Google's OAuth 2.0 endpoint for requesting an access token
    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    var form = document.createElement('form');
    form.setAttribute('method', 'GET'); // Send as a GET request.
    form.setAttribute('action', oauth2Endpoint);

    // Parameters to pass to OAuth 2.0 endpoint.
    var params = {
        client_id: config.GOOGLE_CLIENT_ID,
        redirect_uri: config.AUTH_REDIRECTION,
        response_type: 'token',
        scope: 'https://www.googleapis.com/auth/userinfo.profile',
        include_granted_scopes: 'true',
        state: 'TheBestContaICiclisti',
    };

    // Add form parameters as hidden input values.
    for (var p in params) {
        var input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', p);
        input.setAttribute('value', params[p]);
        form.appendChild(input);
    }

    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
}

// Provider hook that creates auth object and handles state
function useProvideAuth() {
    let hash = useHash();
    const code = hash.get('access_token');
    console.log({ code });

    const dispatch = useDispatch();
    let history = useHistory();
    const user = useSelector(selectUser);
    const prevCode = usePrevious(code);
    const prevAuthorization = usePrevious(user?.authorization);

    const authorization = user?.authorization;

    // add authorization
    useEffect(() => {
        if (authorization && prevAuthorization !== authorization) {
            addAuthentication(authorization);
        }
    }, [authorization, prevAuthorization]);

    // check the response
    useEffect(() => {
        if (code && prevCode !== code) {
            // call the api to authenticate the user
            dispatch(verifyUserLogin({ code }));
            // remove the google information from the url
            history.push(ROUTES.ADMIN);
        }
    }, [code, prevCode]);

    // call the oauthSignIn method which redirect to Google OAuth page
    const signIn = oauthSignIn;

    const signOut = () => {
        dispatch(logOutUser());
    };

    // Return the user object and auth methods
    return {
        user,
        signIn,
        signOut,
    };
}
