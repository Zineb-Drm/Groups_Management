import { useState ,useEffect} from "react";
import axios from "axios";
import "./index.css"
import {useDispatch,useSelector} from 'react-redux'
import { Link ,useNavigate } from 'react-router-dom';
import { fetchGroups } from "./APIslice";
export default function Group(){
    const navigate = useNavigate();
    const [GrId,setGrid]=useState();
    const [GrNom,setGrnom]=useState();
    let dispatch=useDispatch();
    useEffect(() => {
        dispatch(fetchGroups());
    }, [dispatch]);
    const ajoute=()=>{
        axios.post('http://localhost:3044/groups',{groupId:GrId,groupNom:GrNom})
        setGrid('');
        setGrnom('');
    };
    const modifier = (id) => {
        navigate(`/modifier/${id}`); // to modification Page with l'ID
      };
    
        

      
    const deleteG = (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            axios.delete(`http://localhost:3044/groups/${id}`)
                .then(() => {
                    alert("Deleted successfully.");
                    dispatch(fetchGroups());
                })
                .catch((error) => {
                    console.error("Error deleting:", error);
                    alert("Deletion failed. Check the server.");
                });
        }
    };
    
    
    let listGroup = useSelector(state => state.groups.data); // Using Data from APISlice
    const loading = useSelector(state => state.groups.loading);
    const error = useSelector(state => state.groups.error);

    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return(
        <>
        <input type="number" value={GrId} placeholder="ID"
        onChange={(e)=>setGrid(e.target.value)}/>
        <input type="text" value={GrNom}  placeholder="Group Name"
        onChange={(e)=>setGrnom(e.target.value)}/>
        <button onClick={ajoute}>Add</button>  
        <h1>liste des Groups</h1>
        <table>
            <thead>
                <tr><th>ID</th> <th>Name </th><th>Operation</th><th>Listes</th></tr>
            </thead>
            <tbody>
                {listGroup.map((grp,index)=>
                <tr>
                    <td>{grp.groupId}</td>
                    <td>{grp.groupNom}</td>
                    <td>
                        <button onClick={() => deleteG(grp.id)}>Delete</button>
                        <button onClick={() => modifier(grp.id)}>Update </button>
                    </td>
                    <td>
                        <Link to={"/liste/"+grp.groupNom} style={{ textDecoration: "none" }}>Liste of {grp.groupNom}</Link>
                    </td>
                </tr>
                )}
            </tbody>
        </table>
        
        </>
    )
}