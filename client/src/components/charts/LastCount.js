import axios from "axios";
import { useEffect, useState } from "react";
import { DEVICE_URL_LAST, REGEX_DEVICE } from "../../utility/constants";
import CountCard from "../CountCard";

function LastCount({ device }) {
  const [counts, setCounts] = useState({});

  // replace with channelID
  const apiEndPoint = DEVICE_URL_LAST.replace(
    REGEX_DEVICE,
    device.properties.channelId
  );

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
      <CountCard date={counts.created_at} title="Last" text={counts.field1} />
      <CountCard date={counts.created_at} title="Today" text={counts.field2} />
      {/* <CountCard title="Yesterday" text={counts.field8 || counts.field3} /> */}
    </div>
  );
}

export default LastCount;
