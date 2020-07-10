import { props2Text } from "../../helper/util";

export default (config) => {
  const props = {
    range: [config.startDate, config.endDate],
  };
  return `<el-calender ${props2Text(props)} />`;
};
