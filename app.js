// Listen for submit
document.getElementById('loan-form').addEventListener('submit',function(e){
  
  // Hide Result  : in-start they will be hidden but after after refreshing it will be still there. so to keep it hidden always
  document.getElementById('results').style.display = 'none';

  // Show Loader
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 2000);  // results will still be not visible bcz we have kept it hidden. so display it in the function below

  e.preventDefault(); // jere this will prevent default behaviour of submit and will allow to loading img to persist there instead of going away in a sec.
}); 
// now we dont need to show to the calculated results direclty, we want to delay it and also show that loading img. 
// so we can use calculateResults in another function and remove event handler e.



function calculateResults(e){
  // console.log('calculating..');
  
  // UI varibales
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('Mpayment');
  const totalPayment = document.getElementById('Tpayment');
  const totalInterest = document.getElementById('Tinterest');

  const principal = parseFloat(amount.value);   // to get values in decimals
  const CI = parseFloat(interest.value) / 100 / 12;  // gives calculated interest
  const CP = parseFloat(years.value) * 12;  // gives calculated payments

  // compute monthly payment
  const x = Math.pow(1 + CI, CP);
  const monthly =  (principal*x*CI)/(x-1);

  // we need to check 'monthly' payment is actually a finite no.
  if(isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);  // to have decimal points toFixed(), we want 2 decimal pts for monthly
    totalPayment.value = (monthly * CP).toFixed(2);
    totalInterest.value = ((monthly * CP)-principal).toFixed(2);

    // show results
    document.getElementById('results').style.display = 'block';

    // Hide Loader
    document.getElementById('loading').style.display = 'none';

  } else {
    // console.log('Please check details');
    showError('Please enter proper numbers');
  }
  
  e.preventDefault();
}

// Show Error
function showError(error){
  // Create a div 
  const errorDiv = document.createElement('div');

  // Get elements  - for displaying error div in our dom having class card and above our heading having class heading
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // Add class - bootsrtap classes - alert(to show alert), alert-danger(to make red)
  errorDiv.className = 'alert alert-danger';

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  //Insret card above heading - by calling parent card
  card.insertBefore(errorDiv, heading);

  // Clear error after 3 sec
  setTimeout(clearError, 3000);  // setTimeout(function, time in ms) ;  3000ms = 3s
  
 // Hide results
 document.getElementById('results').style.display = 'none';

 // Hide Loader
 document.getElementById('loading').style.display = 'none';
}

// Clear Error
function clearError(){
  document.querySelector('.alert').remove();
}
