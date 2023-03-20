function KIT_formatOMORIText(inputText) {
    // Define the operators
    const opWithoutParam = [
        "{", "}", "$", ".", "|", "!", ">", "<", "^", "g", "fr", "fb", "fi",
        "lson", "lsoff", "auto", "msgreset", "omo", "aub", "kel", "her",
        "bas", "he", "him", "his", "mar", "min", "art", "spxh", "mai", "swh",
        "smm", "jaw", "life", "kim", "cha", "ang", "mav", "van", "spg", "spd",
        "spb", "wis", "ber", "van", "nos", "bun", "lad", "dai", "neb", "hap",
        "eye", "ban", "shaw", "ren", "char", "wee", "hum", "gra",
        "che", "sna", "swe", "ems", "ash", "plu", "due", "cru", "ros", "kit",
        "sca", "tvg", "sha", "may", "sle", "spo", "che", "spr", "ban", "toa", "bun",
        "ma1", "ma2", "spe", "hot", "bud", "tom", "lea", "ora", "pro", "str",
        "top", "po", "lar", "fer", "gum", "gib", "cre", "duw", "duj", "duc", "pes",
        "smo", "gen", "lue", "pol", "sou", "tea", "st1", "st2", "st3", "dun", "lau",
        "squ", "dm1", "dm2", "dm3", "mm1", "mm2", "joc", "sp1", "sp2", "sp3", "ear",
        "sbf", "sxbf", "cap", "shb", "sxhb", "min", "key", "lb", "leclear", "who",
        "#", "'", "\"", " ", "itemget", "”", "“", "بوس"
    ]

    const opNumericParam = [
        "c", "i", "v", "p", "w", "px", "py", "oc", "ow", "fs", "af", "ac", "an", "pf",
        "pc", "pn", "nc", "ni", "nw", "na", "ns", "nt", "ii", "iw", "ia", "is", "it",
        "lsv", "lspi", "lspiv", "lspa", "lspav", "lsi", "en", "et", "msgposx",
        "msgposy", "msgevent", "msgactor", "msgparty", "msgenemy", "msgwidth",
        "msgrows", "autoevent", "autoactor", "autoparty", "autoenemy",
        "qi", "qw", "qa", "amhp", "ahp", "ahp%", "ammp", "amp", "amp%", "amtp",
        "atp", "atp%", "aatk", "adef", "amat", "amdf", "aagi", "aluk", "ahit",
        "aeva", "acri", "acev", "amev", "amrf", "acnt", "ahrg", "amrg", "atrg",
        "agrd", "arec", "apha", "amcr", "atcr", "apdr", "amdr", "afdr", "aexr",
        "emhp", "ehp", "ehp%", "emmp", "emp", "emp%", "emtp", "etp", "etp%",
        "eatk", "edef", "emat", "emdf", "eagi", "eluk", "ehit", "eeva", "ecri",
        "ecev", "emev", "emrf", "ecnt", "ehrg", "emrg", "etrg", "etgr", "egrd",
        "erec", "epha", "emcr", "etcr", "epdr", "emdr", "efdr", "eexr", "m",
        "sinv", "sinh", "quake", "rainbow", "com", "var", "vara", "vars",
        "varx", "vard", "varm", "dii", "bc"
    ]

    const opStringParam = [
        "n", "nc", "nr", "fn", "lsn", "nd", "ndc", "ndr", "nt", "ntc", "ntr",
        "compare"
    ]

    const css_colors = [
        "#fff",
        "#517fd8",
        "#c15e4f",
        "#57cf60",
        "#eac75d",
        "#f38b30",
        "#000",
        "#7c7c7c",
        "#fc0d1b",
        "#fc0d1b",
        "#fc0d1b",
        "#63f5ec",
        "#1f3a55",
        "#bf62df",
        "#1f3a55",
        "#000",
        "#000",
        "#1f3a55",
        "#000",
        "#1f3a55",
        "#000",
        "#1f3a55",
        "#000",
        "#1f3a55",
        "#1f3a55",
        "#000",
        "#1f3a55",
        "#000",
        "#1f3a55",
    ]

    if (!inputText) { return ""; }
    let outputText = "";
    let skipChar = 0;

    let spanStack = 0;
    let bold = false;
    let italic = false;

    for (let charIndex in inputText) {
        let char = inputText[charIndex];

        if (skipChar > 0) {
            skipChar--;
            continue;
        }
        if (char != "\\" || (char == "\\" && inputText[charIndex + 1] == "\\") || (char == "\\" && inputText[charIndex - 1] == "\\")) {
            outputText += char;
            continue;
        }

        let substring = inputText.slice(charIndex);

        for (let opNum of opNumericParam) {
            if (substring.toLowerCase().startsWith(opNum, 1)) {
                let numParam = parseInt(substring.slice(1 + opNum.length + 1, substring.indexOf(']', 1 + opNum.length)));
                skipChar = opNum.length + numParam.toString().length + 2;

                switch (opNum) {
                    case "c":
                        spanStack++;
                        outputText += `<span style="color:${css_colors[numParam]};">`;
                        break

                    case "i":
                        outputText += `<img src="i_icon_${numParam}.png" alt="Icon" style="height: 1em; width: auto;">`;
                        break;

                    case "sinv":
                        spanStack++;
                        outputText += `<span class="sinv${numParam}">`;
                        break;

                    case "sinh":
                        spanStack++;
                        outputText += `<span class="sinh${numParam}">`;
                        break;

                    case "rainbow":
                        spanStack++;
                        outputText += `<span class="rainbow${numParam}">`;
                        break;

                    case "quake":
                        spanStack++;
                        outputText += `<span class="quake${numParam}">`;
                        break;

                    default:
                        break;
                }
            }
        }

        for (let opStr of opStringParam) {
            if (substring.toLowerCase().startsWith(opStr, 1)) {
                let strParam = substring.slice(1 + opStr.length + 1, substring.indexOf('>', 1 + opStr.length));
                skipChar = opStr.length + strParam.length + 2;

                switch (opStr) {
                    case "fn":
                        spanStack++;
                        outputText += `<span style="font-family: ${strParam};">`;
                        break;

                    default:
                        break;
                }
            }
        }

        for (let opNone of opWithoutParam) {
            if (substring.toLowerCase().startsWith(opNone, 1)) {
                skipChar = opNone.length;
                switch (opNone) {
                    case "{":
                        spanStack++;
                        outputText += '<span style="font-size:larger;">';
                        break;

                    case "}":
                        spanStack++;
                        outputText += '<span style="font-size:smaller;">';
                        break;

                    case "fr":
                        for (spanStack > 0; spanStack--;) {
                            outputText += "</span>"
                        }
                        break;

                    case "fb":
                        if (!bold) {
                            outputText += "<b>";
                        } else {
                            outputText += "</b>"
                        }
                        bold = !bold;
                        break;

                    case "fi":
                        if (!italic) {
                            outputText += "<i>";
                        } else {
                            outputText += "</i>"
                        }
                        italic = !italic;
                        break;

                    default:
                        break;
                }
            }
        }
    }

    for (spanStack > 0; spanStack--;) {
        outputText += "</span>"
    }

    if (bold) {
        outputText += "</b>"
    }

    if (italic) {
        outputText += "</i>";
    }

    return outputText;
}