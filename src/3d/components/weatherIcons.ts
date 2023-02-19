import * as THREE from 'three'

const loader = new THREE.ObjectLoader();
let obj3ds: { [key: string]: any } = {
    group: new THREE.Group(),
    obj: {}
}

const dictionary: { [key: string]: any } = {
    'sun': '01',
    'sun_cloud': '02',
    'cloud': '03',
    'clouds': '04',
    'rain_cloud': '09',
    'rain_sun': '10',
    'thunder': '11',
    'snow': '13',
    'mist': '50'
}



loader.load("data/model.json", function (obj) {
    console.log(obj);

    const children = obj.children
    children.forEach(element => {

        //obj key = (dictionary value = element name) : value = element
        obj3ds.obj[dictionary[element.name]] = element
    })
    obj3ds.group = obj;
},

    // onProgress callback
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },

    // onError callback
    function (err) {
        console.error(err);
    }
)

export default obj3ds