const explore = document.getElementById('explore');
const home = document.getElementById('home');
const divs = document.querySelectorAll('.bgc');



// Get all the divs inside the super div

// Loop through each div to attach a click event listener
divs.forEach(function(div) {
    div.addEventListener('click', function() {
        // Remove the class from all divs

        // if(div.classList.contains('active')){
        //     div.classList.remove('active');
        // } else {
        //     div.classList.add('active');

        // }

        divs.forEach(function(d) {
            d.classList.remove('active');
        });
        
        // Add the class to the clicked div
        div.classList.add('active');
    });
});





// const navChild = document.querySelector('#profile-nav > a');

// explore.addEventListener('click', () =>{
//     home.classList.remove('active');
//     explore.classList.add('active');
// })