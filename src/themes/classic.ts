import { createCanvas, loadImage, type Image } from "@napi-rs/canvas";
import { cropImage } from "cropify";

import { generateSvg } from "../functions/generateSvg.js";
import { registerFont } from "../functions/registerFont.js";
import type { ClassicOption } from "../typings/types.js";

registerFont("PlusJakartaSans-Bold.ttf", "bold");
registerFont("PlusJakartaSans-ExtraBold.ttf", "extrabold");
registerFont("PlusJakartaSans-ExtraLight.ttf", "extralight");
registerFont("PlusJakartaSans-Light.ttf", "light");
registerFont("PlusJakartaSans-Medium.ttf", "medium");
registerFont("PlusJakartaSans-Regular.ttf", "regular");
registerFont("PlusJakartaSans-SemiBold.ttf", "semibold");

const Classic = async (option: ClassicOption): Promise<Buffer> => {
    // defaulted: 3 to keep progress rect/circle at the start.
    // So that calculations happen correctly.
    if (!option.progress) option.progress = 3;
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
                width: 837,
                height: 837,
                cropCenter: true,
            }),
        );
    } catch {
        thumbnail = await loadImage(
            await cropImage({
                imagePath: noImageSvg,
                borderRadius: 50,
                width: 837,
                height: 837,
                cropCenter: true,
            }),
        );
    }

    if (option.progress < 3) {
        option.progress = 3;
    } else if (option.progress > 100) {
        option.progress = 100;
    }

    if (option.imageDarkness < 0) {
        option.imageDarkness = 0;
    } else if (option.imageDarkness > 100) {
        option.imageDarkness = 100;
    }

    if (option.name.length > 18) {
        option.name = `${option.name.slice(0, 18)}...`;
    }

    if (option.author.length > 18) {
        option.author = `${option.author.slice(0, 18)}...`;
    }

    try {
        const canvas = createCanvas(2458, 837);
        const ctx = canvas.getContext("2d");

        if (option.backgroundImage) {
            try {
                const darknessSvg = generateSvg(`<svg width="1568" height="837" viewBox="0 0 1568 837" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="1568" height="512" rx="50" fill="#070707" fill-opacity="${option.imageDarkness / 100}"/>
                <rect y="565" width="1568" height="272" rx="50" fill="#070707" fill-opacity="${option.imageDarkness / 100}"/>
                </svg>`);

                const image = await cropImage({
                    imagePath: option.backgroundImage,
                    width: 1568,
                    height: 837,
                    cropCenter: true,
                });

                await cropImage({
                    // @ts-ignore
                    imagePath: image,
                    x: 0,
                    y: -170,
                    width: 1568,
                    height: 512,
                    borderRadius: 50,
                }).then(async (x: any) => {
                    ctx.drawImage(await loadImage(x), 0, 0);
                });

                await cropImage({
                    // @ts-ignore
                    imagePath: image,
                    x: 0,
                    y: -845,
                    width: 1568,
                    height: 272,
                    borderRadius: 50,
                }).then(async (x: any) => {
                    ctx.drawImage(await loadImage(x), 0, 565);
                });

                ctx.drawImage(await loadImage(darknessSvg), 0, 0);
            } catch (_err) {
                const backgroundSvg = generateSvg(`<svg width="2458" height="837" viewBox="0 0 2458 837" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="1568" height="512" rx="50" fill="${option.backgroundColor}"/>
                <rect y="565" width="1568" height="272" rx="50" fill="${option.backgroundColor}"/>
                </svg>`);

                const background = await loadImage(backgroundSvg);

                ctx.drawImage(background, 0, 0);
            }
        } else {
            const backgroundSvg = generateSvg(`<svg width="2458" height="837" viewBox="0 0 2458 837" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="1568" height="512" rx="50" fill="${option.backgroundColor}"/>
    <rect y="565" width="1568" height="272" rx="50" fill="${option.backgroundColor}"/>
    </svg>`);

            const background = await loadImage(backgroundSvg);

            ctx.drawImage(background, 0, 0);
        }

        ctx.drawImage(thumbnail, 1621, 0);

        const completed = (1342 * option.progress) / 100;

        const progressBarSvg = generateSvg(`<svg width="1342" height="76" viewBox="0 0 1342 76" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect y="13" width="1342" height="47" rx="20" fill="${option.progressBarColor}"/>
        <rect y="13" width="${completed}" height="47" rx="20" fill="${option.progressColor}"/>
        <rect x="${completed - 40}" y="3" width="69.4422" height="69.4422" rx="34.7211" fill="${option.progressColor}" stroke="${option.backgroundColor}" stroke-width="6"/>
        </svg>`);

        const progressBar = await loadImage(progressBarSvg);

        ctx.drawImage(progressBar, 113, 635);

        ctx.fillStyle = `${option.nameColor}`;
        ctx.font = "124px extrabold";
        ctx.fillText(option.name, 113, 230);

        ctx.fillStyle = `${option.authorColor}`;
        ctx.font = "87px regular";
        ctx.fillText(option.author, 113, 370);

        ctx.fillStyle = `${option.timeColor}`;
        ctx.font = "50px semibold";
        ctx.fillText(option.startTime, 113, 768);

        ctx.fillStyle = `${option.timeColor}`;
        ctx.font = "50px semibold";
        ctx.fillText(option.endTime, 1332, 768);

        return canvas.toBuffer("image/png");
    } catch (e: any) {
        throw new Error(e.message);
    }
};

export { Classic };
