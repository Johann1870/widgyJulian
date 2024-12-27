
var main = function () {

  Date.prototype.getJulianUTC = function() {
    return (this / 86400000) + 2440587.5;
  }

  var today = new Date(); //set any date
  var julian = today.getJulianUTC().toLocaleString('en-GB', {minimumFractionDigits:3, maximumFractionDigits:5}); //get Julian counterpart


  return julian;
}
