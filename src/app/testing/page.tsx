import { getData } from '../lib/data';

export default async function Page(){
    const users = await getData();
    return (
        <div>
            {users.map((user: any) => (
                <div key={user.id}>
                    <h2>{user.user_data.firstName}</h2>
                    <p>{user.email}</p>
                    <img src={user.user_data.image} alt={`${user.user_data.firstName}'s avatar`} width={100} height={100} />
                </div>
            ))}
        </div>
    );
}