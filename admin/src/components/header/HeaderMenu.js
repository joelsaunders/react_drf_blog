import React from 'react';
import {Link} from "react-router-dom";
import _ from 'lodash';

const HeaderItems = {
    'Blog': '/',
    // 'About': '/about',
    // 'Site': '/site',
    'Team': '/team',
    'Contact': '/contact',
};

const MenuItem = ({title, path}) => {
    return <Link to={path}>
        <div className="block mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white mr-4">
            {title}
        </div>
    </Link>
};

const HeaderMenu = () => {
    return <div>
        {_.map(HeaderItems, (value, key) => <MenuItem key={key} title={key} path={value} />)}
    </div>
};

export default HeaderMenu;
