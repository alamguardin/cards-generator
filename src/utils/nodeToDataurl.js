import * as htmlToImage from 'html-to-image';

export async function nodeToDataurl(node) {
    const png = htmlToImage.toPng(node)
    const base64 = await png.then(item => item)
    return base64
}