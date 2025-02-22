import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchGroups } from "./APIslice";

export default function Modifier() {
    const { id } = useParams(); // Group URL
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [groupId, setGroupId] = useState("");
    const [groupNom, setGroupNom] = useState("");

   
    useEffect(() => {
        axios.get(`http://localhost:3044/groups/${id}`)
            .then((response) => {
                setGroupId(response.data.groupId);
                setGroupNom(response.data.groupNom);
                
                
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, [id]);


    const updateGroup = () => {
        axios.put(`http://localhost:3044/groups/${id}`, { groupId, groupNom })
            .then(() => {
                alert("The group has been successfully updated.");
                dispatch(fetchGroups()); 
                navigate("/");
            })
            .catch((error) => {
                console.error("Error updating group:", error);
            });
            
    };

    return (
        <div>
             <h2>Modifier le groupe</h2>
            <input type="text" value={groupId} placeholder="ID" onChange={(e) => setGroupId(e.target.value)} />
            <input type="text" value={groupNom} placeholder="Group Name" onChange={(e) => setGroupNom(e.target.value)} />
            <button onClick={updateGroup}>Save</button>
            <button onClick={() => navigate("/")}>Reset</button>
        </div>
    );
}
