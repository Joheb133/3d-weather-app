//validate search
function inputValidate(input: HTMLInputElement["value"]) {
    let string = ''
    for (let i = 0; i < input.length; i++) {
        if (input.charAt(i) === ' ') {
            string += '%20'
        } else {
            string += input.charAt(i)
        }
    }
    return string
}

//search request
async function getSearch(location: string) {
    try {
        const res = await fetch(`http://127.0.0.1:5000/search?name=${location}`);
        const data = await res.json();
        return data
    } catch (error) {
        return { error: 'server error' }
    }
}

async function search(input: HTMLInputElement["value"]) {
    const text = inputValidate(input);
    return await getSearch(text)
}

export default search