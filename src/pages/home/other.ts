
export function getURL(name:string) {
    const url = `https://datachart.500.com/${name}/history/`;
    const path = `newinc/history.php?start={}&end=`;
    return [url, path];
}

export async function getCurrentNumber(name:string) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [url, _] = getURL(name);
    const response = await fetch(`${url}history.shtml`);
    console.log(response)
}

