// Importar las bibliotecas necesarias
const axios = require("axios");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
// Cargar las variables de entorno desde el archivo .env
dotenv.config();


// Leer la clave de API de OpenAI desde las variables de entorno
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Definir los encabezados de la solicitud HTTP para la API de OpenAI
const headers = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${OPENAI_API_KEY}`
};

// Función asíncrona para llamar a la API de OpenAI
async function callOpenAI(prompt) {
    try {
      // Configurar los parámetros de la API de OpenAI
      const data = {
        "prompt": `${prompt}`,
        // "prompt": `Dime 3 palabras relacionadas con: gomitas`,
        "max_tokens": 100,
        "n": 5,
        "stop": null,
        "temperature": 0.5,
        
        "top_p": 1
      };
  
      // Realizar una solicitud POST a la API de OpenAI y obtener la respuesta
      const response = await axios.post("https://api.openai.com/v1/engines/text-davinci-003/completions", data, { headers });
  
      // Devolver el texto generado por el modelo de lenguaje
      return response.data.choices[0].text;
    } catch (error) {
      // Imprimir errores al llamar a la API de OpenAI
      console.error("Error al llamar a la API de OpenAI:", error.response.data);
    }
  }
  

// Crear una instancia del servidor Express
const app = express();

// Permitir que el servidor maneje solicitudes con cuerpos JSON
app.use(express.json());

// Agregar el middleware de CORS
app.use(cors());

app.post("/texto", async (req, res) => {
  console.log(req.body.prompt)
  // Leer el "prompt" del cuerpo de la solicitud
  const prompt = 'hola, dame 3 palabras relacionadas a:'+req.body.prompt;

  // Llamar a la API de OpenAI con el "prompt" y obtener la respuesta
  const response = await callOpenAI(prompt);

  // Devolver la respuesta en formato JSON
  res.json({ response });
});


// Definir el puerto en el que escuchará el servidor
const PORT = process.env.PORT || 7000;

// Iniciar el servidor en el puerto definido
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
