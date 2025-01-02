// 年龄计算(精确到岁、月、小时)

export function getAge(beginStr, endStr) {
  const reg = new RegExp(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})(\s)(\d{1,2})(:)(\d{1,2})(:{0,1})(\d{0,2})$/);
  const beginArr = beginStr.match(reg);
  const endArr = endStr.match(reg);
  let days = 0;
  let month = 0;
  let year = 0;
  days = endArr[4] - beginArr[4];
  if (days < 0) {
    month = -1;
    days = 30 + days;
  }
  month = month + (endArr[3] - beginArr[3]);
  if (month < 0) {
    year = -1;
    month = 12 + month;
  }
  year = year + (endArr[1] - beginArr[1]);

  const yearString = year > 0 ? year + "岁" : "";
  const mnthString = month > 0 ? month + "月" : "";
  let dayString = days > 0 ? days + "天" : "";
  /*
   * 1 如果岁 大于等于1 那么年龄取 几岁 2 如果 岁等于0 但是月大于1 那么如果天等于0 天小于3天 取小时
   * 例如出生2天 就取 48小时
   */
  let result = "";
  if (year >= 1) {
    result = yearString + mnthString;
  } else {
    if (month >= 1) {
      result = days > 0 ? mnthString + dayString : mnthString;
    } else {
      const begDate = new Date(beginArr[1], beginArr[3] - 1, beginArr[4], beginArr[6], beginArr[8], beginArr[10]);
      const endDate = new Date(endArr[1], endArr[3] - 1, endArr[4], endArr[6], endArr[8], endArr[10]);

      const between = (endDate.getTime() - begDate.getTime()) / 1000;
      days = Math.floor(between / (24 * 3600));
      hours = Math.floor(between / 3600 - days * 24);
      dayString = days > 0 ? days + "天" : "";
      result = days >= 3 ? dayString : days * 24 + hours + "小时";
    }
  }

  return result;
}
console.log(getAge("1980-03-22 10:1:2", "1982-03-22 10:1:2"));
console.log(getAge("1980-02-29 10:1:2", "1981-03-01 10:12:2"));
console.log(getAge("1980-03-22 10:1:2", "1980-03-23 9:1:1"));
console.log(getAge("1981-02-28 10:1:2", "1981-03-01 10:1:2"));
