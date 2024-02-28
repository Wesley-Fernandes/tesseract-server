import multer from "multer";

export default class Multers {
  readonly storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "src/upload/"); // Define o diretório de destino dos uploads
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Usa o nome original do arquivo
    },
  });
  readonly upload = multer({ storage: this.storage });

  constructor() {

  }
}
