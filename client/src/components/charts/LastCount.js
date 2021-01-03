import axios from "axios";
import { useEffect, useState } from "react";
import { DEVICE_URL, REGEX_DEVICE } from "utility/constants";
import CountCard from "components/CountCard";
import { format } from "date-fns";

function LastCount({ device }) {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    let today = new Date();
    today.setDate(today.getDate() - 1);

    // get the last count of yesterday so I can get the total number of yesterday
    today = format(today, "yyyy-MM-dd 23:00");

    // replace with channelID
    const apiEndPoint =
      DEVICE_URL.replace(REGEX_DEVICE, device.properties.channelId) +
      `&start=${today}`;

    const getCount = async () => {
      let res = await axios.get(apiEndPoint);

      const yesterday = res?.data?.feeds?.[0];

      const last = res?.data?.feeds?.[res?.data?.feeds?.length - 1];
      const secondLast = res?.data?.feeds?.[res?.data?.feeds?.length - 2];
      let feed = {
        yesterday: yesterday?.field3,
        last: last?.field1 || secondLast?.field1,
        subTotal: last?.field2 || secondLast?.field2,
        total: last?.field3 || secondLast?.field3,
      };

      setCounts(feed);
    };

    getCount();
  }, [device.properties.channelId]);

  return (
    <div className="last-counter">
      <CountCard date={counts.created_at} title="Last" text={counts.last} />
      <CountCard
        date={counts.created_at}
        title="Today"
        text={counts.subTotal}
      />
      <CountCard
        title="Yesterday"
        text={counts.yesterday}
        className="big-counter"
      />
    </div>
  );
}

export default LastCount;
