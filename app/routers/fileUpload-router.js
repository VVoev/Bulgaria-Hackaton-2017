const multerFilename = require("../utils/multer-filename-storage");

module.exports = function(server, fileUploadController) {
    server.get("/destinations/uploadFile", fileUploadController.showSingleFileUploadForm);
    server.post("/destinations/:id", multerFilename.single, fileUploadController.uploadSingleFile);
}