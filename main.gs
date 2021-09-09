const SSID = "1Twa8URanGwDO0iA0FGBlvjOvgyIsHBfiNkkf0witirA";
const ss = SpreadsheetApp.openById(SSID);

function doGet() {
  const html = HtmlService.createTemplateFromFile("index").evaluate();
  html
    .setTitle("新教育課程3年次科目選択フォームWebアプリ")
    .addMetaTag("viewport", "width=device-width, initial-scale=1")
  return html;
}

function doSubmitAjax(data) {
  console.log(data);
  insertRecord(data);
}

function insertRecord(data) {
  const sheetName = "data";
  const ss = SpreadsheetApp.openById(SSID);
  const sheet = ss.getSheetByName(sheetName);
  let array = [];
  for(key in data){
    if(key === "number")array.unshift(data["number"]);
    else array.push(...data[key]);
  };
  const email = Session.getActiveUser().getUserLoginId();
  array.unshift(email);
  const now = new Date();
  array.unshift(now);
  console.log(array);
  sheet.appendRow(array);
}

function getDataList() {
  const groupData = getDataFromSS('group');
  const subjectData = getDataFromSS('subject');
  const classData = getDataFromSS('class');
  console.log(groupData, subjectData, classData); 
  return {groupData, subjectData, classData};
}

function getDataFromSS(sheetName) {
  const data = ss.getSheetByName(sheetName).getDataRange().getValues();
  return formatData(data);
}

function formatData(data) {
  const header = data.shift();
  const list = data.map(arr => {
    const obj = {};
    arr.map((value, index) => {
      obj[header[index]] = value;
    });
    return obj;
  });
  return list;
}