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

function replaceImage(image) {
  if (!(image instanceof HTMLImageElement)) return;

  const index = Math.floor(Math.random() * kittttyImages.length);
  const catUrl = kittttyImages[index];

  // YouTube commonly uses srcset, so clear it or it can override src.
  image.removeAttribute("srcset");
  image.removeAttribute("sizes");
  image.src = catUrl;
}

function replaceImages(root = document) {
  if (root instanceof HTMLImageElement) {
    replaceImage(root);
  }

  if (root.querySelectorAll) {
    root.querySelectorAll("img").forEach(replaceImage);
  }
}

replaceImages();

// YouTube creates thumbnails dynamically while you scroll and navigate.
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        replaceImages(node);
      }
    }
  }
});

observer.observe(document.documentElement, {
  childList: true,
  subtree: true
});
