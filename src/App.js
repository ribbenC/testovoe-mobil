import './App.css';
import React from 'react'
import ReactPaginate from 'react-paginate'
import _ from 'lodash'
import Loader from './Loader/Loader'
import Table from './Table/Table'
import TakenCar from './TakenCar/TakenCar'
import TableSearch from './TableSearch/TableSearch'


class App extends React.Component {
    state = {
        isLoading: true,
        data: [],
        symbol: '▼',
        row: null,
        currentPage: 0,
        search: ''
    }

    async componentDidMount() {
        const response = await fetch('https://city-mobil.ru/api/cars')
        const rawData = await response.json()
        for (let i = 0; i < rawData.cars.length; i++) {
            for (let j = 0; j < rawData.tariffs_list.length; j++) {
                if (!Object.keys(rawData.cars[i].tariffs).includes(rawData.tariffs_list[j])) {
                    rawData.cars[i].tariffs[rawData.tariffs_list[j]] = {year: 0};
                }
            }
        }
        for (let i = 0; i < rawData.cars.length; i++) {
            for (let j = 0; j < rawData.tariffs_list.length; j++) {
                rawData.cars[i][rawData.tariffs_list[j]] = rawData.cars[i].tariffs[rawData.tariffs_list[j]]['year']
            }
        }
        this.setState({
            isLoading: false,
            data: rawData.cars,
            sort: 'asc',
            sortField: 'mark'
        })
    }

    SortAlp = sortField => {
        const cloned = this.state.data.concat()
        const sortType = this.state.sort === 'asc' ? 'desc' : 'asc'
        const ordered = _.orderBy(cloned, sortField, sortType)
        sortType === 'asc' ? this.state.symbol = '▼' :
            this.state.symbol = '▲'
        this.setState({
            data: ordered,
            sort: sortType,
            sortField: sortField,
            symbol: this.state.symbol,

        })
    }

    rowSelect = row => {
        this.setState({row})
    }

    pageHandler = ({selected}) => {
        this.setState({currentPage: selected})
    }

    searchHandler = search => {
        this.setState({
            search,
            currentPage: 0
        })
    }

    getFiltred() {
        const {data, search} = this.state
        if (!search) {
            return data
        }
        return data.filter(item => {
                return item.mark.toLowerCase().includes(search.toLowerCase())
            }
        )
    }

    render() {
        const filtredData = this.getFiltred()
        const pageCount = Math.ceil(filtredData.length / 15)
        const displayedData = _.chunk(filtredData, 15)[this.state.currentPage]
        return (
            <div className="App">
                <div className='Header'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquid assumenda, atque autem
                    blanditiis cum deleniti dolore doloribus ducimus eius et expedita facere facilis hic libero
                    molestiae
                    mollitia nam natus nihil optio pariatur porro quae quaerat quam qui quis recusandae repudiandae
                    tempore
                    temporibus tenetur ut veniam voluptate voluptatibus? Aliquid aut distinctio ipsum quia sequi, sit!
                    Debitis dicta, doloribus inventore numquam obcaecati officiis ut vel voluptas? Aliquam aperiam
                    architecto blanditiis consequatur consequuntur culpa debitis dicta dignissimos distinctio dolor
                    eligendi
                    facere id laudantium minus nam necessitatibus neque nihil nobis nulla porro quas quia quibusdam
                    quis,
                    ratione rem repellat sapiente tempora unde vel!
                </div>
                <div className='Sidebar-MainApp'>
                    <div className="Sidebar">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquid assumenda, atque
                        autem
                        blanditiis cum deleniti dolore doloribus ducimus eius et expedita facere facilis hic libero
                        molestiae
                        mollitia nam natus nihil optio pariatur porro quae quaerat quam qui quis recusandae repudiandae
                        tempore
                        temporibus tenetur ut veniam voluptate voluptatibus? Aliquid aut distinctio ipsum quia sequi,
                        sit!
                        Debitis dicta, doloribus inventore numquam obcaecati officiis ut vel voluptas? Aliquam aperiam
                        architecto blanditiis consequatur consequuntur culpa debitis dicta dignissimos distinctio dolor
                        eligendi
                        facere id laudantium minus nam necessitatibus neque nihil nobis nulla porro quas quia quibusdam
                        quis,
                        ratione rem repellat sapiente tempora unde vel!
                    </div>
                    <div className="MainApp">
                        {this.state.isLoading
                            ? <Loader/>
                            :
                            <React.Fragment>
                                <TableSearch search={this.searchHandler}/>
                                <Table data={displayedData}
                                       SortAlp={this.SortAlp}
                                       symbol={this.state.symbol}
                                       sortField={this.state.sortField}
                                       rowSelect={this.rowSelect}
                                />
                            </React.Fragment>
                        }

                        {
                            this.state.data.length > 15
                                ? <ReactPaginate
                                    previousLabel={'<'}
                                    nextLabel={'>'}
                                    breakLabel={'...'}
                                    breakClassName={'break-me'}
                                    pageCount={pageCount}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    onPageChange={this.pageHandler}
                                    containerClassName={'pagination'}
                                    activeClassName={'active'}
                                    pageClassName="page-item"
                                    pageLinkClassName="page-link"
                                    previousClassName="page-item"
                                    nextClassName="page-item"
                                    previousLinkClassName="page-link"
                                    nextLinkClassName="page-link"
                                    forcePage={this.state.currentPage}
                                /> : null
                        }

                        {
                            this.state.row ? <TakenCar car={this.state.row}/>
                                : null
                        }
                    </div>
                </div>
                <div className="Footer">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquid assumenda, atque autem
                    blanditiis cum deleniti dolore doloribus ducimus eius et expedita facere facilis hic libero
                    molestiae
                    mollitia nam natus nihil optio pariatur porro quae quaerat quam qui quis recusandae repudiandae
                    tempore
                    temporibus tenetur ut veniam voluptate voluptatibus? Aliquid aut distinctio ipsum quia sequi, sit!
                    Debitis dicta, doloribus inventore numquam obcaecati officiis ut vel voluptas? Aliquam aperiam
                    architecto blanditiis consequatur consequuntur culpa debitis dicta dignissimos distinctio dolor
                    eligendi
                    facere id laudantium minus nam necessitatibus neque nihil nobis nulla porro quas quia quibusdam
                    quis,
                    ratione rem repellat sapiente tempora unde vel!
                </div>
            </div>
        );
    }

}

export default App;
