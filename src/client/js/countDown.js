let distance=0;
let days=0;
let x;
const TripDuration = async (inputText) => {
 
  const countDown = document.getElementById("travel-date").value;
  let countDownDate = new Date(countDown).getTime();
  console.log(`entered Date:${countDownDate}`);

  //Clear the counter
  if (x) {
    clearInterval(x);
    }
 
  // Update the count down every 1 second
   x = setInterval(function() {
  
    // Get today's date and time
    let now = new Date().getTime();
    
    // Find the distance between now and the count down date
     distance = countDownDate - now;
  
    // Time calculations for days, hours, minutes and seconds
    days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
    // Display the result in the element with
    document.getElementById("irony").innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";
    console.log(`entered Date: ${countDownDate}`);
    console.log(`now Date: ${now}`);
    console.log(`distance: ${distance}`);
    console.log(`days:${days} hours:${hours} minutes:${minutes} seconda:${seconds}`);
    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("irony").innerHTML = "EXPIRED";
    }
  }, 1000);
}

export { TripDuration , distance, days}
