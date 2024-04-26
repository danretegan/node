import { Command } from "commander";

const program = new Command();

program
  .name("test")
  .description("programul meu")
  .version("0.0.1") // Avem si versiune :)
  .action(() => {
    console.log("Ai apelat test!");
  });

program
  .command("split")
  .description("Split a string into substrings and display as an array")
  .argument("<string>", "string to split")
  .option("--first", "display just the first substring")
  .option("-s, --separator <char>", "separator character", ",")
  .action((str, options) => {
    const limit = options.first ? 1 : undefined;
    console.log(str.split(options.separator, limit));
  });

program.parse();
