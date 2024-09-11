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

// Feature 1, allow user to specify baseURL and API key

// Feature 2, allow user to specify a custom filename instead of default README.md

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
        "Explain the following text, explain what each file does, files are separated by the fileName with -------- underneath. Respond only in Markdown (.md) file formatted language.\n\n" +
        instructions;
      const completion = await openai.chat.completions.create({
        model: "llama2",
        messages: [{ role: "user", content: finalInfo }],
      });
      //console.log(finalInfo);
      //console.log(completion.choices[0].message.content);
      const mdContent = completion.choices[0].message.content;
      if (mdContent) {
        await writeMarkdown(mdContent);
      }
    }
  )
  .parse();

async function textContent(fileName: string, shortName: string) {
  try {
    console.log(`Reading file: ${shortName}`);
    const data = await readFile(fileName, "utf8");
    instructions += shortName + "\n--------\n\n" + data + "\n\n";
  } catch (err) {
    console.error("Error reading file:", err);
  }
}

async function writeMarkdown(data: string) {
  try {
    console.log(`Writing file: README.md`);
    const path = join(process.cwd(), "src", "README.md");
    await writeFile(path, data);
    console.log(`File written: README.md`);
  } catch (err) {
    console.error("Error writing file:", err);
  }
}
