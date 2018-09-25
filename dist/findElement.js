const findElement = (selector) => {
    const container = document.querySelector(selector);
    if (container === null) {
        console.error(`Can't find container with selector ${selector}`);
    }
    return container;
};
export default findElement;
//# sourceMappingURL=findElement.js.map