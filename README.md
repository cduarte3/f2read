# F2Read / Usage

### F2Read is now available as an NPM package!

**This command line interface tool will help you to read 1 or multiple files and convert the contents into a README.md file explaining your code.**

<br>

![alt text](https://github.com/cduarte3/f2read/blob/main/images/render.gif?raw=true)

<br>

# Initial Setup
**To run the CLI interface, Ollama has to be installed to the system. This Tool runs off the Ollama provider, using any model of a user's choosing. By default the model will be set to Gemma2.**

## Steps

1. **Install Bun.**<br>
    - This can be done by visiting https://bun.sh and following the download instructions. <br><br> ![alt text]![image](https://github.com/user-attachments/assets/8c5001b7-8705-43a4-8db2-6f00c8126cad)


<br><br>

2. **Install the Ollama environment.**<br>
    - This can be done by visiting https://ollama.com and following the download instructions. <br><br> ![alt text](https://github.com/cduarte3/f2read/blob/main/images/image.png?raw=true)

<br><br>

3. **Select the model of your choosing.**<br>
    - Visit the models tab, or https://ollama.com/library, and choose a model that works for you. By default this tool uses Gemma2, you may choose that if you so wish.
       - If you would like to use a different installed model, view the config setup at the end of this README for more info. <br><br> ![alt text](https://github.com/cduarte3/f2read/blob/main/images/image-1.png?raw=true)

<br><br>

4. **Run the Ollama application**<br>
    - Open your start menu or find the Ollama application in your system, and run it. Nothing will happen, but the app will run in the background. <br><br> ![image](https://github.com/user-attachments/assets/3480fb22-6ebe-4b62-b02b-4b61f889cdd4)


<br><br>

5. **Run the model in a CMD or Powershell Window (After Ollama app has been opened)**<br>
    - Open up a cmd prompt or Powershell window.
    -  Use the run command for the model of your choice. <br><br> **Example for Gemma2:** <br><br> ![alt text](https://github.com/cduarte3/f2read/blob/main/images/image-3.png?raw=true) <br><br> **Usage:** <br><br> ![alt text](https://github.com/cduarte3/f2read/blob/main/images/image-4.png?raw=true)

<br><br>

## Contributing / Source Code
6. **Pull the repo and get files ready.**<br>
    - Once Ollama model is set up, clone or fork the repo and place any of your files inside the src folder or in the root folder (file names will need to be called with a prefix of ./ if placed in the root).

<br><br>

## NPM CLI Usage
6. **Installing the NPM package and setting up project environment.**<br>
    - Once Ollama model is set up, run the following command: ```npm install -g f2read ```.
    - Create a src/ directory within your current project if not already present.
    - Place any usage files or directories within the src folder. 

<br><br>

## Good to go.
- Once these steps have been completed and the model is running, you may run the command line interface tool. The commands and usage guide will be listed below.
- To check if your Ollama model is running, type the command ```ollama ps```. <br><br>**Example of usage:** <br><br>![alt text](https://github.com/cduarte3/f2read/blob/main/images/image-5.png?raw=true)

### If you encounter a 'Cannot execute scripts' error:
- Open a Powershell window as administrator (Right-click and 'Run as administrator').
- Run the command ```Set-ExecutionPolicy RemoteSigned```.
- When prompted, type Y and press Enter to confirm the change.
- If it doesn't work, you may require a different process to allow for running scripts on your machine.

<br><br>

# Commands
**Listed below are the commands that can be used to interact with the F2Read tool either through NPM usage or Contributing through source code usage.**<br><br>

## Context

### NPM
- When using the npm package version, run the command ```f2read```.
- All uses of ```bun f2``` below are interchangeable with ```f2read```.

### Contributing/Source Code
- When contributing to the source code, and for testing, run the command ```bun f2```.

<br>

## Command Executions

### f2 <fl...>
- ```bun f2 fileName```
- NPM: ```f2read fileName```
> <br>Running f2 with a following path to a file name will pass in the file and use the tool.<br><br>
**NOTE: If you are passing in a file, for example main.py, the tool will assume it is inside the src folder. Typing a dir name before the filename will also work, for example: 'examples/sample.py' which exists at 'f2read/src/examples/sample.py'. If filename has no path, program will check in src folder by default.**<br><br>

### f2 <dir...>
- ```bun f2 dirName```
- NPM: ```f2read dirName```
> <br>Running f2 with a directory name will pass in the directory and read all its files.<br><br>
**NOTE: If you are passing in a directory, for example 'examples/', the tool will assume it is inside the src folder. Any dir name outside of src will not work, the program will check in src folder by default.**<br><br>

### --output filePath OR --o filePath
- ```bun f2 fileName --output filePath.md```
- NPM: ```f2read fileName --output filePath.md```
> <br>Adding the --output or --o tag as an option in the CLI call will allow for renaming of the output markdown file to the specified filename. File must be specified with .md<br><br> If README.md is not an issue for a file name, DO NOT include this tag<br><br>

### --model modelName OR --m modelName
- ```bun f2 fileName --model llama2```
- NPM: ```f2read fileName --model llama2```
> <br>Adding the --model or --m tag as an option in the CLI call will allow for specifying the model to be used for the prompt. Model must be a valid Ollama model to work.<br><br> If Gemma2 / Gemma2:2b is not an issue for a prompt model, DO NOT include this tag<br><br>

<br>

## Version
- ```bun f2 --v OR bun f2 --version```
- NPM: ```f2read --v OR f2read --version```
> <br>Will return the current version of the CLI tool being used.<br><br>

<br>

## Help
- ```bun f2 --h OR bun f2 --help```
- NPM: ```f2read --h OR f2read --help```
> <br>Will reload this message. Any future commands or changes will be reflected here above.<br><br>

<br>

## Example 1
- ```bun f2 main.py```
- NPM: ```f2read main.py```
> <br>Produces a README.md file explaining the contents of main.py from the src/ folder<br><br>

## Example 2
- ```bun f2 examples/sample.py```
- NPM: ```f2read examples/sample.py```
> <br>Produces a README.md file explaining the contents of sample.py from the src/exmples/ folder<br><br>

## Example 3
- ```bun f2 examples/```
- NPM: ```f2read examples/```
> <br>Produces a README.md file explaining the contents of each file found inside of the src/examples/ folder<br><br>

<br>

# Config

If you would like to have your commands loaded automatically through a configuration file, follow these steps:

 ## 1. Create a configuration file

Go to your home directory and create a new file in there called F2READ-config.toml. Format it something like this:

```
model = "llama3.2"
output = "NAME.md"
tokenUsage = false
stream = true
```

It can contain variables of only the above: model, output, tokenUsage, and stream. They can be written in any order.

## 2. Enjoy

The program should take these values from your configuration file and use them. This way you don't have to type them on the command line each time.
