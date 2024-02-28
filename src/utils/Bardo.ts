import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import { IA_CONFIG } from "../configuration/IA-config";

interface props {
  prompt: string;
}

export default class Bardo {
  readonly model: GenerativeModel;
  readonly config = new IA_CONFIG();
  readonly IA = new GoogleGenerativeAI(this.config.api);
  constructor() {
    this.model = this.IA.getGenerativeModel({
      model: this.config.mode,
      safetySettings: this.config.safetySettings,
    });
  }

  async generateText({ prompt }: props) {
    const configs = `
     1 - Você atuará como uma ferramenta que vai receber um texto e tentar interpretar o contexto.
     2 - Nunca responda perguntas do úsuario, apenas responda acerta do texto recebido.
     3 - Transforme sua resposta em portugues.
     ----------------------------------------
     ${prompt}

    `;

    //DEFINIR MENSAGENS

    console.log(prompt);
    try {
      const result = await this.model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      return text;
    } catch (error) {
      console.error("TEXTONLY|ERROR..::", error);
      return { Error: "Erro ao tentar receber resposta." };
    }
  }
}
