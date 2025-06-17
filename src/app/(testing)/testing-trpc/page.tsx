/* eslint-disable @next/next/no-img-element */
/**This route is used for tRPC testing purposes */

"use client"

import { useState, useReducer, type SetStateAction } from "react";
import { api } from "~/trpc/react";

const Todos = () => {
        
    const [todoUserName, setTodoUserName] = useState("");
    const [todoText, setTodoText] = useState("");

    const inputs = [
        {label: "ID", labelId: "id", placeholder: "UserID", onChange: setTodoUserName},
        {label: "TODO", labelId: "todo", placeholder: "TODO", onChange: setTodoText},
    ];    

    const utils = api.useUtils();

    const mutation = api.todos.createTodo.useMutation({
        onSuccess: async () => {            
            await utils.todos.getTodo.invalidate();            
            await utils.todos.getTodo.refetch();            
        }
    });

    const { data: todosData, error: todosError, isLoading: todosIsLoading } = api.todos.getTodo.useQuery(undefined, {
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    });

    const { data: groupsData, error: groupsError, isLoading: groupsIsLoading } = api.groups.getGroups.useQuery(undefined, {
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    });    

    const sendMutations = async () => {
        try {
        const response = await mutation.mutateAsync({ text: todoText, userName: todoUserName });
        console.log(response.errors);
        setTodoUserName(""); setTodoText("");
        } catch (error) { alert(error) }
    };                
    
    const todos = todosData?.todos?.todos ?? [];    
    const groups = groupsData?.groups ?? [];

    return (
        <main className="flex flex-col items-center w-full min-h-[100vh] bg-[#111111] p-5 gap-5 text-white">
            <h1 className="text-3xl font-semibold text-white">Hola. Testing de tRPC</h1>
            <div className="flex flex-row justify-center w-full gap-10">
                <section className="flex flex-col items-center w-[40%] gap-10 border-2 rounded-md border-black p-2 py-10 bg-[#222222]">
                    {todosIsLoading  && <h1>{"Cargando TODOs"}</h1>}
                    {todosError      && <h1 className="text-red text-bold">{"Error fetching TODOs"}</h1> }
                    {!todosIsLoading && !todosError && (
                    <>
                        <h2>Crea un nuevo TODO</h2>
                        <form className="self-center w-[90%] py-4 px-5 bg-[#333333] border-2 border-black text-white rounded-md">
                            <ul className="flex flex-row justify-center gap-5">
                                {inputs.map(input => (
                                    <InputTODO
                                        key={input.labelId}
                                        label={input.label}
                                        labelId={input.labelId}
                                        placeholder={input.placeholder}
                                        onChange={input.onChange}
                                    />
                                ))}
                                <li className="flex flex-col justify-end w-[20%]">
                                    <button 
                                        type="button" 
                                        className="flex justify-center items-center border-2 border-black rounded-md text-center font-semibold bg-blue-300 hover:bg-gray-300 hover:cursor-pointer p-1 h-[50%]"
                                        onClick={() => sendMutations()}
                                    >
                                        Crear
                                    </button>      
                                </li>
                            </ul>              
                        </form>                  
                        <h2>Lista de TODOS</h2>
                        <div className="grid grid-cols-2 place-items-center w-[90%] px-5 gap-5 rounded-md">
                            {todos?.map(todo => (
                                <div key={todo.id} className="self-center rounded-md border-2 border-black bg-[#333333] w-full p-4 px-8">
                                    <p className="font-semibold text-white">{todo.text}</p>                                                
                                    <p className="text-white">{todo.user.name}</p>
                                </div>
                            ))}
                        </div>
                    </>
                    )}         
                </section>
                <section className="flex flex-col items-center justify-center flex-1 border-2 bg-[#222222] h-[100%] p-2 py-10 rounded-md border-2 border-black gap-5 p-5 py-10">
                    {groupsIsLoading  && <h1>{"Cargando Grupos"}</h1>}
                    {groupsError      && <h1 className="text-red text-bold">{"Error consultando Grupos"}</h1> }                    
                    {!groupsIsLoading && !groupsError && (
                        <>
                            <h2>Grupos</h2>                    
                            <CreateGroupComponent/>
                            <h3>Lista de Grupos</h3>
                            <div className="grid grid-cols-2 w-full gap-5">
                                {groups.map(grp => {
                                    return (
                                        <div
                                            key={grp.id}
                                            className="flex flex-col items-center justify-center rounded-md border-2 border-black bg-[#333333] p-5 gap-3"
                                        >
                                            <h4 className="font-semibold text-xl">{grp.name}</h4>
                                            <p className="text-white">{grp.description}</p>
                                            <img src={`data:image/${grp.profilePic.mimeType};base64,${grp.profilePic.data}`} alt={`${grp.name} pic`} />
                                        </div>)
                                    })
                                }
                            </div>                        
                        </>
                    )}

                </section>
            </div>
        </main>
    )
};

interface inputTODOProps {
    label: string,
    labelId: string,
    placeholder: string,
    onChange: (input: SetStateAction<string>) => void
}

const InputTODO = (props: inputTODOProps) => {
    return (
        <li className="flex flex-col w-[20%] text-white">
            <label htmlFor={props.labelId} className="font-semibold text-lg">{props.label}</label>
            <input 
                type="text" 
                id={props.labelId} 
                placeholder={props.placeholder}
                className="bg-[#222222] p-1 pl-5 rounded-md"
                onChange={(e) => props.onChange(e.target.value)}
            />  
        </li>      
    )
}

interface GroupToCreate {
    name?: string
    description?: string
    profilePic?: string
    isOpen?: boolean
};

type GroupAction = "name" | "description" | "profilePic" | "isOpen" | "reset";

interface ChangeGroupState {
    action: GroupAction
    newValue: string | boolean
}


const CreateGroupComponent = () => {
    
    const groupReducer = (state: GroupToCreate, action: ChangeGroupState) => {
        switch (action.action) {
            case "name":        return {...state, name: action.newValue as string};                
            case "description": return {...state, description: action.newValue as string};
            case "profilePic":  return {...state, profilePic: action.newValue as string};
            case "isOpen":      return {...state, isOpen: action.newValue as boolean}
            case "reset":       return {name: "", description: "", profilePic: "", isOpen: true}
        }
    };    
    
    const [groupState, groupsDispatch] = useReducer(groupReducer, {
        name: "",
        description: "",
        profilePic: "",
        isOpen: true
    });

    const utils = api.useUtils();
    
    const mutation = api.groups.createGroup.useMutation({
        onSuccess: async () => {            
            await utils.todos.getTodo.invalidate();            
            await utils.todos.getTodo.refetch();            
        }
    });    
    
    const sendMutations = async () => {
        try {            
            console.log(groupState);
            if(!groupState.name || groupState.name === "") {
                alert ("Nombre no dado");
                return;
            }
            if(!groupState.isOpen) {
                alert ("isOpen not provided");
                return;                
            }
            const response = await mutation.mutateAsync({
                name: groupState.name,
                description: groupState.description,
                profilePic: groupState.profilePic ? groupState.profilePic.split(",")[1] : groupState.profilePic,
                isOpen: groupState.isOpen,
            });

            if(response) {
                groupsDispatch({action: "reset", newValue: ""});
                console.log(response);
            }
            else alert("Algo salió mal");

        } catch (e) {
            alert(e)
        }
    };
    
    const groupInputs: {label: string, labelId: string, placeholder: string, type: string, action: GroupAction, width: string}[] = [
        {label: "Nombre", labelId: "name", placeholder: "Grupo", type: "text", action: "name", width: "w-[40%]"},
        {label: "Descripción", labelId: "description", placeholder: "Descripción", type: "text", action: "description", width: "w-[40%]"},        
    ]    
    
    return (
        <form className="flex flex-col items-center justify-center w-[85%] border-2 border-black rounded-md bg-[#333333] gap-5 p-5">
            <h3>Crea un Grupo</h3>                                                
            <div className="flex flex-row items-center justify-center rounded-md w-[85%] gap-2 py-2">
                {groupInputs.map(grp => {
                    return (
                    <div className="flex flex-col w-[40%] p-2 gap-2 rounded-md" key={grp.labelId}>
                        <label htmlFor={grp.labelId} className="font-semibold">
                            {grp.label}
                        </label>
                        <input                                        
                            id={grp.labelId}
                            type={grp.type}
                            placeholder={grp.placeholder}
                            className="text-white border-2 border-white rounded-md pl-3 py-1 w-[95%]"                                                
                            onChange={(e) => {
                                groupsDispatch({
                                action: grp.action,
                                newValue: e.target.value  
                                });
                            }}
                        />                                    
                    </div>
                    )
                })}                        
                <div className="flex flex-col items-center justify-center flex-1 h-[100%] gap-2">
                    <label htmlFor="isOpen" className="font-semibold">{"¿Abierto?"}</label>
                    <input 
                    type="checkbox" 
                    id="isOpen"
                    onChange={e =>  {                                        
                        groupsDispatch({
                            action: "isOpen",
                            newValue: e.target.checked
                        })
                    }}
                    />
                </div>                
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
                {(groupState.profilePic) ? <img src={groupState.profilePic} alt="Imagen Seleccionada" className="w-[60%]"/> : <span id="file-name" className="ml-2 text-gray-500">{"Ningún archivo seleccionado"}</span>}                
                <label htmlFor="profilePic" className="font-semibold cursor-pointer bg-blue-700 px-4 py-2 rounded-md mb-2">
                    {"Seleccionar Foto del grupo"}
                </label>                
                <input 
                    type="file"
                    accept="image/jpeg"
                    className="hidden"
                    id="profilePic"
                    onChange={(e) => {
                        const file = e.target.files ? e.target.files[0] : null;
                        if (file) {                            
                            const reader = new FileReader();
                            reader.onload = (event) => {
                                if(event.target) {
                                    groupsDispatch({
                                        action: "profilePic",
                                        newValue: event.target.result as string // Base64
                                    });
                                }
                            };
                            reader.readAsDataURL(file);
                        }
                    }}
                />      
            </div>          
            <button 
                className="bg-blue-500 text-white rounded-md px-5 py-2 hover:cursor-pointer hover:bg-blue-700" 
                type="button"
                onClick={async () => await sendMutations()}
            >
                {"Crear"}
            </button>            
        </form>    
    );
};

export default Todos;