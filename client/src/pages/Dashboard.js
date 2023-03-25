export default function Dashboard() {
    const person = { 
        first: "First_Name", 
        last: "Last_Name", 
    }
    return (
        <div>
            <h1>Hello, {person.first}!</h1>
        </div>
    ); 
}