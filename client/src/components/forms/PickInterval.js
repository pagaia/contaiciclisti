import Fade from 'components/Fade';
import PropTypes from 'prop-types';
import { useState } from 'react';
import DatePickerReact from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const { FormattedMessage } = require('react-intl');

const PickInterval = ({ updateSearch, start, end }) => {
    const [viewForm, toggleForm] = useState(false);
    const [startDate, setStartDate] = useState(start);
    const [endDate, setEndDate] = useState(end);

    const toggle = () => {
        toggleForm(!viewForm);
    };

    const onChange = (dates) => {
        // return
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const handleSearch = () => {
        toggle();
        updateSearch({ start: startDate, end: endDate });
    };

    return (
        <Fade
            showMessage={viewForm}
            setShowMessage={toggleForm}
            button={
                <button onClick={toggle} className="btn btn-secondary">
                    <FormattedMessage id="button.update-search" />
                </button>
            }
        >
            <>
                <div className="row">
                    <div className="col-sm-6 col-md-3">
                        <div className="form-group">
                            <label htmlFor="startDate">
                                <FormattedMessage id="form.select-range" />
                            </label>
                            <DatePickerReact
                                selected={startDate}
                                onChange={onChange}
                                startDate={startDate}
                                endDate={endDate}
                                selectsRange
                                inline
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleSearch}
                        >
                            <FormattedMessage id="button.search" />
                        </button>
                    </div>
                </div>
            </>
        </Fade>
    );
};
PickInterval.propTypes = {
    updateSearch: PropTypes.func,
    start: PropTypes.object,
    end: PropTypes.object,
};
export default PickInterval;
