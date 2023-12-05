import { useState } from 'react'
import './App.css'

const ComponenteClima = () => {
 
  const [cidade, setCidade] = useState('')
  const [dadosClima, setDadosClima] = useState(null)
  const [erro, setErro] = useState(null)

  const buscarDadosClima = async () => {
    const chaveAPI = import.meta.env.VITE_CHAVE_OPENWEATHERMAP

    try {
      const resposta = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${chaveAPI}&lang=pt`
      )
      const dados = await resposta.json()

      if (resposta.ok) {
        setDadosClima(dados)
        setErro(null)
      } else {
        setErro('Cidade não encontrada')
        setDadosClima(null)
      }
    } catch (erro) {
      console.error('Erro ao buscar dados de clima', erro)
      setErro('Cidade não encontrada')
    }
  }

  const lidarComEnvio = (evento) => {
    evento.preventDefault()
    buscarDadosClima()
  }

  const temperaturaEmCelsius = dadosClima
    ? Math.round(dadosClima.main.temp - 273.15)
    : null

  return (
    <div id="caixa1">
      <form onSubmit={lidarComEnvio}>
        <input
          id="input-cidade"
          type="text"
          placeholder="Digite o nome da cidade"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
        />
        <button type="submit">
          <i className="fa fa-search header-icon"></i>
        </button>
      </form>

      {erro && <div id="erro">{erro}</div>}

      {dadosClima && (
        <div>
          <h2 className="retorno-clima">{dadosClima.name}</h2>
          <p className="retorno-clima">
            Temperatura: {temperaturaEmCelsius} °C
          </p>
          <p className="retorno-clima">
            Condição: {dadosClima.weather[0].description}
          </p>
        </div>
      )}
    </div>
  )
}

export default ComponenteClima
