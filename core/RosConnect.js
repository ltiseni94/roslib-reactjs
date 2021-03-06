import React from 'react';
import PropTypes from 'prop-types';
import { RosProvider } from '../lib/ros';
import { Connection } from '../lib/connection';


/**
 * 
 * @param props 
 * @param props.timeout
 * @param props.url
 * @param props.autoconnect
 */

export const RosConnect = (props) => {

    const timeout = props.timeout || 1000;
    const autoconnect = props.autoconnect || false;
    const url = props.url || "ws://localhost:9090";

    return (
        <RosProvider>
            <Connection url={url} autoconnect={autoconnect} timeout={timeout} />
            {props.children}
        </RosProvider>
    )
}

RosConnect.propTypes = {
    children: PropTypes.node,
    url: PropTypes.string,
    autoconnect: PropTypes.bool,
    timeout: PropTypes.number,
}

export default RosConnect;
