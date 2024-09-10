export default function usage() {
  console.log(`# Usage
    This command line interface tool will help you to read a file and convert it into a readMe.md file explaining your code.
    
    ## Commands
    
    ### CLI Tool
    #### bun f2 new-read <fileName>
    --------
    Running new-read with a following path to a file name will pass in the file and use the tool.
    
    ### Version
    #### bun f2 --v OR bun f2 --version
    --------
    Will return the current version of the CLI tool being used.
    
    ### Help
    #### bun f2 --h OR bun f2 --help
    --------
    Will reload this message. Any future commands or changes will be reflected here above.
    
    ## Example
    --------
    bun f2 new-read ../src/main.py
    Produces a readMe.md file explaining the contents of main.py from the src folder`);
}
