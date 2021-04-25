const { useAuth } = require('hooks/useAuth');

const LoginLogout = (props) => {
    const { user, signIn, signOut } = useAuth();
    
    if (!user) {
        return <button onClick={signIn} className="btn btn-warning">Login</button>;
    }
    return <button onClick={signOut}>Logout</button>;
};

export default LoginLogout;
