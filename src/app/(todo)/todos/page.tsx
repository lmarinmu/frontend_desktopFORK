/**This route only fetches TODO template GraphQL API code, for now */

"use client"

import { useState, type SetStateAction } from "react";
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

    const { data, error, isLoading } = api.todos.getTodo.useQuery(undefined, {
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

    if      (isLoading) return <h1>{"It's Loading"}</h1>
    if      (error)     return <h1>{"Error fetching TODOs"}</h1> 
    
    const todos = data?.todos?.todos ?? [];
    return (
        <main className="flex flex-col items-center w-full min-h-[100vh] bg-green-100 p-5 gap-5">
            <h1 className="text-3xl font-semibold">Hola</h1>
            <div className="flex flex-col items-center w-[60%] gap-10">
                <h2>Crea un nuevo TODO</h2>
                <form className="self-center w-[80%] py-4 px-5 bg-white border-2 border-black">
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
                                className="flex justify-center items-center border-2 border-black rounded-md text-center bg-gray-200 hover:bg-gray-300 hover:cursor-pointer p-1 h-[50%]"
                                onClick={() => sendMutations()}
                            >
                                Crear
                            </button>      
                        </li>
                    </ul>              
                </form>                  
                <h2>Lista de TODOS</h2>
                <div className="grid grid-cols-2 place-items-center w-[80%] p-10 gap-10 border-2 border-black bg-orange-100">
                    {todos?.map(todo => (
                        <div key={todo.id} className="self-center border-2 border-black bg-white w-full p-2">
                            <p className="font-semibold">{todo.text}</p>                                                
                            <p>{todo.user.name}</p>
                        </div>
                    ))}
                </div>              
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
        <li className="flex flex-col w-[20%]">
            <label htmlFor={props.labelId} className="font-semibold text-lg">{props.label}</label>
            <input 
                type="text" 
                id={props.labelId} 
                placeholder={props.placeholder}
                className="border-2 bg-gray-100 p-1 rounded-md"
                onChange={(e) => props.onChange(e.target.value)}
            />  
        </li>      
    )
}

export default Todos;