export const getRandomInt = (min: number, max: number, avoidIndexArray: number[]) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    let returnValue = Math.floor(Math.random() * (max - min)) + min;
    avoidIndexArray.map((index) => {
        if (index === returnValue)
            returnValue = getRandomInt(min, max, avoidIndexArray);
    });
    return returnValue;
}