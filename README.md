# F2Read / Usage
**This command line interface tool will help you to read 1 or multiple files and convert the contents into a readMe.md file explaining your code.**

<br>

![alt text](images\render.gif)

<br>

# Initial Setup
**To run the CLI interface, Ollama has to be installed to the system. This Tool runs off the Ollama provider, using any model of a user's choosing. By default the model will be set to Gemma2.**

## Steps

1. **Install the Ollama environment.**<br>
    - This can be done by visiting https://ollama.com and following the download instructions. <br><br> ![alt text](images\image.png)

<br><br>

2. **Select the model of your choosing.**<br>
    - Visit the models tab, or https://ollama.com/library, and choose a model that works for you. By default this tool uses Gemma2, you may choose that if you so wish. <br><br> ![alt text](images\image-1.png)

<br><br>

3. **Use the run command to start the model.**<br>
    - Open up a cmd prompt window and use the run command for the model of your choice. <br><br> **Example for Gemma2:** <br><br> ![alt text](images\image-3.png) <br><br> **Usage:** <br><br> ![alt text](images\image-4.png)

<br><br>

4. **Good to go.**<br>
    - Once these steps have been completed and the model is running, you may run the command line interface tool. The commands and usage guide will be listed below.

    - To check if your Ollama model is running, type the command ```ollama ps```. <br><br>**Example of usage:** <br><br>![alt text](images\image-5.png)

<br><br>

# Commands
**Listed below are the commands that can be used to interact with the F2Read tool.**<br><br>

## CLI Tool

### new-read <fl...>
- ```bun f2 new-read fileName```
> <br>Running new-read with a following path to a file name will pass in the file and use the tool.<br><br>

### --output filePath OR --o filePath
- ```bun f2 new-read fileName --output filePath.md```
> <br>Adding the --output or --o tag as an option in the CLI call will allow for renaming of the output markdown file to the specified filename. File must be specified with .md<br><br> If README.md is not an issue for a file name, DO NOT include this tag<br><br>

### --model modelName OR --m modelName
- ```bun f2 new-read fileName --model llama2```
> <br>Adding the --model or --m tag as an option in the CLI call will allow for specifying the model to be used for the prompt. Model must be a valid Ollama model to work.<br><br> If Gemma2 / Gemma2:2b is not an issue for a prompt model, DO NOT include this tag<br><br>

<br>

## Version
- ```bun f2 --v OR bun f2 --version```
> <br>Will return the current version of the CLI tool being used.<br><br>

<br>

## Help
- ```bun f2 --h OR bun f2 --help```
> <br>Will reload this message. Any future commands or changes will be reflected here above.<br><br>

<br>

## Example
- ```bun f2 new-read ../src/main.py```
> <br>Produces a readMe.md file explaining the contents of main.py from the src folder<br><br>