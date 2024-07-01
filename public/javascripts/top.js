const childDivs = document.querySelectorAll("#img-effect > div");
const dots = document.querySelectorAll("#pages > a");
const motionText = document.getElementById("motion-text");
const switchMode = document.getElementById("sm");
const imagesImg = document.querySelectorAll("#img-effect img");
const clickLogin = document.getElementById("a1");
const clickSignup = document.getElementById("a2");
const loginDisplay = document.getElementById("mainlogin-container");
const signinDisplay = document.getElementById("mainsignin-container");
const loginForm = document.getElementById("login-container");
const signinForm = document.getElementById("signin-container");
const loginGreet = document.getElementById("login-greet");
const gotoLogin = document.querySelector("#g-signin a");
const gotoSignin = document.querySelector("#g-login a");
// const signupDisplay = document.getElementById()


// function notAuthenticated() {

//   loginDisplay.style.display = "flex";
//   signinDisplay.style.display = "none";
//   loginGreet.textContent = "Login to See more";
// }



document.getElementById('signinForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;


  const errorText = document.getElementById('error-text');


  try {
    const response = await fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    });
    const data = await response.json();
    if (response.ok || response.status === 201) {
      console.log(data.message); // Success message
      window.location.href = '/profile'; // Redirect to the /profile route
    } else if (response.status === 400) {
      console.error(data.message); // Email already exists
      errorText.textContent = 'Username already exists';
      // errorText.style.paddingLeft = '160px';

      document.getElementById('error-text').style.display = 'block'; // Display error message
    } else if (response.status === 401) {
      console.error(data.message); // Email already exists
      errorText.textContent = 'Email already exists';
      // errorText.style.paddingLeft = '180px'
      errorText.style.display = 'block'; // Display error message
    }
  } catch (error) {
    console.error('Error:', error);
  }
});


document.getElementById('loginForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  const password = document.getElementById('login-password').value;
  const username = document.getElementById('login-username').value;

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (response.ok || response.status === 201) {
      console.log(data.message); // Success message
      window.location.href = '/profile'; // Redirect to the /profile route
    } else if (response.status === 400) {
      console.error(data.message); // Email already exists
      document.getElementById('error-login').textContent = 'Username not found';
      document.getElementById('error-login').style.display = 'block'; // Display error message
    } else if (response.status === 401) {
      console.error(data.message); // Email already exists
      document.getElementById('error-login').textContent = 'Wrong Password';
      document.getElementById('error-login').style.display = 'block'; // Display error message
    }
  } catch (error) {
    console.error('Error:', error);
  }
});




// console.log(a1)


// document.addEventListener("click", (event) => {
//   if (event.target === "gotoLogin") {
//     event.preventDefault();
//     loginDisplay.style.display = "flex";
//     signinDisplay.style.display = "none";
//   } else if (event.target === "gotoSignin") {
//     event.preventDefault();
//     loginDisplay.style.display = "none";
//     signinDisplay.style.display = "flex";
//   } else if (event.target.id === "a1") {
//     event.preventDefault();
//     loginDisplay.style.display = "flex";
//   } else if (event.target.id === "a2") {
//     event.preventDefault();
//     signinDisplay.style.display = "flex";
//   } else if (event.target === signinDisplay || !signinForm.contains(event.target)) {
//     signinDisplay.style.display = "none";
//   } else if (event.target === loginDisplay || !loginForm.contains(event.target)) {
//     loginDisplay.style.display = "none";
//   }
// });

document.addEventListener('click',(event) => {
  console.log('the document was clicked');
})


// goto login
gotoLogin.addEventListener("click", (event) => {
  event.preventDefault();
  loginDisplay.style.display = "flex";
  signinDisplay.style.display = "none";
});

// goto signin
gotoSignin.addEventListener("click", (event) => {
  event.preventDefault();
  loginDisplay.style.display = "none";
  signinDisplay.style.display = "flex";
});

// click on Login
clickLogin.addEventListener("click", (event) => {
  event.preventDefault();
  loginDisplay.style.display = "flex";
});

loginDisplay.addEventListener("click", (event) => {
  if (!loginForm.contains(event.target)) {
    loginDisplay.style.display = "none";
  }
});

// click in signin
clickSignup.addEventListener("click", (event) => {
  event.preventDefault();
  signinDisplay.style.display = "flex";
});

signinDisplay.addEventListener("click", (event) => {
  if (!signinForm.contains(event.target)) {
    signinDisplay.style.display = "none";
  }
});

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const abc = [

  "Art & crafts ideas",
  "Home decor ideas",
  "chai time snack idea",
  "DIY ideas",
  "Outfit ideas" 
];

let i = 0;
let t = 0;

// console.log(dots[1]);

async function motion() {
  t = i % 5;

  motionText.textContent = abc[t];
  await delay(400);

  motionText.style.bottom = "25%";
  motionText.style.opacity = "1";
  await delay(5000);

  motionText.style.bottom = "45%";
  motionText.style.opacity = "0";
  await delay(400);

  motionText.style.bottom = "0";
  motionText.style.opacity = "0";  
  i++;
  // motion();
}
// motion();

let  dotIndex = 0;
let di = 0;
async function setDots(){
  // await delay(1000);
  di = dotIndex % 5;   
  dots[di].style.backgroundColor = '#ae7a3b';
  dots[di].style.color = '#ae7a3b';
  await delay(5000);
  dots[di].style.backgroundColor = 'white';
  dots[di].style.color = 'white';   
  dotIndex++;
}
// setDots();




function delay1(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const imgArray = [
  "images/1.jpg",
  "images/2.jpg",
  "images/3.jpg",
  "images/4.jpg",
  "images/5.jpg",
  "images/6.jpg",
  "images/7.jpg",
  "images/8.jpg",
  "images/9.jpg",
  "images/10.jpg",
  "images/11.jpg",
  "images/12.jpg",
  "images/13.jpg",
  "images/14.jpg",
  "images/15.jpg",
  "images/16.jpg",
  "images/17.jpg",
  "images/18.jpg",
  "images/19.jpg",
  "images/20.jpg",
  "images/21.jpg",
  "images/22.jpg",
  "images/23.jpg",
  "images/24.jpg",
  "images/25.jpg",
  "images/26.jpg",
  "images/27.jpg",
  "images/28.jpg",
  "images/29.jpg",
  "images/30.jpg",
  "images/31.jpg",
  "images/32.jpg",
  "images/33.jpg",
  "images/34.jpg",
  "images/35.jpg",
];


let imgCount = 0;
let ic = 0;

function imgsSet() {
  imagesImg.forEach((img) => {
    ic = imgCount % 35;
    img.src = imgArray[ic];
    imgCount++;
  });

}

let viewportWidth;
let marignOrgValues;
let mydivMargin;


function handleResize() {
  viewportWidth = window.innerWidth;
  // console.log(`Viewport width: ${viewportWidth}px`);

  if(viewportWidth <= 800){
    marignOrgValues = [0, 200, 400, 600, 800, 1000, 1200];
    // mydivMargin = marginT - 200;
  } else {
    marignOrgValues = [0, 200, 400, 600, 400, 200, 0];
    // mydivMargin = marginT - 50;
  }
}

// Add event listener for the resize event
window.addEventListener('resize', handleResize);

// Optionally, call handleResize initially to log the initial width
handleResize();




// const marignOrgValues = [-10, 240, 410, 650, 410, 240, -10];


let imov = 0;
let m = 0;
let pt = 0;
let imglast = 0;

async function applyEffect() {
    let mi = m % 2;
    imov = 0; 

    for (const div of childDivs) {
      const computedStyle = window.getComputedStyle(div);
      const marginT = parseFloat(computedStyle.getPropertyValue("margin-top"));
      // let divMargin = marginT - 50;
      // let divMargin = marginT - 200;
      let divMargin = 0;
      if(viewportWidth <= 800){
        marignOrgValues = [0, 200, 400, 600, 800, 1000, 1200];
        divMargin = marginT - 200;
      } else {
        marignOrgValues = [0, 200, 400, 600, 400, 200, 0];
        divMargin = marginT - 50;
      }
      // let divMargin = mydivMargin;
      div.style.marginTop = `${divMargin}px`;
      div.style.opacity = `${mi}`;
      i++;
      await delay1(150);
    }
    m++;

    if (mi == 0) {
      for (const div of childDivs) {
        if (imov == 6) {
          await delay1(300);
        }
        div.style.marginTop = `${marignOrgValues[imov]}px`;
        imov++;
        motion();
      }      
      applyEffect();
      imgsSet();
      setDots();
    } else {
      await delay1(4000);      
      applyEffect();
    } 
    // applyEffect();
}
applyEffect();







