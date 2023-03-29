# OMORI YAML TRANSLATOR (It was originally made for Arabic!!!!)

Heavily inspired by [FunctionDJ's omori-translation-tool](https://github.com/FunctionDJ/omori-translation-tool).<br>
A simple YAML translator for OMORI. Still in beta, it contains lots of bugs. Feel free to open an issue or a pull request if needed.
Features:
- can use Google Translate to translate in your language (IS SET FOR ARABIC RN, IF YOU NEED TO CHANGE THE LANGUAGE, PLEASE REBUILD THE APP)
- can use Git commmands


## HOW TO USE IT

1. Extract the folder contained inside of the ZIP into the root of your translation project.<br>![image](https://user-images.githubusercontent.com/79017433/228302086-6de734a3-f24f-43db-8b04-07e9159ae32d.png)
2. Inside the extracted folder, open the EXE file. **When it prompts you for access to the network, accept it or the Git Commands and the Google Translate API translations won't work.**<br>![image](https://user-images.githubusercontent.com/79017433/228302530-ee0854f5-25f9-41ae-982c-417e8204c96a.png)
3. When the program opens, select a file to edit from `languages/en` using "Choose a file".<br>![image](https://user-images.githubusercontent.com/79017433/228303038-a3e4416b-0a37-4833-bef8-09b5ae145fb2.png)
4. Click on load to start editing the file.<br>![image](https://user-images.githubusercontent.com/79017433/228303174-4cf2f6d0-a098-4d46-ab5f-351ae71a40cc.png)
5. On the right will be the translated text. Edit it using the textareas under each box in Translated Text. You can use the `Translate using Google Translate API` button to use Google Translate to translate. **DISCLAIMER: IT WILL TRANSLATE TO ARABIC, IF YOU WANT IT TRANSLATED TO ANOTHER LANGUAGE, EDIT THE `launch_translator.js` FILE AND RE-BUILD THE PROGRAM.** Also, the default language for the text boxes is Arabic, so they will be inverted and the names are going to be in Arabic, so you can use the "Toggle RTL/LTR" button to change that!<br>![image](https://user-images.githubusercontent.com/79017433/228304295-267fa657-b7cc-4306-b250-3e827542e83b.png)
6. You can use the Git Commands button to use git commands.<br>![image](https://user-images.githubusercontent.com/79017433/228304180-575bf2e5-eaf7-4dea-9a3b-cfa8db2232d2.png)




## HOW TO BUILD IT

You need Node.js installed.

1. Clone the repo
2. Run `npm install` at the root of the cloned folder
3. Run `npm run package`
4. The files will be in `out/omori_ar_translator-xxx-xxx`

---

Project under MIT License.
