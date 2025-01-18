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
