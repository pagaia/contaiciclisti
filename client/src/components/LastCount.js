import axios from "axios";
import { useEffect, useState } from "react";
import { REGEX_DEVICE } from "../utility/constants";
import CountCard from "./CountCard";

const deviceUrl = "https://api.thingspeak.com/channels/DEVICE/feeds/last.json";

function LastCount({ device }) {
  const [counts, setCounts] = useState({});

  // replace with channelID
  const apiEndPoint = deviceUrl.replace(REGEX_DEVICE, device.properties.channelId);

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
      <CountCard date={counts.created_at} title="Last" text={counts.field1}/>
      <CountCard date={counts.created_at} title="Today" text={counts.field2}/>
      {/* <CountCard title="Yesterday" text={counts.field8}/> */}
    </div>
  );
}

export default LastCount;
