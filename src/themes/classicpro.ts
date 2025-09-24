import { createCanvas, type Image, loadImage } from "@napi-rs/canvas";
import { cropImage } from "cropify";

import { generateSvg } from "../functions/generateSvg.js";
import type { ClassicProOption } from "../typings/types.js";

const ClassicPro = async (option: ClassicProOption): Promise<Buffer> => {
    // defaulted: 3.6 to keep progress rect/circle at the start.
    // So that calculations happen correctly.
    if (!option.progress) option.progress = 3.6;
    if (!option.name) option.name = "Musicard";
    if (!option.author) option.author = "By Unburn";
    if (!option.startTime) option.startTime = "0:00";
    if (!option.endTime) option.endTime = "0:00";

    if (!option.progressBarColor) option.progressBarColor = "#5F2D00";
    if (!option.progressColor) option.progressColor = "#FF7A00";
    if (!option.backgroundColor) option.backgroundColor = "#070707";
    if (!option.nameColor) option.nameColor = "#FF7A00";
    if (!option.authorColor) option.authorColor = "#FFFFFF";
    if (!option.timeColor) option.timeColor = "#FFFFFF";
    if (!option.imageDarkness) option.imageDarkness = 10;

    const noImageSvg = generateSvg(`<svg width="837" height="837" viewBox="0 0 837 837" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="837" height="837" fill="${option.progressColor}"/>
    <path d="M419.324 635.912C406.035 635.912 394.658 631.18 385.195 621.717C375.732 612.254 371 600.878 371 587.589C371 574.3 375.732 562.923 385.195 553.46C394.658 543.997 406.035 539.265 419.324 539.265C432.613 539.265 443.989 543.997 453.452 553.46C462.915 562.923 467.647 574.3 467.647 587.589C467.647 600.878 462.915 612.254 453.452 621.717C443.989 631.18 432.613 635.912 419.324 635.912ZM371 490.941V201H467.647V490.941H371Z" fill="${option.backgroundColor}"/>
    </svg>`);

    if (!option.thumbnailImage) {
        option.thumbnailImage = noImageSvg;
    }

    let thumbnail: Image;

    try {
        thumbnail = await loadImage(
            await cropImage({
                imagePath: option.thumbnailImage,
                borderRadius: 50,
                width: 331,
                height: 331,
                cropCenter: true,
            }),
        );
    } catch {
        thumbnail = await loadImage(
            await cropImage({
                imagePath: noImageSvg,
                borderRadius: 50,
                width: 331,
                height: 331,
                cropCenter: true,
            }),
        );
    }

    if (option.progress < 3.6) {
        option.progress = 3.6;
    } else if (option.progress > 100) {
        option.progress = 100;
    }

    if (option.name.length > 12) {
        option.name = `${option.name.slice(0, 12)}...`;
    }

    if (option.author.length > 12) {
        option.author = `${option.author.slice(0, 12)}...`;
    }

    try {
        const canvas = createCanvas(1252, 708);
        const ctx = canvas.getContext("2d");

        if (option.backgroundImage) {
            try {
                const darknessSvg = generateSvg(`<svg width="1252" height="708" viewBox="0 0 1252 708" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="1252" height="708" rx="50" fill="#070707" fill-opacity="${option.imageDarkness / 100}"/>
                </svg>`);

                const image = await cropImage({
                    imagePath: option.backgroundImage,
                    width: 1252,
                    height: 708,
                    borderRadius: 50,
                    cropCenter: true,
                });

                ctx.drawImage(await loadImage(image), 0, 0);
                ctx.drawImage(await loadImage(darknessSvg), 0, 0);
            } catch (_error) {
                const backgroundSvg = generateSvg(`<svg width="1252" height="708" viewBox="0 0 1252 708" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="1252" height="708" rx="50" fill="${option.backgroundColor}"/>
                </svg>`);

                const background = await loadImage(backgroundSvg);

                ctx.drawImage(background, 0, 0);
            }
        } else {
            const backgroundSvg = generateSvg(`<svg width="1252" height="708" viewBox="0 0 1252 708" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="1252" height="708" rx="50" fill="${option.backgroundColor}"/>
            </svg>`);

            const background = await loadImage(backgroundSvg);

            ctx.drawImage(background, 0, 0);
        }

        ctx.drawImage(thumbnail, 87, 91);

        const completed = (1083 * option.progress) / 100;

        const progressBarSvg = generateSvg(`<svg width="1083" height="77" viewBox="0 0 1083 77" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect y="19" width="1083" height="40" rx="20" fill="${option.progressBarColor}"/>
        <rect y="19" width="${completed}" height="40" rx="20" fill="${option.progressColor}"/>
        <rect x="${completed - 40}" y="5" width="65" height="65" rx="35.5" fill="${option.progressColor}" stroke="${option.backgroundColor}" stroke-width="5"/>
        </svg>`);

        const progressBar = await loadImage(progressBarSvg);

        ctx.drawImage(progressBar, 87, 490);

        ctx.fillStyle = `${option.nameColor}`;
        ctx.font = "90px extrabold";
        ctx.fillText(option.name, 486, 240);

        ctx.fillStyle = `${option.authorColor}`;
        ctx.font = "60px semibold";
        ctx.fillText(option.author, 486, 330);

        ctx.fillStyle = `${option.timeColor}`;
        ctx.font = "40px semibold";
        ctx.fillText(option.startTime, 85, 630);

        ctx.fillStyle = `${option.timeColor}`;
        ctx.font = "40px semibold";
        ctx.fillText(option.endTime, 1070, 630);

        return canvas.toBuffer("image/png");
    } catch (e: any) {
        throw new Error(e.message);
    }
};

export { ClassicPro };
