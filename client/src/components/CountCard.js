import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { format } from 'timeago.js';
import CountUpAnimation from 'utility/CountUpAnimation';

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
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    text: PropTypes.string,
    date: PropTypes.string,
};
export default CountCard;
