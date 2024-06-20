function getRandNum(min, max) {
    const randNum = Math.round(Math.random() * (max - min) + min);
    return randNum;
}

export { getRandNum }