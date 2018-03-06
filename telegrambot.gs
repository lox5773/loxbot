var token = "PUT_TELEGRAM_TOKEN_HERE";
var telegramUrl = "https://api.telegram.org/bot" + token;
var spreadsheetId = "REPLACE_SPREADSHEET_ID_HERE";

var webAppUrl = "https://script.google.com/macros/s/PUT_GOOGLE-SCRIPT_URL_PART_HERE/exec";


function getMe() {
  var url = telegramUrl + "/getMe";
  var response = UrlFetchApp.fetch(url);
  
  Logger.log(response.getContentText());
  
}

function setWebhook() {
  var url = telegramUrl + "/setWebhook?url=" + webAppUrl;
  var response = UrlFetchApp.fetch(url);
  
  Logger.log(response.getContentText());
} 

function sendText(id, text) {
  var url = telegramUrl + "/sendMessage?chat_id=" + id + "&text=" + text;
  var response = UrlFetchApp.fetch(url);
  
  Logger.log(response.getContentText());
} 

 
function doGet(e) {

  return HtmlService.createHtmlOutput("Hi There");
}

function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var text = data.message.text;
  var id = data.message.chat.id;
  var name = data.message.chat.first_name + " " + data.message.chat.last_name;
  var answer = "Hi " + name + ", thank you for your comment '" + text + "'";

  sendText(id, answer);
  
  SpreadsheetApp.openById(spreadsheetId).getSheets()[0].appendRow([new Date(), id, name, text]);
  
  //GmailApp.sendEmail(Session.getEffectiveUser().getEmail(), "Messege sent to LoxBot", JSON.stringify(data.message.text, null, 4)); 

}

/*{
    "update_id": 534865846,
    "message": {
        "message_id": 12,
        "from": {
            "id": 411006014,
            "is_bot": false,
            "first_name": "Alok",
            "last_name": "Arora",
            "language_code": "en-GB"
        },
        "chat": {
            "id": 411006014,
            "first_name": "Alok",
            "last_name": "Arora",
            "type": "private"
        },
        "date": 1520087715,
        "text": "yellow"
    }
}
*/

/*{
    "parameter": {},
    "contextPath": "",
    "contentLength": 268,
    "queryString": "",
    "parameters": {},
    "postData": {
        "type": "application/json",
        "length": 268,
        "contents": "{\"update_id\":534865842,\n\"message\":{\"message_id\":8,\"from\":{\"id\":411006014,\"is_bot\":false,\"first_name\":\"Alok\",\"last_name\":\"Arora\",\"language_code\":\"en-GB\"},\"chat\":{\"id\":411006014,\"first_name\":\"Alok\",\"last_name\":\"Arora\",\"type\":\"private\"},\"date\":1520080542,\"text\":\"hello\"}}",
        "name": "postData"
    }
}*/
