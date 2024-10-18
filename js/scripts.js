// SIDEBAR TOGGLE

let sidebarOpen = false;
const sidebar = document.getElementById('sidebar');

function openSidebar() {
  if (!sidebarOpen) {
    sidebar.classList.add('sidebar-responsive');
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if (sidebarOpen) {
    sidebar.classList.remove('sidebar-responsive');
    sidebarOpen = false;
  }
}

// Log in page
var x = document.getElementById("login");
var y = document.getElementById("register");
var z = document.getElementById("btn");
function login() {
    x.style.left = "27px";
    y.style.left = "-350px";
    z.style.left = "0px";


}
function register() {
    x.style.left = "-350px";
    y.style.left = "25px";
    z.style.left = "150px";


}
// view password code 
function mylogpassword() {
    var a = document.getElementById("logPassword");
    var b = document.getElementById("eye");
    var c = document.getElementById("eye-slash");
    if (a.type === "password") {
        a.type = "text";
        b.style.opacity = "0";
        c.style.opacity = "1";

    } else {
        a.type = "password";
        b.style.opacity = "1";
        c.style.opacity = "0";
    }
}

function myregpassword() {
    var d = document.getElementById("regPassword");
    var b = document.getElementById("eye-2");
    var c = document.getElementById("eye-slash-2");
    if (d.type === "password") {
        d.type = "text";
        b.style.opacity = "0";
        c.style.opacity = "1";

    } else {
        d.type = "password";
        b.style.opacity = "1";
        c.style.opacity = "0";
    }
}
 // نام کاربری و رمز عبور از پیش تعریف شده
 const predefinedUsername = "admin@example.com";
 const predefinedPassword = "123456";

 // دکمه لاگین را انتخاب می‌کنیم
 document.getElementById("loginBtn").addEventListener("click", function(event) {
     event.preventDefault(); // جلوگیری از رفرش شدن صفحه

     // گرفتن مقادیر وارد شده توسط کاربر
     const enteredEmail = document.getElementById("logEmail").value;
     const enteredPassword = document.getElementById("logPassword").value;

     // بررسی نام کاربری و رمز عبور
     if (enteredEmail === predefinedUsername && enteredPassword === predefinedPassword) {
         window.location.href = "dshboard.html"; // هدایت به داشبورد
     } else {
         alert("Username or password invalid!");
     }
 });

 // regester 
 // Function to handle the sign-up process
 document.getElementById("signupBtn").addEventListener("click", function(event) {
    event.preventDefault();  // Prevent the form from submitting
    
    // Get input values
    const username = document.getElementById("regUser").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;
    const rememberMe = document.getElementById("formcheck-2").checked;

    // Create a user object
    const userData = {
        username: username,
        email: email,
        password: password,
        remember: rememberMe
    };

    // Save user data in localStorage
    localStorage.setItem("user", JSON.stringify(userData));

    // Optional: Clear form inputs after saving
    document.getElementById("regUser").value = "";
    document.getElementById("regEmail").value = "";
    document.getElementById("regPassword").value = "";
    document.getElementById("formcheck-2").checked = false;

    alert("User registered successfully!");
});


