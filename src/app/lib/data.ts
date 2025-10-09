export async function getData() {
    const fetchData = await fetch('http://localhost:5000/users');
    const data = await fetchData.json();
    console.log(data); 
    return data;

}