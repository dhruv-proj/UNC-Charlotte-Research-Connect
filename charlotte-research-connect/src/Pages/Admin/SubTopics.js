import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PageTemplate from '../../Components/Admin Template'
import SubService from '../../Services/Sub'

const settings = require('../../settings.json')

function SubTopicsPage(props) {
    const [data, setData] = useState([])
    console.log(data)
    useEffect(() => {
        async function getData() {
            const response = await axios.get(`${settings.DevEnv ? settings.NoSSL : settings.APIBase}/a/sub/all`)
            setData(response.data)

        }
        getData()
    }, [])

    async function handleInputChange(id, e) {
        if(e.target.classList.contains('invalid')) e.target.classList.remove('invalid')
        let formData = { id, change: null, values: null }
        formData.change = e.target.id.split('-')[1]
        formData.values = e.target.value

        if (!formData.id || !formData.change || !formData.values) return e.target.classList.add('invalid')

        const token = 'tbi'
        let res = await SubService.edit(formData, token)
        if (res.isErrored) return e.target.classList.add('invalid')
    }

    function handleKeyDown(id, e) {
        if (e.key.code === 'Enter') return handleInputChange(id, e)
    }

    function renderRow(row) {
        return (<tr key={row.id}>
            <td><input type='text'
                defaultValue={row.label}
                id={`${row.id}-label`}
                onBlur={e => handleInputChange(row.id, e)}
                onKeyDown={e => handleKeyDown(row.id, e)} /></td>
            <td><input type='text'
                defaultValue={row.parent_id}
                id={`${row.id}-parent_id`}
                onBlur={e => handleInputChange(row.id, e)}
                onKeyDown={e => handleKeyDown(row.id, e)} /></td>
        </tr>)
    }

    return (<>
        <PageTemplate highLight='3' />
        <div className='AdminHome'>
            <table className='rows'>
                <thead>
                    <tr>
                        <th>Topic Name</th>
                        <th>Parent Topic</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(renderRow)}
                </tbody>
            </table>
        </div>
    </>)
}

export default SubTopicsPage