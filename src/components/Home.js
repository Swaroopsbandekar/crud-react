import React, { useRef, useState } from 'react'

export default function Home() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [edit, setEdit] = useState(false);
    const [active, setActive] = useState(null);
    
    const data = useRef();

    const[users, setUsers] = useState([]);

    const addUser = (e) =>{
        e.preventDefault();
        localStorage.setItem("name", name)
        localStorage.setItem("email", email)
        localStorage.setItem("address", address)

        const user ={
            name,
            email,
            address
        }
        if (edit) {
            // Update User
            let copy = users;
            Object.assign(copy[active], user);
            setUsers([...copy])
            setEdit(false);
            setActive(null);
        } else{
            setUsers([...users, user]);
        }
        setName("");
        setEmail("");
        setAddress("");

    }

    const onEditClick =(index) =>{
        const user = users[index];

        setName(user.name);
        setEmail(user.email);
        setAddress(user.address);

        setActive(index)
        setEdit(true);
    }

    const onDeleteUser = (user) =>{
       if (window.confirm("Are you sure ? you want to delele !!")) {
        let copy = users.filter(item => item !== user);
        setUsers([...copy])
        
       }
    }

    return (
        <>
        <div className=' container col-xs-12 col-sm-10 col-md-8 col-lg-5 '>
            <form onSubmit={addUser}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name: </label>
                    <input ref={data} type="text" className="form-control"  value={name} required onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputemail" className="form-label">Email: </label>
                    <input  type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
                    value={email}  required onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputemail" className="form-label">Address: </label>
                    <input type="text" className="form-control" value={address} required onChange={(e) => setAddress(e.target.value)} />
                </div>

                <div className="d-grid">
                    <button type="submit" className="btn btn-success d-grid gap-2">{edit? 'Update': 'Add'}</button>
                </div>
            </form>

            <table className=' table my-5'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user, index ) => {
                        return(
                            <tr>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.address}</td>
                                <td>
                                    <button className='btn btn-info mx-1' onClick={() => onEditClick(index)}>Edit</button>
                                    <button className='btn btn-danger mx-1 my-1' onClick={() => onDeleteUser(user)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        </div>

        
        </>
    )
}
