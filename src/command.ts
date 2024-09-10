import yargs from "yargs";
import { hideBin } from "yargs/helpers";
//import usage from "./usage";

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
    (argv) => {
      if (argv.fl) {
        const files = Array.isArray(argv.fl) ? argv.fl : [argv.fl];
        files.forEach((fileName) => {
          console.log(fileName);
        });
      }
      else {
        console.log("No file path(s) provided for the new-read command.");
      }
    }
  )
  .parse();
