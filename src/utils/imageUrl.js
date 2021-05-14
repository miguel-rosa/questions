const imagesFolder = "http://localhost:3333/uploads"

module.exports = (image) => {
  return image ? `${imagesFolder}/${image}` : null
}