import { useSearchParams } from 'react-router'
import { Title, Label, FlexBox, FlexBoxDirection, FlexBoxAlignItems } from '@ui5/webcomponents-react'
import '@ui5/webcomponents-icons/dist/customer.js'
import './App.css'

function App() {
  const [params] = useSearchParams()
  const idCliente = params.get('idCliente')

  return (
    <div className="mashup-container">
      <FlexBox
        direction={FlexBoxDirection.Column}
        alignItems={FlexBoxAlignItems.Start}
        className="info-box"
      >
        <Title level="H5">Información del Cliente</Title>
        <FlexBox alignItems={FlexBoxAlignItems.Center} style={{ marginTop: '8px' }}>
          <Label showColon>ID de Cliente</Label>
          <span className="id-value">
            {idCliente || "No proporcionado"}
          </span>
        </FlexBox>
      </FlexBox>
    </div>
  )
}

export default App
