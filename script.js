let themeBtn = document.getElementById("theme-btn");

themeBtn.addEventListener("click", function(){

    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){
        themeBtn.classList.remove("fa-moon");
        themeBtn.classList.add("fa-sun");
    }else{
        themeBtn.classList.remove("fa-sun");
        themeBtn.classList.add("fa-moon");
    }

});

// alert("Hello");