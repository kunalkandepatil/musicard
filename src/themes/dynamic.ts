import { createCanvas, type Image, loadImage } from "@napi-rs/canvas";
import { cropImage } from "cropify";

import { generateSvg } from "../functions/generateSvg.js";
import type { DynamicOption } from "../typings/types.js";

const Dynamic = async (option: DynamicOption): Promise<Buffer> => {
    // defaulted: 0.618 to keep progress rect/circle at the start.
    // So that calculations happen correctly.
    if (!option.progress) option.progress = 0.618;
    if (!option.name) option.name = "Musicard";
    if (!option.author) option.author = "By Unburn";

    if (!option.progressBarColor) option.progressBarColor = "#5F2D00";
    if (!option.progressColor) option.progressColor = "#FF7A00";
    if (!option.backgroundColor) option.backgroundColor = "#070707";
    if (!option.nameColor) option.nameColor = "#FF7A00";
    if (!option.authorColor) option.authorColor = "#FFFFFF";
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
                borderRadius: 210,
                width: 400,
                height: 400,
                cropCenter: true,
            }),
        );
    } catch {
        thumbnail = await loadImage(
            await cropImage({
                imagePath: noImageSvg,
                borderRadius: 210,
                width: 400,
                height: 400,
                cropCenter: true,
            }),
        );
    }

    if (option.progress < 0.618) {
        option.progress = 0.618;
    } else if (option.progress >= 100) {
        option.progress = 99.999;
    }

    if (option.name.length > 20) {
        option.name = `${option.name.slice(0, 20)}...`;
    }

    if (option.author.length > 20) {
        option.author = `${option.author.slice(0, 20)}...`;
    }

    try {
        const canvas = createCanvas(2367, 520);
        const ctx = canvas.getContext("2d");

        if (option.backgroundImage) {
            try {
                const darknessSvg = generateSvg(`<svg width="2367" height="520" viewBox="0 0 2367 520" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H2367V520H0V0Z" fill="#070707" fill-opacity="${option.imageDarkness / 100}"/>
                </svg>`);

                const image = await cropImage({
                    imagePath: option.backgroundImage,
                    width: 2367,
                    height: 520,
                    borderRadius: 270,
                    cropCenter: true,
                });

                const darkImage = await cropImage({
                    imagePath: darknessSvg,
                    width: 2367,
                    height: 520,
                    borderRadius: 270,
                    cropCenter: true,
                });

                ctx.drawImage(await loadImage(image), 0, 0);
                ctx.drawImage(await loadImage(darkImage), 0, 0);
            } catch (_error) {
                const backgroundSvg = generateSvg(`<svg width="2367" height="520" viewBox="0 0 2367 520" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 260C0 116.406 116.406 0 260 0H2107C2250.59 0 2367 116.406 2367 260V260C2367 403.594 2250.59 520 2107 520H260C116.406 520 0 403.594 0 260V260Z" fill="${option.backgroundColor}"/>
                </svg>`);

                const background = await loadImage(backgroundSvg);

                ctx.drawImage(background, 0, 0);
            }
        } else {
            const backgroundSvg = generateSvg(`<svg width="2367" height="520" viewBox="0 0 2367 520" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 260C0 116.406 116.406 0 260 0H2107C2250.59 0 2367 116.406 2367 260V260C2367 403.594 2250.59 520 2107 520H260C116.406 520 0 403.594 0 260V260Z" fill="${option.backgroundColor}"/>
            </svg>`);

            const background = await loadImage(backgroundSvg);

            ctx.drawImage(background, 0, 0);
        }

        ctx.drawImage(thumbnail, 69, 61);

        ctx.beginPath();
        ctx.arc(2100, 260, 155, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.lineWidth = 35;
        ctx.strokeStyle = `${option.progressBarColor}`;
        ctx.stroke();

        const angle = (option.progress / 100) * Math.PI * 2;

        ctx.beginPath();
        ctx.arc(2100, 260, 155, -Math.PI / 2, -Math.PI / 2 + angle, false);
        ctx.lineWidth = 35;
        ctx.strokeStyle = option.progressColor;
        ctx.stroke();

        ctx.fillStyle = `${option.nameColor}`;
        ctx.font = "100px extrabold";
        ctx.fillText(option.name, 550, 240);

        ctx.fillStyle = `${option.authorColor}`;
        ctx.font = "70px semibold";
        ctx.fillText(option.author, 550, 350);

        return canvas.toBuffer("image/png");
    } catch (e: any) {
        throw new Error(e.message);
    }
};

export { Dynamic };
