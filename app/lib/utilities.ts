export function overflowText(text: string, max_length = 30): string {
    if (text.length <= max_length) return text;

    return text.substring(0, max_length) + "...";
}

export function convertToHumanReadableTime(time: number): string {
    let unit = "seconds";

    time = time / 1000;

    if (time > 60) {
        time = time / 60;
        unit = "minute(s)";
    }

    if (time > 60) {
        time = time / 60;
        unit = "hour(s)";
    }

    if (time > 24) {
        time = time / 24;
        unit = "day(s)";
    }

    if (time > 30) {
        time = time / 30;
        unit = "month(s)";
    }

    if (time > 12) {
        time = time / 12;
        unit = "year(s)";
    }

    return `${Math.round(time)} ${unit}`;
}

export function debounce<T extends Function>(cb: T, wait = 20) {
    let h: NodeJS.Timeout;
    let callable = (...args: any) => {
        clearTimeout(h);
        h = setTimeout(() => cb(...args), wait);
    };
    return <T>(<any>callable);
}