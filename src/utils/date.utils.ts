export class FormatDate {

    getNowDate() {
      //Date
      let returnDate = "";
      let today = new Date();
  
      let dd = today.getDate();
      let mm = today.getMonth() + 1; //because January is 0! 
      let yyyy = today.getFullYear();
      let hours = today.getHours();
      let minutes = today.getMinutes();
  
      if (dd < 10)
        returnDate += `0${dd}/`;
      else
        returnDate += `${dd}/`;
  
      if (mm < 10)
        returnDate += `0${mm}/`;
      else
        returnDate += `${mm}/`;
  
      returnDate += yyyy + " ";
  
      if (hours < 10)
        returnDate += `0${hours}:`;
      else
        returnDate += `${hours}:`;
  
      if (minutes < 10)
        returnDate += `0${minutes}`;
      else
        returnDate += `${minutes}`;
  
      return returnDate;
  
    }
}