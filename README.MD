# OMORI YAML TRANSLATOR (It was originally made for Arabic!!!!)

Heavily inspired by [FunctionDJ's omori-translation-tool](https://github.com/FunctionDJ/omori-translation-tool).<br>
A simple YAML translator for OMORI. Still in beta, it contains lots of bugs. Feel free to open an issue or a pull request if needed.
Features:
- can use Google Translate to translate in your language (IS SET FOR ARABIC RN, IF YOU NEED TO CHANGE THE LANGUAGE, PLEASE REBUILD THE APP)
- can use Git commmands (doesn't work yet idkk why)


## HOW TO USE IT

1. Open the main exe file. **WHEN LAUNCHING IT FOR THE FIRST TIME, LET IT CONNECT TO THE NETWORK, OR ELSE IT CANT USE GIT!!!**
2. Wait for it to open properly [![image.png](https://i.postimg.cc/htkr6P7M/image.png)](https://postimg.cc/nX1BQx2Q)
3. Click on "Choose file" and select the YAML file you want to translate from `languages/en/`.[![image.png](https://i.postimg.cc/RZpDpBMZ/image.png)](https://postimg.cc/xXH5qBJw)
4. Open the file then click on the "Load" button.[![image.png](https://i.postimg.cc/zXGmxpnp/image.png)](https://postimg.cc/w3ZbvX4s)
5. You can edit the files at the right.[![image.png](https://i.postimg.cc/W3DKRbN4/image.png)](https://postimg.cc/47gwVGhC)
6. You can use the "Translate with Google Translate API" button. ***BE CAREFUL: IT'S GONNA TRANSLATE TO ARABIC***.[![image.png](https://i.postimg.cc/qBDRX1YX/image.png)](https://postimg.cc/3WpY3F3d)
7. Save using the "SAVE" button.[![image.png](https://i.postimg.cc/WpyZbp2v/image.png)](https://postimg.cc/14pXvQnC).
8. Git commands are **UN**available using the "Git Commands" button.[![image.png](https://i.postimg.cc/N0WMvF6J/image.png)](https://postimg.cc/nsGZvHwB)


## HOW TO BUILD IT

You need Node.js installed.

1. Clone the repo
2. Run `npm install` at the root of the cloned folder
3. Run `npm run package`
4. The files will be in `out/omori_ar_translator-xxx-xxx`

---

Project under MIT License.
