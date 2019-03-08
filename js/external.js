var searchForm = document.querySelector(".search");
var searchInput = searchForm.querySelector("[name=search]");

var mapLink = document.querySelector(".map");
var mapPopup = document.querySelector(".modal-map");
var mapClose = mapPopup.querySelector(".modal-close");

var link = document.querySelector(".write-to-us-link");
var popup = document.querySelector(".write-to-us");
var close = document.querySelector(".write-to-us-modal-close");

var form = popup.querySelector("form");
var modalName = popup.querySelector("[name=name]");
var modalEmail = popup.querySelector("[name=email]");
var modalMessage = popup.querySelector("[name=message]");

var isStorageSupport = true;
var storage = "";
var isStorageEmail = true;
var emailStorage = "";


searchForm.addEventListener("submit", function (evt) {
  if (!searchInput.value) {
    evt.preventDefault();
  }
});

var closeModal = function (someModal) {
  someModal.classList.add("modal-show");

  window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      if (someModal.classList.contains("modal-show")) {
        evt.preventDefault();
        someModal.classList.remove("modal-show");
      }
    }
  });

  var closeSomeModal = someModal.querySelector(".modal-close");

  closeSomeModal.addEventListener("click", function (evt) {
    evt.preventDefault();
    someModal.classList.remove("modal-show");
  });
};

mapLink.addEventListener("click", function (evt) {
  evt.preventDefault();
  closeModal(mapPopup);
});

link.addEventListener("click", function (evt) {
  evt.preventDefault();
  closeModal(popup);
  if (storage && emailStorage) {
    modalName.value = storage;
    modalEmail.value = emailStorage;
    modalMessage.focus();
  } else {
    modalName.focus();
  }
});

try {
  storage = localStorage.getItem("name");
} catch (err) {
  isStorageSupport = false;
}

try {
  emailStorage = localStorage.getItem("email");
} catch (err) {
  isStorageEmail = false;
}

form.addEventListener("submit", function (evt) {
  if (!modalName.value || !modalEmail.value || !modalMessage.value) {
    evt.preventDefault();
    if (!modalName.value) {
      console.log("Enter name");
      modalName.setAttribute("required", "");
    } else {
      modalName.removeAttribute("required");
    }
    if (!modalEmail.value) {
      console.log("Enter email");
      modalEmail.setAttribute("required", "");
    } else {
      modalEmail.removeAttribute("required");
    }
    if (!modalMessage.value) {
      console.log("Enter message");
      modalMessage.setAttribute("required", "");
    } else {
      modalMessage.removeAttribute("required");
    }
  } else {
    if (isStorageSupport && isStorageEmail) {
      localStorage.setItem("name", modalName.value);
      localStorage.setItem("email", modalEmail.value);
    }
  }
});
