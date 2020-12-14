import axios from "axios";
import { useEffect, useState } from "react";
import { REGEX_DEVICE } from "../utility/constants";
import { format } from "timeago.js";

const deviceUrl = "https://api.thingspeak.com/channels/DEVICE/feeds/last.json";

function LastCount({ device }) {
  const [counts, setCounts] = useState({});

  // replace with channelID
  const apiEndPoint = deviceUrl.replace(REGEX_DEVICE, device.channelId);

  const getCount = async () => {
    let res = await axios.get(apiEndPoint);
    let { data } = res;
    setCounts(data);
  };

  useEffect(() => {
    getCount();
  }, []);

  return (
    <div className="last-counter">
      <div className="card last">
        <div className="card-body">
          <h5 className="card-title">Last count</h5>
          <p className="card-text inverted">{counts.field1}</p>
          <footer className="blockquote-footer">
            {
              // format date string
              format(counts.created_at)
            }
          </footer>
        </div>
      </div>

      <div className="card last">
        <div className="card-body">
          <h5 className="card-title">Total today</h5>
          <p className="card-text inverted">{counts.field2}</p>
          <footer className="blockquote-footer">
            {
              // format date string
              format(counts.created_at)
            }
          </footer>
        </div>
      </div>
    </div>
  );
}

export default LastCount;
