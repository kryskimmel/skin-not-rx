const randomInt = (obj) => {
    const min = 0
    const max = obj?.length
    return Math.floor(Math.random() * (max - min) + min)
};


export default randomInt;
