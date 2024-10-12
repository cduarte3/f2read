import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import OpenAI from "openai";
import { readFile } from "fs/promises";
import { join, resolve } from "path";
import { writeFile, access } from "fs/promises";
import { promises as fs } from "fs";
import toml from "toml";

const openai = new OpenAI({
  baseURL: "http://localhost:11434/v1",
  apiKey: "ollama", // Required for connection but unused
});

const defaultConfigFilePath = join(process.cwd(), "F2READ-config.toml");

async function loadConfigFile(filePath: string) {
  try {
    const tomlData = await readFile(filePath, "utf-8");
    const configOptions = toml.parse(tomlData);
    console.log(`Configuration loaded from ${filePath}`);
    return configOptions;
  } catch (err) {
    console.warn(`No configuration file found at ${filePath}. Continuing with default options.`);
    return {};
  }
}

function parseCommandLineArgs() {
  return yargs(hideBin(process.argv))
    .version("0.1")
    .alias("version", "v")
    .alias("help", "h")
    .command(
      "$0 <filePaths...>",
      "Creates a new README file based on the argument(s) / file path(s) passed",
      (yargs) =>
        yargs.positional("filePaths", {
          description: "The path name(s) of the file(s) to be read",
          type: "string",
        })
    )
    .option("output", {
      alias: "o",
      description: "Specify a custom output file name instead of README.md",
      type: "string",
    })
    .option("model", {
      alias: "m",
      description: "Specify the model to use for the AI prompt",
      type: "string",
    })
    .option("token-usage", {
      alias: "t",
      default: false,
      description: "Returns information about the number of tokens",
      type: "boolean",
    })
    .option("stream", {
      alias: "s",
      default: false,
      description: "Streams output to console as it is generated",
      type: "boolean",
    })
    .parse();
}

async function checkFilePath(filePath: string) {
  const fullPath = filePath.includes("src") ? resolve(filePath) : join(process.cwd(), "src", filePath);
  try {
    const stat = await fs.stat(fullPath);
    if (stat.isDirectory()) {
      return { path: fullPath, type: 1 };
    } else {
      await access(fullPath);
      return { path: fullPath, type: 0 };
    }
  } catch (err) {
    console.error(`File or directory not found: ${fullPath}`);
    return null;
  }
}

async function readFileContent(filePath: string) {
  try {
    console.log(`Reading file: ${filePath}`);
    return await readFile(filePath, "utf8");
  } catch (err) {
    console.error("Error reading file:", err);
    process.exit(1);
  }
}

async function writeMarkdownFile(content: string, filePath: string) {
  try {
    console.log(`Writing file: ${filePath}`);
    const fullPath = join(process.cwd(), "src", filePath);
    await writeFile(fullPath, content);
    console.log(`File written: ${filePath}`);
  } catch (err) {
    console.error("Error writing file:", err);
    process.exit(1);
  }
}

async function generateReadmeContent(filePaths: string[], options: any) {
  let instructions = "";

  for (const filePath of filePaths) {
    const fileCheck = await checkFilePath(filePath);
    if (fileCheck) {
      const { path, type } = fileCheck;
      if (type === 1) { // Folder or directory
        console.log("Opening folder:", filePath);
        const filesInFolder = await fs.readdir(path);
        for (const file of filesInFolder) {
          const fullPath = join(path, file);
          instructions += await readFileContent(fullPath);
        }
        console.log("Done searching:", filePath);
      } else if (type === 0) { // File name
        instructions += await readFileContent(path);
      }
    }
  }

  const finalPrompt =
    `Respond only in Markdown (.md) file formatted language, using proper #, ## header types, list types, other proper formatting, etc.\n
    Make sure your response is proper markdown syntax, with no errors.\n
    Examine the following text, figure out what each file specified does.\n
    Give a file name a # header with a ### header description underneath explaining what the file is and could possibly be used for.\n
    Then provide sections underneath the description explaining each function in the code as a numbered list of items.\n\n
    Code for each file is as follows:\n\n` + instructions;

  return finalPrompt;
}

async function getAICompletion(prompt: string, options: any) {
  if (options.stream) {
    let mdContent = "";
    const completion = await openai.chat.completions.create({
      model: options.model,
      messages: [{ role: "user", content: prompt }],
      stream: true,
    });
    console.log("Output to be written to:", options.output, "\n");
    for await (const chunk of completion) {
      const content = chunk.choices[0]?.delta?.content || "";
      process.stdout.write(content);
      mdContent += content;
    }
    return mdContent;
  } else {
    const completion = await openai.chat.completions.create({
      model: options.model,
      messages: [{ role: "user", content: prompt }],
    });
    return completion.choices[0].message.content;
  }
}

async function main() {
  const configOptions = await loadConfigFile(defaultConfigFilePath);
  const argv = parseCommandLineArgs();

  const options = {
    model: argv.model || configOptions.model || "gemma2:2b",
    output: argv.output || configOptions.output || "README.md",
    stream: argv.stream || configOptions.stream || false,
    tokenUsage: argv.tokenUsage || configOptions.tokenUsage || false,
  };

  const filePaths = Array.isArray(argv.filePaths) ? argv.filePaths : [argv.filePaths];
  const prompt = await generateReadmeContent(filePaths, options);
  const mdContent = await getAICompletion(prompt, options);

  if (mdContent) {
    await writeMarkdownFile(mdContent, options.output);
    console.log(`\n\nContents of ${options.output}:\n\n${mdContent}\n\n`);
  }

  if (options.tokenUsage) {
    const { prompt_tokens, completion_tokens, total_tokens } = completion.usage!;
    console.error(
      "Token Usage:",
      "\nPrompt Tokens:", prompt_tokens,
      "\nCompletion Tokens:", completion_tokens,
      "\nTotal tokens:", total_tokens
    );
  }
}

main().catch(err => {
  console.error("Error:", err);
  process.exit(1);
});