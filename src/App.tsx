import { useSearchParams } from 'react-router'
import { 
  Title, 
  Label, 
  FlexBox, 
  FlexBoxAlignItems, 
  Icon,
  Table,
  TableHeaderRow,
  TableHeaderCell,
  TableRow,
  TableCell,
  ObjectStatus,
  IllustratedMessage
} from '@ui5/webcomponents-react'
import '@ui5/webcomponents-fiori/dist/illustrations/BeforeSearch.js'
import '@ui5/webcomponents-icons/dist/customer.js'
import './App.css'

const mockOrders = [
  { id: '80001', date: '2026-03-15', status: 'Entregado', total: '$1,200', state: 'Positive' },
  { id: '80002', date: '2026-03-18', status: 'Pendiente', total: '$850', state: 'Critical' },
  { id: '80003', date: '2026-03-19', status: 'En camino', total: '$2,100', state: 'Information' },
];

function App() {
  const [params] = useSearchParams()
  const idCliente = params.get('idCliente')

  return (
    <div className="mashup-container">
      {idCliente ? (
        <>
          <div className="info-section">
            <FlexBox alignItems={FlexBoxAlignItems.Center}>
              <Icon name="customer" style={{ marginRight: '8px', color: '#6a6d70' }} />
              <Title level="H5">Información del Cliente</Title>
            </FlexBox>
            
            <FlexBox alignItems={FlexBoxAlignItems.Baseline} style={{ marginTop: '12px' }}>
              <Label showColon>ID de Cliente</Label>
              <span className="id-value">
                {idCliente}
              </span>
            </FlexBox>
          </div>

          <div className="table-section">
            <Title level="H5" style={{ marginBottom: '16px' }}>Pedidos Recientes</Title>
            <Table
              headerRow={
                <TableHeaderRow>
                  <TableHeaderCell>
                    <Label>ID Pedido</Label>
                  </TableHeaderCell>
                  <TableHeaderCell>
                    <Label>Fecha</Label>
                  </TableHeaderCell>
                  <TableHeaderCell>
                    <Label>Estado</Label>
                  </TableHeaderCell>
                  <TableHeaderCell>
                    <Label>Total</Label>
                  </TableHeaderCell>
                </TableHeaderRow>
              }
            >
              {mockOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <Label>{order.id}</Label>
                  </TableCell>
                  <TableCell>
                    <Label>{order.date}</Label>
                  </TableCell>
                  <TableCell>
                    <ObjectStatus state={order.state as any}>{order.status}</ObjectStatus>
                  </TableCell>
                  <TableCell>
                    <Label>{order.total}</Label>
                  </TableCell>
                </TableRow>
              ))}
            </Table>
          </div>
        </>
      ) : (
        <IllustratedMessage 
          titleText="Seleccione un Cliente" 
          subtitleText="Vincule un ID de cliente para visualizar la información."
        />
      )}
    </div>
  )
}

export default App
