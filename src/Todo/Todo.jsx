import React, { useEffect, useState } from "react";
import "./Todo.css";
import {
 
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

import { fetchApi} from "../Controller/Controller.jsx";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CheckIcon from "@mui/icons-material/Check";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import AddBoxIcon from "@mui/icons-material/AddBox";
import NumberBox from "./SubTodo/NumberBox";
import Loader from "./SubTodo/Loaders/Loader";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const Todo = () => {

    //All defined useState hooks
  const [allTask, setAllTask] = useState(null);
  const [createTask, setCreateTask] = useState("");
  const [completed, setCompleted] = useState(null);
  const [Loading, setLoading] = useState(false);
  const[text,setText]=useState("")
  const [userFixedData, setUserFixedData] = useState(null);
  const [Dropdowndata, setDropdowndata] = useState(null);


  useEffect(() => {
    //Here we are fetching full List of tasks as soon as page loads
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(false);

    let myTasks = await fetchApi("GET", `https://dark-rose-monkey-coat.cyclic.app/TodoApp/task`);
    setUserFixedData(myTasks.Data)
    setAllTask(myTasks.Data);
    setDropdowndata(myTasks.Data);
   
    if(myTasks.message)
    {
      setText(`Oops :/ There is no task here, Let's start with your first
      Task ...`)
    }
   
    let CompletedCount = 0;
 //filtering out the tasks according to completed and uncompleted tasks
    if (myTasks.Data) {
      myTasks.Data.forEach((element) => {

        if (element.completed === true) {
          CompletedCount++;
        }

        setCompleted(CompletedCount);
        
        
// showing loader during api fetching time
        setLoading(false);
      });
    }
  };


//Creating Api function
  const CreatePayloadandsend = () => {
    let payload = {
      email: "yogeshx@gmail.com",
      task: createTask,
      completed: false,
    };

    fetchApi("POST", `https://dark-rose-monkey-coat.cyclic.app/TodoApp/task`, payload)
      .then(() => {
        alert("Task Created successfully");
        window.location.reload();
      })
      .catch(() => {
        alert("could not Created, please contact administrator");
      });
  };


  //updating the api function

  const Updateandsend = async (id) => {
    let result = await fetchApi(
      "GET",
      `https://dark-rose-monkey-coat.cyclic.app/TodoApp/task/${id}`
    );

  
    let payload;

    let message;
    if (result.data.completed === true) {
      message = "Task marked as uncompleted successfully";
      payload = {
        completed: false,
      };
    } else {
      message = "Task marked as completed successfully";
      payload = {
        completed: true,
      };
    }

    await fetchApi(
      "PUT",
      `https://dark-rose-monkey-coat.cyclic.app/TodoApp/task/update/${id}`,
      payload
    ).then(() => {
      alert(message);
    });


   
  };

  function searchJson(jsonData, searchTerm) {
    let results = [];

    for (let i = 0; i < jsonData.length; i++) {
      let object = jsonData[i];
      console.log(object)
      for (let property in object) {
        if (object.hasOwnProperty(property)) {
          if (
            typeof object[property] === "string" &&
            object[property].includes(searchTerm)
          ) {
            console.log(object)
            results.push(jsonData[i]);
            console.log(results)
            break;
          }
        }
      }
    }
    // console.log("reached")
    // console.log(usersdata)
    // console.log(results);
    setAllTask(results);
  }

  const filter=async (allTask,Myvalue)=>
  {
    let filteredData;

    if(Myvalue==="completed")
    {
      filteredData= await allTask.filter((data)=>
      {
         return data.completed===true;
          setAllTask(filteredData);
        
  
  
      })
      setAllTask(filteredData);

    }
    if(Myvalue==="uncompleted")
    {
      filteredData= await allTask.filter((data)=>
      {
         return data.completed===false;
  
  
      })
      setAllTask(filteredData);

    }
    if(Myvalue==="all")
    {
      setAllTask(allTask);

    }
   

    return

  

  }

  return (
    <>
    {/* showing loader if data has not came else not showing the loader  */}
      {Loading ? (
        <Loader />
      ) : (
        
        <div className="todo">
        <Paper
      component="form"
      className="Search-Paper"
    >
      <InputBase
        className='Search-InputBase'
        placeholder="Search..."
        onChange={(e) => {
                e.preventDefault();
                //  console.log( searchJson(userFixedData, e.target.value));
                console.log(e.target.value);
                searchJson(userFixedData, e.target.value);
              }}
        inputProps={{ 'aria-label': 'search...' }}
      />
      <IconButton type="button" className='Search-Icon' aria-label="search">
        <SearchIcon className='Search-Icon' />
      </IconButton>
    </Paper>
    <FormControl fullWidth className="mx-1" style={{scale:"0.7",width:"50%",}}>
  <InputLabel id="demo-simple-select-label">Filter by</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    // value="filter by"
    label="Filter by"
   
  >
    <MenuItem onClick={()=>{filter(Dropdowndata,"completed")}} >completed</MenuItem>
    <MenuItem onClick={()=>{filter(Dropdowndata,"uncompleted")}} >uncompleted</MenuItem>
    <MenuItem onClick={()=>{filter(Dropdowndata,"all")}} >All</MenuItem>
  </Select>
</FormControl>
          <div className="innerdiv" style={{ color: "#6256c0" }}>
            <div style={{ color: "#0092cd" }}>to</div>do
          </div>
          <div className="innerdiv">
            {" "}
            <div className="Textfield">
              <TextField
                value={createTask}
                onChange={(e) => {
                    // taking out the value from input field and setting it to usestate variable
                  setCreateTask(e.target.value);
                }}
                id="outlined-light"
                label="Add a new task"
                variant="outlined"
                style={{
                  backgroundColor: "#282c34",
                  width: "80%",
                  borderRadius: "0.5rem",
                }}
              />
              <AddBoxIcon
                className="mx-2"
                style={{ scale: "2", color: "rgb(98, 86, 192)" }}
                onClick={() => {
                    //Create task function
                  CreatePayloadandsend();
                }}
              />
            </div>
          </div>
          <div className="innerthirddiv">
         
            <div className="createTask my-2">
              <div style={{ color: "#0092cd", display: "flex" }}>
                Created tasks{" "}
                {allTask ? (
                  <NumberBox count={allTask.length} />
                ) : (
                  <NumberBox count={0} />
                )}{" "}
              </div>
              <div
                style={{ color: "#6256c0", display: "flex", flexWrap: "wrap" }}
              >
                Completed{" "}
                {completed ? (
                  <NumberBox count={completed} />
                ) : (
                  <NumberBox count={0} />
                )}
                of{" "}
                {allTask ? (
                  <NumberBox count={allTask.length} />
                ) : (
                  <NumberBox count={0} />
                )}
              </div>
            </div>
            <div className="Dynamictask">
            {/* showing data scatterd by map function  */}
            {console.log(allTask)}
              {allTask && allTask.length > 0 ? (
                allTask.map((data, index) => {
                  return (
                    <>
                      <div className="Dynamictaskinside my-2">
                        <div
                          className="mx-2"
                          style={{
                            textOverflow: "ellipsis",

                            overflow: "hidden",
                            display: "flex",
                          }}
                        >
                          {data.completed ? (
                            <CheckIcon className="mx-1" color="success" />
                          ) : (
                            <div className="mx-1"></div>
                          )}
                          {data.task.length > 50
                            ? `${data.task.substring(0, 25)}...`
                            : data.task}
                        </div>
                        <div style={{ display: "flex" }}>
                          <div>
                            {data.completed ? (
                              <CheckBoxIcon
                                color="success"
                                onClick={() => {
                                  Updateandsend(data._id).then(() => {
                                    window.location.reload();
                                  });
                                }}
                              />
                            ) : (
                              <CheckBoxOutlineBlankIcon
                                onClick={() => {
                                  Updateandsend(data._id).then(() => {
                                    window.location.reload();
                                  });
                                }}
                              />
                            )}
                          </div>
                          <div>
                            <DeleteForeverIcon
                              color="primary"
                              onClick={() =>
                                fetchApi(
                                  "DELETE",
                                  `https://dark-rose-monkey-coat.cyclic.app/TodoApp/task/delete/${data._id}`
                                )
                                  .then(() => {
                                    alert("Task deleted successfully");
                                    window.location.reload();
                                  })
                                  .catch(() => {
                                    alert(
                                      "could not delete, please contact administrator"
                                    );
                                  })
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })
              ) : (
                <div className="firstTask">
                  {text}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Todo;
