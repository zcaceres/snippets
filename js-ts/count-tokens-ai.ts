import fs from "fs";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { MODEL_NAME } from "./agent-config";
import { Logger } from "tslog";
import cliProgress from "cli-progress";

const log = new Logger();

async function readMarkdownFiles(directory: string): Promise<string[]> {
  const files = await fs.promises.readdir(directory);
  return files.filter((file) => file.endsWith(".md"));
}

async function readFileContents(filePath: string): Promise<string> {
  return fs.promises.readFile(filePath, "utf8");
}

export async function getTokenCount(
  filePathOrDirectory: string,
): Promise<number> {
  const genAI = new GoogleGenerativeAI(
    process.env.GOOGLE_GENERATIVE_AI_API_KEY!,
  );

  const model = genAI.getGenerativeModel({
    model: MODEL_NAME,
  });

  const stats = await fs.promises.stat(filePathOrDirectory);
  let allContents = "";

  if (stats.isDirectory()) {
    const markdownFiles = await readMarkdownFiles(filePathOrDirectory);
    log.info(`Found ${markdownFiles.length} markdown files to process`);

    const progressBar = new cliProgress.SingleBar(
      {},
      cliProgress.Presets.shades_classic,
    );
    progressBar.start(markdownFiles.length, 0);

    for (const file of markdownFiles) {
      const filePath = path.join(filePathOrDirectory, file);
      const fileContents = await readFileContents(filePath);
      allContents += fileContents + "\n\n";
      log.info(`Read: ${file}`);
      progressBar.increment();
    }

    progressBar.stop();
  } else {
    allContents = await readFileContents(filePathOrDirectory);
    log.info(`Read: ${path.basename(filePathOrDirectory)}`);
  }

  log.info("Counting tokens...");
  const countResult = await model.countTokens(allContents);
  const totalTokens = countResult.totalTokens;

  return totalTokens;
}
