function isEmail(email) {
    
    const response = email.match(/[@]\w+([.]com)/i);

    return response !== null;

}

function isUrl(url) {

    const response = url.match(/^((http(s?)?):\/\/)?([wW]{3}\.)?[a-z0-9\-.]+\.[a-z]{2,}(\.[a-z]{2,})?\/?$/gi);

    return response !== null;
    
}

export const validator = {

    isEmail,
    isUrl

}
