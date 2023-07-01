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

app.post("/exercice", async (req, res) => {
  console.log(req.body.prompt)
  // Leer el "prompt" del cuerpo de la solicitud
  const prompt = 'Dame unicamente el resultado del siguiente codigo:'+req.body.prompt;

  // Llamar a la API de OpenAI con el "prompt" y obtener la respuesta
  const response = await callOpenAI(prompt);

  // Devolver la respuesta en formato JSON
  res.json({ response });
});

app.post("/retro", async (req, res) => {
  console.log(req.body.prompt)
  // Leer el "prompt" del cuerpo de la solicitud
  const prompt = 'Explicame de manera detallada como mejorar este codigo:'+req.body.prompt;

  // Llamar a la API de OpenAI con el "prompt" y obtener la respuesta
  const response = await callOpenAI(prompt);

  // Devolver la respuesta en formato JSON
  res.json({ response });
});

app.post("/compilar", async (req, res) => {
  console.log(req.body.prompt)
  // Leer el "prompt" del cuerpo de la solicitud
  const prompt = 'Verifica  este codigo python si esta bien identado y es un codigo si se peude compilar, si no tiene sentido el codigo y  si no cumple con cualquiera de las dos, dime "400", si cumple dime "200", unicamente dime 200 o 400:'+req.body.prompt;

  // Llamar a la API de OpenAI con el "prompt" y obtener la respuesta
  const response = await callOpenAI(prompt);

  // Devolver la respuesta en formato JSON
  res.json({ response });
});


app.post("/porcentaje", async (req, res) => {
  console.log(req.body.prompt)
  // Leer el "prompt" del cuerpo de la solicitud
  const prompt = 'Unicamente dame de respuesta un porcentaje del 1-90 que tan optimo es el codigo en python, se estricto, no me pongas mas texto mas que el porcentaje: '+req.body.prompt;

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
