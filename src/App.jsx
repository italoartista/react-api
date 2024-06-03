import { useState, useEffect } from 'react'
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack } from 'victory'
import ListaNome from './componentes/ListaNome'
import './App.css'

const data2012 = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 }
];

const data2013 = [
  { quarter: 1, earnings: 15000 },
  { quarter: 2, earnings: 12500 },
  { quarter: 3, earnings: 19500 },
  { quarter: 4, earnings: 13000 }
];

const data2014 = [
  { quarter: 1, earnings: 11500 },
  { quarter: 2, earnings: 13250 },
  { quarter: 3, earnings: 20000 },
  { quarter: 4, earnings: 15500 }
];

const data2015 = [
  { quarter: 1, earnings: 18000 },
  { quarter: 2, earnings: 13250 },
  { quarter: 3, earnings: 15000 },
  { quarter: 4, earnings: 12000 }
];


function App() {
  const [data, setData] = useState([])
  const [hora, setHora] = useState(0)
  const [abertura, setAbertura] = useState(0)
  const [fechamento, setFechamento] = useState(0)
  const [maxima, setMaxima] = useState(0)
  const [minima, setMinima] = useState(0)
  const [volume, setVolume] = useState(0)
  const [fechamentoDoDia, setFechamentoDoDia] = useState(0)
  const [volumeDoDia, setVolumeDoDia] = useState(0)
  const [numeroDeNegociacoes, setNumeroDeNegociacoes] = useState(0)


  useEffect(() => {
    const buscaPrecos = async () => {
      const resposta = await fetch('https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m')
      const dados = await resposta.json()
      console.log(dados)

      const [
        horario,
        abertura,
        maxima,
        minima,
        fechamento,
        volume,
        fechamentoDoDia,
        volumeDoDia,
        numeroDeNegociacoes] = dados[dados.length-1]

      let barra = { 
        hora: horario,
        abertura: abertura,
        maxima: maxima,
        minima: minima,
        fechamento: fechamento,
        volume: volume,
        fechamentoDoDia: fechamentoDoDia,
        volumeDoDia: volumeDoDia,
        numeroDeNegociacoes: numeroDeNegociacoes   
      }

      console.log(barra)
      setHora(horario)
      setAbertura(abertura)
      setFechamento(fechamento)
      setMaxima(maxima)
      setMinima(minima)
      setVolume(volume)
      setFechamentoDoDia(fechamentoDoDia)
      setData(dados)

    }
    buscaPrecos()
    return () => console.log('Componente App foi desmontado')

  }, [data])




  return (
    <>
      {/* <h1>Dashboard</h1>
      <ul>
        <li>Horário: {hora}</li>
        <li style={{ border: '1px solid black' }}>Abertura: {abertura}</li>
        <li>Fechamento: {fechamento}</li>
        <li>Máxima: {maxima}</li>
        <li>Mínima: {minima}</li>
        <li>Volume: {volume}</li>
        <li>Fechamento do dia: {fechamentoDoDia}</li>
        <li>Volume do dia: {volumeDoDia}</li>
        <li>Número de negociações: {numeroDeNegociacoes}</li>
      </ul> */}
      <VictoryChart
        domainPadding={20}
        theme={VictoryTheme.material}
      >
        <VictoryAxis
          tickValues={[1, 2, 3, 4]}
          tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(x) => (`$${x / 1000}k`)}
        />
        <VictoryStack
          colorScale={"warm"}
        >
          <VictoryBar
            data={data2012}
            x="quarter"
            y="earnings"
          />
          <VictoryBar
            data={data2013}
            x="quarter"
            y="earnings"
          />
          <VictoryBar
            data={data2014}
            x="quarter"
            y="earnings"
          />
          <VictoryBar
            data={data2015}
            x="quarter"
            y="earnings"
          />
        </VictoryStack>
      </VictoryChart>
    </>
  )
}

export default App
