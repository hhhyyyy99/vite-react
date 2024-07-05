import { minionsLottie,minionsStatic } from './minions';
/**
 * FIXME: 此处优化通过动态导入实现，但是因目录的问题导致无法识别到model，暂时定位不了问题，采用手动导入先实现功能
 * 思路，通过文件路径以及文件名，实现对应的key:value的形式 动态import
 */
const lottieImg = {
    ...minionsLottie,
}
const staticImg = {
    ...minionsStatic,
}
export function getLottieByName(name: string) {
    //@ts-ignore
    return {name,module:lottieImg[name]};
}
export function getStaticByName(name: string) {
    //@ts-ignore
    return staticImg[name];
}
export { lottieImg, staticImg };