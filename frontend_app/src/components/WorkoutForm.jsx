import React, { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";
const WorkoutForm = () => {
  const {dispatch} = useWorkoutsContext();
  const {user}  = useAuthContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  const handleSubmit =  async (e)=>{
    e.preventDefault();
    if(!user){
      setError('You Must Be LOGEDIN')
      return 
    }
    const workout= {title,load, reps}

    const response = await fetch('http://localhost:8080/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`

      }
    })


    const json = await response.json(workout);

    if(!response.ok){
      setError(json.err)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setEmptyFields([])
      setError(null)
      setTitle('')
      setLoad('')
      setReps('')
      dispatch({type: 'CREATE_WORKOUT', payload: json})
    }
  }
  return (
    <form className="create" onSubmit={handleSubmit} >
      <h3>Add a New Workout</h3>
      <label htmlFor="">Excersize Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label htmlFor="">Load (in kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes('load') ? 'error' : ''}

      />

      <label htmlFor="">Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes('load') ? 'error' : ''}

      />
      {error && <div className="error">{error}</div>}

      <button>Add Workout</button>

    </form>
  );
};

export default WorkoutForm;
