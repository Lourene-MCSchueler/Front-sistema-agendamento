import './style.css'

const ResultTable = (reservas) => {
    const renderReservas = reservas.reserva == 0 ? '' :
        (reservas.reserva.map((a) =>
            <tr key={a.id}>
                <td>{a.moment}</td>
                <td>{`${a.begin}h - ${a.end}h`}</td>
                <td>{a.begin === 8 && a.end === 18 ? 'Dia' : 'Reunião'}</td>
                <td>{a.officeName}</td>
                <td>{a.id}</td>
            </tr>));

    return <div className="result-container">
        <table className="tabela">
            <thead className="cabecalho">
                <tr>
                    <th>Dia</th>
                    <th>Horário</th>
                    <th>Tipo</th>
                    <th>Unidade</th>
                    <th>N° do Ticket</th>
                </tr>
            </thead>
            <tbody className="corpo">
                {renderReservas}
            </tbody>
        </table>
    </div>
}

export default ResultTable;