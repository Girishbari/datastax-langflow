const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const path = require("path");
const app = express();

app.use(cors());
app.use(express.json());
app.use(logger("dev"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
class LangflowClient {
  constructor(baseURL, applicationToken) {
    this.baseURL = baseURL;
    this.applicationToken = applicationToken;
  }

  async post(endpoint, body, headers = { "Content-Type": "application/json" }) {
    headers["Authorization"] = `Bearer ${this.applicationToken}`;
    headers["Content-Type"] = "application/json";
    const url = `${this.baseURL}${endpoint}`;

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    const responseMessage = await response.json();
    if (!response.ok) {
      throw new Error(
        `${response.status} ${response.statusText} - ${JSON.stringify(
          responseMessage
        )}`
      );
    }
    return responseMessage;
  }

  async initiateSession(
    flowId,
    langflowId,
    inputValue,
    inputType = "chat",
    outputType = "chat",
    stream = false,
    tweaks = {}
  ) {
    const endpoint = `/lf/${langflowId}/api/v1/run/${flowId}?stream=${stream}`;
    return this.post(endpoint, {
      input_value: inputValue,
      input_type: inputType,
      output_type: outputType,
      tweaks: tweaks,
    });
  }

  async runFlow(
    flowId,
    langflowId,
    inputValue,
    inputType = "chat",
    outputType = "chat",
    tweaks = {},
    stream = false
  ) {
    const initResponse = await this.initiateSession(
      flowId,
      langflowId,
      inputValue,
      inputType,
      outputType,
      stream,
      tweaks
    );

    if (
      stream &&
      initResponse?.outputs?.[0]?.outputs?.[0]?.artifacts?.stream_url
    ) {
      return {
        streamUrl: initResponse.outputs[0].outputs[0].artifacts.stream_url,
      };
    }

    return initResponse;
  }
}

const flowConfig = {
  flowId: "4b322804-e08c-4532-9607-4850211389c8",
  langflowId: "7ddcc233-6ea9-4010-b0fe-f5df3b95c713",
  applicationToken:
    process.env.APPLICATION_TOKEN ||
    `AstraCS:tuPokXmGfBFxZIYrqEWlYwej:61ae0216c29a4f99f696b9fdefa540d5e298a0a84add9a11d5fd1016369f5131`,
  baseURL: "https://api.langflow.astra.datastax.com",
};

const defaultTweaks = {
  "ChatInput-m9Hl7": {},
  "ParseData-71cjM": {},
  "Prompt-98kHg": {},
  "ChatOutput-oOhFL": {},
  "AstraDB-v73jq": {},
  "Google Generative AI Embeddings-BPcbj": {},
  "GroqModel-2iAgp": {},
};

const langflowClient = new LangflowClient(
  flowConfig.baseURL,
  flowConfig.applicationToken
);

app.post("/chat", async (req, res) => {
  try {
    const {
      message,
      inputType = "chat",
      outputType = "chat",
      stream = false,
    } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await langflowClient.runFlow(
      flowConfig.flowId,
      flowConfig.langflowId,
      message,
      inputType,
      outputType,
      defaultTweaks,
      stream
    );

    if (stream) {
      res.json({ streamUrl: response.streamUrl });
    } else {
      const output = response.outputs[0].outputs[0].outputs.message;
      res.json({ message: output.message.text });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
