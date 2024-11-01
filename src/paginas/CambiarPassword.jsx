import { useState } from "react"
import AdminNav from "../components/AdminNav"
import Alerta from "../components/Alerta"
import useAuth from "../hooks/useAuth"

const CambiarPassword = () => {

  const { guadarPassword } = useAuth()

  const [alerta, setAlerta] = useState({})
  const [password, setPassword] = useState({
    password: '',
    password_nuevo: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    if ( Object.values(password).some(campo => campo === '') ) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    if (password.password_nuevo.length < 6) {
      setAlerta({
        msg: 'El password debe tener minimo 6 caracteres',
        error: true
      })
    }

    const respuesta = await guadarPassword(password)
    setAlerta(respuesta)

  }

  const { msg } = alerta

  return (
    <>
        <AdminNav />

        <h2 className="font-black text-3xl text-center mt-10 ">Cambiar Password</h2>
        <p className="text-xl mt-5 mb-10 text-center">Modifica tu <span className="text-indigo-600 font-bold">Password aquí</span> </p>

        <div className="flex justify-center">
            <div className="w-full md:w-1/2 bg-white shadow  rounded-lg p-5">

                {msg && <Alerta alerta={alerta} />}

                <form onSubmit={handleSubmit} >

                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600 " htmlFor="password">Password Actual</label>
                        <input
                            className="border bg-gray-50 w-full p-2 mt-3 rounded-lg "
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Escribe tu Password actual"
                            onChange={ e => setPassword({
                              ...password, 
                              [e.target.name] : e.target.value
                            })}
                        />
                    </div>

                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600 " htmlFor="password_nuevo">Password Nuevo</label>
                        <input
                            className="border bg-gray-50 w-full p-2 mt-3 rounded-lg "
                            type="password"
                            name="password_nuevo"
                            id="password_nuevo"
                            placeholder="Escribe tu Nuevo Password"
                            onChange={ e => setPassword({
                              ...password, 
                              [e.target.name] : e.target.value
                            })}
                        />
                    </div>
                    

                    <input
                        type="submit"
                        value="Actualizar Password"
                        className="bg-indigo-700 px-10 py-3 font-bold text-white uppercase rounded-lg w-full mt-5 hover:bg-indigo-800 cursor-pointer"
                    />

                </form>
            </div>
        </div>

    </>
  )
}

export default CambiarPassword