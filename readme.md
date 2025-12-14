<div align="center">

# 🎵 Musicard

Generate beautiful, stylized music card images with a variety of modern, customizable themes.

<a href="https://github.com/kunalkandepatil?tab=repositories"><b>Check our more</b></a> •
<a href="https://discord.gg/TvjrWtEuyP"><b>Join our Discord</b></a>

</div>

<div align="center">

[![NPM Version](https://img.shields.io/npm/v/musicard?style=flat-square&color=%23FF4C28)](https://www.npmjs.com/package/musicard)
[![NPM Downloads](https://img.shields.io/npm/dw/musicard?style=flat-square&color=%23FF4C28)](https://www.npmjs.com/package/musicard)
[![NPM License](https://img.shields.io/npm/l/musicard?style=flat-square&color=%23FF4C28)](https://github.com/unburn/musicard/blob/main/LICENSE)
[![GitHub Repo stars](https://img.shields.io/github/stars/unburn/musicard?style=flat-square&color=%23FF4C28)](https://github.com/unburn/musicard)

</div>

## ✨ Features

- **Multiple Themes:** Instantly switch between unique card layouts.
- **Customizable Styles:** Change colors, fonts, progress bars, and more for each theme.
- **Explicit Content Badge:** Show/hide explicit content indicator.
- **Flexible Inputs:** Accepts image buffers or URLs for album art.
- **Font Management:** Easily register and use custom fonts.

---

## 🎨 Themes


| Themes | Preview |
|:-------:|:-------|
| Bloom | <img src="https://raw.githubusercontent.com/kunalkandepatil/.github/refs/heads/main/assets/musicard/Bloom.png" width="500"> |
| Haze | <img src="https://raw.githubusercontent.com/kunalkandepatil/.github/refs/heads/main/assets/musicard/Haze.png" width="500"> |
| Melt | <img src="https://raw.githubusercontent.com/kunalkandepatil/.github/refs/heads/main/assets/musicard/Melt.png" width="500"> |
| Ease | <img src="https://raw.githubusercontent.com/kunalkandepatil/.github/refs/heads/main/assets/musicard/Ease.png" width="500"> |
| Drift | <img src="https://raw.githubusercontent.com/kunalkandepatil/.github/refs/heads/main/assets/musicard/Drift.png" width="500"> |
| Calm | <img src="https://raw.githubusercontent.com/kunalkandepatil/.github/refs/heads/main/assets/musicard/Calm.png" width="500"> |

---

## 🚀 Quick Start

```bash
npm install musicard
```

```js
import { initializeFonts, Bloom } from 'musicard';
import fs from 'node:fs';

// Display all available font names
import { GlobalFonts } from 'musicard';
console.log(GlobalFonts); // Shows all registered font names

(async () => {
    initializeFonts();

    const musicard = await Bloom({
        trackName: "Run It Up",
        artistName: "Hanumankind",
        albumArt: "https://lh3.googleusercontent.com/6DSrfLUE2JEPhwnF-IFuM5IP8rL8DgrpWPtqh0GvCkdT25Vl5lw3nEjLu-dZ3qIByuoEmU7MS3D8PakF=w544-h544-l90-rj",
        isExplicit: true,
        timeAdjust: {
            timeStart: "0:00",
            timeEnd: "2:54",
        },
        progressBar: 10,
        volumeBar: 70,
    });

    fs.writeFileSync('example.png', musicard);
    console.log('✅-> example.png');
})();
```

---

## 🖨️ List All Available Fonts

To see all font names currently registered and available for use:

```js
import { GlobalFonts } from 'musicard';
console.log(GlobalFonts); // Prints all registered font names
```


## 🤖 Usage with Discord Bot

Here's how you can use `musicard` in a Discord bot to generate and send a music card image:

```js
const { initializeFonts, Bloom } = require("musicard");
const fs = require("fs")

await initializeFonts();
const musicard = await Bloom({...})

...

return message.channel.send({
    files: [{
        attachment: musicard
    }]
})
```

---
## 🛠️ API Overview

Each theme exports a function with options for customization:

```ts
type ThemeOptions = {
	albumArt: string | Buffer;
	fallbackArt: string;
	artistName: string;
	trackName: string;
	progressBar?: number;
	volumeBar?: number; // Ease, Melt
    timeAdjust: { timeStart: string, timeEnd: string };
	styleConfig?: {
		artistStyle?: { textColor?: string; textItalic?: boolean; textGlow?: boolean };
		trackStyle?: { textColor?: string; textItalic?: boolean; textGlow?: boolean };
		timeStyle?: { textColor?: string; textItalic?: boolean };
		progressBarStyle?: { barColor: string; barColorDuo?: boolean };
		volumeBarStyle?: { barColor: string; barColorDuo?: boolean };
	};
	isExplicit?: boolean;
};
```

---

## 🖋️ Fonts
To use custom fonts, create a `Fonts` folder in your project's root directory and place your font files (e.g., `.ttf`, `.otf`) inside it.

Register and use custom fonts:
```js
import { registerFont } from 'musicard';
registerFont('MyFont.ttf', 'MyFont');
```

---

## 📄 License
MIT