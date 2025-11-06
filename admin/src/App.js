import React, {useEffect, useState} from 'react';
import { db } from './firebaseConfig';
import { collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";

function App() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { load(); }, []);
  async function load() {
    const snap = await getDocs(collection(db, 'remedies'));
    setRows(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    setLoading(false);
  }
  async function save(row) {
    const ref = doc(db, 'remedies', row.id);
    await setDoc(ref, {...row, updatedAt: new Date()});
    await load();
  }
  async function remove(id) {
    await deleteDoc(doc(db,'remedies',id));
    await load();
  }
  if(loading) return <div>Loading...</div>;
  return (
    <div style={{padding:20}}>
      <h1>Admin - Remedies</h1>
      <button onClick={load}>Refresh</button>
      <table border="1" cellPadding="6">
        <thead><tr><th>ID</th><th>Name</th><th>Category</th><th>Actions</th></tr></thead>
        <tbody>
          {rows.map(r => <tr key={r.id}>
            <td>{r.id}</td>
            <td>{r.name}</td>
            <td>{r.category}</td>
            <td>
              <button onClick={() => save({...r, name: r.name + ' (edited)'})}>Quick Edit</button>
              <button onClick={() => remove(r.id)}>Delete</button>
            </td>
          </tr>)}
        </tbody>
      </table>
    </div>
  );
}

export default App;
