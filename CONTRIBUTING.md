<!-- omit in toc -->
# Contributing to F2Read

Thank you for being interested in the project and taking the time to contribute!

All types of contributions are encouraged and valued. See the [Table of Contents](#table-of-contents) for different ways to help and details about how this project handles them. Please make sure to read the relevant section before making your contribution. It will make it a lot easier for us maintainers and smooth out the experience for all involved. The community looks forward to your contributions. 🎉

> And if you like the project, but just don't have time to contribute, that's fine. There are other easy ways to support the project and show your appreciation, which we would also be very happy about:
> - Star the project
> - Tweet about it
> - Refer this project in your project's readme
> - Mention the project at local meetups and tell your friends/colleagues

<!-- omit in toc -->
## Table of Contents

- [I Have a Question](#i-have-a-question)
- [I Want To Contribute](#i-want-to-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Your First Code Contribution](#your-first-code-contribution)
  - [Improving The Documentation](#improving-the-documentation)
- [Styleguides](#styleguides)
  - [Commit Messages](#commit-messages)
- [Join The Project Team](#join-the-project-team)



## I Have a Question

> If you want to ask a question, we assume that you have read the available documentation in the README.md of the repo.

Before you ask a question, it is best to search for existing [Issues](https://github.com/cduarte3/f2read/issues) that might help you. In case you have found a suitable issue and still need clarification, you can write your question in this issue. It is also advisable to search the internet for answers first.

If you then still feel the need to ask a question and need clarification, we recommend the following:

- Open an [Issue](https://github.com/cduarte3/f2read/issues/new).
- Provide as much context as you can about what you're running into.
- Provide project and platform versions (nodejs, npm, etc), depending on what seems relevant.

We will then take care of the issue as soon as possible.

## I Want To Contribute

> ### Legal Notice
> When contributing to this project, you must agree that you have authored 100% of the content, that you have the necessary rights to the content and that the content you contribute may be provided under the project license.

### Reporting Bugs

#### Before Submitting a Bug Report

A good bug report shouldn't leave others needing to chase you up for more information. Therefore, we ask you to investigate carefully, collect information and describe the issue in detail in your report. Please complete the following steps in advance to help us fix any potential bug as fast as possible.

- Make sure that you are using the latest version.
- Determine if your bug is really a bug and not an error on your side e.g. using incompatible environment components/versions (Make sure that you have read the [documentation](). If you are looking for support, you might want to check [this section](#i-have-a-question)).
- To see if other users have experienced (and potentially already solved) the same issue you are having, check if there is not already a bug report existing for your bug or error in the [bug tracker](https://github.com/cduarte3/f2readissues?q=label%3Abug).
- Also make sure to search the internet (including Stack Overflow) to see if users outside of the GitHub community have discussed the issue.
- Collect information about the bug:
  - Stack trace (Traceback)
  - OS, Platform and Version (Windows, Linux, macOS, x86, ARM)
  - Version of the interpreter, compiler, SDK, runtime environment, package manager, depending on what seems relevant.
  - Possibly your input and the output
  - Can you reliably reproduce the issue? And can you also reproduce it with older versions?

#### How Do I Submit a Good Bug Report?

> You must never report security related issues, vulnerabilities or bugs including sensitive information to the issue tracker, or elsewhere in public. Instead sensitive bugs must be sent by email to <>.

We use GitHub issues to track bugs and errors. If you run into an issue with the project:

- Open an [Issue](https://github.com/cduarte3/f2read/issues/new). (Since we can't be sure at this point whether it is a bug or not, we ask you not to talk about a bug yet and not to label the issue.)
- Explain the behavior you would expect and the actual behavior.
- Please provide as much context as possible and describe the *reproduction steps* that someone else can follow to recreate the issue on their own. This usually includes your code. For good bug reports you should isolate the problem and create a reduced test case.
- Provide the information you collected in the previous section.

Once it's filed:

- The project team will label the issue accordingly.
- A team member will try to reproduce the issue with your provided steps. If there are no reproduction steps or no obvious way to reproduce the issue, the team will ask you for those steps and mark the issue as `needs-repro`. Bugs with the `needs-repro` tag will not be addressed until they are reproduced.
- If the team is able to reproduce the issue, it will be marked `needs-fix`, as well as possibly other tags (such as `critical`), and the issue will be left to be [implemented by someone](#your-first-code-contribution).


### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for F2Read, **including completely new features and minor improvements to existing functionality**. Following these guidelines will help maintainers and the community to understand your suggestion and find related suggestions.

#### Before Submitting an Enhancement

- Make sure that you are using the latest version.
- Read the README.md of the repo carefully and find out if the functionality is already covered, maybe by an individual configuration.
- Perform a [search](https://github.com/cduarte3/f2read/issues) to see if the enhancement has already been suggested. If it has, add a comment to the existing issue instead of opening a new one.
- Find out whether your idea fits with the scope and aims of the project. It's up to you to make a strong case to convince the project's developers of the merits of this feature. Keep in mind that we want features that will be useful to the majority of our users and not just a small subset. If you're just targeting a minority of users, consider writing an add-on/plugin library.


#### How Do I Submit a Good Enhancement Suggestion?

Enhancement suggestions are tracked as [GitHub issues](https://github.com/cduarte3/f2read/issues).

- Use a **clear and descriptive title** for the issue to identify the suggestion.
- Provide a **step-by-step description of the suggested enhancement** in as many details as possible.
- **Describe the current behavior** and **explain which behavior you expected to see instead** and why. At this point you can also tell which alternatives do not work for you.
- You may want to **include screenshots and animated GIFs** which help you demonstrate the steps or point out the part which the suggestion is related to. You can use [this tool](https://www.cockos.com/licecap/) to record GIFs on macOS and Windows, and [this tool](https://github.com/colinkeenan/silentcast) or [this tool](https://github.com/GNOME/byzanz) on Linux. <!-- this should only be included if the project has a GUI -->
- **Explain why this enhancement would be useful** to most F2Read users. You may also want to point out the other projects that solved it better and which could serve as inspiration.

## Formatting, and Lint Scripts
### Lint:

>- bun run lint
>
> Using this command will check for linter errors within the src/command.ts file which holds the main logic.

### Prettier:

>- bun run format
>
> Using this command will use the prettier formatter against the index.ts file and the src/command.ts file which holds the main logic. Make sure to format code before committing.

## Formatting on Save
Step 1:
- Install Prettier formatter extension on VSCode

Step 2:
- Click file, preferences, then follow below
- ![prettier settings code](https://github.com/cduarte3/f2read/blob/main/images/prettier.png?raw=true)

- To open settings.json, type **Ctrl + Shift + P** and search **settings.json**.
- Click 'Preferences: Open User **Settings** (**JSON**)'

## Linting live and on save
Step 1:
- install ESLint extension for VSCode

Step 2:
- Open settings.json, type **Ctrl + Shift + P** and search **settings.json**.
- Click 'Preferences: Open User **Settings** (**JSON**)'

Step 3:
- Add the below
- ![lint settings code](https://github.com/cduarte3/f2read/blob/main/images/lint.png?raw=true)


## Running the test suite

This tool uses JEST tests for testing, with Nock for mocking the AI instance. In order to test the tool, you must run the following commands:

(for all dependencies)
</br>```bun install``` 
### OR
(if you need individual modules)
</br>```bun add jest```
</br>```bun add nock``` 

Then, you may run the test suite with:
</br>```bun run test```

Which is defined in the package.json scripts:
</br>```"test": "jest --coverage"```

Running this command will display the test cases passed, the number of tests passed, as well as the coverage the tests are able to cover in the program.


## Auto running the suite with save

If you wish to run the test suite after saving the test file, you will need to install the Jest extension.

Information to the extension can be found here:

Name: Jest</br>
Id: Orta.vscode-jest</br>
Description: Use Facebook's Jest With Pleasure.</br>
Version: 6.4.0</br>
Publisher: Orta</br>
VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest


This extension allows for running of the test suite automatically on save, as well as providing a better interface for running the test suite.

## Running single tests

 In order to run single line tests, you must add the JEST extension listed above. Once the extension is added, open it and you can click the play button beside any of the tests in the suite to run them individually.


## Creating tests

When creating tests in the suite, make sure to not override any previous tests, unless the functions themselves have been changed in any way. In that case, update the test cases to reflect changes.

### Format

For the format of the test cases, functions can have their own sections listed in the header of the 'describe' and any tests cases regarding that function can be included with 'test' inside the described function. 

Here is an example of a test case for function writeMarkdown():

```
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
```