# example_get_contents.txt
### Description: This script reads text from different files using promises and returns the content of each file.

This code creates an asynchronous function called `getContents` that takes a list of file paths as input. The function then utilizes forEach to read each file and return its contents. 


1. **`async function getContents(filePaths) { ... }`**: 
   - Declares an asynchronous function named `getContents`. This is the function, we can use this function with other scripts or calls within the `node.js` environment

2. **`const readPromises = filePaths.map(async (filePath) => { ... });`**
   - Uses the `map()` function to create an array of promises for each file path in `filePaths`. This allows us to process files concurrently. 


3. **`try { ... } catch (err) { ... }`**: 
    - Implements error handling using a try-catch block: If there's an error while reading, it logs the error message to the console (`console.error` )  and returns `null`.

4.  **`const content = await readFile(filePath, 'utf-8');`**:
     - Reads the contents of each file using the built-in  `readFile` function along with a promise in async context (this can be used to run scripts outside of a single call)


    # explanation

   The `async function getContents`:  This snippet demonstrates asynchronous programming techniques. 
   In essence, this file provides a streamlined method for retrieving the textual content from specified files within your project using promises and error handling. Each file specified as an input to the function will be read in separate threads, improving overall performance when dealing with multiple files - especially in production settings!



 
