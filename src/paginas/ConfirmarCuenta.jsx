import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import clienteAxios from "../config/axios"
import Alerta from "../components/Alerta"

const ConfirmarCuenta = () => {

    const [cuentaConfirmada, setcuentaConfirmada] = useState(false)
    const [cargando, setCargando] = useState(true)
    const [alerta, setAlerta] = useState({})  

    const params = useParams()
    const { id } = params

    useEffect( () => {

      const confirmarCuenta = async () => {
        try {

          const url = `/veterinarios/confirmar/${id}`
          const {data} = await clienteAxios(url)
          setcuentaConfirmada(true)
          setAlerta( {msg: data.msg})

        } catch (error) {
          setAlerta({ msg: error.response.data.msg, error: true })
        }

        setCargando(false)        
      }

      confirmarCuenta()

    }, [])

    return (
      <>
            <div>
                <h1 className='text-indigo-600 font-black text-6xl'>Confirma tu Cuenta y Comienza a Administrar tus <span className='text-black'>Pacientes</span></h1>
            </div>

            <div className='mt-20 md:mt-5 shadow-lg py-10 px-5 rounded-xl bg-white'>

                {!cargando && <Alerta
                  alerta={alerta}
                />}

                {cuentaConfirmada && (
                  <Link
                    className='bg-indigo-700 w-full  py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto'
                    to="/">Inicia Sesión
                  </Link>
                ) }  

            </div>

      </>
    )
  }
  
  export default ConfirmarCuenta