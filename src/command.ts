import yargs from "yargs";
import { hideBin } from "yargs/helpers";
//import usage from "./usage";
import OpenAI from "openai";
import { readFile } from "fs/promises";
import { existsSync } from "fs";
import { join } from "path";
import { writeFile } from "fs/promises";

const openai = new OpenAI({
  baseURL: "http://localhost:11434/v1",
  apiKey: "ollama", // required but unused
});

let instructions = "";
let writtenFile = "README.md";
let userModel = "gemma2:2b";

// Feature 1, allow user to specify baseURL and API key

yargs(hideBin(process.argv))
  .version("0.1")
  .alias("version", "v")
  //.help(true)
  .alias("help", "h")
  /*.command(
    "help",
    "Display Usage and help information for the CLI tool",
    () => {},
    () => usage()
  ) */
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
      for (const fileName of files) {
        const filePath = join(process.cwd(), "src", fileName);
        if (existsSync(filePath)) {
          await textContent(filePath, fileName);
        } else {
          console.error(`File not found: ${filePath}`);
        }
      }
      const finalInfo =
        `Respond only in Markdown (.md) file formatted language, using proper #, ## header types, list types, other proper formatting, etc.\n
        Make sure your response is proper markdown syntax, with no errors.\n
        Examine the following text, figure out what each file specified does.\n
        Give a file name a # header with a ### header description underneath explaining what the file is and could possibly be used for.\n
        Then provide sections underneath the description explaining each function in the code as a numbered list of items.\n\n
        Code for each file is as follows:\n\n` +
        instructions;
      const completion = await openai.chat.completions.create({
        model: userModel,
        messages: [{ role: "user", content: finalInfo }],
      });
      //console.log(finalInfo);
      //console.log(completion.choices[0].message.content);
      const mdContent = completion.choices[0].message.content;
      if (mdContent) {1
        await writeMarkdown(mdContent, writtenFile);
      }
    }
  )
  // Feature 2, allow user to specify a custom filename instead of default README.md
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

async function textContent(tempName: string, shortName: string) {
  try {
    console.log(`Reading file: ${shortName}`);
    const data = await readFile(tempName, "utf8");
    instructions += shortName + "\n\n" + data + "\n\n";
  } catch (err) {
    console.error("Error reading file:", err);
  }
}

async function writeMarkdown(data: string, tempFile: string) {
  try {
    console.log(`Writing file: ${tempFile}`);
    const path = join(process.cwd(), "src", tempFile);
    await writeFile(path, data);
    console.log(`File written: ${tempFile}`);
  } catch (err) {
    console.error("Error writing file:", err);
  }
}
