const { ROUTES } = require('config/routing/routes');
const { Link } = require('react-router-dom');

const SiteMap = () => {
    return (
        <ul>
            {Object.entries(ROUTES).map(([key, value]) => {
                console.log({ key, value });
                if (value === '*') {
                    return null;
                }
                return (
                    <li key={key}>
                        <Link to={value.replace(':id', '1050873')}>{key}</Link>
                    </li>
                );
            })}
        </ul>
    );
};

export default SiteMap;
