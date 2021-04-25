import { useSelector } from 'react-redux';
import { selectUser } from 'store/generalSlide';
import LoginLogout from './LoginLogout';

const Admin = (props) => {
    const user = useSelector(selectUser);

    console.log({ user });

    const renderUserInfo = (profile) => {
        console.log(Object.keys(profile));
        return Object.keys(profile).map((key) => (
            <div key={key}>{`${key}: ${profile[key]}`}</div>
        ));
    };

    return (
        <div className="centered">
            <LoginLogout />

            <div>
                {user ? (
                    <div>
                        Welcome {user.profile.name}!
                        <div className="text-left">
                            {renderUserInfo(user.profile)}
                        </div>
                    </div>
                ) : (
                    <div className="mt-5 mb-5">
                        <h2>This page is protected page. Please login first</h2>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;
