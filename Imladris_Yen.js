var main = function() {

  function romanize(num) {
    if (isNaN(num))
      return NaN;
    var digits = String(+num).split(""),
      key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
        "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
        "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"
      ],
      roman = "",
      i = 3;
    while (i--)
      roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
  }

    //Julian Day Number
    Date.prototype.getJulianUTC = function() {
      return (this / 86400000) + 2440587.5;
    }

    var today = new Date(); //set any date

    //Eldarian Day Number from Julian Day Number
    var eldarianUTC = today.getJulianUTC() + 2316981.5;

    var eldarian = eldarianUTC - (today.getTimezoneOffset()/1440)+0.25; //converts to local time, and adjusts the day number to start at 6pm (roughly sunset).

    //Neldien - The three yén cycle of the elvish calendar. The leap loa is skipped
    //   in the final year (year 432 of the cycle) Neldien is Quenya for three yén.
    var Neldien = Math.trunc(eldarian / 157785) + 1;

    //day of the Neldien. How many days into the Neldien cycle are we?
    dayNeldien = ((eldarian - 1) % 157785) + 1;

    //Loarasta of the Neldien. The Loarasta is the 12 year (loa) leap cycle. The
    //  last Loarasta of the Neldien does not contain a leap year. Loarasta is
    //  Quenya for 12-year.
    loarastaNeldien = Math.trunc(((eldarian - 1) % 157785) / 4383) + 1;

    //Day of the Loarasta. How many days into the 12 year leap cycle are we?
    dayLoarasta = dayNeldien - ((loarastaNeldien - 1) * 4383);

    //Loa of the Loarasta. How many years (loa) are we into the leap cycle?

    switch (true) {
      case (dayLoarasta < 273 && dayLoarasta >= 0):
        loaLoarasta = Math.trunc(dayLoarasta / 365) + 1;
        break;
      case (dayLoarasta > 0):
        loaLoarasta = Math.trunc(dayLoarasta / 365) + 1;
        break;
      default:
        loaLoarasta = 12;
        break;
    }

    //Full count of years (loa).
    Loa = ((Neldien - 1) * 432) + ((loarastaNeldien - 1) * 12) + loaLoarasta

    //Leap Loa. Is this a leap year?
    if (Loa % 12 === 0 && Loa % 432 !== 0) {
      leapLoa = true;
    } else {
      leapLoa = false;
    }

    //Yén is the elvish 'long year' or 144 solar years. Each yén contains 12
    //   loarasta or leap cycles. The last leap cycle of every third yén does
    //   not contain a leap year.
    Yen = Math.trunc(Loa / 144) + 1;

    //Is this a 'hollow' yén (the last yén of the three yen [Neldien] cycle
    //   which contains only 11 leap years)?
    if (Yen % 3 === 0) {
      hollowYen = true;
    } else {
      hollowYen = false;
    }

    //Loa of the Yén. What is the Loa number of this Yén?
    loaYen = ((Loa - 1) % 144) + 1

    //The ordinal day number of the Loa
    dayLoa = dayNeldien - ((loarastaNeldien - 1) * 4383 + (loaLoarasta - 1) * 365)

    //zero based counting day of Loa
    dayLoa0b = dayLoa - 1

    //The Loasta (month/season) number
    if (leapLoa === true) {
      switch (true) {
        case (dayLoa0b >= 0 && dayLoa0b <= 1):
          LoastaNumber = 1;
          break;
        case (dayLoa0b >= 1 && dayLoa0b <= 54):
          LoastaNumber = 2;
          break;
        case (dayLoa0b >= 55 && dayLoa0b <= 126):
          LoastaNumber = 3;
          break;
        case (dayLoa0b >= 127 && dayLoa0b <= 180):
          LoastaNumber = 4;
          break;
        case (dayLoa0b >= 181 && dayLoa0b <= 186):
          LoastaNumber = 5;
          break;
        case (dayLoa0b >= 187 && dayLoa0b <= 240):
          LoastaNumber = 6;
          break;
        case (dayLoa0b >= 241 && dayLoa0b <= 312):
          LoastaNumber = 7;
          break;
        case (dayLoa0b >= 313 && dayLoa0b <= 366):
          LoastaNumber = 8;
          break;
        case (dayLoa0b >= 367 && dayLoa0b <= 368):
          LoastaNumber = 9;
          break;
      }
    } else {
      switch (true) {
        case (dayLoa0b >= 0 && dayLoa0b <= 1):
          LoastaNumber = 1;
          break;
        case (dayLoa0b >= 1 && dayLoa0b <= 54):
          LoastaNumber = 2;
          break;
        case (dayLoa0b >= 55 && dayLoa0b <= 126):
          LoastaNumber = 3;
          break;
        case (dayLoa0b >= 127 && dayLoa0b <= 180):
          LoastaNumber = 4;
          break;
        case (dayLoa0b >= 181 && dayLoa0b <= 183):
          LoastaNumber = 5;
          break;
        case (dayLoa0b >= 184 && dayLoa0b <= 237):
          LoastaNumber = 6;
          break;
        case (dayLoa0b >= 238 && dayLoa0b <= 309):
          LoastaNumber = 7;
          break;
        case (dayLoa0b >= 310 && dayLoa0b <= 363):
          LoastaNumber = 8;
          break;
        case (dayLoa0b >= 364 && dayLoa0b <= 365):
          LoastaNumber = 9;
          break;
      }
    }

    //The day of the Loasta (month or season)
    //The Loasta (month/season) number
    if (leapLoa === true) {
      switch (true) {
        case (dayLoa0b >= 0 && dayLoa0b <= 1):
          dayLoasta = dayLoa - 0;
          break;
        case (dayLoa0b >= 1 && dayLoa0b <= 54):
          dayLoasta = dayLoa - 1;
          break;
        case (dayLoa0b >= 55 && dayLoa0b <= 126):
          dayLoasta = dayLoa - 55;
          break;
        case (dayLoa0b >= 127 && dayLoa0b <= 180):
          dayLoasta = dayLoa - 127;
          break;
        case (dayLoa0b >= 181 && dayLoa0b <= 186):
          dayLoasta = dayLoa - 181;
          break;
        case (dayLoa0b >= 187 && dayLoa0b <= 240):
          dayLoasta = dayLoa - 187;
          break;
        case (dayLoa0b >= 241 && dayLoa0b <= 312):
          dayLoasta = dayLoa - 241;
          break;
        case (dayLoa0b >= 313 && dayLoa0b <= 366):
          dayLoasta = dayLoa - 313;
          break;
        case (dayLoa0b >= 367 && dayLoa0b <= 368):
          dayLoasta = dayLoa - 367;
          break;
      }
    } else {
      switch (true) {
        case (dayLoa0b >= 0 && dayLoa0b <= 1):
          dayLoasta = dayLoa - 0;
          break;
        case (dayLoa0b >= 1 && dayLoa0b <= 54):
          dayLoasta = dayLoa - 1;
          break;
        case (dayLoa0b >= 55 && dayLoa0b <= 126):
          dayLoasta = dayLoa - 55;
          break;
        case (dayLoa0b >= 127 && dayLoa0b <= 180):
          dayLoasta = dayLoa - 127;
          break;
        case (dayLoa0b >= 181 && dayLoa0b <= 183):
          dayLoasta = dayLoa - 181;
          break;
        case (dayLoa0b >= 184 && dayLoa0b <= 237):
          dayLoasta = dayLoa - 184;
          break;
        case (dayLoa0b >= 238 && dayLoa0b <= 309):
          dayLoasta = dayLoa - 238;
          break;
        case (dayLoa0b >= 310 && dayLoa0b <= 363):
          dayLoasta = dayLoa - 310;
          break;
        case (dayLoa0b >= 364 && dayLoa0b <= 365):
          dayLoasta = dayLoa - 364;
          break;
      }
    }

    //The day number of the week (Enquië)
    dayNumEnquie = Math.trunc(((eldarian - 1) % 6) + 1);
    dayEnquie = Math.trunc(eldarian % 6);

    //Integer day of Loasta
    intDayLoasta = Math.trunc(dayLoasta);

    //0 based LoastaNumber
    LoastaNumber0b = LoastaNumber - 1;

    //Yen in Roman numerals
    romYen = romanize(Yen);

    //month
    monthsQuenya = new Array('Yestarë', 'Tuilë', 'Lairë', 'Yávië', 'Enderi', 'Quellë', 'Hrívë', 'Coirë', 'Mettarë')

    monthsSindarin = new Array('Yestarë', 'Ethuil', 'Laer', 'Iavas', 'Enderi', 'Firith', 'Rhîw', 'Echuir', 'Mettarë')

    //day of week (Enquië)
    daysQuenya = new Array('Valanya', 'Elenya', 'Anarya', 'Isilya', 'Aldúya', 'Menelya')

    daysSindarin = new Array('Orbelain', 'Orgilion', 'Oranor', 'Orithil', 'Orgaladhad', 'Ormenel')


    resultQuenya = daysQuenya[dayEnquie] + ', ' + intDayLoasta + ' ' + monthsQuenya[LoastaNumber0b] + ' ' + loaYen + ' ' + romYen;

    resultSindarin = daysSindarin[dayEnquie] + ', ' + intDayLoasta + ' ' + monthsSindarin[LoastaNumber0b] + ' ' + loaYen + ' ' + romYen;


    debug = "<br>" + eldarian + "<br>" + 'Neldien: ' + Neldien + ',  dayNeldien: ' + dayNeldien + ',  loarastaNeldien: ' + loarastaNeldien + ',  dayLoarasta: ' + dayLoarasta + "<br>Loa of the Loarasta: " + loaLoarasta + ',  Loa: ' + Loa + ',  leapLoa: ' + leapLoa + ',  Yen: ' + Yen + ',  hollowYen: ' + hollowYen + ',  loaYen: ' + loaYen + "<br>dayLoa: " + dayLoa + ", LoastaNumber: " + LoastaNumber + ', Loasta name: ' + monthsQuenya[LoastaNumber0b] + ' / ' + monthsSindarin[LoastaNumber0b] + ", dayLoasta: " + dayLoasta + ', intDayLoasta: ' + intDayLoasta + ', dayEnquie: ' + dayEnquie + ', day of Week (Enquië): ' + daysQuenya[dayEnquie] + ' / ' + daysSindarin[dayEnquie] + ', day number of Enquië: ' + dayNumEnquie;

    return 'Yén: '+ Yen;
    /*return resultSindarin;*/
  }
