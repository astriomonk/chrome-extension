const kittttyImages = [
  "https://placecats.com/300/200",
  "https://placecats.com/neo/300/200",
  "https://placecats.com/millie/300/200",
  "https://placecats.com/millie_neo/300/200",
  "https://placecats.com/neo_banana/300/200",
  "https://placecats.com/neo_2/300/200",
  "https://placecats.com/bella/300/200",
  "https://placecats.com/poppy/300/200",
  "https://placecats.com/louie/300/200"
];

function replaceImages() {
  const imgs = document.getElementsByTagName("img");

  for (const image of imgs) {
    if (image.dataset.kittttyReplaced === "true") continue;

    const index = Math.floor(Math.random() * kittttyImages.length);
    image.src = kittttyImages[index];
    image.dataset.kittttyReplaced = "true";
  }
}

replaceImages();

// YouTube loads and replaces images dynamically, so keep watching for new ones.
const observer = new MutationObserver(() => replaceImages());
observer.observe(document.documentElement, {
  childList: true,
  subtree: true
});
