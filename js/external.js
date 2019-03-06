
      var searchForm = document.querySelector(".search");
      var searchInput = searchForm.querySelector("[name=search]");

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

      try {
        storage = localStorage.getItem("name");
      } catch (err){
        isStorageSupport = false;
      }

      try {
        emailStorage = localStorage.getItem("email");
      } catch (err) {
        isStorageEmail = false;
      }

      link.addEventListener("click", function (evt) {
        evt.preventDefault();
        popup.classList.add("modal-show");
        if (storage && emailStorage) {
          modalName.value = storage;
          modalEmail.value = emailStorage;
          modalMessage.focus();
        } else {
          modalName.focus();
        }
      });

      close.addEventListener("click", function (evt) {
        evt.preventDefault();
        popup.classList.remove("modal-show");
      });

      form.addEventListener("submit", function (evt) {
        if (!modalName.value || !modalEmail.value || !modalMessage.value) {
          evt.preventDefault();
          if (!modalName.value) {
            console.log("Enter name");
            modalName.setAttribute("required", "");
          } else {modalName.removeAttribute("required");}
          if (!modalEmail.value) {
            console.log("Enter email");
            modalEmail.setAttribute("required", "");
          } else {modalEmail.removeAttribute("required");}
          if (!modalMessage.value) {
            console.log("Enter message");
            modalMessage.setAttribute("required", "");
          } else {modalMessage.removeAttribute("required");}
        }
          else {
          if (isStorageSupport && isStorageEmail){
          localStorage.setItem("name", modalName.value);
          localStorage.setItem("email", modalEmail.value);
        }
      }
      });

      window.addEventListener("keydown", function (evt) {
        if (evt.keyCode === 27) {
          if (popup.classList.contains("modal-show")) {
            evt.preventDefault();
            popup.classList.remove("modal-show");
          }
        }
      });