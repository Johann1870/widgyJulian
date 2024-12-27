
var main = function () {

  Date.prototype.getJulianUTC = function() {
    return (this / 86400000) + 2440587.5;
  }

  var today = new Date(); //set any date
  var julian = today.getJulianUTC(); //get Julian counterpart


  return julian.toFixed(2);
}
