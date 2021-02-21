import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

export default function SearchBox(props) {
    const { name: nameParam } = useParams();

    const [name, setName] = useState(nameParam && nameParam !== 'all' ? nameParam : '');




    const history = useHistory();

    const submitHandler = (e) => {
        e.preventDefault();
        // if (!name)
        //     setName('all')
        history.push(`/search/name/${name}`);
    };
    return (
        <form className="search" onSubmit={submitHandler}>

            <input
                type="text"
                name="q"
                id="q"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nhập nội dung tìm kiếm"
            ></input>
            <button className="primary" type="submit">
                Tìm kiếm
                </button>

        </form>

    );
}