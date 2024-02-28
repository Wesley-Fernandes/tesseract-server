import express, { Request, Response } from "express";
import Tesseract from "../utils/Tesseract";
import Multers from "../utils/Multers";
import Bardo from "../utils/Bardo";
import cors from "cors";

export default class Server {
  private readonly server = express();
  private readonly port = 4040;
  private readonly tesseract = new Tesseract();
  private multers = new Multers();
  private bardo = new Bardo();

  constructor() {
    this.server.use(express.json());
    this.server.use(
      cors({
        origin: "*",
      })
    );

    this.server.post(
      "/transcript",
      this.multers.upload.single("file"),
      async (req: Request, res: Response) => {
        if (!req.file) {
          return res.status(400).json({ message: "Arquivo não encontrado." });
        }

        const filename = req.file.originalname;

        const transcription =
          await this.tesseract.processImagesAndGenerateTranscription(filename);

        switch (!transcription) {
          case true:
            return res
              .status(400)
              .json({ message: "Caminho invalido ou erro na transcrição!" });
          case false:
            return res.status(200).json({ message: transcription });
        }
      }
    );

    this.server.post("/IA", async (req, res) => {
      const prompt = req.body.prompt;
      if (!prompt) {
        return res.status(400).json({ message: "Faltando transcrição." });
      }
      const context = await this.bardo.generateText({ prompt });
      return res.status(200).json({ message: context || { context } });
    });
  }

  execute() {
    this.server.listen(this.port, () => {
      console.log(`🤖 -> Servidor rodando na porta ${this.port}`);
    });
  }
}
