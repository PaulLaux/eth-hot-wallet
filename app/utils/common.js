/* simple timer to resolve after ms milliseconds */
export const timer = (ms) =>
    new Promise((resolve) => setTimeout(() => resolve('timer end'), ms));

