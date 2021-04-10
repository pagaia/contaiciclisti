import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import "./PreviousNext.css";
const { FormattedMessage } = require('react-intl');

const PreviousNext = ({ previousAction, nextAction, start, end }) => {
    return (
        <div className="prev-next">
            <button
                type="button"
                className="btn btn-warning"
                onClick={previousAction}
            >
                &laquo;
            </button>

            <span>{start}</span>
            <span>-</span>
            <span>{end}</span>
            <button
                type="button"
                className="btn btn-warning"
                onClick={nextAction}
            >
                &raquo;
            </button>
        </div>
    );
};

PreviousNext.propTypes = {
    previousAction: PropTypes.func,
    nextAction: PropTypes.func,
    start: PropTypes.object,
    end: PropTypes.object,
};
export default PreviousNext;
