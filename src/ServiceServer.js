import React, {useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import { useRos } from './ros';
import { advertiseService, unadvertiseService, serviceSettings } from './service';

const ServiceServer = props => {
    
    const name = props.name;
    const type = props.type;
    const callback = props.callback;
    const ROS = useRos();

    useEffect(() => {
        const service = advertiseService(serviceSettings(ROS, name, type), callback);
        return () => {
            unadvertiseService(service);
        }
    }, [])
    
    return (
        <Fragment />
    )
}

ServiceServer.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    callback: PropTypes.func.isRequired,
}

export default ServiceServer
