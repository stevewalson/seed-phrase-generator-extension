const passphrase = document.querySelector(".passphrase"),
  generate_btn = document.querySelector(".generate"),
  copy_btn = document.querySelector(".copy_icon"),
  save_btn = document.querySelector(".save_icon"),
  toast = document.querySelector(".toast");

generate_btn.addEventListener("click", generate_passphrase);

function generate_passphrase() {
  passphrase.animate([{color: "#000"},{textShadow: "4px 0 0 #ffca0a ,  -4px 0 0 #00c8ff"},{textShadow: "4px 0 0 #00c8ff ,  -4px 0 0 #ffca0a"}],600);
  fetch("wordlist.txt")
    .then((res) => res.text())
    .then((data) => {
      let wordlist_to_array = data.split(" "),
        random_number = Math.floor(Math.random() * (30 - 20) + 20).toFixed(0),
        random_array_order = wordlist_to_array.sort(() => 0.5 - Math.random()),
        shuffle_random_result = random_array_order.slice(0, random_number),
        join_words = shuffle_random_result.join(" ").toString();
        passphrase.innerText = join_words;
        [copy_btn,save_btn].forEach(btn=> {
          btn.style.display = "block";
         })

        save_btn.addEventListener("click", () => {
          setTimeout(()=>{
            var blob = new Blob([`${join_words}`],{type: "text/plain"});
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = "passphrase.txt";
            link.click();
            link.remove();
            toast.innerText = "saved";
            toast.style.transform = "translate(50%,220%)";
            toast.style.opacity = "1";
             setTimeout(() => {
              toast.style.opacity = "0";
             }, 1000);
          },1000);
         });
         
    });
  
}

copy_btn.addEventListener("click", () => {
  navigator.clipboard.writeText(passphrase.innerText);
  toast.innerText = "Copied";
  toast.style.transform = "translate(50%,220%)";
  toast.style.opacity = "1";
  setTimeout(() => {
    toast.style.opacity = "0";
  }, 1000);
});
