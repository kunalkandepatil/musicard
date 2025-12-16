import { Bloom, Calm, Drift, Ease, GlobalFonts, Haze, initializeFonts, Melt, registerFont } from 'musicard';
import fs from 'node:fs';

(async () => {
    initializeFonts();

    const musicard = await Bloom({
        trackName: "KUPALA",
        artistName: "TRILTAPE & САМОВАРОЧКИ",
        albumArt: "https://lh3.googleusercontent.com/Mv00d0NzGt3xAbijI8HZ3-ZBtY6JktvMlRS0pS6tTik9iA5m5ni0eNJ818-IW9-0CLjaszLmE5N7wXWJ=w544-h544-l90-rj",
        timeAdjust: {
            timeStart: "0:00",
            timeEnd: "2:54",
        },
        styleConfig: {
            trackStyle: {
                textColor: "black",
            },
            artistStyle: {
                textColor: "black"
            },
            progressBarStyle: {
                barColor: "#000000",
                barColorDuo: true
            },
            timeStyle: {
                textColor: "black"
            },
            explicitStyle: {
                iconColor: "black",
                iconOpacity: 100
            }
        },
        progressBar: 30,
        backgroundColor: "white",
        isExplicit: true
    });

    fs.writeFileSync('example.png', musicard);
    console.log('✅-> example.png');
})();
