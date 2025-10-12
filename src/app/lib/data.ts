export async function getData() {
    const fetchData = await fetch('http://localhost:5000/users');
    if (!fetchData.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await fetchData.json();
    console.log(data); 
    return data;
}

export async function getUserById(id: string) {
    const fetchData = await fetch(`http://localhost:5000/users/${id}`);
    if (!fetchData.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await fetchData.json();
    console.log(data);
    return data;
}

export async function getSellers(){
    const fetchData = await fetch('http://localhost:5000/sellers');
    if (!fetchData.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await fetchData.json();
    console.log(data);
    return data;
}
export async function getSellerById(id: string) {
    const fetchData = await fetch(`http://localhost:5000/sellers/${id}`);
    if (!fetchData.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await fetchData.json();
    console.log(data);
    return data;
}

export async function getUserStory(){
    const fetchData = await fetch('http://localhost:5000/userstory');
    if (!fetchData.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await fetchData.json();
    console.log(data);
    return data;
}