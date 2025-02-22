import {useDispatch,useSelector} from 'react-redux';
import { Link,useParams } from "react-router-dom";
import { useEffect} from "react";
import axios from 'axios';
import { fetchGroups,setSearchTerm} from './APIslice';
export default function Liste(){

    const {nom} = useParams();
    let dispatch=useDispatch();
    useEffect(() => {
        dispatch(fetchGroups());
    }, [dispatch]);

    const deleteS = (groupNom, studentid) => {
        if (window.confirm("Voulez-vous vraiment supprimer cet étudiant ?")) {
            axios.get(`http://localhost:3044/groups`)
                .then(response => {
                    const groups = response.data;
                    const group = groups.find(g => g.groupNom === groupNom);
                    
                    if (group) {
                        group.students = group.students.filter(student => student.studentid !== studentid);
                        return axios.put(`http://localhost:3044/groups/${group.id}`, group)
                            .then(() => {
                                alert("Suppression réussie.");
                                dispatch(fetchGroups()); 
                            });
                        }
                })
                .catch(error => {
                    console.error("Erreur lors de la suppression :", error);
                   
                });
        }
    };
    
    
  
    let listGroup = useSelector(state => state.groups.data).find(group => group.groupNom === nom)?.students || []; // استخدام البيانات من APISlice
    const loading = useSelector(state => state.groups.loading);
    const error = useSelector(state => state.groups.error);
    
    const searchTerm = useSelector(state => state.groups.searchTerm);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    const lEtudiant = searchTerm
    ? listGroup.filter(student => student.nom.toLowerCase().includes(searchTerm.toLowerCase()))
    : listGroup;
  
    
    return(
        <div className='container'>
        Searsh By Name:
        
        <input type="text" value={searchTerm}  onChange={(e)=>dispatch(setSearchTerm(e.target.value))} />
      
        <h1>{nom} Students list</h1>
        <table>
            <thead>
                <tr><th>ID Student</th> <th>Name </th><th>Overall Average </th><th>Operation</th></tr>
            </thead>
            <tbody>
                {lEtudiant.map((student)=>
                <tr>
                    <th>{student.studentid}</th>
                    <th>{student.nom}</th>
                    <th>{student.moyenneGeneral}</th>
                    <th> <button onClick={() => deleteS(nom, student.studentid)}>Delete</button></th>

                </tr>
                )}
            </tbody>
        </table>
        <h1>Students Number : {listGroup.length}</h1>
        <Link to="/">Return Back</Link>

        </div>
    )
}