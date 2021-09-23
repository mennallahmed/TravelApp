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
    let distance = countDownDate - now;
  
    // Time calculations for days, hours, minutes and seconds
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
    // Display the result in the element with
    document.getElementById("countdown").innerHTML = `Your Trip is in - ${days}d ${hours}h ${minutes}m ${seconds}s`;
    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("countdown").innerHTML = "EXPIRED";
    }
  }, 1000);
}

export { TripDuration}
