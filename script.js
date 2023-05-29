const passowrd = document.querySelector("#Passowrd");
const slider = document.querySelector("#range");

const checkbox = document.querySelectorAll("input[type=checkbox]");
const ul = document.querySelector("ul");
const type = document.querySelectorAll(".type-strength-seq div");
let type_strength = document.querySelector("#type-strength");
let tempSliderValue = 0;
let checked_Items_Id = [];

//copy function
function copy() {
  navigator.clipboard.writeText(passowrd.innerHTML);
  // console.log(passowrd.innerHTML);
  document.querySelector("#copied").style.visibility = "visible";
}

//change color slide
slider.addEventListener("input", function (event) {
  tempSliderValue = event.target.value;
  document.querySelector("#length-span").innerHTML = tempSliderValue;

  const progress = (tempSliderValue / slider.max) * 100;

  slider.style.background = `linear-gradient(to right, #a4ffaf ${progress}%, #18171f ${progress}%)`;
});

//
let click = 0;

//Change type passowrd strength
ul.addEventListener("click", function (e) {
  if (e.target.checked === true) {
    if (click < 4) {
      type.forEach((items, index) => {
        if (click === 0 && index === 0) {
          items.style.background = "#f64a4a";
          items.style.border = "1px solid #f64a4a";
          type_strength.style.visibility = "visible";
          type_strength.innerHTML = "TOO WEAK!";
        } else if (click === 1) {
          if (index < 2) {
            items.style.background = "#fb7c58";
            items.style.border = "1px solid #fb7c58";
            type_strength.innerHTML = "WEAK";
          }
        } else if (click === 2) {
          if (index < 3) {
            items.style.background = "#f8cd65";
            items.style.border = "1px solid #f8cd65";
            type_strength.innerHTML = "MEDIUM";
          }
        } else if (click === 3) {
          items.style.background = "#a4ffaf";
          items.style.border = "1px solid #a4ffaf";
          type_strength.innerHTML = "STRONG";
        }
      });
      ++click;
    }
  } else if (e.target.checked === false) {
    --click;
    type[click].style.background = "#24232c";
    type[click].style.border = "1px solid #e6e5ea";
    type.forEach((items, index) => {
      if (click === 0) {
        type_strength.innerHTML = "";
      }
      if (click === 1 && index < 1) {
        items.style.background = "#f64a4a";
        items.style.border = "1px solid #f64a4a";
        type_strength.innerHTML = "TOO WEAK!";
      }

      if (index < 2 && click === 2) {
        items.style.background = "#fb7c58";
        items.style.border = "1px solid #fb7c58";
        type_strength.innerHTML = "WEAK";
      }
      if (index < 3 && click === 3) {
        items.style.background = "#f8cd65";
        items.style.border = "1px solid #f8cd65";
        type_strength.innerHTML = "MEDIUM";
      }
    });
  }
});

//generate password
function generate() {
  checked_Items_Id = [];
  //push the checked items tp checked_items_Id
  checkbox.forEach((items) => {
    if (items.checked === true) {
      checked_Items_Id.push(items.id);
    }
  });

  if (checked_Items_Id.length === 0 || Number(tempSliderValue) === 0) {
    document.querySelector(".message").style.display = "flex";
    document.querySelector("#message-content").innerHTML =
      checked_Items_Id.length === 0 && Number(tempSliderValue) === 0
        ? "Please specifiy the password length and select the type of passowrd"
        : checked_Items_Id.length === 0
        ? "Select at least one from type password "
        : "Specifiy the length  of passowrd";
  } else {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const symbol = "!@#$%^&*()[]";

    let i = 0;
    let radomIndex;
    let result = "";

    let if_item_slelected = "";

    let newArray = checked_Items_Id;

    for (i; i < tempSliderValue; i++) {
      radomIndex = Math.floor(Math.random() * newArray.length);
      // console.log(if_item_slelected, newArray[radomIndex], radomIndex);

      if (newArray[radomIndex] === "uppercase") {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
        if_item_slelected = newArray[radomIndex];
      } else if (newArray[radomIndex] === "lowercase") {
        result += characters
          .charAt(Math.floor(Math.random() * characters.length))
          .toLowerCase();
        if_item_slelected = newArray[radomIndex];
      } else if (newArray[radomIndex] === "numbers") {
        result += Math.floor(Math.random() * 10);
        if_item_slelected = newArray[radomIndex];
      } else if (newArray[radomIndex] === "symbols") {
        result += symbol.charAt(Math.floor(Math.random() * 10));
        if_item_slelected = newArray[radomIndex];
      }

      if (if_item_slelected === newArray[radomIndex]) {
        // console.log("Mathced");
        //to ensure that used every element checked
        newArray = newArray.filter((item, index) => index !== radomIndex);

        newArray = newArray.length === 0 ? checked_Items_Id.slice() : newArray;

        radomIndex = Math.floor(Math.random() * newArray.length);
        // console.log("this is new Array", newArray, radomIndex);
      }
    }

    passowrd.style.color = "#e6e5ea";
    passowrd.innerHTML = result;
    document.getElementById("btn-copy").style.cursor = "pointer";
    document.getElementById("btn-copy").onclick = copy;
    passowrd.style.cssText += `-webkit-user-select: auto; 
    -ms-user-select: auto;
    user-select: auto; `;
  }
}

function disapper() {
  document.querySelector(".message").style.display = "none";
}
