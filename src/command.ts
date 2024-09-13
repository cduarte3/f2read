import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import OpenAI from "openai";
import { readFile } from "fs/promises";
import { join, resolve } from "path";
import { writeFile, access } from "fs/promises";

const openai = new OpenAI({
  baseURL: "http://localhost:11434/v1",
  apiKey: "ollama", // Required for connection but unused
});

let instructions = "";
let writtenFile = "README.md";
let userModel = "gemma2:2b";

yargs(hideBin(process.argv))
  .version("0.1")
  .alias("version", "v")
  .alias("help", "h")
  .command(
    "new-read <fl...>",
    "Creates a new readMe file based on the argument(s) / file path(s) passed",
    (yargs) =>
      yargs.positional("fl", {
        description: "The path name(s) of the file(s) to be read",
        type: "string",
      }),
    async (argv) => {
      const files = Array.isArray(argv.fl) ? argv.fl : [argv.fl];
      console.log(`
        8888888888 .d8888b.  8888888b.                        888 
        888       d88P  Y88b 888   Y88b                       888 
        888              888 888    888                       888 
        8888888        .d88P 888   d88P .d88b.   8888b.   .d88888 
        888        .od888P"  8888888P" d8P  Y8b     "88b d88" 888 
        888       d88P"      888 T88b  88888888 .d888888 888  888 
        888       888"       888  T88b Y8b.     888  888 Y88b 888 
        888       888888888  888   T88b "Y8888  "Y888888  "Y88888 
                                                                                                                                
        `);
      for (const fileName of files) {
        const filePath = await checkFilePath(fileName);
        if (filePath) {
          await textContent(filePath, fileName);
        } else {
          console.error(`File not found: ${fileName}`);
          process.exit(1);
        }
      }
      const finalInfo =
        `Respond only in Markdown (.md) file formatted language, using proper #, ## header types, list types, other proper formatting, etc.\n
        Make sure your response is proper markdown syntax, with no errors.\n
        Examine the following text, figure out what each file specified does.\n
        Give a file name a # header with a ### header description underneath explaining what the file is and could possibly be used for.\n
        Then provide sections underneath the description explaining each function in the code as a numbered list of items.\n\n
        Code for each file is as follows:\n\n` + instructions;
      const completion = await openai.chat.completions.create({
        model: userModel,
        messages: [{ role: "user", content: finalInfo }],
      });
      const mdContent = completion.choices[0].message.content;
      if (mdContent) {
        1;
        await writeMarkdown(mdContent, writtenFile);
        console.log(`\n\n Contents of ${writtenFile}:\n\n ${mdContent} \n\n`);
      }
    }
  )
  .option("output", {
    alias: "o",
    description: "Specify a custom output file name instead of README.md",
    type: "string",
    coerce: (arg) => {
      writtenFile = arg;
      return arg;
    },
  })
  .option("model", {
    alias: "m",
    description: "Specify the model to use for the AI prompt",
    type: "string",
    coerce: (arg) => {
      userModel = arg;
      return arg;
    },
  })
  .parse();

// Function to allow reading from the files passed as arguments
async function textContent(tempName: string, shortName: string) {
  try {
    console.log(`Reading file: ${shortName}`);
    const data = await readFile(tempName, "utf8");
    instructions += shortName + "\n\n" + data + "\n\n";
  } catch (err) {
    console.error("Error reading file:", err);
    process.exit(1);
  }
}

// Function to allow writing to the file with the data of the prompt response
async function writeMarkdown(data: string, tempFile: string) {
  try {
    console.log(`Writing file: ${tempFile}`);
    const path = join(process.cwd(), "src", tempFile);
    await writeFile(path, data);
    console.log(`File written: ${tempFile}`);
  } catch (err) {
    console.error("Error writing file:", err);
    process.exit(1);
  }
}

// Function to check if the file path exists or if file is in src folder
async function checkFilePath(filePath: string) {
  if (!filePath.includes("/")) {
    const fullPath = join(process.cwd(), "src", filePath);
    return fullPath;
  } else {
    const fullPath = resolve(filePath);
    try {
      await access(fullPath);
      return fullPath;
    } catch (err) {
      console.error(`File not found: ${fullPath}`);
      return null;
    }
  }
}
