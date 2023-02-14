//validate search
async function inputValidate(input: HTMLInputElement["value"]) {
    let string = ''
    for (let i = 0; i < input.length; i++) {
        if(input.charAt(i) === ' '){
            string += '%20'
        } else {
            string += input.charAt(i)
        }
    }
    return string
}

//search request
async function getSearch(location: string) {
    const res = await fetch(`http://127.0.0.1:5000/search?name=${location}`);
    const data = await res.json();
    return data
}

async function search(input: HTMLInputElement["value"]) {
    const text = await inputValidate(input);
    return await getSearch(text)
}

export default search