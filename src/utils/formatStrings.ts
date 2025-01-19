/**
 * Replace height / width attributes with a viewBox attribute in the SVG string
 * @param svg - The SVG string
 * @returns The formatted SVG string
 */
export const formatSVG = (svg: string) => {
    return svg.replace(
        /height="(\d+)" width="(\d+)"/,
        (_match, height, width) => `viewBox='0 0 ${width} ${height}'`
    );
}

/**
 * Format the price to the correct format
 * @param price - The price to format
 * @param currency - The currency to format the price in
 * @returns The formatted price
 */
export const formatPrice = (price: number, currency: string = "EUR") => {
    const symbols: Record<string, string> = {
        "EUR": "€",
        "USD": "$"
    }

    /** Alternative format for small prices
     * if (price < 1) {
     *     return `${Math.round(price * 100)} cent${symbols[currency]}`;
     * }
     */

    return `${price.toFixed(2).replace(".", ",")} ${symbols[currency]}`;
}

/**
 * Format the date and time
 * @param dateTime - The date string in ISO 8601 format
 * @returns The formatted date and time
 */
export const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleString('it-IT', options).replace(',', '');
}

/**
 * Return a placeholder image served by placehold.co
 * @param w - The width of the image
 * @param h - The height of the image
 * @returns The placeholder image
 */
export const placeholderImage = (w: number, h: number) => {
    return `https://placehold.co/${w}x${h}`;
}
