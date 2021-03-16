import React, { useEffect } from 'react';
import DailyAverage from 'components/charts/DailyAverage';

const DailyAveragePage = (props) => {
    useEffect(() => {
        document.title = `Portale Sperimentale -  Daily Average counts`;
    }, []);

    return (
        <div className="row">
            <div className="col-md-12">
                <DailyAverage />
            </div>
        </div>
    );
};

export default DailyAveragePage;
