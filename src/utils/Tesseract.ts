import * as tesseract from "tesseract.js";
import fs from "node:fs";
import path from "path";

export default class Tesseract {
  async convertImageToText(imagePath: string) {
    // Função para ler uma imagem JPG e converter em texto usando OCR
    try {
      const {
        data: { text },
      } = await tesseract.recognize(`src/upload/${imagePath}`, "por", {
        logger: (m) => console.log(m),
      });
      return text;
    } catch (error) {
      console.error("Houve um erro:", error);
      return false;
    }
  }

  async processImagesAndGenerateTranscription(filename: string) {
    const exist = fs.existsSync("src/upload/" + filename);
    switch (exist) {
      case true:
        let transcription = await this.convertImageToText(filename);
        if (!transcription) {
          return false;
        }

        await this.deleteImg("src/upload/" + filename);
        return transcription;
      case false:
        return false;
    }
  }

  async deleteImg(filepath:string) {
    fs.unlink(filepath, (err) => {
      if (err) {
        console.error("Erro ao excluir o arquivo:", err);
        return;
      }
      console.log("Arquivo excluído com sucesso.");
    });
  }
}
