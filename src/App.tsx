import { useSearchParams } from 'react-router'
import {
  Title,
  Label,
  FlexBox,
  FlexBoxAlignItems,
  Icon,
  ObjectStatus,
  IllustratedMessage,
  Table,
  TableHeaderRow,
  TableHeaderCell,
  TableRow,
  TableCell
} from '@ui5/webcomponents-react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import '@ui5/webcomponents-fiori/dist/illustrations/BeforeSearch.js'
import '@ui5/webcomponents-icons/dist/customer.js'
import './App.css'

const fetchOrders = async (idCliente: string) => {
  const { data } = await axios.get(`https://69bca9e02bc2a25b22ac0c66.mockapi.io/api-prueba/cliente/${idCliente}/pedidos`)
  return data
}

const getStatusState = (status: string) => {
  switch (status) {
    case 'Entregado': return 'Positive'
    case 'Pendiente': return 'Critical'
    case 'En camino': return 'Information'
    case 'Cancelado': return 'Negative'
    default: return 'None'
  }
}

const formatDate = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleDateString()
}

function App() {
  const [params] = useSearchParams()
  const idCliente = params.get('idCliente')

  const { data: orders, isLoading, isError } = useQuery({
    queryKey: ['orders', idCliente],
    queryFn: () => fetchOrders(idCliente!),
    enabled: !!idCliente
  })

  return (
    <div className="mashup-container">
      {!idCliente ? (
        <IllustratedMessage
          titleText="Seleccione un Cliente"
          subtitleText="Vincule un ID de cliente para visualizar la información."
        />
      ) : (
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

            {isError ? (
              <Label>Error al cargar los pedidos.</Label>
            ) : (
              <Table
                noDataText="No se encontraron pedidos"
                loading={isLoading}
                alternateRowColors
                headerRow={
                  <TableHeaderRow>
                    <TableHeaderCell>ID Pedido</TableHeaderCell>
                    <TableHeaderCell>Fecha</TableHeaderCell>
                    <TableHeaderCell>Estado</TableHeaderCell>
                    <TableHeaderCell>Total</TableHeaderCell>
                  </TableHeaderRow>
                }
              >
                {(orders || []).map((order: any) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{formatDate(order.date)}</TableCell>
                    <TableCell>
                      <ObjectStatus state={getStatusState(order.status) as any}>
                        {order.status}
                      </ObjectStatus>
                    </TableCell>
                    <TableCell>${order.total}</TableCell>
                  </TableRow>
                ))}
              </Table>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default App
