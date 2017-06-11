
//All number buttons and operator buttons should add themselves to the
//end of the input value and c button should clear the the input value

var mathsText = document.querySelector("#mathsText");

document.querySelector('.one_but').onclick = function(){mathsText.value = mathsText.value + "1"};
document.querySelector('.two_but').onclick = function(){mathsText.value = mathsText.value + "2"};
document.querySelector('.three_but').onclick = function(){mathsText.value = mathsText.value + "3"};
document.querySelector('.four_but').onclick = function(){mathsText.value = mathsText.value + "4"};
document.querySelector('.five_but').onclick = function(){mathsText.value = mathsText.value + "5"};
document.querySelector('.six_but').onclick = function(){mathsText.value = mathsText.value + "6"};
document.querySelector('.seven_but').onclick = function(){mathsText.value = mathsText.value + "7"};
document.querySelector('.eight_but').onclick = function(){mathsText.value = mathsText.value + "8"};
document.querySelector('.nine_but').onclick = function(){mathsText.value = mathsText.value + "9"};
document.querySelector('.zero_but').onclick = function(){mathsText.value = mathsText.value + "0"};
document.querySelector('.plus_but').onclick = function(){mathsText.value = mathsText.value + "+"};
document.querySelector('.minus_but').onclick = function(){mathsText.value = mathsText.value + "-"};
document.querySelector('.times_but').onclick = function(){mathsText.value = mathsText.value + "*"};
document.querySelector('.divide_but').onclick = function(){mathsText.value = mathsText.value + "/"};
document.querySelector('.mod_but').onclick = function(){mathsText.value = mathsText.value + "%"};
document.querySelector('.root_but').onclick = function(){mathsText.value = mathsText.value + "|"};
document.querySelector('.clear_but').onclick = function(){mathsText.value = ""};
document.querySelector('.decimal_but').onclick = function(){mathsText.value = mathsText.value + "."};


//Equal button click event equal to the function to calculate
document.querySelector('.equal_but').onclick = function(){makeMath(mathsText.value);};
//set enter key equal to the same function
mathsText.addEventListener('keypress', function(event){
  if (event.keyCode == 13){
    makeMath(mathsText.value);
  }
});


//The evaluate function
var makeMath = function(expression) {
  //catch the value from the input box
  eq_Strng = expression;

  //Run check function on the input value to make sure the equation is valid,
  //if not return a message in the textbox, Returns boolean to stop or go the rest
  if(prepForExecute(eq_Strng)){
    //all digits to an array
    var num_Array_Strng = eq_Strng.match(/\d*([.]\d*)?/g);

    //remove blank array elements
    num_Array_Strng = num_Array_Strng.filter(function(x){
      if (/\d/.test(x)) {
        return x;
      }
    });

    //change the type of num_Array to floats
    var num_Array = num_Array_Strng.map(function(myArray){
      return parseFloat(myArray);
    });

    //all operators to an array
    var op_Array = eq_Strng.match(/[-+/*|%]/g);

    //change op_Array to a string for search ease
    opsStrng = op_Array.reduce((x,y) => {return x+y;});

    //puts spaces in the num_Array so the count is right in the coming function
    if(opsStrng.indexOf("|")>-1){
      var count = 1;
      var howMany = opsStrng.match(/[|]/g).length;
      var spaceAr = [' '];
      for(var i=0; i<howMany; i++){
        var dex = opsStrng.indexOf('|', count);
        num_Array = num_Array.slice(0,dex).concat(spaceAr, num_Array.slice(dex,num_Array.length));
        count=dex+1;
      }
    }

    //Run a function to evaluate the arrays depending on whichever operators are included
    //and return an answer
    mathsText.value = maths(num_Array, opsStrng);
  }
  else{
    //Set value of the text box to "di ain't no math" for invalid equations
    mathsText.value = "di ain't no math";
  }

};


//validate equation
var prepForExecute = function(eq_Strng){
  //boolean set based on whether the equation is valid
  var isValid = true;
  //if the string has a op at the front beside root
  if(/[-+/*%]/.test(eq_Strng.charAt(0))){
    isValid=false;
  }
  //if the string has no op in it
  else if (/[-+/*%|]/.test(eq_Strng)==false) {
    isValid = false;
  }
  //if the string has two ops, two decimals in a row, or two roots in a row
  else if (/[-+/*%][-+/*%]/.test(eq_Strng) || /[.][.]/.test(eq_Strng) || /[|][|]/.test(eq_Strng)){
    isValid = false;
  }
  //if the string has an op at the end or a root after a digit
  else if (/[-+/*%]$/.test(eq_Strng) || /[\d][|]/.test(eq_Strng)) {
    isValid = false;
  }
  //if the string contains invalid characters**********Take out () so the user can use them
  else if ((/[a-z~`!@#$^&()_={}\[\]:;"'\\?><,]/i).test(eq_Strng)) {
    isValid = false;
  }
  return isValid;
};

var maths = function(numbas, ops){

  //the final equation string
  var final_eq
  //finds sqrt and works on the numbas
  if(ops.indexOf("|")>-1){
    var count2 = 0;
    var howMany2 = ops.match(/[|]/g).length;
    for(var j=0; j<howMany2; j++){
      var dex2 = ops.indexOf('|', count2);
      numbas[dex2+1]= (parseInt((Math.sqrt(numbas[dex2+1])*1000000)))/1000000;
      count2=dex2+1;
    }
  }
  //remove the sqrts from ops string and turns the operators back to an array
  var noRootOps = ops.match(/[-+/*%]/g);

  //removes spaces from numbas
  numbas = numbas.filter(function(x){
    if (/\d/.test(x)) {
      return x;
    }});

  //in the case the user only wants to root a number
  if(noRootOps!=null){
    //brings digits and ops back together
    for(var k=0; k<noRootOps.length; k++){
      if(k==0){
        final_eq = numbas[0].toString() + noRootOps[0] + numbas[1].toString();
        console.log(final_eq);
      }
      else{
        final_eq = final_eq + noRootOps[k] + numbas[k+1].toString();
      }
    }
    //evaluate the equation and returns
    return eval(final_eq);
  }
  else{
    //returns the rooted number
    return numbas[0];
  }
};
