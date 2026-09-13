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
  "https://random.dog/6824eff1-85f8-4c16-b3ec-93a82b4f554d.jpeg",
  "https://random.dog/99922971-447f-4785-b5fe-db96f9938994.jpg",
  "https://random.dog/1f3a23fe-27b3-413c-b1bd-3cd18e2ef970.jpg",
  "https://i.ibb.co/ccfqvdXs/1000004135.jpg",
];

const catUrls = new Set(kittttyImages);

function isImage(element) {
  return element instanceof HTMLImageElement;
}

function giveCatImage(image) {
  if (!isImage(image)) return;

  let catUrl = image.dataset.kittttyCatUrl;

  if (!catUrl || !catUrls.has(catUrl)) {
    catUrl = kittttyImages[Math.floor(Math.random() * kittttyImages.length)];
    image.dataset.kittttyCatUrl = catUrl;
  }

  // YouTube can restore src/srcset after the page loads.
  image.removeAttribute("srcset");
  image.removeAttribute("sizes");
  image.removeAttribute("data-src");
  image.removeAttribute("data-lazy-src");

  if (image.src !== catUrl) {
    image.src = catUrl;
  }
}

function scan(root = document) {
  if (isImage(root)) giveCatImage(root);
  if (root.querySelectorAll) {
    root.querySelectorAll("img").forEach(giveCatImage);
  }
}

// Initial scan.
scan();

// YouTube constantly creates and changes thumbnail elements.
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === "childList") {
      for (const node of mutation.addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE) scan(node);
      }
    }

    if (mutation.type === "attributes" && isImage(mutation.target)) {
      const image = mutation.target;
      const catUrl = image.dataset.kittttyCatUrl;
      if (catUrl && image.src !== catUrl) {
        giveCatImage(image);
      }
    }
  }
});

observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ["src", "srcset", "sizes", "data-src", "data-lazy-src"]
});

// Extra protection for YouTube's SPA navigation and thumbnail updates.
setInterval(() => scan(), 1000);
