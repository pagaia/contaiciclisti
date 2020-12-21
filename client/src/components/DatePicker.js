import  DatePickerReact, { getDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { registerLocale, setDefaultLocale } from "react-datepicker";

// registerLocale("it", it);
// setDefaultLocale("it");

const DatePicker = ({selected, onChange}) => {
  return (
    <DatePickerReact
      className="form-control"
      dateFormat="yyyy/MM/dd"
      selected={selected}
      onChange={onChange}
    />
  );
};

export default DatePicker;