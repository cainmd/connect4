//var $ = window.jQuery;
var currentColor = "Black";



var divFall = [];
for (var i = 0; i < 6;i++ ){
    
        divFall [i] = [0,0,0,0,0,0,0];
    
}

//var help = [idg('1,1'),idg('1,2'),idg('1,3'),idg('1,4'),idg('1,5'), idg('1,6'), idg('1,7')];

$(document).ready(function () {



    $('div').mouseenter(function () {
        $(this).fadeTo('fast', 0.5);
        //$('#A1-2').removeClass('pink');
        //$('#A1-2').addClass('black');

    });
    $('div').mouseleave(function () {
        $(this).fadeTo('fast', 1);

    });
    $('div').click(function () {
        if (currentColor == "Black") {
            var p = fallTo(this.id);

            $(p).removeClass('pink');
            $(p).addClass('black');
            //alert(p)
            checkWin(p);
            toggleColor();
        }
        else {
            var p = fallTo(this.id)

            $(p).removeClass('pink');
            $(p).addClass('red');
            checkWin(p);
            toggleColor();
        }
    });

});




    var toggleColor = function () {
        if (currentColor == "Black") {
            currentColor = "Red";
        }
        else {
            currentColor = "Black";
        }

    };

    var fallTo = function (b) {
        var last = b.toString();
        var returnValue;
        for (i = 5; i >= 0; i--) {
            if (divFall[i][parseInt(last.charAt(3))] == 0) {
                returnValue = '#A' + i + '-' + last.charAt(3);
                if (currentColor == "Black") {
                    divFall[i][parseInt(last.charAt(3))] = 1;
                }
                else {
                    divFall[i][parseInt(last.charAt(3))] = 2;
                }
                i = 0;
            }
        }
        return returnValue;
        //return '#A1-2';
    };

    var checkWin = function (x) {
        //alert ("here")
        var stringId = x;
        //.toString();

        var row = parseInt(stringId.charAt(2));
        var column = parseInt(stringId.charAt(4));

        //alert (column)
        var countDiagLT = 0;
        var countDiagRT = 0;
        var countVert = 0;
        var countHor = 0;
        var lookForPiece;

        var xmin;
        var xmax;
        var ymin;
        var ymax;

        if (column > 3) {
            xmin = 3;
        }
        else { xmin = column };

        if (column < 3) {
            xmax = 3;
        }
        else { xmax = 6 - column };

        if (row > 3) {
            ymin = 3
        }
        else { ymin = row };
        if (row < 2) {
            ymax = 3;
        }
        else { ymax = 5 - row };


        if (currentColor == "Black") {

            lookForPiece = 1;
        }
        else {
            lookForPiece = 2;
        }

        (function () {

            //alert(column + xmax)
            //for (i = column - xmin; i >= column + xmax; i++)
            for (i = column - xmin; i <= column + xmax; i++) {
                //alert (i)
                if (countHor < 4) {
                    if (divFall[row][i] == lookForPiece) {
                        countHor++;
                        //alert(countHor);
                    }
                    else {
                        countHor = 0;
                    }
                }
                //else { alert("you win") }
            }



        })();

        (function () {
            //alert (row+ymax)
            //alert (row - ymin)
            for (j = row - ymin; j <= row + ymax; j++) {
                //alert (i)
                if (countVert < 4) {
                    if (divFall[j][column] == lookForPiece) {
                        countVert++;
                        //alert (countVert)
                        //alert(countHor);
                    }
                    else {
                        countVert = 0;
                    }
                }
                //else { alert("you win") }
            }
        })();

        (function () {
            var j = row - ymin;
            // row + ymax
            //alert (row+ymax)
            //alert (row - ymin)
            for (i = column - xmin; i <= column + xmax; i++) {
                if (j <= row + ymax) {
                    if (countDiagLT < 4) {
                        if (divFall[j][i] == lookForPiece) {
                            countDiagLT++;
                            //alert (countVert)
                            //alert(countHor);
                        }
                        else {
                            countDiagLT = 0;
                        }
                    }
                }
                //else { alert("you win") }
                j++;
            }
        })();

        (function () {
            var j = row + ymax;
            //row - ymin;
            //alert (row+ymax)
            //alert (row - ymin)
            for (i = column - xmin; i <= column + xmax; i++) {
                if (j >= row - ymin) {
                    //alert (i)
                    if (countDiagRT < 4) {
                        if (divFall[j][i] == lookForPiece) {
                            countDiagRT++;
                            //alert (countVert)
                            //alert(countHor);
                        }
                        else {
                            countDiagRT = 0;
                        }
                    }
                    
                    //else { alert("you win") }
                }
                j--;
            }
        })();

        if (countVert > 3 || countHor > 3 || countDiagLT > 3 || countDiagRT > 3) {
            //alert("you Win!")
            youWin();
        }
    }

    var youWin = function () {
      $("#popup").fadeIn("fast");
       // $('#winner').text("You Win")
        //$('#winner').img('a');
         $('#popupText').text(currentColor + " Wins");
        document.getElementById('popup').style.display = 'block';

    }