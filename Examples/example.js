import { Bloom, GlobalFonts } from 'musicard';
import fs from 'node:fs';

(async () => {
    await initializeFonts();

    console.log(GlobalFonts)

    const img = await Bloom({
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

    fs.writeFileSync('Example.png', img);
    console.log('Wrote Example.png');
})();
