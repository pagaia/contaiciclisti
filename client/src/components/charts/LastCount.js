import axios from "axios";
import { useEffect, useState } from "react";
import { DEVICE_URL, REGEX_DEVICE } from "utility/constants";
import CountCard from "components/CountCard";

function LastCount({ device }) {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    const today = new Date().toISOString().substring(0, 10);

    // replace with channelID
    const apiEndPoint =
      DEVICE_URL.replace(REGEX_DEVICE, device.properties.channelId) +
      `&start=${today}`;

    const getCount = async () => {
      let res = await axios.get(apiEndPoint);

      let feed = {};
      res?.data?.feeds?.forEach?.((count) => {
        if (count.field1 !== null) {
          feed = {
            created_at: count.created_at,
            last: count.field1,
            subTotal: count.field2,
            total: count.field3,
            yesterday: count.field8,
          };
        }
      });

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
        text={counts.yesterday || counts.total}
        className="big-counter"
      />
    </div>
  );
}

export default LastCount;
