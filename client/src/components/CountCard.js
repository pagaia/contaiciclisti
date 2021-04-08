import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'timeago.js';
import CountUpAnimation from 'utility/CountUpAnimation';
import { FormattedMessage } from 'react-intl';

const CountCard = ({ title, text, date, className }) => {
    return (
        <div className={`card last ${className}`}>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text highlighted">
                    {text ? (
                        <CountUpAnimation>{text}</CountUpAnimation>
                    ) : (
                        <>
                            <span className="sr-only">
                                <FormattedMessage id="counter.nd" />
                            </span>
                            <span>-</span>
                        </>
                    )}
                </p>
                {date && (
                    <footer className="blockquote-footer">
                        {format(date)}
                    </footer>
                )}
            </div>
        </div>
    );
};

CountCard.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    date: PropTypes.string,
};
export default CountCard;
