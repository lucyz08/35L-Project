const reducer = (prompts = [], action) => {
    switch(action.type) {
        case 'FETCH_PROMPTS':
            return action.payload;
        case 'CREATEPROMPT':
            return [...prompts, action.payload];
        default:
            return prompts;
    }
}

export default reducer;