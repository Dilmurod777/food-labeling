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

    time = Math.round(time);
    if (time == 0) return "now";

    return `${time} ${unit} ago`;
}

export function getTotalGrams(quantity: number, unit: number, waste: number){
    return parseFloat((quantity * unit * (100 - waste) / 100).toFixed(1))
}