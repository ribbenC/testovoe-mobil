import React from "react";
import './Table.css'

export default props => (
    <table className='table'>
        <thead>
        <tr>
            <th onClick={props.SortAlp.bind(null, 'mark')}>Модель и марка
                {props.sortField === 'mark' ? <small>{props.symbol}</small>
                    : null}
            </th>
            <th onClick={props.SortAlp.bind(null, 'Эконом')}>Эконом
                {props.sortField === 'Эконом' ? <small>{props.symbol}</small>
                    : null}
            </th>
            <th onClick={props.SortAlp.bind(null, 'Комфорт')}>Комфорт
                {props.sortField === 'Комфорт' ? <small>{props.symbol}</small>
                    : null}
            </th>
            <th onClick={props.SortAlp.bind(null, 'Комфорт+')}>Комфорт+
                {props.sortField === 'Комфорт+' ? <small>{props.symbol}</small>
                    : null}
            </th>
            <th onClick={props.SortAlp.bind(null, 'Минивен')}>Минивен
                {props.sortField === 'Минивен' ? <small>{props.symbol}</small>
                    : null}
            </th>
            <th onClick={props.SortAlp.bind(null, 'Бизнес')}>Бизнес
                {props.sortField === 'Бизнес' ? <small>{props.symbol}</small>
                    : null}
            </th>
        </tr>
        </thead>
        <tbody>
        {props.data.map(item => {
            return (
                <tr key={item.mark + item.model}>
                    <td>{item.mark} {item.model}</td>
                    {item.tariffs["Эконом"].year !== 0
                        ?
                        <td onClick={props.rowSelect.bind(null, [item.mark, item.model, item.tariffs["Эконом"].year])}>{item.tariffs["Эконом"].year}</td>
                        : <td>-</td>
                    }
                    {item.tariffs["Комфорт"].year !== 0
                        ?
                        <td onClick={props.rowSelect.bind(null, [item.mark, item.model, item.tariffs["Комфорт"].year])}>{item.tariffs["Комфорт"].year}</td>
                        : <td>-</td>
                    }
                    {item.tariffs["Комфорт+"].year !== 0
                        ?
                        <td onClick={props.rowSelect.bind(null, [item.mark, item.model, item.tariffs["Комфорт+"].year])}>{item.tariffs["Комфорт+"].year}</td>
                        : <td>-</td>
                    }
                    {item.tariffs["Минивен"].year !== 0
                        ?
                        <td onClick={props.rowSelect.bind(null, [item.mark, item.model, item.tariffs["Минивен"].year])}>{item.tariffs["Минивен"].year}</td>
                        : <td>-</td>
                    }
                    {item.tariffs["Бизнес"].year !== 0
                        ?
                        <td onClick={props.rowSelect.bind(null, [item.mark, item.model, item.tariffs["Бизнес"].year])}>{item.tariffs["Бизнес"].year}</td>
                        : <td>-</td>
                    }
                </tr>
            )
        })}
        </tbody>
    </table>
)