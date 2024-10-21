import IProfile from "./Interfaces/IProfile";

const ToTitleCase = (str: string|undefined): string =>{

if(str == undefined){
    return ""
}
if(str=="" || str == null){return ""}
var result :string = str.charAt(0).toUpperCase() + str.slice(1);

return result;
}

const printDate = (date:Date|string|undefined) :string =>{
    if(date === undefined || date =="" || date== null){return ""}
    if(typeof date === "string"){
        date = new Date(date);
    }
    var result :string =  date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
    return result;
}
function getRandomColor() {
    var randomNum = Math.floor(Math.random() * 360);
      const randomColor = `hsl(${randomNum}deg, 50%, 10%)`;
      return randomColor;
    }


export {ToTitleCase,printDate,getRandomColor};