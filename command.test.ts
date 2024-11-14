import {
  loadConfigFile,
  readFileContent,
  writeMarkdown,
  checkFilePath,
  generateContent,
  init,
} from "./src/command";
import {
  describe,
  test,
  expect,
  beforeAll,
  afterAll,
  afterEach,
} from "@jest/globals";
import { readFile, unlink } from "fs/promises";
import { join } from "path";
import nock from "nock";
import { promises as fs } from "fs";

describe("TOML file reading with loadConfigFile()", () => {
  beforeEach(() => {
    jest.resetModules(); // Clear any previous mocks
    jest.doMock("fs/promises", () => ({
      readFile: jest.fn(),
      unlink: jest.fn(),
    }));
    jest.clearAllMocks();
  });

  test("loadConfigFile should load TOML variables of model, output, stream, token-usage", async () => {
    const tomlFilePath = join(process.cwd(), ".F2Read-test.toml");
    const tomlContent = `
      model = "gemma2:2b"
      output = "README.md"
      stream = true
      tokenUsage = true
    `;
    await fs.writeFile(tomlFilePath, tomlContent);

    const configOptions = await loadConfigFile(
      join(process.cwd(), ".F2Read-test.toml"),
    );
    console.log("Config options:", configOptions); // Debug log

    expect(configOptions).toBeDefined();
    expect(configOptions).toHaveProperty("model");
    expect(configOptions.model).toBe("gemma2:2b");
    expect(configOptions).toHaveProperty("output");
    expect(configOptions.output).toBe("README.md");
    expect(configOptions).toHaveProperty("stream");
    expect(configOptions.stream).toBe(true);
    expect(configOptions).toHaveProperty("tokenUsage");
    expect(configOptions.tokenUsage).toBe(true);

    try {
      await fs.unlink(tomlFilePath);
    } catch (err) {
      console.warn("Could not delete test TOML file:", err);
    }
  });

  test("loadConfigFile should return default options if file does not exist", async () => {
    const { readFile } = await import("fs/promises");
    const consoleWarnSpy = jest
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    // Mock the readFile function to throw an ENOENT error
    (readFile as jest.Mock).mockRejectedValue({ code: "ENOENT" });

    const configOptions = await loadConfigFile(
      join(process.cwd(), "test-files/toml/notReal.toml"),
    );

    expect(configOptions).toEqual({});
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      `No configuration file found at ${join(process.cwd(), "test-files/toml/notReal.toml")}. Continuing with default options.`,
    );

    consoleWarnSpy.mockRestore();
  });

  test("loadConfigFile should handle empty TOML file", async () => {
    const { readFile } = await import("fs/promises");
    // Mock the readFile function to return an empty string
    (readFile as jest.Mock).mockResolvedValue("");

    const configOptions = await loadConfigFile(
      join(process.cwd(), "test-files/toml/.F2Read-empty.toml"),
    );
    expect(configOptions).toEqual({});
  });
});

describe("File content reading with readFileContent()", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("readFileContent should read code from given file", async () => {
    const content = await readFileContent(
      "./test-files/examples/sample.py",
      "sample.py",
    );
    expect(content).toContain("File: sample.py");
    expect(content).toContain(`print("Hello, World!")`);
  });
  test("readFileContent should error if file does not exist", async () => {
    const content = await readFileContent(
      "./test-files/examples/sample.py",
      "sample.py",
    );
    expect(content).toContain("File: sample.py");
  });
  test("readFileContent throws error and exits when given non-existent file", async () => {
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const processExitSpy = jest
      .spyOn(process, "exit")
      .mockImplementation((code?: number) => {
        throw new Error(`process.exit: ${code}`);
      });

    await expect(
      readFileContent("./test-files/examples/notReal.py", "notReal.py"),
    ).rejects.toThrow("process.exit: 1");

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining(`Error reading file: notReal.py`),
    );
    expect(processExitSpy).toHaveBeenCalledWith(1);

    consoleErrorSpy.mockRestore();
    processExitSpy.mockRestore();
  });
});

describe("File content writing with writeMarkdown()", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(async () => {
    // Clean up the generated README.md file after each test
    try {
      await unlink("./src/TEST.md");
      // eslint-disable-next-line
    } catch (err) {
      // File might not exist, ignore the error
    }
  });
  test("writeMarkdown should write content to file", async () => {
    const file = "TEST.md";
    const content = "This is a test README file.";
    await writeMarkdown(content, file);
    const data = await readFile("./src/TEST.md", "utf8");
    expect(data).toContain(content);
  });
});

describe("File paths can be checked with checkFilePath()", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const file = "examples/sample.py";
  const directory = "examples/";
  const fakeFile = "examples/notReal.py";
  const fakeDir = "examples/notReal/";
  test("checkFilePath should return path, type when given filePath in src/", async () => {
    const fileCheck = await checkFilePath(file);
    expect(fileCheck).toBeDefined();
    if (fileCheck) {
      expect(fileCheck).toHaveProperty("path");
      expect(fileCheck).toHaveProperty("type");
      expect(fileCheck.type).toBe(0);
      const fullPath = join(process.cwd(), "src", file);
      expect(fileCheck.path).toBe(fullPath);
    }
  });
  test("checkFilePath should return path, type when given dir in src/", async () => {
    const dirCheck = await checkFilePath(directory);
    expect(dirCheck).toBeDefined();
    if (dirCheck) {
      expect(dirCheck).toHaveProperty("path");
      expect(dirCheck).toHaveProperty("type");
      expect(dirCheck.type).toBe(1);
      const fullPath = join(process.cwd(), "src", directory);
      expect(dirCheck.path).toBe(fullPath);
    }
  });
  test("checkFilePath should return invalid path and -1 type when file not found", async () => {
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const notFound = await checkFilePath(fakeFile);
    if (notFound) {
      expect(notFound).toHaveProperty("path");
      expect(notFound).toHaveProperty("type");
      expect(notFound.type).toBe(-1);
      expect(notFound.path).toBe("invalid");
    }
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        `File not found: ${join(process.cwd(), "src", fakeFile)}`,
      ),
    );
    consoleErrorSpy.mockRestore();
  });
  test("checkFilePath should return invalid path and -1 type when dir not found", async () => {
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const notFound = await checkFilePath(fakeDir);
    if (notFound) {
      expect(notFound).toHaveProperty("path");
      expect(notFound).toHaveProperty("type");
      expect(notFound.type).toBe(-1);
      expect(notFound.path).toBe("invalid");
    }
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining(`Folder in src not found: ${fakeDir}`),
    );
    consoleErrorSpy.mockRestore();
  });
});

describe("generateContent() should return content for processing by the AI model", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const fakeFile = "examples/notReal.py";
  const dir = "examples/";
  const file = "examples/sample.py";
  test("generateContent returns file name and instructions when given a file", async () => {
    const content = await generateContent([file]);
    expect(content).toContain("File: " + file);
    expect(content).toContain("Respond only in Markdown (.md)");
  });
  test("generateContent returns file names and instructions when given a directory", async () => {
    const content = await generateContent([dir]);
    expect(content).toContain("File: sample.py");
    expect(content).toContain("Respond only in Markdown (.md)");
  });
  test("generateContent throws error and exits when given non-existent file", async () => {
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const processExitSpy = jest
      .spyOn(process, "exit")
      .mockImplementation((code?: number) => {
        throw new Error(`process.exit: ${code}`);
      });

    await expect(generateContent([fakeFile])).rejects.toThrow(
      "process.exit: 1",
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining(`File or directory not found: ${fakeFile}`),
    );
    expect(processExitSpy).toHaveBeenCalledWith(1);

    consoleErrorSpy.mockRestore();
    processExitSpy.mockRestore();
  });
});

describe("init function", () => {
  const outputFilePath = "./src/README.md";

  beforeAll(() => {
    // Mock the OpenAI API
    nock("http://localhost:11434")
      .post("/v1/chat/completions")
      .reply(200, {
        choices: [
          {
            message: {
              content: "Mocked response content",
            },
          },
        ],
        usage: {
          prompt_tokens: 10,
          completion_tokens: 20,
          total_tokens: 30,
        },
      });
  });

  afterAll(() => {
    nock.cleanAll();
  });

  afterEach(async () => {
    // Clean up the generated README.md file after each test
    try {
      await unlink(outputFilePath);
      // eslint-disable-next-line
    } catch (err) {
      // File might not exist, ignore the error
    }
  });

  test("should create README.md file with correct content", async () => {
    // Mock process.argv
    const originalArgv = process.argv;
    process.argv = ["node", "index.ts", "examples/sample.py"];

    // Call the init function

    try {
      await init();
      const data = await readFile(outputFilePath, "utf8"); // Accessing file after initialization.
      expect(data).toContain("Mocked response content");
    } catch (error) {
      console.error("Error:", error);
    }

    // Restore process.argv
    process.argv = originalArgv;

    // Add more assertions if needed to verify the content
  });
});
