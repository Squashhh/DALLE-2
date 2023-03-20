export function formatNumbers(number: number) : string {
    if (number >= 1000000) return (number / 1000000).toFixed(1).replace(/\.0$/, "") + "m";
    if (number >= 1000) return (number / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    return number.toString();
    
//This function was taken from : https://github.com/Steellgold/GPT    
}