let kittttyImages = [
  "https://placecats.com/300/200",
  "https://placecats.com/neo/300/200",
  "https://placecats.com/millie/300/200",
  "https://placecats.com/millie_neo/300/200",
"https://placecats.com/neo_banana/300/200",
"https://placecats.com/neo_2/300/200",
  "https://placecats.com/bella/300/200",
  "https://placecats.com/poppy/300/200",
  "https://placecats.com/louie/300/200",
  ];

const imgs = document.getElementByTagName("img");

for (image of imgs) {
const index  = Math.floor(Math.random() * kittttyImages.length);
  image.src = kittttyImages[index];
}
