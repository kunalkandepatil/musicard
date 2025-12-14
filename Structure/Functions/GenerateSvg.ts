export const generateSvg = (svgContent: string): string => {
  return `data:image/svg+xml;base64,${Buffer.from(svgContent).toString('base64')}`;
};

export default generateSvg;
