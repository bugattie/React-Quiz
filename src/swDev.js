export default function swDev() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      let swDev = `${process.env.PUBLIC_URL}/sw.js`;

      navigator.serviceWorker
        .register(swDev)
        .then((result) => {
          console.log(`swDev.js result: ${result}`);
        })
        .catch((err) => console.log(`Error swDev.js: ${err}`));
    });
  }
}
