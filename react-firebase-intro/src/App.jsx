import { useEffect, useState } from 'react'
import './App.css'
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from './firebase/config';

function App() {
    const [newName, setNewName] = useState("");
    const [newAge, setNewAge] = useState(0);

    const [users, setUsers] = useState([]);
    const usersCollectionRef = collection(db, "users");

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef)
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getUsers();
    });

    const createUser = async () => {
        await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) })
    }

    const updateUser = async (id, age) => {
        const userDoc = doc(db, "users", id);
        const newFields = { age: Number(age) + 1 };
        await updateDoc(userDoc, newFields);
    };

    const deleteUser = async (id) => {
        const userDoc = doc(db, "users", id)
        await deleteDoc(userDoc)
    }

    return (
        <>
            <input
                placeholder="Name..."
                onChange={(event) => {
                    setNewName(event.target.value);
                }}
            />
            <input
                type="number"
                placeholder="Age..."
                onChange={(event) => {
                    setNewAge(event.target.value);
                }}
            />

            <button onClick={createUser}> Create User</button>
            <div>{users.map((user) => {
                return (
                    <div key={user.id}>
                        <h3>Name: {user.name}</h3>
                        <h3>Age: {user.age}</h3>
                        <button
                            onClick={() => {
                                updateUser(user.id, user.age);
                            }}
                        >
                            {" "}
                            Increase Age
                        </button>
                        <button
                            onClick={() => {
                                deleteUser(user.id);
                            }}
                        >
                            {" "}
                            Delete User
                        </button>
                    </div>
                );
            })}</div>
        </>
    )
}

export default App
